#!/usr/bin/env python3
"""Build host-lines.js from audio/host/README.md and the MP3s.

For each line in the README table:
- finds where each phrase starts in the MP3 (from its silences), so the TV can show
  subtitles in step with the voice;
- measures its loudness 25 times a second ("env"), which MacPhisto's lips follow.
Run after adding a take and its README row:  python3 tools/host-lines.py
Needs ffmpeg/ffprobe.
"""
import difflib, json, math, os, re, struct, subprocess, sys

os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
GAP = 0.45  # silences at least this long can separate phrases
FPS = 25    # loudness samples per second
RATE = 8000

def run(cmd, path):
    try:
        return subprocess.run(cmd, capture_output=True, check=True)
    except FileNotFoundError:
        sys.exit("ffmpeg/ffprobe not found")
    except subprocess.CalledProcessError as e:
        sys.exit(f"{path}: {e.stderr.decode(errors='replace').strip().splitlines()[-1:]}")

def speech_segments(path):
    dur = float(run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path], path).stdout)
    log = run(["ffmpeg", "-i", path, "-af", f"silencedetect=noise=-40dB:d={GAP}", "-f", "null", "-"], path).stderr.decode()
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", log)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", log)]
    segs, t = [], 0.0
    for s, e in zip(starts, ends):
        if s > t + 0.05: segs.append([t, s])
        t = e
    if dur > t + 0.05: segs.append([t, dur])
    return segs or [[0.0, dur]], dur

def envelope(path):
    """Loudness per 1/FPS s as one base-36 digit (0 = closed mouth, z = wide open)."""
    pcm = run(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(RATE), "-f", "s16le", "-"], path).stdout
    x = struct.unpack(f"<{len(pcm) // 2}h", pcm[: len(pcm) // 2 * 2])
    hop, out = RATE // FPS, []
    for i in range(0, len(x), hop):
        w = x[i:i + hop]
        rms = math.sqrt(sum(v * v for v in w) / max(1, len(w))) / 32768
        out.append("0123456789abcdefghijklmnopqrstuvwxyz"[round(max(0, min(1, (rms - 0.012) * 9)) * 35)])
    return "".join(out)

def chunks(text):
    """Split a line into the smallest pieces a pause could fall between: its phrases, then at ... . ! ? ,"""
    out, starts = [], set()
    for phrase in text.split(" / "):
        starts.add(len(out))
        out += [c for c in re.split(r"(?<=[.!?,])\s+(?=\S)", phrase) if c]
    return out, starts

def fit(text, segs):
    """Group the line's pieces into one subtitle per speech segment, matching length of text to length of speech."""
    segs = [s[:] for s in segs]; parts, starts = chunks(text)
    while len(segs) > len(parts):  # more pauses than places to break: ignore the shortest pauses
        i = min(range(len(segs) - 1), key=lambda k: segs[k + 1][0] - segs[k][1])
        segs[i][1] = segs[i + 1][1]; del segs[i + 1]
    n, m = len(parts), len(segs)
    w = [len(c) for c in parts]; W = sum(w); D = sum(b - a for a, b in segs) or 1
    share = [(b - a) / D for a, b in segs]
    best = {(0, 0): (0.0, [])}  # (pieces used, segments filled) -> (error, cut points)
    for j in range(m):
        for i in range(n):
            if (i, j) not in best: continue
            err, cuts = best[(i, j)]
            for k in range(i + 1, n - (m - j - 1) + 1):
                e = err + (sum(w[i:k]) / W - share[j]) ** 2 + (0 if k == n or k in starts else 1.0)  # prefer the script's own breaks
                if (k, j + 1) not in best or e < best[(k, j + 1)][0]: best[(k, j + 1)] = (e, cuts + [k])
    cuts = [0] + best[(n, m)][1]
    return merge([{"t": round(segs[j][0], 2), "text": " ".join(parts[cuts[j]:cuts[j + 1]])} for j in range(m)])

def words(text):
    return [w for w in re.split(r"[\s\-\u2013\u2014]+", re.sub(r"[^\w\s'\-\u2013\u2014]", " ", text.lower())) if w]

def aligned(text, timed):
    """One subtitle per scripted phrase, starting when its first word is heard (from a transcript's word times)."""
    phrases = text.split(" / ")
    said = [w for t, _ in timed for w in words(t)]
    times = [at for t, at in timed for _ in words(t)]
    script, first = [], []
    for ph in phrases:
        first.append(len(script)); script += words(ph)
    match = {}
    for a, b, size in difflib.SequenceMatcher(None, script, said, autojunk=False).get_matching_blocks():
        for k in range(size): match[a + k] = times[b + k]
    subs = []
    for i, ph in enumerate(phrases):
        t = next((match[k] for k in range(first[i], len(script)) if k in match), None)
        if t is None: sys.exit(f"can't place '{ph}' in its take")
        subs.append({"t": 0.0 if i == 0 else max(0.0, round(t - 0.1, 2)), "text": ph})
    return merge(subs)

def merge(subs):
    # A lone "Oh..." or a clause cut at its comma reads badly on its own: show it with what follows
    out = []
    for sub in subs:
        if out and re.match(r"^(Oh|Ooh|Ah|Well|Now)\W*$", out[-1]["text"]) or out and out[-1]["text"].endswith(","):
            out[-1]["text"] += " " + sub["text"]
        else:
            out.append(sub)
    return out

readme = open("audio/host/README.md").read()
rows = re.findall(r"^\| *([\w-]+)\.mp3 *\| *(.+?) *\| *(.+?) *\|\s*$", readme, re.M)
for line in readme.splitlines():
    if re.match(r"^\| *[\w-]+\.mp3", line) and not re.match(r"^\| *([\w-]+)\.mp3 *\| *(.+?) *\| *(.+?) *\|\s*$", line):
        print("warning: can't read this table row:", line, file=sys.stderr)
texts = {f: t for f, _, t in rows}
listed = set(texts)
for f in sorted(os.listdir("audio/host")):
    if f.endswith(".mp3") and f[:-4] not in listed:
        print(f"warning: audio/host/{f} has no row in the README table", file=sys.stderr)

out = {}
for f, moment, text in rows:
    m = re.match(r"(.+?) / \(rest as (\w+)\)", text)
    if m:  # e.g. the streak lines share everything after the name
        src = next((k for k in texts if k.startswith("streak-" + m.group(2).lower())), None)
        if not src: sys.exit(f"{f}: '(rest as {m.group(2)})' but there's no streak-{m.group(2).lower()} row")
        text = m.group(1) + " / " + texts[src].split(" / ", 1)[1]
    path = f"audio/host/{f}.mp3"
    if not os.path.exists(path): sys.exit(f"{path} is in the README table but the file is missing")
    segs, dur = speech_segments(path)
    al = f"audio/host/align/{f}.json"
    phrases = aligned(text, json.load(open(al))) if os.path.exists(al) else fit(text, segs)
    out[f] = {"moment": moment, "dur": round(dur, 2), "phrases": phrases, "fps": FPS, "env": envelope(path)}

with open("host-lines.js", "w") as fh:
    fh.write("// Generated by tools/host-lines.py from audio/host/README.md. Don't edit by hand.\n")
    fh.write("// Each MacPhisto line: its moment, length in seconds, when each subtitle phrase starts,\n")
    fh.write("// and its loudness 25 times a second (base 36), which his lips follow.\n")
    fh.write("window.HOST_LINES = " + json.dumps(out, indent=1, ensure_ascii=False) + ";\n")
print(len(out), "lines")

#!/usr/bin/env python3
"""Generate MacPhisto takes through the ElevenLabs API from a script file.

    python3 tools/eleven.py audio/host/script-batch-7.md [name ...]

Reads each `name.mp3` heading and the ``` block under it, and saves the take as
audio/host/_raw/<name>.mp3 (re-time it, then copy it into audio/host/).
Names given on the command line limit it to those lines; existing raw takes are skipped
unless --again is given. The API key comes from ELEVENLABS_API_KEY (or a proxy that adds it).

    python3 tools/eleven.py --level audio/host/script-batch-7.md [name ...]

copies the raw takes into audio/host/ as mono 192k MP3s, at the same loudness as the rest.

    python3 tools/eleven.py --align audio/host/script-batch-7.md [name ...]

transcribes the finished takes in audio/host/ and saves when each word starts in
audio/host/align/<name>.json, which tools/host-lines.py uses to time the subtitles
(v4 takes pause too briefly between phrases for the silences to show where they fall).
"""
import json, os, re, subprocess, sys, urllib.request, uuid

VOICE = "y0SYydk17lMbUIUvSf3N"  # AK - British Posh Well-Spoken Old Man
MODEL = "eleven_v4"

os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
args = [a for a in sys.argv[1:] if not a.startswith("--")]
again = "--again" in sys.argv
if not args: sys.exit(__doc__)
script, only = open(args[0]).read(), set(args[1:])
lines = re.findall(r"^`([\w-]+)\.mp3`[^\n]*\n(?:[^`\n][^\n]*\n|\n)*?```\n(.*?)\n```", script, re.M | re.S)
KEY = {"xi-api-key": os.environ.get("ELEVENLABS_API_KEY", "x")}

def align(name):
    path, b = f"audio/host/{name}.mp3", uuid.uuid4().hex
    body = (f'--{b}\r\nContent-Disposition: form-data; name="model_id"\r\n\r\nscribe_v1\r\n'
            f'--{b}\r\nContent-Disposition: form-data; name="file"; filename="{name}.mp3"\r\nContent-Type: audio/mpeg\r\n\r\n').encode()
    body += open(path, "rb").read() + f"\r\n--{b}--\r\n".encode()
    req = urllib.request.Request("https://api.elevenlabs.io/v1/speech-to-text", data=body,
                                 headers={"Content-Type": f"multipart/form-data; boundary={b}", **KEY})
    words = json.load(urllib.request.urlopen(req, timeout=120))["words"]
    words = [[w["text"], round(w["start"], 2)] for w in words if w["type"] == "word"]
    os.makedirs("audio/host/align", exist_ok=True)
    json.dump(words, open(f"audio/host/align/{name}.json", "w"))
    print(f"{name}: {' '.join(w for w, _ in words)}")

def level(name):
    src, out = f"audio/host/_raw/{name}.mp3", f"audio/host/{name}.mp3"
    log = subprocess.run(["ffmpeg", "-nostats", "-i", src, "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    lufs = float(re.findall(r"I:\s+(-?[\d.]+) LUFS", log)[-1])
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-af", f"volume={-27.2 - lufs:.1f}dB",
                    "-ar", "44100", "-ac", "1", "-b:a", "192k", out], check=True)
    print(f"{name}: {lufs} LUFS, {-27.2 - lufs:+.1f} dB")

if "--level" in sys.argv:
    for name, _ in lines:
        if not only or name in only: level(name)
    sys.exit()
if "--align" in sys.argv:
    for name, _ in lines:
        if not only or name in only: align(name)
    sys.exit()
os.makedirs("audio/host/_raw", exist_ok=True)
for name, text in lines:
    if only and name not in only: continue
    out = f"audio/host/_raw/{name}.mp3"
    if os.path.exists(out) and not again: continue
    req = urllib.request.Request(
        f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE}?output_format=mp3_44100_128",
        data=json.dumps({"text": text, "model_id": MODEL}).encode(),
        headers={"Content-Type": "application/json", **KEY})
    try:
        audio = urllib.request.urlopen(req, timeout=120).read()
    except urllib.error.HTTPError as e:
        sys.exit(f"{name}: {e.code} {e.read()[:300].decode(errors='replace')}")
    open(out, "wb").write(audio)
    print(f"{name}: {len(text)} chars, {len(audio) // 1024} KB")

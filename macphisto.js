// MacPhisto, the host: a little gold-lamé devil on a miniature ZOO TV stage.
// Video walls, scaffold towers with orange lights, two hanging Trabants, monitors on the deck.
// While he talks, the video walls show his face close up and his lips follow the voice.
// The voice is a plain <audio> element (no Web Audio, which Safari mutes until clicked);
// the lips follow a loudness envelope measured ahead of time (host-lines.js, "env").
//
//   const host = MacPhisto.mount(document.querySelector("#stage"));
//   await host.say("join-1");   // plays audio/host/join-1.mp3 with subtitles and gags
//   host.stop();
//
// Lines and their subtitle timings come from host-lines.js (window.HOST_LINES).
// Wall gags use the band's icons from members.js (window.U2M) when it's loaded.
window.MacPhisto = (() => {
  const NS = "http://www.w3.org/2000/svg";
  const REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SILENCE = (() => {   // 0.1 s of silence as a WAV file
    const n = 800, b = new ArrayBuffer(44 + n * 2), v = new DataView(b);
    const str = (o, x) => [...x].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
    str(0, "RIFF"); v.setUint32(4, 36 + n * 2, true); str(8, "WAVEfmt "); v.setUint32(16, 16, true);
    v.setUint16(20, 1, true); v.setUint16(22, 1, true); v.setUint32(24, 8000, true); v.setUint32(28, 16000, true);
    v.setUint16(32, 2, true); v.setUint16(34, 16, true); str(36, "data"); v.setUint32(40, n * 2, true);
    return URL.createObjectURL(new Blob([b], { type: "audio/wav" }));
  })();
  // The ZOO TV screen slogans. "BELIEVE" is special: all but L-I-E fade away.
  const SLOGANS = ["TASTE IS THE ENEMY OF ART", "RELIGION IS A CLUB", "IGNORANCE IS BLISS", "REBELLION IS PACKAGED", "BELIEVE", "EVERYTHING YOU KNOW IS WRONG"];

  // What happens on stage during a line. p = the subtitle phrase it starts on.
  // walls: what the video walls show ("all" or wall 0/1/2): text, avatar, static, cameras, eyes, eq.
  const STREAK = id => [{ p: 0, walls: { all: { avatar: id } } }, { p: 1, walls: { all: { face: 1 } } }, { p: 3, phone: 1 }];
  const GAGS = {
    "round-start-1": [{ p: 0, at: 1.0, horns: 1 }],
    "round-start-2": [{ p: 2, zoom: "boots" }, { p: 3, zoom: 0 }],
    "streak-larry-1": STREAK("larry"), "streak-bono-1": STREAK("bono"),
    "streak-adam-1": STREAK("adam"), "streak-edge-1": STREAK("edge"),
    "lead-change-1": [{ p: 2, walls: { all: { text: "GIGANTIC" } } }, { p: 3, walls: { all: { face: 1 } } }],
    "winner-1": [{ p: 0, walls: { all: { text: "LOOK WHAT YOU'VE DONE TO ME" } } }, { p: 2, walls: { all: { face: 1 } } }],
    "winner-2": [{ p: 0, walls: { all: { text: "WINNER" } } }, { p: 1, walls: { all: { face: 1 } } }],
    "winner-3": [{ p: 1, walls: { all: { text: "RICH & FAMOUS" } } }, { p: 2, walls: { all: { face: 1 } } }],
    "winner-5": [{ p: 2, walls: { all: { text: "GLAMOROUS" } } }],
    "close-2": [{ p: 1, phone: 1 }],
    "hurry-1": [{ p: 0, walls: { all: { text: "11:00" } } }, { p: 1, walls: { all: { text: "TICK TOCK" } } }],
    "streak-broken-1": [{ p: 0, walls: { all: { static: 1 } } }, { p: 1, walls: { all: { face: 1 } } }],
    "song-1": [{ p: 0, walls: { all: { eq: 1 } } }],
    "last-question-2": [{ p: 1, phone: 1 }],
    "phone-1": [{ p: 0, phone: 1 }, { p: 2, walls: { all: { text: "ENGAGED" } } }],
    "goodnight-1": [{ p: 3, phone: 1 }],
    "join-1": [{ p: 3, walls: { all: { text: "" } } }, { p: 4, walls: { 0: { text: "6" } } }, { p: 5, walls: { 1: { text: "6" } } },
               { p: 6, walls: { 2: { text: "6" } } }, { p: 7, phone: 1 }],
    "lobby-full-1": [{ p: 1, walls: { all: { avatar: "edge" } } }, { p: 2, walls: { all: { avatar: "adam" } } },
                     { p: 3, walls: { all: { avatar: "larry" } } }, { p: 4, walls: { all: { avatar: "bono" } } }],
    "nobody-right-2": [{ p: 0, walls: { all: { text: "EVERYTHING YOU KNOW IS WRONG" } } }, { p: 1, walls: { all: { face: 1 } } }],
    "start-4": [{ p: 4, walls: { all: { static: 1 } } }],
    "last-q-3": [{ p: 3, walls: { all: { eyes: 1 } } }, { p: 4, walls: { all: { cameras: 1 } } }],
    "last-place-3": [{ p: 2, walls: { all: { text: "DECIBELS" } }, flash: 1 }, { p: 3, walls: { all: { face: 1 } } }],
    // batch 5 (phrase numbers follow the script; check them against host-lines.js when the takes land)
    "streak-any-1": [{ p: 0, walls: { all: { text: "4 IN A ROW" } } }, { p: 1, walls: { all: { face: 1 } } }],
    "streak-any-2": [{ p: 0, walls: { all: { text: "4 IN A ROW" } } }, { p: 1, walls: { all: { static: 1 } } }, { p: 2, walls: { all: { face: 1 } } }],
    "lead-change-2": [{ p: 1, walls: { all: { text: "CELEBRITY IS A JOB" } } }, { p: 3, zoom: "boots" }],
    "lead-change-3": [{ p: 1, walls: { all: { text: "STUCK IN A MOMENT" } } }],
    "lead-change-4": [{ p: 1, walls: { all: { text: "SOMEBODY'S GOT TO PLAY THE ROCK STAR" } } }, { p: 2, walls: { all: { face: 1 } } }, { p: 3, zoom: "boots" }],
    "streak-broken-2": [{ p: 1, walls: { all: { static: 1 } } }, { p: 2, walls: { all: { face: 1 } } }, { p: 3, walls: { all: { text: "DEATH IS A CAREER MOVE" } } }, { p: 4, walls: { all: { face: 1 } } }],
    "streak-broken-3": [{ p: 1, walls: { all: { text: "RUNNING TO STAND STILL" } } }, { p: 2, walls: { all: { face: 1 } } }],
    "winner-6": [{ p: 1, at: 1.2, walls: { all: { text: "EGOMANIA" } } }, { p: 3, walls: { all: { face: 1 } } }],
    "winner-7": [{ p: 0, walls: { all: { text: "BEAUTIFUL DAY" } } }, { p: 2, walls: { all: { face: 1 } } }],
    "round-start-4": [{ p: 1, walls: { all: { static: 1 } } }, { p: 2, walls: { all: { text: "TELEVISION" } } }, { p: 3, walls: { all: { face: 1 } } },
                      { p: 4, at: 0.3, horns: 1 }],
    "round-start-5": [{ p: 1, walls: { all: { text: "WATCH MORE TV" } } }, { p: 2, walls: { all: { believe: 1 } } },
                      { p: 4, walls: { all: { text: "EVERYTHING YOU KNOW IS WRONG" } } }],
    "next-round-4": [{ p: 2, walls: { 0: { text: "UNOS" }, 1: { text: "DOS" }, 2: { text: "TRES" } } }, { p: 3, walls: { all: { text: "¡CATORCE!" } } }],
    "welcome-2": [{ p: 0, walls: { all: { text: "ACHTUNG BABY" } } }, { p: 1, walls: { all: { face: 1 } } }],
    "nobody-right-5": [{ p: 1, walls: { all: { text: "IGNORANCE IS BLISS" } } }, { p: 3, walls: { all: { text: "ADMIT NOTHING" } } }],
    "tie-1": [{ p: 1, walls: { all: { text: "WITH OR WITHOUT YOU" } } }, { p: 2, walls: { all: { face: 1 } } }],
    "all-right-4": [{ p: 2, walls: { all: { text: "ONE" } } }, { p: 3, walls: { all: { face: 1 } } }],
    "song-3": [{ p: 0, walls: { all: { eq: 1 } } }],
    "phone-3": [{ p: 1, phone: 1, walls: { all: { text: "10,000 PIZZAS" } } }],
    "phone-2": [{ p: 1, phone: 1 }],
    "goodnight-3": [{ p: 0, phone: 1 }],
  };

  const WALLS = [{ x: 52, y: 66, w: 72, h: 80 }, { x: 352, y: 46, w: 54, h: 54 }, { x: 374, y: 116, w: 56, h: 42 }];
  const TOWERS = [38, 134, 336, 440];
  const MONITORS = [[92, 224], [150, 229], [196, 232], [318, 230], [384, 222], [424, 229], [30, 150], [457, 186]];

  const el = (tag, attrs = {}, parent) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  };

  // The head is drawn once (in <defs>) and shown three ways: on his shoulders and on the video walls.
  const HEAD = `
    <path fill="#0d0b0b" d="M-9 -2C-10 -10-6-14.5 0-14.5S10-10 9-2C9 2 8 4 7 5H-7C-8 4-9 2-9-2Z"/>
    <ellipse cx="-8.2" cy="0" rx="1.4" ry="2.4" fill="#e8e0d4"/><ellipse cx="8.2" cy="0" rx="1.4" ry="2.4" fill="#e8e0d4"/>
    <path fill="#f4efe8" d="M-7.5-5C-7.5-11-4-12.5 0-12.5S7.5-11 7.5-5C7.5 3 4.5 10.5 0 10.5S-7.5 3-7.5-5Z"/>
    <path fill="#0d0b0b" d="M-8-4C-8.5-11-4.5-14.5 0-14.5S8.5-11 8-4C7-7 5.5-9 3-9.5L0-7.4-3-9.5C-5.5-9-7-7-8-4Z"/>
    <path fill="none" stroke="#5d5f6e" stroke-width=".6" stroke-linecap="round" d="M-4.5-12.6C-1.5-13.8 2-13.8 5-12.2M-6.5-9.5C-5-11-3.5-11.8-2-12"/>
    <g class="mp-horns"><path fill="#b3121f" d="M-5.4-11.6C-7.2-14-7.6-17.2-6.3-19.8-5.8-17.2-4.7-15.1-3.2-13.2Z"/>
      <path fill="#b3121f" d="M5.4-11.6C7.2-14 7.6-17.2 6.3-19.8 5.8-17.2 4.7-15.1 3.2-13.2Z"/>
      <path fill="#ff6a5c" opacity=".6" d="M-6.6-15.5-6.3-18.6M6.6-15.5 6.3-18.6" stroke="#ff8a7c" stroke-width=".5"/></g>
    <path fill="none" stroke="#1a1212" stroke-width=".55" stroke-linecap="round" d="M-6.1-5.2C-5-7.7-3-7.9-1.7-6.4M6.1-5.2C5-7.7 3-7.9 1.7-6.4"/>
    <ellipse cx="-3.5" cy="-3.1" rx="2.4" ry="1.3" fill="#5e4a7a" opacity=".55"/><ellipse cx="3.5" cy="-3.1" rx="2.4" ry="1.3" fill="#5e4a7a" opacity=".55"/>
    <g class="mp-eyes"><ellipse cx="-3.4" cy="-2.9" rx="1.3" ry=".8" fill="#140e0e"/><ellipse cx="3.4" cy="-2.9" rx="1.3" ry=".8" fill="#140e0e"/>
      <circle cx="-3" cy="-3.2" r=".3" fill="#fff"/><circle cx="3.8" cy="-3.2" r=".3" fill="#fff"/></g>
    <path fill="none" stroke="#cdbfb0" stroke-width=".5" stroke-linecap="round" d="M.1-1.6C-.3.3-.9 1.7-.3 2.3H.8"/>
    <circle cx="-4.3" cy="2.6" r="1.9" fill="#e0707a" opacity=".45"/><circle cx="4.3" cy="2.6" r="1.9" fill="#e0707a" opacity=".45"/>
    <circle cx="3.3" cy="4.2" r=".32" fill="#1a1212"/>
    <g transform="translate(0 6)"><ellipse class="mp-lips" rx="3.1" ry="1.1" fill="#c4122d"/>
      <ellipse class="mp-mouth" rx="2.1" ry=".12" fill="#2a0507"/>
      <path class="mp-lipline" d="M-3 0Q0 .45 3 0" stroke="#7d0a1b" stroke-width=".35" fill="none"/></g>`;

  // The ZOO TV logo: a Z, then the two O's as circles holding a T and a V.
  const LOGO = `<path d="M1 1.5H12L1 16.5H12.5"/><circle cx="25" cy="9" r="8"/><path d="M21 5.5H29M25 5.5V13.5"/>
    <circle cx="44" cy="9" r="8"/><path d="M40.2 5.2 44 13.2 47.8 5.2"/>`;

  function build(root) {
    const svg = el("svg", { viewBox: "0 0 480 300", class: "mp-svg", role: "img", "aria-label": "MacPhisto on a tiny ZOO TV stage" });
    const uid = "mp" + Math.random().toString(36).slice(2, 7);
    const id = s => `${uid}-${s}`;
    svg.innerHTML = `
      <defs>
        <linearGradient id="${id("lame")}" x1="0" y1="0" x2="1" y2="1" spreadMethod="reflect">
          <stop offset="0" stop-color="#7d5c16"/><stop offset=".22" stop-color="#e3bf55"/><stop offset=".36" stop-color="#fff0ad"/>
          <stop offset=".5" stop-color="#c3922a"/><stop offset=".7" stop-color="#f0d06e"/><stop offset="1" stop-color="#76561a"/>
          <animateTransform attributeName="gradientTransform" type="translate" values="-.25 0;.25 0;-.25 0" dur="5s" repeatCount="indefinite"/>
        </linearGradient>
        <linearGradient id="${id("beam")}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fff2d8" stop-opacity=".32"/><stop offset="1" stop-color="#fff2d8" stop-opacity=".04"/>
        </linearGradient>
        <radialGradient id="${id("pool")}"><stop offset="0" stop-color="#fff4dc" stop-opacity=".55"/><stop offset="1" stop-color="#fff4dc" stop-opacity="0"/></radialGradient>
        <radialGradient id="${id("glow")}"><stop offset="0" stop-color="#7fa6ff" stop-opacity=".28"/><stop offset="1" stop-color="#7fa6ff" stop-opacity="0"/></radialGradient>
        <pattern id="${id("led")}" width="2.6" height="2.6" patternUnits="userSpaceOnUse">
          <path d="M0 0H2.6M0 0V2.6" stroke="#000" stroke-width=".7" stroke-opacity=".55"/></pattern>
        <filter id="${id("blue")}" color-interpolation-filters="sRGB">
          <feColorMatrix type="matrix" values=".16 .42 .08 0 .02  .2 .52 .1 0 .05  .25 .62 .14 0 .14  0 0 0 1 0"/></filter>
        <filter id="${id("noise")}" x="0" y="0" width="100%" height="100%">
          <feTurbulence class="mp-turb" type="fractalNoise" baseFrequency=".9" numOctaves="1" seed="1"/>
          <feColorMatrix type="matrix" values="0 0 0 .9 0  0 0 0 .95 0  0 0 0 1.1 .05  0 0 0 0 1"/></filter>
        <filter id="${id("neon")}" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur stdDeviation="1.6"/></filter>
        <g id="${id("head")}">${HEAD}</g>
        ${WALLS.map((w, i) => `<clipPath id="${id("clip" + i)}"><rect x="${w.x}" y="${w.y}" width="${w.w}" height="${w.h}"/></clipPath>`).join("")}
      </defs>
      <g class="mp-world">
        <rect width="480" height="300" fill="#000"/>
        <g class="mp-truss">
          <rect x="18" y="16" width="444" height="7" fill="none" stroke="#3a2016" stroke-width="1.2"/>
          <path d="${Array.from({ length: 37 }, (_, i) => `M${18 + i * 12} 16l6 7l6-7`).join("")}" fill="none" stroke="#3a2016" stroke-width=".8"/>
          <g class="mp-lights">${Array.from({ length: 36 }, (_, i) => `<circle cx="${24 + i * 12}" cy="27" r="1.3" fill="#ff8b3d"/>`).join("")}</g>
        </g>
        ${WALLS.map((w, i) => `
          <ellipse cx="${w.x + w.w / 2}" cy="${w.y + w.h / 2}" rx="${w.w}" ry="${w.h}" fill="url(#${id("glow")})"/>
          <g class="mp-wall" clip-path="url(#${id("clip" + i)})">
            <rect x="${w.x}" y="${w.y}" width="${w.w}" height="${w.h}" fill="#0c1834"/>
            <g class="mp-wall-content"></g>
            <rect x="${w.x}" y="${w.y}" width="${w.w}" height="${w.h}" fill="url(#${id("led")})"/>
          </g>
          <rect x="${w.x}" y="${w.y}" width="${w.w}" height="${w.h}" fill="none" stroke="#9fbfff" stroke-opacity=".35" stroke-width=".8"/>`).join("")}
        ${TOWERS.map(x => `
          <g class="mp-tower">
            <path d="M${x} 23V236M${x + 10} 23V236${Array.from({ length: 18 }, (_, i) => `M${x} ${26 + i * 12}l10 6l-10 6`).join("")}" fill="none" stroke="#3a2016" stroke-width="1"/>
            ${Array.from({ length: 34 }, (_, i) => `<circle class="mp-bulb" cx="${x + (i % 2 ? 8 : 2)}" cy="${30 + i * 6}" r="1" fill="#ff9a4a"/>`).join("")}
          </g>`).join("")}
        <g class="mp-trabants">
          <path d="M196 23V54M220 23V58M276 23V50M302 23V55" stroke="#2a2626" stroke-width=".6"/>
          <g transform="translate(184 52) rotate(14)">${trabant("#2c6fb6")}</g>
          <g transform="translate(268 48) rotate(-12) scale(-1 1) translate(-30 0)">${trabant("#d0496b")}</g>
        </g>
        <polygon points="232,0 248,0 282,238 198,238" fill="url(#${id("beam")})"/>
        <polygon points="22,236 458,236 480,262 0,262" fill="#141010"/>
        <polygon points="218,262 262,262 286,300 194,300" fill="#141010"/>
        <g class="mp-edge">${Array.from({ length: 40 }, (_, i) => `<circle cx="${6 + i * 12}" cy="262" r="1" fill="#ff8b3d"/>`).join("")}
          ${Array.from({ length: 5 }, (_, i) => `<circle cx="${216 - i * 5}" cy="${266 + i * 8}" r="1" fill="#ff8b3d"/><circle cx="${264 + i * 5}" cy="${266 + i * 8}" r="1" fill="#ff8b3d"/>`).join("")}</g>
        ${MONITORS.map(([x, y]) => `<g class="mp-monitor"><rect x="${x - 7}" y="${y - 10}" width="14" height="10" fill="#1b1b22"/><rect class="mp-glass" x="${x - 6}" y="${y - 9}" width="12" height="8" fill="#b9cbf4"/></g>`).join("")}
        <ellipse cx="240" cy="239" rx="40" ry="7" fill="url(#${id("pool")})"/>
        <g class="mp-man" transform="translate(240 238)">
          <g class="mp-body">
            <path fill="#2a1c08" d="M-15.5-7H-1V0H-15.5ZM1-7H15.5V0H1Z"/>
            <path fill="url(#${id("lame")})" d="M-15-17H-1.2L-1-7H-15.5ZM1.2-17H15L15.5-7H1Z"/>
            <path fill="#fff6c8" opacity=".7" d="M-13-15h2v6h-2zM11-15h2v6h-2z"/>
            <path fill="url(#${id("lame")})" d="M-14-60H-1.2L-2.3-33-1.3-16H-15L-11.5-33ZM14-60H1.2L2.3-33 1.3-16H15L11.5-33Z"/>
            <path fill="none" stroke="#8a6418" stroke-width=".6" d="M-7-56-7.5-20M7-56 7.5-20"/>
            <path fill="url(#${id("lame")})" d="M-17-92C-12-96-5-96 0-94 5-96 12-96 17-92L16-60C10-53-10-53-16-60Z"/>
            <path fill="#f7f3ec" d="M-4.6-95 0-77 4.6-95Z"/>
            <path fill="none" stroke="#d9d2c6" stroke-width=".5" d="M-1.5-91q1.5 1 3 0M-1.2-87q1.2.9 2.4 0M-.9-83q.9.8 1.8 0"/>
            <path fill="#a67c22" d="M-4.6-95 0-77-6.5-86ZM4.6-95 0-77 6.5-86Z"/>
            <circle cx="0" cy="-71" r=".9" fill="#fff3c0"/><circle cx="0" cy="-65" r=".9" fill="#fff3c0"/>
            <path fill="#efe8de" d="M-2.6-103H2.6V-95H-2.6Z"/>
            <g class="mp-arm-l"><path fill="url(#${id("lame")})" d="M-17-93C-22-88-26-82-26.5-76L-21.5-74C-20.5-79-18-84-14-88Z"/>
              <path fill="url(#${id("lame")})" d="M-26.5-77C-24-71-20-67-15.5-64L-13-68C-17-70-20-73-22-76.5Z"/>
              <circle cx="-14.5" cy="-65.5" r="3" fill="#efe8de"/></g>
            <g class="mp-arm-r"><path fill="url(#${id("lame")})" d="M13-91C17-94 19.5-93 20.5-90L23-60H17.5L15.5-86Z"/>
              <ellipse cx="20.5" cy="-57.5" rx="2.8" ry="3.4" fill="#efe8de"/>
              <path d="M19-55.5v2.2M20.6-55v2.4M22-55.4v2" stroke="#7a0a1a" stroke-width=".7" stroke-linecap="round"/></g>
            <g class="mp-arm-phone" style="display:none">
              <path fill="url(#${id("lame")})" d="M13-91C18-94 22-91 24-86L27-79L22-76L18-84Z"/>
              <path fill="url(#${id("lame")})" d="M27-80C25-90 19-99 13-104L10-100C15-96 20-88 22.5-77Z"/>
              <circle cx="11" cy="-103" r="3" fill="#efe8de"/>
              <path fill="#c8452c" d="M6.5-118C9-119 11.6-117.6 12-115L12.6-112 11-104 9-99C8-97 5-96.5 3.5-97.5L3-99.5 6-101 8.2-109 9.3-113.6 7.2-116Z"/>
              <path fill="none" stroke="#c8452c" stroke-width=".7" d="M4-97.5C2-92 6-90 3-86S6-80 3-76S6-70 2-66S5-60 1-55"/>
            </g>
            <use href="#${id("head")}" class="mp-headuse" transform="translate(0 -112)"/>
          </g>
        </g>
        <g class="mp-logo" transform="translate(20 33) scale(1.15)" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <g stroke="#ff6a2a" stroke-width="3" opacity=".35" filter="url(#${id("neon")})">${LOGO}</g>
          <g stroke="#ff7a3a" stroke-width="1.3">${LOGO}</g>
          <g stroke="#ffd2b0" stroke-width=".4">${LOGO}</g>
        </g>
        <rect class="mp-flash" width="480" height="300" fill="#fff" opacity="0" pointer-events="none"/>
      </g>`;
    root.appendChild(svg);
    const sub = document.createElement("div");
    sub.className = "mp-sub";
    root.appendChild(sub);
    return { svg, sub, id };
  }

  function trabant(color) {
    return `<path fill="${color}" d="M0 10L2 5C4 4 7 3.5 9 1C11-1 19-1 21 1L24 4.5C27 5 29 6 30 8V11H0Z"/>
      <path fill="#101018" d="M10 1.6H13V4.4H8.6ZM14.5 1.6H19.4L21.8 4.4H14.5Z"/>
      <circle cx="6" cy="11" r="2.4" fill="#111"/><circle cx="24" cy="11" r="2.4" fill="#111"/>
      <path fill="#ffd98a" opacity=".16" d="M29 7L58 52 34 58Z"/>
      <circle cx="29.6" cy="7.6" r="1.5" fill="#ffe7b0"/>`;
  }

  function mount(root, opts = {}) {
    const base = opts.audioBase || "audio/host/";
    const lines = opts.lines || window.HOST_LINES || {};
    const { svg, sub, id } = build(root);
    const $ = s => svg.querySelector(s);
    const head = svg.querySelector(`#${id("head")}`);
    const lips = head.querySelector(".mp-lips"), mouth = head.querySelector(".mp-mouth"), eyes = head.querySelector(".mp-eyes");
    const horns = head.querySelector(".mp-horns");
    const man = $(".mp-man"), body = $(".mp-body"), world = $(".mp-world");
    const armR = $(".mp-arm-r"), armPhone = $(".mp-arm-phone"), flashRect = $(".mp-flash");
    const turb = $(".mp-turb");
    const walls = [...svg.querySelectorAll(".mp-wall-content")];
    const bulbs = [...svg.querySelectorAll(".mp-bulb, .mp-lights circle")];
    const glass = [...svg.querySelectorAll(".mp-glass")];

    // ---- the voice, and how open his mouth is
    const audio = new Audio();
    audio.preload = "auto";
    function level() {
      if (!cur || !cur.started || audio.paused) return 0;
      const env = cur.line.env, fps = cur.line.fps || 25;
      if (!env) return 0.35 + 0.35 * Math.sin(performance.now() / 70);   // no envelope: just flap
      const c = env[Math.floor(audio.currentTime * fps)];
      return c ? parseInt(c, 36) / 35 : 0;
    }
    // Safari only lets an element play by itself later if it was once started by a click or key.
    // Call this from one: it plays a moment of silence on his voice element.
    let unlocked = false;
    function unlock() {
      if (unlocked || cur) return;
      unlocked = true;
      audio.src = SILENCE;
      audio.play().then(() => { if (!cur) audio.pause(); }, () => { unlocked = false; });
    }

    // ---- video walls
    let wallState = [null, null, null];
    function wallSet(i, spec) {
      const w = WALLS[i], g = walls[i], cx = w.x + w.w / 2, cy = w.y + w.h / 2;
      wallState[i] = spec;
      g.innerHTML = "";
      if (!spec) return;
      if (spec.face || spec.eyes) {
        const k = spec.eyes ? w.w / 9 : w.h / 22;
        el("use", { href: `#${id("head")}`, filter: `url(#${id("blue")})`,
          transform: `translate(${cx} ${spec.eyes ? cy + 3 * k : cy + 1.5 * k}) scale(${k})` }, g);
      } else if (spec.believe) {
        // BELIEVE, then everything but L-I-E fades away
        const fs = Math.min(w.h * 0.42, (w.w * 0.9) / (7 * 0.62));
        const t = el("text", { x: cx, y: cy, "text-anchor": "middle", "dominant-baseline": "central", fill: "#e2ecff",
          "font-size": fs.toFixed(1), "font-family": "IBM Plex Mono, ui-monospace, monospace", "font-weight": 600 }, g);
        const fade = [];
        [..."BELIEVE"].forEach((ch, k) => {
          const ts = el("tspan", {}, t);
          ts.textContent = ch;
          if (k < 2 || k > 4) fade.push(ts);
        });
        spec.fade = { els: fade, at: performance.now() };   // the frame loop fades them
      } else if (spec.text != null) {
        const words = spec.text.split(" ");
        const maxChars = Math.max(4, Math.round(w.w / 7));
        const rows = [];
        for (const word of words) {
          if (rows.length && (rows[rows.length - 1] + " " + word).length <= maxChars) rows[rows.length - 1] += " " + word;
          else rows.push(word);
        }
        const longest = Math.max(...rows.map(r => r.length));
        const fs = Math.min(w.h / (rows.length * 1.15), (w.w * 0.9) / (longest * 0.62));
        rows.forEach((r, k) => {
          const t = el("text", { x: cx, y: cy + (k - (rows.length - 1) / 2) * fs * 1.08, "text-anchor": "middle", "dominant-baseline": "central",
            fill: "#e2ecff", "font-size": fs.toFixed(1), "font-family": "IBM Plex Mono, ui-monospace, monospace", "font-weight": 600 }, g);
          t.textContent = r;
        });
      } else if (spec.avatar) {
        const m = window.U2M && window.U2M.byId(spec.avatar);
        if (!m) return;
        const k = (w.h * 0.86) / 64;
        const a = el("g", { transform: `translate(${cx - 32 * k} ${cy - 32 * k}) scale(${k})`, fill: "#e2ecff", style: "--mc:#0c1834" }, g);
        a.innerHTML = m.icon;
      } else if (spec.static) {
        el("rect", { x: w.x, y: w.y, width: w.w, height: w.h, filter: `url(#${id("noise")})` }, g);
      } else if (spec.cameras) {
        for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
          const x = w.x + (c + 0.5) * w.w / 4, y = w.y + (r + 0.5) * w.h / 3, s = Math.min(w.w / 4, w.h / 3) / 14;
          el("path", { transform: `translate(${x} ${y}) scale(${s})`, fill: "#e2ecff",
            d: "M-6-3.5H3V3.5H-6ZM3-1.5 7-4V4L3 1.5ZM-3.5-6.5a2.2 2.2 0 1 0 .01 0Z" }, g);
        }
      } else if (spec.eq) {
        for (let b = 0; b < 8; b++) el("rect", { class: "mp-eqbar", x: w.x + 4 + b * (w.w - 8) / 8, y: cy, width: (w.w - 8) / 8 - 2, height: 1, fill: "#e2ecff" }, g);
      }
    }
    function wallsApply(spec) {
      const copy = x => (x && typeof x === "object" ? { ...x } : x);   // each wall keeps its own state (e.g. the BELIEVE fade)
      if (spec.all !== undefined) for (let i = 0; i < WALLS.length; i++) wallSet(i, copy(spec.all));
      for (let i = 0; i < WALLS.length; i++) if (spec[i] !== undefined) wallSet(i, copy(spec[i]));
    }
    // Idle: each wall changes on its own random clock to a slogan no other wall is showing,
    // now and then a burst of static or a blank screen.
    const wallNext = WALLS.map(() => 0);
    function idleWalls(now) {
      for (let i = 0; i < WALLS.length; i++) {
        if (now < wallNext[i]) continue;
        const showing = wallState.map(st => st && (st.text || (st.believe && "BELIEVE")));
        const pool = SLOGANS.filter(x => !showing.includes(x));
        const r = Math.random();
        if (r < 0.12) { wallSet(i, { static: 1 }); wallNext[i] = now + 500 + Math.random() * 900; continue; }
        if (r < 0.2) { wallSet(i, null); wallNext[i] = now + 800 + Math.random() * 1800; continue; }
        const pick = pool[(Math.random() * pool.length) | 0];
        wallSet(i, pick === "BELIEVE" ? { believe: 1 } : { text: pick });
        wallNext[i] = now + (pick === "BELIEVE" ? 6500 : 3500 + Math.random() * 5500);
      }
    }

    // ---- poses and gags
    let hornsOffAt = -1, zoomTarget = 0, zoom = 0, flashAt = -1, phone = false;
    function setPhone(on) {
      phone = on;
      armR.style.display = on ? "none" : "";
      armPhone.style.display = on ? "" : "none";
    }
    function resetGags() {
      hornsOffAt = -1; zoomTarget = 0; setPhone(false);
      horns.setAttribute("transform", ""); horns.setAttribute("opacity", 1);
    }

    // ---- subtitles: CAPS words were stress marks for the voice; show them as italics
    function showSub(text) {
      if (!text) { sub.classList.remove("on"); return; }
      const esc = text.replace(/&/g, "&amp;").replace(/</g, "&lt;");
      sub.innerHTML = esc.replace(/\b([A-Z]{2,}[A-Z']*)\b/g, w => (w === "TV" ? w : `<em>${w.toLowerCase()}</em>`));
      sub.classList.add("on");
    }

    // ---- the current line
    let cur = null; // { id, line, gags, next, phrase, resolve }
    function say(lineId) {
      stop();
      const line = lines[lineId];
      if (!line) return Promise.reject(new Error("No host line " + lineId));
      resetGags();
      for (let i = 0; i < WALLS.length; i++) wallSet(i, { face: 1 });
      const gags = (GAGS[lineId] || []).map(g => ({ ...g, t: (line.phrases[g.p] ? line.phrases[g.p].t : 0) + (g.at || 0) }))
        .sort((a, b) => a.t - b.t);
      audio.src = base + lineId + ".mp3";
      return new Promise(resolve => {
        // Only this line's own events may end it: a stopped line's play() can reject later.
        const me = cur = { id: lineId, line, gags, next: 0, phrase: -1, resolve, started: false };
        const done = () => { if (cur === me) finish(); };
        audio.onplaying = () => { if (cur === me) me.started = true; };   // subtitles and gags wait for the sound
        audio.onended = done;
        audio.onerror = done;
        audio.play().catch(done);
      });
    }
    function finish() {
      if (!cur) return;
      audio.pause();
      const r = cur.resolve, played = cur.started;
      cur = null;
      showSub("");
      resetGags();
      wallNext.fill(0);
      r(played);   // true if any of it was heard
    }
    function stop() {
      audio.pause();
      finish();
    }

    // ---- the frame loop
    let lv = 0, blinkAt = performance.now() + 2000, blinkT = -1;
    const headUse = $(".mp-headuse");
    let lastSeed = -1;
    function frame(now) {
      raf = requestAnimationFrame(frame);   // first, so nothing below can stop the loop
      if (!svg.isConnected || document.hidden) return;   // off screen: nothing to draw
      const t = now / 1000;
      const raw = level();
      lv += (raw - lv) * (raw > lv ? 0.55 : 0.25);

      if (cur && cur.started) {
        const at = audio.currentTime;
        const ps = cur.line.phrases;
        let p = -1;
        for (let i = 0; i < ps.length; i++) if (at + 0.05 >= ps[i].t) p = i;
        if (p !== cur.phrase) { cur.phrase = p; showSub(p >= 0 ? ps[p].text : ""); }
        while (cur.next < cur.gags.length && at >= cur.gags[cur.next].t) {
          const g = cur.gags[cur.next++];
          if (g.walls) wallsApply(g.walls);
          if (g.horns) hornsOffAt = now;
          if (g.zoom !== undefined) zoomTarget = g.zoom ? 1 : 0;
          if (g.phone) setPhone(true);
          if (g.flash && !REDUCE) flashAt = now;
        }
      } else if (!cur) idleWalls(now);

      // mouth
      lips.setAttribute("ry", (1.1 + lv * 1.5).toFixed(2));
      mouth.setAttribute("ry", (0.12 + lv * 1.35).toFixed(2));
      mouth.setAttribute("rx", (2.1 - lv * 0.35).toFixed(2));
      // blink
      if (now > blinkAt) { blinkT = now; blinkAt = now + 2200 + Math.random() * 3800; }
      const bk = blinkT > 0 && now - blinkT < 160 ? 0.12 : 1;
      eyes.setAttribute("transform", `translate(0 -2.9) scale(1 ${bk}) translate(0 2.9)`);
      // sway, and a little more life while talking
      const sway = Math.sin(t * 0.9) * 1.2 + (cur ? Math.sin(t * 2.3) * lv * 2 : 0);
      body.setAttribute("transform", `rotate(${sway.toFixed(2)}) translate(0 ${(Math.sin(t * 1.8) * 0.4).toFixed(2)})`);
      const nod = cur ? Math.sin(t * 5.1) * lv * 3 : Math.sin(t * 0.6) * 1.5;
      headUse.setAttribute("transform", `translate(0 -112) rotate(${nod.toFixed(2)} 0 8)`);
      armR.setAttribute("transform", `rotate(${(-(4 + 26 * lv) + Math.sin(t * 1.3) * 2).toFixed(2)} 16 -91)`);
      // horns off: up, a twirl, fade; back on at the end of the line
      if (hornsOffAt > 0) {
        const k = Math.min(1, (now - hornsOffAt) / 1400);
        horns.setAttribute("transform", `translate(0 ${(-14 * k).toFixed(2)}) rotate(${(k * 25).toFixed(1)} 0 -15)`);
        horns.setAttribute("opacity", (1 - k * 0.9).toFixed(2));
      }
      // camera zoom on the boots
      zoom += (zoomTarget - zoom) * 0.06;
      if (zoom > 0.001) {
        const s = 1 + 2.2 * zoom, fx = 240, fy = 150 + (226 - 150) * zoom;
        world.setAttribute("transform", `translate(240 150) scale(${s.toFixed(3)}) translate(${-fx} ${(-fy).toFixed(2)})`);
      } else world.removeAttribute("transform");
      // flash
      if (flashAt > 0) {
        const k = (now - flashAt) / 600;
        flashRect.setAttribute("opacity", k < 1 ? ((1 - k) * 0.45).toFixed(2) : 0);   // one soft flash, not a strobe
        if (k >= 1) flashAt = -1;
      }
      // stage lights twinkle; monitors and static flicker
      if ((now | 0) % 3 === 0) {
        const b = bulbs[(Math.random() * bulbs.length) | 0];
        b.setAttribute("opacity", Math.random() < 0.5 ? 0.35 : 1);
        const g = glass[(Math.random() * glass.length) | 0];
        g.setAttribute("opacity", (0.55 + Math.random() * 0.45).toFixed(2));
      }
      const seed = (now / 60) | 0;
      if (seed !== lastSeed && wallState.some(st => st && st.static)) { lastSeed = seed; turb.setAttribute("seed", seed); }
      wallState.forEach(st => {
        if (!st || !st.fade) return;
        const o = Math.max(0, Math.min(1, 1 - (now - st.fade.at - 1400) / 1600));
        st.fade.els.forEach(ts => ts.setAttribute("opacity", o.toFixed(2)));
        if (o === 0) st.fade = null;
      });
      if (wallState.some(st => st && st.eq)) svg.querySelectorAll(".mp-eqbar").forEach((bar, i) => {
        const w = WALLS[0], h = (0.15 + lv * (0.5 + 0.5 * Math.abs(Math.sin(t * 7 + i * 1.7)))) * 0.8;
        const wall = bar.closest(".mp-wall-content"), wi = walls.indexOf(wall), ww = WALLS[wi] || w;
        bar.setAttribute("height", (ww.h * h).toFixed(1));
        bar.setAttribute("y", (ww.y + ww.h * (1 - h) - 2).toFixed(1));
      });
    }
    let raf = requestAnimationFrame(frame);

    return {
      say, stop, unlock,
      get speaking() { return !!cur; },
      lines: () => Object.keys(lines),
      destroy() { stop(); cancelAnimationFrame(raf); audio.removeAttribute("src"); audio.load(); svg.remove(); sub.remove(); },
    };
  }

  return { mount, GAGS, SILENCE };
})();

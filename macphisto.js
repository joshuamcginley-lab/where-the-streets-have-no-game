// MacPhisto, the host: a little gold-lamé devil on a miniature ZOO TV stage.
// Video walls, scaffold towers with orange lights, two hanging Trabants, monitors on the deck.
// While he talks, the video walls are a live broadcast of him: close-ups, eyes, lips and the full figure in
// different tints, cut on every phrase; his lips follow the voice.
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
  // Between lines the walls now and then flash words in quick succession, ZOO TV style
  const CUTUPS = [["WATCH", "MORE", "TV"], ["CALL", "NOW"], ["BELIEVE", "EVERYTHING"], ["ADMIT", "NOTHING"], ["ZOO", "TV"], ["EVERYTHING", "YOU KNOW", "IS WRONG"]];
  // The camera tints: each wall's picture goes through one of these
  const TINTS = ["blue", "red", "amber", "green", "mono"];
  const TINT_BG = { blue: "#0c1834", red: "#2a0608", amber: "#2a1604", green: "#04200c", mono: "#121214" };

  // What happens on stage during a line. p = the subtitle phrase it starts on.
  // walls: what the video walls show ("all" or wall 0/1/2): text, avatar, static, cameras, eyes, eq, bars (colour bars,
  // optional caption), applause (a blinking sign), cutup (words flashed in turn). face: back to the live cameras;
  // face with a shot ("close", "eyes", "lips", "wide") and a tint picks the picture instead.
  const STREAK = id => [{ p: 0, walls: { all: { avatar: id } } }, { p: 1, walls: { all: { face: 1 } } }, { p: 3, phone: 1 }];
  const GAGS = {
    "round-start-1": [{ p: 0, at: 1.0, horns: 1 }],
    "round-start-2": [{ p: 2, zoom: "boots" }, { p: 3, zoom: 0 }],
    "streak-larry-1": STREAK("larry"), "streak-bono-1": STREAK("bono"),
    "streak-adam-1": STREAK("adam"), "streak-edge-1": STREAK("edge"),
    ...Object.fromEntries(["larry", "bono", "adam", "edge"].map(id => [`streak-${id}-2`, [{ p: 0, walls: { all: { avatar: id } } }, { p: 2, walls: { all: { face: 1 } } }]])),
    "lead-change-1": [{ p: 2, walls: { all: { text: "GIGANTIC" } } }, { p: 3, walls: { all: { face: 1 } } }],
    "winner-1": [{ p: 0, walls: { 0: { text: "LOOK WHAT YOU'VE DONE TO ME" }, 1: { text: "LOOK" }, 2: { text: "WHAT YOU'VE DONE" } } }, { p: 2, walls: { all: { face: 1 } } }],
    "winner-2": [{ p: 0, walls: { all: { text: "WINNER" } } }, { p: 1, walls: { all: { face: 1 } } }],
    "wager-2": [{ p: 2, walls: { all: { text: "EVERYTHING YOU KNOW IS WRONG" } } }],
    "wager-3": [{ p: 1, walls: { all: { text: "FAITH" } } }, { p: 2, walls: { all: { face: 1 } } }],
    "bet-won-1": [{ p: 0, walls: { all: { text: "EVERYTHING" } } }, { p: 2, walls: { all: { face: 1 } } }],
    "bet-lost-1": [{ p: 1, walls: { all: { static: 1 } } }, { p: 2, walls: { all: { face: 1 } } }],
    "double-1": [{ p: 1, walls: { all: { text: "GLORY" } } }, { p: 2, walls: { all: { text: "SHAME" } } }],
    "double-3": [{ p: 1, walls: { all: { text: "GREATEST HITS" } } }, { p: 2, walls: { all: { face: 1 } } }],
    "who-said-1": [{ p: 1, walls: { 0: { text: "THE FLY" }, 1: { text: "THE SINGER" }, 2: { text: "ME" } } }, { p: 2, walls: { all: { face: 1 } } }],
    "tour-winner-2": [{ p: 1, walls: { all: { text: "FAME" } } }, { p: 2, walls: { all: { face: 1 } } }],
    "tour-break-2-2": [{ p: 2, walls: { all: { text: "THE HOUSE ALWAYS WINS" } } }],
    "lead-change-8": [{ p: 1, walls: { all: { text: "EVERYTHING YOU KNOW IS WRONG" } } }],
    "lone-right-2": [{ p: 1, walls: { all: { text: "WATCH MORE TV" } } }],
    "same-wrong-1": [{ p: 1, walls: { all: { text: "WRONG" } } }],
    "all-right-8": [{ p: 1, walls: { all: { text: "ONE" } } }, { p: 2, walls: { all: { face: 1 } } }],
    "close-3": [{ p: 1, walls: { all: { text: "TWO HEARTS" } } }],
    "round-two-1": [{ p: 2, walls: { all: { text: "OCTOBER" } } }],
    "join-4": [{ p: 1, walls: { all: { text: "SIGN HERE" } } }, { p: 2, walls: { all: { face: 1 } } }],
    "hurry-3": [{ p: 1, walls: { all: { text: "SILENCE IS GOLDEN" } } }, { p: 2, walls: { all: { static: 1 } } }],
    "aside-2": [{ p: 0, walls: { all: { text: "LAS VEGAS" } } }, { p: 2, walls: { all: { face: 1 } } }],
    "aside-3": [{ p: 0, walls: { all: { text: "LEMON" } } }],
    "aside-5": [{ p: 1, phone: 1 }],
    "aside-7": [{ p: 1, walls: { all: { static: 1 } } }, { p: 2, walls: { all: { face: 1 } } }],
    "who-said-3": [{ p: 1, walls: { 0: { text: "THE FLY" }, 1: { text: "MIRROR BALL MAN" }, 2: { text: "THE SINGER" } } }, { p: 2, walls: { all: { face: 1 } } }],
    "winner-3": [{ p: 1, walls: { all: { text: "RICH & FAMOUS" } } }, { p: 2, walls: { all: { face: 1 } } }],
    "winner-5": [{ p: 2, walls: { all: { text: "GLAMOROUS" } } }],
    "close-2": [{ p: 1, phone: 1 }],
    "hurry-1": [{ p: 0, walls: { all: { text: "11:00" } } }, { p: 1, walls: { all: { text: "TICK TOCK" } } }],
    "streak-broken-1": [{ p: 0, walls: { all: { static: 1 } } }, { p: 1, walls: { all: { face: 1 } } }],
    "song-1": [{ p: 0, walls: { all: { eq: 1 } } }],
    "last-question-2": [{ p: 1, phone: 1 }],
    "phone-1": [{ p: 0, phone: 1 }, { p: 2, walls: { all: { text: "ENGAGED" } } }],
    "goodnight-1": [{ p: 2, phone: 1 }],
    "join-1": [{ p: 3, walls: { all: { text: "" } } }, { p: 4, walls: { 0: { text: "6" } } }, { p: 5, walls: { 1: { text: "6" } } },
               { p: 6, walls: { 2: { text: "6" } } }, { p: 7, phone: 1 }],
    "lobby-full-1": [{ p: 1, walls: { all: { avatar: "edge" } } }, { p: 2, walls: { all: { avatar: "adam" } } },
                     { p: 3, walls: { all: { avatar: "larry" } } }, { p: 4, walls: { all: { avatar: "bono" } } }],
    "nobody-right-2": [{ p: 0, walls: { all: { text: "EVERYTHING YOU KNOW IS WRONG" } } }, { p: 1, walls: { all: { face: 1 } } }],
    "start-4": [{ p: 4, walls: { all: { static: 1 } } }],
    "last-q-3": [{ p: 3, walls: { all: { eyes: 1 } } }, { p: 4, walls: { all: { cameras: 1 } } }],
    "last-place-3": [{ p: 2, walls: { all: { text: "DECIBELS" } }, flash: 1 }, { p: 3, walls: { all: { face: 1 } } }],
    // batch 5 and 6
    "streak-any-1": [{ p: 0, walls: { all: { text: "4 IN A ROW" } } }, { p: 1, walls: { all: { face: 1 } } }],
    "streak-any-2": [{ p: 0, walls: { all: { text: "4 IN A ROW" } } }, { p: 1, walls: { all: { static: 1 } } }, { p: 2, walls: { all: { face: 1 } } }],
    "lead-change-2": [{ p: 1, walls: { all: { text: "CELEBRITY IS A JOB" } } }, { p: 3, zoom: "boots" }],
    "lead-change-3": [{ p: 1, walls: { all: { text: "STUCK IN A MOMENT" } } }],
    "lead-change-4": [{ p: 1, walls: { 0: { text: "SOMEBODY'S GOT TO PLAY THE ROCK STAR" }, 1: { text: "ROCK" }, 2: { text: "STAR" } } }, { p: 2, walls: { all: { face: 1 } } }, { p: 3, zoom: "boots" }],
    "streak-broken-2": [{ p: 0, at: 1.48, walls: { all: { static: 1 } } }, { p: 1, walls: { all: { face: 1 } } }, { p: 2, walls: { all: { text: "DEATH IS A CAREER MOVE" } } }, { p: 3, walls: { all: { face: 1 } } }],
    "streak-broken-3": [{ p: 1, walls: { all: { text: "RUNNING TO STAND STILL" } } }, { p: 2, walls: { all: { face: 1 } } }],
    "winner-6": [{ p: 1, at: 2.2, walls: { all: { text: "EGOMANIA" } } }, { p: 3, walls: { all: { face: 1 } } }],
    "winner-7": [{ p: 0, walls: { all: { text: "BEAUTIFUL DAY" } } }, { p: 2, walls: { all: { face: 1 } } }],
    "round-start-4": [{ p: 1, walls: { all: { static: 1 } } }, { p: 2, walls: { all: { text: "TELEVISION" } } }, { p: 3, walls: { all: { face: 1 } } },
                      { p: 4, at: 0.3, horns: 1 }],
    "round-start-5": [{ p: 1, walls: { all: { text: "WATCH MORE TV" } } }, { p: 2, walls: { all: { believe: 1 } } },
                      { p: 4, walls: { 0: { text: "EVERYTHING YOU KNOW IS WRONG" } } }],   // LIE stays on the small walls
    "next-round-4": [{ p: 2, walls: { 0: { text: "UNOS" }, 1: { text: "DOS" }, 2: { text: "TRES" } } }, { p: 3, walls: { all: { text: "¡CATORCE!" } } }],
    "welcome-2": [{ p: 0, walls: { all: { text: "ACHTUNG BABY" } } }, { p: 1, walls: { all: { face: 1 } } }],
    "nobody-right-5": [{ p: 1, walls: { all: { text: "IGNORANCE IS BLISS" } } }, { p: 3, walls: { all: { text: "ADMIT NOTHING" } } }],
    "tie-1": [{ p: 1, walls: { all: { text: "WITH OR WITHOUT YOU" } } }, { p: 2, walls: { all: { face: 1 } } }],
    "all-right-4": [{ p: 1, at: 1.0, walls: { all: { text: "ONE" } } }, { p: 2, walls: { all: { face: 1 } } }],
    "song-3": [{ p: 0, walls: { all: { eq: 1 } } }],
    "song-4": [{ p: 0, walls: { all: { eq: 1 } } }, { p: 4, at: 0.9, walls: { all: { text: "POP" } } }],
    "lead-change-5": [{ p: 1, walls: { all: { text: "BOY" } } }, { p: 2, walls: { all: { text: "WAR" } } }, { p: 3, walls: { all: { face: 1 } } }],
    "last-place-5": [{ p: 1, walls: { all: { text: "A SORT OF HOMECOMING" } } }],
    "last-question-3": [{ p: 2, walls: { 0: { text: "WHERE THE STREETS HAVE NAMES" }, 1: { text: "STREETS" }, 2: { text: "NAMES" } } }, { p: 3, walls: { all: { face: 1 } } }],
    "goodnight-4": [{ p: 1, walls: { all: { text: "THE REAL THING" } } }, { p: 2, walls: { all: { face: 1 } } }],
    "nobody-right-6": [{ p: 1, walls: { all: { text: "ACHTUNG = ATTENTION" } } }, { p: 2, walls: { all: { face: 1 } } }],
  };

  // More gags, added to any above for the same line
  const T = text => ({ all: { text } }), FACE = { all: { face: 1 } };
  const SHOT = (shot, tint) => ({ all: { face: 1, shot, tint } });
  const THREE = { 0: { face: 1, shot: "close", tint: "blue" }, 1: { face: 1, shot: "close", tint: "red" }, 2: { face: 1, shot: "close", tint: "amber" } };
  const MORE = {
    "round-start-1": [{ p: 1, walls: { all: { cutup: ["ON", "WITH", "THE", "SHOW"] } } }, { p: 2, walls: FACE }],
    "nobody-right-1": [{ p: 0, walls: T("NOT ONE") }, { p: 1, walls: FACE }, { p: 3, phone: 1 }],
    "welcome-1": [{ p: 0, walls: T("WELCOME") }, { p: 1, walls: FACE }, { p: 2, walls: { 1: { text: "FAMOUS" } } }, { p: 3, walls: FACE }],
    "round-start-2": [{ p: 0, walls: { all: { cameras: 1 } } }, { p: 1, walls: FACE }],
    "round-start-3": [{ p: 0, walls: T("ANOTHER ROUND") }, { p: 1, walls: FACE }],
    "close-2": [{ p: 0, walls: { 0: { text: "NECK" }, 1: { text: "AND" }, 2: { text: "NECK" } } }, { p: 2, walls: FACE }],
    "last-place-1": [{ p: 1, walls: T("BOTTOM") }, { p: 3, walls: FACE }, { p: 4, walls: SHOT("close", "red") }],
    "last-place-2": [{ p: 0, walls: T("LAST PLACE") }, { p: 1, walls: FACE }, { p: 2, walls: SHOT("close", "red") }],
    "cover-1": [{ p: 0, walls: { all: { bars: 1 } } }, { p: 1, walls: FACE }],
    "last-question-2": [{ p: 0, walls: T("ONE MORE") }, { p: 1, walls: T("TAXI") }, { p: 2, walls: FACE }],
    "next-round-2": [{ p: 1, walls: T("JUST ONE MORE") }, { p: 2, walls: FACE }],
    "goodnight-1": [{ p: 0, walls: T("THAT'S THE SHOW") }, { p: 1, walls: { all: { applause: 1 } } }, { p: 2, walls: FACE }],
    "all-right-3": [{ p: 0, walls: { all: { cameras: 1 } } }, { p: 1, walls: FACE }, { p: 2, walls: T("CHEATING") }, { p: 3, walls: FACE }],
    "last-place-4": [{ p: 1, walls: T("YOU CAN'T MAKE IT ON YOUR OWN") }, { p: 2, walls: FACE }],
    "join-2": [{ p: 0, walls: T("HELLO, HELLO") }, { p: 1, walls: FACE }],
    "cover-2": [{ p: 0, walls: { all: { bars: 1 } } }, { p: 1, walls: FACE }],
    "cover-3": [{ p: 1, walls: SHOT("eyes", "blue") }, { p: 2, walls: FACE }, { p: 3, walls: THREE }],
    "tour-break-1-1": [{ p: 0, walls: T("ROUND ONE") }, { p: 1, walls: { all: { eq: 1 } } }, { p: 2, walls: FACE }],
    "tour-break-1-2": [{ p: 0, walls: T("ROUND ONE") }, { p: 1, walls: { all: { static: 1 } } }, { p: 2, walls: FACE }],
    "tour-break-2-1": [{ p: 0, walls: T("ONE TO GO") }, { p: 1, walls: FACE }, { p: 2, walls: T("BET EVERYTHING") }],
    "tour-winner-1": [{ p: 0, walls: T("3 ROUNDS") }, { p: 1, walls: T("1 CHAMPION") }, { p: 2, walls: FACE }],
    "wager-1": [{ p: 1, walls: T("PLACE YOUR BETS") }, { p: 2, walls: SHOT("eyes", "red") }],
    "bet-won-2": [{ p: 0, walls: T("ALL IN") }, { p: 1, walls: FACE }],
    "bet-lost-2": [{ p: 0, walls: { all: { static: 1 } } }, { p: 1, walls: FACE }, { p: 2, walls: SHOT("close", "red") }],
    "double-2": [{ p: 0, walls: T("2X") }, { p: 1, walls: FACE }],
    "who-said-2": [{ p: 0, walls: T("WHO SAID IT?") }, { p: 1, walls: FACE }, { p: 2, walls: THREE }],
    "all-right-5": [{ p: 1, walls: T("MYSTERIOUS WAYS") }],
    "streak-any-3": [{ p: 0, walls: T("4 IN A ROW") }, { p: 1, walls: FACE }, { p: 2, walls: { all: { cutup: ["SUNGLASSES", "STADIUMS"] } } }],
    "streak-any-4": [{ p: 0, walls: T("4 IN A ROW") }, { p: 1, walls: FACE }],
    "streak-any-5": [{ p: 0, walls: T("4 IN A ROW") }, { p: 1, walls: T("ACHTUNG") }],
    "streak-any-6": [{ p: 0, walls: { 0: { text: "4" }, 1: { text: "IN A" }, 2: { text: "ROW" } } }, { p: 1, walls: FACE }, { p: 2, walls: SHOT("close", "amber") }],
    "lead-change-6": [{ p: 0, walls: T("NEW LEADER") }, { p: 1, walls: { all: { cameras: 1 } } }, { p: 2, walls: SHOT("eyes", "blue") }],
    "lead-change-7": [{ p: 0, walls: T("NEW LEADER") }, { p: 1, walls: FACE }],
    "lead-change-9": [{ p: 0, walls: T("NEW LEADER") }, { p: 1, walls: FACE }, { p: 2, walls: T("WAVE") }],
    "streak-broken-4": [{ p: 0, walls: { all: { static: 1 } } }, { p: 1, walls: FACE }],
    "streak-broken-5": [{ p: 0, walls: { all: { bars: 1, caption: "PLEASE STAND BY" } } }, { p: 1, walls: FACE }],
    "streak-broken-6": [{ p: 0, walls: { all: { static: 1 } } }, { p: 1, walls: { all: { avatar: "edge" } } }, { p: 2, walls: FACE }],
    "all-right-6": [{ p: 0, walls: T("EVERYONE") }, { p: 1, walls: FACE }, { p: 2, walls: SHOT("wide", "amber") }],
    "all-right-7": [{ p: 0, walls: T("ALL CORRECT") }, { p: 1, walls: FACE }, { p: 2, walls: T("THE MANAGEMENT") }],
    "nobody-right-7": [{ p: 0, walls: T("NOBODY") }, { p: 1, walls: T("IGNORANCE IS BLISS") }],
    "nobody-right-8": [{ p: 0, walls: T("NOT ONE") }, { p: 1, walls: FACE }],
    "nobody-right-9": [{ p: 0, walls: T("NOBODY") }, { p: 1, walls: FACE }],
    "same-wrong-2": [{ p: 0, walls: T("SAME ANSWER") }, { p: 1, walls: T("WRONG") }, { p: 2, walls: FACE }],
    "lone-right-1": [{ p: 0, walls: { 0: { text: "ONLY ONE" }, 1: { static: 1 }, 2: { static: 1 } } }, { p: 1, walls: FACE }, { p: 2, walls: { all: { cameras: 1 } } }],
    "lone-right-3": [{ p: 0, walls: T("JUST ONE") }, { p: 1, walls: FACE }],
    "buzzer-1": [{ p: 0, walls: T("JUST IN TIME") }, { p: 1, walls: FACE }],
    "buzzer-2": [{ p: 0, walls: T("LAST SECOND") }, { p: 1, walls: FACE }, { p: 2, walls: { 1: { applause: 1 } } }],
    "close-4": [{ p: 0, walls: { 0: { text: "NECK" }, 1: { text: "AND" }, 2: { text: "NECK" } } }, { p: 1, walls: FACE }],
    "last-place-6": [{ p: 0, walls: T("LAST PLACE") }, { p: 1, walls: { all: { avatar: "adam" } } }],
    "last-place-7": [{ p: 0, walls: T("BOTTOM") }, { p: 1, walls: FACE }],
    "last-place-8": [{ p: 0, walls: T("LAST PLACE") }, { p: 1, walls: FACE }, { p: 2, walls: SHOT("close", "red") }],
    "hurry-4": [{ p: 0, walls: T("TIME'S UP") }, { p: 1, phone: 1, walls: FACE }],
    "hurry-5": [{ p: 0, walls: { all: { static: 1 } } }, { p: 1, walls: T("TRABANT") }],
    "aside-1": [{ p: 0, walls: T("FREE ALBUM") }, { p: 1, walls: FACE }],
    "aside-4": [{ p: 0, walls: T("1993") }, { p: 1, walls: FACE }],
    "aside-6": [{ p: 1, walls: { all: { eq: 1 } } }, { p: 2, walls: FACE }],
    "round-start-6": [{ p: 0, walls: { all: { bars: 1 } } }, { p: 1, walls: T("DUBLIN") }, { p: 2, walls: FACE }],
    "next-round-5": [{ p: 1, walls: T("FAREWELL TOUR") }],
    "next-round-6": [{ p: 0, walls: T("ANOTHER ROUND") }, { p: 1, walls: FACE }],
    "song-5": [{ p: 0, walls: { all: { eq: 1 } } }],
    "song-6": [{ p: 0, walls: { all: { eq: 1 } } }, { p: 1, walls: { all: { avatar: "edge" } } }, { p: 2, walls: FACE }],
    "cover-4": [{ p: 0, walls: { all: { bars: 1 } } }, { p: 1, walls: { 0: { text: "FACES" }, 1: { text: "DESERTS" }, 2: { text: "BOY" } } }, { p: 2, walls: FACE }],
    "cover-5": [{ p: 0, walls: { all: { bars: 1 } } }, { p: 1, walls: FACE }],
    "who-said-4": [{ p: 0, walls: T("WHO SAID IT?") }, { p: 1, walls: FACE }],
    "double-4": [{ p: 0, walls: T("DOUBLE POINTS") }, { p: 1, walls: FACE }],
    "double-5": [{ p: 0, walls: T("2X") }, { p: 1, walls: FACE }, { p: 2, walls: { all: { applause: 1 } } }],
    "winner-8": [{ p: 0, walls: T("WINNER") }, { p: 1, walls: { all: { cameras: 1 } } }, { p: 2, walls: FACE }],
    "winner-9": [{ p: 0, walls: T("WINNER") }, { p: 1, walls: FACE }, { p: 2, walls: T("HUMBLE") }],
    "tie-2": [{ p: 0, walls: T("A TIE") }, { p: 1, walls: FACE }],
    "bet-won-3": [{ p: 0, walls: T("EVERYTHING") }, { p: 1, walls: FACE }],
    "bet-lost-3": [{ p: 0, walls: { all: { static: 1 } } }, { p: 1, walls: FACE }],
    "goodnight-5": [{ p: 0, walls: T("GOODNIGHT") }, { p: 1, walls: FACE }, { p: 2, walls: SHOT("eyes", "blue") }],
    "goodnight-6": [{ p: 0, walls: T("THAT'S THE SHOW") }, { p: 1, walls: { all: { bars: 1 } } }, { p: 2, walls: { all: { static: 1 } } }],
    "welcome-3": [{ p: 0, walls: T("WELCOME") }, { p: 1, walls: FACE }, { p: 2, walls: SHOT("eyes", "red") }],
    "join-3": [{ p: 0, walls: T("HELLO") }, { p: 1, walls: FACE }, { p: 2, walls: T("GOLD") }],
    "join-5": [{ p: 0, walls: T("HELLO") }, { p: 1, walls: FACE }],
    "order-1": [{ p: 0, walls: T("HISTORY") }, { p: 1, walls: { 0: { text: "1" }, 1: { text: "2" }, 2: { text: "3" } } }, { p: 2, walls: FACE }],
    "order-2": [{ p: 0, walls: T("ORDER") }, { p: 1, walls: FACE }, { p: 2, walls: { all: { static: 1 } } }],
    "order-3": [{ p: 0, walls: T("OLDEST FIRST") }, { p: 1, walls: FACE }],
  };
  for (const k in MORE) GAGS[k] = [...(GAGS[k] || []), ...MORE[k]];

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
        <filter id="${id("red")}" color-interpolation-filters="sRGB">
          <feColorMatrix type="matrix" values=".36 .9 .2 0 .1  .06 .2 .05 0 0  .07 .22 .05 0 .02  0 0 0 1 0"/></filter>
        <filter id="${id("amber")}" color-interpolation-filters="sRGB">
          <feColorMatrix type="matrix" values=".32 .82 .16 0 .1  .2 .55 .1 0 .04  .03 .1 .02 0 0  0 0 0 1 0"/></filter>
        <filter id="${id("green")}" color-interpolation-filters="sRGB">
          <feColorMatrix type="matrix" values=".05 .14 .03 0 0  .26 .72 .15 0 .06  .07 .18 .04 0 .01  0 0 0 1 0"/></filter>
        <filter id="${id("mono")}" color-interpolation-filters="sRGB">
          <feColorMatrix type="matrix" values=".27 .64 .12 0 .02  .27 .64 .12 0 .02  .29 .68 .13 0 .04  0 0 0 1 0"/></filter>
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
        <g class="mp-man" id="${id("man")}" transform="translate(240 238)">
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
    const MONO = "IBM Plex Mono, ui-monospace, monospace";
    // Text as big as it fits on wall w: tries every line length and keeps the one with the biggest letters
    function textInto(g, w, text, fill = "#e2ecff") {
      const cx = w.x + w.w / 2, cy = w.y + w.h / 2, words = text.split(" ");
      let rows = [text], fs = 0;
      for (let maxChars = 1; maxChars <= text.length; maxChars++) {
        const r = [];
        for (const word of words) {
          if (r.length && (r[r.length - 1] + " " + word).length <= maxChars) r[r.length - 1] += " " + word;
          else r.push(word);
        }
        const longest = Math.max(...r.map(x => x.length));
        const f = Math.min(w.h / (r.length * 1.15), (w.w * 0.9) / (longest * 0.62));
        if (f > fs) { fs = f; rows = r; }
      }
      rows.forEach((r, k) => {
        const t = el("text", { x: cx, y: cy + (k - (rows.length - 1) / 2) * fs * 1.08, "text-anchor": "middle", "dominant-baseline": "central",
          fill, "font-size": fs.toFixed(1), "font-family": MONO, "font-weight": 600 }, g);
        t.textContent = r;
      });
    }
    // The live cameras: the big wall mostly holds the close-up; the small ones go through eyes, lips,
    // the full figure and the close-up, each in a different tint. cutN moves on at every cut.
    let cutN = 0, smallN = 0;
    function director(i) {
      const n = cutN + (i ? smallN : 0), A = ["eyes", "lips", "wide", "close"];
      const shot = i === 0 ? (n % 4 === 3 ? "wide" : "close") : A[(n + (i === 1 ? 0 : 2)) % 4];
      const tint = i === 0 ? (n % 3 === 2 ? "red" : "blue") : TINTS[(2 * n + 2 * i) % TINTS.length];
      return { face: 1, shot, tint, live: i === 0 };
    }
    function wallSet(i, spec) {
      const w = WALLS[i], g = walls[i], cx = w.x + w.w / 2, cy = w.y + w.h / 2;
      if (spec && spec.face && !spec.shot) spec = director(i);   // "back to his face": whatever the cameras are on now
      wallState[i] = spec;
      g.innerHTML = "";
      if (!spec) return;
      if (spec.face || spec.eyes) {
        const shot = spec.eyes ? "eyes" : spec.shot, tint = spec.tint || "blue", f = `url(#${id(tint)})`;
        el("rect", { x: w.x, y: w.y, width: w.w, height: w.h, fill: TINT_BG[tint] }, g);
        if (shot === "wide") {   // the whole man, as he is on stage (a live copy)
          const k = (w.h * 0.86) / 134;
          el("use", { href: `#${id("man")}`, filter: f, transform: `translate(${cx} ${w.y + w.h * 0.96}) scale(${k.toFixed(3)}) translate(-240 -238)` }, g);
        } else {
          const k = shot === "eyes" ? w.w / 9 : shot === "lips" ? w.w / 8 : w.h / 22;
          const y = shot === "eyes" ? cy + 3 * k : shot === "lips" ? cy - 6 * k : cy + 1.5 * k;
          el("use", { href: `#${id("head")}`, filter: f, transform: `translate(${cx} ${y}) scale(${k})` }, g);
        }
        if (spec.live) {   // the broadcast's LIVE bug, top left
          const b = el("g", { transform: `translate(${w.x + 3} ${w.y + 3})` }, g);
          el("rect", { width: 17, height: 6.5, rx: 1, fill: "#d0121f" }, b);
          el("circle", { class: "mp-live-dot", cx: 3.3, cy: 3.25, r: 1.3, fill: "#fff" }, b);
          el("text", { x: 5.6, y: 3.45, "dominant-baseline": "central", fill: "#fff", "font-size": 4.3, "font-family": MONO, "font-weight": 700 }, b).textContent = "LIVE";
        }
      } else if (spec.bars) {   // colour bars, as when a channel isn't on air
        const cols = ["#c0c0c0", "#c0c000", "#00c0c0", "#00c000", "#c000c0", "#c00000", "#0000c0"], bw = w.w / 7;
        cols.forEach((c, k) => el("rect", { x: w.x + k * bw, y: w.y, width: bw + 0.2, height: w.h * 0.68, fill: c }, g));
        ["#0000c0", "#131313", "#c000c0", "#131313", "#00c0c0", "#131313", "#c0c0c0"].forEach((c, k) =>
          el("rect", { x: w.x + k * bw, y: w.y + w.h * 0.68, width: bw + 0.2, height: w.h * 0.08, fill: c }, g));
        el("rect", { x: w.x, y: w.y + w.h * 0.76, width: w.w, height: w.h * 0.24, fill: "#0a0a12" }, g);
        el("rect", { x: w.x + w.w * 0.08, y: w.y + w.h * 0.8, width: w.w * 0.2, height: w.h * 0.16, fill: "#f2f2f2" }, g);
        if (spec.caption) {
          const band = { x: w.x, y: w.y + w.h * 0.3, w: w.w, h: w.h * 0.22 };
          el("rect", { x: band.x, y: band.y, width: band.w, height: band.h, fill: "#000", opacity: 0.85 }, g);
          textInto(g, { x: band.x + 2, y: band.y + 1, w: band.w - 4, h: band.h - 2 }, spec.caption);
        }
      } else if (spec.applause) {   // the studio sign, lit and blinking
        el("rect", { x: w.x, y: w.y, width: w.w, height: w.h, fill: "#140304" }, g);
        const sign = { x: w.x + w.w * 0.06, y: cy - w.h * 0.17, w: w.w * 0.88, h: w.h * 0.34 };
        const s2 = el("g", { class: "mp-blink" }, g);
        el("rect", { x: sign.x, y: sign.y, width: sign.w, height: sign.h, rx: 2, fill: "#3a0508", stroke: "#ff3b30", "stroke-width": 1 }, s2);
        textInto(s2, { x: sign.x + 2, y: sign.y + 1, w: sign.w - 4, h: sign.h - 2 }, "APPLAUSE", "#ff5a4a");
        spec.at = performance.now();
      } else if (spec.cutup) {   // the words take turns, one at a time
        spec.els = spec.cutup.map(word => {
          const gw = el("g", { style: "display:none" }, g);
          textInto(gw, w, word);
          return gw;
        });
        spec.at = performance.now(); spec.shown = -1;
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
        textInto(g, w, spec.text);
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
    // A cut: a flick of static, then the new picture
    function cut(i, spec) {
      if (REDUCE) return wallSet(i, spec);
      wallSet(i, { static: 1, then: spec, until: performance.now() + 110 });
    }
    // On a new phrase (or every few seconds on the small walls) the cameras change on every wall showing him
    const showingHim = i => { const st = wallState[i]; return !!st && (!!st.face || !!(st.then && st.then.face)); };
    let nextSmallCut = 0;
    function recut(now, all) {
      if (all) cutN++; else smallN++;
      for (let i = all ? 0 : 1; i < WALLS.length; i++) if (showingHim(i)) cut(i, director(i));
      glass.forEach(gl => gl.setAttribute("fill", ["#b9cbf4", "#ff6a5c", "#ffd36a", "#86f0a8", "#ffffff", "#7fa6ff"][(Math.random() * 6) | 0]));
      nextSmallCut = now + 2300 + Math.random() * 1200;
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
        if (r < 0.18) { wallSet(i, null); wallNext[i] = now + 800 + Math.random() * 1800; continue; }
        if (r < 0.23 && !wallState.some(st => st && st.bars)) { wallSet(i, { bars: 1 }); wallNext[i] = now + 1800 + Math.random() * 1500; continue; }
        if (r < 0.31 && !wallState.some(st => st && st.cutup)) {
          const words = CUTUPS[(Math.random() * CUTUPS.length) | 0];
          wallSet(i, { cutup: words }); wallNext[i] = now + words.length * 420 * 2; continue;
        }
        const pick = pool[(Math.random() * pool.length) | 0];
        wallSet(i, pick === "BELIEVE" ? { believe: 1 } : { text: pick });
        wallNext[i] = now + (pick === "BELIEVE" ? 6500 : 3500 + Math.random() * 5500);
      }
    }

    // Show a message on every wall for a while (between lines, e.g. "PLACE YOUR BETS")
    function hold(text, ms = 8000) {
      if (cur) return;
      if (!text || !ms) { wallNext.fill(0); return; }   // release: back to the slogans
      for (let i = 0; i < WALLS.length; i++) wallSet(i, { text });
      wallNext.fill(performance.now() + ms);
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
      sub.innerHTML = esc.replace(/\b([A-Z]{2,}[A-Z']*)\b/g, (w, _m, i, all) => {
        if (w === "TV") return w;
        const start = i === 0 || /[!?]\s+$|[^.]\.\s+$/.test(all.slice(0, i));   // a sentence starts here ("..." carries on)
        const low = w.toLowerCase();
        return `<em>${start ? w[0] + low.slice(1) : low}</em>`;
      });
      sub.classList.add("on");
    }

    // ---- the current line
    let cur = null; // { id, line, gags, next, phrase, resolve }
    function say(lineId) {
      stop();
      const line = lines[lineId];
      if (!line) return Promise.reject(new Error("No host line " + lineId));
      resetGags();
      cutN = 0; smallN = 0; nextSmallCut = performance.now() + 2600;
      for (let i = 0; i < WALLS.length; i++) wallSet(i, { face: 1 });
      const gags = (GAGS[lineId] || []).map(g => ({ ...g, t: (line.phrases[g.p] ? line.phrases[g.p].t : 0) + (g.at || 0) }))
        .sort((a, b) => a.t - b.t);
      audio.src = base + lineId + ".mp3";
      return new Promise(resolve => {
        // Only this line's own events may end it: a stopped line's play() can reject later.
        const me = cur = { id: lineId, line, gags, next: 0, phrase: -1, resolve, started: false };
        const done = () => { if (cur === me) finish(); };
        audio.onplaying = () => { if (cur === me) me.started = true; };   // subtitles and gags wait for the sound
        audio.onended = () => { if (cur === me) finish(true); };
        audio.onerror = done;
        audio.play().catch(done);
      });
    }
    // ended: he got to the end of the line (not cut short). Now and then the studio asks for applause.
    function finish(ended = false) {
      if (!cur) return;
      audio.pause();
      const r = cur.resolve, played = cur.started;
      cur = null;
      showSub("");
      resetGags();
      glass.forEach(gl => gl.setAttribute("fill", "#b9cbf4"));
      if (ended && Math.random() < 0.3 && !wallState.some(st => st && st.applause)) wallSet(1 + ((Math.random() * 2) | 0), { applause: 1 });
      wallNext.fill(wallState.some(st => st && !st.face) ? performance.now() + 1800 : 0);   // let a last slogan be read
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
        if (p !== cur.phrase) { cur.phrase = p; showSub(p >= 0 ? ps[p].text : ""); if (p > 0) recut(now, true); }
        else if (now > nextSmallCut) recut(now, false);
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
      wallState.forEach((st, i) => { if (st && st.then && now >= st.until) wallSet(i, st.then); });   // a cut's static is over
      const on = ((now / 500) | 0) % 2 === 0;
      svg.querySelectorAll(".mp-live-dot").forEach(d => d.setAttribute("opacity", on ? 1 : 0.2));
      wallState.forEach(st => {
        if (st && st.applause) walls[wallState.indexOf(st)].querySelector(".mp-blink")?.setAttribute("opacity", REDUCE || ((now - st.at) / 380 | 0) % 2 === 0 ? 1 : 0.3);
        if (st && st.cutup) {
          const k = ((now - st.at) / 420 | 0) % st.els.length;
          if (k !== st.shown) { st.els.forEach((e, j) => e.style.display = j === k ? "" : "none"); st.shown = k; }
        }
      });
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
      say, stop, unlock, walls: hold,
      get speaking() { return !!cur; },
      lines: () => Object.keys(lines),
      destroy() { stop(); cancelAnimationFrame(raf); audio.removeAttribute("src"); audio.load(); svg.remove(); sub.remove(); },
    };
  }

  return { mount, GAGS, SILENCE };
})();

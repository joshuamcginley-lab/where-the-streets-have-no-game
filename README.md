# Where the Streets Have No Game

A U2 trivia party game in the style of Jackbox. The TV shows the questions; everyone answers on their phone.

- **1–4 players.** Each picks a band member: Bono, The Edge, Adam Clayton or Larry Mullen Jr. No two players can pick the same one.
- **Three modes.** *Casual Fan* (the hits and the big moments), *Deep Cuts* (B-sides, studios, producers, tour lore) and *Name That Song* (a clip plays on the TV; name it). Casual and Deep Cuts games also include one song clip.
- **Song clips** are Apple Music's 30-second previews, streamed from Apple (nothing is hosted here). The list is in `songs.js`. Click the TV screen once before playing so the browser allows sound.
- **Album covers.** Casual and Deep Cuts rounds also include one "Name the album" question: the TV zooms in on a detail of a U2 cover and slowly pulls back. The list is in `covers.js` (artwork streamed from Apple). Passengers' *Original Soundtracks 1* only turns up in Deep Cuts. A right answer is worth up to 300 (the TV shows what it's worth now), dropping as the cover pulls back.
- **Put them in order.** Casual and Deep Cuts rounds also include one sorting question: four albums, big moments or (in Deep Cuts) tours, to put in order, earliest first. Tap them in order on the phone (the fourth goes in by itself; Undo takes one back); the player on the TV uses keys 1–4 and Backspace. 30 seconds; all four right scores like any right answer, two in the right place gets 50. The sets are `ORDER` in `questions.js`.
- **Tournament.** Three rounds in a row with scores carried: Casual Fan, a deep-cut Name That Song, then Deep Cuts. Its very last question is the **final wager**: everyone bets part of their score from their phone (anyone under 200 can still bet 200), right wins the bet, wrong loses it. Every other round ends with the last question worth **double points**.
- **Who said it?** Quote questions where the answer is always The Fly, MacPhisto, Mirror Ball Man or Bono in an interview.
- **Rounds of 10 questions**, 4 choices each, 20 seconds per question (30 for the sorting one). MacPhisto reads each question out first (not the song clips), and the clock starts when he finishes; answers count from the start, and **Enter** on the TV skips his reading. The readings are in `audio/q/`, made with `python3 tools/question-voice.py`, which only makes the ones that are missing, so run it after adding or editing questions. Faster answers and streaks score more. After each round, pick the next round's mode and keep going: scores carry over. Click the title band to start a new game.
- **Reloading the TV is safe.** The TV saves the game in its browser tab on every change; reload it (or the browser restores the tab) within half an hour and it reopens the same room code and carries on from the same screen, scores and all. Phones reconnect by themselves and get their own seats back.
- **No repeats.** The TV remembers which questions and clips it has used (in that browser, across nights, across all its windows) and won't repeat one until it has been through the whole pool for that mode. A private/incognito window starts with no memory. A round also avoids two of the same kind of question (two "Which album features…", say).
- **Solo:** click a character on the TV screen to play right there with a mouse or keys 1–4. No phone needed. Opened on a phone (or any upright screen), the start screen is made for playing alone: tap a game (Casual Fan, Deep Cuts, Name That Song, Tournament) to start it straight away, as the character picked under "You're playing as" (remembered on that device; Bono to begin with). The TV's room code and QR fold away behind "Playing on a TV with friends? Show the room code", and the usual TV start screen comes back as soon as a phone joins the room.
- **MacPhisto hosts.** He stands on a miniature ZOO TV stage (video walls, Trabants, the tour's slogans) and talks between questions. While he talks the walls are a live broadcast of him: close-ups, eyes, lips and the full figure in different tints, cut on every phrase, with colour bars, word cut-ups and the odd APPLAUSE sign, never over one: in the lobby, at the start of each round, before the song, album and last questions (once a night each), on some reveals (four in a row, a lead change, a broken streak, everyone or nobody right…), at the final scores, and to say goodnight. Press **Enter** on the TV (or **Skip him** on the VIP's phone) to cut him short. Preview every line at `/host`. The voice lines are in `audio/host/`.

## How to play

1. Open the site on the device connected to your TV (see *Getting it on the TV* below).
2. Players scan the QR code with their phone camera, or go to the `/play` address shown and type the 4-letter room code.
3. Each player picks a character. The first phone to join is the **VIP**: they choose the mode and start the game from their phone. The TV can also start it with the button or Enter.
4. The question appears on the TV, and the four answers appear on every phone. After everyone answers (or time runs out), the TV reveals the answer, who picked what, and a fact about it.

**Bono's count-in.** Before the first question the TV plays the opening of "Vertigo" (`audio/vertigo-intro.m4a`), with "UNOS · DOS · TRES · ¡CATORCE!" timed to Bono's voice and the band crashing in on the last word. If the clip can't play, a computer voice does the count-in instead. If you swap in a different clip, open `/sync` on the TV computer to tap along and re-time the words, then put the new numbers in `CLIP_AT` in `index.html`.

TV keyboard shortcuts: **Enter** start, next, or skip MacPhisto, **1–4** answer for the on-screen player, **F** full screen. Sound is always on.

## Getting it on the TV

The TV page runs in a web browser, so any way of getting a browser onto the TV works:

- **Apple TV:** open the site in Safari on a Mac, then use Control Center → Screen Mirroring → your Apple TV. Click **Full screen** on the page.
- **Chromecast / Google TV:** open the site in Chrome on a laptop, then use the ⋮ menu → **Cast…** → choose your TV → *Cast tab*.
- **Smart TV / Fire TV:** open the site in the TV's own web browser.
- **Or** plug a laptop into the TV with HDMI.

Use a laptop or the TV itself as the host, not a phone you also want to play on. Phones are the controllers.

## Hosting it for free on Cloudflare Pages

This is a static site with no build step and no server code, so Cloudflare Pages hosts it for free.

1. Create a free account at <https://dash.cloudflare.com/sign-up>.
2. In the dashboard, go to **Workers & Pages** → **Create** → **Pages** tab → **Connect to Git**.
3. Authorise GitHub and choose the `where-the-streets-have-no-game` repository.
4. On the build settings screen:
   - **Production branch:** `main`
   - **Framework preset:** None
   - **Build command:** leave empty
   - **Build output directory:** `/`
5. Click **Save and Deploy**. After about a minute you get an address like `https://where-the-streets-have-no-game.pages.dev`.

Every push to `main` redeploys automatically.

## How the phones connect

Phones talk to the TV directly over WebRTC using [PeerJS](https://peerjs.com). The free PeerJS cloud server only introduces the devices to each other; the game itself runs entirely in the TV's browser. There's no backend to run or pay for.

If the TV says phones can't connect (some corporate or school networks block WebRTC), you can still play solo on the TV screen.

## Customising

- **Questions** live in `questions.js`. Each has the question, the right answer, three believable wrong answers, and a fact shown after the reveal. A game draws 10 at random from the chosen mode.
- **Character photos:** the characters use drawn icons. To use photos, add square images named `img/bono.jpg`, `img/edge.jpg`, `img/adam.jpg` and `img/larry.jpg`. Any that exist replace the icon automatically. Only use photos you have the right to publish.

## Testing locally

Serve the folder with any static server, for example `python3 -m http.server 8000`. Then open:

- `http://localhost:8000/?net=local` for the TV
- `http://localhost:8000/play.html?net=local` in other tabs of the same browser for the phones

`?net=local` swaps WebRTC for an in-browser channel so you can test without a network.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The TV screen (host) |
| `play.html` | The phone controller |
| `questions.js` | Question bank for both modes |
| `members.js` | The four playable characters |
| `net.js` | Connection layer (PeerJS, or local test mode) |
| `host.html`, `macphisto.js`, `host-lines.js` | MacPhisto, the host, on his miniature ZOO TV stage (preview page; lines in `audio/host/`) |
| `shared.css` | Shared colours and type |
| `vendor/` | PeerJS 1.5.4 and qrcode-generator 1.4.4 |
| `og.png` | Link-preview image (LinkedIn, iMessage, Slack): a 1200×630 screenshot of the lobby |

A fan-made game. Not affiliated with U2 or Island Records.

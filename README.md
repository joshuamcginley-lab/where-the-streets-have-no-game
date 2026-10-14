# Where the Streets Have No Game

A U2 trivia party game in the style of Jackbox. The TV shows the questions; everyone answers on their phone.

- **1–4 players.** Each picks a character: Bono, The Edge, Adam Clayton, Larry Mullen Jr., MacPhisto or Mirror Ball Man. No two players can pick the same one.
- **Three modes.** *Casual Fan* (the hits and the big moments), *Deep Cuts* (B-sides, studios, producers, tour lore) and *Name That Song* (a clip plays on the TV; name it). Casual and Deep Cuts games also include one song clip.
- **Song clips** are Apple Music's 30-second previews, streamed from Apple (nothing is hosted here). The list is in `songs.js`. Click the TV screen once before playing so the browser allows sound.
- **10 questions a game**, 4 choices each, 20 seconds per question. Faster answers and streaks score more.
- **Solo:** click a character on the TV screen to play right there with a mouse or keys 1–4. No phone needed.

## How to play

1. Open the site on the device connected to your TV (see *Getting it on the TV* below).
2. Players scan the QR code with their phone camera, or go to the `/play` address shown and type the 4-letter room code.
3. Each player picks a character. The first phone to join is the **VIP**: they choose the mode and start the game from their phone. The TV can also start it with the button or Enter.
4. The question appears on the TV, and the four answers appear on every phone. After everyone answers (or time runs out), the TV reveals the answer, who picked what, and a fact about it.

**Bono's count-in.** Before the first question the TV plays the opening of "Vertigo" (`audio/vertigo-intro.m4a`), with "UNOS · DOS · TRES · ¡CATORCE!" timed to Bono's voice and the band crashing in on the last word. If the clip can't play, a computer voice does the count-in instead. If you swap in a different clip, open `/sync` on the TV computer to tap along and re-time the words, then put the new numbers in `CLIP_AT` in `index.html`.

TV keyboard shortcuts: **Enter** start or next, **1–4** answer for the on-screen player, **F** full screen. Sound is always on.

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
- **Character photos:** the characters use drawn icons. To use photos, add square images named `img/bono.jpg`, `img/edge.jpg`, `img/adam.jpg`, `img/larry.jpg`, `img/macphisto.jpg` and `img/mirrorball.jpg`. Any that exist replace the icon automatically. Only use photos you have the right to publish.

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
| `members.js` | The six playable characters |
| `net.js` | Connection layer (PeerJS, or local test mode) |
| `shared.css` | Shared colours and type |
| `vendor/` | PeerJS 1.5.4 and qrcode-generator 1.4.4 |

A fan-made game. Not affiliated with U2 or Island Records.

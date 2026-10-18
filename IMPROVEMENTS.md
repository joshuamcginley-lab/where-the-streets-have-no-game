# Future improvements

Things to fix once Reddit traffic settles down. Nothing here is urgent: the game works.
Test each one with a full game across several phones (`?net=local`, see CLAUDE.md) before shipping.

## Layout shift on the question screen

Cloudflare Web Analytics (Core Web Vitals → CLS, Oct 18): 76% good, 18% needs improvement, 6% poor.
The jumps come from the question screen as it fills in:

- `#stage > section.play > div.qbody`: CLS up to 0.377
- `#stage > section.play > div.answers`: CLS up to 0.297
- `#stage > section.hosting.play > div.answers`: CLS 0.176

On a phone this can move an answer just as someone taps, so they pick the wrong one. Fix: reserve the
question's and answers' space before their content arrives (fixed or minimum heights, no late-loading
content pushing them down).

## Slow tap on MacPhisto's stage

One interaction took 496 ms to respond (INP), on `#host-slot > div.host.overlay > svg.mp-svg > g.mp-world > rect`.
Look at what a click on the host overlay does and whether it can respond faster.

## Backup for phone connections

Phones reach the TV through the free shared PeerJS server. If traffic keeps growing, joining could get
flaky. Consider a fallback server, or at least a clearer message telling people to play solo on the TV.

## Count games, not just visits

Web Analytics counts page visits. A small counter for games started and finished, and players per game
(like fishr's `usage.js`), would show how many people actually play.

## Make solo on a phone the main way in

Web Analytics, first hour of the r/U2Band post (Oct 18): 86 visits, 81 to `/` and only 5 to `/play`;
68 mobile, 15 desktop, 3 tablet; nearly all from Reddit. So almost everyone plays solo on their phone,
on the TV page. On a phone, lead with a big "Play solo" button (pick a character and start in one or two
taps) and move the QR code / room code box below it or behind a "Playing on a TV?" link.

## Shareable score

After a solo game, offer a share button (Web Share API on phones, copy-to-clipboard otherwise) with
something like "I got 8/10 on Deep Cuts in Where the Streets Have No Game. Can you beat it?" plus the link.
Solo players posting scores back to Reddit is how the game keeps spreading.

## Version stamp overlaps the lobby on phones

On a phone-sized screen the `v86 · Oct 18` stamp (`.ver`) sits on top of The Edge's character card in the
lobby. Move it or hide it on narrow screens.

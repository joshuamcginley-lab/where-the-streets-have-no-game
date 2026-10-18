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

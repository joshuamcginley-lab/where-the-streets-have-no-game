# Where the Streets Have No Game

U2 trivia party game. Static site, no build step. See README.md for how it works.

## Deploying

Cloudflare Pages is connected to this GitHub repo and deploys the `main` branch to
https://where-the-streets-have-no-game.pages.dev/ about a minute after every push.

The owner wants every change live. After finishing a change:

1. Test it (below).
2. Stamp the version: `tools/version.sh` (or install it once as the pre-commit hook:
   `cp tools/version.sh .git/hooks/pre-commit`). It writes the build number and date into the
   bottom corner of the TV and phone pages, so the owner can tell a cached page from the latest.
   Then commit straight to `main` and `git push origin main`. Don't open a pull request
   or use a feature branch unless asked.
3. Check the live site picked it up, e.g. `curl` the page and look for the new version number.

Only push working code: whatever is on `main` is what players see.

## Testing

Serve the folder (`python3 -m http.server 8765`) and open the pages with `?net=local`:
`index.html?net=local` is the TV, and `play.html?net=local` in other tabs of the same
browser are the phones. Local mode swaps WebRTC for BroadcastChannel, so it runs
without a network. Playwright can drive a full game this way.

## Content

- Questions are in `questions.js`. Every question needs 4 choices, and the 3 wrong
  answers must be believable (real songs, people, places from U2's world, never jokes).
  Only add facts you are sure of.
- Characters are in `members.js`. Photos are optional: `img/<id>.jpg`.
- **Every question must have a MacPhisto reading.** Whenever questions are added or edited (in `questions.js`,
  including the `ORDER` prompts), run `python3 tools/question-voice.py` in the same change. It makes the missing
  readings through the ElevenLabs API (`audio/q/<id>.mp3`), deletes ones no question uses any more, and rebuilds
  `question-voice.js`. Commit all three. It costs roughly 0.45 ElevenLabs credits per character of question text.

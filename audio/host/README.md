# MacPhisto host lines

Voice lines for the planned MacPhisto host. Not wired into the game yet; preview them on `/host` (host.html), where he performs them on a tiny ZOO TV stage (macphisto.js).

After adding a take here and a row to the table below, run `python3 tools/host-lines.py` to rebuild `host-lines.js` (the subtitle timings and the loudness his lips follow).

- Voice: ElevenLabs library voice "AK - British Posh Well-Spoken Old Man" on Eleven v4. Batches 1–6 were generated on the website; batch 7 on came through the API on a paid plan: `python3 tools/eleven.py audio/host/script-batch-7.md` makes raw takes in `_raw/` (level them to about −27.5 LUFS, mono 192k, into this folder), then `python3 tools/eleven.py --align audio/host/script-batch-7.md` saves word timings in `align/`, which time the subtitles. No cloning; Bono/U2/MacPhisto are never named in prompts.
- Treatment: each take is cut at its natural pauses and re-spaced to MacPhisto's measured timing
  (about 0.9 s between phrases, 1.2 s after a big line, 2–4 s where a crowd would react). No EQ or echo.

| File | Moment | Text |
| --- | --- | --- |
| round-start-1.mp3 | Round start | Ah... off with the horns... / On with the SHOW! / You DO like your quizmasters to be exciting... don't you? |
| nobody-right-1.mp3 | Nobody got it right | Not... ONE of you? / I must say... that's AWFULLY impressive. / You're my kind of people... aren't you? / The clever ones never call me. |
| streak-larry-1.mp3 | Larry on a streak | Larry! FOUR in a row! / Is he a personal friend of mine? / He is... NOW. / Shall I give him a telephone call? / Shall I? / ...He's put me on hold. |
| streak-bono-1.mp3 | Bono on a streak | Bono! FOUR in a row! / (rest as Larry) |
| streak-adam-1.mp3 | Adam on a streak | Adam! FOUR in a row! / (rest as Larry) |
| streak-edge-1.mp3 | The Edge on a streak | Edge! FOUR in a row! / (rest as Larry) |
| lead-change-1.mp3 | Lead change | Oh, how the mighty FALL... don't they? / I should know. / I used to be GIGANTIC, you know... / Never mind! / On with the show! |
| winner-1.mp3 | Final winner | Look what you've done... / ...to me. / You've won... and I'm AWFULLY proud. / Of course... it was all MY idea. / Everything was my idea. |
| welcome-1.mp3 | New game | Welcome, welcome! / Yes... it's really me. / You made me very famous... / and I've never quite forgiven you. |
| round-start-2.mp3 | Round start | Oh... it's you lot again. / How lovely. / I've had my boots polished, you know. / Shall we see who's been paying attention? |
| round-start-3.mp3 | Round start (later rounds) | Ladies and gentlemen... ANOTHER round! / I'm very tired, you know. / But for you... I'll make an exception. |
| close-2.mp3 | Close race | Neck and neck! / Just like me and the President... / Except he won't take my calls. |
| hurry-1.mp3 | Time running out | Eleven o'clock... tick tock... tick tock. |
| streak-broken-1.mp3 | Streak broken | Oh! The streak is BROKEN! / Fame is so fleeting... isn't it? / Except mine. |
| song-1.mp3 | Song clip question | Listen carefully... / I wrote this one, you know. / Well... I was in the room. |
| last-place-1.mp3 | Last place | Oh dear... someone's at the bottom. / Don't worry. / I've been down there. It's very WARM. |
| last-place-2.mp3 | Last place | Last place... / I'll put in a good word for you. / Downstairs. |
| cover-1.mp3 | Album cover question | A little picture for you. / I'm in all of them, you know. / Somewhere. |
| last-question-2.mp3 | Last question | One more... / Then I'm calling a taxi. / I'm awfully tired. |
| winner-2.mp3 | Final winner | We have a WINNER! / Oh... I'm so proud. / Of course... I let you win. |
| winner-3.mp3 | Final winner | Bravo! / You're nearly as rich and famous as me now. / Nearly. |
| next-round-2.mp3 | Between rounds | Another round... / Just one more. / That's what they all say. |
| phone-1.mp3 | Phone gag (a lull) | Round about now... I usually make a telephone call. / Shall I? / ...Engaged. |
| goodnight-1.mp3 | Goodnight | Well... that's the show. / You've been wonderful. / Now... where's my taxi? |
| join-1.mp3 | A player joins | Ah... a new friend! / When you're famous... people want your NUMBER. / Here's mine. / Six... six... six. / Call anytime. I'm always up. |
| lobby-full-1.mp3 | All four characters taken | Oh... the whole band is here! / Reggie the Dog... / the cat that got the CREAM... / the handsome one... / and the singer. What a silly mug. |
| all-right-3.mp3 | Everyone got it right | Ooh... VERY revealing! / All of you? / Somebody's been cheating... I like that. |
| nobody-right-2.mp3 | Nobody got it right | Everything you know... is WRONG! / I did warn you. / It was on all the televisions. |
| start-4.mp3 | Game start | People of the living room! / When I came among you... you were squabbling like CHILDREN. / Now you're all hooked up to one cable... as close together as stations on a dial. |
| last-q-3.mp3 | Last question | My time among you... is almost at an END. / But don't fear... / I'll be WATCHING you. / I leave behind video cameras... for each of you. |
| last-place-3.mp3 | Last place | To whoever is in last place... / I give you... / DECIBELS. / You're welcome. |
| winner-5.mp3 | Final winner | Congratulations! / So now you can dream... of being as wealthy and GLAMOROUS as me. |
| streak-any-1.mp3 | Four in a row (anyone) | FOUR in a row! / Even better than the real thing... / Which is me, of course. |
| streak-any-2.mp3 | Four in a row (anyone) | Four in a ROW! / Oh... I'm getting vertigo. / Somebody fetch my smelling salts. |
| lead-change-2.mp3 | Lead change | A new leader! / Celebrity is a job, you know. / The hours are dreadful. / But the boots are free. |
| lead-change-3.mp3 | Lead change | Oh dear... the old leader... / Stuck in a MOMENT. / Can't get out of it, I'm told. |
| lead-change-4.mp3 | Lead change | Top of the table! / Somebody's got to play the rock star. / I used to say that... in leather trousers. / Before the trousers won. |
| streak-broken-2.mp3 | Streak broken | Oh! The streak is DEAD. / Don't be sad. / Death is a career move. / Ask my record company. |
| streak-broken-3.mp3 | Streak broken | All that running... / just to stand still. / I know the feeling. |
| winner-6.mp3 | Final winner | Our champion! / When I was young, there were reports of egomania. / So I became EVERYTHING they said. / I see you've done the same. |
| last-place-4.mp3 | Last place | Bottom of the table... / Sometimes you can't make it on your own. / Fortunately... I can. |
| winner-7.mp3 | Final winner | Oh, it's a BEAUTIFUL day! / Magnificent... simply magnificent. / I'll take ten percent, of course. |
| round-start-4.mp3 | Round start (first round) | Ladies and gentlemen... I have a VISION! / Television! / Well... it worked in 1992. / Off with the horns... on with the quiz! |
| round-start-5.mp3 | Round start (first round) | A little advice before we start. / Watch more TV. / Believe everything. / And remember... everything you know is WRONG. |
| next-round-4.mp3 | Round 2 start (before the count-in) | Another round! / Somebody count us in... / in Spanish, preferably. / And BADLY. |
| welcome-2.mp3 | New game | Achtung, baby! / Welcome to my little show. / Do sit down. Mind the Trabants. |
| join-2.mp3 | A player joins | Hello, hello! / Ah... another one. / I knew you'd come. / They always do. |
| nobody-right-5.mp3 | Nobody got it right | Nobody? / Ignorance is BLISS. / And remember... admit nothing. |
| all-right-4.mp3 | Everyone got it right | Everybody? / Oh... we're all ONE. / Stop it. It's revolting. |
| tie-1.mp3 | Final: a tie | A TIE! / With or without you... / I simply can't choose. |
| song-3.mp3 | Song clip question | Listen... / Have you found what you're looking for? / I still haven't. And I've looked EVERYWHERE. |
| cover-2.mp3 | Album cover question | Now... a little picture. / Judge the album by its cover. / Everybody else does. |
| cover-3.mp3 | Album cover question | Look closely now. / The mask tells you more about the man. / I should know. / I'm wearing three. |
| lead-change-5.mp3 | Lead change | A new leader. / From Boy... to War... in one question. |
| nobody-right-6.mp3 | Nobody got it right | Nobody? / Achtung means attention, you know. / Wasted on you. |
| last-question-3.mp3 | Last question | The last question. / Then I'm off home... / where the streets have names. Dreadful. |
| song-4.mp3 | Song clip question | Listen. / Know this one? You've been paying attention. / Don't? You were listening to Pop. |
| goodnight-4.mp3 | Goodnight | That's the show. / You may now go back to the real thing. / I'm told it's not as good. |
| last-place-5.mp3 | Last place | Last place. / Think of it as a sort of homecoming. |
| tour-break-1-1.mp3 | Tournament: between rounds | That's round one. / Next... the songs nobody requests. / I adore them. They never ask for anything. |
| tour-break-1-2.mp3 | Tournament: between rounds | One round down. / Now the songs the radio forgot. / I remember every one of them. I was in the room. |
| tour-break-2-1.mp3 | Tournament: between rounds | Two rounds down. One to go. / And at the very end... a little wager. / I do so enjoy watching people bet everything. |
| tour-break-2-2.mp3 | Tournament: between rounds | The last round. / Deep cuts... and then a bet. / Be careful. The house always wins... and I am the house. |
| tour-winner-1.mp3 | Tournament champion | Three rounds. / One champion. / You earned it... which is so much less fun than inheriting it. |
| tour-winner-2.mp3 | Tournament champion | The tournament champion! / Enjoy it. Fame is fleeting. / I should know. I've been fleeting since 1993. |
| wager-1.mp3 | Final wager | The last question. / But first... a little wager. / Bet what you like. I already know how it ends. |
| wager-2.mp3 | Final wager | One last question... and a bet. / Wager everything you know, if you like. / Mind you... everything you know is wrong. |
| wager-3.mp3 | Final wager | The final wager. / Some call it faith. / I call it a very good business. |
| bet-won-1.mp3 | Bet everything and won | Everything... and right. / Faith, rewarded. / Don't tell anyone. It's bad for business. |
| bet-won-2.mp3 | Bet everything and won | All in... and right. / I like you. You'll go far. / Probably too far. |
| bet-lost-1.mp3 | Bet everything and lost | Everything... on one question. / And now... nothing. / Don't worry. That's how I started. |
| bet-lost-2.mp3 | Bet everything and lost | Oh dear. All of it? / Never mind. / I'll see it goes to a good home. Mine. |
| double-1.mp3 | Double points | This one is worth double. / Twice the glory... / twice the shame. |
| double-2.mp3 | Double points | Double points. / Even last place can dream. / Dreaming is free. Losing costs extra. |
| double-3.mp3 | Double points | Double points on this one. / Think of it as the greatest-hits price. / Twice as much... for something you already had. |
| who-said-1.mp3 | Who said it? | Now... who said it? / The Fly, the singer, or me. / We're very hard to tell apart. Especially for us. |
| who-said-2.mp3 | Who said it? | A quotation. Who said it? / Careful... one of us lies for a living. / Possibly all of us. |
| all-right-5.mp3 | Everyone got it right | All of you. / Mysterious ways, I suppose. |

# MacPhisto host lines

Voice lines for the planned MacPhisto host. Not wired into the game yet; preview them on `/host` (host.html), where he performs them on a tiny ZOO TV stage (macphisto.js).

After adding a take here and a row to the table below, run `python3 tools/host-lines.py` to rebuild `host-lines.js` (the subtitle timings and the loudness his lips follow).

- Voice: ElevenLabs library voice "AK - British Posh Well-Spoken Old Man" on Eleven v4. Batches 1–6 were generated on the website; batch 7 on came through the API on a paid plan: `python3 tools/eleven.py audio/host/script-batch-7.md` makes raw takes in `_raw/`, `--level` copies them here at the same loudness as the rest, then `python3 tools/eleven.py --align audio/host/script-batch-7.md` saves word timings in `align/`, which time the subtitles. No cloning; Bono/U2/MacPhisto are never named in prompts.
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
| phone-1.mp3 | Aside (a quiet reveal) | Round about now... I usually make a telephone call. / Shall I? / ...Engaged. |
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
| streak-any-3.mp3 | Four in a row (anyone) | Four in a row. / Careful. That's how it starts. / First the sunglasses... then the stadiums. |
| streak-any-4.mp3 | Four in a row (anyone) | Four in a row. / Someone's been doing their homework. / Or someone else's. |
| streak-any-5.mp3 | Four in a row (anyone) | Four in a row. / Achtung, everyone. We have a contender. |
| streak-any-6.mp3 | Four in a row (anyone) | Four. In a row. / Don't let it go to your head. / It went to mine. It's still there. |
| streak-larry-2.mp3 | Larry on a streak | Larry. Four in a row. / Steady as ever. / He started the band with a note on a school noticeboard, you know. Look what he's done now. |
| streak-edge-2.mp3 | The Edge on a streak | The Edge. Four in a row. / Precise, clever... and wearing a hat. / Some things never change. |
| streak-adam-2.mp3 | Adam on a streak | Adam. Four in a row. / The bass player, winning. / Don't tell the others. They'll want a meeting. |
| streak-bono-2.mp3 | Bono on a streak | The singer. Four in a row. / Try not to make a speech about it. / He will, of course. |
| lead-change-6.mp3 | Lead change | A new leader. / Enjoy the view. Everyone's looking at you now. / Including me. |
| lead-change-7.mp3 | Lead change | We have a new leader. / The old one is taking it very well. / Outwardly. |
| lead-change-8.mp3 | Lead change | Change at the top. / Everything you know is wrong... including the scores. |
| lead-change-9.mp3 | Lead change | A new leader. / Every revolution ends with somebody new on the balcony. / Wave. |
| streak-broken-4.mp3 | Streak broken | And the streak is over. / It was lovely while it lasted. / Most things are. |
| streak-broken-5.mp3 | Streak broken | There goes the streak. / Don't worry. Every great run ends with a disappointing album. |
| streak-broken-6.mp3 | Streak broken | Streak over. / Even the Edge hits a wrong note. Very occasionally. / He'll deny it. |
| all-right-6.mp3 | Everyone got it right | Everyone got it. / How unusually democratic. / I much prefer a monarchy. With me in it. |
| all-right-7.mp3 | Everyone got it right | All correct. / Clearly that one was too easy. / I'll speak to the management. I am the management. |
| all-right-8.mp3 | Everyone got it right | Every one of you. / One answer. One love. / I feel slightly unwell. |
| nobody-right-7.mp3 | Nobody got it right | Nobody. / Not to worry. Ignorance is very popular this season. |
| nobody-right-8.mp3 | Nobody got it right | Not one of you. / I couldn't have planned it better. / And believe me, I tried. |
| nobody-right-9.mp3 | Nobody got it right | Nobody got it. / Somewhere, a trivia book is weeping. |
| same-wrong-1.mp3 | Everyone picked the same wrong answer | All of you. The same wrong answer. / That's not a mistake. That's a movement. |
| same-wrong-2.mp3 | Everyone picked the same wrong answer | Every one of you picked the same answer. / And every one of you was wrong. / I do admire the teamwork. |
| lone-right-1.mp3 | Only one player right | Only one of you. / A lonely genius. / I was one once. Then I got an audience. |
| lone-right-2.mp3 | Only one player right | One right answer. / The rest of you... watched more TV. |
| lone-right-3.mp3 | Only one player right | Just the one. / Somebody's been reading the sleeve notes. |
| buzzer-1.mp3 | Right in the last second | Just in time. / Very rock and roll. Never early for anything. |
| buzzer-2.mp3 | Right in the last second | At the very last second. / I do admire a dramatic entrance. / I made a career of them. |
| close-3.mp3 | Close race | It's close. / Two hearts... beating as one. / One of them is about to stop. |
| close-4.mp3 | Close race | A close race. / Somebody is about to be very gracious in defeat. / Everybody says that. Nobody means it. |
| last-place-6.mp3 | Last place | Last place. / Never mind. Every band needs a bass player. |
| last-place-7.mp3 | Last place | Bottom of the table. / The first shall be last... / and the last, I'm afraid, are still last. |
| last-place-8.mp3 | Last place | Last place. / I started at the bottom, you know. / Then I fell further. Much more fun. |
| hurry-3.mp3 | Time running out | No answers at all. / I'm told silence is golden. / It isn't. I checked. |
| hurry-4.mp3 | Time running out | Time's up. Not a single answer. / Were you all on the telephone? |
| hurry-5.mp3 | Time running out | Nothing? / Even a Trabant gets there eventually. |
| aside-1.mp3 | Aside (a quiet reveal) | I once put an album in everyone's library. / Without asking. / Some say it was my finest work. |
| aside-2.mp3 | Aside (a quiet reveal) | They always said I'd end up playing Las Vegas. / I did. The band came too. / They brought a very large ball. |
| aside-3.mp3 | Aside (a quiet reveal) | I was once trapped inside a giant lemon. / In front of a whole stadium. / You learn who your friends are. None of them, as it happens. |
| aside-4.mp3 | Aside (a quiet reveal) | People ask if I miss the nineties. / I don't. I'm still in them. / Nobody has told me otherwise. |
| aside-5.mp3 | Aside (a quiet reveal) | I used to ring the White House every night. / Nobody ever picked up. / Now I ring my agent. Same result. |
| aside-6.mp3 | Aside (a quiet reveal) | Between you and me... / the devil doesn't have the best tunes. / He has the best publicist. |
| aside-7.mp3 | Aside (a quiet reveal) | I've been on television since 1992. / I've never once watched it. / That's the secret, you know. |
| round-start-6.mp3 | Round start (first round) | Good evening. / Tonight's questions are about a little band from Dublin. / You may have heard of them. They made sure of it. |
| round-two-1.mp3 | Round 2 start (before the count-in) | Round two. / The second album is always the hardest. / Ask anyone who made October. |
| next-round-5.mp3 | Round start (later rounds) | Back again. / Like a farewell tour. You never quite believe the last one. |
| next-round-6.mp3 | Round start (later rounds) | Another round. / Some of you are improving. / I won't say who. It would only encourage you. |
| song-5.mp3 | Song clip question | Listen. / Name it before the chorus. / Anyone can do it after. |
| song-6.mp3 | Song clip question | A little music. / The guitarist is the one in the hat. / That narrows it down to nothing. |
| cover-4.mp3 | Album cover question | An album cover. / Faces, deserts, a small boy. / They did tend to repeat themselves. |
| cover-5.mp3 | Album cover question | A picture. / Worth a thousand words. Most of them were mine. |
| who-said-3.mp3 | Who said it? | One of us said this. / The Fly, the mirror man, the singer... or me. / We shared a dressing room. It was awful. |
| who-said-4.mp3 | Who said it? | A quotation. / Choose carefully. Some of us were in character. / Some of us never left. |
| double-4.mp3 | Double points | Double points. / The comeback starts here. / Or it doesn't. |
| double-5.mp3 | Double points | This one counts twice. / Like a live album. / Same songs... twice the applause. |
| winner-8.mp3 | Final winner | And our winner. / Remember this moment. / Nobody else will. |
| winner-9.mp3 | Final winner | A winner! / Now comes the hard part. / Pretending to be humble. |
| tie-2.mp3 | Final: a tie | A tie. / Two winners... or two people who didn't quite win. / I prefer the second. |
| bet-won-3.mp3 | Bet everything and won | Everything on the line... and it paid. / Don't do that again. You'll give me hope. |
| bet-lost-3.mp3 | Bet everything and lost | All of it. Gone. / Easy come... / easy go. Mostly to me. |
| goodnight-5.mp3 | Goodnight | Goodnight, then. / Same time next year? I'll still be here. / I'm always still here. |
| goodnight-6.mp3 | Goodnight | That's the show. / I'll leave the televisions on. / Somebody should watch them. |
| welcome-3.mp3 | New game | Ah. The first to arrive. / Very keen. / I like keen. Keen is easy to tempt. |
| join-3.mp3 | A player joins | Ah. Another player. / Do come in. Wipe your feet. / I've just had the floor done. In gold. |
| join-4.mp3 | A player joins | Welcome. / Sign here... and here... and here. / Don't read it. Nobody reads it. |
| join-5.mp3 | A player joins | Ah... you made it. / Find a seat. Not that one. / That one's mine. |
| order-1.mp3 | Put them in order | A little history lesson. / Put them in order. Oldest first. / I remember all of it. I was there. Mostly. |
| order-2.mp3 | Put them in order | Now... a little order. / Not my strong suit, I'm afraid. / Chaos is more my line of work. |
| order-3.mp3 | Put them in order | In order, please. Oldest first. / Take your time. / Time is the one thing I have plenty of. |
| order-4.mp3 | Put them in order | Put them in order. / History is just things happening in the wrong order. / You're here to fix that. |
| order-5.mp3 | Put them in order | Oldest first. / Like a family photograph. / The oldest are always at the back, complaining. |
| order-6.mp3 | Put them in order | A little timeline. / I was at all of it. / I just can't remember which order I left. |
| order-7.mp3 | Put them in order | Put these in order. / I'd help, but I've been around since the beginning. / It all blurs. |
| order-8.mp3 | Put them in order | Earliest first. / Take it slowly. / Some of the best things happened before you were paying attention. |
| order-9.mp3 | Put them in order | Sort them out. / Someone has to. / It certainly won't be me. |
| order-10.mp3 | Put them in order | Four moments in time. / Line them up. / Then we'll see who was really listening. |
| song-2.mp3 | Song clip question | A song. / Close your eyes. / Not for long. It's timed. |
| song-7.mp3 | Song clip question | Music, maestro. / I won't sing along. / My lawyers have advised against it. |
| song-8.mp3 | Song clip question | Listen closely. / I'd tell you what it is, but that would be cheating. / And I only cheat at cards. |
| song-9.mp3 | Song clip question | A little music. / Some of you will know it in a second. / The rest of you will pretend. |
| song-10.mp3 | Song clip question | Shh. / The good bit's coming. / Or it isn't. Thirty seconds is a short life. |
| song-11.mp3 | Song clip question | Name this one. / Hum along if it helps. / It won't. |
| song-12.mp3 | Song clip question | From the archive. / Dusted off... / just for you. |
| cover-6.mp3 | Album cover question | Look closely. / Somebody spent weeks on this photograph. / You have twenty seconds. |
| cover-7.mp3 | Album cover question | A picture. / Zoom in, zoom out. / Just like my career. |
| cover-8.mp3 | Album cover question | An album cover. / Grainy, moody, serious. / They never once smiled for the camera. |
| cover-9.mp3 | Album cover question | Name the album. / It's on the tip of your tongue. / Which is where it'll stay. |
| cover-10.mp3 | Album cover question | A little detail. / The whole picture's coming. / Patience. Or guess. Guessing is faster. |
| cover-11.mp3 | Album cover question | Recognise it? / I had it on my wall once. / Then I had my own face put there instead. |
| double-6.mp3 | Double points | Double points. / Now it gets interesting. |
| double-7.mp3 | Double points | This one's worth twice as much. / Spend it wisely. |
| double-8.mp3 | Double points | Double or nothing. / Well... double or a little less. / I'm not a monster. |
| double-9.mp3 | Double points | Double points. / The leader is nervous. / Everyone else, start believing. |
| double-10.mp3 | Double points | Twice the points on this one. / I've seen bigger leads disappear. / Usually mine. |
| double-11.mp3 | Double points | Double points. / Like a second encore. / Nobody needs it. Everybody wants it. |
| double-12.mp3 | Double points | This one counts double. / No pressure. / Lots of pressure. |
| winner-4.mp3 | Final winner | Our winner! / Take a bow. / Not too low. People will think you've dropped something. |
| winner-10.mp3 | Final winner | The winner. / Enjoy it tonight. / Tomorrow, everyone will want a rematch. |
| winner-11.mp3 | Final winner | Champion! / I'd shake your hand... / but you'd count your fingers afterwards. |
| winner-12.mp3 | Final winner | A winner. / I'd give you the keys to the city. / I sold them in 1993. |
| winner-13.mp3 | Final winner | Ladies and gentlemen, your winner! / Somebody play something triumphant. / Not too loud. The neighbours. |
| winner-14.mp3 | Final winner | And the winner is... / exactly who I said it would be. / I didn't say it out loud, of course. |
| winner-15.mp3 | Final winner | Our champion. / They'll write songs about this. / Short ones. |
| winner-16.mp3 | Final winner | Victory! / Fame at last. / Fifteen minutes, starting now. |
| round-two-2.mp3 | Round 2 start (before the count-in) | Round two. / The first round was a warm-up. / That's what the losers are saying, anyway. |
| round-two-3.mp3 | Round 2 start (before the count-in) | Round two. / Same game, new chances. / Same faces, unfortunately. |
| round-two-4.mp3 | Round 2 start (before the count-in) | Round two. / Let's see who peaked too early. |
| round-two-5.mp3 | Round 2 start (before the count-in) | Round two. / Somebody count us in. / In any language you like. |
| next-round-1.mp3 | Round start (later rounds) | Another round. / Like a tour that won't end. / I'd know. I've been on one since 1992. |
| next-round-3.mp3 | Round start (later rounds) | Back for more? / Good. / I've nowhere else to be. Las Vegas can wait. |
| next-round-7.mp3 | Round start (later rounds) | One more round. / The night is young. / I am not. |
| next-round-8.mp3 | Round start (later rounds) | Another round. / The scores carry over. / So do the grudges. |
| next-round-9.mp3 | Round start (later rounds) | Round again. / You're like a band on a reunion tour. / Older, wiser, still arguing. |
| next-round-10.mp3 | Round start (later rounds) | Encore! / Nobody asked for one. / That's never stopped anyone. |
| next-round-11.mp3 | Round start (later rounds) | Here we go again. / Places, everyone. / And smile. You're on television. |
| round-start-7.mp3 | Round start (first round) | Good evening, and welcome to my little quiz. / The rules are simple. / I make them. You follow them. |
| round-start-8.mp3 | Round start (first round) | Welcome to ZOO TV. / Tonight, trivia. / Tomorrow, the world. |
| round-start-9.mp3 | Round start (first round) | Shall we begin? / Phones ready. / Brains... optional. |
| who-said-5.mp3 | Who said it? | Who said it? / One of us is very quotable. / It's me. Usually. |
| who-said-6.mp3 | Who said it? | A quotation. / Somebody said this out loud, in public. / Guess who. |
| who-said-7.mp3 | Who said it? | Who said it? / The suit, the shades, the singer, or me. / Look for the most expensive sentence. |
| who-said-8.mp3 | Who said it? | Another quote. / We all said things in the nineties. / Some of us meant them. |
| welcome-4.mp3 | New game | Welcome! / Do come in. / Everyone gets in. Not everyone leaves with their dignity. |
| welcome-5.mp3 | New game | Ah... company. / I was beginning to think I'd been cancelled. / Again. |
| welcome-6.mp3 | New game | Welcome to the show. / Sit anywhere. / The good seats were sold in 1993. |
| join-6.mp3 | A player joins | Another one. / Sign in, please. Your soul will do as a deposit. |
| join-7.mp3 | A player joins | Ah. A late arrival. / Fashionably late. I approve. |
| join-8.mp3 | A player joins | Welcome aboard. / Mind the Trabants. / They're not as secure as they look. |
| join-9.mp3 | A player joins | Hello. / Pick a band member. / Any one. They're all replaceable. Except the singer. |
| join-10.mp3 | A player joins | Another contestant. / The more the merrier. / The more the louder. |
| goodnight-2.mp3 | Goodnight | That's all for tonight. / Thank you, thank you. / Do tip your host on the way out. |
| goodnight-3.mp3 | Goodnight | Goodnight. / Go home. / Leave a light on. I'm afraid of the dark. Ironic, I know. |
| goodnight-7.mp3 | Goodnight | And that's the show. / Same time next week? / I'll keep your seats warm. Very warm. |
| goodnight-8.mp3 | Goodnight | Goodnight, everybody. / Drive safely. / Or take a Trabant, and drive slowly. |
| streak-any-7.mp3 | Four in a row (anyone) | Four in a row. / Steady now. / Pride comes before... well, you know the song. |
| streak-any-8.mp3 | Four in a row (anyone) | Four in a row. / Somebody's on fire. / An unforgettable one, I hope. |
| streak-any-9.mp3 | Four in a row (anyone) | Four. / Someone's showing off. / Good. Somebody should. |
| streak-any-10.mp3 | Four in a row (anyone) | Four in a row! / I'd ask for your secret... / but I'd rather buy it. |
| streak-any-11.mp3 | Four in a row (anyone) | Four in a row. / Elevation, I believe they call it. |
| lead-change-10.mp3 | Lead change | A new leader. / Long live the king. / Or whoever this is. |
| lead-change-11.mp3 | Lead change | The lead changes hands. / It does that. / Hands are so unreliable. |
| lead-change-12.mp3 | Lead change | A new leader. / Even better than the last one. / Not quite the real thing yet. |
| lead-change-13.mp3 | Lead change | New face at the top. / Get used to the view. / Briefly. |
| lead-change-14.mp3 | Lead change | The leader changes. / Mutiny. / I do love a mutiny. |
| streak-broken-7.mp3 | Streak broken | Streak over. / Gravity always wins. / Ask the lemon. |
| streak-broken-8.mp3 | Streak broken | And there it goes. / Easy come. / Easy, easy go. |
| streak-broken-9.mp3 | Streak broken | The streak ends. / It was getting a bit much, frankly. |
| streak-broken-10.mp3 | Streak broken | Broken. / Like a guitar string mid-solo. / The Edge would carry on. Will you? |
| all-right-1.mp3 | Everyone got it right | All of you. / I'll have to make them harder. / Much harder. |
| all-right-2.mp3 | Everyone got it right | Everybody got it. / Well. It's nice to be agreed with. / It so rarely happens. |
| all-right-9.mp3 | Everyone got it right | All correct. / A full house. / I usually charge for those. |
| all-right-10.mp3 | Everyone got it right | All right. All of you. / Insufferable. |
| all-right-11.mp3 | Everyone got it right | Every single one of you. / Someone check under the table for a fan club newsletter. |
| nobody-right-3.mp3 | Nobody got it right | Nobody. / Silence. / My favourite sound. |
| nobody-right-4.mp3 | Nobody got it right | Not one. / Don't look at me. / I knew the answer. I just like watching. |
| nobody-right-10.mp3 | Nobody got it right | Nobody got that. / Good. / Some things should stay a mystery. |
| nobody-right-11.mp3 | Nobody got it right | Zero. / A nice round number. / Like your scores, soon. |
| nobody-right-12.mp3 | Nobody got it right | None of you. / A room full of experts... / and not one right answer. Lovely. |
| same-wrong-3.mp3 | Everyone picked the same wrong answer | You all picked the same one. / And it was wrong. / Solidarity is so touching. |
| same-wrong-4.mp3 | Everyone picked the same wrong answer | Unanimous. / Unanimously wrong. / That takes real teamwork. |
| same-wrong-5.mp3 | Everyone picked the same wrong answer | All the same answer. / Somebody whispered. / Somebody whispered badly. |
| lone-right-4.mp3 | Only one player right | One right answer. / Smug, aren't we? / I like that in a person. |
| lone-right-5.mp3 | Only one player right | Just one of you. / The others are pretending they knew. / They didn't. |
| lone-right-6.mp3 | Only one player right | Only one. / A voice in the wilderness. / Or the desert, if we're being dramatic about it. |
| lone-right-7.mp3 | Only one player right | Just you. / Everyone else, look at them. / That's what winning looks like. Briefly. |
| buzzer-3.mp3 | Right in the last second | Just in time. / The clock was rooting for you. |
| buzzer-4.mp3 | Right in the last second | With a second to spare. / Cutting it fine. / I admire anyone who leaves it to the last minute. |
| buzzer-5.mp3 | Right in the last second | At the buzzer. / Show-off. |
| close-1.mp3 | Close race | Very close. / Hold your nerve. / Or don't. It's more fun for me. |
| close-5.mp3 | Close race | Neck and neck. / Somebody blink. |
| close-6.mp3 | Close race | It's tight at the top. / Tighter than a Trabant. / With four people in it. |
| close-7.mp3 | Close race | Close. / Close enough to argue about later. |
| last-place-9.mp3 | Last place | Last place. / Somebody has to be. / Thank you for your service. |
| last-place-10.mp3 | Last place | Bottom of the table. / The view's terrible. / But the company's lovely. |
| last-place-11.mp3 | Last place | Last place. / Don't worry. Underdogs make the best documentaries. |
| hurry-2.mp3 | Time running out | Nothing at all? / I've seen livelier crowds at a sound check. |
| hurry-6.mp3 | Time running out | Time's up. / No answers. / I'll take that as a protest. |
| aside-8.mp3 | Aside (a quiet reveal) | I once ordered ten thousand pizzas to a concert. / About a hundred arrived. / I still haven't paid. |
| aside-9.mp3 | Aside (a quiet reveal) | I gave up the horns for Lent once. / It lasted about an hour. |
| aside-10.mp3 | Aside (a quiet reveal) | Do you know the secret of a long career? / Never leave. / They can't miss you if you're still here. |
| aside-11.mp3 | Aside (a quiet reveal) | People ask what I do for a living. / I host. / Mostly souls. |
| aside-12.mp3 | Aside (a quiet reveal) | I collect gold records. / And the people who made them. / Mostly the second. |
| aside-13.mp3 | Aside (a quiet reveal) | I miss telephone boxes. / Somewhere private to call the President. |
| aside-14.mp3 | Aside (a quiet reveal) | They wanted me for the Sphere, you know. / I said it wasn't big enough. |
| aside-15.mp3 | Aside (a quiet reveal) | My agent says I should be more humble. / So I fired him. / Humbly. |
| tour-break-1-3.mp3 | Tournament: between rounds | End of round one. / Next, the deep cuts. Songs only the faithful know. / Let's find out how faithful you are. |
| tour-break-1-4.mp3 | Tournament: between rounds | Round one is done. / Now for the B-sides of life. |
| tour-break-2-3.mp3 | Tournament: between rounds | Two down. / One round left, and a bet at the end. / Save something for the wager. |
| tour-break-2-4.mp3 | Tournament: between rounds | Nearly there. / One last round, then I take your money. / Figuratively. Mostly. |
| tour-winner-3.mp3 | Tournament champion | Champion of the tournament! / Three rounds, one name. / Engrave it somewhere small. |
| tour-winner-4.mp3 | Tournament champion | The tournament is yours. / Take the crown. / Don't get too attached. I want it back. |
| tour-winner-5.mp3 | Tournament champion | Tournament champion! / You've earned the right to be insufferable. / Until next week. |
| wager-4.mp3 | Final wager | Place your bets. / Faith or fortune. / I'll take either. |
| wager-5.mp3 | Final wager | The final wager. / Everything you have, or nothing. / Or something in between, for the cautious. |
| wager-6.mp3 | Final wager | Last question. A little bet first. / I've always liked a gamble. / Especially other people's. |
| bet-won-4.mp3 | Bet everything and won | All in, and right. / Fortune favours the reckless. |
| bet-won-5.mp3 | Bet everything and won | Everything, and it came back double. / I'm almost proud. |
| bet-won-6.mp3 | Bet everything and won | All of it, and right. / Don't let it go to your head. / Or do. It's more entertaining. |
| bet-lost-4.mp3 | Bet everything and lost | All of it. / Gone. / Like tears in the rain. Or points in a quiz. |
| bet-lost-5.mp3 | Bet everything and lost | Everything, on the wrong answer. / Bold. / Wrong, but bold. |
| bet-lost-6.mp3 | Bet everything and lost | All in... / all gone. / I'll put it with the others. |
| tie-3.mp3 | Final: a tie | A tie. / How very diplomatic. / I hate diplomacy. |
| tie-4.mp3 | Final: a tie | Dead level. / Two winners. / Or no winners. Depends on your mood. |

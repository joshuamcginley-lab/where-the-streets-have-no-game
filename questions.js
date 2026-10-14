// Shared by the TV screen (index.html) and the phone controller (play.html).
// a = correct answer; w = three wrong answers, each chosen to be believable;
// f = the fact shown after the reveal.
window.U2 = (() => {
  const MODES = [
    { id: "casual", name: "Casual Fan", blurb: "The hits, the albums, the big moments. For anyone with a U2 song on a playlist." },
    { id: "deep",   name: "Deep Cuts",  blurb: "B-sides, studios, producers and tour lore. For people who own the box sets." },
  ];

  const CASUAL = [
    { q: "Which city are U2 from?", a: "Dublin", w: ["Belfast", "Cork", "Galway"], f: "All four members met at Mount Temple Comprehensive School on Dublin's northside in 1976." },
    { q: "Bono's birth name is…", a: "Paul Hewson", w: ["David Evans", "Paul McGuinness", "Peter Rowen"], f: "David Evans is The Edge, Paul McGuinness was their manager, and Peter Rowen is the boy on the Boy cover." },
    { q: "What is The Edge's real name?", a: "David Evans", w: ["Dik Evans", "Paul Hewson", "Adam Clayton"], f: "Dik Evans is his older brother, who played in the earliest line-up before leaving in 1978." },
    { q: "Which instrument does Adam Clayton play?", a: "Bass guitar", w: ["Drums", "Keyboards", "Rhythm guitar"], f: "Adam was the one member who had a proper amplifier in 1976, which helped him get in the band." },
    { q: "What was U2's debut album, released in 1980?", a: "Boy", w: ["October", "War", "Under a Blood Red Sky"], f: "Boy was produced by Steve Lillywhite and opens with \"I Will Follow\"." },
    { q: "In which year was The Joshua Tree released?", a: "1987", w: ["1984", "1989", "1991"], f: "It became the fastest-selling album in British chart history at the time." },
    { q: "Which song opens The Joshua Tree?", a: "Where the Streets Have No Name", w: ["With or Without You", "I Still Haven't Found What I'm Looking For", "Bullet the Blue Sky"], f: "That slow organ-and-guitar build has opened countless U2 shows since." },
    { q: "Which album features \"With or Without You\"?", a: "The Joshua Tree", w: ["The Unforgettable Fire", "Rattle and Hum", "Achtung Baby"], f: "It became U2's first No. 1 single in the US." },
    { q: "Which album features \"One\"?", a: "Achtung Baby", w: ["The Joshua Tree", "Zooropa", "Pop"], f: "\"One\" came together in Berlin when the Achtung Baby sessions were close to falling apart." },
    { q: "Which album opens with \"Beautiful Day\"?", a: "All That You Can't Leave Behind", w: ["How to Dismantle an Atomic Bomb", "No Line on the Horizon", "Pop"], f: "\"Beautiful Day\" won both Song and Record of the Year at the 2001 Grammys." },
    { q: "Which album features \"Vertigo\"?", a: "How to Dismantle an Atomic Bomb", w: ["All That You Can't Leave Behind", "No Line on the Horizon", "Songs of Innocence"], f: "The album also won the Grammy for Album of the Year in 2006." },
    { q: "Which U2 single starred in a 2004 iPod commercial?", a: "Vertigo", w: ["Elevation", "Beautiful Day", "Get On Your Boots"], f: "Apple also sold a black-and-red U2 edition iPod." },
    { q: "\"Pride (In the Name of Love)\" is written about whom?", a: "Martin Luther King Jr.", w: ["Malcolm X", "Robert F. Kennedy", "Nelson Mandela"], f: "It was the lead single from The Unforgettable Fire in 1984." },
    { q: "\"Sunday Bloody Sunday\" refers to the 1972 shootings in which city?", a: "Derry", w: ["Belfast", "Dublin", "Omagh"], f: "The song opens War (1983), driven by Larry's military-style drumbeat." },
    { q: "\"Stuck in a Moment You Can't Get Out Of\" was written about which friend of Bono's?", a: "Michael Hutchence", w: ["Kurt Cobain", "Jeff Buckley", "Johnny Cash"], f: "Bono wrote it as an argument he wished he'd had with the INXS singer, who died in 1997." },
    { q: "\"Walk On\" is dedicated to which leader?", a: "Aung San Suu Kyi", w: ["Nelson Mandela", "The Dalai Lama", "Desmond Tutu"], f: "\"Walk On\" won Record of the Year at the 2002 Grammys, the second year running for U2." },
    { q: "Who did Bono write \"Sweetest Thing\" for?", a: "His wife, Ali", w: ["His mother, Iris", "His daughter, Jordan", "His father, Bob"], f: "It was an apology for missing Ali's birthday while recording The Joshua Tree." },
    { q: "Which lyric comes from \"I Still Haven't Found What I'm Looking For\"?", a: "\"I have climbed highest mountains\"", w: ["\"I want to run, I want to hide\"", "\"See the stone set in your eyes\"", "\"We're one, but we're not the same\""], f: "The others are from \"Where the Streets Have No Name\", \"With or Without You\" and \"One\"." },
    { q: "Which lyric comes from \"Where the Streets Have No Name\"?", a: "\"I want to run, I want to hide\"", w: ["\"I have spoken with the tongue of angels\"", "\"Sleight of hand and twist of fate\"", "\"It's a beautiful day, don't let it get away\""], f: "Bono wrote it about Ethiopia and about Belfast, where your street tells people your religion." },
    { q: "Where was the \"Where the Streets Have No Name\" video filmed?", a: "A Los Angeles rooftop", w: ["A Dublin rooftop", "A street in Harlem", "The Las Vegas Strip"], f: "The impromptu show drew such a crowd that police shut it down, as you see in the video." },
    { q: "Which blues legend duets with U2 on \"When Love Comes to Town\"?", a: "B.B. King", w: ["John Lee Hooker", "Buddy Guy", "Muddy Waters"], f: "It appears on Rattle and Hum (1988)." },
    { q: "U2's 1988 album and film about their tour of America is called…", a: "Rattle and Hum", w: ["Under a Blood Red Sky", "Wide Awake in America", "Zoo TV: Live from Sydney"], f: "Parts of it were recorded at Sun Studio in Memphis." },
    { q: "At Live Aid in 1985, Bono jumped down to the crowd during which song?", a: "Bad", w: ["Pride (In the Name of Love)", "Sunday Bloody Sunday", "New Year's Day"], f: "The 12-minute \"Bad\" ran so long they dropped a song, but it made the band's name in America." },
    { q: "Which was U2's first UK No. 1 single?", a: "Desire", w: ["With or Without You", "Pride (In the Name of Love)", "Where the Streets Have No Name"], f: "\"Desire\" hit No. 1 in 1988 as the lead single from Rattle and Hum." },
    { q: "In which year was Achtung Baby released?", a: "1991", w: ["1989", "1993", "1995"], f: "It was a sharp turn into electronics, irony and distortion after the earnestness of the 1980s." },
    { q: "Which East German car became the symbol of Achtung Baby and the ZOO TV tour?", a: "Trabant", w: ["Volkswagen Beetle", "Lada", "Wartburg"], f: "Painted Trabants hung over the ZOO TV stage as lighting rigs." },
    { q: "Which U2 tour featured a giant mirror-ball lemon?", a: "PopMart", w: ["ZOO TV", "Elevation", "Vertigo"], f: "The band emerged from the lemon for the encore, and on one night it famously failed to open." },
    { q: "Which tour followed All That You Can't Leave Behind in 2001?", a: "Elevation Tour", w: ["Vertigo Tour", "PopMart Tour", "U2 360° Tour"], f: "It returned the band to arenas with a heart-shaped catwalk in the crowd." },
    { q: "Which U2 tour used a four-legged stage nicknamed \"The Claw\"?", a: "U2 360° Tour", w: ["Vertigo Tour", "PopMart Tour", "Innocence + Experience Tour"], f: "It became the highest-grossing concert tour of all time up to that point." },
    { q: "In which year did U2 play the Super Bowl halftime show?", a: "2002", w: ["1999", "2005", "2008"], f: "Names of the victims of the September 11 attacks scrolled up a screen behind them." },
    { q: "Who inducted U2 into the Rock and Roll Hall of Fame in 2005?", a: "Bruce Springsteen", w: ["Bob Dylan", "Patti Smith", "Paul McCartney"], f: "Springsteen joked that the band had found the formula for longevity: get a good manager and stay together." },
    { q: "Which song won a Golden Globe for the film Mandela: Long Walk to Freedom?", a: "Ordinary Love", w: ["Invisible", "Every Breaking Wave", "Song for Someone"], f: "It was also nominated for the Oscar for Best Original Song." },
    { q: "\"Hold Me, Thrill Me, Kiss Me, Kill Me\" came from the soundtrack of…", a: "Batman Forever", w: ["Batman Returns", "Mission: Impossible", "The Crow"], f: "The 1995 single was nominated for a Golden Globe." },
    { q: "Which album was delivered free to around 500 million iTunes users in 2014?", a: "Songs of Innocence", w: ["Songs of Experience", "No Line on the Horizon", "Songs of Surrender"], f: "Not everyone was pleased to find it in their library, and Apple released a tool to remove it." },
    { q: "U2's 2017 world tour celebrated the 30th anniversary of which album?", a: "The Joshua Tree", w: ["Achtung Baby", "War", "The Unforgettable Fire"], f: "They played the whole album in order every night, in front of a huge Anton Corbijn film screen." },
    { q: "Which Las Vegas venue did U2 open in 2023?", a: "Sphere", w: ["Caesars Palace Colosseum", "Allegiant Stadium", "T-Mobile Arena"], f: "The residency was called U2:UV Achtung Baby Live at Sphere." },
    { q: "What is the title of Bono's 2022 memoir?", a: "Surrender: 40 Songs, One Story", w: ["In the Name of Love", "Achtung: A Life", "Stories for Boys"], f: "Each of its 40 chapters is named after a U2 song." },
    { q: "Roughly how many Grammy Awards has U2 won?", a: "22", w: ["9", "14", "31"], f: "That's more than any other group in Grammy history." },
  ];

  const DEEP = [
    { q: "Where did U2's first rehearsal take place in September 1976?", a: "Larry Mullen Jr.'s kitchen", w: ["The Edge's garage", "The Mount Temple music room", "Adam Clayton's bedroom"], f: "Larry had pinned a note on the Mount Temple noticeboard, so for a while it was the Larry Mullen Band." },
    { q: "Which name did the band use immediately before becoming U2?", a: "The Hype", w: ["Feedback", "The Virgin Prunes", "Lypton Village"], f: "Feedback came first. Lypton Village was Bono's surreal gang of friends, and the Virgin Prunes were its band." },
    { q: "Which early member left in 1978 to join the Virgin Prunes?", a: "Dik Evans", w: ["Guggi", "Gavin Friday", "Ivan McCormick"], f: "Dik is The Edge's older brother. His exit left U2 as the four-piece we know." },
    { q: "In March 1978, U2 won a talent contest in which city?", a: "Limerick", w: ["Cork", "Galway", "Waterford"], f: "The St. Patrick's Day prize included studio time and an audition with CBS Ireland." },
    { q: "Bono's nickname comes from \"Bono Vox\", which was the name of…", a: "A Dublin hearing-aid shop", w: ["A Latin textbook", "A Dublin pub", "A microphone brand"], f: "His friend Gavin Friday came up with it. Bono resisted it at first." },
    { q: "U2's first release, a 1979 Ireland-only EP, was titled…", a: "U2-3", w: ["Another Day", "Out of Control", "11 O'Clock Tick Tock"], f: "\"Out of Control\" was its lead track. \"Another Day\" and \"11 O'Clock Tick Tock\" were 1980 singles." },
    { q: "What was U2's first single for Island Records?", a: "11 O'Clock Tick Tock", w: ["A Day Without Me", "I Will Follow", "Another Day"], f: "Joy Division producer Martin Hannett produced it in 1980." },
    { q: "Who produced Boy?", a: "Steve Lillywhite", w: ["Martin Hannett", "Jimmy Iovine", "Brian Eno"], f: "Lillywhite went on to produce October and War, and returned for later albums." },
    { q: "Who is the boy on the covers of Boy and War?", a: "Peter Rowen", w: ["Guggi", "Dik Evans", "Gavin Friday"], f: "Peter is Guggi's younger brother, a neighbour of Bono's from Cedarwood Road." },
    { q: "In which city was Bono's notebook of lyrics for October stolen in 1981?", a: "Portland, Oregon", w: ["Seattle", "San Francisco", "Boston"], f: "The bag finally came back to him in 2004." },
    { q: "Which guitar was The Edge's trademark in the early 1980s?", a: "Gibson Explorer", w: ["Fender Stratocaster", "Gibson Les Paul", "Rickenbacker 330"], f: "He bought the 1976 Explorer in New York as a teenager." },
    { q: "The Under a Blood Red Sky concert film was shot at…", a: "Red Rocks Amphitheatre", w: ["The Loreley", "Slane Castle", "Hammersmith Palais"], f: "The June 1983 Colorado show went ahead in rain and fog, which gave the film its look." },
    { q: "Much of The Unforgettable Fire was recorded in the ballroom of…", a: "Slane Castle", w: ["Ashford Castle", "Dublin Castle", "Leixlip Castle"], f: "Brian Eno and Daniel Lanois liked the room's natural echo." },
    { q: "The Unforgettable Fire is named after an exhibition of art by…", a: "Survivors of Hiroshima and Nagasaki", w: ["Survivors of the Dresden bombing", "Veterans of the Spanish Civil War", "Children from Belfast"], f: "The band saw the paintings and drawings at the Peace Museum in Chicago." },
    { q: "What was the working title of The Joshua Tree?", a: "The Two Americas", w: ["Desert Songs", "American Dream", "Zabriskie Point"], f: "The idea was the America of myth against the America of Reagan-era foreign policy." },
    { q: "Where was The Joshua Tree's front cover photographed?", a: "Zabriskie Point, Death Valley", w: ["Joshua Tree National Park", "Monument Valley", "The Mojave Desert near Barstow"], f: "Anton Corbijn shot it. The lone tree on the inner sleeve was near Darwin, California." },
    { q: "Which song closes The Joshua Tree?", a: "Mothers of the Disappeared", w: ["Exit", "One Tree Hill", "In God's Country"], f: "It was inspired by mothers in Argentina and Chile whose children vanished under military rule." },
    { q: "\"One Tree Hill\" honours roadie Greg Carroll and is named after a hill in which city?", a: "Auckland", w: ["Wellington", "Sydney", "Christchurch"], f: "Carroll died in a motorcycle accident in Dublin in 1986. The album is dedicated to him." },
    { q: "\"Bullet the Blue Sky\" grew out of Bono's 1986 visit to which country?", a: "El Salvador", w: ["Guatemala", "Panama", "Colombia"], f: "He was there with Amnesty International and saw government bombing runs on villages." },
    { q: "\"Running to Stand Still\" is set around which Dublin housing estate?", a: "Ballymun", w: ["Fatima Mansions", "Darndale", "Sheriff Street"], f: "The lyric's \"seven towers\" are the Ballymun tower blocks." },
    { q: "\"Sweetest Thing\" first appeared as the B-side to which single?", a: "Where the Streets Have No Name", w: ["With or Without You", "I Still Haven't Found What I'm Looking For", "Desire"], f: "It was re-recorded in 1998 for The Best of 1980–1990 and became a hit 11 years late." },
    { q: "Which Rattle and Hum song did Bono co-write with Bob Dylan?", a: "Love Rescue Me", w: ["Hawkmoon 269", "When Love Comes to Town", "All I Want Is You"], f: "Dylan also plays the Hammond organ on \"Hawkmoon 269\", which makes it a good trap." },
    { q: "Which Rattle and Hum song has The Edge on lead vocals?", a: "Van Diemen's Land", w: ["Heartland", "Hawkmoon 269", "God Part II"], f: "It's about John Boyle O'Reilly, a Fenian poet transported to Australia." },
    { q: "\"Angel of Harlem\" is a tribute to which singer?", a: "Billie Holiday", w: ["Ella Fitzgerald", "Nina Simone", "Sarah Vaughan"], f: "It was recorded at Sun Studio in Memphis with the Memphis Horns." },
    { q: "Where did Bono say U2 had to \"go away and dream it all up again\" on New Year's Eve 1989?", a: "The Point Depot, Dublin", w: ["Croke Park", "The National Stadium", "Slane Castle"], f: "The Lovetown shows were the end of the 1980s U2. Achtung Baby followed." },
    { q: "The Achtung Baby sessions began at Hansa Studios in which city?", a: "Berlin", w: ["Munich", "Hamburg", "Cologne"], f: "They arrived on the last flight into East Berlin, on the eve of German reunification." },
    { q: "What was the lead single from Achtung Baby?", a: "The Fly", w: ["One", "Mysterious Ways", "Even Better Than the Real Thing"], f: "It also named Bono's wraparound-shades stage character." },
    { q: "Which song closes Achtung Baby?", a: "Love Is Blindness", w: ["Acrobat", "Ultraviolet (Light My Way)", "One"], f: "Jack White later covered it for the 25th-anniversary tribute album." },
    { q: "Who sings lead on \"Numb\"?", a: "The Edge", w: ["Bono", "Adam Clayton", "Larry Mullen Jr."], f: "The Edge recites the monotone list. Bono sings the falsetto \"I feel numb\"." },
    { q: "Which devilish alter ego did Bono play on the Zooropa legs of ZOO TV?", a: "MacPhisto", w: ["The Fly", "Mirror Ball Man", "Mr. Pussy"], f: "MacPhisto made prank calls from the stage to politicians and public figures." },
    { q: "On the 1993 Zooropa tour, U2 ran live satellite links to which besieged city?", a: "Sarajevo", w: ["Mostar", "Grozny", "Dubrovnik"], f: "The links put Bosnians on stadium screens to speak directly to the crowds." },
    { q: "Who sings lead on \"The Wanderer\", the closing track of Zooropa?", a: "Johnny Cash", w: ["Willie Nelson", "Kris Kristofferson", "Waylon Jennings"], f: "Zooropa was recorded quickly in breaks between ZOO TV tour legs." },
    { q: "Under what name did U2 and Brian Eno release Original Soundtracks 1?", a: "Passengers", w: ["Zoo Station", "Melon", "Interference"], f: "Melon was a real U2 remix album, sent to fan club members the same year. Passengers gave us \"Miss Sarajevo\"." },
    { q: "Where did U2 announce the PopMart tour in 1997?", a: "Inside a Kmart in New York", w: ["Inside a McDonald's in Las Vegas", "Inside a Woolworths in London", "Inside a 7-Eleven in Los Angeles"], f: "The press conference was in the lingerie section of the Greenwich Village store." },
    { q: "In which city did the PopMart tour open?", a: "Las Vegas", w: ["New York", "Miami", "Mexico City"], f: "The opening night in April 1997 was underrehearsed and the band knew it." },
    { q: "What was the lead single from Pop?", a: "Discothèque", w: ["Staring at the Sun", "Last Night on Earth", "Mofo"], f: "Its video featured the band in Village People outfits." },
    { q: "Who succeeded Paul McGuinness as U2's manager in 2013?", a: "Guy Oseary", w: ["Irving Azoff", "Scooter Braun", "Ossie Kilkenny"], f: "McGuinness managed the band from 1978. Ossie Kilkenny was their longtime accountant." },
    { q: "The phrase \"how to dismantle an atomic bomb\" appears in the lyrics of which song?", a: "Fast Cars", w: ["Vertigo", "Love and Peace or Else", "City of Blinding Lights"], f: "\"Fast Cars\" was a bonus track on some editions of the album." },
    { q: "Who took the seascape photo on the cover of No Line on the Horizon?", a: "Hiroshi Sugimoto", w: ["Anton Corbijn", "Andreas Gursky", "Wolfgang Tillmans"], f: "The photo is of Lake Constance. The equals sign over it was the band's addition." },
    { q: "Who is on the cover of Songs of Innocence?", a: "Larry Mullen Jr. and his son", w: ["Bono's son Eli and Edge's daughter Sian", "Peter Rowen, now grown up", "Adam Clayton and his father"], f: "Eli and Sian are on the cover of Songs of Experience, the companion album." },
    { q: "Who played drums at the Sphere while Larry Mullen Jr. recovered from surgery?", a: "Bram van den Berg", w: ["Josh Freese", "Matt Cameron", "Abe Laboriel Jr."], f: "Van den Berg is a Dutch drummer from the band Krezip." },
  ];

  const Q = [
    ...CASUAL.map(q => ({ ...q, m: "casual" })),
    ...DEEP.map(q => ({ ...q, m: "deep" })),
  ];

  // Scored on correct answers out of 10.
  const RANKS = [
    { min: 10, name: "Where the Streets Have No Name" },
    { min: 8,  name: "Beautiful Day" },
    { min: 6,  name: "Elevation" },
    { min: 4,  name: "Running to Stand Still" },
    { min: 0,  name: "Still Haven't Found It" },
  ];

  return { MODES, Q, RANKS };
})();

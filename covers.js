// U2 album covers for "Name the album". Artwork streams from Apple; nothing is hosted here.
// From the iTunes Lookup API (country=us). id = Apple collectionId of the original edition.
// crop: where the TV zooms in (x, y in percent of the cover) and how far (zoom). The cover
// zooms out to half that by the end of the timer, so neither view may show the album title
// or the band's name: several covers print them (October, War, Pop, Songs of Surrender…).
// Casual rounds deal only "casual" covers; Deep Cuts rounds deal those plus the "deep" ones.
window.U2C = {
  COVERS: [
    { id: 1443189101, title: "Boy", year: 1980, tier: "casual",
      art: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/a7/14/8b/a7148bb0-e047-c071-86e1-c0ef502b28a2/17UMGIM90292.rgb.jpg/1000x1000bb.jpg", crop: { x: 50, y: 42, zoom: 4 } },   // the boy's eyes
    { id: 1443144590, title: "October", year: 1981, tier: "casual",
      art: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/31/5d/42/315d42ce-adda-ed7d-f21b-307e00aec454/17UMGIM94891.rgb.jpg/1000x1000bb.jpg", crop: { x: 22, y: 55, zoom: 4 } },   // Adam's curls, below the title
    { id: 1440894470, title: "War", year: 1983, tier: "casual",
      art: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/6b/0a/0d/6b0a0d5b-2831-06e9-3471-3befad197c1d/17UMGIM87714.rgb.jpg/1000x1000bb.jpg", crop: { x: 40, y: 70, zoom: 4 } },   // the split lip, clear of the red title
    { id: 1443184272, title: "The Unforgettable Fire", year: 1984, tier: "casual",
      art: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/40/45/51/40455196-536d-d9a2-c8a7-4129ce944a67/17UMGIM94892.rgb.jpg/1000x1000bb.jpg", crop: { x: 62, y: 55, zoom: 4 } },   // the ivy-covered castle
    { id: 1443155637, title: "The Joshua Tree", year: 1987, tier: "casual",
      art: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/8f/e2/c3/8fe2c384-f6cb-9af7-371d-2b6a9b204e59/17UMGIM79292.rgb.jpg/1000x1000bb.jpg", crop: { x: 20, y: 35, zoom: 4 } },   // the band in the desert
    { id: 1442801732, title: "Rattle and Hum", year: 1988, tier: "casual",
      art: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/b8/95/5e/b8955e8b-6993-2404-4ea5-442119be149c/17UMGIM95505.rgb.jpg/1000x1000bb.jpg", crop: { x: 72, y: 42, zoom: 4 } },   // Edge in the spotlight, right of the title
    { id: 1443063058, title: "Achtung Baby", year: 1991, tier: "casual",
      art: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/fe/5e/4f/fe5e4f79-c74f-c39e-39dc-4c8a952b9665/17UMGIM98829.rgb.jpg/1000x1000bb.jpg", crop: { x: 72, y: 80, zoom: 5 } },   // the Trabant, below the U2 ring
    { id: 1442968012, title: "Zooropa", year: 1993, tier: "casual",
      art: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/78/1e/55/781e55ac-b0e5-67f4-89c0-658325c3dafa/17UMGIM98832.rgb.jpg/1000x1000bb.jpg", crop: { x: 40, y: 45, zoom: 4 } },   // the astronaut's face
    { id: 1442904533, title: "Pop", year: 1997, tier: "casual",
      art: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/81/5b/a7/815ba7da-d5ca-23fb-7177-7b391c82f514/17UMGIM95502.rgb.jpg/1000x1000bb.jpg", crop: { x: 82, y: 15, zoom: 6 } },   // Edge in orange, well away from the title in the middle
    { id: 1443100430, title: "All That You Can't Leave Behind", year: 2000, tier: "casual",
      art: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/05/78/89/0578893b-9dac-d88a-ee9b-3c42ac40b6a0/17UMGIM95495.rgb.jpg/1000x1000bb.jpg", crop: { x: 50, y: 65, zoom: 4 } },   // the band at the airport, under the title
    { id: 1440891249, title: "How to Dismantle an Atomic Bomb", year: 2004, tier: "casual",
      art: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/21/96/14/21961489-3856-0329-410e-22e4e293bb02/17UMGIM87715.rgb.jpg/1000x1000bb.jpg", crop: { x: 70, y: 42, zoom: 4 } },   // Bono, below the stripes and title
    { id: 1442959667, title: "No Line on the Horizon", year: 2009, tier: "casual",
      art: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/90/d5/bb/90d5bb3b-12a9-e1d8-1102-4d1c97458e49/17UMGIM98835.rgb.jpg/1000x1000bb.jpg", crop: { x: 50, y: 50, zoom: 3 } },   // the horizon itself
    { id: 1444749940, title: "Songs of Innocence", year: 2014, tier: "casual",
      art: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/db/70/bb/db70bb36-3580-38c6-81b3-f41ef436e50b/17UMGIM94907.rgb.jpg/1000x1000bb.jpg", crop: { x: 52, y: 74, zoom: 4 } },   // Larry's tattoo
    { id: 1443185630, title: "Songs of Experience", year: 2017, tier: "casual",
      art: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/3d/f2/79/3df2799d-cc39-d9c4-9e3a-7df4569971d0/17UM1IM23044.rgb.jpg/1000x1000bb.jpg", crop: { x: 66, y: 20, zoom: 4 } },   // the girl in the helmet
    { id: 1664119641, title: "Songs of Surrender", year: 2023, tier: "casual",
      art: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/35/dd/3f/35dd3f76-6842-5f2c-44bc-e02b381f8006/22UM1IM42519.rgb.jpg/1000x1000bb.jpg", crop: { x: 82, y: 12, zoom: 6 } },   // Edge's portrait, above the title
    // Deep Cuts only, never Casual: U2 and Brian Eno, released under the name Passengers.
    { id: 1443791358, title: "Original Soundtracks 1", year: 1995, tier: "deep", note: "Released as Passengers: U2 with Brian Eno.",
      art: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/c6/53/f2/c653f2c6-52ca-0e65-42c8-be3b29d62c50/00731452416629.rgb.jpg/1000x1000bb.jpg", crop: { x: 30, y: 45, zoom: 4 } },   // the space station, below the title
  ],
};

// The playable characters: the four band members plus two of Bono's ZOO TV alter egos.
// Each player picks one; no two players can share.
// To use photos instead of the drawn icons, put square images at the `photo`
// paths below (e.g. img/bono.jpg). Missing files fall back to the icon.
window.U2M = (() => {
  const MEMBERS = [
    {
      id: "bono", name: "Bono", role: "Vocals", color: "#ff5fa2", photo: "img/bono.jpg",
      // The Fly wraparound shades
      icon: '<path d="M5 25c9-3 45-3 54 0v5c0 7-5 13-12 13h-5c-5 0-8-4-9-8h-2c-1 4-4 8-9 8h-5C10 43 5 37 5 30z"/><path d="M2 26l4-1v4l-4 1zM62 26l-4-1v4l4 1z"/>',
    },
    {
      id: "edge", name: "The Edge", role: "Guitar", color: "#4fd6e8", photo: "img/edge.jpg",
      // the beanie
      icon: '<path d="M9 40C9 23 19 12 32 12s23 11 23 28z"/><rect x="6" y="38" width="52" height="14" rx="3"/><g style="fill:var(--mc)"><rect x="13" y="40" width="2.5" height="10"/><rect x="21" y="40" width="2.5" height="10"/><rect x="29" y="40" width="2.5" height="10"/><rect x="37" y="40" width="2.5" height="10"/><rect x="45" y="40" width="2.5" height="10"/></g>',
    },
    {
      id: "adam", name: "Adam Clayton", role: "Bass", color: "#ff9b3d", photo: "img/adam.jpg",
      // bass guitar
      icon: '<g transform="rotate(-38 32 32)"><rect x="29.5" y="6" width="5" height="32" rx="1"/><rect x="27" y="1" width="10" height="9" rx="2"/><path d="M20 40c0-6 5-8 9-8h6c4 0 9 2 9 8 0 3-2 4-2 6 0 3 3 4 3 8 0 5-5 9-12 9s-15-4-15-9c0-4 3-5 3-8 0-2-1-3-1-6z"/></g>',
    },
    {
      id: "larry", name: "Larry Mullen Jr.", role: "Drums", color: "#a98bff", photo: "img/larry.jpg",
      // crossed drumsticks
      icon: '<g transform="rotate(35 32 32)"><rect x="30" y="4" width="4" height="54" rx="2"/><circle cx="32" cy="5" r="3.2"/></g><g transform="rotate(-35 32 32)"><rect x="30" y="4" width="4" height="54" rx="2"/><circle cx="32" cy="5" r="3.2"/></g>',
    },
    {
      id: "macphisto", name: "MacPhisto", role: "Alter ego", color: "#d9a441", photo: "img/macphisto.jpg",
      // devil horns
      icon: '<circle cx="32" cy="40" r="17"/><path d="M19 31C11 24 9 13 13 3c3 10 9 17 15 21zM45 31c8-7 10-18 6-28-3 10-9 17-15 21z"/><g style="fill:var(--mc)"><path d="M22 37l8 3-8 2zM42 37l-8 3 8 2z"/></g>',
    },
    {
      id: "mirrorball", name: "Mirror Ball Man", role: "Alter ego", color: "#c4ccd6", photo: "img/mirrorball.jpg",
      // the mirror ball
      icon: '<defs><clipPath id="mb-clip"><circle cx="32" cy="36" r="24"/></clipPath></defs><rect x="30" y="1" width="4" height="9"/><circle cx="32" cy="36" r="24"/><g style="fill:var(--mc)" opacity=".75" clip-path="url(#mb-clip)"><path d="M8 30h48v3H8zM8 40h48v3H8zM12 21h40v3H12zM12 49h40v3H12z"/><path d="M31 12h3v48h-3zM21 14h3v44h-3zM41 14h3v44h-3z"/></g>',
    },
  ];

  const byId = id => MEMBERS.find(m => m.id === id);

  // Photos are optional. Probe each once; only photos that actually load are used.
  const photoOk = {};
  function loadPhotos(onChange) {
    MEMBERS.forEach(m => {
      const img = new Image();
      img.onload = () => { photoOk[m.id] = true; onChange && onChange(); };
      img.src = m.photo;
    });
  }

  // Avatar markup: the photo if one loaded, otherwise the drawn icon on the character's colour.
  function avatar(id, cls = "") {
    const m = byId(id);
    if (!m) return `<span class="av ${cls}"></span>`;
    const inner = photoOk[id] ? `<img src="${m.photo}" alt="">`
      : `<svg viewBox="0 0 64 64" aria-hidden="true" fill="currentColor">${m.icon}</svg>`;
    return `<span class="av ${cls}" style="--mc:${m.color}">${inner}</span>`;
  }

  return { MEMBERS, byId, avatar, loadPhotos };
})();

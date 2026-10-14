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
      id: "adam", name: "Adam Clayton", role: "Bass · PopMart", color: "#ff9b3d", photo: "img/adam.jpg",
      // PopMart Adam: white hard hat, goggles and dust mask
      icon: '<path d="M14 64c1-7 7-11 18-11s17 4 18 11z"/><rect x="27" y="47" width="10" height="8"/><ellipse cx="32" cy="38" rx="14" ry="16"/>' +
        '<g fill="#f4f0e8"><path d="M13 27c0-12 8-20 19-20s19 8 19 20z"/><rect x="9" y="25" width="46" height="5" rx="2.5"/>' +
        '<rect x="15" y="32" width="34" height="9" rx="4.5"/><path d="M21 43c7-3 15-3 22 0l-2 8c-5 4-13 4-18 0z"/></g>' +
        '<rect x="30.5" y="8" width="3" height="17" rx="1.5"/><g style="fill:var(--mc)"><ellipse cx="24" cy="36.5" rx="5.5" ry="3"/><ellipse cx="40" cy="36.5" rx="5.5" ry="3"/></g>' +
        '<g fill="#0a0909"><rect x="19" y="14" width="2" height="6" rx="1"/><rect x="24" y="12" width="2" height="6" rx="1"/><rect x="38" y="12" width="2" height="6" rx="1"/><rect x="43" y="14" width="2" height="6" rx="1"/></g>',
    },
    {
      id: "larry", name: "Larry Mullen Jr.", role: "Drums · Heartthrob", color: "#a98bff", photo: "img/larry.jpg",
      // Larry: the quiff, the jaw, the sparkle
      icon: '<path d="M12 64c1-7 8-10 20-10s19 3 20 10z"/><rect x="27" y="47" width="10" height="9"/>' +
        '<ellipse cx="18" cy="37" rx="2.6" ry="4.2"/><ellipse cx="46" cy="37" rx="2.6" ry="4.2"/>' +
        '<path d="M19 30c0 14 5 22 13 22s13-8 13-22z"/>' +
        '<path d="M18.5 32C16 22 19 11 30 8.5c8-1.8 16 .5 18.5 6 1.6 3.7 0 7.7-2.5 10.5-.8-3.2-3.2-5-6.8-5.2-4.6-.3-9.7 1.6-13.2 5.4-2.8 2.7-5 4.8-7.5 6.8z" style="stroke:var(--mc);stroke-width:1.4"/>' +
        '<g style="fill:var(--mc)"><path d="M23 33.5l6.5-1 .2 1.6-6.4 1z"/><path d="M34.5 32.3l7 .6-.2 1.6-6.9-.4z"/>' +
        '<rect x="24" y="36.5" width="5.5" height="2" rx="1"/><rect x="35" y="36.5" width="5.5" height="2" rx="1"/>' +
        '<path d="M26.5 44.5c3.4 2.6 7.6 2.6 11 0l.9 1.3c-4 3.4-8.8 3.4-12.8 0z"/></g>' +
        '<path d="M54 4l1.9 5.1L61 11l-5.1 1.9L54 18l-1.9-5.1L47 11l5.1-1.9z"/><path d="M9 17l1.2 3 3 1.2-3 1.2L9 25.5l-1.2-3.1-3-1.2 3-1.2z"/>',
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

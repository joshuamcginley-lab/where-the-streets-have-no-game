// Connection layer between the TV (host) and phones (players).
// Default: WebRTC data channels via PeerJS, which uses the free PeerJS cloud
// server only to introduce the devices; game traffic then flows device to device.
// Add ?net=local to both URLs to use BroadcastChannel instead (same browser,
// separate tabs) for development and testing without a network.
window.Net = (() => {
  const LOCAL = new URLSearchParams(location.search).get("net") === "local";
  const PREFIX = "wtshng-v1-";

  function wrap(id, rawSend) {
    const h = { data: [], close: [] };
    let closed = false;
    return {
      id,
      get closed() { return closed; },
      send(obj) { if (!closed) try { rawSend(JSON.stringify(obj)); } catch {} },
      on(ev, fn) { h[ev].push(fn); },
      _data(d) {
        let o;
        try { o = typeof d === "string" ? JSON.parse(d) : d; } catch { return; }
        if (o && typeof o === "object") h.data.forEach(f => f(o));
      },
      _close() { if (closed) return; closed = true; h.close.forEach(f => f()); },
    };
  }

  // ---- TV side
  function host(code, { onOpen, onError, onConnection }) {
    if (LOCAL) {
      const bc = new BroadcastChannel(PREFIX + code);
      const conns = new Map();
      bc.onmessage = ({ data: m }) => {
        if (!m || m.to) return;
        let c = conns.get(m.cid);
        if (m.t === "hello") {
          if (c) c._close();
          c = wrap(m.cid, d => bc.postMessage({ to: m.cid, d }));
          conns.set(m.cid, c);
          bc.postMessage({ to: m.cid, t: "welcome" });
          onConnection(c);
        } else if (m.t === "bye") {
          if (c) { conns.delete(m.cid); c._close(); }
        } else if (c && m.d) c._data(m.d);
      };
      setTimeout(onOpen, 0);
      return { close() { conns.forEach(c => c._close()); bc.close(); } };
    }

    let opened = false, destroyed = false;
    const peer = new Peer(PREFIX + code, { debug: 0 });
    peer.on("open", () => { opened = true; onOpen(); });
    peer.on("error", e => { if (!opened) onError(e.type || "error"); });
    peer.on("disconnected", () => { if (!destroyed) try { peer.reconnect(); } catch {} });
    peer.on("connection", dc => {
      dc.on("open", () => {
        const c = wrap(dc.peer, d => dc.open && dc.send(d));
        dc.on("data", d => c._data(d));
        dc.on("close", () => c._close());
        dc.on("error", () => c._close());
        onConnection(c);
      });
    });
    return { close() { destroyed = true; peer.destroy(); } };
  }

  // ---- phone side
  function join(code, { onOpen, onError }) {
    const target = PREFIX + code;
    if (LOCAL) {
      const cid = Math.random().toString(36).slice(2);
      const bc = new BroadcastChannel(target);
      const conn = wrap(cid, d => bc.postMessage({ cid, d }));
      let welcomed = false;
      bc.onmessage = ({ data: m }) => {
        if (!m || m.to !== cid) return;
        if (m.t === "welcome") { welcomed = true; onOpen(conn); }
        else if (m.d) conn._data(m.d);
      };
      bc.postMessage({ cid, t: "hello" });
      const t = setTimeout(() => { if (!welcomed) onError("no-room"); }, 4000);
      const bye = () => { try { bc.postMessage({ cid, t: "bye" }); } catch {} };
      addEventListener("pagehide", bye);
      return { close() { clearTimeout(t); bye(); removeEventListener("pagehide", bye); conn._close(); bc.close(); } };
    }

    let done = false;
    const peer = new Peer({ debug: 0 });
    const fail = type => { if (done) return; done = true; onError(type); };
    const t = setTimeout(() => fail("timeout"), 15000);
    peer.on("error", e => fail(e.type === "peer-unavailable" ? "no-room" : (e.type || "error")));
    peer.on("open", () => {
      const dc = peer.connect(target, { reliable: true });
      dc.on("open", () => {
        if (done) return;
        done = true; clearTimeout(t);
        const conn = wrap(target, d => dc.open && dc.send(d));
        dc.on("data", d => conn._data(d));
        dc.on("close", () => conn._close());
        dc.on("error", () => conn._close());
        onOpen(conn);
      });
    });
    return { close() { done = true; clearTimeout(t); peer.destroy(); } };
  }

  return { host, join, LOCAL };
})();

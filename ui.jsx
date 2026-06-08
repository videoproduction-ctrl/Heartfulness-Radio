/* Heartfulness Radio — shared UI primitives, icons, helpers (→ window) */
const { useState, useEffect, useRef } = React;

/* ---- Icons (stroke, 1.6) ---- */
const Icon = {
  play: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5Z"/></svg>,
  pause: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><rect x="6.5" y="5" width="4" height="14" rx="1.2"/><rect x="13.5" y="5" width="4" height="14" rx="1.2"/></svg>,
  users: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M16 19v-1.5A3.5 3.5 0 0 0 12.5 14h-5A3.5 3.5 0 0 0 4 17.5V19"/><circle cx="10" cy="8" r="3"/><path d="M20 19v-1.4a3.5 3.5 0 0 0-2.6-3.38M15 5.1A3 3 0 0 1 15 11"/></svg>,
  clock: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>,
  vol: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 9.5v5h3l4.5 3.5v-12L7 9.5H4Z"/><path d="M16 9a4 4 0 0 1 0 6"/><path d="M18.5 6.5a7.5 7.5 0 0 1 0 11"/></svg>,
  bell: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"/><path d="M10 19a2 2 0 0 0 4 0"/></svg>,
  arrow: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  search: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>,
  menu: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>,
  close: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M6 6l12 12M18 6 6 18"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m5 12.5 4.5 4.5L19 7"/></svg>,
  heart: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 20s-7-4.4-7-9.5A3.8 3.8 0 0 1 12 7a3.8 3.8 0 0 1 7 3.5C19 15.6 12 20 12 20Z"/></svg>,
  wa: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.4-1.1-2.7s.7-1.9 1-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.3 0 .5l-.4.6c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.6-.1l.7-.9c.2-.3.4-.2.6-.1l1.8.9c.3.1.4.2.5.3.1.2.1.6-.1 1.1Z"/></svg>,
  tg: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M21.8 4.2 2.9 11.5c-1 .4-1 1.5.1 1.8l4.7 1.5 1.8 5.6c.2.6.5.7 1 .4l2.7-2 4.6 3.4c.6.4 1.2.2 1.4-.6l3.2-15c.2-.9-.4-1.4-1.3-1ZM9.6 14.3l8.5-5.3c.4-.2.7.1.4.4l-6.9 6.2-.3 3.2-1.7-4.5Z"/></svg>,
  link: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M10 13a4 4 0 0 0 5.7 0l2.6-2.6a4 4 0 0 0-5.7-5.7L11.3 6"/><path d="M14 11a4 4 0 0 0-5.7 0L5.7 13.6a4 4 0 0 0 5.7 5.7L12.7 18"/></svg>,
  globe: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18"/></svg>,
  share: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>,
};

/* brand mark — concentric radio-wave arcs around a heart-dot */
function BrandMark(props) {
  return (
    <svg viewBox="0 0 40 40" fill="none" {...props}>
      <circle cx="20" cy="26" r="3" fill="currentColor"/>
      <path d="M13 23a9 9 0 0 1 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M9 19a15 15 0 0 1 22 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      <path d="M5.5 15a21 21 0 0 1 29 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
    </svg>
  );
}

/* duotone cover tile */
function Cover({ hue, glyph, className = "", style = {} }) {
  const idx = ((Math.round((((hue || 0) % 360) + 360) % 360 / 30)) % 12);
  return (
    <div className={"cover " + className} style={{ "--h": hue, ...style }}>
      <img className="cover-img" src={"thumbs/t" + idx + ".png"} alt="" loading="lazy" />
    </div>
  );
}

function initials(name) {
  return (name || "").split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

/* floating demo view-switcher (Listener <-> Studio) — collapsible + Studio auth gate */
function ViewSwitch({ current, raised, align, onOpenChange }) {
  const [open, setOpen] = useState(false);
  const [authing, setAuthing] = useState(false);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const studioHref = "Heartfulness Radio Studio.html";
  const listenerHref = "Heartfulness Radio - Listener.html";

  function goStudio(e) {
    if (e) e.preventDefault();
    try { if (localStorage.getItem("hfr_admin") === "1") { window.location.href = studioHref; return; } } catch (_) {}
    setAuthing(true);
  }
  function submitAuth(e) {
    e.preventDefault();
    if (id.trim().toLowerCase() === "test" && pw === "test") {
      try { localStorage.setItem("hfr_admin", "1"); } catch (_) {}
      window.location.href = studioHref;
    } else { setErr(true); }
  }
  function close() { setOpen(false); setAuthing(false); setErr(false); setId(""); setPw(""); }
  useEffect(() => { if (onOpenChange) onOpenChange(open || authing); }, [open, authing]);

  const cls = "viewswitch" + (raised ? " raised" : "") + (align === "right" ? " right" : "") + (open ? " open" : "") + (authing ? " authing" : "");

  if (!open) {
    return (
      <button className={cls + " collapsed"} aria-label="Demo views" onClick={() => setOpen(true)}><Icon.menu style={{ width: 19, height: 19 }} /></button>
    );
  }

  if (authing) {
    return (
      <form className={cls} onSubmit={submitAuth}>
        <div className="vs-auth-h"><b>Studio access</b><button type="button" className="vs-x" onClick={close} aria-label="Close"><Icon.close style={{ width: 15, height: 15 }} /></button></div>
        <input className="vs-in" placeholder="Login ID" value={id} onChange={e => { setId(e.target.value); setErr(false); }} autoFocus />
        <input className="vs-in" type="password" placeholder="Password" value={pw} onChange={e => { setPw(e.target.value); setErr(false); }} />
        {err && <div className="vs-err">Incorrect credentials. Try again.</div>}
        <button className="vs-go" type="submit">Enter Studio</button>
        <div className="vs-hint">Restricted · staff only</div>
      </form>
    );
  }

  return (
    <div className={cls}>
      <span className="vs-label">Demo view</span>
      <div className="vs-seg">
        <a className={current === "listener" ? "on" : ""} href={listenerHref}>Listener</a>
        {current === "studio"
          ? <a className="on">Studio</a>
          : <a href={studioHref} onClick={goStudio}>Studio</a>}
      </div>
      <button className="vs-x" onClick={close} aria-label="Collapse"><Icon.close style={{ width: 14, height: 14 }} /></button>
    </div>
  );
}

/* animated bar group */
function Bars({ n = 28, className = "", playing }) {
  return (
    <div className={className + (playing ? " playing" : "")}>
      {Array.from({ length: n }).map((_, i) => (
        <i key={i} style={{ animationDelay: (i % 9) * 0.09 + "s", height: (28 + ((i * 37) % 64)) + "%" }} />
      ))}
    </div>
  );
}

Object.assign(window, { Icon, BrandMark, Cover, Bars, initials, ViewSwitch, useState, useEffect, useRef });

/* Heartfulness Radio — Studio (admin) app: login gate + shell */

const NAV_GROUPS = [
  { label: null, items: [{ id: "overview", label: "Overview", icon: "grid" }] },
  { label: "Library", items: [
    { id: "media", label: "Media", icon: "media" },
    { id: "playlists", label: "Playlists", icon: "playlist" },
  ] },
  { label: "Programming", items: [
    { id: "schedule", label: "Schedule", icon: "calendar" },
    { id: "djs", label: "Presenters & DJs", icon: "mic" },
  ] },
  { label: "On demand", items: [{ id: "podcasts", label: "Podcasts", icon: "podcast" }] },
  { label: "Audience", items: [
    { id: "listeners", label: "Listeners", icon: "chart" },
  ] },
];

const PAGES = {
  overview: (c) => <AdmOverview {...c} />, media: (c) => <AdmMedia {...c} />, playlists: (c) => <AdmPlaylists {...c} />,
  schedule: (c) => <AdmSchedule {...c} />, djs: (c) => <AdmDJs {...c} />, podcasts: (c) => <AdmPodcasts {...c} />,
  requests: (c) => <AdmRequests {...c} />, listeners: (c) => <AdmListeners {...c} />, settings: (c) => <AdmSettings {...c} />,
};

const THEMES = [
  { id: "spotify", glyph: "◉" }, { id: "still", glyph: "○" }, { id: "dawn", glyph: "◐" }, { id: "nocturne", glyph: "●" },
];

function Login({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  function submit(e) { e.preventDefault(); if (email.trim().toLowerCase() === "test" && pw === "test") { onSignIn(); } else { setErr(true); } }
  return (
    <div className="login">
      <img className="login-domes" src="assets/domes-mark.png" alt="" />
      <form className="login-card" onSubmit={submit}>
        <BrandMark className="mark" />
        <h1>Studio</h1>
        <div className="eyebrow">Heartfulness Radio · Admin</div>
        <div className="field">
          <label>Login ID</label>
          <input className="in" type="text" value={email} onChange={e => { setEmail(e.target.value); setErr(false); }} placeholder="test" autoFocus />
        </div>
        <div className="field">
          <label>Password</label>
          <input className="in" type="password" value={pw} onChange={e => { setPw(e.target.value); setErr(false); }} placeholder="test" />
        </div>
        {err && <div className="hint" style={{ color: "var(--live)" }}>Incorrect credentials. Try again.</div>}
        <button className="btn primary" type="submit" style={{ width: "100%", justifyContent: "center", padding: 14, marginTop: 6 }}>Sign in</button>
        <div className="hint">Restricted · staff only · use test / test</div>
        <a className="view-site" href="Heartfulness Radio - Listener.html">← Back to the radio</a>
      </form>
    </div>
  );
}

function Studio() {
  const [authed, setAuthed] = useState(() => localStorage.getItem("hfr_admin") === "1");
  const [page, setPage] = useState("overview");
  const [theme, setTheme] = useState(() => localStorage.getItem("hfr_studio_theme_v2") || "spotify");
  const [menu, setMenu] = useState(false);
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem("hfr_side_collapsed") === "1");
  const [lang, setLang] = useState(() => (window.HFR_I18N && window.HFR_I18N.getLang()) || "en");
  const [langOpen, setLangOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [modal, setModal] = useState(null);
  function openModal(type, data) { setModal({ type, data }); }
  const A = window.HFRADMIN;
  const pending = A.requests.filter(r => r.status === "pending").length;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.motion = "on";
    localStorage.setItem("hfr_studio_theme_v2", theme);
  }, [theme]);
  useEffect(() => { localStorage.setItem("hfr_side_collapsed", collapsed ? "1" : "0"); }, [collapsed]);
  useEffect(() => { if (authed && window.HFR_I18N) { window.HFR_I18N.init(); setLang(window.HFR_I18N.getLang()); } }, [authed]);

  /* Dynamic motion layer: 3D pointer-tilt on cards + scroll parallax. Opacity-safe (transform only). */
  useEffect(() => {
    if (!authed) return;
    const main = document.querySelector(".main");
    if (!main) return;
    const reduce = () => document.documentElement.dataset.motion === "off" || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const TILT = ".stat-tile, .golive-tile, .lc-meter, .show-card-clickable, .artist-tile";
    let active = null;
    function onMove(e) {
      if (reduce()) return;
      const el = e.target.closest(TILT);
      if (active && active !== el) { active.style.transform = ""; active = null; }
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(820px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg) translateY(-4px)`;
      el.style.transition = "transform .08s ease-out";
      active = el;
    }
    function onLeave() { if (active) { active.style.transition = "transform .4s cubic-bezier(.2,.8,.2,1)"; active.style.transform = ""; active = null; } }
    main.addEventListener("pointermove", onMove);
    main.addEventListener("pointerleave", onLeave);
    // parallax on scroll for decorative layers
    let raf = 0;
    function onScroll() {
      if (raf || reduce()) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const sy = window.scrollY || document.documentElement.scrollTop || 0;
        document.querySelectorAll("[data-parallax]").forEach(p => {
          const k = parseFloat(p.getAttribute("data-parallax")) || 0.2;
          p.style.transform = `translate3d(0, ${(sy * k).toFixed(1)}px, 0)`;
        });
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { main.removeEventListener("pointermove", onMove); main.removeEventListener("pointerleave", onLeave); window.removeEventListener("scroll", onScroll); };
  }, [authed, page]);

  function signIn() { localStorage.setItem("hfr_admin", "1"); setAuthed(true); }
  function signOut() { localStorage.removeItem("hfr_admin"); setAuthed(false); }
  function go(p) { setPage(p); setMenu(false); window.scrollTo({ top: 0 }); }

  if (!authed) return <Login onSignIn={signIn} />;

  const allItems = NAV_GROUPS.flatMap(g => g.items).concat([{ id: "settings", label: "Settings" }]);
  const current = allItems.find(i => i.id === page);

  return (
    <div className={"studio" + (collapsed ? " collapsed" : "")}>
      <div className={"side-scrim" + (menu ? " open" : "")} onClick={() => setMenu(false)} />
      <aside className={"side" + (menu ? " open" : "")}>
        <div className="side-brand">
          <BrandMark className="mark" />
          <div className="side-brand-t"><b>Studio</b><span>Heartfulness Radio</span></div>
          <button className="side-collapse" onClick={() => setCollapsed(c => !c)} aria-label="Toggle sidebar"><AdminIcon.sidebar /></button>
        </div>
        <nav className="side-nav">
          {NAV_GROUPS.map((g, gi) => (
            <React.Fragment key={gi}>
              {g.label && <div className="side-label">{g.label}</div>}
              {g.items.map(it => {
                const I = AdminIcon[it.icon];
                return (
                  <button key={it.id} className={"side-item" + (page === it.id ? " active" : "")} onClick={() => go(it.id)} title={it.label}>
                    <I /> <span className="si-label">{it.label}</span>
                    {it.badge && pending > 0 && <span className="badge">{pending}</span>}
                  </button>
                );
              })}
            </React.Fragment>
          ))}
        </nav>
        <div className="side-foot">
          <button className="side-item" onClick={() => go("settings")} title="Settings"><AdminIcon.settings /> <span className="si-label">Settings</span></button>
          <button className="side-item" onClick={signOut} title="Sign out"><AdminIcon.logout /> <span className="si-label">Sign out</span></button>
        </div>
      </aside>

      <div className="main">
        <header className="s-topbar">
          <button className="btn ghost sm side-toggle" onClick={() => setMenu(true)} aria-label="Menu"><AdminIcon.menu style={{ width: 18, height: 18 }} /></button>
          <div className="s-search">
            <AdminIcon.search style={{ width: 16, height: 16 }} />
            <input placeholder="Search the studio…" />
          </div>
          <div className="s-right">
            <div className="s-livestat" title="A live presenter is on air"><span className="dot" /> Live</div>
            <div className="s-lang">
              <button className="s-iconbtn" onClick={() => setLangOpen(o => !o)} aria-label="Language" title="Language"><AdminIcon.globe style={{ width: 18, height: 18 }} /></button>
              {langOpen && (
                <div className="lang-menu topbar" data-no-i18n>
                  {window.HFR_I18N.LANGS.map(l => (
                    <button key={l.code} className={"lang-opt" + (l.code === lang ? " on" : "")} onClick={() => { window.HFR_I18N.setLang(l.code); setLang(l.code); setLangOpen(false); }}>{l.label}{l.code === lang && <AdminIcon.check style={{ width: 15, height: 15 }} />}</button>
                  ))}
                </div>
              )}
            </div>
            <div className="s-notif">
              <button className={"s-iconbtn" + (notifOpen ? " on" : "")} onClick={() => setNotifOpen(o => !o)} aria-label="Notifications" title="Notifications"><AdminIcon.bell style={{ width: 18, height: 18 }} /><span className="ping" /></button>
              {notifOpen && (
                <React.Fragment>
                  <div className="notif-scrim" onClick={() => setNotifOpen(false)} />
                  <div className="notif-menu">
                    <div className="notif-head"><b>Notifications</b><button className="notif-clear" onClick={() => setNotifOpen(false)}>Mark all read</button></div>
                    <button className="notif-item unread"><span className="ni-dot live" /><div className="ni-m"><b>Heart to Heart is live</b><span>Arjun Mehta went on air · just now</span></div></button>
                    <button className="notif-item unread"><span className="ni-dot" /><div className="ni-m"><b>Listener peak reached</b><span>1,612 concurrent listeners · 20 min ago</span></div></button>
                    <button className="notif-item"><span className="ni-dot" /><div className="ni-m"><b>New episode published</b><span>“Letters on Meditation” EP 42 · 1 h ago</span></div></button>
                    <button className="notif-item"><span className="ni-dot" /><div className="ni-m"><b>Schedule updated</b><span>“Evening Unwind” moved to 19:00 · 3 h ago</span></div></button>
                    <div className="notif-foot">You're all caught up</div>
                  </div>
                </React.Fragment>
              )}
            </div>
            <div className="s-theme">
              {THEMES.map(t => (
                <button key={t.id} className={theme === t.id ? "active" : ""} onClick={() => setTheme(t.id)} title={t.id} aria-label={t.id}>{t.glyph}</button>
              ))}
            </div>
            <div className="s-avatar">A</div>
          </div>
        </header>
        <PageHost page={page} go={go} openModal={openModal} />
      </div>
      <ViewSwitch current="studio" align="right" />
      <StudioModal modal={modal} onClose={() => setModal(null)} />
    </div>
  );
}

function PageHost({ page, go, openModal }) {
  const [entering, setEntering] = useState(true);
  useEffect(() => {
    setEntering(true);
    let r2;
    const r1 = requestAnimationFrame(() => { r2 = requestAnimationFrame(() => setEntering(false)); });
    return () => { cancelAnimationFrame(r1); if (r2) cancelAnimationFrame(r2); };
  }, [page]);
  return (
    <div className={"s-page" + (entering ? " entering" : "")}>
      {(PAGES[page] || PAGES.overview)({ go, openModal })}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Studio />);

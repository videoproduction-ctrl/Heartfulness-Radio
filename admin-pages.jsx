/* Heartfulness Radio — Studio (admin) pages (→ window) */

/* ---------- Inline broadcast panel (live, in the hero spot) ---------- */
function BroadcastPanel({ listeners }) {
  const [secs, setSecs] = useState(0);
  const [muted, setMuted] = useState(false);
  const [hasMic, setHasMic] = useState(false);
  const [live, setLive] = useState(listeners);
  const meterRef = useRef(null);
  const mutedRef = useRef(false);
  useEffect(() => {
    const id = setInterval(() => setLive(n => Math.max(1180, Math.min(1460, n + Math.round((Math.random() - 0.5) * 14)))), 3000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const start = window.__hfrLiveStart || Date.now();
    window.__hfrLiveStart = start;
    setSecs(Math.floor((Date.now() - start) / 1000));
    const id = setInterval(() => setSecs(Math.floor((Date.now() - start) / 1000)), 250);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const stream = window.__hfrStream;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!stream || !AC) { setHasMic(false); return; }
    let ac, raf;
    try {
      ac = new AC();
      if (ac.state === "suspended") { try { ac.resume(); } catch (e) {} }
      const src = ac.createMediaStreamSource(stream);
      const an = ac.createAnalyser();
      an.fftSize = 128; an.smoothingTimeConstant = 0.78;
      src.connect(an);
      const bins = an.frequencyBinCount;
      const data = new Uint8Array(bins);
      setHasMic(true);
      const loop = () => {
        an.getByteFrequencyData(data);
        const bars = meterRef.current ? meterRef.current.children : [];
        const N = bars.length;
        for (let i = 0; i < N; i++) {
          const idx = 2 + Math.floor(i / N * (bins - 4));
          let v = data[idx] / 255;
          v = Math.pow(v, 0.72); // perceptual lift
          if (mutedRef.current) v = 0;
          const h = 0.08 + Math.min(1, v) * 0.92;
          if (bars[i]) bars[i].style.transform = "scaleY(" + h.toFixed(3) + ")";
        }
        raf = requestAnimationFrame(loop);
      };
      loop();
    } catch (e) { setHasMic(false); }
    return () => { if (raf) cancelAnimationFrame(raf); if (ac) { try { ac.close(); } catch (e) {} } };
  }, []);
  function toggleMute() { const m = !muted; setMuted(m); mutedRef.current = m; const st = window.__hfrStream; if (st) st.getAudioTracks().forEach(t => (t.enabled = !m)); }
  function end() { const st = window.__hfrStream; if (st) { st.getTracks().forEach(t => t.stop()); window.__hfrStream = null; } window.__hfrLive = false; window.__hfrLiveStart = 0; window.dispatchEvent(new CustomEvent("hfr-live", { detail: false })); }
  const fmt = (n) => String(Math.floor(n / 60)).padStart(2, "0") + ":" + String(n % 60).padStart(2, "0");
  const bars = 48;
  return (
    <section className={"broadcast-hero" + (muted ? " muted" : "")}>
      <div className="bh-top">
        <span className="chip live"><span className="lvdot" /> LIVE</span>
        <span className="bh-timer" data-no-i18n>{fmt(secs)}</span>
        <span className="bh-listeners"><span className="bh-lvdot" /> <b data-no-i18n>{live.toLocaleString()}</b> listening now</span>
      </div>
      <h2 className="bh-title">You're on air</h2>
      <div className={"bh-meter" + (hasMic ? " realtime" : "")} ref={meterRef}>
        {Array.from({ length: bars }).map((_, i) => (
          <span key={i} className="mbar" style={{ animationDelay: (i * 0.04).toFixed(2) + "s" }} />
        ))}
      </div>
      <p className="bh-help">{muted ? "You're muted — listeners hear Auto-DJ." : (hasMic ? "Speak into your mic — the waveform reacts to your live audio." : "Speak into your mic — you're streaming live to all listeners.")}</p>
      <div className="bh-actions">
        <button className="btn ghost" onClick={toggleMute}><AdminIcon.mic /> {muted ? "Unmute" : "Mute"}</button>
        <button className="btn bh-end" onClick={end}><AdminIcon.x /> End broadcast</button>
      </div>
    </section>
  );
}

/* ---------- OVERVIEW ---------- */
function AdmOverview({ openModal, go }) {
  const A = window.HFRADMIN;
  const s = A.station;
  const np = A.media[2];
  const liveHue = 28;
  const [isLive, setIsLive] = useState(() => !!window.__hfrLive);
  useEffect(() => {
    const h = (e) => setIsLive(!!(e && e.detail));
    window.addEventListener("hfr-live", h);
    setIsLive(!!window.__hfrLive);
    return () => window.removeEventListener("hfr-live", h);
  }, []);
  const QUICKS = [
    { ic: "mic", label: "Go live", on: () => openModal && openModal("go-live") },
    { ic: "calendar", label: "Schedule", on: () => go && go("schedule") },
    { ic: "upload", label: "Upload", on: () => openModal && openModal("upload") },
    { ic: "playlist", label: "Playlists", on: () => go && go("playlists") },
    { ic: "podcast", label: "Podcasts", on: () => go && go("podcasts") },
    { ic: "chart", label: "Listeners", on: () => go && go("listeners") },
  ];
  return (
    <div className="s-content">
      <div className="quick-rail">
        {QUICKS.map((q, i) => {
          const I = AdminIcon[q.ic];
          return (
            <button className="quick" key={i} onClick={q.on}>
              <span className="quick-ic"><I /></span>
              <span className="quick-l">{q.label}</span>
            </button>
          );
        })}
      </div>
      {isLive && <BroadcastPanel listeners={s.listeners} />}
      <div className="grid g3">
        <div className="card stat-tile">
          <div className="eyebrow">Peak today</div>
          <div className="big">{s.peak.toLocaleString()}</div>
          <div className="sub">at 20:00 local</div>
        </div>
        <div className="card stat-tile">
          <div className="eyebrow">Unique · 24h</div>
          <div className="big">{(s.unique / 1000).toFixed(1)}k</div>
          <div className="sub"><span className="delta up">+3.1%</span> reach</div>
        </div>
        <div className="card stat-tile">
          <div className="eyebrow">Stream health</div>
          <div className="big" style={{ color: "var(--accent-ink)" }}>Online</div>
          <div className="sub">{s.bitrate}kbps {s.format} · 0 errors</div>
        </div>
      </div>

      <div className="grid g2" style={{ marginTop: 18, gridTemplateColumns: "1.7fr 1fr" }}>
        <div className="card pad-lg">
          <div className="card-head">
            <h3>Listeners · last 24 hours</h3>
            <span className="chip green">Live</span>
          </div>
          <LineChart data={A.listeners24h} labels={null} />
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--ff-mono)", fontSize: 11, color: "var(--faint)", marginTop: 4 }}>
            <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:00</span>
          </div>
        </div>
        <div className="card pad-lg">
          <div className="card-head"><h3>Up next</h3><span className="chip muted">Today</span></div>
          <div className="lineup">
            {A.programming.slice(1, 6).map((e, i) => (
              <div className="lineup-row" key={i}>
                <span className="lu-time">{e.time}</span>
                <Cover hue={e.hue} glyph={initials(e.title)} className="lu-cov" />
                <div className="lu-m"><b>{e.title}</b><span>{e.host}</span></div>
                {e.live && <span className="chip live">Live</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid g3" style={{ marginTop: 18 }}>
        <div className="card pad-lg" style={{ gridColumn: "span 2" }}>
          <div className="card-head"><h3>Listening hours · this week</h3><span style={{ fontFamily: "var(--ff-mono)", fontSize: 12, color: "var(--muted)" }}>159.6k total</span></div>
          <BarChart data={A.week} />
        </div>
        <div className="card pad-lg">
          <div className="card-head"><h3>Pending requests</h3><span className="chip warn">{A.requests.filter(r => r.status === "pending").length} new</span></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {A.requests.filter(r => r.status === "pending").map(r => (
              <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <b style={{ fontSize: 14, display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.track}</b>
                  <span style={{ color: "var(--muted)", fontSize: 12.5 }}>{r.by}</span>
                </div>
                <span style={{ fontFamily: "var(--ff-mono)", fontSize: 11, color: "var(--faint)" }}>{r.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- MEDIA ---------- */
function AdmMedia({ openModal }) {
  const A = window.HFRADMIN;
  const [q, setQ] = useState("");
  const list = A.media.filter(m => (m.title + m.artist + m.album).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="s-content">
      <div className="s-head">
        <div><div className="eyebrow">Library</div><h1>Media</h1><p>{A.media.length} tracks · {A.station.storage.used} GB of {A.station.storage.total} GB used</p></div>
        <button className="btn primary" onClick={() => openModal && openModal("upload")}><AdminIcon.upload /> Upload</button>
      </div>

      <div className="card pad-lg" style={{ marginBottom: 18 }}>
        <div className="dropzone" onClick={() => openModal && openModal("upload")} style={{ cursor: "pointer" }}>
          <div className="ico"><AdminIcon.upload /></div>
          <b style={{ fontFamily: "var(--ff-serif)", fontSize: 18, color: "var(--ink)" }}>Drop audio files to upload</b>
          <p style={{ marginTop: 6 }}>MP3, FLAC, AAC or OGG · up to 250 MB each — or click to browse</p>
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <div className="s-search" style={{ width: 260 }}>
            <AdminIcon.search style={{ width: 16, height: 16 }} />
            <input placeholder="Search tracks…" value={q} onChange={e => setQ(e.target.value)} />
          </div>
          <span style={{ fontFamily: "var(--ff-mono)", fontSize: 12, color: "var(--muted)" }}>{list.length} shown</span>
        </div>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Track</th><th>Album</th><th>Playlist</th><th>Plays</th><th>Length</th><th></th></tr></thead>
            <tbody>
              {list.map(m => (
                <tr key={m.id}>
                  <td><div className="t-cover"><Cover hue={m.hue} glyph={initials(m.title)} /><div><span className="t-main">{m.title}</span><span className="t-sub">{m.artist}</span></div></div></td>
                  <td style={{ color: "var(--muted)" }}>{m.album}</td>
                  <td><span className="chip green">{m.playlist}</span></td>
                  <td className="num">{m.plays}</td>
                  <td className="num">{m.dur}</td>
                  <td><button className="btn ghost sm" onClick={() => openModal && openModal("upload")}><AdminIcon.dots style={{ width: 15, height: 15 }} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------- PLAYLISTS ---------- */
function AdmPlaylists({ openModal }) {
  const A = window.HFRADMIN;
  const [pls, setPls] = useState(A.playlists);
  const toggle = (id) => setPls(p => p.map(x => x.id === id ? { ...x, enabled: !x.enabled } : x));
  return (
    <div className="s-content">
      <div className="s-head">
        <div><div className="eyebrow">Programming</div><h1>Playlists</h1><p>How music and talk rotate through the day</p></div>
        <button className="btn primary" onClick={() => openModal && openModal("new-playlist")}><AdminIcon.plus /> New playlist</button>
      </div>
      <div className="grid g2">
        {pls.map(p => (
          <div className="card card-click" key={p.id} onClick={() => openModal && openModal("playlist", p)}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Cover hue={p.hue} glyph={initials(p.name)} style={{ width: 52, height: 52 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <b style={{ fontFamily: "var(--ff-serif)", fontWeight: 500, fontSize: 19, display: "block" }}>{p.name}</b>
                <span style={{ color: "var(--muted)", fontSize: 13 }}>{p.type} · {p.tracks} tracks</span>
              </div>
              <span onClick={(e) => e.stopPropagation()}><Switch on={p.enabled} onClick={() => toggle(p.id)} /></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--line-soft)" }}>
              <div><div className="eyebrow" style={{ marginBottom: 4 }}>Schedule</div><span style={{ fontSize: 13.5 }}>{p.schedule}</span></div>
              <div style={{ marginLeft: "auto" }}><div className="eyebrow" style={{ marginBottom: 4 }}>Weight</div>
                <div style={{ display: "flex", gap: 3 }}>{[1,2,3,4,5].map(n => <span key={n} style={{ width: 8, height: 8, borderRadius: 9, background: n <= p.weight ? "var(--accent)" : "var(--line)" }} />)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- SCHEDULE / PROGRAMMING ---------- */
const SCHED_TODAY = new Date(2026, 5, 12); // Wed 12 Jun 2026 (demo "today")
const SCHED_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const SCHED_MO = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function startOfWeek(d) { const x = new Date(d); const off = (x.getDay() + 6) % 7; x.setDate(x.getDate() - off); x.setHours(0, 0, 0, 0); return x; }
function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
function sameDay(a, b) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }

function MiniCal({ selected, onPick, onClose }) {
  const [view, setView] = useState(new Date(selected.getFullYear(), selected.getMonth(), 1));
  useEffect(() => {
    const h = (e) => { if (!e.target.closest(".wk-pick")) onClose(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const y = view.getFullYear(), m = view.getMonth();
  const startOff = (new Date(y, m, 1).getDay() + 6) % 7;
  const days = new Date(y, m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startOff; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(new Date(y, m, d));
  const selWeek = startOfWeek(selected);
  return (
    <div className="minical" onClick={e => e.stopPropagation()}>
      <div className="mc-head">
        <button onClick={() => setView(new Date(y, m - 1, 1))} aria-label="Previous month"><AdminIcon.chevL /></button>
        <span>{SCHED_MONTHS[m]} {y}</span>
        <button onClick={() => setView(new Date(y, m + 1, 1))} aria-label="Next month"><AdminIcon.chevR /></button>
      </div>
      <div className="mc-dow">{["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i}>{d}</span>)}</div>
      <div className="mc-grid">
        {cells.map((d, i) => {
          if (!d) return <span className="mc-cell empty" key={i} />;
          const inWeek = sameDay(startOfWeek(d), selWeek);
          const isToday = sameDay(d, SCHED_TODAY);
          return <button key={i} className={"mc-cell" + (inWeek ? " inweek" : "") + (isToday ? " today" : "")} onClick={() => onPick(d)}>{d.getDate()}</button>;
        })}
      </div>
    </div>
  );
}

function AdmSchedule({ openModal }) {
  const A = window.HFRADMIN;
  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  const fmt = (m) => String(Math.floor(m / 60) % 24).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
  const START = 6 * 60, END = 24 * 60, PXM = 0.76, HOURH = 60 * PXM;
  const [weekMon, setWeekMon] = useState(() => startOfWeek(SCHED_TODAY));
  const [pickOpen, setPickOpen] = useState(false);
  const [prog, setProg] = useState(A.programming);
  function addEvent(ev) { A.programming = [...A.programming, ev]; setProg(A.programming); }
  function updateEvent(orig, vals) { A.programming = A.programming.map(e => (e.time === orig.time && e.title === orig.title) ? { ...e, ...vals } : e); setProg(A.programming); }
  function deleteEvent(orig) { A.programming = A.programming.filter(e => !(e.time === orig.time && e.title === orig.title)); setProg(A.programming); }
  const colDates = DAYS.map((_, i) => addDays(weekMon, i));
  const monLabel = SCHED_MONTHS[weekMon.getMonth()] + " " + weekMon.getFullYear();
  const rangeLabel = colDates[0].getDate() + " " + SCHED_MO[colDates[0].getMonth()] + " – " + colDates[6].getDate() + " " + SCHED_MO[colDates[6].getMonth()];
  const compute = (list) => {
    const sorted = [...list].sort((a, b) => toMin(a.time) - toMin(b.time));
    return sorted.map((e, i, arr) => { const s = toMin(e.time); const next = i < arr.length - 1 ? toMin(arr[i + 1].time) : END; return { ...e, start: s, end: Math.min(next, END) }; });
  };
  const dayEvents = (di) => {
    if (di >= 5) {
      const base = prog.filter(e => !e.live && e.title !== "Wisdom Talk" && e.title !== "Stories of the Heart");
      const extra = [
        { time: "09:00", title: "Weekend Sessions", playlist: "Live DJ", host: di === 5 ? "Maya Iyer" : "Anaya Reddy", hue: 300, live: true },
        { time: "16:00", title: "Sangha Gathering", playlist: "Talks & Conversations", host: "Sister Clara", hue: 268 },
      ];
      return compute([...base, ...extra]);
    }
    return compute(prog);
  };
  const hours = [];
  for (let h = 6; h <= 24; h++) hours.push(h);
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const showNow = nowMin >= START && nowMin <= END;
  return (
    <div className="s-content">
      <div className="s-head">
        <div><div className="eyebrow">Programming</div><h1>Schedule</h1><p>Weekly broadcast calendar</p></div>
        <button className="btn primary" onClick={() => openModal && openModal("add-event", { onCreate: addEvent })}><AdminIcon.plus /> Add event</button>
      </div>
      <div className="wk-toolbar">
        <div className="wk-month">{monLabel}</div>
        <div className="wk-range">{rangeLabel}</div>
        <div className="wk-nav">
          <button onClick={() => setWeekMon(addDays(weekMon, -7))} aria-label="Previous week"><AdminIcon.chevL /></button>
          <div className="wk-pick">
            <button className="wk-today" onClick={() => setPickOpen(o => !o)} aria-label="Jump to date"><AdminIcon.cal /></button>
            {pickOpen && <MiniCal selected={weekMon} onPick={(d) => { setWeekMon(startOfWeek(d)); setPickOpen(false); }} onClose={() => setPickOpen(false)} />}
          </div>
          <button onClick={() => setWeekMon(addDays(weekMon, 7))} aria-label="Next week"><AdminIcon.chevR /></button>
        </div>
      </div>
      <div className="card cal-card" style={{ padding: 0 }}>
        <div className="wk-head">
          <div className="wk-corner" />
          {colDates.map((d, i) => (
            <div className={"wk-dh" + (sameDay(d, SCHED_TODAY) ? " today" : "")} key={i}>
              <span className="wk-dh-name">{DAYS[i]}</span>
              <span className="wk-dh-num">{d.getDate()}</span>
            </div>
          ))}
        </div>
        <div className="wk-scroll">
          <div className="wk-grid" style={{ height: (END - START) * PXM }}>
            <div className="wk-gutter">
              {hours.map(h => (<span className="wk-hlabel" key={h} style={{ top: (h * 60 - START) * PXM }}>{String(h % 24).padStart(2, "0")}:00</span>))}
            </div>
            {colDates.map((d, di) => {
              const isToday = sameDay(d, SCHED_TODAY);
              return (
                <div className={"wk-col" + (isToday ? " today" : "")} key={di} style={{ backgroundSize: "100% " + HOURH + "px" }}>
                  {isToday && showNow && (
                    <div className="wk-now" style={{ top: (nowMin - START) * PXM }}><span /></div>
                  )}
                  {dayEvents(di).map((e, i) => (
                    <button key={i} className={"wk-ev" + (e.live ? " live" : "")} onClick={() => openModal && openModal("edit-event", { ...e, onUpdate: updateEvent, onDelete: deleteEvent })}
                      style={{ top: (e.start - START) * PXM, height: Math.max(22, (e.end - e.start) * PXM - 3), "--evh": e.hue }}>
                      <span className="wk-ev-t">{e.title}</span>
                      <span className="wk-ev-time">{fmt(e.start)}{e.live ? " · Live" : ""}</span>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- LIVE DJs ---------- */
function AdmDJs({ openModal }) {
  const A = window.HFRADMIN;
  return (
    <div className="s-content">
      <div className="s-head">
        <div><div className="eyebrow">Live</div><h1>Presenters &amp; DJs</h1><p>Streamer accounts and live broadcast slots</p></div>
        <button className="btn primary" onClick={() => openModal && openModal("add-presenter")}><AdminIcon.plus /> Add presenter</button>
      </div>
      <div className="grid g2">
        {A.streamers.map(s => (
          <div className="card" key={s.id} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Cover hue={158} glyph={initials(s.name)} style={{ width: 56, height: 56, borderRadius: "50%" }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <b style={{ fontFamily: "var(--ff-serif)", fontWeight: 500, fontSize: 19 }}>{s.name}</b>
                {s.live ? <span className="chip live"><span style={{ width: 6, height: 6, borderRadius: 9, background: "var(--live)", display: "inline-block" }} /> On air</span> : <span className="chip muted">Offline</span>}
              </div>
              <span style={{ color: "var(--muted)", fontSize: 13.5, fontFamily: "var(--ff-mono)" }}>@{s.handle}</span>
              <div style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 4 }}>{s.live ? `Live since ${s.since} · ${s.note}` : `Next: ${s.next} · ${s.note}`}</div>
            </div>
            <button className="btn ghost sm" onClick={() => openModal && openModal("presenter", s)}>Manage</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- PODCASTS ---------- */
function AdmPodcasts({ openModal }) {
  const A = window.HFRADMIN;
  const [pods, setPods] = useState(A.podcasts);
  function addSeries(series) { A.podcasts = [series, ...A.podcasts]; setPods(A.podcasts); }
  return (
    <div className="s-content">
      <div className="s-head">
        <div><div className="eyebrow">On demand</div><h1>Podcasts</h1><p>Series, episodes and subscribers</p></div>
        <button className="btn primary" onClick={() => openModal && openModal("new-series", { onCreate: addSeries })}><AdminIcon.plus /> New series</button>
      </div>
      <div className="grid g3">
        {pods.map(p => (
          <div className="card show-card-clickable" key={p.id} onClick={() => openModal && openModal("podcast-series", p)} style={{ cursor: "pointer" }}>
            <Cover hue={p.hue} glyph={initials(p.title)} style={{ width: "100%", aspectRatio: 1, marginBottom: 14 }} />
            <b style={{ fontFamily: "var(--ff-serif)", fontWeight: 500, fontSize: 20, display: "block" }}>{p.title}</b>
            <div style={{ display: "flex", gap: 16, marginTop: 12, color: "var(--muted)", fontSize: 13 }}>
              <span><b style={{ color: "var(--ink)", fontFamily: "var(--ff-mono)" }}>{p.episodes}</b> episodes</span>
              <span><b style={{ color: "var(--ink)", fontFamily: "var(--ff-mono)" }}>{(p.subs/1000).toFixed(1)}k</b> subs</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--line-soft)" }}>
              <span style={{ fontSize: 12.5, color: "var(--faint)", fontFamily: "var(--ff-mono)" }}>Last: {p.lastPublished}</span>
              <button className="btn ghost sm" onClick={(e) => { e.stopPropagation(); openModal && openModal("upload"); }}><AdminIcon.upload style={{ width: 14, height: 14 }} /> Episode</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- REQUESTS ---------- */
function AdmRequests() {
  const A = window.HFRADMIN;
  const [reqs, setReqs] = useState(A.requests);
  const set = (id, status) => setReqs(r => r.map(x => x.id === id ? { ...x, status } : x));
  const chip = (st) => st === "approved" ? "green" : st === "rejected" ? "live" : "warn";
  return (
    <div className="s-content">
      <div className="s-head">
        <div><div className="eyebrow">Inbox</div><h1>Song requests</h1><p>Listener requests awaiting review</p></div>
      </div>
      <div className="card">
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Track</th><th>Requested by</th><th>When</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {reqs.map(r => (
                <tr key={r.id}>
                  <td><span className="t-main">{r.track}</span><span className="t-sub">{r.artist}</span></td>
                  <td style={{ color: "var(--muted)" }}>{r.by}</td>
                  <td className="num">{r.time}</td>
                  <td><span className={"chip " + chip(r.status)} style={{ textTransform: "capitalize" }}>{r.status}</span></td>
                  <td>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button className="btn ghost sm" onClick={() => set(r.id, "approved")} aria-label="Approve" style={{ color: "var(--accent-ink)" }}><AdminIcon.check style={{ width: 15, height: 15 }} /></button>
                      <button className="btn ghost sm" onClick={() => set(r.id, "rejected")} aria-label="Reject" style={{ color: "var(--live)" }}><AdminIcon.x style={{ width: 15, height: 15 }} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------- LISTENERS / ANALYTICS ---------- */
function AdmListeners() {
  const A = window.HFRADMIN;
  return (
    <div className="s-content">
      <div className="s-head">
        <div><div className="eyebrow">Analytics</div><h1>Listeners</h1><p>Who’s tuning in, and from where</p></div>
        <button className="btn ghost"><AdminIcon.chart /> Export CSV</button>
      </div>
      <div className="grid g2" style={{ gridTemplateColumns: "1.6fr 1fr" }}>
        <div className="card pad-lg">
          <div className="card-head"><h3>Concurrent listeners · 24h</h3></div>
          <LineChart data={A.listeners24h} />
        </div>
        <div className="card pad-lg">
          <div className="card-head"><h3>By country</h3></div>
          <div className="barlist">
            {A.countries.map((c, i) => (
              <div className="row" key={i}>
                <span className="lbl">{c.name}</span>
                <div className="meter"><i style={{ width: c.pct + "%" }} /></div>
                <span className="val">{c.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid g2" style={{ marginTop: 18 }}>
        <div className="card pad-lg">
          <div className="card-head"><h3>Most played</h3></div>
          <table className="tbl">
            <tbody>
              {A.topTracks.map((t, i) => (
                <tr key={i}>
                  <td style={{ width: 28 }} className="num">{i + 1}</td>
                  <td><span className="t-main">{t.title}</span><span className="t-sub">{t.artist}</span></td>
                  <td className="num" style={{ textAlign: "right" }}>{t.plays} plays</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card pad-lg">
          <div className="card-head"><h3>Devices</h3></div>
          <div className="barlist">
            {A.devices.map((d, i) => (
              <div className="row" key={i}>
                <span className="lbl">{d.name}</span>
                <div className="meter"><i style={{ width: d.pct + "%" }} /></div>
                <span className="val">{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- SETTINGS ---------- */
function AdmSettings() {
  const A = window.HFRADMIN; const s = A.station;
  return (
    <div className="s-content">
      <div className="s-head">
        <div><div className="eyebrow">Station</div><h1>Settings</h1><p>Stream configuration and public profile</p></div>
        <button className="btn primary"><AdminIcon.check /> Save changes</button>
      </div>
      <div className="card pad-lg">
        <div className="settings-row">
          <div className="lbl"><b>Station name</b><span>Shown across the player and podcasts</span></div>
          <div><input className="in" defaultValue={s.name} /></div>
        </div>
        <div className="settings-row">
          <div className="lbl"><b>Shortcode</b><span>Used in stream &amp; API URLs</span></div>
          <div><input className="in" defaultValue={s.shortcode} /></div>
        </div>
        <div className="settings-row">
          <div className="lbl"><b>Public stream URL</b><span>Icecast / Shoutcast mount</span></div>
          <div><input className="in" defaultValue={`https://radio.hfnradio2.live/listen/${s.shortcode}/radio.mp3`} /></div>
        </div>
        <div className="settings-row">
          <div className="lbl"><b>Bitrate &amp; format</b><span>Primary mount point</span></div>
          <div style={{ display: "flex", gap: 12 }}>
            <select className="in"><option>128 kbps</option><option>192 kbps</option><option>256 kbps</option></select>
            <select className="in"><option>MP3</option><option>AAC</option><option>OGG</option></select>
          </div>
        </div>
        <div className="settings-row">
          <div className="lbl"><b>Accept song requests</b><span>Allow listeners to submit tracks</span></div>
          <div><Switch on={true} onClick={() => {}} /></div>
        </div>
        <div className="settings-row">
          <div className="lbl"><b>Public description</b><span>Appears on the About page</span></div>
          <div><textarea className="in" rows="3" defaultValue="Heartfulness Radio carries guided meditation, soulful conversation and gentle music to listeners around the clock."></textarea></div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AdmOverview, AdmMedia, AdmPlaylists, AdmSchedule, AdmDJs, AdmPodcasts, AdmRequests, AdmListeners, AdmSettings });

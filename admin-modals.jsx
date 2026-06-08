/* Heartfulness Radio — Studio modals (create/edit/manage flows) → window.StudioModal */

function MField({ label, hint, children }) {
  return (
    <div className="mfield">
      <label>{label}</label>
      {children}
      {hint && <span className="mhint">{hint}</span>}
    </div>
  );
}

function HuePick({ value, onChange }) {
  const hues = [188, 158, 28, 340, 268, 42, 232, 205];
  return (
    <div className="hue-row">
      {hues.map(h => (
        <button type="button" key={h} className={"hue" + (value === h ? " on" : "")} style={{ background: `hsl(${h} 52% 50%)` }} onClick={() => onChange(h)} aria-label={"colour " + h} />
      ))}
    </div>
  );
}

function KeyField({ value }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="keyfield">
      <input className="in" readOnly value={value} />
      <button type="button" className="btn ghost copy-btn" onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1400); }}>
        {copied ? <AdminIcon.check style={{ width: 15, height: 15 }} /> : <Icon.link style={{ width: 15, height: 15 }} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

function Saved({ title, msg, onClose }) {
  return (
    <div className="modal-saved">
      <div className="c"><AdminIcon.check style={{ width: 26, height: 26 }} /></div>
      <h3>{title}</h3>
      <p>{msg}</p>
      <button className="btn primary" onClick={onClose}>Done</button>
    </div>
  );
}

function Shell({ eyebrow, title, sub, onClose, children, foot }) {
  return (
    <React.Fragment>
      <div className="modal-h">
        <div><div className="eyebrow">{eyebrow}</div><h2>{title}</h2>{sub && <p>{sub}</p>}</div>
        <button className="modal-x" onClick={onClose} aria-label="Close"><AdminIcon.x style={{ width: 18, height: 18 }} /></button>
      </div>
      <div className="modal-body">{children}</div>
      {foot && <div className="modal-foot">{foot}</div>}
    </React.Fragment>
  );
}

/* ---- New series ---- */
function SeriesForm({ data, onClose }) {
  const [f, setF] = useState({ title: "", host: "", cat: "Meditation", desc: "", hue: 188, pub: false });
  const [media, setMedia] = useState([]);
  const [done, setDone] = useState(false);
  const fileRef = useRef(null);
  const ok = f.title.trim().length > 1 && f.host.trim().length > 1;
  function onFiles(e) {
    const files = Array.from(e.target.files || []);
    setMedia(m => [...m, ...files.map(file => ({ name: file.name, size: (file.size / 1048576).toFixed(1) + " MB" }))]);
    e.target.value = "";
  }
  function create() {
    if (!ok) return;
    const series = {
      id: "pod" + Date.now(),
      title: f.title.trim(),
      host: f.host.trim(),
      episodes: media.length,
      subs: 0,
      lastPublished: f.pub ? "Just now" : "Draft",
      hue: f.hue,
    };
    if (data && data.onCreate) data.onCreate(series);
    setDone(true);
  }
  if (done) return <Saved title={`“${f.title}” created`} msg={media.length ? `${media.length} episode${media.length > 1 ? "s" : ""} added. It's now in your series list.` : "Add your first episode to publish it."} onClose={onClose} />;
  return (
    <Shell eyebrow="On demand · new" title="New podcast series" sub="Set up a series — add episodes once it's created." onClose={onClose}
      foot={<><button className="btn ghost" onClick={onClose}>Cancel</button><button className="btn primary" disabled={!ok} onClick={create}><AdminIcon.check /> Create series</button></>}>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <MField label="Series title"><input className="in" value={f.title} onChange={e => setF({ ...f, title: e.target.value })} placeholder="e.g. The Inner Journey" /></MField>
          <MField label="Host"><input className="in" value={f.host} onChange={e => setF({ ...f, host: e.target.value })} placeholder="e.g. Devan Kapoor" /></MField>
        </div>
        <div style={{ flex: "none", textAlign: "center" }}>
          <label style={{ display: "block", fontWeight: 600, fontSize: 13, marginBottom: 6 }}>Cover</label>
          <Cover hue={f.hue} glyph={f.title.trim() ? initials(f.title) : "—"} style={{ width: 92, height: 92, borderRadius: 14 }} />
        </div>
      </div>
      <MField label="Category">
        <select className="in" value={f.cat} onChange={e => setF({ ...f, cat: e.target.value })}>
          <option>Meditation</option><option>Talk</option><option>Music</option><option>Stories</option>
        </select>
      </MField>
      <MField label="Cover colour"><HuePick value={f.hue} onChange={h => setF({ ...f, hue: h })} /></MField>
      <MField label="Description"><textarea className="in" rows="3" value={f.desc} onChange={e => setF({ ...f, desc: e.target.value })} placeholder="What is this series about?" /></MField>
      <MField label="Episodes / media">
        <div className="media-drop" onClick={() => fileRef.current && fileRef.current.click()}>
          <AdminIcon.upload style={{ width: 18, height: 18 }} />
          <span>Add audio files{media.length ? ` · ${media.length} added` : ""}</span>
          <input ref={fileRef} type="file" accept="audio/*" multiple style={{ display: "none" }} onChange={onFiles} />
        </div>
        {media.length > 0 && (
          <div className="media-list">
            {media.map((m, i) => (
              <div className="media-item" key={i}>
                <AdminIcon.play style={{ width: 12, height: 12 }} />
                <span className="mi-name">{m.name}</span>
                <span className="mi-size">{m.size}</span>
                <button className="mi-x" onClick={() => setMedia(media.filter((_, j) => j !== i))} aria-label="Remove"><AdminIcon.x style={{ width: 13, height: 13 }} /></button>
              </div>
            ))}
          </div>
        )}
      </MField>
      <div className="mrow"><div><b>Publish immediately</b><span>Otherwise saved as a draft</span></div><Switch on={f.pub} onClick={() => setF({ ...f, pub: !f.pub })} /></div>
    </Shell>
  );
}

/* ---- Add presenter ---- */
function PresenterForm({ onClose }) {
  const [f, setF] = useState({ name: "", handle: "", role: "Presenter", email: "", show: "" });
  const [done, setDone] = useState(false);
  const ok = f.name.trim().length > 1 && f.handle.trim().length > 1;
  if (done) return <Saved title="Presenter added" msg={`@${f.handle} can now broadcast live. We've emailed their login.`} onClose={onClose} />;
  return (
    <Shell eyebrow="Live · new" title="Add presenter" sub="Create a streamer account for a live broadcaster." onClose={onClose}
      foot={<><button className="btn ghost" onClick={onClose}>Cancel</button><button className="btn primary" disabled={!ok} onClick={() => ok && setDone(true)}><AdminIcon.check /> Add presenter</button></>}>
      <MField label="Full name"><input className="in" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} placeholder="e.g. Anaya Reddy" /></MField>
      <div style={{ display: "flex", gap: 12 }}>
        <MField label="Handle"><input className="in" value={f.handle} onChange={e => setF({ ...f, handle: e.target.value.replace(/\s/g, "") })} placeholder="anaya" /></MField>
        <MField label="Role">
          <select className="in" value={f.role} onChange={e => setF({ ...f, role: e.target.value })}><option>Presenter</option><option>Guest DJ</option><option>Producer</option></select>
        </MField>
      </div>
      <MField label="Email" hint="Used for their studio login and notifications."><input className="in" type="email" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} placeholder="name@email.com" /></MField>
      <MField label="Regular show (optional)"><input className="in" value={f.show} onChange={e => setF({ ...f, show: e.target.value })} placeholder="e.g. Morning Stillness" /></MField>
    </Shell>
  );
}

/* ---- Manage presenter (detail) ---- */
function PresenterDetail({ data, onClose }) {
  const s = data || {};
  const key = "hfr_live_" + (s.handle || "key") + "_8c41a9";
  return (
    <Shell eyebrow="Live · presenter" title="Manage presenter" onClose={onClose}
      foot={<><button className="btn ghost" onClick={onClose}>Close</button><button className="btn primary"><AdminIcon.mic /> {s.live ? "End broadcast" : "Start broadcast"}</button></>}>
      <div className="modal-avatar">
        <Cover hue={158} glyph={initials(s.name || "")} style={{ width: 56, height: 56, borderRadius: "50%" }} />
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <b style={{ fontFamily: "var(--ff-serif)", fontSize: 20 }}>{s.name}</b>
            {s.live ? <span className="chip live"><span style={{ width: 6, height: 6, borderRadius: 9, background: "var(--live)", display: "inline-block" }} /> On air</span> : <span className="chip muted">Offline</span>}
          </div>
          <span style={{ fontFamily: "var(--ff-mono)", fontSize: 12.5, color: "var(--muted)" }}>@{s.handle}</span>
        </div>
      </div>
      <div className="detail-stats">
        <div className="detail-stat"><div className="n">128</div><div className="l">Shows hosted</div></div>
        <div className="detail-stat"><div className="n">96h</div><div className="l">On air</div></div>
        <div className="detail-stat"><div className="n">4.8</div><div className="l">Avg rating</div></div>
      </div>
      <MField label="Programme">{<input className="in" defaultValue={s.note || ""} />}</MField>
      <MField label="Next slot">{<input className="in" defaultValue={s.live ? "Live now" : (s.next || "")} />}</MField>
      <MField label="Stream key" hint="Paste into broadcasting software (e.g. BUTT, Mixxx) to go live."><KeyField value={key} /></MField>
      <div className="mrow"><div><b>Allow live broadcasting</b><span>Lets this presenter take over the stream</span></div><Switch on={true} onClick={() => {}} /></div>
    </Shell>
  );
}

/* ---- Add / edit schedule event ---- */
function EventForm({ data, onClose }) {
  const A = window.HFRADMIN;
  const edit = !!(data && data.title);
  const [f, setF] = useState({
    time: edit ? data.time : "12:00",
    title: edit ? data.title : "",
    playlist: edit ? data.playlist : A.playlists[0].name,
    host: edit ? data.host : "Auto",
    live: edit ? !!data.live : false,
  });
  const [done, setDone] = useState(false);
  const ok = f.title.trim().length > 1;
  function submit() {
    if (!ok) return;
    if (!edit && data && data.onCreate) {
      const HUES = [158, 205, 268, 28, 340, 42, 14, 232, 300];
      data.onCreate({ time: f.time, title: f.title.trim(), playlist: f.playlist, host: f.host, live: f.live, hue: HUES[Math.floor(Math.random() * HUES.length)] });
    } else if (edit && data && data.onUpdate) {
      data.onUpdate(data, { time: f.time, title: f.title.trim(), playlist: f.playlist, host: f.host, live: f.live });
    }
    setDone(true);
  }
  if (done) return <Saved title={edit ? "Event updated" : "Event added"} msg={`${f.title} · ${f.time} is on the schedule.`} onClose={onClose} />;
  return (
    <Shell eyebrow={"Programming · " + (edit ? "edit" : "new")} title={edit ? "Edit event" : "Add schedule event"} onClose={onClose}
      foot={<>{edit && <button className="btn ghost" style={{ color: "var(--live)", marginRight: "auto" }} onClick={() => { if (data && data.onDelete) data.onDelete(data); onClose(); }}>Delete</button>}<button className="btn ghost" onClick={onClose}>Cancel</button><button className="btn primary" disabled={!ok} onClick={submit}><AdminIcon.check /> {edit ? "Save changes" : "Add event"}</button></>}>
      <div style={{ display: "flex", gap: 12 }}>
        <MField label="Start time"><input className="in" type="time" value={f.time} onChange={e => setF({ ...f, time: e.target.value })} /></MField>
        <MField label="Programme title"><input className="in" value={f.title} onChange={e => setF({ ...f, title: e.target.value })} placeholder="e.g. Morning Stillness" /></MField>
      </div>
      <MField label="Source playlist">
        <select className="in" value={f.playlist} onChange={e => setF({ ...f, playlist: e.target.value })}>
          {A.playlists.map(p => <option key={p.id}>{p.name}</option>)}
          <option>Live DJ</option>
        </select>
      </MField>
      <MField label="Host">
        <select className="in" value={f.host} onChange={e => setF({ ...f, host: e.target.value })}>
          <option>Auto</option>
          {A.streamers.map(s => <option key={s.id}>{s.name}</option>)}
        </select>
      </MField>
      <div className="mrow"><div><b>Live presenter slot</b><span>Hands the stream to a live DJ</span></div><Switch on={f.live} onClick={() => setF({ ...f, live: !f.live })} /></div>
    </Shell>
  );
}

/* ---- New playlist ---- */
function PlaylistForm({ onClose }) {
  const [f, setF] = useState({ name: "", type: "General rotation", schedule: "", weight: 3, enabled: true });
  const [done, setDone] = useState(false);
  const ok = f.name.trim().length > 1;
  if (done) return <Saved title={`“${f.name}” created`} msg="Add tracks to start rotating it on air." onClose={onClose} />;
  return (
    <Shell eyebrow="Programming · new" title="New playlist" sub="Group tracks and choose how they rotate." onClose={onClose}
      foot={<><button className="btn ghost" onClick={onClose}>Cancel</button><button className="btn primary" disabled={!ok} onClick={() => ok && setDone(true)}><AdminIcon.check /> Create playlist</button></>}>
      <MField label="Playlist name"><input className="in" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} placeholder="e.g. Sunrise Ragas" /></MField>
      <MField label="Type">
        <select className="in" value={f.type} onChange={e => setF({ ...f, type: e.target.value })}>
          <option>General rotation</option><option>Scheduled</option><option>Sequential</option><option>Shuffle</option><option>Jingles</option>
        </select>
      </MField>
      <MField label="Schedule (optional)" hint="e.g. 06:00–07:00 daily, or leave for all-day rotation."><input className="in" value={f.schedule} onChange={e => setF({ ...f, schedule: e.target.value })} placeholder="All day" /></MField>
      <MField label={"Rotation weight · " + f.weight}>
        <input type="range" min="1" max="5" value={f.weight} onChange={e => setF({ ...f, weight: +e.target.value })} style={{ width: "100%", accentColor: "var(--accent)" }} />
      </MField>
      <div className="mrow"><div><b>Enabled</b><span>Include in the rotation right away</span></div><Switch on={f.enabled} onClick={() => setF({ ...f, enabled: !f.enabled })} /></div>
    </Shell>
  );
}

/* ---- Upload media ---- */
function UploadForm({ onClose }) {
  const [done, setDone] = useState(false);
  const files = [
    { n: "antara_live.mp3", s: "9.2 MB" },
    { n: "morning_raag.flac", s: "41 MB" },
  ];
  if (done) return <Saved title="Upload complete" msg="2 files added to your library and queued for tagging." onClose={onClose} />;
  return (
    <Shell eyebrow="Library" title="Upload media" sub="Add audio to your library." onClose={onClose}
      foot={<><button className="btn ghost" onClick={onClose}>Cancel</button><button className="btn primary" onClick={() => setDone(true)}><AdminIcon.upload /> Upload 2 files</button></>}>
      <div className="dropzone" style={{ marginBottom: 16 }}>
        <div className="ico"><AdminIcon.upload /></div>
        <b style={{ fontFamily: "var(--ff-serif)", fontSize: 18, color: "var(--ink)" }}>Drop audio files here</b>
        <p style={{ marginTop: 6 }}>MP3, FLAC, AAC or OGG · up to 250 MB each</p>
      </div>
      {files.map((f, i) => (
        <div className="mrow" key={i} style={{ borderTop: i ? "1px solid var(--line-soft)" : "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><AdminIcon.media style={{ width: 18, height: 18, color: "var(--accent-ink)" }} /><div><b>{f.n}</b><span>{f.s} · ready</span></div></div>
          <span className="chip green">Queued</span>
        </div>
      ))}
      <MField label="Add to playlist" hint="Optional — you can assign later.">
        <select className="in"><option>None</option>{window.HFRADMIN.playlists.map(p => <option key={p.id}>{p.name}</option>)}</select>
      </MField>
    </Shell>
  );
}

/* ---- Go live — broadcast directly from the browser ---- */
function GoLiveForm({ onClose }) {
  const s = window.HFRADMIN.station;
  // stage: "setup" | "live" | "ended"
  const [stage, setStage] = useState("setup");
  const [devices, setDevices] = useState([]);
  const [deviceId, setDeviceId] = useState("");
  const [err, setErr] = useState("");
  const [level, setLevel] = useState(0);
  const [muted, setMuted] = useState(false);
  const [secs, setSecs] = useState(0);
  const [autodj, setAutodj] = useState(true);
  const streamRef = useRef(null);
  const acRef = useRef(null);
  const rafRef = useRef(0);
  const mutedRef = useRef(false);

  // enumerate mics for the picker (labels appear after first permission grant)
  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return;
    navigator.mediaDevices.enumerateDevices().then(list => {
      setDevices(list.filter(d => d.kind === "audioinput"));
    }).catch(() => {});
  }, [stage]);

  function stopAll() {
    cancelAnimationFrame(rafRef.current);
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    if (acRef.current) { try { acRef.current.close(); } catch (e) {} acRef.current = null; }
  }
  useEffect(() => () => stopAll(), []);

  async function startBroadcast() {
    setErr("");
    let stream = null;
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const constraints = { audio: deviceId ? { deviceId: { exact: deviceId } } : true, video: false };
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      }
    } catch (e) { stream = null; /* mic blocked/unavailable — go live in demo mode */ }
    window.__hfrStream = stream;
    window.__hfrLive = true;
    window.__hfrLiveStart = Date.now();
    window.dispatchEvent(new CustomEvent("hfr-live", { detail: true }));
    onClose();
  }

  // on-air timer
  useEffect(() => {
    if (stage !== "live") return;
    const id = setInterval(() => setSecs(n => n + 1), 1000);
    return () => clearInterval(id);
  }, [stage]);

  function toggleMute() {
    const m = !muted; setMuted(m); mutedRef.current = m;
    if (streamRef.current) streamRef.current.getAudioTracks().forEach(t => (t.enabled = !m));
  }
  function endBroadcast() { stopAll(); window.__hfrLive = false; window.dispatchEvent(new CustomEvent("hfr-live", { detail: false })); setStage("ended"); }

  const fmt = (n) => String(Math.floor(n / 60)).padStart(2, "0") + ":" + String(n % 60).padStart(2, "0");

  if (stage === "ended") {
    return <Saved title="Broadcast ended" msg={`You were on air for ${fmt(secs)}. ${autodj ? "Auto-DJ has resumed the stream." : "The stream is now silent."}`} onClose={onClose} />;
  }

  if (stage === "live") {
    const bars = 28;
    return (
      <Shell eyebrow="Broadcast" title="You're on air" onClose={endBroadcast}
        foot={<><button className="btn ghost" onClick={toggleMute}><AdminIcon.mic /> {muted ? "Unmute" : "Mute"}</button><button className="btn" style={{ background: "var(--live)", color: "#fff", marginLeft: "auto" }} onClick={endBroadcast}><AdminIcon.x /> End broadcast</button></>}>
        <div className="broadcast-live">
          <div className="bl-top">
            <span className="chip live"><span className="lvdot" /> LIVE</span>
            <span className="bl-timer">{fmt(secs)}</span>
            <span className="bl-listeners"><AdminIcon.chart style={{ width: 14, height: 14 }} /> {s.listeners.toLocaleString()} listening</span>
          </div>
          <div className={"bl-meter" + (muted ? " muted" : "")}>
            {Array.from({ length: bars }).map((_, i) => {
              const on = level * bars > i;
              const hot = i > bars * 0.8;
              return <span key={i} className={"mbar" + (on ? " on" : "") + (hot ? " hot" : "")} style={{ height: (28 + (i / bars) * 72) + "%" }} />;
            })}
          </div>
          <p className="bl-help">{muted ? "You're muted — listeners hear silence (or Auto-DJ)." : "Speak into your mic — you're streaming to all listeners."}</p>
        </div>
      </Shell>
    );
  }

  // setup
  return (
    <Shell eyebrow="Broadcast" title="Go live from your browser" sub="Broadcast straight from this page — no extra software." onClose={onClose}
      foot={<><button className="btn ghost" onClick={onClose}>Cancel</button><button className="btn primary" onClick={startBroadcast}><AdminIcon.mic /> Start broadcasting</button></>}>
      <MField label="Select your microphone">
        <div className="mic-picker">
          <button type="button" className={"mic-opt" + (deviceId === "" ? " sel" : "")} onClick={() => setDeviceId("")}>
            <span className="mic-ic"><AdminIcon.mic /></span>
            <div className="mic-t"><b>Default microphone</b><span>System default input</span></div>
            <span className="mic-check">{deviceId === "" && <AdminIcon.check />}</span>
          </button>
          {devices.map((d, i) => (
            <button type="button" className={"mic-opt" + (deviceId === d.deviceId ? " sel" : "")} key={d.deviceId || i} onClick={() => setDeviceId(d.deviceId)}>
              <span className="mic-ic"><AdminIcon.mic /></span>
              <div className="mic-t"><b>{d.label || ("Microphone " + (i + 1))}</b><span>Audio input</span></div>
              <span className="mic-check">{deviceId === d.deviceId && <AdminIcon.check />}</span>
            </button>
          ))}
        </div>
      </MField>
      <div className="mrow" style={{ borderTop: "none", marginTop: 0 }}>
        <div><b>Auto-DJ fallback</b><span>Resume automation when you stop</span></div>
        <Switch on={autodj} onClick={() => setAutodj(!autodj)} />
      </div>
      {err && <p className="bl-err">{err}</p>}
      <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 12 }}>
        Clicking <b style={{ color: "var(--ink)" }}>Start broadcasting</b> asks for microphone access, then puts you on air live. Prefer external software? Use the stream key on a presenter's <b style={{ color: "var(--ink)" }}>Manage</b> page.
      </p>
    </Shell>
  );
}

/* ---- series detail (manage a podcast series + its episodes) ---- */
function SeriesDetail({ data, onClose }) {
  const p = data || {};
  // pull a matching episode list from the listener data if present, else synthesize
  const listenerSeries = (window.HFR && window.HFR.podcasts || []).find(x => x.title === p.title);
  const baseEps = listenerSeries ? listenerSeries.episodes : [];
  const [eps, setEps] = useState(baseEps);
  function publish(series) { /* demo */ onClose(); }
  return (
    <Shell eyebrow="On demand · series" title={p.title || "Series"} sub={`${p.episodes || eps.length} episodes · ${((p.subs||0)/1000).toFixed(1)}k subscribers`} onClose={onClose}
      foot={<><button className="btn ghost" onClick={onClose}>Close</button><button className="btn primary"><AdminIcon.upload /> New episode</button></>}>
      <div className="modal-avatar">
        <Cover hue={p.hue} glyph={initials(p.title || "")} style={{ width: 60, height: 60, borderRadius: 14 }} />
        <div>
          <span style={{ display: "block", fontSize: 15, fontWeight: 600 }}>{listenerSeries ? listenerSeries.host : "Series host"}</span>
          <span style={{ color: "var(--muted)", fontSize: 13 }}>Host · {p.kind || "Podcast"}</span>
        </div>
        <span className="chip green" style={{ marginLeft: "auto" }}>Published</span>
      </div>
      <div className="detail-stats">
        <div className="detail-stat"><div className="n">{p.episodes || eps.length}</div><div className="l">Episodes</div></div>
        <div className="detail-stat"><div className="n">{((p.subs||0)/1000).toFixed(1)}k</div><div className="l">Subscribers</div></div>
        <div className="detail-stat"><div className="n">{p.lastPublished || "—"}</div><div className="l">Last published</div></div>
      </div>
      <div style={{ fontFamily: "var(--ff-mono)", fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--faint)", margin: "6px 0 4px" }}>Episodes</div>
      {eps.length ? eps.map(e => (
        <div className="ep-line" key={e.id}>
          <button className="ep-play-sm" aria-label="Play"><AdminIcon.play style={{ width: 13, height: 13 }} /></button>
          <div style={{ minWidth: 0, flex: 1 }}>
            <b>{e.title}</b>
            <span>EP {e.n} · {e.date}</span>
          </div>
          <span className="ep-dur-sm">{e.dur}</span>
          <button className="ep-dots" aria-label="More"><AdminIcon.dots style={{ width: 15, height: 15 }} /></button>
        </div>
      )) : (
        <p style={{ color: "var(--muted)", fontSize: 13, padding: "10px 0" }}>No episodes yet. Add your first to publish it.</p>
      )}
    </Shell>
  );
}

function StudioModal({ modal, onClose }) {
  if (!modal) return null;
  const { type, data } = modal;
  let body;
  if (type === "new-series") body = <SeriesForm data={data} onClose={onClose} />;
  else if (type === "add-presenter") body = <PresenterForm onClose={onClose} />;
  else if (type === "presenter") body = <PresenterDetail data={data} onClose={onClose} />;
  else if (type === "add-event") body = <EventForm data={data} onClose={onClose} />;
  else if (type === "edit-event") body = <EventForm data={data} onClose={onClose} />;
  else if (type === "new-playlist") body = <PlaylistForm onClose={onClose} />;
  else if (type === "upload") body = <UploadForm onClose={onClose} />;
  else if (type === "go-live") body = <GoLiveForm onClose={onClose} />;
  else if (type === "podcast-series") body = <SeriesDetail data={data} onClose={onClose} />;
  else if (type === "playlist") body = <PlaylistDetail data={data} onClose={onClose} />;
  else body = null;
  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>{body}</div>
    </div>
  );
}

function PlaylistDetail({ data, onClose }) {
  const p = data || {};
  const TRACK_NAMES = ["Antara (Live take)", "Breath of the Hills", "Reflection No. 4", "Stillwater", "Morning Raag", "Open Sky", "Inner Light", "Slow Dawn", "Quiet Ensemble", "First Sit", "Evening Calm", "Threshold"];
  const ARTISTS = ["Nila Sharma", "Tenzin & Co.", "Arjun Mehta", "Marek Olsson", "Kavya Iyer", "The Quiet Ensemble"];
  const n = Math.min(8, p.tracks || 8);
  const tracks = Array.from({ length: n }).map((_, i) => ({ id: i, title: TRACK_NAMES[i % TRACK_NAMES.length], artist: ARTISTS[i % ARTISTS.length], dur: `${3 + (i % 6)}:${String((i * 13) % 60).padStart(2, "0")}` }));
  return (
    <Shell eyebrow="Programming · playlist" title={p.name || "Playlist"} sub={`${p.type} · ${p.tracks} tracks · ${p.schedule}`} onClose={onClose}
      foot={<><button className="btn ghost" onClick={onClose}>Close</button><button className="btn primary"><AdminIcon.plus /> Add tracks</button></>}>
      <div className="modal-avatar">
        <Cover hue={p.hue} glyph={initials(p.name || "")} style={{ width: 60, height: 60, borderRadius: 14 }} />
        <div>
          <span style={{ display: "block", fontSize: 15, fontWeight: 600 }}>{p.name}</span>
          <span style={{ color: "var(--muted)", fontSize: 13 }}>{p.schedule}</span>
        </div>
        <span className={"chip " + (p.enabled ? "green" : "")} style={{ marginLeft: "auto" }}>{p.enabled ? "Active" : "Paused"}</span>
      </div>
      <div className="detail-stats">
        <div className="detail-stat"><div className="n">{p.tracks}</div><div className="l">Tracks</div></div>
        <div className="detail-stat"><div className="n">{p.weight}/5</div><div className="l">Weight</div></div>
        <div className="detail-stat"><div className="n">{p.type}</div><div className="l">Rotation</div></div>
      </div>
      <div style={{ fontFamily: "var(--ff-mono)", fontSize: 10.5, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--faint)", margin: "6px 0 4px" }}>Tracks</div>
      {tracks.map((t, i) => (
        <div className="ep-line" key={t.id}>
          <span style={{ fontFamily: "var(--ff-mono)", fontSize: 13, color: "var(--faint)", width: 22, textAlign: "center", flex: "none" }}>{i + 1}</span>
          <button className="ep-play-sm" aria-label="Play"><AdminIcon.play style={{ width: 13, height: 13 }} /></button>
          <div style={{ minWidth: 0, flex: 1 }}>
            <b>{t.title}</b>
            <span>{t.artist}</span>
          </div>
          <span className="ep-dur-sm">{t.dur}</span>
          <button className="ep-dots" aria-label="More"><AdminIcon.dots style={{ width: 15, height: 15 }} /></button>
        </div>
      ))}
    </Shell>
  );
}

Object.assign(window, { StudioModal });
/* Heartfulness Radio — IMMERSIVE ("Aurora") listener app */

const IMM_CONFIG = {
  // Fill to go live (same as the classic player):
  // streamUrl:     "https://radio.hfnradio2.live/listen/STATION/radio.mp3"
  // nowPlayingApi: "https://radio.hfnradio2.live/api/nowplaying/STATION"
  streamUrl: "",
  nowPlayingApi: "",
  pollSeconds: 15,
};

const IMM_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mood": "nightfall",
  "motion": true
}/*EDITMODE-END*/;

const IMM_NAV = [
  { id: "now", label: "Now" },
  { id: "sounds", label: "Sounds" },
  { id: "podcasts", label: "Podcasts" },
];

function Aurora({ playing }) {
  return (
    <div className={"aurora" + (playing ? " live" : "")}>
      <div className="blob b1" /><div className="blob b2" /><div className="blob b3" /><div className="blob b4" />
    </div>
  );
}

/* smooth symmetric waveform — tapered envelope, gentle travelling flow */
function WaveViz({ n = 56, className, playing }) {
  const bars = [];
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const env = Math.sin(Math.PI * t);                 // 0 at edges, 1 in middle
    const micro = 0.62 + 0.38 * Math.sin(i * 0.7 + 1.3); // smooth ripple
    const h = Math.max(0.14, Math.min(1, 0.16 + 0.84 * env * micro));
    bars.push(h);
  }
  // travelling phase so the flow moves outward from the centre
  return (
    <div className={className + (playing ? " playing" : "")}>
      {bars.map((h, i) => (
        <i key={i} style={{ height: (h * 100) + "%", animationDelay: (Math.abs(i - n / 2) * 0.035) + "s" }} />
      ))}
    </div>
  );
}

/* ---------- NOW (hero) ---------- */
function parseDur(s) { if (!s) return 600; const p = String(s).split(":").map(Number); return p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : p[0] * 60 + (p[1] || 0); }
function fmtTime(t) { t = Math.max(0, Math.floor(t)); const m = Math.floor(t / 60), s = t % 60; return m + ":" + String(s).padStart(2, "0"); }
function WaveformSeek({ pos, dur, onSeek }) {
  const frac = dur ? Math.min(1, Math.max(0, pos / dur)) : 0;
  function onDown(e) {
    const el = e.currentTarget;
    const apply = (x) => { const r = el.getBoundingClientRect(); onSeek(Math.min(1, Math.max(0, (x - r.left) / r.width))); };
    apply(e.clientX);
    const move = (ev) => apply(ev.clientX);
    const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", move); window.addEventListener("pointerup", up);
  }
  return (
    <div className="wseek">
      <div className="wseek-bar" onPointerDown={onDown}>
        <div className="sb-track"><div className="sb-fill" style={{ width: (frac * 100) + "%" }} /></div>
        <div className="wseek-knob" style={{ left: (frac * 100) + "%" }} />
      </div>
      <div className="wseek-times"><span>{fmtTime(pos)}</span><span>{fmtTime(dur)}</span></div>
    </div>
  );
}

function ShareControl({ title }) {
  const [copied, setCopied] = useState(false);
  const url = (typeof window !== "undefined" ? window.location.href : "");
  const msg = "Listening to “" + title + "” on Heartfulness Radio";
  function onShare() {
    if (navigator.share) { navigator.share({ title: "Heartfulness Radio", text: msg, url }).catch(() => {}); return; }
    const text = msg + " — " + url;
    if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
    else { const t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); } catch (_) {} document.body.removeChild(t); }
    setCopied(true); setTimeout(() => setCopied(false), 1400);
  }
  return (
    <div className="share-ctl">
      <button aria-label="Share" onClick={onShare}><Icon.share /></button>
      {copied && <span className="share-tip">Link copied</span>}
    </div>
  );
}

function NowView({ show, isLive, playing, onToggle, onReturnLive, listeners, pos, dur, onSeek, onSkip }) {
  return (
    <div className="now">
      <div className="now-head">
        {!isLive && (
          <div className="kicker">
            <span className="on-air ondemand">On demand</span>
            <button className="return-live" onClick={onReturnLive}>Back to live radio</button>
          </div>
        )}
        <div className="tag">{isLive ? `${show.kind} · ${show.start}–${show.end}` : "Episode"}</div>
        <h1>{show.title}</h1>
        {isLive && show.tagline && <p className="sub">{show.tagline}</p>}
        <div className="with">with <b>{show.presenter}</b></div>
      </div>

      <div className="orb-wrap">
        <div className={"ring r1" + (playing ? " playing" : "")} />
        <div className={"ring r2" + (playing ? " playing" : "")} />
        <div className={"ring r3" + (playing ? " playing" : "")} />
        <button className={"orb" + (playing ? " playing" : "")} onClick={onToggle} aria-label={playing ? "Pause" : "Play"}>
          {playing ? <Icon.pause className="pause-svg" /> : <Icon.play />}
        </button>
      </div>

      {isLive ? (
        <div className="controls live-ctrl">
          <div className="live-now"><span className="ldot" /> Live · {listeners.toLocaleString()} listening</div>
          <WaveViz n={56} className="wave2" playing={playing} />
        </div>
      ) : (
        <div className="controls rec-ctrl">
          <WaveformSeek pos={pos} dur={dur} onSeek={onSeek} />
        </div>
      )}

      <div className="share2">
        <a aria-label="Share on WhatsApp" href={"https://wa.me/?text=" + encodeURIComponent("Listening to “" + show.title + "” on Heartfulness Radio — " + (typeof window !== "undefined" ? window.location.href : ""))} target="_blank" rel="noopener noreferrer"><Icon.wa /></a>
        <ShareControl title={show.title} />
      </div>
    </div>
  );
}

/* ---------- panels ---------- */
function Panel({ eyebrow, title, children }) {
  return (
    <div className="panel-stage">
      <div className="panel">
        <div className="panel-h"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>
        {children}
      </div>
    </div>
  );
}

function SchedulePanel({ onPlay }) {
  const D = window.HFR;
  const list = D.scheduleForDay(2);
  return (
    <Panel eyebrow="Today · Wednesday" title="Schedule">
      {list.map(s => (
        <div className={"prow" + (s.live ? " live-row" : "")} key={s.id}>
          <Cover hue={s.hue} glyph={initials(s.title)} className="cov" />
          <div className="pinfo">
            <span className="t">{s.title}</span>
            <span className="s">{s.presenter} · {s.tagline}</span>
            {s.live && <span className="nowdot"><span style={{ width: 6, height: 6, borderRadius: 9, background: "var(--live)", display: "inline-block" }} /> On air now</span>}
          </div>
          <span className="meta">{s.start}</span>
        </div>
      ))}
    </Panel>
  );
}

function SoundsPanel() {
  const D = window.HFR;
  return (
    <Panel eyebrow="Recently played" title="Sounds">
      {D.history.map(h => (
        <div className="prow" key={h.id}>
          <Cover hue={h.hue} glyph={<Icon.heart style={{ width: 17, height: 17 }} />} className="cov" />
          <div className="pinfo">
            <span className="t">{h.title}</span>
            <span className="s">{h.artist}</span>
          </div>
          <span className="meta">{h.at} · {h.dur}</span>
        </div>
      ))}
    </Panel>
  );
}

function PodcastsPanel({ onPlay }) {
  const D = window.HFR;
  return (
    <Panel eyebrow="On demand" title="Podcasts">
      {D.podcasts.map(p => (
        <div className="series" key={p.id}>
          <div className="series-h">
            <Cover hue={p.hue} glyph={initials(p.title)} className="cov" />
            <div><b>{p.title}</b><span>{p.host}</span></div>
          </div>
          {p.episodes.map(e => (
            <div className="prow" key={e.id}>
              <button className="pbtn" onClick={() => onPlay(p, e)} aria-label="Play"><Icon.play /></button>
              <div className="pinfo">
                <span className="t">{e.title}</span>
                <span className="s">EP {e.n} · {e.desc}</span>
              </div>
              <span className="meta">{e.dur}</span>
            </div>
          ))}
        </div>
      ))}
    </Panel>
  );
}

function RequestPanel() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ track: "", name: "", note: "" });
  const ok = form.track.trim().length > 1;
  return (
    <Panel eyebrow="Be on air" title="Request a track">
      {sent ? (
        <div className="sent2">
          <div className="c"><Icon.check style={{ width: 26, height: 26 }} /></div>
          <h3>Your request is in</h3>
          <p>We've added “{form.track}” to the queue.</p>
          <button className="submit2" style={{ width: "auto", padding: "12px 22px", marginTop: 18 }} onClick={() => { setSent(false); setForm({ track: "", name: "", note: "" }); }}>Request another</button>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); if (ok) setSent(true); }}>
          <div className="field2"><label>Track or piece</label><input value={form.track} onChange={e => setForm({ ...form, track: e.target.value })} placeholder="e.g. Morning Raag" /></div>
          <div className="field2"><label>Your name</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="How should we read it out?" /></div>
          <div className="field2"><label>Dedication</label><textarea value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} placeholder="A few words to share on air…" /></div>
          <button className="submit2" type="submit" disabled={!ok}>Send request</button>
        </form>
      )}
    </Panel>
  );
}

/* ---------- now-screen side rails (fill the empty flanks on wide screens) ---------- */
const NS_REFLECTIONS = [
  { q: "Let the breath arrive before the thought.", who: "Today's reflection" },
  { q: "Stillness, too, is a kind of sound.", who: "Today's reflection" },
  { q: "The heart keeps its own gentle time.", who: "Today's reflection" },
  { q: "Listen until the noise becomes quiet.", who: "Today's reflection" },
];
function NowSides({ hidden, onPlayShow }) {
  const D = window.HFR;
  const upnext = D.shows.filter(s => !s.live).slice(0, 6);
  const [ri, setRi] = useState(0);
  const [q, setQ] = useState(0);
  useEffect(() => { const id = setInterval(() => setRi(i => (i + 1) % NS_REFLECTIONS.length), 11000); return () => clearInterval(id); }, []);
  const r = NS_REFLECTIONS[ri];
  const hc = hidden ? " nside-hide" : "";
  const maxQ = upnext.length - 1;
  const accRef = useRef(0);
  const arcRef = useRef(null);
  useEffect(() => {
    const el = arcRef.current; if (!el) return;
    const handler = (e) => {
      e.preventDefault();
      accRef.current += e.deltaY;
      const TH = 180;
      if (Math.abs(accRef.current) >= TH) { const dir = accRef.current > 0 ? 1 : -1; accRef.current = 0; setQ(v => Math.max(0, Math.min(maxQ, v + dir))); }
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [maxQ]);
  return (
    <React.Fragment>
      <aside className={"nside nside-l" + hc}>
        <div className="ns-eyebrow">Up next · Queue</div>
        <div className="upnext-arc" ref={arcRef}>
          {upnext.map((s, i) => {
            const d = i - q;
            const ang = d * 0.5;
            const R = 174;
            const x = (1 - Math.cos(ang)) * R;
            const y = Math.sin(ang) * R;
            const scale = Math.max(0.62, Math.cos(ang));
            const opacity = Math.max(0, Math.cos(ang) * 1.1);
            return (
              <button className={"ua-row" + (i === q ? " focus" : "")} key={s.id}
                style={{ transform: `translate(${x}px, ${y}px) scale(${scale})`, opacity, zIndex: 20 - Math.abs(Math.round(d)), pointerEvents: opacity < 0.12 ? "none" : "auto" }}
                onClick={() => (i === q ? onPlayShow(s) : setQ(i))}>
                <span className="ns-time">{s.start}</span>
                <div className="ns-m"><b>{s.title}</b><span>{s.presenter}</span></div>
              </button>
            );
          })}
          <button className="ua-nav up" onClick={() => setQ(v => Math.max(0, v - 1))} disabled={q === 0} aria-label="Previous in queue"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 15l6-6 6 6" /></svg></button>
          <button className="ua-nav down" onClick={() => setQ(v => Math.min(maxQ, v + 1))} disabled={q === maxQ} aria-label="Next in queue"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg></button>
        </div>
      </aside>
      <aside className={"nside nside-r" + hc}>
        <div className="ns-eyebrow">A thought to sit with</div>
        <p className="ns-quote" key={ri}>{r.q}</p>
        <span className="ns-who">{r.who}</span>
      </aside>
    </React.Fragment>
  );
}

/* ---------- now-screen bottom rail: Continue / Sounds / Podcasts ---------- */
function Rail({ expanded, children }) {
  const ref = useRef(null);
  const by = (d) => {
    const el = ref.current; if (!el) return;
    const amount = d * Math.max(280, el.clientWidth * 0.8);
    const start = el.scrollLeft, target = start + amount, t0 = performance.now(), dur = 360;
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      el.scrollLeft = start + (target - start) * (1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  return (
    <div className={"crail-wrap" + (expanded ? " expanded" : "")}>
      <button className="crail-arrow l" onClick={() => by(-1)} aria-label="Scroll left"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg></button>
      <div className={"crail" + (expanded ? " expanded" : "")} ref={ref}>{children}</div>
      <button className="crail-arrow r" onClick={() => by(1)} aria-label="Scroll right"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg></button>
    </div>
  );
}

function ContinueRail({ onPlayHistory }) {
  const D = window.HFR;
  const [exp, setExp] = useState(false);
  const src = exp ? D.history : D.history.slice(0, 5);
  const items = src.map((h, i) => ({ key: "c" + h.id, title: h.title, sub: h.artist, hue: h.hue, prog: Math.max(8, 74 - i * 14), onClick: () => onPlayHistory(h) }));
  return (
    <div className="now-foot">
      <div className="rail-head">
        <div className="crail-label">Continue listening</div>
        <button className="see-all" onClick={() => setExp(!exp)}>{exp ? "Show less" : "See all"}</button>
      </div>
      <Rail expanded={exp}>
        {items.map(it => (
          <button className="ccard" key={it.key} onClick={it.onClick}>
            <Cover hue={it.hue} glyph={initials(it.title)} className="cov" />
            <div className="ci">
              <b>{it.title}</b>
              <span>{it.sub}</span>
              {it.prog != null && <div className="prog"><i style={{ width: it.prog + "%" }} /></div>}
            </div>
          </button>
        ))}
      </Rail>
    </div>
  );
}

/* ---------- page sections (Sounds · Podcasts) ---------- */
function SectionHead({ eyebrow, title, note }) {
  return (
    <div className="sec-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {note && <p className="sec-note">{note}</p>}
    </div>
  );
}

function TrendingSection({ onPlayEpisode }) {
  const D = window.HFR;
  const eps = [];
  D.podcasts.forEach(p => p.episodes.forEach(e => eps.push({ p, e })));
  const plays = ["4.2k", "3.6k", "3.1k", "2.4k", "1.9k", "1.5k"];
  const trend = eps.slice(0, 6).map((x, i) => ({ key: "tr" + x.p.id + "-" + x.e.id, rank: i + 1, title: x.e.title, sub: x.p.host, hue: x.p.hue, plays: plays[i], onClick: () => onPlayEpisode(x.p, x.e) }));
  return (
    <div className="now-foot rail-block" id="trending">
      <div className="rail-head"><div className="crail-label">Trending</div></div>
      <Rail>
        {trend.map(t => (
          <button className="ccard trend-card" key={t.key} onClick={t.onClick}>
            <span className="trend-rank">{t.rank}</span>
            <Cover hue={t.hue} glyph={initials(t.sub)} className="cov" />
            <div className="ci"><b>{t.title}</b><span className="trend-stat"><svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" className="trend-up"><path d="M12 6l7 10H5z" /></svg> {t.plays} this week</span></div>
          </button>
        ))}
      </Rail>
    </div>
  );
}

function SoundsSection({ onPlayHistory, onSeeAll }) {
  const D = window.HFR;
  return (
    <div className="now-foot rail-block" id="sounds">
      <div className="rail-head">
        <div className="crail-label">Sounds</div>
        <button className="see-all" onClick={onSeeAll}>See all</button>
      </div>
      <Rail>
        {D.history.map(h => (
          <button className="ccard" key={h.id} onClick={() => onPlayHistory(h)}>
            <Cover hue={h.hue} glyph={initials(h.title)} className="cov" />
            <div className="ci"><b>{h.title}</b><span>{h.artist}</span></div>
          </button>
        ))}
      </Rail>
    </div>
  );
}

function PodcastsSection({ onOpenArtist, onSeeAll }) {
  const D = window.HFR;
  return (
    <div className="now-foot rail-block" id="podcasts">
      <div className="rail-head">
        <div className="crail-label">Podcasts</div>
        <button className="see-all" onClick={onSeeAll}>See all</button>
      </div>
      <Rail>
        {D.podcasts.map(p => (
          <button className="artist-card" key={p.id} onClick={() => onOpenArtist(p.id)}>
            <Cover hue={p.hue} glyph={initials(p.host)} className="artist-photo sm" />
            <div className="ci"><b>{p.host}</b><span>{p.episodes.length} episodes</span></div>
          </button>
        ))}
      </Rail>
    </div>
  );
}

/* ---------- full pages (Sounds · Podcasts) ---------- */
function MediaPage({ title, eyebrow, cards, onBack }) {
  return (
    <div className="media-page">
      <button className="mp-back" onClick={onBack}><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg> Back</button>
      <div className="mp-head"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1></div>
      <div className="mp-list">
        {cards.map(c => (
          <button className="mp-row" key={c.key} onClick={c.onClick}>
            <Cover hue={c.hue} glyph={c.glyph} className="mp-cov" />
            <div className="mp-m"><b>{c.title}</b><span>{c.sub}</span></div>
            <span className="mp-play"><Icon.play /></span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- mini dock ---------- */
function PodcastsPage({ onBack, onPlayEpisode, initial }) {
  const D = window.HFR;
  const [sel, setSel] = useState(initial || null);
  const cur = sel ? D.podcasts.find(s => s.id === sel) : null;
  const trend = [];
  D.podcasts.forEach(p => p.episodes.forEach(e => trend.push({ p, e })));
  const tplays = ["4.2k", "3.6k", "3.1k", "2.4k", "1.9k"];
  const top = trend.slice(0, 5);
  return (
    <div className="media-page">
      <button className="mp-back" onClick={onBack}><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg> Back</button>
      <div className="mp-head"><span className="eyebrow">On demand · Artists</span><h1>Podcasts</h1></div>
      {!cur ? (
        <React.Fragment>
          <div className="pod-sub">Trending this week</div>
          <div className="trend-list">
            {top.map((x, i) => (
              <button className="trend-row" key={"t" + x.p.id + x.e.id} onClick={() => onPlayEpisode(x.p, x.e)}>
                <span className="trend-rank2">{i + 1}</span>
                <Cover hue={x.p.hue} glyph={initials(x.p.host)} className="tr-cov" />
                <div className="tr-m"><b>{x.e.title}</b><span>{x.p.host} · {x.p.title}</span></div>
                <span className="tr-plays"><svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor"><path d="M12 6l7 10H5z" /></svg> {tplays[i]}</span>
              </button>
            ))}
          </div>
          <div className="pod-sub" style={{ marginTop: 38 }}>All artists</div>
          <div className="artist-grid">
            {D.podcasts.map(p => (
              <button className="artist-tile" key={p.id} onClick={() => setSel(p.id)}>
                <Cover hue={p.hue} glyph={initials(p.host)} className="artist-photo" />
                <b>{p.host}</b>
                <span>{p.episodes.length} episodes</span>
              </button>
            ))}
          </div>
        </React.Fragment>
      ) : (
        <div className="pod-detail" key={cur.id}>
          <div className="pod-artist">
            <button className="pod-allback" onClick={() => setSel(null)}>‹ All artists</button>
            <Cover hue={cur.hue} glyph={initials(cur.host)} className="artist-photo lg" />
            <b>{cur.host}</b>
            <span>{cur.title}</span>
            <em>{cur.episodes.length} episodes</em>
          </div>
          <div className="pod-songs">
            {cur.episodes.map(e => (
              <button className="pod-ep" key={e.id} onClick={() => onPlayEpisode(cur, e)}>
                <span className="pe-play"><Icon.play /></span>
                <div className="pe-m"><b>{e.title}</b><span>EP {e.n} · {e.desc}</span></div>
                <span className="pe-dur">{e.dur}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
function MiniDock({ show, playing, onToggle }) {
  return (
    <div className="mini">
      <Cover hue={show.hue} glyph={initials(show.title)} className="cov" />
      <div className="info"><b>{show.title}</b><span>{show.isLive === false ? "On demand" : "On air · " + show.presenter}</span></div>
      <button className="mplay" onClick={onToggle} aria-label={playing ? "Pause" : "Play"}>{playing ? <Icon.pause /> : <Icon.play />}</button>
      <WaveViz n={30} className="mwave" playing={playing} />
      <div className="spacer" />
    </div>
  );
}

/* ---------- app ---------- */
function Immersive() {
  const [t, setTweak] = useTweaks(IMM_DEFAULTS);
  const [view, setView] = useState("now");
  const [railTab, setRailTab] = useState("continue");
  const [playing, setPlaying] = useState(false);
  const [vol, setVol] = useState(72);
  const [onDemand, setOnDemand] = useState(null);
  const [liveData, setLiveData] = useState(null);
  const [listeners, setListeners] = useState(1284);
  const [clock, setClock] = useState("");
  const [activeSec, setActiveSec] = useState("now");
  const [pos, setPos] = useState(0);
  const [page, setPage] = useState("home");
  const [podArtist, setPodArtist] = useState(null);
  const [lang, setLang] = useState(() => (window.IMM_I18N && window.IMM_I18N.getLang()) || "en");
  const [langOpen, setLangOpen] = useState(false);
  const [vsOpen, setVsOpen] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => { if (window.IMM_I18N) { window.IMM_I18N.init(); setLang(window.IMM_I18N.getLang()); } }, []);
  useEffect(() => {
    if (!langOpen) return;
    const close = (e) => { if (!e.target.closest(".imm-lang")) setLangOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [langOpen]);

  const D = window.HFR;
  const baseLive = D.shows.find(s => s.live) || D.shows[1];
  const onAir = !!(D.shows.find(s => s.live));
  const liveShow = liveData ? { ...baseLive, title: liveData.title || baseLive.title, tagline: liveData.artist || baseLive.tagline, presenter: liveData.presenter || baseLive.presenter, kind: liveData.kind || baseLive.kind } : baseLive;
  const listenersNow = (liveData && liveData.listeners != null) ? liveData.listeners : listeners;
  const dockShow = onDemand ? onDemand : { ...liveShow, isLive: true };
  const hue = onDemand ? onDemand.hue : liveShow.hue;
  const dur = onDemand ? parseDur(onDemand.dur) : 0;

  useEffect(() => {
    const r = document.documentElement;
    r.dataset.mood = t.mood;
    r.dataset.motion = t.motion ? "on" : "off";
  }, [t.mood, t.motion]);

  useEffect(() => {
    const a = audioRef.current; if (!a) return;
    a.volume = vol / 100;
    if (onDemand) { a.pause(); return; }
    if (IMM_CONFIG.streamUrl && a.getAttribute("data-src") !== IMM_CONFIG.streamUrl) { a.src = IMM_CONFIG.streamUrl; a.setAttribute("data-src", IMM_CONFIG.streamUrl); }
    if (playing && IMM_CONFIG.streamUrl) { a.play().catch(() => {}); } else { a.pause(); }
  }, [playing, vol, onDemand]);

  useEffect(() => {
    if (!IMM_CONFIG.nowPlayingApi) return;
    let alive = true;
    const load = () => fetch(IMM_CONFIG.nowPlayingApi).then(r => r.json()).then(d => {
      if (!alive || !d) return;
      const data = Array.isArray(d) ? d[0] : d; const np = data && data.now_playing; if (!np) return;
      setLiveData({ title: np.song && np.song.title, artist: np.song && np.song.artist, presenter: (data.live && data.live.is_live && data.live.streamer_name) || (data.station && data.station.name) || "Heartfulness Radio", listeners: data.listeners && data.listeners.current, kind: (data.live && data.live.is_live) ? "Live" : "On Air" });
    }).catch(() => {});
    load(); const id = setInterval(load, (IMM_CONFIG.pollSeconds || 15) * 1000);
    return () => { alive = false; clearInterval(id); };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setListeners(n => Math.max(1180, Math.min(1460, n + Math.round((Math.random() - .5) * 12)))), 3400);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    tick(); const id = setInterval(tick, 30000); return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.4;
      const s = document.getElementById("sounds"), p = document.getElementById("podcasts");
      let cur = "now";
      if (s && s.getBoundingClientRect().top <= mid) cur = "sounds";
      if (p && p.getBoundingClientRect().top <= mid) cur = "podcasts";
      setActiveSec(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setPos(0); }, [onDemand]);
  useEffect(() => {
    if (!onDemand || !playing) return;
    const id = setInterval(() => setPos(p => (p + 1 >= dur ? dur : p + 1)), 1000);
    return () => clearInterval(id);
  }, [onDemand, playing, dur]);

  function heroToggle() { if (onDemand) { setOnDemand(null); setPlaying(true); } else { setPlaying(p => !p); } }
  function goLive() { setOnDemand(null); setPlaying(true); setPage("home"); try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (_) { window.scrollTo(0, 0); } }
  function goPage(p) { setPage(p); try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (_) { window.scrollTo(0, 0); } }
  function scrollToSec(id) {
    if (id === "now") { try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (_) { window.scrollTo(0, 0); } return; }
    const el = document.getElementById(id);
    if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 70; try { window.scrollTo({ top, behavior: "smooth" }); } catch (_) { window.scrollTo(0, top); } }
  }
  function playEpisode(series, ep) { setOnDemand({ title: ep.title, presenter: series.host, hue: series.hue, isLive: false, dur: ep.dur }); setPlaying(true); setPage("home"); }
  function playHistory(h) { setOnDemand({ title: h.title, presenter: h.artist, hue: h.hue, isLive: false, dur: h.dur }); setPlaying(true); setPage("home"); }
  function playShow(s) { setOnDemand({ title: s.title, presenter: s.presenter, hue: s.hue, isLive: false, dur: "28:00" }); setPlaying(true); setPage("home"); }
  function seekTo(frac) { setPos(Math.max(0, Math.min(1, frac)) * dur); }
  function skip(delta) { setPos(p => Math.max(0, Math.min(dur, p + delta))); }

  // mouse-reactive background parallax (DOM-direct, no re-render)
  const rafRef = useRef(0);
  function onMove(e) {
    const px = (e.clientX / window.innerWidth - 0.5);
    const py = (e.clientY / window.innerHeight - 0.5);
    const el = e.currentTarget;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      if (el) { el.style.setProperty("--px", px.toFixed(3)); el.style.setProperty("--py", py.toFixed(3)); }
    });
  }

  return (
    <div className="stage" style={{ "--h": hue }} onMouseMove={t.motion ? onMove : undefined}>
      <Aurora playing={playing} />
      <div className="scrim" />
      <div className="grain" />

      <div className="fg">
        <div className="top">
          <div className="brand">
            <BrandMark className="mark" />
            <div><b>Heartfulness Radio</b><span>Live · Always on</span></div>
          </div>
          <nav className="tabs">
            <button className={page === "home" ? "on" : ""} onClick={() => goPage("home")}>Now</button>
            <button className={page === "sounds" ? "on" : ""} onClick={() => goPage("sounds")}>Sounds</button>
            <button className={page === "podcasts" ? "on" : ""} onClick={() => { setPodArtist(null); goPage("podcasts"); }}>Podcasts</button>
          </nav>
          <div className={"top-right" + (vsOpen ? " vs-open" : "")}>
            {onAir && <button className="live-tab" onClick={goLive} aria-label="Go to live broadcast"><span className="dot" /> Live <span className="lt-count">{listenersNow.toLocaleString()}</span></button>}
            <div className="imm-lang" data-no-i18n>
              <button className="imm-lang-btn" onClick={() => setLangOpen(o => !o)} aria-label="Language">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18"/></svg>
              </button>
              {langOpen && (
                <div className="imm-lang-menu">
                  {window.IMM_I18N.LANGS.map(l => (
                    <button key={l.code} className={"imm-lang-opt" + (l.code === lang ? " on" : "")} onClick={() => { window.IMM_I18N.setLang(l.code); setLang(l.code); setLangOpen(false); }}>{l.label}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {page === "home" && (
          <React.Fragment>
            <section className="hero-sec">
              <NowSides hidden={playing && !onDemand} onPlayShow={playShow} />
              <div className="hero-center">
                <NowView show={onDemand ? { ...onDemand, kind: "On demand" } : liveShow} isLive={!onDemand} playing={playing} onToggle={() => setPlaying(p => !p)} onReturnLive={() => { setOnDemand(null); setPlaying(true); }} listeners={listenersNow} pos={pos} dur={dur} onSeek={seekTo} onSkip={skip} />
              </div>
              <ContinueRail onPlayHistory={playHistory} />
            </section>

            <TrendingSection onPlayEpisode={playEpisode} />
            <SoundsSection onPlayHistory={playHistory} onSeeAll={() => goPage("sounds")} />
            <PodcastsSection onOpenArtist={(id) => { setPodArtist(id); goPage("podcasts"); }} onSeeAll={() => { setPodArtist(null); goPage("podcasts"); }} />

            <footer className="imm-foot">
              <span>© 2026 Heartfulness Radio · Voices that inspire the heart and mind</span>
            </footer>
          </React.Fragment>
        )}

        {page === "sounds" && <MediaPage title="Sounds" eyebrow="Recently played" cards={D.history.map(h => ({ key: "sp" + h.id, title: h.title, sub: h.artist, hue: h.hue, glyph: initials(h.title), onClick: () => playHistory(h) }))} onBack={() => goPage("home")} />}
        {page === "podcasts" && <PodcastsPage initial={podArtist} onPlayEpisode={playEpisode} onBack={() => goPage("home")} />}
      </div>

      <audio ref={audioRef} preload="none" />
      <ViewSwitch current="listener" align="right" onOpenChange={setVsOpen} />

      <TweaksPanel>
        <TweakSection label="Mood" />
        <TweakRadio label="Atmosphere" value={t.mood} options={["nightfall", "daybreak"]} onChange={(v) => setTweak("mood", v)} />
        <TweakToggle label="Motion & aurora drift" value={t.motion} onChange={(v) => setTweak("motion", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Immersive />);

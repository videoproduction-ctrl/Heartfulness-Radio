/* Heartfulness Radio — Studio (admin) UI primitives, icons, charts (→ window) */

const AdminIcon = {
  grid: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/></svg>,
  media: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 18V6l11-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></svg>,
  playlist: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 6h11M4 12h11M4 18h7"/><circle cx="18" cy="16" r="2.5"/><path d="M20.5 16V9l-2 .6"/></svg>,
  calendar: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3.5" y="5" width="17" height="16" rx="2.5"/><path d="M3.5 9.5h17M8 3.5v3M16 3.5v3"/></svg>,
  mic: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M9 21h6"/></svg>,
  podcast: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="9" r="2.2"/><path d="M7 14.5a7 7 0 1 1 10 0M9.4 17.5a4 4 0 0 1 5.2 0"/><path d="M10.5 21l.6-5h1.8l.6 5a1.5 1.5 0 0 1-1.5 1.6h0A1.5 1.5 0 0 1 10.5 21Z"/></svg>,
  inbox: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3.5 13 6 5.5A2 2 0 0 1 7.9 4h8.2A2 2 0 0 1 18 5.5L20.5 13v5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2Z"/><path d="M3.5 13H8l1.5 2.5h5L16 13h4.5"/></svg>,
  chart: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 4v16h16"/><path d="M7.5 14l3-3.5 3 2.5 4-5"/></svg>,
  settings: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.6-2-3.4-2.3 1a7 7 0 0 0-1.7-1l-.3-2.5h-4l-.3 2.5a7 7 0 0 0-1.7 1l-2.3-1-2 3.4 2 1.6a7 7 0 0 0 0 2l-2 1.6 2 3.4 2.3-1a7 7 0 0 0 1.7 1l.3 2.5h4l.3-2.5a7 7 0 0 0 1.7-1l2.3 1 2-3.4-2-1.6a7 7 0 0 0 .1-1Z"/></svg>,
  logout: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M15 4.5h-9A1.5 1.5 0 0 0 4.5 6v12A1.5 1.5 0 0 0 6 19.5h9"/><path d="M18 8l4 4-4 4M9.5 12H22"/></svg>,
  upload: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15"/><path d="M12 16V4m-4.5 4L12 3.5 16.5 8"/></svg>,
  plus: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" {...p}><path d="M12 5v14M5 12h14"/></svg>,
  chevL: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M15 6l-6 6 6 6"/></svg>,
  cal: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3.5" y="5" width="17" height="16" rx="2.5"/><path d="M3.5 9.5h17M8 3.5v3M16 3.5v3"/></svg>,
  sidebar: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><path d="M9.5 4.5v15"/></svg>,
  chevR: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 6l6 6-6 6"/></svg>,
  search: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>,
  menu: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>,
  ext: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14 4h6v6M20 4l-9 9M18 13v5.5A1.5 1.5 0 0 1 16.5 20h-9A1.5 1.5 0 0 1 6 18.5v-9A1.5 1.5 0 0 1 7.5 8H13"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m5 12.5 4.5 4.5L19 7"/></svg>,
  x: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" {...p}><path d="M6 6l12 12M18 6 6 18"/></svg>,
  play: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5Z"/></svg>,
  dots: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></svg>,
  user: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/></svg>,
  globe: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18"/></svg>,
  skip: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M6 5.5v13a1 1 0 0 0 1.5.85l9-6.5a1 1 0 0 0 0-1.7l-9-6.5A1 1 0 0 0 6 5.5Z"/><rect x="17.4" y="5" width="2.4" height="14" rx="1.2"/></svg>,
  bell: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"/><path d="M10 19a2 2 0 0 0 4 0"/></svg>,
};

function Switch({ on, onClick }) {
  return <button className={"switch" + (on ? " on" : "")} onClick={onClick} aria-pressed={on}><i /></button>;
}

/* Smooth-ish SVG line chart with gradient area fill */
function LineChart({ data, height = 220, labels }) {
  const W = 760, H = height, padX = 26, padY = 24;
  const max = Math.max(...data) * 1.1, min = 0;
  const n = data.length;
  const x = (i) => padX + (i / (n - 1)) * (W - padX * 2);
  const y = (v) => H - padY - ((v - min) / (max - min)) * (H - padY * 2);
  const pts = data.map((v, i) => [x(i), y(v)]);
  const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = line + ` L ${x(n - 1).toFixed(1)} ${H - padY} L ${padX} ${H - padY} Z`;
  const gl = [0, 0.25, 0.5, 0.75, 1].map(f => H - padY - f * (H - padY * 2));
  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <g className="chart-grid">{gl.map((gy, i) => <line key={i} x1={padX} y1={gy} x2={W - padX} y2={gy} />)}</g>
      <path className="chart-area" d={area} />
      <path className="chart-line" d={line} />
      {pts.filter((_, i) => i === n - 1).map((p, i) => <circle key={i} className="chart-dot" cx={p[0]} cy={p[1]} r="4" />)}
      {labels && labels.map((l, i) => (
        <text key={i} className="chart-axis" x={x(i)} y={H - 6} textAnchor="middle">{l}</text>
      ))}
    </svg>
  );
}

function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.v)) * 1.12;
  return (
    <div>
      <div className="bars">
        {data.map((d, i) => (
          <div className="bar" key={i} title={d.v + "k hrs"}>
            <i style={{ height: (d.v / max * 100) + "%" }} />
          </div>
        ))}
      </div>
      <div className="bars-x">{data.map((d, i) => <span key={i}>{d.d}</span>)}</div>
    </div>
  );
}

function CountUp({ to, dur = 1100, decimals = 0, prefix = "", suffix = "" }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const reduce = document.documentElement.dataset.motion === "off" || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    if (reduce) { setV(to); return; }
    let raf, start;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / dur);
      setV(to * ease(p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    const fallback = setTimeout(() => setV(to), dur + 350); /* guarantee final value if rAF stalls */
    return () => { cancelAnimationFrame(raf); clearTimeout(fallback); };
  }, [to]);
  const num = decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString();
  return <React.Fragment>{prefix}{num}{suffix}</React.Fragment>;
}

Object.assign(window, { AdminIcon, Switch, LineChart, BarChart, CountUp });

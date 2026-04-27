// Interactive shell — routing, progress tracking, calculator, quiz state
const { useState, useEffect, useRef, useMemo } = React;

// ---- Persistent progress state ----
function useProgress() {
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(localStorage.getItem('itx-completed') || '[]'); }
    catch { return []; }
  });
  useEffect(() => { localStorage.setItem('itx-completed', JSON.stringify(completed)); }, [completed]);
  const toggle = (n) => setCompleted(c => c.includes(n) ? c.filter(x => x !== n) : [...c, n]);
  const isDone = (n) => completed.includes(n);
  return { completed, toggle, isDone };
}

// ---- Router ----
function useRoute() {
  const [route, setRoute] = useState(() => {
    const h = window.location.hash.slice(1);
    if (h.startsWith('week/')) return { name: 'week', n: h.split('/')[1] };
    if (h === 'curriculum') return { name: 'curriculum' };
    if (h === 'calculator') return { name: 'calculator' };
    if (h === 'about') return { name: 'about' };
    return { name: 'home' };
  });
  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.slice(1);
      if (h.startsWith('week/')) setRoute({ name: 'week', n: h.split('/')[1] });
      else if (h === 'curriculum') setRoute({ name: 'curriculum' });
      else if (h === 'calculator') setRoute({ name: 'calculator' });
      else if (h === 'about') setRoute({ name: 'about' });
      else setRoute({ name: 'home' });
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const go = (path) => { window.location.hash = path; };
  return { route, go };
}

// ---- Live nav ----
function Nav({ go, route, isMobile, onMenuToggle }) {
  return (
    <header style={{ borderBottom: '1px solid var(--rule)', background: 'var(--paper)', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(8px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '14px 20px' : '18px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a onClick={(e) => { e.preventDefault(); go(''); }} href="#" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'var(--ink)' }}>
          <div style={{ width: isMobile ? 24 : 28, height: isMobile ? 24 : 28, border: '1.5px solid var(--ink)', display: 'grid', placeItems: 'center', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: isMobile ? 15 : 18, lineHeight: 1 }}>τ</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? 14 : 17, letterSpacing: '-0.005em' }}>
            {isMobile ? <>Open Course · <span style={{ fontStyle: 'italic' }}>Irish Tax</span></> : <>The Open Course in <span style={{ fontStyle: 'italic' }}>Irish Taxation</span></>}
          </div>
        </a>
        {!isMobile && (
          <nav style={{ display: 'flex', gap: 32, fontSize: 14, color: 'var(--ink-2)' }}>
            {[{l:'Curriculum',h:'curriculum'},{l:'Calculator',h:'calculator'},{l:'About',h:'about'}].map(item => (
              <a key={item.h} href={`#${item.h}`} onClick={(e)=>{e.preventDefault();go(item.h);}}
                 style={{ cursor: 'pointer', color: route.name === item.h ? 'var(--ink)' : 'var(--ink-2)', textDecoration: route.name === item.h ? 'underline' : 'none', textUnderlineOffset: 6 }}>
                {item.l}
              </a>
            ))}
          </nav>
        )}
        <div style={{ display: 'flex', gap: 8 }}>
          {isMobile ? (
            <button onClick={onMenuToggle} style={{ background: 'transparent', border: 'none', padding: 8, cursor: 'pointer' }}>
              <div style={{ width: 22, height: 14, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ height: 1.5, background: 'var(--ink)' }}></div>
                <div style={{ height: 1.5, background: 'var(--ink)' }}></div>
                <div style={{ height: 1.5, background: 'var(--ink)' }}></div>
              </div>
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => go('week/01')} style={{ padding: '8px 16px', fontSize: 13, borderRadius: 4 }}>Begin Week 01 →</button>
          )}
        </div>
      </div>
    </header>
  );
}

function MobileMenu({ open, onClose, go }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 100 }}>
      <div onClick={e=>e.stopPropagation()} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 280, background: 'var(--paper)', padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 32 }}>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: 24, cursor: 'pointer', color: 'var(--ink)' }}>×</button>
        </div>
        {[{l:'Home',h:''},{l:'Curriculum',h:'curriculum'},{l:'Calculator',h:'calculator'},{l:'About',h:'about'}].map(i => (
          <a key={i.h} href={`#${i.h}`} onClick={(e)=>{e.preventDefault();go(i.h);onClose();}}
             style={{ display: 'block', padding: '14px 0', fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid var(--rule)' }}>
            {i.l}
          </a>
        ))}
        <button className="btn btn-primary" onClick={() => { go('week/01'); onClose(); }} style={{ width: '100%', marginTop: 24, padding: '14px', fontSize: 14, borderRadius: 4 }}>
          Begin Week 01 →
        </button>
      </div>
    </div>
  );
}

// ---- Pages ----
function HomePage({ go, isMobile, progress }) {
  return (
    <div>
      <Hero go={go} isMobile={isMobile} progress={progress} />
      <Marquee />
      <Method isMobile={isMobile} />
      <CurriculumPreview go={go} isMobile={isMobile} progress={progress} />
      <CalculatorPreview go={go} isMobile={isMobile} />
      <Stats isMobile={isMobile} />
      <FAQSection isMobile={isMobile} />
      <FinalCTA go={go} isMobile={isMobile} />
      <Footer isMobile={isMobile} />
    </div>
  );
}

function Hero({ go, isMobile, progress }) {
  const pct = Math.round((progress.completed.length / 12) * 100);
  return (
    <section style={{ borderBottom: '1px solid var(--rule)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '36px 20px 44px' : '80px 40px 88px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.35fr 1fr', gap: isMobile ? 32 : 72, alignItems: 'start' }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: isMobile ? 20 : 24, fontSize: isMobile ? 10 : 11 }}>FREE · SELF-PACED · 12 WEEKS · UPDATED FOR FA 2025</div>
          <h1 style={{ fontSize: isMobile ? 44 : 80, lineHeight: 0.98, margin: 0, letterSpacing: '-0.025em', fontWeight: 400 }}>
            Learn the entire Irish tax code, <span style={{ fontStyle: 'italic', color: 'var(--moss-deep)' }}>line by line.</span>
          </h1>
          <p style={{ fontSize: isMobile ? 16 : 19, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 600, marginTop: isMobile ? 20 : 32 }}>
            Twelve weeks. Five tax heads. One spreadsheet at a time. Built entirely on Revenue's own guidance and the Irish Statute Book — so you learn from the source, not a paraphrase.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: isMobile ? 24 : 36, flexDirection: isMobile ? 'column' : 'row' }}>
            <button className="btn btn-primary" onClick={() => go(progress.completed.length > 0 ? `week/${String(progress.completed.length + 1).padStart(2,'0')}` : 'week/01')} style={{ padding: '14px 24px', fontSize: 15, borderRadius: 4 }}>
              {progress.completed.length > 0 ? `Continue — Week ${String(progress.completed.length + 1).padStart(2,'0')} →` : 'Begin Week 01 — free →'}
            </button>
            <button className="btn btn-ghost" onClick={() => go('curriculum')} style={{ padding: '14px 24px', fontSize: 15, borderRadius: 4 }}>Browse the curriculum</button>
          </div>
          {progress.completed.length > 0 && (
            <div style={{ marginTop: 24, padding: 14, background: 'var(--moss-soft)', border: '1px solid oklch(0.85 0.04 145)', borderRadius: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--moss-deep)', letterSpacing: '0.06em', marginBottom: 6 }}>
                <span>YOUR PROGRESS</span><span>{progress.completed.length} / 12 · {pct}%</span>
              </div>
              <div style={{ height: 4, background: 'oklch(0.88 0.03 145)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, background: 'var(--moss-deep)', transition: 'width 0.6s ease' }}></div>
              </div>
            </div>
          )}
          <div style={{ marginTop: isMobile ? 24 : 32, display: 'flex', gap: isMobile ? 16 : 28, fontSize: isMobile ? 10 : 11, color: 'var(--ink-3)', fontFamily: 'var(--mono)', letterSpacing: '0.06em', flexWrap: 'wrap' }}>
            <div>NO SIGN-UP</div><div>NO PAYWALL</div><div>NO CREDENTIAL</div>
          </div>
        </div>
        <HeroLedger isMobile={isMobile} />
      </div>
    </section>
  );
}

function HeroLedger({ isMobile }) {
  return (
    <div>
      <div className="eyebrow" style={{ marginBottom: 12, color: 'var(--moss-deep)', fontSize: isMobile ? 10 : 11 }}>WORKED EXAMPLE · WEEK 06</div>
      <div style={{ border: '1px solid var(--ink)', background: 'var(--paper)', boxShadow: isMobile ? '4px 4px 0 0 var(--moss-soft)' : '8px 8px 0 0 var(--moss-soft)' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--ink)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? 15 : 17 }}>Single PAYE employee, 2026</div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>€52,000</div>
        </div>
        <table className="ledger" style={{ fontSize: isMobile ? 12 : 13 }}>
          <tbody>
            <tr><td>Standard band</td><td className="num" style={{ color: 'var(--ink-3)' }}>€44k × 20%</td><td className="num">€8,800.00</td></tr>
            <tr><td>Higher rate</td><td className="num" style={{ color: 'var(--ink-3)' }}>€8k × 40%</td><td className="num">€3,200.00</td></tr>
            <tr><td>Less: credits</td><td className="num" style={{ color: 'var(--ink-3)' }}>—</td><td className="num">(€4,000.00)</td></tr>
            <tr style={{ background: 'var(--paper-2)' }}><td style={{ fontWeight: 500 }}>Income Tax</td><td></td><td className="num" style={{ fontWeight: 600 }}>€8,000.00</td></tr>
            <tr><td>USC</td><td className="num" style={{ color: 'var(--ink-3)' }}>0.5/2/3%</td><td className="num">€1,092.82</td></tr>
            <tr><td>PRSI Class A</td><td className="num" style={{ color: 'var(--ink-3)' }}>~4.24%</td><td className="num">€2,203.50</td></tr>
            <tr className="total"><td>Total deductions</td><td></td><td className="num">€11,296.32</td></tr>
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 14, fontSize: 12, color: 'var(--ink-3)', fontStyle: 'italic', fontFamily: 'var(--serif)', textAlign: 'center' }}>
        Every figure traceable. Every rule cited.
      </div>
    </div>
  );
}

function Marquee() {
  const items = ["Income Tax", "USC & PRSI", "VAT", "CGT", "Corporation Tax", "CAT", "Pay & File", "Capital Allowances", "BIK", "Group Relief", "DIRT"];
  return (
    <div style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '14px 0', overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: 36, fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.05em', whiteSpace: 'nowrap', animation: 'marq 40s linear infinite' }}>
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            <span>{it}</span><span style={{ color: 'var(--moss)' }}>§</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Method({ isMobile }) {
  const steps = [
    { n: "I", t: "Read the source", b: "Revenue manuals, Citizens Information, the underlying Statute Book section. No paraphrase." },
    { n: "II", t: "Compress to one page", b: "Write the rule in your own words. Cite the section. The act of writing is the lesson." },
    { n: "III", t: "Work the spreadsheet", b: "Every week ends in a real computation: IT, VAT3, CGT, CT, CAT. Trace every figure to a source." },
    { n: "IV", t: "Quiz & log", b: "Six to ten self-marked questions. A short reflection on assumption and source." },
  ];
  return (
    <section style={{ borderBottom: '1px solid var(--rule)', padding: isMobile ? '56px 20px' : '112px 40px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? 24 : 64, marginBottom: isMobile ? 32 : 56 }}>
          <div>
            <div className="section-label">§ 01 — METHOD</div>
            <h2 style={{ fontSize: isMobile ? 34 : 52, lineHeight: 1.02, margin: '14px 0 0', letterSpacing: '-0.02em', fontWeight: 400 }}>
              Four moves,<br/>every week,<br/><span style={{ fontStyle: 'italic' }}>for twelve weeks.</span>
            </h2>
          </div>
          {!isMobile && (
            <div style={{ paddingTop: 60 }}>
              <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--ink-2)', margin: 0 }}>
                Tax law is dense, but it is not magic. It rewards repetition and source discipline. The course is built around a deliberately repetitive weekly rhythm — read, compress, compute, reflect — so that by Week 12 the moves are reflexive.
              </p>
            </div>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid var(--ink)' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ padding: isMobile ? '20px 0' : '32px 24px 32px 0', borderRight: !isMobile && i < 3 ? '1px solid var(--rule)' : 'none', borderBottom: isMobile && i < 3 ? '1px solid var(--rule)' : 'none', paddingLeft: !isMobile && i > 0 ? 24 : 0 }}>
              <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: isMobile ? 24 : 28, color: 'var(--moss)', marginBottom: 12 }}>{s.n}.</div>
              <h3 style={{ fontSize: isMobile ? 17 : 20, margin: '0 0 10px', letterSpacing: '-0.01em', fontWeight: 500 }}>{s.t}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--ink-2)', margin: 0 }}>{s.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CurriculumPreview({ go, isMobile, progress }) {
  return (
    <section style={{ borderBottom: '1px solid var(--rule)', padding: isMobile ? '56px 20px' : '112px 40px', background: 'var(--paper-2)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', marginBottom: isMobile ? 28 : 48, flexDirection: isMobile ? 'column' : 'row', gap: 16 }}>
          <div>
            <div className="section-label">§ 02 — CURRICULUM</div>
            <h2 style={{ fontSize: isMobile ? 34 : 52, lineHeight: 1.02, margin: '14px 0 0', letterSpacing: '-0.02em', fontWeight: 400 }}>
              Twelve modules,<br/>five tax heads,<br/><span style={{ fontStyle: 'italic' }}>one capstone.</span>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['Income','VAT','CGT','CT','CAT'].map(t => <span key={t} className={`pill-tax ${TAG_PILL[t]}`}>{t}</span>)}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--ink)' }}>
          {WEEKS.map((w) => (
            <WeekRow key={w.n} w={w} go={go} isMobile={isMobile} done={progress.isDone(w.n)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WeekRow({ w, go, isMobile, done }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => go(`week/${w.n}`)}
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '40px 1fr 60px' : '70px 1fr 90px 180px 130px',
        gap: isMobile ? 12 : 24,
        padding: isMobile ? '16px 0' : '22px 12px',
        borderBottom: '1px solid var(--rule)',
        alignItems: isMobile ? 'baseline' : 'baseline',
        cursor: 'pointer',
        background: hover ? 'var(--paper)' : 'transparent',
        transition: 'background 0.15s ease',
      }}
    >
      <div className="week-num" style={{ fontSize: isMobile ? 22 : 32, position: 'relative' }}>
        {w.n}
        {done && <span style={{ position: 'absolute', top: -2, right: -8, width: 6, height: 6, borderRadius: '50%', background: 'var(--moss)' }}></span>}
      </div>
      <div>
        <h3 style={{ fontSize: isMobile ? 15 : 19, margin: 0, letterSpacing: '-0.005em', fontWeight: 500, lineHeight: 1.3, color: done ? 'var(--ink-3)' : 'var(--ink)', textDecoration: done ? 'line-through' : 'none' }}>{w.title}</h3>
        {!isMobile && <p style={{ fontSize: 13, color: 'var(--ink-2)', margin: '4px 0 0', lineHeight: 1.5, maxWidth: 540 }}>{w.blurb}</p>}
        {isMobile && <div style={{ marginTop: 6, display: 'flex', gap: 8, alignItems: 'center' }}>
          {w.tags.map(t => <span key={t} className={`pill-tax ${TAG_PILL[t]}`} style={{ fontSize: 9 }}>{t}</span>)}
          <span className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.06em' }}>{w.hours} HRS</span>
        </div>}
      </div>
      {!isMobile && (
        <>
          <div>{w.tags.map(t => <span key={t} className={`pill-tax ${TAG_PILL[t]}`}>{t}</span>)}</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)' }}>
            <div>{w.area.toUpperCase()}</div><div style={{ marginTop: 3 }}>{w.hours} HRS</div>
          </div>
        </>
      )}
      <div style={{ textAlign: 'right', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: isMobile ? 13 : 15, color: 'var(--moss-deep)', transform: hover ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.2s ease' }}>
        →
      </div>
    </div>
  );
}

function CalculatorPreview({ go, isMobile }) {
  return (
    <section style={{ borderBottom: '1px solid var(--rule)', padding: isMobile ? '56px 20px' : '112px 40px', background: 'var(--ink)', color: 'var(--paper)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="section-label" style={{ color: 'oklch(0.7 0.06 145)' }}>§ 03 — A LOOK INSIDE</div>
        <h2 style={{ fontSize: isMobile ? 34 : 52, lineHeight: 1.02, margin: '14px 0 32px', letterSpacing: '-0.02em', fontWeight: 400, color: 'var(--paper)' }}>
          Real computations,<br/><span style={{ fontStyle: 'italic', color: 'oklch(0.78 0.05 145)' }}>not multiple choice.</span>
        </h2>
        <p style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.6, color: 'oklch(0.85 0.02 250)', maxWidth: 600, marginBottom: 32 }}>
          Try the live Income Tax + USC + PRSI calculator. Move the salary slider — every figure recomputes against 2026 rates and bands.
        </p>
        <button onClick={() => go('calculator')} style={{ background: 'var(--paper)', color: 'var(--ink)', border: 'none', padding: '14px 24px', fontSize: 15, fontWeight: 500, borderRadius: 4, cursor: 'pointer' }}>
          Open the calculator →
        </button>
      </div>
    </section>
  );
}

function Stats({ isMobile }) {
  const stats = [
    { n: "12", l: "Weeks of structured study" },
    { n: "60+", l: "Worked computations" },
    { n: "120+", l: "Linked primary sources" },
    { n: "€0", l: "Total cost, forever" },
  ];
  return (
    <section style={{ borderBottom: '1px solid var(--rule)', padding: isMobile ? '40px 20px' : '88px 40px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 0 }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            borderRight: !isMobile && i < 3 ? '1px solid var(--rule)' : (isMobile && i % 2 === 0 ? '1px solid var(--rule)' : 'none'),
            borderBottom: isMobile && i < 2 ? '1px solid var(--rule)' : 'none',
            padding: isMobile ? '20px 16px' : '0 24px 0 0',
            paddingLeft: !isMobile && i > 0 ? 24 : (isMobile ? 16 : 0),
          }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? 56 : 80, lineHeight: 1, letterSpacing: '-0.03em' }}>{s.n}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: isMobile ? 10 : 11, color: 'var(--ink-3)', marginTop: 10, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQSection({ isMobile }) {
  const [open, setOpen] = useState(0);
  return (
    <section style={{ borderBottom: '1px solid var(--rule)', padding: isMobile ? '56px 20px' : '112px 40px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? 24 : 64 }}>
        <div>
          <div className="section-label">§ 04 — HONEST ANSWERS</div>
          <h2 style={{ fontSize: isMobile ? 30 : 44, lineHeight: 1.05, margin: '14px 0 0', letterSpacing: '-0.02em', fontWeight: 400 }}>
            What this is,<br/>and <span style={{ fontStyle: 'italic' }}>isn't.</span>
          </h2>
        </div>
        <div style={{ borderTop: '1px solid var(--ink)' }}>
          {FAQ.map((f, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--rule)', padding: '20px 0', cursor: 'pointer' }} onClick={() => setOpen(open === i ? -1 : i)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
                <h3 style={{ fontSize: isMobile ? 16 : 20, margin: 0, letterSpacing: '-0.005em', fontWeight: 500, lineHeight: 1.35 }}>{f.q}</h3>
                <div style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? 20 : 24, color: 'var(--moss)', fontStyle: 'italic', transition: 'transform 0.2s ease', transform: open === i ? 'rotate(180deg)' : 'rotate(0)' }}>{open === i ? '−' : '+'}</div>
              </div>
              <div style={{ maxHeight: open === i ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                <p style={{ fontSize: isMobile ? 14 : 16, lineHeight: 1.6, color: 'var(--ink-2)', margin: '12px 0 0', maxWidth: 700 }}>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ go, isMobile }) {
  return (
    <section style={{ background: 'var(--moss-deep)', color: 'var(--paper)', padding: isMobile ? '56px 20px' : '128px 40px', textAlign: 'center' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="section-label" style={{ color: 'oklch(0.78 0.05 145)' }}>§ 05 — BEGIN</div>
        <h2 style={{ fontSize: isMobile ? 48 : 88, lineHeight: 1.0, margin: isMobile ? '16px 0 20px' : '24px 0 32px', letterSpacing: '-0.025em', fontWeight: 400, color: 'var(--paper)' }}>
          Start with <span style={{ fontStyle: 'italic' }}>Week 01.</span>
        </h2>
        <p style={{ fontSize: isMobile ? 14 : 19, lineHeight: 1.55, color: 'oklch(0.88 0.02 145)', maxWidth: 620, margin: '0 auto 36px' }}>
          Five hours, one cheat-sheet, three quiz questions. By Sunday evening you will know, on paper, whether you are Irish tax resident — and why it matters.
        </p>
        <button onClick={() => go('week/01')} style={{ background: 'var(--paper)', color: 'var(--ink)', border: 'none', padding: isMobile ? '14px 22px' : '20px 36px', fontSize: isMobile ? 14 : 16, fontWeight: 500, borderRadius: 4, cursor: 'pointer' }}>
          Open Week 01 →
        </button>
        <div style={{ marginTop: 24, fontFamily: 'var(--mono)', fontSize: isMobile ? 9 : 11, color: 'oklch(0.78 0.05 145)', letterSpacing: '0.06em' }}>
          NO ACCOUNT · NO EMAIL · OPENS DIRECTLY
        </div>
      </div>
    </section>
  );
}

function Footer({ isMobile }) {
  return (
    <footer style={{ padding: isMobile ? '32px 20px' : '56px 40px 40px', background: 'var(--paper)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr 1fr', gap: isMobile ? 24 : 56, paddingBottom: isMobile ? 24 : 40, borderBottom: '1px solid var(--rule)' }}>
          <div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 18, letterSpacing: '-0.01em' }}>Open Course · <span style={{ fontStyle: 'italic' }}>Irish Tax</span></div>
            <p style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--ink-3)', maxWidth: 380, marginTop: 12 }}>
              Built on Public Sector Information from Revenue.ie, Citizens Information and the Irish Statute Book. Released under CC BY 4.0. Not affiliated with the Office of the Revenue Commissioners. Not tax advice.
            </p>
          </div>
          {!isMobile && [
            { h: "Course", l: ["Curriculum", "Calculator", "About", "Cheat-sheets"] },
            { h: "Sources", l: ["Revenue.ie", "Citizens Information", "Statute Book", "Tax Manuals"] },
            { h: "Project", l: ["Contribute", "Changelog", "Licence", "Contact"] },
          ].map((c, i) => (
            <div key={i}>
              <div className="eyebrow" style={{ marginBottom: 12 }}>{c.h}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 13, lineHeight: 2, color: 'var(--ink-2)' }}>
                {c.l.map(x => <li key={x}>{x}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 18, fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.04em', flexDirection: isMobile ? 'column' : 'row', gap: 6 }}>
          <div>v.2026.01 · FA 2025</div>
          <div>NOT TAX ADVICE</div>
          <div>CC BY 4.0</div>
        </div>
      </div>
    </footer>
  );
}

window.HomePage = HomePage;
window.Nav = Nav;
window.MobileMenu = MobileMenu;
window.useRoute = useRoute;
window.useProgress = useProgress;

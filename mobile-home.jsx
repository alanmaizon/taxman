// Mobile homepage for the Irish Taxation Course
const { useState: useStateM } = React;

function MobileHome() {
  return (
    <div className="itx" style={{ width: 390, minHeight: 2200, background: 'var(--paper)', overflow: 'hidden' }}>
      <MobileNav />
      <MobileHero />
      <MobileMarquee />
      <MobileMethod />
      <MobileCurriculum />
      <MobileWorked />
      <MobileStats />
      <MobileFAQ />
      <MobileCTA />
      <MobileFooter />
    </div>
  );
}

function MobileNav() {
  return (
    <header style={{ padding: '14px 20px', borderBottom: '1px solid var(--rule)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--paper)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 24, height: 24, border: '1.5px solid var(--ink)', display: 'grid', placeItems: 'center', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 15, lineHeight: 1 }}>τ</div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 14, letterSpacing: '-0.005em' }}>Open Course · <span style={{ fontStyle: 'italic' }}>Irish Tax</span></div>
      </div>
      <div style={{ width: 22, height: 14, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ height: 1.5, background: 'var(--ink)' }}></div>
        <div style={{ height: 1.5, background: 'var(--ink)' }}></div>
        <div style={{ height: 1.5, background: 'var(--ink)' }}></div>
      </div>
    </header>
  );
}

function MobileHero() {
  return (
    <section style={{ padding: '40px 20px 48px', borderBottom: '1px solid var(--rule)' }}>
      <div className="eyebrow" style={{ marginBottom: 24, fontSize: 10 }}>FREE · 12 WEEKS · SELF-PACED</div>
      <h1 style={{ fontSize: 44, lineHeight: 0.98, margin: 0, letterSpacing: '-0.025em', fontWeight: 400 }}>
        Learn the entire Irish tax code, <span style={{ fontStyle: 'italic', color: 'var(--moss-deep)' }}>line by line.</span>
      </h1>
      <p style={{ fontSize: 16, lineHeight: 1.55, color: 'var(--ink-2)', marginTop: 24 }}>
        Twelve weeks. Five tax heads. One spreadsheet at a time — built entirely on Revenue's own guidance and the Irish Statute Book.
      </p>
      <button className="btn btn-primary" style={{ width: '100%', padding: '14px 18px', fontSize: 15, marginTop: 28, borderRadius: 4 }}>
        Begin Week 01 — free →
      </button>
      <button className="btn btn-ghost" style={{ width: '100%', padding: '14px 18px', fontSize: 15, marginTop: 8, borderRadius: 4 }}>
        Browse the curriculum
      </button>

      <div style={{ marginTop: 32, border: '1px solid var(--ink)', background: 'var(--paper)', boxShadow: '6px 6px 0 0 var(--moss-soft)' }}>
        <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--ink)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 14 }}>Week 06 — IT + USC + PRSI</div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>€52,000</div>
        </div>
        <table className="ledger" style={{ fontSize: 12 }}>
          <tbody>
            <tr><td>Income Tax</td><td className="num">€8,000.00</td></tr>
            <tr><td>USC</td><td className="num">€1,092.82</td></tr>
            <tr><td>PRSI Class A</td><td className="num">€2,203.50</td></tr>
            <tr className="total"><td>Total deductions</td><td className="num">€11,296.32</td></tr>
          </tbody>
        </table>
        <div style={{ padding: '8px 14px', borderTop: '1px solid var(--rule)', fontSize: 9, fontFamily: 'var(--mono)', color: 'var(--ink-3)' }}>
          SOURCE: REVENUE.IE/TAX-RELIEF-CHARTS · v.2026.01
        </div>
      </div>
    </section>
  );
}

function MobileMarquee() {
  const items = ["Income Tax", "USC", "PRSI", "VAT", "CGT", "CT", "CAT", "Pay & File", "BIK", "DIRT"];
  return (
    <div style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '12px 0', overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: 24, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.04em', whiteSpace: 'nowrap', paddingLeft: 20 }}>
        {[...items, ...items].map((it, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span>{it}</span>
            <span style={{ color: 'var(--moss)' }}>§</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function MobileMethod() {
  const steps = [
    { n: "I", t: "Read the source", b: "Revenue manuals, Citizens Information, the Statute Book itself." },
    { n: "II", t: "Compress to one page", b: "Write the rule in your own words. The act of writing is the lesson." },
    { n: "III", t: "Work the spreadsheet", b: "Every week ends in a real computation: IT, VAT3, CGT, CT, CAT." },
    { n: "IV", t: "Quiz & log", b: "Self-marked quiz. Source-discipline reflection. Move on." },
  ];
  return (
    <section style={{ padding: '64px 20px', borderBottom: '1px solid var(--rule)' }}>
      <div className="section-label">§ 01 — METHOD</div>
      <h2 style={{ fontSize: 34, lineHeight: 1.02, margin: '14px 0 32px', letterSpacing: '-0.02em', fontWeight: 400 }}>
        Four moves,<br/>every week,<br/><span style={{ fontStyle: 'italic' }}>for twelve weeks.</span>
      </h2>
      <div style={{ borderTop: '1px solid var(--ink)' }}>
        {steps.map(s => (
          <div key={s.n} style={{ padding: '20px 0', borderBottom: '1px solid var(--rule)', display: 'grid', gridTemplateColumns: '40px 1fr', gap: 16 }}>
            <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22, color: 'var(--moss)' }}>{s.n}.</div>
            <div>
              <h3 style={{ fontSize: 17, margin: 0, letterSpacing: '-0.01em', fontWeight: 500 }}>{s.t}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--ink-2)', margin: '4px 0 0' }}>{s.b}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MobileCurriculum() {
  return (
    <section style={{ padding: '64px 20px', borderBottom: '1px solid var(--rule)', background: 'var(--paper-2)' }}>
      <div className="section-label">§ 02 — CURRICULUM</div>
      <h2 style={{ fontSize: 34, lineHeight: 1.02, margin: '14px 0 28px', letterSpacing: '-0.02em', fontWeight: 400 }}>
        Twelve modules,<br/>five tax heads.
      </h2>
      <div style={{ borderTop: '1px solid var(--ink)' }}>
        {WEEKS.map(w => (
          <div key={w.n} style={{ padding: '18px 0', borderBottom: '1px solid var(--rule)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flex: 1 }}>
                <div className="week-num" style={{ fontSize: 22, minWidth: 32 }}>{w.n}</div>
                <h3 style={{ fontSize: 16, margin: 0, letterSpacing: '-0.005em', fontWeight: 500, lineHeight: 1.3 }}>{w.title}</h3>
              </div>
              {w.tags.map(t => <span key={t} className={`pill-tax ${TAG_PILL[t]}`} style={{ fontSize: 9 }}>{t}</span>)}
            </div>
            <div style={{ marginTop: 8, marginLeft: 44, fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              {w.area} · {w.hours} hrs
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MobileWorked() {
  return (
    <section style={{ padding: '64px 20px', background: 'var(--ink)', color: 'var(--paper)' }}>
      <div className="section-label" style={{ color: 'oklch(0.7 0.06 145)' }}>§ 03 — A LOOK INSIDE</div>
      <h2 style={{ fontSize: 34, lineHeight: 1.02, margin: '14px 0 28px', letterSpacing: '-0.02em', fontWeight: 400, color: 'var(--paper)' }}>
        Real computations,<br/><span style={{ fontStyle: 'italic', color: 'oklch(0.78 0.05 145)' }}>not multiple choice.</span>
      </h2>
      <div style={{ background: 'var(--paper)', color: 'var(--ink)', padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <div className="eyebrow" style={{ fontSize: 10 }}>Wk 12 · CAT</div>
          <span className="pill-tax pill-cat" style={{ fontSize: 9 }}>CAT</span>
        </div>
        <h3 style={{ fontSize: 17, margin: '0 0 14px', letterSpacing: '-0.005em' }}>Inheritance: parent → adult child, €500,000</h3>
        <table className="ledger" style={{ fontSize: 12 }}>
          <tbody>
            <tr><td>Benefit</td><td className="num">€500,000</td></tr>
            <tr><td>Group A threshold</td><td className="num">(€400,000)</td></tr>
            <tr style={{ background: 'var(--paper-2)' }}><td>Taxable excess</td><td className="num">€100,000</td></tr>
            <tr><td>× 33%</td><td className="num">—</td></tr>
            <tr className="total"><td>CAT due</td><td className="num">€33,000</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

function MobileStats() {
  const stats = [{ n: "12", l: "WEEKS" }, { n: "60+", l: "COMPUTATIONS" }, { n: "120+", l: "SOURCES" }, { n: "€0", l: "FOREVER" }];
  return (
    <section style={{ padding: '48px 20px', borderBottom: '1px solid var(--rule)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
      {stats.map((s, i) => (
        <div key={i} style={{ padding: '20px 16px', borderBottom: i < 2 ? '1px solid var(--rule)' : 'none', borderRight: i % 2 === 0 ? '1px solid var(--rule)' : 'none' }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 56, lineHeight: 1, letterSpacing: '-0.03em' }}>{s.n}</div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-3)', marginTop: 8, letterSpacing: '0.08em' }}>{s.l}</div>
        </div>
      ))}
    </section>
  );
}

function MobileFAQ() {
  const [open, setOpen] = useStateM(0);
  return (
    <section style={{ padding: '64px 20px', borderBottom: '1px solid var(--rule)' }}>
      <div className="section-label">§ 04 — HONEST ANSWERS</div>
      <h2 style={{ fontSize: 34, lineHeight: 1.02, margin: '14px 0 24px', letterSpacing: '-0.02em', fontWeight: 400 }}>
        What this is,<br/><span style={{ fontStyle: 'italic' }}>and isn't.</span>
      </h2>
      <div style={{ borderTop: '1px solid var(--ink)' }}>
        {FAQ.map((f, i) => (
          <div key={i} style={{ borderBottom: '1px solid var(--rule)', padding: '16px 0' }} onClick={() => setOpen(open === i ? -1 : i)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
              <h3 style={{ fontSize: 15, margin: 0, fontWeight: 500, lineHeight: 1.35 }}>{f.q}</h3>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--moss)', fontStyle: 'italic' }}>{open === i ? '−' : '+'}</div>
            </div>
            {open === i && (
              <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--ink-2)', margin: '10px 0 0' }}>{f.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function MobileCTA() {
  return (
    <section style={{ background: 'var(--moss-deep)', color: 'var(--paper)', padding: '64px 20px', textAlign: 'center' }}>
      <div className="section-label" style={{ color: 'oklch(0.78 0.05 145)' }}>§ 05 — BEGIN</div>
      <h2 style={{ fontSize: 48, lineHeight: 1.0, margin: '16px 0 20px', letterSpacing: '-0.025em', fontWeight: 400, color: 'var(--paper)' }}>
        Start with <span style={{ fontStyle: 'italic' }}>Week 01.</span>
      </h2>
      <p style={{ fontSize: 14, lineHeight: 1.55, color: 'oklch(0.88 0.02 145)', margin: '0 0 28px' }}>
        Five hours. One cheat-sheet. Three quiz questions. By Sunday: you'll know if you're Irish tax resident, and why.
      </p>
      <button style={{ background: 'var(--paper)', color: 'var(--ink)', border: 'none', padding: '14px 22px', fontSize: 14, fontWeight: 500, borderRadius: 4, width: '100%' }}>
        Open Week 01 →
      </button>
      <div style={{ marginTop: 18, fontFamily: 'var(--mono)', fontSize: 9, color: 'oklch(0.78 0.05 145)', letterSpacing: '0.06em' }}>
        NO ACCOUNT · NO EMAIL
      </div>
    </section>
  );
}

function MobileFooter() {
  return (
    <footer style={{ padding: '32px 20px', background: 'var(--paper)' }}>
      <div style={{ fontFamily: 'var(--serif)', fontSize: 16, letterSpacing: '-0.005em', marginBottom: 12 }}>
        Open Course · <span style={{ fontStyle: 'italic' }}>Irish Tax</span>
      </div>
      <p style={{ fontSize: 11, lineHeight: 1.55, color: 'var(--ink-3)', margin: 0 }}>
        Built on PSI from Revenue.ie, Citizens Information & Irish Statute Book. CC BY 4.0. Not affiliated with Revenue. Not tax advice.
      </p>
      <div style={{ marginTop: 16, fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.04em' }}>
        v.2026.01 · FINANCE ACT 2025
      </div>
    </footer>
  );
}

window.MobileHome = MobileHome;

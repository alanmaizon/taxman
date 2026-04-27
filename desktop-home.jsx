// Desktop homepage for the Irish Taxation Course
const { useState } = React;

function DesktopHome({ accent = "moss" }) {
  return (
    <div className="itx" style={{ width: 1440, minHeight: 2400, background: 'var(--paper)' }}>
      <DesktopNav />
      <DesktopHero />
      <DesktopMarquee />
      <DesktopHowItWorks />
      <DesktopCurriculum />
      <DesktopWorked />
      <DesktopProof />
      <DesktopFAQ />
      <DesktopCTA />
      <DesktopFooter />
    </div>
  );
}

function DesktopNav() {
  return (
    <header style={{ borderBottom: '1px solid var(--rule)', background: 'var(--paper)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 28, height: 28, border: '1.5px solid var(--ink)', display: 'grid', placeItems: 'center', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18, lineHeight: 1 }}>τ</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 18, letterSpacing: '-0.01em' }}>The Open Course in <span style={{ fontStyle: 'italic' }}>Irish Taxation</span></div>
        </div>
        <nav style={{ display: 'flex', gap: 36, fontSize: 14, color: 'var(--ink-2)' }}>
          <a>Curriculum</a>
          <a>How it works</a>
          <a>Resources</a>
          <a>FAQ</a>
        </nav>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: 13, borderRadius: 4 }}>Sign in</button>
          <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 13, borderRadius: 4 }}>Begin Week 01 →</button>
        </div>
      </div>
    </header>
  );
}

function DesktopHero() {
  return (
    <section style={{ borderBottom: '1px solid var(--rule)', background: 'var(--paper)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '88px 48px 96px', display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 80, alignItems: 'start' }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 28 }}>Free · Self-paced · 12 weeks · Updated for Finance Act 2025</div>
          <h1 style={{ fontSize: 88, lineHeight: 0.96, margin: 0, letterSpacing: '-0.025em', fontWeight: 400 }}>
            Learn the entire<br/>
            Irish tax code,<br/>
            <span style={{ fontStyle: 'italic', color: 'var(--moss-deep)' }}>property by property,</span><br/>
            <span style={{ fontStyle: 'italic', color: 'var(--moss-deep)' }}>line by line.</span>
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 600, marginTop: 36 }}>
            Twelve weeks. Five tax heads. One spreadsheet at a time. A complete, self-paced curriculum built entirely on Revenue's own guidance and the Irish Statute Book — so you learn from the source, not a paraphrase.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 44 }}>
            <button className="btn btn-primary" style={{ padding: '14px 24px', fontSize: 15, borderRadius: 4 }}>Begin Week 01 — free →</button>
            <button className="btn btn-ghost" style={{ padding: '14px 24px', fontSize: 15, borderRadius: 4 }}>Browse the curriculum</button>
          </div>
          <div style={{ marginTop: 36, display: 'flex', gap: 32, fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>
            <div>NO SIGN-UP REQUIRED</div>
            <div>NO PAYWALL</div>
            <div>NO CREDENTIAL ISSUED</div>
          </div>
        </div>
        <HeroLedger />
      </div>
    </section>
  );
}

function HeroLedger() {
  return (
    <div style={{ position: 'relative' }}>
      <div className="eyebrow" style={{ marginBottom: 14, color: 'var(--moss-deep)' }}>Worked example · Week 06</div>
      <div style={{ border: '1px solid var(--ink)', background: 'var(--paper)', boxShadow: '8px 8px 0 0 var(--moss-soft)' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--ink)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 18 }}>Single PAYE employee, 2026</div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>€52,000 gross</div>
        </div>
        <table className="ledger">
          <tbody>
            <tr>
              <td>Standard rate band</td>
              <td className="num" style={{ color: 'var(--ink-3)' }}>€44,000 × 20%</td>
              <td className="num">€8,800.00</td>
            </tr>
            <tr>
              <td>Higher rate</td>
              <td className="num" style={{ color: 'var(--ink-3)' }}>€8,000 × 40%</td>
              <td className="num">€3,200.00</td>
            </tr>
            <tr>
              <td>Less: Personal credit</td>
              <td className="num" style={{ color: 'var(--ink-3)' }}>—</td>
              <td className="num">(€2,000.00)</td>
            </tr>
            <tr>
              <td>Less: Employee credit</td>
              <td className="num" style={{ color: 'var(--ink-3)' }}>—</td>
              <td className="num">(€2,000.00)</td>
            </tr>
            <tr style={{ background: 'var(--paper-2)' }}>
              <td style={{ fontWeight: 500 }}>Income Tax payable</td>
              <td></td>
              <td className="num" style={{ fontWeight: 600 }}>€8,000.00</td>
            </tr>
            <tr>
              <td>USC (progressive)</td>
              <td className="num" style={{ color: 'var(--ink-3)' }}>0.5 / 2 / 3%</td>
              <td className="num">€1,092.82</td>
            </tr>
            <tr>
              <td>PRSI Class A (blended)</td>
              <td className="num" style={{ color: 'var(--ink-3)' }}>~4.2375%</td>
              <td className="num">€2,203.50</td>
            </tr>
            <tr className="total">
              <td>Total deductions</td>
              <td></td>
              <td className="num">€11,296.32</td>
            </tr>
          </tbody>
        </table>
        <div style={{ padding: '12px 18px', borderTop: '1px solid var(--rule)', fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--ink-3)', display: 'flex', justifyContent: 'space-between' }}>
          <span>SOURCE: revenue.ie/tax-relief-charts</span>
          <span>v.2026.01</span>
        </div>
      </div>
      <div style={{ marginTop: 18, fontSize: 13, color: 'var(--ink-3)', fontStyle: 'italic', fontFamily: 'var(--serif)' }}>
        Every figure traceable. Every rule cited. Every assumption labelled.
      </div>
    </div>
  );
}

function DesktopMarquee() {
  const items = ["Income Tax", "USC & PRSI", "VAT", "Capital Gains Tax", "Corporation Tax", "Capital Acquisitions Tax", "Pay & File", "Capital Allowances", "BIK", "Group Relief", "Dwelling-House Exemption", "DIRT"];
  return (
    <div style={{ borderBottom: '1px solid var(--rule)', background: 'var(--ink)', color: 'var(--paper)', padding: '18px 0', overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: 48, fontFamily: 'var(--mono)', fontSize: 13, letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
        {[...items, ...items].map((it, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
            <span>{it}</span>
            <span style={{ color: 'var(--moss)' }}>§</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function DesktopHowItWorks() {
  const steps = [
    { n: "I", title: "Read the source", body: "Each module opens with a tight reading list — Revenue Tax & Duty Manuals, Citizens Information explainers, and the underlying section of the Taxes Consolidation Act. No paraphrase, no proprietary text." },
    { n: "II", title: "Build the cheat-sheet", body: "Compress the rule onto one page in your own words. Cite the section. Note the date. The act of writing it is the lesson." },
    { n: "III", title: "Work the spreadsheet", body: "Every week ends in a computation: Income Tax, VAT3, CGT, CT, CAT. Templates are provided; you fill in the numbers and trace every figure to a source." },
    { n: "IV", title: "Quiz & log", body: "Six to ten self-marked questions. A short reflection: which source did you trust, and what assumption did you make? Source-discipline is the skill." },
  ];
  return (
    <section style={{ borderBottom: '1px solid var(--rule)', padding: '120px 48px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, marginBottom: 72 }}>
          <div>
            <div className="section-label">§ 01 — Method</div>
            <h2 style={{ fontSize: 56, lineHeight: 1.0, margin: '20px 0 0', letterSpacing: '-0.02em', fontWeight: 400 }}>
              The same four<br/>moves, every<br/>week, for twelve<br/>weeks.
            </h2>
          </div>
          <div style={{ paddingTop: 60 }}>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--ink-2)', margin: 0 }}>
              Tax law is dense, but it is not magic. It rewards repetition and source discipline. This course is built around a deliberately repetitive weekly rhythm — read, compress, compute, reflect — so that by Week 12 the moves are reflexive.
            </p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid var(--ink)' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ padding: '36px 32px 36px 0', borderRight: i < 3 ? '1px solid var(--rule)' : 'none', paddingLeft: i > 0 ? 32 : 0 }}>
              <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 32, color: 'var(--moss)', marginBottom: 20 }}>{s.n}.</div>
              <h3 style={{ fontSize: 22, margin: '0 0 12px', letterSpacing: '-0.01em' }}>{s.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)', margin: 0 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DesktopCurriculum() {
  return (
    <section style={{ borderBottom: '1px solid var(--rule)', padding: '120px 48px', background: 'var(--paper-2)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
          <div>
            <div className="section-label">§ 02 — Curriculum</div>
            <h2 style={{ fontSize: 56, lineHeight: 1.0, margin: '20px 0 0', letterSpacing: '-0.02em', fontWeight: 400, maxWidth: 700 }}>
              Twelve modules,<br/>five tax heads,<br/><span style={{ fontStyle: 'italic' }}>one capstone.</span>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 8, fontSize: 11, fontFamily: 'var(--mono)' }}>
            <span className="pill-tax pill-income">Income</span>
            <span className="pill-tax pill-vat">VAT</span>
            <span className="pill-tax pill-cgt">CGT</span>
            <span className="pill-tax pill-ct">CT</span>
            <span className="pill-tax pill-cat">CAT</span>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--ink)' }}>
          {WEEKS.map((w, i) => (
            <div key={w.n} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 100px 200px 140px', gap: 32, padding: '28px 0', borderBottom: '1px solid var(--rule)', alignItems: 'baseline', cursor: 'pointer' }}>
              <div className="week-num" style={{ fontSize: 36 }}>{w.n}</div>
              <div>
                <h3 style={{ fontSize: 22, margin: 0, letterSpacing: '-0.01em', fontWeight: 500 }}>{w.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: '6px 0 0', lineHeight: 1.5, maxWidth: 540 }}>{w.blurb}</p>
              </div>
              <div>
                {w.tags.map(t => <span key={t} className={`pill-tax ${TAG_PILL[t]}`}>{t}</span>)}
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-3)' }}>
                <div>{w.area.toUpperCase()}</div>
                <div style={{ marginTop: 4 }}>{w.hours} HRS</div>
              </div>
              <div style={{ textAlign: 'right', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 16, color: 'var(--moss-deep)' }}>
                Read module →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DesktopWorked() {
  return (
    <section style={{ borderBottom: '1px solid var(--rule)', padding: '120px 48px', background: 'var(--ink)', color: 'var(--paper)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="section-label" style={{ color: 'oklch(0.7 0.06 145)' }}>§ 03 — A look inside</div>
        <h2 style={{ fontSize: 56, lineHeight: 1.0, margin: '20px 0 56px', letterSpacing: '-0.02em', fontWeight: 400, color: 'var(--paper)', maxWidth: 900 }}>
          Every module ends with<br/>a real computation —<br/><span style={{ fontStyle: 'italic', color: 'oklch(0.78 0.05 145)' }}>not a multiple choice.</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div style={{ background: 'var(--paper)', color: 'var(--ink)', padding: 36 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
              <div className="eyebrow">Week 07 · VAT3 mapping</div>
              <span className="pill-tax pill-vat">VAT</span>
            </div>
            <h3 style={{ fontSize: 24, margin: '0 0 20px', letterSpacing: '-0.01em' }}>Bi-monthly VAT3 from a simple ledger</h3>
            <table className="ledger">
              <thead>
                <tr><th>Field</th><th>Description</th><th style={{textAlign:'right'}}>Amount</th></tr>
              </thead>
              <tbody>
                <tr><td className="mono">T1</td><td>VAT on sales</td><td className="num">€23,000.00</td></tr>
                <tr><td className="mono">T2</td><td>VAT reclaimable on purchases</td><td className="num">€11,500.00</td></tr>
                <tr className="total"><td className="mono">T3</td><td>Net payable</td><td className="num">€11,500.00</td></tr>
                <tr><td className="mono">T4</td><td>Net repayable</td><td className="num">€0.00</td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 18, fontStyle: 'italic', fontFamily: 'var(--serif)' }}>
              File by the 19th of the following month — or the 23rd via ROS.
            </p>
          </div>

          <div style={{ background: 'var(--paper)', color: 'var(--ink)', padding: 36 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
              <div className="eyebrow">Week 12 · CAT inheritance</div>
              <span className="pill-tax pill-cat">CAT</span>
            </div>
            <h3 style={{ fontSize: 24, margin: '0 0 20px', letterSpacing: '-0.01em' }}>Adult child inheriting €500,000 from a parent</h3>
            <table className="ledger">
              <tbody>
                <tr><td>Benefit received</td><td className="num">€500,000.00</td></tr>
                <tr><td>Less: Group A threshold</td><td className="num">(€400,000.00)</td></tr>
                <tr style={{ background: 'var(--paper-2)' }}><td style={{fontWeight:500}}>Taxable excess</td><td className="num" style={{fontWeight:500}}>€100,000.00</td></tr>
                <tr><td>CAT rate</td><td className="num">× 33%</td></tr>
                <tr className="total"><td>CAT due</td><td className="num">€33,000.00</td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 18, fontStyle: 'italic', fontFamily: 'var(--serif)' }}>
              Valuation date in Jan–Aug → file by 31 Oct same year.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DesktopProof() {
  const stats = [
    { n: "12", l: "Weeks of structured study" },
    { n: "60+", l: "Worked computations" },
    { n: "120+", l: "Linked primary sources" },
    { n: "€0", l: "Total cost, forever" },
  ];
  return (
    <section style={{ borderBottom: '1px solid var(--rule)', padding: '96px 48px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ borderRight: i < 3 ? '1px solid var(--rule)' : 'none', paddingRight: 24 }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 88, lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--ink)' }}>{s.n}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-3)', marginTop: 14, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DesktopFAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section style={{ borderBottom: '1px solid var(--rule)', padding: '120px 48px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80 }}>
        <div>
          <div className="section-label">§ 04 — Honest answers</div>
          <h2 style={{ fontSize: 48, lineHeight: 1.05, margin: '20px 0 0', letterSpacing: '-0.02em', fontWeight: 400 }}>
            What this<br/>course is, and<br/><span style={{ fontStyle: 'italic' }}>isn't.</span>
          </h2>
        </div>
        <div style={{ borderTop: '1px solid var(--ink)' }}>
          {FAQ.map((f, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--rule)', padding: '24px 0', cursor: 'pointer' }} onClick={() => setOpen(open === i ? -1 : i)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 24 }}>
                <h3 style={{ fontSize: 22, margin: 0, letterSpacing: '-0.01em', fontWeight: 500 }}>{f.q}</h3>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 24, color: 'var(--moss)', fontStyle: 'italic' }}>{open === i ? '−' : '+'}</div>
              </div>
              {open === i && (
                <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)', margin: '16px 0 0', maxWidth: 700 }}>{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DesktopCTA() {
  return (
    <section style={{ background: 'var(--moss-deep)', color: 'var(--paper)', padding: '140px 48px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
        <div className="section-label" style={{ color: 'oklch(0.78 0.05 145)' }}>§ 05 — Begin</div>
        <h2 style={{ fontSize: 96, lineHeight: 1.0, margin: '24px 0 32px', letterSpacing: '-0.025em', fontWeight: 400, color: 'var(--paper)' }}>
          Start with <span style={{ fontStyle: 'italic' }}>Week 01.</span>
        </h2>
        <p style={{ fontSize: 19, lineHeight: 1.55, color: 'oklch(0.88 0.02 145)', maxWidth: 620, margin: '0 auto 48px' }}>
          Five hours, one cheat-sheet, three quiz questions. By Sunday evening you will know, on paper, whether you are Irish tax resident — and why it matters.
        </p>
        <button style={{ background: 'var(--paper)', color: 'var(--ink)', border: 'none', padding: '20px 36px', fontSize: 16, fontWeight: 500, borderRadius: 4, cursor: 'pointer' }}>
          Open Week 01 — Tax system map →
        </button>
        <div style={{ marginTop: 28, fontFamily: 'var(--mono)', fontSize: 11, color: 'oklch(0.78 0.05 145)', letterSpacing: '0.06em' }}>
          NO ACCOUNT · NO EMAIL · OPENS DIRECTLY IN BROWSER
        </div>
      </div>
    </section>
  );
}

function DesktopFooter() {
  return (
    <footer style={{ padding: '64px 48px 48px', background: 'var(--paper)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 64, paddingBottom: 48, borderBottom: '1px solid var(--rule)' }}>
          <div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 22, letterSpacing: '-0.01em' }}>The Open Course in <span style={{ fontStyle: 'italic' }}>Irish Taxation</span></div>
            <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--ink-3)', maxWidth: 380, marginTop: 14 }}>
              Built on Public Sector Information from Revenue.ie, Citizens Information and the Irish Statute Book. Course materials released under CC BY 4.0. Not affiliated with the Office of the Revenue Commissioners.
            </p>
          </div>
          {[
            { h: "Course", l: ["Curriculum", "Method", "Capstone", "Cheat-sheets"] },
            { h: "Sources", l: ["Revenue.ie", "Citizens Information", "Irish Statute Book", "Tax & Duty Manuals"] },
            { h: "Project", l: ["About", "Contribute", "Changelog", "Licence"] },
          ].map((c, i) => (
            <div key={i}>
              <div className="eyebrow" style={{ marginBottom: 16 }}>{c.h}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14, lineHeight: 2, color: 'var(--ink-2)' }}>
                {c.l.map(x => <li key={x}>{x}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 24, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.04em' }}>
          <div>v.2026.01 · UPDATED FOR FINANCE ACT 2025</div>
          <div>NOT TAX ADVICE · FOR EDUCATIONAL USE</div>
          <div>CC BY 4.0</div>
        </div>
      </div>
    </footer>
  );
}

window.DesktopHome = DesktopHome;

// Single-week module reading view (desktop + mobile)
function DesktopModule() {
  return (
    <div className="itx" style={{ width: 1440, minHeight: 1800, background: 'var(--paper)' }}>
      <header style={{ borderBottom: '1px solid var(--rule)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 28, height: 28, border: '1.5px solid var(--ink)', display: 'grid', placeItems: 'center', fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18, lineHeight: 1 }}>τ</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 18 }}>Open Course · <span style={{ fontStyle: 'italic' }}>Irish Tax</span></div>
          </div>
          <div className="mono" style={{ fontSize: 12, color: 'var(--ink-3)' }}>WEEK 06 OF 12 · INCOME TAX</div>
          <button className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: 13, borderRadius: 4 }}>← All modules</button>
        </div>
      </header>

      <section style={{ borderBottom: '1px solid var(--rule)', padding: '64px 48px 56px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '120px 1fr 320px', gap: 48 }}>
          <div className="week-num" style={{ fontSize: 96, lineHeight: 0.9 }}>06</div>
          <div>
            <div className="section-label">§ Personal tax</div>
            <h1 style={{ fontSize: 60, lineHeight: 1.0, margin: '12px 0 20px', letterSpacing: '-0.025em', fontWeight: 400 }}>
              Full Income Tax<br/>computation, with<br/><span style={{ fontStyle: 'italic', color: 'var(--moss-deep)' }}>USC and PRSI.</span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 720, margin: 0 }}>
              By the end of this week you will assemble bands, credits, USC and PRSI into one defensible Income Tax computation for a PAYE employee — and you will know which Revenue page each figure came from.
            </p>
          </div>
          <aside style={{ border: '1px solid var(--rule)', padding: 20, background: 'var(--paper-2)' }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>This week</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 13, lineHeight: 2, color: 'var(--ink-2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Reading</span><span>~3.0 hrs</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Spreadsheet</span><span>~2.5 hrs</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Quiz</span><span>~0.5 hrs</span></div>
              <div className="leader" style={{ margin: '6px 0' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--ink)' }}><span>Total</span><span>6 hrs</span></div>
            </div>
            <button className="btn btn-moss" style={{ width: '100%', marginTop: 18, padding: '12px', fontSize: 14, borderRadius: 4 }}>Mark week complete</button>
          </aside>
        </div>
      </section>

      <section style={{ borderBottom: '1px solid var(--rule)', padding: '72px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64 }}>
          <div>
            <div className="section-label">I. Reading list</div>
            <h2 style={{ fontSize: 36, margin: '12px 0 0', letterSpacing: '-0.02em', fontWeight: 400 }}>Read the source.</h2>
          </div>
          <div style={{ borderTop: '1px solid var(--ink)' }}>
            {[
              { src: "Revenue", t: "Tax rates, bands and reliefs (2026)", d: "The 2026 standard rate band, personal credits, and employee credit table. Print this.", min: "20" },
              { src: "Revenue", t: "How your Income Tax is calculated", d: "Worked example showing the order of operations: bands → credits → liability.", min: "25" },
              { src: "Revenue", t: "USC chart — 2026 thresholds & rates", d: "Progressive 0.5 / 2 / 3% bands. Note the €13,000 entry threshold.", min: "15" },
              { src: "Gov.ie", t: "PRSI Class A contribution rates", d: "Including the rate change from 4.2% to 4.35% effective 1 October 2026.", min: "10" },
              { src: "Statute Book", t: "Taxes Consolidation Act 1997, Part 2", d: "The charging structure that everything above implements. Don't memorise — orient.", min: "30" },
            ].map((r, i) => (
              <div key={i} style={{ padding: '24px 0', borderBottom: '1px solid var(--rule)', display: 'grid', gridTemplateColumns: '120px 1fr 80px', gap: 24, alignItems: 'baseline' }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--moss-deep)', letterSpacing: '0.06em' }}>{r.src.toUpperCase()}</div>
                <div>
                  <h3 style={{ fontSize: 19, margin: 0, letterSpacing: '-0.005em', fontWeight: 500 }}>{r.t}</h3>
                  <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: '4px 0 0', lineHeight: 1.5 }}>{r.d}</p>
                </div>
                <div className="mono" style={{ fontSize: 12, color: 'var(--ink-3)', textAlign: 'right' }}>{r.min} MIN</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderBottom: '1px solid var(--rule)', padding: '72px 48px', background: 'var(--paper-2)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64 }}>
          <div>
            <div className="section-label">II. Worked computation</div>
            <h2 style={{ fontSize: 36, margin: '12px 0 16px', letterSpacing: '-0.02em', fontWeight: 400 }}>Build it yourself.</h2>
            <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.55 }}>Single PAYE employee, gross €52,000, no other income, standard credits only. Replicate each row in your spreadsheet and trace the rate to its Revenue page.</p>
          </div>
          <div style={{ background: 'var(--paper)', border: '1px solid var(--ink)', boxShadow: '8px 8px 0 0 var(--moss-soft)' }}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--ink)', display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 18 }}>Income Tax + USC + PRSI · 2026</div>
              <span className="pill-tax pill-income">Income</span>
            </div>
            <table className="ledger" style={{ fontSize: 14 }}>
              <thead><tr><th>Step</th><th>Working</th><th style={{textAlign:'right'}}>Amount</th></tr></thead>
              <tbody>
                <tr><td>1. Standard band</td><td className="num" style={{color:'var(--ink-3)'}}>€44,000 × 20%</td><td className="num">€8,800.00</td></tr>
                <tr><td>2. Higher rate</td><td className="num" style={{color:'var(--ink-3)'}}>€8,000 × 40%</td><td className="num">€3,200.00</td></tr>
                <tr><td>3. Personal credit</td><td className="num" style={{color:'var(--ink-3)'}}>—</td><td className="num">(€2,000.00)</td></tr>
                <tr><td>4. Employee credit</td><td className="num" style={{color:'var(--ink-3)'}}>—</td><td className="num">(€2,000.00)</td></tr>
                <tr style={{ background: 'var(--paper-2)' }}><td style={{fontWeight:500}}>Income Tax payable</td><td></td><td className="num" style={{fontWeight:600}}>€8,000.00</td></tr>
                <tr><td>5. USC progressive</td><td className="num" style={{color:'var(--ink-3)'}}>0.5 / 2 / 3%</td><td className="num">€1,092.82</td></tr>
                <tr><td>6. PRSI Class A blended</td><td className="num" style={{color:'var(--ink-3)'}}>~4.2375%</td><td className="num">€2,203.50</td></tr>
                <tr className="total"><td>Total deductions</td><td></td><td className="num">€11,296.32</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section style={{ borderBottom: '1px solid var(--rule)', padding: '72px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64 }}>
          <div>
            <div className="section-label">III. Self-quiz</div>
            <h2 style={{ fontSize: 36, margin: '12px 0 0', letterSpacing: '-0.02em', fontWeight: 400 }}>Three questions.</h2>
          </div>
          <div>
            {[
              { q: "What is the 2026 standard rate band for a single person?", a: "€44,000 at 20%, with the balance taxed at 40%." },
              { q: "From what date does an employee Class A PRSI rate of 4.35% apply?", a: "From 1 October 2026, per the gov.ie PRSI table." },
              { q: "USC applies once chargeable income exceeds what amount?", a: "€13,000, subject to detailed rules in the Notes for Guidance." },
            ].map((q, i) => (
              <div key={i} style={{ padding: '24px 0', borderBottom: '1px solid var(--rule)' }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--moss-deep)' }}>Q{i+1}</div>
                <h3 style={{ fontSize: 18, margin: '6px 0 0', fontWeight: 500, letterSpacing: '-0.005em' }}>{q.q}</h3>
                <details style={{ marginTop: 8 }}>
                  <summary style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--moss-deep)', cursor: 'pointer', fontSize: 14 }}>Reveal answer</summary>
                  <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: '8px 0 0', lineHeight: 1.55 }}>{q.a}</p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 48px', background: 'var(--ink)', color: 'var(--paper)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 32 }}>
          <div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.08em', color: 'oklch(0.7 0.06 145)' }}>NEXT WEEK ↓</div>
            <h2 style={{ fontSize: 40, margin: '8px 0 0', letterSpacing: '-0.02em', fontWeight: 400, color: 'var(--paper)' }}>
              <span style={{ fontStyle: 'italic' }}>07.</span> VAT foundations & the VAT3 return
            </h2>
          </div>
          <button style={{ background: 'var(--paper)', color: 'var(--ink)', border: 'none', padding: '16px 28px', fontSize: 15, fontWeight: 500, borderRadius: 4 }}>
            Continue →
          </button>
        </div>
      </section>
    </div>
  );
}

function MobileModule() {
  return (
    <div className="itx" style={{ width: 390, minHeight: 1700, background: 'var(--paper)' }}>
      <header style={{ padding: '14px 20px', borderBottom: '1px solid var(--rule)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.06em' }}>← WEEK 06 / 12</div>
        <div style={{ width: 22, height: 14, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ height: 1.5, background: 'var(--ink)' }}></div>
          <div style={{ height: 1.5, background: 'var(--ink)' }}></div>
          <div style={{ height: 1.5, background: 'var(--ink)' }}></div>
        </div>
      </header>

      <section style={{ padding: '32px 20px 28px', borderBottom: '1px solid var(--rule)' }}>
        <div className="week-num" style={{ fontSize: 64, lineHeight: 0.9 }}>06</div>
        <div className="section-label" style={{ marginTop: 12 }}>§ Personal tax</div>
        <h1 style={{ fontSize: 36, lineHeight: 1.02, margin: '10px 0 18px', letterSpacing: '-0.02em', fontWeight: 400 }}>
          Full Income Tax computation, with <span style={{ fontStyle: 'italic', color: 'var(--moss-deep)' }}>USC and PRSI.</span>
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink-2)' }}>
          Assemble bands, credits, USC and PRSI into one defensible computation — and know which Revenue page each figure came from.
        </p>
        <div style={{ border: '1px solid var(--rule)', padding: 14, background: 'var(--paper-2)', marginTop: 20, fontFamily: 'var(--mono)', fontSize: 12, lineHeight: 1.9, color: 'var(--ink-2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Reading</span><span>~3.0 hrs</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Spreadsheet</span><span>~2.5 hrs</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Quiz</span><span>~0.5 hrs</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--ink)', marginTop: 4, paddingTop: 4, fontWeight: 600, color: 'var(--ink)' }}><span>Total</span><span>6 hrs</span></div>
        </div>
      </section>

      <section style={{ padding: '40px 20px', borderBottom: '1px solid var(--rule)' }}>
        <div className="section-label">I. READING LIST</div>
        <h2 style={{ fontSize: 26, margin: '12px 0 16px', letterSpacing: '-0.02em', fontWeight: 400 }}>Read the source.</h2>
        <div style={{ borderTop: '1px solid var(--ink)' }}>
          {[
            { src: "Revenue", t: "Tax rates, bands & reliefs (2026)", min: "20" },
            { src: "Revenue", t: "How Income Tax is calculated", min: "25" },
            { src: "Revenue", t: "USC chart 2026", min: "15" },
            { src: "Gov.ie", t: "PRSI Class A rates", min: "10" },
            { src: "Statute Book", t: "TCA 1997, Part 2", min: "30" },
          ].map((r, i) => (
            <div key={i} style={{ padding: '14px 0', borderBottom: '1px solid var(--rule)', display: 'grid', gridTemplateColumns: '1fr 50px', gap: 12 }}>
              <div>
                <div className="mono" style={{ fontSize: 9, color: 'var(--moss-deep)', letterSpacing: '0.08em' }}>{r.src.toUpperCase()}</div>
                <div style={{ fontSize: 14, marginTop: 3, fontWeight: 500, lineHeight: 1.3 }}>{r.t}</div>
              </div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', textAlign: 'right' }}>{r.min} MIN</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '40px 20px', borderBottom: '1px solid var(--rule)', background: 'var(--paper-2)' }}>
        <div className="section-label">II. WORKED COMPUTATION</div>
        <h2 style={{ fontSize: 26, margin: '12px 0 16px', letterSpacing: '-0.02em', fontWeight: 400 }}>Build it yourself.</h2>
        <div style={{ background: 'var(--paper)', border: '1px solid var(--ink)' }}>
          <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--ink)', fontFamily: 'var(--serif)', fontSize: 14 }}>IT + USC + PRSI · 2026</div>
          <table className="ledger" style={{ fontSize: 11 }}>
            <tbody>
              <tr><td>Std band 20%</td><td className="num">€8,800</td></tr>
              <tr><td>Higher 40%</td><td className="num">€3,200</td></tr>
              <tr><td>Less credits</td><td className="num">(€4,000)</td></tr>
              <tr style={{ background: 'var(--paper-2)' }}><td>Income Tax</td><td className="num">€8,000</td></tr>
              <tr><td>USC</td><td className="num">€1,093</td></tr>
              <tr><td>PRSI</td><td className="num">€2,204</td></tr>
              <tr className="total"><td>Total</td><td className="num">€11,296</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section style={{ padding: '40px 20px', borderBottom: '1px solid var(--rule)' }}>
        <div className="section-label">III. SELF-QUIZ</div>
        <h2 style={{ fontSize: 26, margin: '12px 0 16px', letterSpacing: '-0.02em', fontWeight: 400 }}>Three questions.</h2>
        {[
          "What is the 2026 standard rate band for a single person?",
          "When does Class A PRSI rise to 4.35%?",
          "USC applies once income exceeds what amount?",
        ].map((q, i) => (
          <div key={i} style={{ padding: '16px 0', borderBottom: '1px solid var(--rule)' }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--moss-deep)' }}>Q{i+1}</div>
            <div style={{ fontSize: 14, marginTop: 4, fontWeight: 500 }}>{q}</div>
          </div>
        ))}
      </section>

      <section style={{ padding: '36px 20px', background: 'var(--ink)', color: 'var(--paper)' }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: '0.08em', color: 'oklch(0.7 0.06 145)' }}>NEXT WEEK ↓</div>
        <h2 style={{ fontSize: 26, margin: '6px 0 18px', letterSpacing: '-0.02em', fontWeight: 400, color: 'var(--paper)' }}>
          <span style={{ fontStyle: 'italic' }}>07.</span> VAT foundations
        </h2>
        <button style={{ background: 'var(--paper)', color: 'var(--ink)', border: 'none', padding: '12px 18px', fontSize: 14, fontWeight: 500, borderRadius: 4, width: '100%' }}>
          Continue →
        </button>
      </section>
    </div>
  );
}

window.DesktopModule = DesktopModule;
window.MobileModule = MobileModule;

// Calculator, Quiz, Module pages, Curriculum page, About page

// ---- Live tax calculator (2026 rates) ----
function calcTax(salary) {
  // Income Tax — single PAYE
  const band = 44000;
  const rate1 = Math.min(salary, band) * 0.20;
  const rate2 = Math.max(0, salary - band) * 0.40;
  const grossTax = rate1 + rate2;
  const credits = 4000; // personal + employee
  const incomeTax = Math.max(0, grossTax - credits);

  // USC (2026 illustrative)
  let usc = 0;
  if (salary > 13000) {
    usc += Math.min(salary, 12012) * 0.005;
    if (salary > 12012) usc += (Math.min(salary, 28700) - 12012) * 0.02;
    if (salary > 28700) usc += (Math.min(salary, 70044) - 28700) * 0.03;
    if (salary > 70044) usc += (salary - 70044) * 0.08;
  }

  // PRSI Class A blended ~4.2375% for 2026
  const prsi = salary * 0.042375;

  const total = incomeTax + usc + prsi;
  const net = salary - total;

  return { rate1, rate2, grossTax, credits, incomeTax, usc, prsi, total, net };
}

const fmt = (n) => '€' + n.toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function CalculatorPage({ go, isMobile }) {
  const [salary, setSalary] = useState(52000);
  const r = useMemo(() => calcTax(salary), [salary]);

  return (
    <div>
      <section style={{ borderBottom: '1px solid var(--rule)', padding: isMobile ? '32px 20px' : '64px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>WEEK 06 · LIVE CALCULATOR</div>
          <h1 style={{ fontSize: isMobile ? 36 : 60, lineHeight: 1.0, margin: '0 0 20px', letterSpacing: '-0.025em', fontWeight: 400 }}>
            Income Tax + USC + PRSI,<br/><span style={{ fontStyle: 'italic', color: 'var(--moss-deep)' }}>2026 rates.</span>
          </h1>
          <p style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 700, margin: 0 }}>
            Single PAYE employee, standard credits only. Adjust the salary slider — every figure recomputes against the 2026 bands and the blended PRSI Class A rate.
          </p>
        </div>
      </section>

      <section style={{ padding: isMobile ? '40px 20px' : '72px 40px', background: 'var(--paper-2)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr', gap: isMobile ? 32 : 56 }}>
          <div>
            <div style={{ background: 'var(--paper)', border: '1px solid var(--ink)', padding: isMobile ? 24 : 32 }}>
              <div className="eyebrow" style={{ color: 'var(--moss-deep)', marginBottom: 18 }}>GROSS ANNUAL SALARY</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? 56 : 72, lineHeight: 1, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>
                €{salary.toLocaleString('en-IE')}
              </div>
              <input
                type="range"
                min={15000}
                max={250000}
                step={1000}
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                style={{ width: '100%', marginTop: 24, accentColor: 'oklch(0.45 0.06 145)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', marginTop: 6 }}>
                <span>€15k</span><span>€250k</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 20 }}>
                {[25000, 35000, 52000, 80000, 120000, 200000].map(v => (
                  <button key={v} onClick={() => setSalary(v)} style={{
                    padding: '6px 12px', fontSize: 12, fontFamily: 'var(--mono)',
                    border: '1px solid var(--rule)', background: salary === v ? 'var(--ink)' : 'var(--paper)',
                    color: salary === v ? 'var(--paper)' : 'var(--ink-2)',
                    borderRadius: 3, cursor: 'pointer'
                  }}>€{(v/1000)}k</button>
                ))}
              </div>
            </div>

            <div style={{ background: 'var(--ink)', color: 'var(--paper)', padding: isMobile ? 20 : 28, marginTop: 16 }}>
              <div className="eyebrow" style={{ color: 'oklch(0.7 0.06 145)', marginBottom: 14 }}>NET TAKE-HOME (ANNUAL)</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? 40 : 52, lineHeight: 1, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
                {fmt(r.net)}
              </div>
              <div style={{ marginTop: 10, fontFamily: 'var(--mono)', fontSize: 12, color: 'oklch(0.75 0.02 250)' }}>
                ≈ {fmt(r.net / 12)} per month
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--paper)', border: '1px solid var(--ink)', boxShadow: '8px 8px 0 0 var(--moss-soft)' }}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--ink)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 18 }}>Computation worksheet</div>
              <span className="pill-tax pill-income">Income</span>
            </div>
            <table className="ledger" style={{ fontSize: isMobile ? 12 : 14 }}>
              <thead>
                <tr><th>Step</th><th>Working</th><th style={{textAlign:'right'}}>Amount</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Standard band</td>
                  <td className="num" style={{color:'var(--ink-3)'}}>{fmt(Math.min(salary, 44000))} × 20%</td>
                  <td className="num">{fmt(r.rate1)}</td>
                </tr>
                <tr>
                  <td>Higher rate</td>
                  <td className="num" style={{color:'var(--ink-3)'}}>{fmt(Math.max(0, salary - 44000))} × 40%</td>
                  <td className="num">{fmt(r.rate2)}</td>
                </tr>
                <tr>
                  <td>Less: tax credits</td>
                  <td className="num" style={{color:'var(--ink-3)'}}>Personal + Employee</td>
                  <td className="num">({fmt(r.credits)})</td>
                </tr>
                <tr style={{ background: 'var(--paper-2)' }}>
                  <td style={{fontWeight:500}}>Income Tax payable</td>
                  <td></td>
                  <td className="num" style={{fontWeight:600}}>{fmt(r.incomeTax)}</td>
                </tr>
                <tr><td>USC (progressive)</td><td className="num" style={{color:'var(--ink-3)'}}>0.5 / 2 / 3 / 8%</td><td className="num">{fmt(r.usc)}</td></tr>
                <tr><td>PRSI Class A (blended)</td><td className="num" style={{color:'var(--ink-3)'}}>~4.2375%</td><td className="num">{fmt(r.prsi)}</td></tr>
                <tr className="total"><td>Total deductions</td><td></td><td className="num">{fmt(r.total)}</td></tr>
              </tbody>
            </table>
            <div style={{ padding: '12px 20px', borderTop: '1px solid var(--rule)', fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--ink-3)', display: 'flex', justifyContent: 'space-between' }}>
              <span>SOURCES: REVENUE.IE · GOV.IE</span><span>v.2026.01</span>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1100, margin: '40px auto 0', padding: 20, background: 'var(--paper)', border: '1px dashed var(--rule)', fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--mono)', lineHeight: 1.6 }}>
          ILLUSTRATIVE ONLY · ASSUMES SINGLE PAYE EMPLOYEE, STANDARD CREDITS, NO OTHER INCOME. PRSI BLENDED ACROSS PRE/POST 1 OCT 2026 RATE CHANGE. NOT TAX ADVICE.
        </div>
      </section>

      <section style={{ padding: isMobile ? '32px 20px' : '48px 40px', borderTop: '1px solid var(--rule)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexDirection: isMobile ? 'column' : 'row' }}>
          <button className="btn btn-ghost" onClick={() => go('')} style={{ padding: '12px 20px', fontSize: 14, borderRadius: 4 }}>← Back to home</button>
          <button className="btn btn-primary" onClick={() => go('week/06')} style={{ padding: '12px 20px', fontSize: 14, borderRadius: 4 }}>Read Week 06 in full →</button>
        </div>
      </section>
    </div>
  );
}

// ---- Curriculum page ----
function CurriculumPage({ go, isMobile, progress }) {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? WEEKS : WEEKS.filter(w => w.tags.includes(filter));
  return (
    <div>
      <section style={{ borderBottom: '1px solid var(--rule)', padding: isMobile ? '32px 20px' : '64px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>§ FULL CURRICULUM</div>
          <h1 style={{ fontSize: isMobile ? 40 : 72, lineHeight: 1.0, margin: '0 0 20px', letterSpacing: '-0.025em', fontWeight: 400 }}>
            Twelve weeks,<br/><span style={{ fontStyle: 'italic', color: 'var(--moss-deep)' }}>start to finish.</span>
          </h1>
          <p style={{ fontSize: isMobile ? 15 : 17, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 700 }}>
            Every module links to Revenue's own pages, the Tax & Duty Manuals, and the underlying section of the Statute Book. Filter by tax head to see how the topics distribute.
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 28, flexWrap: 'wrap' }}>
            {['All', 'Income', 'VAT', 'CGT', 'CT', 'CAT'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: '8px 14px', fontSize: 12, fontFamily: 'var(--mono)', letterSpacing: '0.06em',
                border: '1px solid ' + (filter === f ? 'var(--ink)' : 'var(--rule)'),
                background: filter === f ? 'var(--ink)' : 'var(--paper)',
                color: filter === f ? 'var(--paper)' : 'var(--ink-2)',
                borderRadius: 3, cursor: 'pointer', textTransform: 'uppercase'
              }}>{f}</button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: isMobile ? '32px 20px' : '56px 40px', background: 'var(--paper-2)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', borderTop: '1px solid var(--ink)' }}>
          {filtered.map(w => <WeekRow key={w.n} w={w} go={go} isMobile={isMobile} done={progress.isDone(w.n)} />)}
        </div>
      </section>
    </div>
  );
}

// ---- Week reading view (for any week) ----
function WeekPage({ go, isMobile, weekNum, progress }) {
  const w = WEEKS.find(x => x.n === weekNum);
  if (!w) return <div style={{ padding: 64, textAlign: 'center' }}>Week not found.</div>;

  const idx = WEEKS.findIndex(x => x.n === weekNum);
  const next = WEEKS[idx + 1];
  const prev = WEEKS[idx - 1];

  // Generic readings & quizzes per week (with specifics for week 6 & others)
  const readings = (READINGS[weekNum] || READINGS.default);
  const quiz = (QUIZZES[weekNum] || QUIZZES.default);

  return (
    <div>
      <section style={{ borderBottom: '1px solid var(--rule)', padding: isMobile ? '24px 20px' : '40px 40px', background: 'var(--paper)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => go('curriculum')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.06em' }}>
            ← ALL MODULES
          </button>
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.06em' }}>
            WEEK {w.n} OF 12 · {w.area.toUpperCase()}
          </div>
        </div>
      </section>

      <section style={{ borderBottom: '1px solid var(--rule)', padding: isMobile ? '32px 20px' : '64px 40px 56px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '100px 1fr 280px', gap: isMobile ? 16 : 40, alignItems: 'start' }}>
          <div className="week-num" style={{ fontSize: isMobile ? 64 : 88, lineHeight: 0.9 }}>{w.n}</div>
          <div>
            <div className="section-label">§ {w.area}</div>
            <h1 style={{ fontSize: isMobile ? 36 : 56, lineHeight: 1.0, margin: '10px 0 18px', letterSpacing: '-0.025em', fontWeight: 400 }}>
              {w.title.split(' ').slice(0, 4).join(' ')}<br/>
              <span style={{ fontStyle: 'italic', color: 'var(--moss-deep)' }}>{w.title.split(' ').slice(4).join(' ')}</span>
            </h1>
            <p style={{ fontSize: isMobile ? 16 : 18, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 720, margin: 0 }}>{w.blurb}</p>
            <div style={{ marginTop: 18, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {w.tags.map(t => <span key={t} className={`pill-tax ${TAG_PILL[t]}`}>{t}</span>)}
              <span className="chip" style={{ fontSize: 11 }}>{w.hours} hours total</span>
            </div>
          </div>
          <aside style={{ border: '1px solid var(--rule)', padding: 18, background: 'var(--paper-2)' }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>THIS WEEK</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, lineHeight: 1.9, color: 'var(--ink-2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Reading</span><span>~3.0 hrs</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Spreadsheet</span><span>~2.5 hrs</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Quiz</span><span>~0.5 hrs</span></div>
              <div className="leader" style={{ margin: '6px 0' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--ink)' }}><span>Total</span><span>{w.hours.split('–')[0]}–{w.hours.split('–')[1] || w.hours} hrs</span></div>
            </div>
            <button
              className={progress.isDone(w.n) ? 'btn btn-ghost' : 'btn btn-moss'}
              onClick={() => progress.toggle(w.n)}
              style={{ width: '100%', marginTop: 16, padding: '10px', fontSize: 13, borderRadius: 4 }}>
              {progress.isDone(w.n) ? '✓ Completed — undo' : 'Mark week complete'}
            </button>
          </aside>
        </div>
      </section>

      <section style={{ borderBottom: '1px solid var(--rule)', padding: isMobile ? '40px 20px' : '64px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? 24 : 56 }}>
          <div>
            <div className="section-label">I. READING LIST</div>
            <h2 style={{ fontSize: isMobile ? 28 : 36, margin: '12px 0 0', letterSpacing: '-0.02em', fontWeight: 400 }}>Read the source.</h2>
          </div>
          <div style={{ borderTop: '1px solid var(--ink)' }}>
            {readings.map((r, i) => (
              <div key={i} style={{ padding: '20px 0', borderBottom: '1px solid var(--rule)', display: 'grid', gridTemplateColumns: isMobile ? '1fr 60px' : '110px 1fr 70px', gap: isMobile ? 12 : 20, alignItems: 'baseline' }}>
                {!isMobile && <div className="mono" style={{ fontSize: 11, color: 'var(--moss-deep)', letterSpacing: '0.06em' }}>{r.src.toUpperCase()}</div>}
                <div>
                  {isMobile && <div className="mono" style={{ fontSize: 9, color: 'var(--moss-deep)', letterSpacing: '0.08em', marginBottom: 4 }}>{r.src.toUpperCase()}</div>}
                  <h3 style={{ fontSize: isMobile ? 15 : 18, margin: 0, letterSpacing: '-0.005em', fontWeight: 500, lineHeight: 1.3 }}>{r.t}</h3>
                  {!isMobile && <p style={{ fontSize: 13, color: 'var(--ink-2)', margin: '4px 0 0', lineHeight: 1.5 }}>{r.d}</p>}
                </div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', textAlign: 'right' }}>{r.min} MIN</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {weekNum === '06' && (
        <section style={{ borderBottom: '1px solid var(--rule)', padding: isMobile ? '40px 20px' : '64px 40px', background: 'var(--paper-2)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div className="section-label">II. WORKED COMPUTATION</div>
            <h2 style={{ fontSize: isMobile ? 28 : 36, margin: '12px 0 24px', letterSpacing: '-0.02em', fontWeight: 400 }}>Open the live calculator.</h2>
            <button className="btn btn-primary" onClick={() => go('calculator')} style={{ padding: '14px 22px', fontSize: 14, borderRadius: 4 }}>
              Try the IT + USC + PRSI calculator →
            </button>
          </div>
        </section>
      )}

      <section style={{ borderBottom: '1px solid var(--rule)', padding: isMobile ? '40px 20px' : '64px 40px' }}>
        <Quiz quiz={quiz} isMobile={isMobile} />
      </section>

      <section style={{ padding: isMobile ? '32px 20px' : '56px 40px', background: 'var(--ink)', color: 'var(--paper)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexDirection: isMobile ? 'column' : 'row' }}>
          {prev ? (
            <button onClick={() => go(`week/${prev.n}`)} style={{ background: 'transparent', border: '1px solid oklch(0.4 0.01 250)', color: 'var(--paper)', padding: '12px 20px', fontSize: 14, borderRadius: 4, cursor: 'pointer' }}>
              ← {prev.n}. {prev.title.slice(0, 28)}{prev.title.length > 28 ? '…' : ''}
            </button>
          ) : <div></div>}
          {next ? (
            <button onClick={() => go(`week/${next.n}`)} style={{ background: 'var(--paper)', color: 'var(--ink)', border: 'none', padding: '14px 24px', fontSize: 14, fontWeight: 500, borderRadius: 4, cursor: 'pointer' }}>
              <span style={{ fontStyle: 'italic', fontFamily: 'var(--serif)' }}>{next.n}.</span> {next.title.slice(0, 36)}{next.title.length > 36 ? '…' : ''} →
            </button>
          ) : (
            <button onClick={() => go('')} style={{ background: 'var(--moss)', color: 'var(--paper)', border: 'none', padding: '14px 24px', fontSize: 14, fontWeight: 500, borderRadius: 4, cursor: 'pointer' }}>
              Course complete · Back to home →
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

function Quiz({ quiz, isMobile }) {
  const [revealed, setRevealed] = useState({});
  const [picked, setPicked] = useState({});
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? 24 : 56 }}>
      <div>
        <div className="section-label">III. SELF-QUIZ</div>
        <h2 style={{ fontSize: isMobile ? 28 : 36, margin: '12px 0 0', letterSpacing: '-0.02em', fontWeight: 400 }}>{quiz.length} questions.</h2>
      </div>
      <div>
        {quiz.map((q, i) => (
          <div key={i} style={{ padding: '20px 0', borderBottom: '1px solid var(--rule)' }}>
            <div className="mono" style={{ fontSize: 11, color: 'var(--moss-deep)', letterSpacing: '0.06em' }}>Q{i+1}</div>
            <h3 style={{ fontSize: isMobile ? 15 : 18, margin: '6px 0 12px', fontWeight: 500, letterSpacing: '-0.005em', lineHeight: 1.4 }}>{q.q}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {q.options.map((opt, j) => {
                const isPicked = picked[i] === j;
                const isCorrect = q.correct === j;
                const showResult = revealed[i];
                return (
                  <button key={j} onClick={() => !showResult && setPicked(p => ({ ...p, [i]: j }))} style={{
                    textAlign: 'left', padding: '10px 14px', fontSize: 13,
                    border: '1px solid ' + (showResult && isCorrect ? 'var(--moss)' : showResult && isPicked && !isCorrect ? 'var(--clay)' : isPicked ? 'var(--ink)' : 'var(--rule)'),
                    background: showResult && isCorrect ? 'var(--moss-soft)' : showResult && isPicked && !isCorrect ? 'var(--clay-soft)' : isPicked ? 'var(--paper-2)' : 'var(--paper)',
                    color: 'var(--ink)', borderRadius: 4, cursor: showResult ? 'default' : 'pointer',
                    fontFamily: 'var(--sans)',
                  }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', marginRight: 10 }}>{String.fromCharCode(65+j)}.</span>
                    {opt}
                    {showResult && isCorrect && <span style={{ float: 'right', color: 'var(--moss-deep)' }}>✓</span>}
                  </button>
                );
              })}
            </div>
            {!revealed[i] && picked[i] !== undefined && (
              <button onClick={() => setRevealed(r => ({ ...r, [i]: true }))} style={{
                marginTop: 10, padding: '6px 12px', fontSize: 12, fontFamily: 'var(--serif)', fontStyle: 'italic',
                background: 'transparent', border: 'none', color: 'var(--moss-deep)', cursor: 'pointer'
              }}>Check answer →</button>
            )}
            {revealed[i] && (
              <p style={{ fontSize: 13, color: 'var(--ink-2)', margin: '12px 0 0', lineHeight: 1.55, padding: '12px 14px', background: 'var(--paper-2)', borderLeft: '2px solid var(--moss)' }}>
                {q.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Reading & quiz banks ----
const READINGS = {
  '01': [
    { src: "Revenue", t: "How to know if you are resident for tax purposes", d: "The 183 / 280 day tests and the 30-day minimum rule.", min: "20" },
    { src: "Revenue", t: "Tax residence overview", d: "Chargeability concepts and links to domicile / remittance.", min: "20" },
    { src: "Citizens Info", t: "Tax residence and domicile in Ireland", d: "Plain-English cross-check.", min: "15" },
    { src: "Statute Book", t: "TCA 1997, Part 34 — residence", d: "The legal anchor under the guidance.", min: "30" },
  ],
  '06': [
    { src: "Revenue", t: "Tax rates, bands and reliefs (2026)", d: "Standard rate band, personal credits, employee credit. Print this.", min: "20" },
    { src: "Revenue", t: "How your Income Tax is calculated", d: "Order of operations: bands → credits → liability.", min: "25" },
    { src: "Revenue", t: "USC chart — 2026 thresholds & rates", d: "Progressive 0.5 / 2 / 3% bands. €13,000 entry threshold.", min: "15" },
    { src: "Gov.ie", t: "PRSI Class A contribution rates", d: "4.2% to 4.35% rate change effective 1 October 2026.", min: "10" },
    { src: "Statute Book", t: "Taxes Consolidation Act 1997, Part 2", d: "The charging structure that everything implements.", min: "30" },
  ],
  '07': [
    { src: "Revenue", t: "VAT thresholds (goods & services)", d: "When you must register and when you may.", min: "15" },
    { src: "Revenue", t: "Current VAT rates", d: "Standard, reduced, second reduced, zero.", min: "10" },
    { src: "Revenue", t: "Completing the VAT3 return", d: "T1, T2, T3, T4 field definitions.", min: "30" },
    { src: "Revenue", t: "VAT due dates", d: "19th of following month; ROS extension to 23rd.", min: "10" },
  ],
  '12': [
    { src: "Revenue", t: "CAT group thresholds", d: "Group A €400,000 (post 2 Oct 2024), B €40,000, C €20,000.", min: "20" },
    { src: "Revenue", t: "Small gift exemption", d: "€3,000 per disponer per calendar year.", min: "10" },
    { src: "Revenue", t: "Dwelling house exemption", d: "Qualifying conditions and the residence test.", min: "20" },
    { src: "Revenue", t: "Agricultural & business relief", d: "90% reduction, subject to conditions.", min: "30" },
  ],
  default: [
    { src: "Revenue", t: "Topic overview & worked examples", d: "The main Revenue guidance page for this week's tax head.", min: "25" },
    { src: "Revenue", t: "Tax & Duty Manual — operational guidance", d: "How Revenue interpret and apply the rule in practice.", min: "30" },
    { src: "Citizens Info", t: "Plain-English explainer", d: "A second perspective in everyday language.", min: "15" },
    { src: "Statute Book", t: "Underlying TCA / VATCA / CATCA section", d: "The legal text. Skim, don't memorise.", min: "20" },
  ],
};

const QUIZZES = {
  '01': [
    { q: "What day-count makes you Irish tax resident under the current-year test?", options: ["Presence for 90 days or more", "Presence for 183 days or more", "Presence for 280 days or more", "Any presence in the year"], correct: 1, a: "183 days or more in a single tax year, per Revenue's residence guidance. The 280-day test combines two consecutive years." },
    { q: "When do you become ordinarily resident?", options: ["After 1 year of residence", "After 3 consecutive resident years, from start of year 4", "Immediately on arrival", "Only if you intend to stay permanently"], correct: 1, a: "After three consecutive tax years of residence, you are ordinarily resident from the start of the fourth." },
    { q: "If you are tax resident but not domiciled in Ireland, what may apply to foreign income?", options: ["No tax at all", "The remittance basis", "Worldwide income basis only", "A flat 10% rate"], correct: 1, a: "The remittance basis: Irish tax on foreign income only to the extent it is remitted to Ireland." },
  ],
  '06': [
    { q: "What is the 2026 standard rate band for a single person?", options: ["€38,000 at 20%", "€42,000 at 20%", "€44,000 at 20%", "€50,000 at 20%"], correct: 2, a: "€44,000 at 20%, balance at 40%, per Revenue's 2026 tax-relief charts." },
    { q: "From what date does an employee Class A PRSI rate of 4.35% apply?", options: ["1 January 2026", "1 April 2026", "1 October 2026", "1 January 2027"], correct: 2, a: "From 1 October 2026, per the gov.ie PRSI contribution rates table." },
    { q: "USC applies once chargeable income exceeds what amount?", options: ["€10,000", "€13,000", "€18,000", "€22,000"], correct: 1, a: "€13,000 — below this threshold no USC is charged for the year (subject to detailed rules in the Notes for Guidance)." },
  ],
  '07': [
    { q: "What does VAT3 field T1 represent?", options: ["VAT reclaimable on purchases", "VAT on sales", "Net repayable", "Total turnover"], correct: 1, a: "T1 = VAT due on sales (and certain acquisitions/imports). T2 is reclaimable on purchases." },
    { q: "If T2 exceeds T1, where is the difference shown?", options: ["At T3 as payable", "At T4 as repayable", "At T1 as nil", "Carried forward only"], correct: 1, a: "At T4 — VAT is repayable to you when input VAT exceeds output VAT." },
    { q: "What is the VAT3 filing deadline for ROS filers?", options: ["The 9th of the following month", "The 19th of the following month", "The 23rd of the following month", "The last day of the following month"], correct: 2, a: "The 23rd, extended from the standard 19th-of-the-month deadline for ROS filers." },
  ],
  '12': [
    { q: "What is the current Group A CAT threshold (post 2 October 2024)?", options: ["€335,000", "€400,000", "€500,000", "€32,500"], correct: 1, a: "€400,000 for benefits taken on or after 2 October 2024. Group B is €40,000 and Group C is €20,000." },
    { q: "What is the annual small gift exemption per disponer?", options: ["€1,000", "€3,000", "€5,000", "€10,000"], correct: 1, a: "€3,000 per disponer per calendar year, in addition to (and not eroding) the group threshold." },
    { q: "What reduction does agricultural / business relief give to taxable value?", options: ["25%", "50%", "75%", "90%"], correct: 3, a: "A 90% reduction in the taxable value of qualifying agricultural property or relevant business property, subject to detailed conditions." },
  ],
  default: [
    { q: "Which is the most authoritative source for an Irish tax rule?", options: ["A textbook explanation", "A Revenue Tax & Duty Manual", "The underlying legislation (TCA, VATCA, CATCA)", "A LinkedIn post"], correct: 2, a: "The legislation itself is the source of truth. Revenue manuals are operational guidance and helpful, but not definitive legal interpretation." },
    { q: "If Revenue guidance and the Acts appear to conflict, which prevails?", options: ["Revenue guidance always", "The Act, ultimately", "Whichever was published more recently", "It depends on the year"], correct: 1, a: "Statute prevails. Revenue manuals state they are guidance and not a substitute for the legislation." },
    { q: "What's the best habit when reading any tax guidance page?", options: ["Memorise the worked example", "Note the date, version and source URL", "Print and forget", "Skip examples"], correct: 1, a: "Source-discipline: capture the URL, the date you read it, and the version. Tax rates change annually — yesterday's correct rule can be wrong tomorrow." },
  ],
};

// ---- About page ----
function AboutPage({ go, isMobile }) {
  return (
    <div>
      <section style={{ borderBottom: '1px solid var(--rule)', padding: isMobile ? '40px 20px' : '88px 40px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>§ ABOUT</div>
          <h1 style={{ fontSize: isMobile ? 40 : 64, lineHeight: 1.0, margin: '0 0 28px', letterSpacing: '-0.025em', fontWeight: 400 }}>
            A free, open course<br/>built on <span style={{ fontStyle: 'italic', color: 'var(--moss-deep)' }}>public sources.</span>
          </h1>
          <div style={{ fontSize: isMobile ? 16 : 18, lineHeight: 1.7, color: 'var(--ink-2)' }}>
            <p>This is a self-paced curriculum that mirrors the topic map of well-known Irish taxation diplomas — Income Tax, USC and PRSI; VAT; CGT; Corporation Tax; CAT — without copying any proprietary teaching material.</p>
            <p>Every reading links directly to <em>Revenue.ie</em>, <em>Citizens Information</em>, or the <em>Irish Statute Book</em>. The course is released under <strong>CC BY 4.0</strong>; the Revenue and Citizens Information content it links to is re-usable under the Public Sector Information licence.</p>
            <p>It is <strong>not</strong> an accredited diploma. It does not issue a credential. It does not replace professional advice. What it does is build the habit of reading tax guidance from the source, compressing the rule onto one page, and proving you understand it by working a real computation.</p>
            <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--ink)', fontSize: isMobile ? 18 : 22, marginTop: 32, paddingLeft: 16, borderLeft: '2px solid var(--moss)' }}>
              Tax law is dense, but it is not magic. It rewards repetition and source discipline.
            </p>
          </div>
          <div style={{ marginTop: 40, display: 'flex', gap: 10, flexDirection: isMobile ? 'column' : 'row' }}>
            <button className="btn btn-primary" onClick={() => go('week/01')} style={{ padding: '14px 22px', fontSize: 14, borderRadius: 4 }}>Begin Week 01 →</button>
            <button className="btn btn-ghost" onClick={() => go('curriculum')} style={{ padding: '14px 22px', fontSize: 14, borderRadius: 4 }}>See the full curriculum</button>
          </div>
        </div>
      </section>
    </div>
  );
}

window.CalculatorPage = CalculatorPage;
window.CurriculumPage = CurriculumPage;
window.WeekPage = WeekPage;
window.AboutPage = AboutPage;

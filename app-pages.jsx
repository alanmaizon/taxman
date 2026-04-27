// Calculator, Quiz, Module pages, Curriculum page, About page

// ---- Live tax calculator (2026 rates) ----
function calcTax(salary) {
  const band = 44000;
  const rate1 = Math.min(salary, band) * 0.20;
  const rate2 = Math.max(0, salary - band) * 0.40;
  const grossTax = rate1 + rate2;
  const credits = 4000;
  const incomeTax = Math.max(0, grossTax - credits);

  let usc = 0;
  if (salary > 13000) {
    usc += Math.min(salary, 12012) * 0.005;
    if (salary > 12012) usc += (Math.min(salary, 28700) - 12012) * 0.02;
    if (salary > 28700) usc += (Math.min(salary, 70044) - 28700) * 0.03;
    if (salary > 70044) usc += (salary - 70044) * 0.08;
  }

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

// ---- Worked ledger component ----
function WorkedLedger({ comp, isMobile }) {
  const tagClass = { Income: 'pill-income', VAT: 'pill-vat', CGT: 'pill-cgt', CT: 'pill-ct', CAT: 'pill-cat' };
  return (
    <div style={{ background: 'var(--paper)', border: '1px solid var(--ink)', boxShadow: isMobile ? '4px 4px 0 0 var(--moss-soft)' : '8px 8px 0 0 var(--moss-soft)' }}>
      <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--ink)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontFamily: 'var(--serif)', fontSize: isMobile ? 14 : 17 }}>{comp.title}</div>
        <span className={`pill-tax ${tagClass[comp.tag] || 'pill-income'}`}>{comp.tag}</span>
      </div>
      <table className="ledger" style={{ fontSize: isMobile ? 12 : 14 }}>
        <tbody>
          {comp.rows.map((row, i) => (
            <tr key={i}
              className={row.isTotal ? 'total' : ''}
              style={row.isSub ? { background: 'var(--paper-2)' } : {}}>
              <td style={row.isSub || row.isTotal ? { fontWeight: 500 } : {}}>{row.label}</td>
              {!isMobile && <td className="num" style={{ color: 'var(--ink-3)' }}>{row.working || ''}</td>}
              <td className="num" style={row.isSub || row.isTotal ? { fontWeight: 600 } : {}}>{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {comp.note && (
        <div style={{ padding: '10px 20px', borderTop: '1px solid var(--rule)', fontSize: 11, fontFamily: 'var(--mono)', color: 'var(--ink-3)', lineHeight: 1.65 }}>
          {comp.note}
        </div>
      )}
    </div>
  );
}

// ---- Week reading view ----
function WeekPage({ go, isMobile, weekNum, progress }) {
  const w = WEEKS.find(x => x.n === weekNum);
  if (!w) return <div style={{ padding: 64, textAlign: 'center' }}>Week not found.</div>;

  const idx = WEEKS.findIndex(x => x.n === weekNum);
  const next = WEEKS[idx + 1];
  const prev = WEEKS[idx - 1];

  const readings = READINGS[weekNum] || READINGS.default;
  const quiz = QUIZZES[weekNum] || QUIZZES.default;
  const comp = COMPUTATIONS[weekNum];
  const hasComp = comp || weekNum === '06';

  return (
    <div>
      {/* Breadcrumb */}
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

      {/* Hero */}
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
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--ink)' }}><span>Total</span><span>{w.hours} hrs</span></div>
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

      {/* I. Reading list */}
      <section style={{ borderBottom: '1px solid var(--rule)', padding: isMobile ? '40px 20px' : '64px 40px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? 24 : 56 }}>
          <div>
            <div className="section-label">I. READING LIST</div>
            <h2 style={{ fontSize: isMobile ? 28 : 36, margin: '12px 0 0', letterSpacing: '-0.02em', fontWeight: 400 }}>Read the source.</h2>
          </div>
          <div style={{ borderTop: '1px solid var(--ink)' }}>
            {readings.map((r, i) => (
              <div key={i} style={{ padding: '20px 0', borderBottom: '1px solid var(--rule)', display: 'grid', gridTemplateColumns: isMobile ? '1fr 56px' : '110px 1fr 60px', gap: isMobile ? 12 : 20, alignItems: 'baseline' }}>
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

      {/* II. Worked computation */}
      {hasComp && (
        <section style={{ borderBottom: '1px solid var(--rule)', padding: isMobile ? '40px 20px' : '64px 40px', background: 'var(--paper-2)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? 24 : 56 }}>
            <div>
              <div className="section-label">II. WORKED COMPUTATION</div>
              <h2 style={{ fontSize: isMobile ? 28 : 36, margin: '12px 0 12px', letterSpacing: '-0.02em', fontWeight: 400 }}>Build it yourself.</h2>
              <p style={{ fontSize: isMobile ? 13 : 14, color: 'var(--ink-2)', lineHeight: 1.6, margin: 0 }}>
                {weekNum === '06'
                  ? 'Single PAYE employee, gross €52,000, standard credits only. Try the interactive calculator or replicate in a spreadsheet.'
                  : comp.subtitle}
              </p>
            </div>
            <div>
              {weekNum === '06' ? (
                <div>
                  <WorkedLedger isMobile={isMobile} comp={{
                    title: "Income Tax + USC + PRSI · 2026",
                    tag: "Income",
                    rows: [
                      { label: "Standard band", working: "€44,000 × 20%", amount: "€8,800" },
                      { label: "Higher rate", working: "€8,000 × 40%", amount: "€3,200" },
                      { label: "Less: credits (personal + employee)", working: "—", amount: "(€4,000)" },
                      { label: "Income Tax payable", working: "", amount: "€8,000", isSub: true },
                      { label: "USC (progressive)", working: "0.5 / 2 / 3%", amount: "€1,093" },
                      { label: "PRSI Class A (blended)", working: "~4.2375%", amount: "€2,204" },
                      { label: "Total deductions", working: "", amount: "€11,297", isTotal: true },
                    ],
                    note: "ILLUSTRATIVE · SINGLE PAYE, STANDARD CREDITS, 2026 RATES. NOT TAX ADVICE.",
                  }} />
                  <button className="btn btn-primary" onClick={() => go('calculator')}
                    style={{ marginTop: 12, padding: '12px 20px', fontSize: 13, borderRadius: 4, width: '100%' }}>
                    Try the interactive calculator →
                  </button>
                </div>
              ) : (
                <WorkedLedger comp={comp} isMobile={isMobile} />
              )}
            </div>
          </div>
        </section>
      )}

      {/* III. Self-quiz */}
      <section style={{ borderBottom: '1px solid var(--rule)', padding: isMobile ? '40px 20px' : '64px 40px' }}>
        <Quiz quiz={quiz} isMobile={isMobile} />
      </section>

      {/* Navigation */}
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

// ---- Data: readings ----
const READINGS = {
  '01': [
    { src: "Revenue", t: "How to know if you are resident for tax purposes", d: "The 183 / 280 day tests and the 30-day minimum rule.", min: "20" },
    { src: "Revenue", t: "Tax residence overview", d: "Chargeability concepts and links to domicile / remittance basis.", min: "20" },
    { src: "Citizens Info", t: "Tax residence and domicile in Ireland", d: "Plain-English cross-check on the same rules.", min: "15" },
    { src: "Statute Book", t: "TCA 1997, Part 34 — residence provisions", d: "The legal anchor under the Revenue guidance.", min: "30" },
  ],
  '02': [
    { src: "Revenue", t: "Classification of activities as trading", d: "The trade concept and badges of trade. Why category decides everything.", min: "25" },
    { src: "Revenue", t: "Rental income — Case V overview", d: "How rental sits in the Schedule D framework; section 97 TCA context.", min: "20" },
    { src: "Revenue", t: "Dividend income overview", d: "Treatment for individuals and links to self-assessment thresholds.", min: "15" },
    { src: "Statute Book", t: "TCA 1997 — definitions and charging structure", d: "The legal base for the schedule / case system.", min: "20" },
  ],
  '03': [
    { src: "Revenue", t: "A guide to self-assessment / Pay and File", d: "Overall compliance workflow; Form 11 and the 31 October deadline.", min: "20" },
    { src: "Revenue", t: "Capital allowances — plant & machinery", d: "12.5% over 8 years. How allowances replace depreciation in the tax computation.", min: "30" },
    { src: "Revenue", t: "Tax & Duty Manual — trading deductions", d: "Revenue's operational guidance on allowable vs disallowed expenses.", min: "25" },
    { src: "Statute Book", t: "TCA 1997 — capital allowances framework", d: "The legal structure behind the rates. Use Notes for Guidance to navigate.", min: "20" },
  ],
  '04': [
    { src: "Revenue", t: "PAYE — how it works", d: "Your employer deducts Income Tax each time you are paid. The system overview.", min: "15" },
    { src: "Revenue", t: "Flat Rate Expenses (FRE)", d: "Tools, uniforms, statutory registration fees. What qualifies and how to claim.", min: "20" },
    { src: "Revenue", t: "Employer-provided cars — BIK", d: "Cash-equivalent calculation, OMV, and the km-band rate table.", min: "30" },
    { src: "Revenue", t: "BIK exemptions — electric vehicles", d: "Nil/reduced BIK rules for EVs and links to the current thresholds.", min: "15" },
  ],
  '05': [
    { src: "Revenue", t: "Termination lump sums — basic exemption & SCSB", d: "The €10,160 + €765/year formula and the SCSB alternative.", min: "25" },
    { src: "Revenue", t: "Rental profit and losses", d: "Gross rent less allowable expenses. Property-by-property computation.", min: "25" },
    { src: "Revenue", t: "DIRT — deposit interest retention tax", d: "33% rate deducted at source. Who pays, who is exempt.", min: "15" },
    { src: "Revenue", t: "Pension contribution relief limits", d: "Age-related % limits and the annual earnings cap.", min: "20" },
  ],
  '06': [
    { src: "Revenue", t: "Tax rates, bands and reliefs (2026)", d: "Standard rate band, personal credits, employee credit. Print this.", min: "20" },
    { src: "Revenue", t: "How your Income Tax is calculated", d: "Order of operations: bands → credits → liability.", min: "25" },
    { src: "Revenue", t: "USC chart — 2026 thresholds & rates", d: "Progressive 0.5 / 2 / 3% bands. €13,000 entry threshold.", min: "15" },
    { src: "Gov.ie", t: "PRSI Class A contribution rates", d: "4.2% to 4.35% rate change effective 1 October 2026.", min: "10" },
    { src: "Statute Book", t: "Taxes Consolidation Act 1997, Part 2", d: "The charging structure that everything above implements.", min: "30" },
  ],
  '07': [
    { src: "Revenue", t: "VAT thresholds (goods & services)", d: "When you must register and when you may register voluntarily.", min: "15" },
    { src: "Revenue", t: "Current VAT rates", d: "Standard 23%, reduced 13.5%, second reduced 9%, zero.", min: "10" },
    { src: "Revenue", t: "Completing the VAT3 return", d: "T1, T2, T3, T4 field definitions and the E-fields for goods movements.", min: "30" },
    { src: "Revenue", t: "VAT due dates", d: "19th of following month; ROS extension to 23rd.", min: "10" },
  ],
  '08': [
    { src: "Revenue", t: "How to calculate CGT", d: "Proceeds less allowable costs = gain. Order of operations and examples.", min: "25" },
    { src: "Revenue", t: "What is exempt from CGT?", d: "The €1,270 annual personal exemption and categories of exempt disposal.", min: "15" },
    { src: "Revenue", t: "When and how do you pay and file CGT?", d: "15 Dec / 31 Jan payment windows. Return filed 31 Oct of following year.", min: "15" },
    { src: "Revenue", t: "CG50A clearance certificate", d: "When it is needed (property > €500,000) and how to apply via eCG50.", min: "15" },
  ],
  '09': [
    { src: "Revenue", t: "Credit for CGT against CAT", d: "When both taxes arise on the same asset, a CGT credit may reduce CAT.", min: "20" },
    { src: "Revenue", t: "CAT manual — CGT credit guidance", d: "Technical detail: limits on the credit and the order of set-off.", min: "25" },
    { src: "Revenue", t: "Principal private residence (PPR) relief", d: "Conditions, periods of absence, and how to compute partial PPR.", min: "20" },
    { src: "Revenue", t: "CGT pay and file rules", d: "Even if no tax is due after reliefs, the filing obligation still applies.", min: "10" },
  ],
  '10': [
    { src: "Revenue", t: "Corporation Tax — basis of charge", d: "12.5% on trading income; 25% on non-trading / excepted trade income.", min: "20" },
    { src: "Revenue", t: "Capital allowances — company perspective", d: "Same 12.5% rate as sole traders. Integrated with the CT computation bridge.", min: "20" },
    { src: "Revenue", t: "CT payment and filing", d: "Nine months after AP end; 23rd of the ninth month for ROS filers.", min: "20" },
    { src: "Revenue", t: "CT1 form and preliminary tax", d: "CT1 structure and the small-company preliminary tax rule (90% of prior year).", min: "20" },
  ],
  '11': [
    { src: "Revenue", t: "Trading losses — offset options", d: "Same-year offset, carry-back to prior AP, carry-forward. Claim mechanics.", min: "25" },
    { src: "Revenue", t: "Group Relief — claim and surrender", d: "How losses are surrendered within a group; the two-year claim window.", min: "25" },
    { src: "Revenue", t: "Close company surcharge", d: "20% on undistributed estate/investment income. Reduced if distributed within 18 months.", min: "20" },
    { src: "Statute Book", t: "TCA 1997 — losses provisions", d: "The legal framework. Revenue's Trading Losses manual is the operational guide.", min: "15" },
  ],
  '12': [
    { src: "Revenue", t: "CAT group thresholds", d: "Group A €400,000 (post 2 Oct 2024), Group B €40,000, Group C €20,000.", min: "20" },
    { src: "Revenue", t: "Small gift exemption & spouse exemption", d: "€3,000 per disponer per year. Spouse / civil partner: fully exempt.", min: "15" },
    { src: "Revenue", t: "Dwelling house exemption", d: "Conditions: recipient must reside there for 3 years and have no other dwelling.", min: "20" },
    { src: "Revenue", t: "Agricultural & business relief", d: "90% reduction on qualifying assets, subject to active-farmer / owner-manager test.", min: "25" },
    { src: "Revenue", t: "CAT pay and file dates", d: "Valuation date Jan–Aug: pay by 31 Oct. Sep–Dec: pay by 31 Jan following.", min: "10" },
  ],
  default: [
    { src: "Revenue", t: "Topic overview & worked examples", d: "The main Revenue guidance page for this week's tax head.", min: "25" },
    { src: "Revenue", t: "Tax & Duty Manual — operational guidance", d: "How Revenue interpret and apply the rule in practice.", min: "30" },
    { src: "Citizens Info", t: "Plain-English explainer", d: "A second perspective in everyday language.", min: "15" },
    { src: "Statute Book", t: "Underlying legislation", d: "TCA / VATCA / CATCA section. Skim for structure, not memorisation.", min: "20" },
  ],
};

// ---- Data: quizzes ----
const QUIZZES = {
  '01': [
    { q: "What day-count makes you Irish tax resident under the current-year test?", options: ["90 days or more", "183 days or more", "280 days or more", "Any presence in the year"], correct: 1, a: "183 days or more in a single tax year. The 280-day test spans two consecutive years and operates as a look-back test." },
    { q: "When do you become ordinarily resident in Ireland?", options: ["After 1 year of residence", "After 3 consecutive resident years, from the start of year 4", "Immediately on arrival", "Only if you declare permanent intent"], correct: 1, a: "After three consecutive tax years of residence you are ordinarily resident from the start of the fourth tax year — this status affects chargeability even after you leave Ireland." },
    { q: "If you are tax resident but not domiciled in Ireland, what basis may apply to foreign income?", options: ["No Irish tax at all", "The remittance basis", "The worldwide income basis only", "A flat 10% rate"], correct: 1, a: "The remittance basis — Irish tax on foreign income arises only to the extent that income is remitted (brought) to Ireland." },
  ],
  '02': [
    { q: "What CT rate applies to trading income for an Irish resident company?", options: ["10%", "12.5%", "20%", "25%"], correct: 1, a: "12.5% on trading income. 25% applies to certain non-trading and excepted-trade income, per Revenue's CT basis-of-charge page." },
    { q: "True or false: rental profits in Ireland are generally computed property-by-property under Case V.", options: ["True", "False", "Only for commercial property", "Only where rent exceeds €10,000"], correct: 0, a: "True. Case V requires a separate computation for each rental property, though a loss on one property can generally offset a profit on another." },
    { q: "In what circumstance might dividend income require self-assessment registration?", options: ["Never — dividends are PAYE income", "When dividends exceed the non-PAYE income threshold", "Only if dividends are from a foreign company", "Only if dividends exceed €100,000"], correct: 1, a: "Once non-PAYE income (including dividends) exceeds the relevant threshold, you must register for self-assessment and file a Form 11." },
  ],
  '03': [
    { q: "What capital allowance rate applies to most plant & machinery?", options: ["4% straight-line", "12.5% over 8 years", "25% over 4 years", "100% in year 1 always"], correct: 1, a: "12.5% per year on a straight-line basis over 8 years, per Revenue's capital allowances guidance. This is a tax allowance, not accounting depreciation." },
    { q: "Why is depreciation added back in a tax-adjusted profit computation?", options: ["It is an illegal expense", "It is replaced by capital allowances for tax purposes", "It is a non-cash item only", "Revenue does not recognise it at all"], correct: 1, a: "Depreciation is an accounting charge; tax law substitutes statutory capital allowances instead. You add back depreciation and then claim the allowance." },
    { q: "What is the standard Pay and File date for self-assessed Income Tax?", options: ["31 August", "31 October", "30 November", "31 December"], correct: 1, a: "31 October is the standard self-assessment deadline for both payment and filing (extended to mid-November for ROS filers who both pay and file online)." },
  ],
  '04': [
    { q: "How does PAYE work in Revenue's own description?", options: ["You file once a year and pay a lump sum", "Your employer deducts Income Tax each time you are paid", "You pay tax quarterly by direct debit", "It is collected only when you spend money"], correct: 1, a: "PAYE means the employer calculates and deducts Income Tax (and USC/PRSI) from every payment of wages or salary — before you receive it." },
    { q: "Which of the following is typically covered by flat rate expenses?", options: ["Mortgage repayments", "Private car insurance", "Tools and specialist uniforms", "Annual holidays"], correct: 2, a: "FRE covers occupation-specific costs like tools, uniforms, and statutory registration fees. Revenue maintains a list of qualifying occupations and rates." },
    { q: "How is the BIK cash equivalent for an employer-provided car calculated?", options: ["Salary × 30%", "OMV × a percentage based on annual business km driven", "Engine size × a fixed rate", "A flat €5,000 regardless of usage"], correct: 1, a: "Cash equivalent = OMV × the applicable percentage, which ranges from 30% (0–24,000 business km) down to 6% (over 48,000 km). Travel to/from work counts as private use." },
  ],
  '05': [
    { q: "What DIRT rate does Revenue apply to deposit interest for Irish residents?", options: ["20%", "25%", "33%", "41%"], correct: 2, a: "33% — DIRT is deducted at source by the financial institution. For most Irish residents it is a final liability, but it must still be declared on a Form 11." },
    { q: "True or false: rental income is taxed on gross rent received, before deducting expenses.", options: ["True", "False"], correct: 1, a: "False. Tax is on net rental profit — gross rent less allowable expenses (repairs, insurance, management fees, etc.). Capital expenditure is generally not deductible." },
    { q: "What governs the maximum pension contribution qualifying for Income Tax relief?", options: ["A fixed €25,000 cap for everyone", "Age-related percentage limits applied to net relevant earnings", "Employer contributions only", "The pension fund's investment performance"], correct: 1, a: "Relief is limited by (a) an age-related percentage of net relevant earnings and (b) an annual earnings cap. The percentage rises with age — e.g., 15% under 30, up to 40% at 60+." },
  ],
  '06': [
    { q: "What is the 2026 standard rate band for a single person?", options: ["€38,000 at 20%", "€42,000 at 20%", "€44,000 at 20%", "€50,000 at 20%"], correct: 2, a: "€44,000 at 20%, with the balance taxed at 40%, per Revenue's 2026 tax-relief charts." },
    { q: "From what date does an employee Class A PRSI rate of 4.35% apply?", options: ["1 January 2026", "1 April 2026", "1 October 2026", "1 January 2027"], correct: 2, a: "From 1 October 2026, per the gov.ie PRSI contribution rates table." },
    { q: "USC applies once chargeable income exceeds what threshold?", options: ["€10,000", "€13,000", "€18,000", "€22,000"], correct: 1, a: "€13,000 — below this threshold no USC is charged for the year (subject to detailed rules in the Notes for Guidance)." },
  ],
  '07': [
    { q: "What does VAT3 field T1 represent?", options: ["VAT reclaimable on purchases", "VAT due on sales", "Net amount repayable", "Total taxable turnover"], correct: 1, a: "T1 = VAT due on sales (and on certain acquisitions, imports, and services received from abroad). T2 is the VAT you can reclaim on purchases." },
    { q: "If T2 exceeds T1 on the VAT3, where is the difference shown?", options: ["At T3 as payable", "At T4 as repayable", "At T1 as nil", "Carried forward automatically"], correct: 1, a: "At T4 — VAT is repayable to you when input VAT (T2) exceeds output VAT (T1). T3 is only completed when T1 > T2." },
    { q: "What is the VAT3 filing and payment deadline for ROS filers?", options: ["The 9th of the following month", "The 19th of the following month", "The 23rd of the following month", "The last day of the following month"], correct: 2, a: "The 23rd, extended from the standard 19th-of-the-month deadline for businesses filing and paying via ROS." },
  ],
  '08': [
    { q: "What is the main CGT rate for most chargeable gains?", options: ["20%", "25%", "33%", "40%"], correct: 2, a: "33% on most chargeable gains for individuals, per Revenue's CGT guidance. A 10% rate applies to certain qualifying business disposals (entrepreneur relief)." },
    { q: "What is the annual personal CGT exemption for individuals?", options: ["€750", "€1,270", "€2,000", "€5,000"], correct: 1, a: "€1,270 per tax year — deducted after netting losses, before applying the 33% rate. It cannot be carried forward if unused." },
    { q: "You dispose of an asset on 10 July. When must CGT be paid (general rule)?", options: ["31 October of that year", "15 December of that year", "31 January of the following year", "With the Form 11 return"], correct: 1, a: "By 15 December — disposals between 1 January and 30 November are due by 15 December of the same year. December disposals fall into the 31 January window." },
  ],
  '09': [
    { q: "Can both CGT and CAT apply to the same disposal event?", options: ["No — they are mutually exclusive", "Yes — and a CGT credit may reduce the CAT liability", "Yes — but only CGT ever applies in practice", "Only if the asset is property"], correct: 1, a: "Yes. Revenue confirms that where both CGT and CAT arise on the same event, the CGT paid may be credited against the CAT liability for that event — within limits." },
    { q: "True or false: the CGT credit against CAT can exceed the CAT attributable to the doubly-taxed property.", options: ["True", "False"], correct: 1, a: "False. Revenue's guidance limits the credit to the CAT attributable to the same property — you cannot use CGT to generate a CAT refund on unrelated benefits." },
    { q: "If reliefs and losses reduce your CGT to nil, do you still need to file a return?", options: ["No — no tax due means no return needed", "Yes — the filing obligation is separate from the payment obligation", "Only if the gross gain exceeded €50,000", "Only in the year you sell property"], correct: 1, a: "Yes. The filing obligation runs regardless of whether tax is due. A nil-payment return still needs to be submitted by 31 October of the year following the disposal." },
  ],
  '10': [
    { q: "What are the two headline Corporation Tax rates?", options: ["10% and 20%", "12.5% and 25%", "15% and 33%", "12.5% and 33%"], correct: 1, a: "12.5% on trading income; 25% on certain non-trading / excepted trade income, per Revenue's CT basis-of-charge guidance." },
    { q: "When must a company file and pay its CT return (general rule)?", options: ["6 months after AP end", "9 months after AP end, by the 23rd for ROS filers", "12 months after AP end", "By 31 October each year"], correct: 1, a: "Nine months after the end of the accounting period — for ROS filers, by the 23rd day of the ninth month following period end." },
    { q: "True or false: a Corporation Tax accounting period can exceed 12 months.", options: ["True", "False"], correct: 1, a: "False. CT is charged on profits in an accounting period that cannot be longer than 12 months. A longer period must be split into two for CT purposes." },
  ],
  '11': [
    { q: "Against what can a trading loss be offset under the carry-back option?", options: ["Any income in the prior 3 years", "Trading income in the same AP or the immediately preceding AP", "All income for the next 5 years", "Only if the company is profitable in year 3"], correct: 1, a: "A trading loss can be set against trading income in the same accounting period or the immediately preceding AP — per Revenue's trading losses guidance." },
    { q: "What is the time limit to make a group relief claim?", options: ["6 months after period end", "1 year after period end", "2 years from the end of the surrendering company's AP", "No limit"], correct: 2, a: "Within two years from the end of the surrendering company's accounting period, per Revenue's Group Relief page. Late claims are restricted." },
    { q: "What surcharge applies to undistributed estate/investment income of close companies?", options: ["10%", "15%", "20%", "33%"], correct: 2, a: "20% surcharge on the undistributed after-tax estate and investment income of close companies. The surcharge is reduced if income is distributed within 18 months of period end." },
  ],
  '12': [
    { q: "What is the current Group A CAT threshold (post 2 October 2024)?", options: ["€335,000", "€400,000", "€500,000", "€32,500"], correct: 1, a: "€400,000 for benefits taken on or after 2 October 2024. Group B (other relatives) is €40,000 and Group C (strangers in blood) is €20,000." },
    { q: "What is the annual small gift exemption per disponer?", options: ["€1,000", "€3,000", "€5,000", "€10,000"], correct: 1, a: "€3,000 per disponer per calendar year — this does not erode the lifetime group threshold and can be used every single year." },
    { q: "What reduction does agricultural / business relief give to taxable value?", options: ["25%", "50%", "75%", "90%"], correct: 3, a: "A 90% reduction in the taxable value of qualifying agricultural or business property, subject to detailed conditions including an active-farmer or owner-manager test." },
  ],
  default: [
    { q: "Which is the most authoritative source for an Irish tax rule?", options: ["A textbook explanation", "A Revenue Tax & Duty Manual", "The underlying legislation (TCA, VATCA, CATCA)", "A LinkedIn post"], correct: 2, a: "The legislation itself is the source of truth. Revenue manuals are operational guidance — helpful and usually reliable, but not a substitute for the Act." },
    { q: "If Revenue guidance and the Acts appear to conflict, which prevails?", options: ["Revenue guidance always", "The Act, ultimately", "Whichever was published more recently", "It depends on the year"], correct: 1, a: "Statute prevails. Revenue manuals state they are guidance and not definitive legal interpretation." },
    { q: "What is the best habit when reading any tax guidance page?", options: ["Memorise the worked example", "Note the date, version, and source URL", "Print and move on", "Skip to the examples"], correct: 1, a: "Source discipline: capture the URL, the date you read it, and the version. Tax rates change annually — yesterday's correct rule can be wrong today." },
  ],
};

// ---- Data: worked computations ----
const COMPUTATIONS = {
  '03': {
    title: "Tax-adjusted profit · sole trader",
    subtitle: "A simple P&L adjusted to arrive at taxable profit. Replicate each row in a spreadsheet and note the Revenue source for each adjustment.",
    tag: "Income",
    rows: [
      { label: "Accounting profit (per accounts)", working: "", amount: "€100,000" },
      { label: "Add: depreciation (disallowed)", working: "Not allowable — add back", amount: "+€5,000" },
      { label: "Add: client entertaining (disallowed)", working: "s.840 TCA 1997", amount: "+€2,000" },
      { label: "Less: plant & machinery allowances", working: "€40,000 pool × 12.5%", amount: "(€5,000)" },
      { label: "Taxable trading profit", working: "", amount: "€102,000", isTotal: true },
    ],
    note: "Capital allowances substitute for depreciation: add back the depreciation charge, then claim allowances at 12.5% p.a. straight-line over 8 years.",
  },
  '04': {
    title: "BIK on employer-provided car · 2026",
    subtitle: "Compute the cash equivalent (BIK value) and the resulting Income Tax, USC, and PRSI cost. The BIK is treated as additional taxable pay.",
    tag: "Income",
    rows: [
      { label: "Car OMV", working: "", amount: "€30,000" },
      { label: "Cash equivalent (BIK value)", working: "€30,000 × 30% (10,000 business km)", amount: "€9,000", isSub: true },
      { label: "Income Tax on BIK (marginal 40%)", working: "€9,000 × 40%", amount: "€3,600" },
      { label: "USC on BIK (3% band)", working: "€9,000 × 3%", amount: "€270" },
      { label: "PRSI on BIK (4.2%)", working: "€9,000 × 4.2%", amount: "€378" },
      { label: "Total additional tax from BIK", working: "", amount: "€4,248", isTotal: true },
    ],
    note: "Rate bands: 30% (0–24,000 business km) down to 6% (> 48,000 km). Travel home–work counts as private use. EVs may qualify for nil/reduced BIK — check Revenue's current guidance.",
  },
  '05': {
    title: "Rental profit computation",
    subtitle: "Gross rent less allowable expenses = taxable rental income. Computed property-by-property.",
    tag: "Income",
    rows: [
      { label: "Gross rent received (annual)", working: "", amount: "€15,600" },
      { label: "Less: repairs & maintenance", working: "Revenue-allowable", amount: "(€1,500)" },
      { label: "Less: insurance premium", working: "Annual policy", amount: "(€600)" },
      { label: "Less: letting agent fees", working: "10% of rent", amount: "(€1,560)" },
      { label: "Net taxable rental profit", working: "", amount: "€11,940", isTotal: true },
      { label: "Income Tax at 40% marginal", working: "€11,940 × 40%", amount: "€4,776" },
    ],
    note: "Mortgage interest may also be deductible — check current rules as restrictions have applied. A loss on one rental property can offset profit on another.",
  },
  '07': {
    title: "VAT3 return · T1 to T4",
    subtitle: "Map a simple sales/purchase ledger to the four VAT3 fields. T3 is payable; T4 is repayable.",
    tag: "VAT",
    rows: [
      { label: "Sales (net, standard-rated)", working: "", amount: "€100,000" },
      { label: "Output VAT — T1", working: "€100,000 × 23%", amount: "€23,000", isSub: true },
      { label: "Purchases (net, standard-rated)", working: "", amount: "€50,000" },
      { label: "Input VAT — T2", working: "€50,000 × 23%", amount: "€11,500", isSub: true },
      { label: "T3 payable (T1 – T2)", working: "T1 > T2", amount: "€11,500", isTotal: true },
      { label: "T4 repayable", working: "T2 > T1", amount: "€nil" },
    ],
    note: "Due by 19th of the following month (23rd for ROS filers). If T2 > T1, show the repayable amount at T4 only — leave T3 blank.",
  },
  '08': {
    title: "CGT on sale of shares",
    subtitle: "Apply the standard computation: proceeds less allowable costs, deduct the annual exemption, charge at 33%.",
    tag: "CGT",
    rows: [
      { label: "Sale proceeds", working: "", amount: "€8,000" },
      { label: "Less: acquisition cost", working: "Original cost", amount: "(€5,000)" },
      { label: "Chargeable gain", working: "", amount: "€3,000" },
      { label: "Less: annual personal exemption", working: "€1,270 per year", amount: "(€1,270)" },
      { label: "Net chargeable gain", working: "", amount: "€1,730", isSub: true },
      { label: "CGT at 33%", working: "€1,730 × 33%", amount: "€571", isTotal: true },
    ],
    note: "Disposals 1 Jan–30 Nov: pay by 15 Dec same year. Disposals in December: pay by 31 Jan following year. Return filed by 31 Oct of the year after disposal.",
  },
  '09': {
    title: "CGT · multiple disposals with a loss",
    subtitle: "Net gains and losses across all disposals before applying the annual exemption. Order matters.",
    tag: "CGT",
    rows: [
      { label: "Disposal 1 — shares: gain", working: "", amount: "€8,000" },
      { label: "Disposal 2 — property: gain", working: "", amount: "€5,500" },
      { label: "Disposal 3 — investment: loss", working: "", amount: "(€3,000)" },
      { label: "Net gains (after losses)", working: "", amount: "€10,500", isSub: true },
      { label: "Less: annual exemption", working: "€1,270", amount: "(€1,270)" },
      { label: "Net chargeable gain", working: "", amount: "€9,230", isTotal: true },
      { label: "CGT at 33%", working: "€9,230 × 33%", amount: "€3,046" },
    ],
    note: "If entrepreneur relief applies to Disposal 1, the qualifying gain is taxed at 10% instead of 33%. Check Revenue's CGT-against-CAT credit guidance where the same asset gives rise to both taxes.",
  },
  '10': {
    title: "Corporation Tax computation",
    subtitle: "Bridge from accounting profit to CT due. Identify add-backs, deduct allowances, apply the correct rate.",
    tag: "CT",
    rows: [
      { label: "Accounting profit before tax", working: "", amount: "€150,000" },
      { label: "Add: depreciation", working: "Not allowable", amount: "+€10,000" },
      { label: "Add: client entertaining", working: "Disallowed", amount: "+€2,000" },
      { label: "Less: plant & machinery allowances", working: "€40,000 pool × 12.5%", amount: "(€5,000)" },
      { label: "Taxable trading profit", working: "", amount: "€157,000", isSub: true },
      { label: "CT at 12.5% (trading rate)", working: "€157,000 × 12.5%", amount: "€19,625", isTotal: true },
    ],
    note: "File and pay within 9 months of accounting period end (23rd of the ninth month for ROS). Large companies pay preliminary tax 31 days before year-end.",
  },
  '11': {
    title: "Trading loss · carry-back to prior year",
    subtitle: "A loss in Year 2 is carried back to offset trading profit in Year 1, generating a CT refund.",
    tag: "CT",
    rows: [
      { label: "Year 2: trading loss", working: "", amount: "(€20,000)" },
      { label: "Year 1: trading profit (original)", working: "", amount: "€50,000" },
      { label: "Less: loss relief (carry-back)", working: "Year 2 loss", amount: "(€20,000)" },
      { label: "Year 1: revised taxable profit", working: "", amount: "€30,000", isSub: true },
      { label: "CT on revised profit (12.5%)", working: "€30,000 × 12.5%", amount: "€3,750" },
      { label: "CT originally paid (12.5% × €50,000)", working: "", amount: "€6,250" },
      { label: "CT refund arising", working: "€6,250 – €3,750", amount: "€2,500", isTotal: true },
    ],
    note: "Claim within 2 years of the end of the loss-making AP. Losses not absorbed by carry-back may be carried forward indefinitely against future trading income.",
  },
  '12': {
    title: "CAT on inheritance · parent to child",
    subtitle: "Apply the Group A lifetime threshold, charge 33% on the excess. No prior benefits assumed.",
    tag: "CAT",
    rows: [
      { label: "Value of inheritance received", working: "From parent", amount: "€500,000" },
      { label: "Less: Group A lifetime threshold", working: "Post 2 Oct 2024", amount: "(€400,000)" },
      { label: "Taxable excess", working: "", amount: "€100,000", isSub: true },
      { label: "CAT at 33%", working: "€100,000 × 33%", amount: "€33,000", isTotal: true },
    ],
    note: "Pay by 31 Oct if valuation date is Jan–Aug; by 31 Jan following if Sep–Dec. The small gift exemption (€3,000/year) does not reduce the lifetime Group A threshold.",
  },
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

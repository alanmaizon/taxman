// Course curriculum data
const WEEKS = [
  { n: "01", title: "Tax system map, sources & residency", area: "Foundations", hours: "5–7", tags: ["Income"], blurb: "The Irish tax landscape, primary sources, and the day-count tests that decide who pays what." },
  { n: "02", title: "Classifying income: schedules, cases & badges of trade", area: "Foundations", hours: "6–8", tags: ["Income"], blurb: "Employment vs trade vs rental vs investment. Why a category decides everything." },
  { n: "03", title: "Self-employed profits & capital allowances", area: "Personal", hours: "6–8", tags: ["Income"], blurb: "Reconcile accounts to taxable profit. Add-backs, deductions, and your first capital allowance claim." },
  { n: "04", title: "Employment income, expenses & Benefit-in-Kind", area: "Personal", hours: "5–7", tags: ["Income"], blurb: "PAYE basics, flat-rate expenses, and computing BIK on an employer-provided car." },
  { n: "05", title: "Termination, pensions, rental, dividends & DIRT", area: "Personal", hours: "6–8", tags: ["Income"], blurb: "Lump sums, pension contribution limits, rental profit, dividends and the 33% DIRT rate." },
  { n: "06", title: "Full Income Tax computation + USC & PRSI", area: "Personal", hours: "6–9", tags: ["Income"], blurb: "Bands, credits, USC, PRSI — assembled into one defensible computation." },
  { n: "07", title: "VAT foundations & the VAT3 return", area: "Indirect", hours: "6–9", tags: ["VAT"], blurb: "Registration thresholds, current rates, and mapping a sales/purchase ledger to T1–T4." },
  { n: "08", title: "CGT computation, exemptions & pay/file", area: "Capital", hours: "6–8", tags: ["CGT"], blurb: "The €1,270 personal exemption, the 33% rate, and the two CGT payment windows." },
  { n: "09", title: "CGT reliefs and planning", area: "Capital", hours: "5–7", tags: ["CGT"], blurb: "PPR, retirement and entrepreneur reliefs at competence level. Where CGT meets CAT." },
  { n: "10", title: "Corporation Tax computation & filing", area: "Business", hours: "6–9", tags: ["CT"], blurb: "12.5% trading vs 25% non-trading. The bridge from accounting profit to CT due." },
  { n: "11", title: "CT losses, group relief & close companies", area: "Business", hours: "6–8", tags: ["CT"], blurb: "Carry-back, carry-forward, group surrender, and the close-company surcharge." },
  { n: "12", title: "CAT, thresholds, reliefs & capstone", area: "CAT", hours: "7–10", tags: ["CAT"], blurb: "Group A/B/C thresholds, dwelling-house exemption, agricultural & business relief — and your portfolio." },
];

const TAG_PILL = {
  Income: "pill-income",
  VAT: "pill-vat",
  CGT: "pill-cgt",
  CT: "pill-ct",
  CAT: "pill-cat",
};

const FAQ = [
  { q: "Is this a UCD or accredited diploma?", a: "No. This is a free, open self-study programme that mirrors the topic map of well-known Irish taxation diplomas. It does not issue an accredited credential." },
  { q: "What does it cost?", a: "Nothing. All readings link to free official sources — Revenue.ie, Citizens Information, and the Irish Statute Book." },
  { q: "How much time per week?", a: "Plan for five to nine hours: read official guidance, build a one-page cheat-sheet, work the spreadsheet, take the quiz, log your sources." },
  { q: "Will I be ready to file my own taxes?", a: "You will understand the structure of every major Irish tax head and be able to follow worked computations. For complex situations, a registered tax adviser is still the right call." },
  { q: "Do I need any prior knowledge?", a: "Basic numeracy and access to a spreadsheet. No accounting background required." },
  { q: "When does it start?", a: "Whenever you do. The course is fully self-paced — start Monday or start in July." },
];

window.WEEKS = WEEKS;
window.TAG_PILL = TAG_PILL;
window.FAQ = FAQ;

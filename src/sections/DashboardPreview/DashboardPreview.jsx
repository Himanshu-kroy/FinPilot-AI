import { motion } from "framer-motion";
import {
  TrendingUp, TrendingDown, DollarSign, PiggyBank,
  ShieldCheck, CreditCard, Lightbulb, CheckCircle2,
  ClipboardList,
} from "lucide-react";
import Section, { Container, SectionLabel } from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useFinancial } from "@/context/FinancialContext";

/* ── Score ring ──────────────────────────────────────────── */
function ScoreRing({ score, scoreLabel, scoreBadgeVariant }) {
  const r    = 52;
  const cx   = 60;
  const cy   = 60;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  return (
    <div className="flex items-center gap-6">
      <div className="relative shrink-0">
        <svg width="120" height="120" className="-rotate-90">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="9" />
          <motion.circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke="#0F62FE"
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            whileInView={{ strokeDashoffset: circ - dash }}
            viewport={{ once: false }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">{score}</span>
          <span className="text-2xs text-text-secondary">/ 100</span>
        </div>
      </div>
      <div>
        <p className="text-xs text-text-secondary mb-1">Financial Health Score</p>
        <Badge variant={scoreBadgeVariant}>{scoreLabel}</Badge>
        <p className="text-xs text-text-muted mt-2 max-w-[160px] leading-relaxed">
          Based on your savings rate, emergency fund, and debt profile.
        </p>
      </div>
    </div>
  );
}

/* ── MetricCard ──────────────────────────────────────────── */
function MetricCard({ label, value, subtext, icon: Icon, positive }) {
  return (
    <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl p-4">
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="text-xs font-medium text-text-secondary">{label}</span>
        <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[rgba(15,98,254,0.10)]">
          <Icon size={13} className="text-ibm-blue-light" strokeWidth={1.8} />
        </span>
      </div>
      <p className="text-lg font-semibold text-white leading-none mb-1.5">{value}</p>
      {subtext && (
        <p className={`text-2xs ${positive === false ? "text-warning" : "text-text-muted"}`}>
          {subtext}
        </p>
      )}
    </div>
  );
}

/* ── Empty state ─────────────────────────────────────────── */
function EmptyState() {
  const scrollToAssessment = () =>
    document.querySelector("#assessment")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[rgba(15,98,254,0.10)] border border-[rgba(15,98,254,0.20)] mb-5">
        <ClipboardList size={24} className="text-ibm-blue-light" />
      </span>
      <h3 className="text-base font-semibold text-white mb-2">
        No assessment data yet
      </h3>
      <p className="text-sm text-text-secondary max-w-xs leading-relaxed mb-6">
        Complete the financial assessment above to populate your personal dashboard with live metrics and AI recommendations.
      </p>
      <Button size="sm" onClick={scrollToAssessment}>
        Start Assessment
      </Button>
    </div>
  );
}

/* ── Main Section ────────────────────────────────────────── */
export default function DashboardPreview() {
  const { results } = useFinancial();

  return (
    <Section id="dashboard" className="py-20 lg:py-28 bg-[#0c0c0e]">
      <Container>
        {/* ── Header ──────────────────────────────────── */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel>Your Dashboard</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Your financial picture, at a glance
          </h2>
          <p className="text-base text-text-secondary leading-relaxed">
            {results
              ? "Your personalized dashboard — every metric is calculated from your assessment data."
              : "Complete the financial assessment to populate your dashboard with live metrics and AI-driven recommendations."}
          </p>
        </div>

        {/* ── Dashboard frame ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] rounded-3xl overflow-hidden shadow-glass-lg"
        >
          {/* Window chrome */}
          <div className="flex items-center gap-1.5 px-6 py-4 border-b border-[rgba(255,255,255,0.07)]">
            <span className="w-3 h-3 rounded-full bg-[rgba(255,255,255,0.10)]" />
            <span className="w-3 h-3 rounded-full bg-[rgba(255,255,255,0.10)]" />
            <span className="w-3 h-3 rounded-full bg-[rgba(255,255,255,0.10)]" />
            <span className="ml-3 text-xs text-text-muted font-mono">
              FinPilot AI — Financial Dashboard
            </span>
            <Badge
              variant={results ? "success" : "default"}
              className="ml-auto text-2xs"
            >
              {results ? "Live Data" : "Awaiting Input"}
            </Badge>
          </div>

          <div className="p-6 lg:p-8">
            {results ? <LiveDashboard results={results} /> : <EmptyState />}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

/* ── LiveDashboard ───────────────────────────────────────── */
function LiveDashboard({ results }) {
  const { score, scoreLabel, scoreBadgeVariant, fmt, recommendations, surplus, savingsRate, emergencyMonths, debtToIncome, expenseRatio } = results;

  const metrics = [
    {
      label:    "Monthly Income",
      value:    fmt.income,
      subtext:  "Gross monthly",
      icon:     DollarSign,
      positive: true,
    },
    {
      label:    "Monthly Expenses",
      value:    fmt.expenses,
      subtext:  `${fmt.expenseRatio} of income`,
      icon:     CreditCard,
      positive: expenseRatio <= 0.80,
    },
    {
      label:    "Monthly Surplus",
      value:    `${fmt.surplusSign}${fmt.surplus}`,
      subtext:  surplus >= 0 ? "Available to save/invest" : "Spending exceeds income",
      icon:     TrendingUp,
      positive: surplus >= 0,
    },
    {
      label:    "Savings Rate",
      value:    fmt.savingsRate,
      subtext:  savingsRate >= 0.20 ? "Above 20% target" : "Target: 20%",
      icon:     PiggyBank,
      positive: savingsRate >= 0.10,
    },
    {
      label:    "Emergency Fund",
      value:    fmt.emergencyMonths,
      subtext:  emergencyMonths >= 6 ? "6-month target met" : `Target: 6 months`,
      icon:     ShieldCheck,
      positive: emergencyMonths >= 3,
    },
    {
      label:    "Debt Balance",
      value:    fmt.debt,
      subtext:  `DTI ratio: ${fmt.debtToIncome}`,
      icon:     TrendingDown,
      positive: debtToIncome <= 0.36,
    },
  ];

  return (
    <>
      {/* ── Score + metrics grid ──────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl p-5 flex items-center">
          <ScoreRing score={score} scoreLabel={scoreLabel} scoreBadgeVariant={scoreBadgeVariant} />
        </div>
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {metrics.map((m) => (
            <MetricCard key={m.label} {...m} />
          ))}
        </div>
      </div>

      {/* ── Recommendations ───────────────────────── */}
      <div className="bg-[rgba(15,98,254,0.05)] border border-[rgba(15,98,254,0.15)] rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb size={16} className="text-ibm-blue-light" />
          <h3 className="text-sm font-semibold text-white">Top Recommendations</h3>
          <Badge variant="blue" className="ml-auto text-2xs">AI Generated</Badge>
        </div>
        <ul className="space-y-3" role="list">
          {recommendations.map((rec, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
              className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed"
            >
              <CheckCircle2 size={15} className="text-ibm-blue shrink-0 mt-0.5" strokeWidth={2} />
              {rec}
            </motion.li>
          ))}
        </ul>
      </div>
    </>
  );
}

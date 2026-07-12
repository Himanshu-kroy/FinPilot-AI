import { motion } from "framer-motion";
import {
  TrendingUp, ShieldCheck, Wallet, Landmark,
  ArrowRight, ChevronRight, Bot, Sparkles,
} from "lucide-react";
import Button from "@/components/ui/Button";
import StatCard from "@/components/ui/StatCard";
import Badge from "@/components/ui/Badge";
import { Container } from "@/components/ui/Section";
import { useFinancial } from "@/context/FinancialContext";

/* ── Animation variants ──────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0  },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12 } },
};

/* ── Default illustration data (shown before assessment) ──── */
const DEFAULT_STATS = [
  { label: "Monthly Savings",  value: "—",    change: "Pending", changeType: "neutral", icon: TrendingUp  },
  { label: "Savings Rate",     value: "—",    change: "Pending", changeType: "neutral", icon: Wallet      },
  { label: "Emergency Fund",   value: "—",    change: "Pending", changeType: "neutral", icon: ShieldCheck },
  { label: "Debt Balance",     value: "—",    change: "Pending", changeType: "neutral", icon: Landmark    },
];

/* ── Circular Score Ring (SVG) ────────────────────────────── */
function ScoreRing({ score }) {
  const displayScore = score ?? 0;
  const r  = 54;
  const cx = 72;
  const cy = 72;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - displayScore / 100);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-2xl col-span-2">
      <p className="text-xs font-semibold tracking-widest uppercase text-text-secondary mb-4">
        Financial Health Score
      </p>
      <div className="relative">
        <svg width="144" height="144" className="-rotate-90">
          {/* Track */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* Progress */}
          <motion.circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke="#0F62FE"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.6, delay: 0.6, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-3xl font-bold text-white leading-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {score ?? "—"}
          </motion.span>
          <span className="text-2xs text-text-secondary mt-0.5">out of 100</span>
        </div>
      </div>
      <Badge variant={score ? "success" : "default"} className="mt-4">
        {score ? "Health Score" : "Run Assessment"}
      </Badge>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */
export default function Hero() {
  const { results } = useFinancial();
  const scrollToSection = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Build live stats from context when available, otherwise show default
  const liveStats = results
    ? [
        { label: "Monthly Surplus", value: `${results.fmt.surplusSign}${results.fmt.surplus}`, change: results.surplus >= 0 ? "Positive" : "Deficit", changeType: results.surplus >= 0 ? "positive" : "negative", icon: TrendingUp  },
        { label: "Savings Rate",    value: results.fmt.savingsRate,    change: results.savingsRate >= 0.20 ? "Above target" : "Below 20%", changeType: results.savingsRate >= 0.20 ? "positive" : "neutral", icon: Wallet      },
        { label: "Emergency Fund",  value: results.fmt.emergencyMonths,change: results.emergencyMonths >= 6 ? "Target met" : "Building", changeType: results.emergencyMonths >= 3 ? "positive" : "neutral", icon: ShieldCheck },
        { label: "Debt Balance",    value: results.fmt.debt,           change: results.debtToIncome <= 0.28 ? "Healthy DTI" : "Monitor", changeType: results.debtToIncome <= 0.28 ? "positive" : "neutral", icon: Landmark    },
      ]
    : DEFAULT_STATS;

  const heroScore = results ? results.score : null;

  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* ── Background ambient glows ──────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute top-[10%] left-[20%] w-[520px] h-[520px] rounded-full bg-ibm-blue opacity-[0.06] blur-[120px]" />
        <div className="absolute bottom-[5%] right-[15%] w-[380px] h-[380px] rounded-full bg-ibm-blue opacity-[0.04] blur-[100px]" />
      </div>

      <Container className="py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left — Copy ─────────────────────────────────── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col"
          >
            {/* Eyebrow badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-ibm-blue mb-6">
                <span className="flex items-center justify-center w-5 h-5 rounded-md bg-[rgba(15,98,254,0.15)]">
                  <Sparkles size={11} className="text-ibm-blue" />
                </span>
                Powered by IBM Watson Orchestrate
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              id="hero-heading"
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-[68px] font-bold text-white leading-[1.05] tracking-tight mb-6"
            >
              FinPilot{" "}
              <span className="text-ibm-blue">AI</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl font-medium text-text-secondary mb-4 leading-snug"
            >
              AI-powered Financial Wellness Coach built with IBM Watson Orchestrate.
            </motion.p>

            {/* Supporting paragraph */}
            <motion.p
              variants={fadeUp}
              className="text-base text-text-secondary leading-relaxed mb-10 max-w-lg"
            >
              Enter your financial data and receive a personalized health score,
              intelligent budget analysis, savings recommendations, and ongoing
              AI coaching — all in one place.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                onClick={() => scrollToSection("#assessment")}
                className="group"
              >
                Analyze My Finances
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => scrollToSection("#features")}
                className="group"
              >
                Learn More
                <ChevronRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4 mt-10 pt-8 border-t border-[rgba(255,255,255,0.07)]"
            >
              <div className="flex items-center gap-1.5">
                <Bot size={14} className="text-ibm-blue-light" />
                <span className="text-xs text-text-secondary">IBM Watson Orchestrate</span>
              </div>
              <span className="text-[rgba(255,255,255,0.2)]">|</span>
              <span className="text-xs text-text-secondary">AI-Native Financial Platform</span>
            </motion.div>
          </motion.div>

          {/* ── Right — Dashboard Illustration ──────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            {/* Outer glass frame */}
            <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.09)] rounded-3xl p-5 shadow-glass-lg backdrop-blur-sm">
              {/* Window chrome bar */}
              <div className="flex items-center gap-1.5 mb-5">
                <span className="w-3 h-3 rounded-full bg-[rgba(255,255,255,0.10)]" />
                <span className="w-3 h-3 rounded-full bg-[rgba(255,255,255,0.10)]" />
                <span className="w-3 h-3 rounded-full bg-[rgba(255,255,255,0.10)]" />
                <span className="ml-3 text-xs text-text-muted font-mono">finpilot.ai / dashboard</span>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Score ring — spans 2 cols */}
                <ScoreRing score={heroScore} />

                {/* Metric cards */}
                {liveStats.map((stat) => (
                  <StatCard
                    key={stat.label}
                    label={stat.label}
                    value={stat.value}
                    change={stat.change}
                    changeType={stat.changeType}
                    icon={stat.icon}
                  />
                ))}
              </div>

              {/* Mini insight bar */}
              <div className="mt-3 p-3 bg-[rgba(15,98,254,0.08)] border border-[rgba(15,98,254,0.18)] rounded-xl flex items-start gap-2.5">
                <Bot size={14} className="text-ibm-blue-light mt-0.5 shrink-0" />
                <p className="text-xs text-text-secondary leading-relaxed">
                  <span className="text-white font-medium">Watson AI: </span>
                  {results
                    ? `Score ${results.score}/100. ${results.recommendations[0]}`
                    : "Complete your financial assessment to receive a personalized score and AI-driven coaching session."}
                </p>
              </div>
            </div>

            {/* Floating accent badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              className="absolute -top-3 -right-3 flex items-center gap-1.5 px-3 py-1.5 bg-ibm-blue rounded-full text-white text-xs font-semibold shadow-ibm-glow-sm"
            >
              <Sparkles size={11} />
              AI Analysis Ready
            </motion.div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}

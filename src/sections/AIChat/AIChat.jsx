import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, CheckCircle2, Info, ShieldAlert,
  Wallet, TrendingUp, CreditCard, Target,
} from "lucide-react";
import Section, { Container, SectionLabel } from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import WatsonChat from "@/components/watson/WatsonChat";
import { useFinancial } from "@/context/FinancialContext";

/* ── Animation variants ──────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0  },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08 } },
};

/* ── Quick-action card data ───────────────────────────────── */
const QUICK_ACTIONS = [
  {
    icon:        Wallet,
    emoji:       "💰",
    title:       "Budget Planning",
    description: "Build a personalized monthly budget aligned with your income and goals.",
  },
  {
    icon:        TrendingUp,
    emoji:       "📈",
    title:       "Save More Money",
    description: "Discover strategies to grow your savings rate and build long-term wealth.",
  },
  {
    icon:        CreditCard,
    emoji:       "💳",
    title:       "Debt Management",
    description: "Create an action plan to reduce debt faster using proven payoff methods.",
  },
  {
    icon:        Target,
    emoji:       "🎯",
    title:       "Financial Goals",
    description: "Set, track, and achieve meaningful milestones on your financial journey.",
  },
];

/* ── Suggested question chips ────────────────────────────── */
const SUGGESTED_QUESTIONS = [
  "How can I build an emergency fund?",
  "Help me create a monthly budget.",
  "How can I reduce unnecessary expenses?",
  "Tips to improve my savings.",
  "How should I manage debt responsibly?",
];

/* ── Quick-action card ───────────────────────────────────── */
function QuickActionCard({ emoji, title, description }) {
  const [tooltip, setTooltip] = useState(false);

  const handleClick = () => {
    setTooltip(true);
    setTimeout(() => setTooltip(false), 2800);
  };

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.18 } }}
      onClick={handleClick}
      className="relative group bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(15,98,254,0.35)] rounded-2xl p-5 cursor-pointer transition-colors duration-300 select-none"
      role="button"
      tabIndex={0}
      aria-label={`Quick action: ${title}`}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(ellipse_at_top_left,rgba(15,98,254,0.07),transparent_70%)] pointer-events-none" />

      {/* Icon */}
      <span className="text-2xl mb-3 block leading-none" aria-hidden="true">
        {emoji}
      </span>

      <h3 className="text-sm font-semibold text-white mb-1.5 leading-snug">
        {title}
      </h3>
      <p className="text-xs text-text-secondary leading-relaxed">
        {description}
      </p>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            key="tip"
            initial={{ opacity: 0, y: 4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: 4,  scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-x-0 -bottom-12 mx-2 z-10 flex items-center gap-1.5 px-3 py-2 bg-[#111111] border border-[rgba(15,98,254,0.30)] rounded-xl shadow-glass"
            role="tooltip"
          >
            <Bot size={12} className="text-ibm-blue-light shrink-0" />
            <span className="text-2xs text-text-secondary leading-tight">
              Start a conversation with FinPilot AI about this topic.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Suggested question chip ─────────────────────────────── */
function SuggestedChip({ label }) {
  return (
    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.10)] text-text-secondary cursor-default select-none">
      {label}
    </span>
  );
}

/* ── Disclaimer banner ───────────────────────────────────── */
function DisclaimerBanner() {
  return (
    <div className="flex items-start gap-3 p-4 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)]">
      <span className="text-lg leading-none shrink-0 mt-0.5" aria-hidden="true">
        🛡️
      </span>
      <p className="text-xs text-text-secondary leading-relaxed">
        <span className="text-white font-medium">Disclaimer: </span>
        FinPilot AI provides educational financial guidance. It does not provide
        legal, tax, or investment advice.
      </p>
    </div>
  );
}

/* ── Financial summary card ───────────────────────────────── */
function FinancialSummaryCard({ results }) {
  const { score, scoreLabel, scoreBadgeVariant, fmt, financialGoal } = results;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="bg-[rgba(15,98,254,0.06)] border border-[rgba(15,98,254,0.18)] rounded-2xl p-5 mb-4"
    >
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle2 size={15} className="text-success" />
        <span className="text-sm font-semibold text-white">
          Assessment Complete — Your Financial Summary
        </span>
        <Badge variant={scoreBadgeVariant} className="ml-auto text-2xs">
          {scoreLabel}
        </Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {[
          { label: "Health Score",    value: `${score}/100`                        },
          { label: "Monthly Surplus", value: `${fmt.surplusSign}${fmt.surplus}`    },
          { label: "Savings Rate",    value: fmt.savingsRate                        },
          { label: "Emergency Fund",  value: fmt.emergencyMonths                   },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 text-center"
          >
            <p className="text-2xs text-text-muted mb-1">{label}</p>
            <p className="text-sm font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>

      {financialGoal && (
        <p className="text-xs text-text-secondary">
          <span className="text-text-muted">Your Goal: </span>
          <span className="text-white font-medium">{financialGoal}</span>
        </p>
      )}

      <p className="text-xs text-ibm-blue-light mt-3 leading-relaxed">
        Reference your score, savings rate, or any metric in the conversation below
        to get tailored financial guidance from FinPilot AI.
      </p>
    </motion.div>
  );
}

/* ── Main Section ─────────────────────────────────────────── */
export default function AIChat() {
  const { results } = useFinancial();

  return (
    <Section id="ai-chat" className="py-20 lg:py-28">
      <Container>

        {/* ══════════════════════════════════════════
            1. HERO HEADER
        ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <SectionLabel>AI Coaching</SectionLabel>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-5 leading-tight">
            <span className="mr-3" aria-hidden="true">🤖</span>
            FinPilot AI Assistant
          </h2>

          <p className="text-lg text-text-secondary font-medium mb-4 leading-snug">
            Your intelligent financial wellness companion powered by IBM watsonx Orchestrate.
          </p>

          <p className="text-base text-text-secondary leading-relaxed max-w-2xl mx-auto">
            Ask questions about budgeting, saving, debt management, emergency funds,
            financial planning, and money management.
          </p>
        </motion.div>

        {/* ══════════════════════════════════════════
            2. QUICK ACTION CARDS
        ══════════════════════════════════════════ */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {QUICK_ACTIONS.map((action) => (
            <QuickActionCard key={action.title} {...action} />
          ))}
        </motion.div>

        {/* ══════════════════════════════════════════
            3 + 4 + 5 + 6. CHAT CONTAINER
        ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto w-full max-w-[1100px]"
        >
          {/* Outer glass frame with blue glow */}
          <div className="relative bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.09)] rounded-3xl shadow-glass-lg shadow-ibm-glow backdrop-blur-sm overflow-hidden">

            {/* ── Window chrome bar ───────────────── */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-[rgba(255,255,255,0.07)]">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-ibm-blue shadow-ibm-glow-sm">
                <Bot size={17} className="text-white" strokeWidth={2} />
              </span>
              <div>
                <p className="text-sm font-semibold text-white leading-none">
                  FinPilot AI Agent
                </p>
                <p className="text-2xs text-text-secondary mt-0.5">
                  Powered by IBM watsonx Orchestrate
                </p>
              </div>
              <span className="ml-auto flex items-center gap-1.5 text-2xs text-success font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                {results ? "Assessment Loaded" : "Ready"}
              </span>
            </div>

            {/* ── Inner content padding ────────────── */}
            <div className="p-6">

              {/* 4. Disclaimer banner */}
              <div className="mb-5">
                <DisclaimerBanner />
              </div>

              {/* 5. Suggested questions */}
              <div className="mb-5">
                <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-3">
                  Suggested topics
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <SuggestedChip key={q} label={q} />
                  ))}
                </div>
              </div>

              {/* 6. Empty-state nudge (non-blocking) */}
              {!results && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-start gap-2.5 mb-5 px-4 py-3 rounded-xl bg-[rgba(15,98,254,0.06)] border border-[rgba(15,98,254,0.14)]"
                >
                  <Info size={13} className="text-ibm-blue-light shrink-0 mt-0.5" />
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Complete the Financial Assessment to receive more personalized
                    financial recommendations.
                  </p>
                </motion.div>
              )}

              {/* Financial summary — after assessment */}
              {results && <FinancialSummaryCard results={results} />}

              {/* Watson embed — always rendered; height is controlled by the wxO widget */}
              <div className="w-full">
                <WatsonChat />
              </div>
            </div>
          </div>

          {/* Footer notice */}
          <div className="flex items-start gap-2.5 mt-5 px-2">
            <ShieldAlert size={13} className="text-ibm-blue-light shrink-0 mt-0.5" />
            <p className="text-xs text-text-muted leading-relaxed">
              FinPilot AI is powered by IBM watsonx Orchestrate and provides
              educational guidance only.
              {results
                ? " Your assessment data is available — reference your score or metrics in the conversation for personalised advice."
                : " Complete the financial assessment above to unlock personalised AI recommendations."}
            </p>
          </div>
        </motion.div>

      </Container>
    </Section>
  );
}

import { motion } from "framer-motion";
import { Bot, Sparkles, CheckCircle2, Info } from "lucide-react";
import Section, { Container, SectionLabel } from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import WatsonChat from "@/components/watson/WatsonChat";
import { useFinancial } from "@/context/FinancialContext";

/* ── Financial summary card ───────────────────────────────── */
function FinancialSummaryCard({ results }) {
  const { score, scoreLabel, scoreBadgeVariant, fmt, financialGoal, surplus, savingsRate, emergencyMonths } = results;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-5 mt-5 mb-4 bg-[rgba(15,98,254,0.06)] border border-[rgba(15,98,254,0.18)] rounded-2xl p-5"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle2 size={15} className="text-success" />
        <span className="text-sm font-semibold text-white">Assessment Complete — Your Financial Summary</span>
        <Badge variant={scoreBadgeVariant} className="ml-auto text-2xs">{scoreLabel}</Badge>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {[
          { label: "Health Score",    value: `${score}/100`           },
          { label: "Monthly Surplus", value: `${fmt.surplusSign}${fmt.surplus}` },
          { label: "Savings Rate",    value: fmt.savingsRate           },
          { label: "Emergency Fund",  value: fmt.emergencyMonths       },
        ].map(({ label, value }) => (
          <div key={label} className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-xl p-3 text-center">
            <p className="text-2xs text-text-muted mb-1">{label}</p>
            <p className="text-sm font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* Goal */}
      {financialGoal && (
        <p className="text-xs text-text-secondary">
          <span className="text-text-muted">Your Goal: </span>
          <span className="text-white font-medium">{financialGoal}</span>
        </p>
      )}

      {/* Hint for Watson */}
      <p className="text-xs text-ibm-blue-light mt-3 leading-relaxed">
        Share the details above with the AI advisor below — or just start chatting and reference your score, savings rate, or any metric you'd like to explore.
      </p>
    </motion.div>
  );
}

/* ── Main Section ─────────────────────────────────────────── */
export default function AIChat() {
  const { results } = useFinancial();

  return (
    <Section id="ai-chat">
      <Container>
        {/* ── Header ─────────────────────────────────────── */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel>AI Coaching</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Continue your financial journey
          </h2>
          <p className="text-base text-text-secondary leading-relaxed">
            Your dedicated IBM Watson Orchestrate financial agent is ready to answer questions,
            explore scenarios, and help you act on your personalized assessment results.
          </p>
        </div>

        {/* ── Glass chat container ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.09)] rounded-3xl overflow-hidden shadow-glass-lg backdrop-blur-sm">

            {/* Window chrome */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[rgba(255,255,255,0.07)]">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-ibm-blue">
                <Bot size={15} className="text-white" strokeWidth={2} />
              </span>
              <div>
                <p className="text-sm font-semibold text-white leading-none">
                  FinPilot AI Agent
                </p>
                <p className="text-2xs text-text-secondary mt-0.5">
                  Powered by IBM Watson Orchestrate
                </p>
              </div>
              <span className="ml-auto flex items-center gap-1.5 text-2xs text-success font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                {results ? "Assessment Loaded" : "Ready"}
              </span>
            </div>

            {/* Financial summary — shown only after assessment */}
            {results && <FinancialSummaryCard results={results} />}

            {/* Watson embed — always rendered */}
            <div className="px-5 pb-5">
              {/* Informational nudge — shown only before assessment */}
              {!results && (
                <div className="flex items-start gap-2.5 mb-4 px-3 py-2.5 rounded-xl bg-[rgba(15,98,254,0.06)] border border-[rgba(15,98,254,0.14)]">
                  <Info size={13} className="text-ibm-blue-light shrink-0 mt-0.5" />
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Complete your financial assessment to receive personalized recommendations.
                  </p>
                </div>
              )}
              <WatsonChat />
            </div>
          </div>

          {/* Watson notice */}
          <div className="flex items-start gap-3 mt-5 px-2">
            <Sparkles size={14} className="text-ibm-blue-light shrink-0 mt-0.5" />
            <p className="text-xs text-text-muted leading-relaxed">
              The live AI advisor is powered by IBM Watson Orchestrate.
              {results
                ? " Your assessment summary is displayed above — share it with the agent to begin a personalized conversation."
                : " Your financial assessment data will enhance the quality of AI recommendations."}
            </p>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

import { motion } from "framer-motion";
import { ClipboardList, Cpu, MessageSquare } from "lucide-react";
import Section, { Container, SectionLabel } from "@/components/ui/Section";

const STEPS = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Enter your financial details",
    description:
      "Provide your monthly income, expenses, savings balance, outstanding debt, and primary financial goal using the structured assessment form.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "FinPilot AI analyzes your financial health",
    description:
      "The AI calculates your financial health score, evaluates your budget structure, identifies risk areas, and generates a tailored wellness report with concrete action items.",
  },
  {
    number: "03",
    icon: MessageSquare,
    title: "Continue with IBM Watson Orchestrate",
    description:
      "Your personalized report is passed into a live IBM Watson Orchestrate agent session. Ask follow-up questions, explore scenarios, and refine your financial plan through natural conversation.",
  },
];

export default function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      className="py-20 lg:py-28 bg-[#0c0c0e]"
    >
      <Container>
        {/* ── Header ─────────────────────────────────────── */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>The Process</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            From input to insight in three steps
          </h2>
          <p className="text-base text-text-secondary leading-relaxed">
            A clear, structured workflow that turns your raw financial data into
            an actionable AI-powered coaching session.
          </p>
        </div>

        {/* ── Timeline ───────────────────────────────────── */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical connector line */}
          <div
            aria-hidden="true"
            className="absolute left-[27px] top-12 bottom-12 w-px bg-gradient-to-b from-ibm-blue via-[rgba(15,98,254,0.30)] to-transparent hidden sm:block"
          />

          <div className="flex flex-col gap-10">
            {STEPS.map((step, index) => (
              <StepItem key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

function StepItem({ step, index }) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      className="flex gap-6 sm:gap-8 items-start"
    >
      {/* Step indicator */}
      <div className="relative shrink-0 flex flex-col items-center">
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[rgba(15,98,254,0.10)] border border-[rgba(15,98,254,0.25)] z-10">
          <Icon size={22} className="text-ibm-blue-light" strokeWidth={1.7} />
        </div>
        <span className="mt-2 text-2xs font-semibold text-ibm-blue tracking-widest uppercase">
          {step.number}
        </span>
      </div>

      {/* Content */}
      <div className="pt-2 pb-2">
        <h3 className="text-lg font-semibold text-white mb-2 leading-snug">
          {step.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

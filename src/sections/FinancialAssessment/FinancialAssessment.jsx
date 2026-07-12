import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign, CreditCard, PiggyBank, TrendingDown, Target,
  ArrowRight, CheckCircle2, AlertCircle, ChevronDown,
  TrendingUp, Loader2, RotateCcw, RefreshCw, AlertTriangle,
} from "lucide-react";
import Section, { Container, SectionLabel } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { analyzeFinances, validateAssessmentForm } from "@/lib/finance";
import { useFinancial } from "@/context/FinancialContext";

/* ── Constants ────────────────────────────────────────────── */
const EMPTY_FORM = {
  monthlyIncome:   "",
  monthlyExpenses: "",
  currentSavings:  "",
  currentDebt:     "",
  financialGoal:   "",
};

const FIELDS = [
  { id: "monthlyIncome",   label: "Monthly Income",   placeholder: "e.g. 5,000",  icon: DollarSign,   type: "number", inputMode: "decimal" },
  { id: "monthlyExpenses", label: "Monthly Expenses", placeholder: "e.g. 3,200",  icon: CreditCard,   type: "number", inputMode: "decimal" },
  { id: "currentSavings",  label: "Current Savings",  placeholder: "e.g. 12,000", icon: PiggyBank,    type: "number", inputMode: "decimal" },
  { id: "currentDebt",     label: "Current Debt",     placeholder: "e.g. 8,500",  icon: TrendingDown, type: "number", inputMode: "decimal" },
];

const GOAL_OPTIONS = [
  "Build an emergency fund",
  "Pay off debt",
  "Save for a home",
  "Grow retirement savings",
  "Achieve financial independence",
  "Reduce monthly expenses",
];

/* ── Helpers ──────────────────────────────────────────────── */
function formsEqual(a, b) {
  return Object.keys(a).every((k) => a[k] === b[k]);
}

/* ── Main Component ───────────────────────────────────────── */
export default function FinancialAssessment() {
  const { setResults } = useFinancial();

  const [form, setForm]             = useState({ ...EMPTY_FORM });
  const [errors, setErrors]         = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [localResult, setLocalResult] = useState(null);
  // Snapshot of the form values that produced the current result
  const [committedForm, setCommittedForm] = useState(null);

  const hasAnalyzed = localResult !== null;
  const isDirty     = hasAnalyzed && !formsEqual(form, committedForm);

  /* ── Handlers ─────────────────────────────────────────── */
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateAssessmentForm(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      document.getElementById(Object.keys(validation)[0])?.focus();
      return;
    }

    setSubmitting(true);
    setErrors({});

    setTimeout(() => {
      const analysis = analyzeFinances(form);
      setLocalResult(analysis);
      setResults(analysis);
      setCommittedForm({ ...form });
      setSubmitting(false);

      // Auto-scroll to AI Chat only on first analysis
      if (!hasAnalyzed) {
        setTimeout(() => {
          document.querySelector("#ai-chat")?.scrollIntoView({ behavior: "smooth" });
        }, 1800);
      }
    }, 900);
  };

  const handleClear = () => {
    setForm({ ...EMPTY_FORM });
    setErrors({});
    setLocalResult(null);
    setCommittedForm(null);
    setResults(null);
  };

  /* ── Derived button label ─────────────────────────────── */
  const submitLabel = submitting
    ? null
    : hasAnalyzed
      ? "Analyze Again"
      : "Analyze My Finances";

  return (
    <Section id="assessment">
      <Container>
        <div className="max-w-2xl mx-auto">
          {/* ── Header ──────────────────────────────────── */}
          <div className="text-center mb-12">
            <SectionLabel>Free Assessment</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Analyze your financial health
            </h2>
            <p className="text-base text-text-secondary leading-relaxed">
              Enter your numbers below. FinPilot AI will calculate your financial
              health score and generate personalized recommendations instantly.
            </p>
          </div>

          {/* ── Glass form card ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.09)] rounded-3xl p-8 backdrop-blur-sm">
              <form onSubmit={handleSubmit} noValidate aria-label="Financial assessment form">

                {/* ── Numeric fields ───────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  {FIELDS.map((field) => (
                    <FormField
                      key={field.id}
                      field={field}
                      value={form[field.id]}
                      error={errors[field.id]}
                      onChange={handleChange}
                      disabled={submitting}
                    />
                  ))}
                </div>

                {/* ── Financial Goal ───────────────────── */}
                <div className="mb-6">
                  <label
                    htmlFor="financialGoal"
                    className="block text-sm font-medium text-text-secondary mb-2"
                  >
                    <span className="flex items-center gap-2">
                      <Target size={14} className="text-ibm-blue-light" />
                      Financial Goal
                    </span>
                  </label>
                  <div className="relative">
                    <select
                      id="financialGoal"
                      name="financialGoal"
                      value={form.financialGoal}
                      onChange={handleChange}
                      disabled={submitting}
                      aria-invalid={!!errors.financialGoal}
                      aria-describedby={errors.financialGoal ? "financialGoal-error" : undefined}
                      className={`w-full appearance-none bg-[rgba(255,255,255,0.05)] border rounded-xl px-4 py-3 text-sm focus:outline-none focus:bg-[rgba(15,98,254,0.06)] transition-all duration-200 cursor-pointer pr-10 disabled:opacity-50 disabled:cursor-not-allowed
                        ${errors.financialGoal
                          ? "border-danger text-white focus:border-danger"
                          : "border-[rgba(255,255,255,0.10)] text-text-secondary focus:text-white focus:border-ibm-blue"
                        }`}
                    >
                      <option value="" disabled className="bg-[#111111]">
                        Select your primary goal
                      </option>
                      {GOAL_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#111111] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <ChevronDown size={14} className="text-[rgba(255,255,255,0.4)]" />
                    </div>
                  </div>
                  {errors.financialGoal && (
                    <p
                      id="financialGoal-error"
                      role="alert"
                      className="mt-2 text-xs text-danger flex items-center gap-1.5"
                    >
                      <AlertCircle size={12} /> {errors.financialGoal}
                    </p>
                  )}
                </div>

                {/* ── Unsaved changes indicator ────────── */}
                <AnimatePresence>
                  {isDirty && (
                    <motion.div
                      key="unsaved"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="flex items-center gap-2 mb-4 px-3 py-2 rounded-lg bg-[rgba(241,194,27,0.08)] border border-[rgba(241,194,27,0.18)]"
                      role="status"
                      aria-live="polite"
                    >
                      <AlertTriangle size={13} className="text-warning shrink-0" />
                      <span className="text-xs font-medium text-warning">
                        Unsaved Changes — click Analyze Again to update your results.
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Action buttons ───────────────────── */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="submit"
                    size="lg"
                    className="flex-1 justify-center group"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Analyzing your finances...
                      </>
                    ) : hasAnalyzed ? (
                      <>
                        <RefreshCw size={15} className="transition-transform duration-300 group-hover:rotate-180" />
                        Analyze Again
                      </>
                    ) : (
                      <>
                        Analyze My Finances
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                      </>
                    )}
                  </Button>

                  {hasAnalyzed && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="lg"
                      onClick={handleClear}
                      disabled={submitting}
                      className="sm:w-auto w-full justify-center"
                      aria-label="Clear form and reset results"
                    >
                      <RotateCcw size={14} />
                      Clear Form
                    </Button>
                  )}
                </div>

                <p className="text-xs text-text-muted text-center mt-4">
                  Your data is processed locally and never stored or shared.
                </p>
              </form>
            </div>

            {/* ── Result Card ─────────────────────────── */}
            <AnimatePresence mode="wait">
              {localResult && (
                <ResultCard
                  key={localResult.score + localResult.income + localResult.expenses}
                  result={localResult}
                  isReanalysis={!!committedForm && hasAnalyzed}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

/* ── FormField ────────────────────────────────────────────── */
function FormField({ field, value, error, onChange, disabled }) {
  const Icon = field.icon;
  return (
    <div>
      <label
        htmlFor={field.id}
        className="block text-sm font-medium text-text-secondary mb-2"
      >
        <span className="flex items-center gap-2">
          <Icon size={14} className="text-ibm-blue-light" />
          {field.label}
        </span>
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-text-muted text-sm">
          $
        </span>
        <input
          id={field.id}
          name={field.id}
          type={field.type}
          inputMode={field.inputMode}
          min={0}
          placeholder={field.placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${field.id}-error` : undefined}
          className={`w-full bg-[rgba(255,255,255,0.05)] border rounded-xl px-4 py-3 pl-7 text-sm focus:outline-none focus:bg-[rgba(15,98,254,0.06)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
            ${error
              ? "border-danger text-white focus:border-danger"
              : "border-[rgba(255,255,255,0.10)] text-white placeholder-text-muted focus:border-ibm-blue"
            }`}
        />
      </div>
      {error && (
        <p
          id={`${field.id}-error`}
          role="alert"
          className="mt-1.5 text-xs text-danger flex items-center gap-1.5"
        >
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

/* ── ResultCard ───────────────────────────────────────────── */
function ResultCard({ result, isReanalysis }) {
  const { score, scoreLabel, scoreBadgeVariant, fmt, recommendations, surplus } = result;

  const circ   = 2 * Math.PI * 44;
  const filled = (score / 100) * circ;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mt-5 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.09)] rounded-3xl p-7 backdrop-blur-sm"
      aria-live="polite"
      aria-label="Financial analysis results"
    >
      {/* ── Header ──────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-6 pb-5 border-b border-[rgba(255,255,255,0.08)]">
        <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[rgba(36,161,72,0.15)] border border-[rgba(36,161,72,0.25)]">
          <CheckCircle2 size={18} className="text-success" />
        </span>
        <div>
          <p className="text-sm font-semibold text-white">
            {isReanalysis ? "Analysis Updated" : "Assessment Complete"}
          </p>
          <p className="text-xs text-text-secondary mt-0.5">
            {isReanalysis
              ? "Dashboard and AI advisor have been refreshed with your new data."
              : "Scrolling to your AI advisor below..."}
          </p>
        </div>
        <div className="ml-auto">
          <Badge variant={scoreBadgeVariant}>{scoreLabel}</Badge>
        </div>
      </div>

      {/* ── Score ring + key metrics ─────────────────── */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
        {/* Score ring */}
        <div className="relative shrink-0">
          <svg width="100" height="100" className="-rotate-90">
            <circle
              cx="50" cy="50" r="44"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="8"
            />
            <motion.circle
              cx="50" cy="50" r="44"
              fill="none"
              stroke="#0F62FE"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={{ strokeDashoffset: circ - filled }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white leading-none">{score}</span>
            <span className="text-2xs text-text-secondary">/100</span>
          </div>
        </div>

        {/* Quick metrics */}
        <div className="grid grid-cols-2 gap-3 flex-1 w-full">
          {[
            { label: "Monthly Surplus", value: `${fmt.surplusSign}${fmt.surplus}`, good: surplus >= 0 },
            { label: "Savings Rate",    value: fmt.savingsRate,                    good: result.savingsRate >= 0.10 },
            { label: "Emergency Fund",  value: fmt.emergencyMonths,                good: result.emergencyMonths >= 3 },
            { label: "Debt Ratio",      value: fmt.debtToIncome,                   good: result.debtToIncome <= 0.36 },
          ].map(({ label, value, good }) => (
            <div
              key={label}
              className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded-xl p-3"
            >
              <p className="text-2xs text-text-muted mb-1">{label}</p>
              <p className={`text-sm font-semibold ${good ? "text-white" : "text-warning"}`}>
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recommendations ──────────────────────────── */}
      <div className="bg-[rgba(15,98,254,0.05)] border border-[rgba(15,98,254,0.14)] rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={15} className="text-ibm-blue-light" />
          <h3 className="text-sm font-semibold text-white">Personalized Recommendations</h3>
        </div>
        <ul className="space-y-3" role="list">
          {recommendations.map((rec, i) => (
            <motion.li
              key={rec}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.09, duration: 0.4, ease: "easeOut" }}
              className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed"
            >
              <CheckCircle2
                size={14}
                className="text-ibm-blue shrink-0 mt-0.5"
                strokeWidth={2}
              />
              {rec}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

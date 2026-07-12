/**
 * FinPilot AI — Financial Calculation Engine
 *
 * Pure functions only. No React, no side effects.
 * All calculations operate on raw numbers and return typed results.
 */

import { formatCurrency, formatPercent } from "@/lib/utils";

/**
 * analyzeFinances()
 *
 * Core engine. Takes raw form inputs and returns a complete
 * financial analysis object used by every dynamic section.
 *
 * @param {object} input
 * @param {number} input.monthlyIncome     - gross monthly income
 * @param {number} input.monthlyExpenses   - total monthly expenses
 * @param {number} input.currentSavings    - current total savings balance
 * @param {number} input.currentDebt       - total outstanding debt balance
 * @param {string} input.financialGoal     - selected goal label
 * @returns {FinancialAnalysis}
 */
export function analyzeFinances({ monthlyIncome, monthlyExpenses, currentSavings, currentDebt, financialGoal }) {
  const income   = Number(monthlyIncome)   || 0;
  const expenses = Number(monthlyExpenses) || 0;
  const savings  = Number(currentSavings)  || 0;
  const debt     = Number(currentDebt)     || 0;

  // ── Core derived values ──────────────────────────────────
  const surplus        = income - expenses;
  const savingsRate    = income > 0 ? surplus / income : 0;
  const emergencyMonths = expenses > 0 ? savings / expenses : 0;
  const debtToIncome   = income > 0 ? (debt / income) / 12 : 0; // monthly DTI
  const expenseRatio   = income > 0 ? expenses / income : 0;

  // ── Financial Health Score (0–100) ───────────────────────
  // Weighted composite of four pillars:
  //   Savings rate   30 pts  — target: ≥20%
  //   Emergency fund 30 pts  — target: ≥6 months
  //   Debt ratio     25 pts  — target: DTI ≤ 36%
  //   Expense ratio  15 pts  — target: expenses ≤ 70% of income
  const savingsScore   = Math.min(30, (savingsRate / 0.20) * 30);
  const emergencyScore = Math.min(30, (emergencyMonths / 6) * 30);
  const debtScore      = Math.min(25, Math.max(0, (1 - debtToIncome / 0.36) * 25));
  const expenseScore   = Math.min(15, Math.max(0, (1 - (expenseRatio - 0.70) / 0.30) * 15));
  const score          = Math.round(savingsScore + emergencyScore + debtScore + expenseScore);

  // ── Score label ──────────────────────────────────────────
  const scoreLabel =
    score >= 85 ? "Excellent" :
    score >= 70 ? "Good"      :
    score >= 50 ? "Fair"      :
    score >= 30 ? "Needs Work":
                  "At Risk";

  const scoreBadgeVariant =
    score >= 85 ? "success" :
    score >= 70 ? "blue"    :
    score >= 50 ? "warning" :
                  "danger";

  // ── Recommendations ──────────────────────────────────────
  const recommendations = generateRecommendations({
    income, expenses, savings, debt, surplus,
    savingsRate, emergencyMonths, debtToIncome,
    expenseRatio, score, financialGoal,
  });

  // ── Watson AI context summary ────────────────────────────
  const aiSummary = buildAISummary({
    income, expenses, savings, debt, surplus,
    savingsRate, emergencyMonths, debtToIncome, score,
    scoreLabel, financialGoal,
  });

  return {
    // Raw inputs
    income, expenses, savings, debt, financialGoal,

    // Derived metrics
    surplus,
    savingsRate,
    emergencyMonths,
    debtToIncome,
    expenseRatio,

    // Score
    score,
    scoreLabel,
    scoreBadgeVariant,

    // Formatted display values
    fmt: {
      income:          formatCurrency(income),
      expenses:        formatCurrency(expenses),
      savings:         formatCurrency(savings),
      debt:            formatCurrency(debt),
      surplus:         formatCurrency(Math.abs(surplus)),
      surplusSign:     surplus >= 0 ? "+" : "-",
      savingsRate:     formatPercent(Math.max(0, savingsRate)),
      emergencyMonths: emergencyMonths.toFixed(1) + " mo",
      debtToIncome:    formatPercent(debtToIncome),
      expenseRatio:    formatPercent(expenseRatio),
    },

    recommendations,
    aiSummary,
  };
}

/**
 * generateRecommendations()
 * Returns 3–5 data-driven, specific recommendation strings.
 */
function generateRecommendations({ income, expenses, savings, debt, surplus, savingsRate, emergencyMonths, debtToIncome, score, financialGoal }) {
  const recs = [];

  // ── Emergency fund ───────────────────────────────────────
  if (emergencyMonths < 3) {
    const needed = expenses * 3 - savings;
    const monthsToGoal = surplus > 0 ? Math.ceil(needed / (surplus * 0.5)) : null;
    recs.push(
      monthsToGoal
        ? `Your emergency fund covers ${emergencyMonths.toFixed(1)} months — well below the 3-month minimum. Allocating ${formatCurrency(surplus * 0.5)}/month gets you there in ~${monthsToGoal} months.`
        : `Your emergency fund covers only ${emergencyMonths.toFixed(1)} months. Prioritize building it to at least 3 months (${formatCurrency(expenses * 3)}) before other goals.`
    );
  } else if (emergencyMonths < 6) {
    const needed = expenses * 6 - savings;
    const monthsToGoal = surplus > 0 ? Math.ceil(needed / (surplus * 0.4)) : null;
    recs.push(
      monthsToGoal
        ? `Emergency fund is at ${emergencyMonths.toFixed(1)} months — good progress. Contributing ${formatCurrency(surplus * 0.4)}/month reaches the 6-month target in ~${monthsToGoal} months.`
        : `Your emergency fund of ${emergencyMonths.toFixed(1)} months is on track. Continue building toward 6 months (${formatCurrency(expenses * 6)}).`
    );
  } else {
    recs.push(`Strong emergency fund at ${emergencyMonths.toFixed(1)} months of coverage. This foundation allows you to take on calculated investment risk.`);
  }

  // ── Savings rate ─────────────────────────────────────────
  if (savingsRate < 0) {
    recs.push(`You are spending ${formatCurrency(Math.abs(surplus))} more than you earn each month. Reducing discretionary expenses is the single highest-impact action you can take right now.`);
  } else if (savingsRate < 0.10) {
    recs.push(`Your savings rate of ${formatPercent(savingsRate)} is below the recommended 10% minimum. Review your largest expense categories — even a 5% reduction in expenses frees up ${formatCurrency(expenses * 0.05)}/month.`);
  } else if (savingsRate < 0.20) {
    recs.push(`Your savings rate of ${formatPercent(savingsRate)} is improving but below the 20% benchmark. Automating a transfer of ${formatCurrency(income * 0.20 - surplus)} more per month would hit that target.`);
  } else {
    recs.push(`Excellent savings rate of ${formatPercent(savingsRate)} — you are saving ${formatCurrency(surplus)}/month, which is ${formatPercent(savingsRate - 0.20)} above the recommended 20% benchmark.`);
  }

  // ── Debt ─────────────────────────────────────────────────
  if (debt > 0) {
    if (debtToIncome > 0.43) {
      recs.push(`Your debt-to-income ratio of ${formatPercent(debtToIncome)} is high and may limit access to credit. Prioritize paying down ${formatCurrency(debt)} in debt — consider the avalanche method (highest interest first).`);
    } else if (debtToIncome > 0.28) {
      recs.push(`Your debt-to-income ratio of ${formatPercent(debtToIncome)} is moderate. Directing an extra ${formatCurrency(income * 0.05)}/month toward your highest-interest debt could save significantly in interest charges.`);
    } else {
      recs.push(`Your debt-to-income ratio of ${formatPercent(debtToIncome)} is within healthy range. Maintain minimum payments and redirect surplus toward your goal: "${financialGoal}".`);
    }
  } else {
    recs.push(`No outstanding debt is a major financial advantage. Your ${formatCurrency(surplus)}/month surplus can be fully directed toward wealth-building and your goal: "${financialGoal}".`);
  }

  // ── Goal-specific ────────────────────────────────────────
  if (financialGoal === "Save for a home") {
    const downPayment = income * 12 * 3 * 0.20; // rough estimate: 20% down on 3x annual income
    const monthsToDown = surplus > 0 ? Math.ceil(downPayment / surplus) : null;
    recs.push(
      monthsToDown
        ? `For a home purchase, a 20% down payment would be approximately ${formatCurrency(downPayment)}. At your current surplus of ${formatCurrency(surplus)}/month, you could reach that in ~${monthsToDown} months.`
        : `For a home purchase, aim for a 20% down payment. Increase your monthly surplus first to build toward that goal effectively.`
    );
  } else if (financialGoal === "Grow retirement savings") {
    const annual401k = income * 12 * 0.15;
    recs.push(`Financial planners recommend saving 15% of gross income for retirement — that's ${formatCurrency(annual401k)}/year. If your employer offers a 401(k) match, contribute at least enough to capture the full match first.`);
  } else if (financialGoal === "Achieve financial independence") {
    const fireNumber = expenses * 12 * 25; // 4% rule
    recs.push(`Financial independence (4% rule) requires a portfolio of ${formatCurrency(fireNumber)}. At your current savings rate, focus on maximizing tax-advantaged accounts (401k, IRA) before taxable investments.`);
  }

  return recs.slice(0, 5);
}

/**
 * buildAISummary()
 * Constructs the natural-language context summary passed to the Watson agent.
 */
function buildAISummary({ income, expenses, savings, debt, surplus, savingsRate, emergencyMonths, debtToIncome, score, scoreLabel, financialGoal }) {
  return `Financial Assessment Summary for FinPilot AI:

Score: ${score}/100 (${scoreLabel})
Monthly Income: ${formatCurrency(income)}
Monthly Expenses: ${formatCurrency(expenses)}
Monthly Surplus: ${formatCurrency(surplus)} (${surplus >= 0 ? "positive" : "deficit"})
Current Savings: ${formatCurrency(savings)}
Current Debt: ${formatCurrency(debt)}
Savings Rate: ${formatPercent(savingsRate)}
Emergency Fund Coverage: ${emergencyMonths.toFixed(1)} months
Debt-to-Income Ratio: ${formatPercent(debtToIncome)}
Primary Financial Goal: ${financialGoal || "Not specified"}

Please act as my personal financial wellness coach. Based on this data, provide personalized advice to help me improve my financial health and achieve my goal.`;
}

/**
 * validateAssessmentForm()
 *
 * Returns a map of field → error message, or empty object if valid.
 * @param {object} form - raw form state
 * @returns {object} errors
 */
export function validateAssessmentForm(form) {
  const errors = {};

  const income   = Number(form.monthlyIncome);
  const expenses = Number(form.monthlyExpenses);
  const savings  = Number(form.currentSavings);
  const debt     = Number(form.currentDebt);

  if (!form.monthlyIncome || isNaN(income) || income <= 0) {
    errors.monthlyIncome = "Monthly income is required and must be greater than 0.";
  }
  if (!form.monthlyExpenses || isNaN(expenses) || expenses < 0) {
    errors.monthlyExpenses = "Monthly expenses are required and cannot be negative.";
  }
  if (form.currentSavings === "" || isNaN(savings) || savings < 0) {
    errors.currentSavings = "Current savings are required (enter 0 if none).";
  }
  if (form.currentDebt === "" || isNaN(debt) || debt < 0) {
    errors.currentDebt = "Current debt is required (enter 0 if none).";
  }
  if (!form.financialGoal) {
    errors.financialGoal = "Please select a financial goal.";
  }

  return errors;
}

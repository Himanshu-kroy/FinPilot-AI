import { createContext, useContext, useState } from "react";

/**
 * FinancialContext — Global state for the user's financial analysis results.
 *
 * Consumed by:
 *   - DashboardPreview  (reads results to display live metrics)
 *   - AIChat            (reads results to build Watson context summary)
 *   - FinancialAssessment (writes results on form submit)
 *
 * Shape of `results` matches the return value of analyzeFinances() in lib/finance.js
 */
const FinancialContext = createContext(null);

export function FinancialProvider({ children }) {
  const [results, setResults] = useState(null);

  return (
    <FinancialContext.Provider value={{ results, setResults }}>
      {children}
    </FinancialContext.Provider>
  );
}

/**
 * useFinancial() — convenience hook to access financial context.
 * Must be called inside a <FinancialProvider> tree.
 */
export function useFinancial() {
  const ctx = useContext(FinancialContext);
  if (!ctx) throw new Error("useFinancial must be used inside <FinancialProvider>");
  return ctx;
}

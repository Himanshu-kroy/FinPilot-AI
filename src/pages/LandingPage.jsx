import Navbar          from "@/components/layout/Navbar";
import Footer          from "@/components/layout/Footer";
import Hero            from "@/sections/Hero/Hero";
import Features        from "@/sections/Features/Features";
import HowItWorks      from "@/sections/HowItWorks/HowItWorks";
import FinancialAssessment from "@/sections/FinancialAssessment/FinancialAssessment";
import DashboardPreview from "@/sections/DashboardPreview/DashboardPreview";
import AIChat          from "@/sections/AIChat/AIChat";

/**
 * LandingPage — One-page marketing + product experience.
 *
 * Section order:
 *   1. Hero
 *   2. Features
 *   3. HowItWorks
 *   4. FinancialAssessment
 *   5. DashboardPreview
 *   6. AIChat
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <Navbar />

      <main id="main-content">
        <Hero />

        {/* Subtle section divider */}
        <div className="h-px mx-auto max-w-7xl px-8 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.07)] to-transparent" aria-hidden="true" />

        <Features />

        <div className="h-px mx-auto max-w-7xl px-8 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.07)] to-transparent" aria-hidden="true" />

        <HowItWorks />

        <div className="h-px mx-auto max-w-7xl px-8 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.07)] to-transparent" aria-hidden="true" />

        <FinancialAssessment />

        <div className="h-px mx-auto max-w-7xl px-8 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.07)] to-transparent" aria-hidden="true" />

        <DashboardPreview />

        <div className="h-px mx-auto max-w-7xl px-8 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.07)] to-transparent" aria-hidden="true" />

        <AIChat />
      </main>

      <Footer />
    </div>
  );
}

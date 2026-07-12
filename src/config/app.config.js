/**
 * FinPilot AI — Application Configuration
 *
 * All environment-driven and app-wide constants live here.
 * Components should import from this file rather than reading
 * import.meta.env directly, keeping env coupling in one place.
 */

// ── App Meta ────────────────────────────────────────────────
export const APP_NAME        = "FinPilot AI";
export const APP_TAGLINE     = "Your AI-Powered Financial Wellness Coach";
export const APP_DESCRIPTION =
  "FinPilot AI uses IBM Watson Orchestrate to help you analyze finances, build savings plans, and reach your financial goals with personalized AI guidance.";

// ── IBM Watson Orchestrate Integration ──────────────────────
// Credentials are embedded directly in WatsonChat.jsx.
// This config block is kept as a reference and for any future
// environment-driven overrides.
export const WATSON_CONFIG = {
  orchestrationID:    "3f406d595f364fb4bf136b9fc22eab21_fc9579c7-a0d2-46f3-a567-0e2b611b2aee",
  hostURL:            "https://us-south.watson-orchestrate.cloud.ibm.com",
  region:             "us-south",
  deploymentPlatform: "ibmcloud",
  crn:                "crn:v1:bluemix:public:watsonx-orchestrate:us-south:a/3f406d595f364fb4bf136b9fc22eab21:fc9579c7-a0d2-46f3-a567-0e2b611b2aee::",
  chatOptions: {
    agentId:            "92949718-3821-47c4-81bf-8e96c2627bdd",
    agentEnvironmentId: "45391817-527a-4933-86f2-acfde95f9711",
  },
  // The wxO embed is always active — no feature flag needed
  enabled: true,
};

// ── Feature Flags ───────────────────────────────────────────
export const FEATURES = {
  watsonChat:          true,
  financialAssessment: true,
  dashboardPreview:    true,
};

// ── External Links ──────────────────────────────────────────
export const LINKS = {
  ibmWatson:  "https://www.ibm.com/products/watson-orchestrate",
  ibmCloud:   "https://cloud.ibm.com",
  docs:       "/docs",
  privacy:    "/privacy",
  terms:      "/terms",
};

// ── Navigation ──────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Features",    href: "/#features"    },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Dashboard",   href: "/#dashboard"   },
  { label: "Pricing",     href: "/pricing"       },
];

import { createBrowserRouter } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";

/**
 * FinPilot AI — Application Router
 *
 * Route structure:
 *   /    →  LandingPage (one-page marketing + product experience)
 *   *    →  LandingPage (redirect all unknown routes to home for now)
 *
 * Future routes:
 *   /dashboard   →  User financial dashboard
 *   /assessment  →  Dedicated assessment page
 *   /pricing     →  Pricing page
 *   /docs        →  Documentation
 */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "*",
    element: <LandingPage />,
  },
]);

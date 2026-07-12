/**
 * WatsonChat — IBM Watson Orchestrate Embedded Agent
 *
 * Renders the dedicated DOM container that wxoLoader targets,
 * then bootstraps the wxO embed script exactly once.
 *
 * The IBM wxO embed flow:
 *  1. window.wxOConfiguration is set with live credentials.
 *  2. wxoLoader.js is appended to <head> via a <script> tag.
 *  3. On script load, wxoLoader.init() is called.
 *  4. The agent UI is injected into the element with id="wxo-chat".
 *
 * Guard rails:
 *  - A module-level flag ensures the script is only injected once,
 *    even if the component unmounts and remounts (React StrictMode,
 *    route transitions, hot-reload).
 *  - The flag is set on window so it survives HMR replacements.
 */

import { useEffect, useRef } from "react";

// ── Live wxO credentials ────────────────────────────────────
const WXO_CONFIG = {
  orchestrationID:    "3f406d595f364fb4bf136b9fc22eab21_fc9579c7-a0d2-46f3-a567-0e2b611b2aee",
  hostURL:            "https://us-south.watson-orchestrate.cloud.ibm.com",
  rootElementID:      "wxo-chat",                // must match the div id below
  deploymentPlatform: "ibmcloud",
  crn:                "crn:v1:bluemix:public:watsonx-orchestrate:us-south:a/3f406d595f364fb4bf136b9fc22eab21:fc9579c7-a0d2-46f3-a567-0e2b611b2aee::",
  chatOptions: {
    agentId:            "92949718-3821-47c4-81bf-8e96c2627bdd",
    agentEnvironmentId: "45391817-527a-4933-86f2-acfde95f9711",
  },
};

export default function WatsonChat() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Prevent duplicate injection across re-renders / StrictMode double-invoke
    if (window.__wxo_loaded__) return;
    window.__wxo_loaded__ = true;

    // Set global configuration before the loader runs
    window.wxOConfiguration = { ...WXO_CONFIG };

    // Dynamically inject the wxO loader script
    const script = document.createElement("script");
    script.src = `${WXO_CONFIG.hostURL}/wxochat/wxoLoader.js?embed=true`;
    script.async = true;

    script.addEventListener("load", function () {
      if (typeof wxoLoader !== "undefined" && typeof wxoLoader.init === "function") {
        wxoLoader.init();
      }
    });

    script.addEventListener("error", function () {
      console.error(
        "[FinPilot AI] Failed to load IBM Watson Orchestrate embed script. " +
        "Check your network connection and verify the hostURL is reachable."
      );
      // Allow retry on next mount if the script failed
      window.__wxo_loaded__ = false;
    });

    document.head.appendChild(script);

    // No cleanup: the wxO widget manages its own DOM lifecycle.
    // Removing the script on unmount would break the running agent session.
  }, []); // empty deps — run once after first mount

  return (
    <div
      id="wxo-chat"
      ref={containerRef}
      aria-label="IBM Watson Orchestrate financial assistant"
      // The wxO SDK injects its full UI into this element.
      // Do not add children here — they will be replaced by the agent.
    />
  );
}

/**
 * useWatson — IBM Watson Orchestrate lifecycle hook.
 *
 * NOTE: Script injection and DOM mounting are now handled directly
 * inside WatsonChat.jsx because the wxO embed requires a specific
 * DOM element (id="wxo-chat") to be present before init() runs.
 *
 * This hook is retained as the public API surface for any component
 * that needs to programmatically interact with the running wxO instance
 * (e.g. open/close the panel, pass context from the assessment form).
 *
 * Usage:
 *   const { isReady } = useWatson();
 */

import { useState, useEffect } from "react";

export function useWatson() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Poll until the wxO instance signals it is ready.
    // The wxO SDK dispatches a custom event or sets a global once loaded.
    const interval = setInterval(() => {
      if (
        typeof window.wxoLoader !== "undefined" &&
        window.__wxo_loaded__ === true
      ) {
        setIsReady(true);
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return { isReady };
}

import { useEffect, useState, useCallback } from "react";
import {
  getConsentState,
  onConsentChange,
  setConsentState,
  logConsentToStatero,
} from "./index.js";

export { initConsent, logConsentToStatero } from "./index.js";

export function useConsent() {
  const [state, setState] = useState(getConsentState());

  useEffect(() => onConsentChange(setState), []);

  const grant = useCallback(async (providers, opts = {}) => {
    const next = { granted: true, providers };
    setConsentState(next);
    if (opts.userId) {
      await logConsentToStatero({
        userId: opts.userId,
        action: "grant",
        providers,
        appId: opts.appId,
        platform: opts.platform,
      });
    }
  }, []);

  const revoke = useCallback(async (providers, opts = {}) => {
    const next = { granted: false, providers: [] };
    setConsentState(next);
    if (opts.userId) {
      await logConsentToStatero({
        userId: opts.userId,
        action: "revoke",
        providers,
        appId: opts.appId,
        platform: opts.platform,
      });
    }
  }, []);

  return { ...state, grant, revoke };
}

export function ConsentProvider({ children }) {
  return children;
}

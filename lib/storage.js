/**
 * Thin, failure-tolerant wrapper around `localStorage`.
 *
 * Private browsing modes and storage quotas can make these calls throw, and a
 * persistence failure should never take the whole workflow down.
 */

export const readStored = (key, fallback) => {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;

    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
};

export const writeStored = (key, value) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Persistence is a convenience here, not a requirement.
  }
};

export const clearStored = () => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.clear();
  } catch {
    // Nothing to do.
  }
};

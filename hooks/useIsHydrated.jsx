"use client";

/**
 * External dependencies.
 */
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * Returns `false` for the server render and the first client render, then
 * `true` once React has hydrated.
 *
 * This lets components read browser-only state (local storage, the resolved
 * colour theme) without ever producing a hydration mismatch, and without
 * setting state from inside an effect.
 */
const useIsHydrated = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

export default useIsHydrated;

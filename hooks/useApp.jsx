"use client";

/**
 * External dependencies.
 */
import { useContext } from "react";

/**
 * Internal dependencies.
 */
import { AppDataContext } from "@providers/AppDataProvider";

/**
 * Reads the shared workflow state and actions.
 */
const useApp = () => {
  const context = useContext(AppDataContext);

  if (!context) {
    throw new Error("useApp must be used inside an <AppDataProvider>.");
  }

  return context;
};

export default useApp;

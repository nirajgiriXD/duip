"use client";

/**
 * External dependencies.
 */
import { AlertTriangleIcon, XIcon } from "lucide-react";

/**
 * Internal dependencies.
 */
import useApp from "@hooks/useApp";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

/**
 * Persistent, dismissible surface for the last failure.
 *
 * Toasts disappear; this stays until the user has dealt with it.
 */
const ErrorBanner = () => {
  const { error, setError, isSubmitting } = useApp();

  if (!error || isSubmitting) return null;

  return (
    <Alert
      variant="destructive"
      className="animate-in fade-in slide-in-from-top-1 pr-12 duration-300"
    >
      <AlertTriangleIcon />
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => setError(null)}
        aria-label="Dismiss error"
        className="absolute top-3 right-3"
      >
        <XIcon />
      </Button>
    </Alert>
  );
};

export default ErrorBanner;

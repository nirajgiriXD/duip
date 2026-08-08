"use client";

/**
 * External dependencies.
 */
import { useEffect } from "react";
import { RotateCcwIcon, TriangleAlertIcon } from "lucide-react";

/**
 * Internal dependencies.
 */
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-svh items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        <span
          className="bg-destructive/10 text-destructive mx-auto mb-6 flex size-12 items-center justify-center rounded-2xl"
          aria-hidden="true"
        >
          <TriangleAlertIcon className="size-6" />
        </span>
        <h1 className="text-xl font-semibold tracking-tight text-balance">
          Something went wrong
        </h1>
        <p className="text-muted-foreground mt-2 text-sm text-pretty">
          {error?.message ||
            "DUIP hit an unexpected error. Your saved session is still intact."}
        </p>
        <Button onClick={reset} className="mt-6">
          <RotateCcwIcon aria-hidden="true" />
          Try again
        </Button>
      </div>
    </main>
  );
}

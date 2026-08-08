/**
 * External dependencies.
 */
import Link from "next/link";
import { CompassIcon } from "lucide-react";

/**
 * Internal dependencies.
 */
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-svh items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        <span
          className="bg-muted text-muted-foreground mx-auto mb-6 flex size-12 items-center justify-center rounded-2xl"
          aria-hidden="true"
        >
          <CompassIcon className="size-6" />
        </span>
        <h1 className="text-xl font-semibold tracking-tight">Page not found</h1>
        <p className="text-muted-foreground mt-2 text-sm text-pretty">
          The page you were looking for does not exist.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Back to DUIP</Link>
        </Button>
      </div>
    </main>
  );
}

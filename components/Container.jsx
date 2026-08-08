"use client";

/**
 * Internal dependencies.
 */
import AppHeader from "./AppHeader";
import Content from "./Content";
import ErrorBanner from "./ErrorBanner";
import Form from "./Form";
import Profiles from "./Profiles";
import RunStatus from "./RunStatus";
import StepNav from "./StepNav";
import Summary from "./Summary";
import useApp from "@hooks/useApp";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const panels = [Form, Profiles, Content, Summary];

/** Shown until the previous session has been read back from local storage. */
const PanelSkeleton = () => (
  <Card aria-hidden="true">
    <CardHeader className="space-y-2">
      <Skeleton className="h-5 w-48" />
      <Skeleton className="h-4 w-72 max-w-full" />
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-9 w-full" />
          </div>
        ))}
      </div>
      <Skeleton className="h-10 w-full" />
    </CardContent>
  </Card>
);

const Container = () => {
  const { activeTab, isHydrated } = useApp();

  const ActivePanel = panels[activeTab] ?? Form;

  return (
    <div className="relative flex min-h-svh flex-col">
      {/* Decorative backdrop */}
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none fixed inset-0 -z-10 opacity-60 mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
      />

      <AppHeader />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="space-y-5 sm:space-y-6">
          <StepNav />

          <RunStatus />
          <ErrorBanner />

          {isHydrated ? (
            <div
              key={activeTab}
              className="animate-in fade-in slide-in-from-bottom-1 duration-300"
            >
              <ActivePanel />
            </div>
          ) : (
            <PanelSkeleton />
          )}
        </div>
      </main>

      <footer className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-muted-foreground text-center text-xs text-balance">
          Everything runs on this machine — searches go through a local headless
          browser and summaries are written by a local language model. Use the
          results responsibly.
        </p>
      </footer>
    </div>
  );
};

export default Container;

"use client";

/**
 * External dependencies.
 */
import {
  CheckIcon,
  FileTextIcon,
  Loader2Icon,
  SearchIcon,
  SparklesIcon,
  UsersIcon,
} from "lucide-react";

/**
 * Internal dependencies.
 */
import useApp from "@hooks/useApp";
import { cn } from "@/lib/utils";
import { STEPS } from "@/lib/constants";

const stepIcons = {
  search: SearchIcon,
  profiles: UsersIcon,
  content: FileTextIcon,
  summary: SparklesIcon,
};

const StepNav = () => {
  const { activeTab, setActiveTab, completed, isSubmitting, stage } = useApp();

  const completedCount = STEPS.filter((step) => completed[step.key]).length;

  return (
    <nav aria-label="Workflow progress">
      {/* Overall progress */}
      <div className="mb-3 flex items-center gap-3">
        <div
          className="bg-muted h-1 flex-1 overflow-hidden rounded-full"
          role="presentation"
        >
          <div
            className="bg-primary h-full rounded-full transition-[width] duration-500 ease-out"
            style={{ width: `${(completedCount / STEPS.length) * 100}%` }}
          />
        </div>
        <p className="text-muted-foreground text-xs font-medium tabular-nums">
          {completedCount} of {STEPS.length} complete
        </p>
      </div>

      <ol className="grid grid-cols-4 gap-1.5 sm:gap-3">
        {STEPS.map((step, index) => {
          const Icon = stepIcons[step.key];
          const isActive = activeTab === index;
          const isComplete = completed[step.key];
          const isBusy = isSubmitting && isActive && Boolean(stage);

          return (
            <li key={step.key}>
              <button
                type="button"
                onClick={() => setActiveTab(index)}
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "group relative flex h-full w-full cursor-pointer flex-col items-center gap-1.5 rounded-xl border p-2.5 text-center transition-all duration-200",
                  "sm:flex-row sm:items-start sm:gap-3 sm:p-3 sm:text-left",
                  "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none",
                  isActive
                    ? "border-primary/40 bg-primary/5 shadow-sm"
                    : "bg-card hover:border-border hover:bg-accent/50 border-transparent"
                )}
              >
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-lg border text-xs font-semibold transition-colors sm:size-8",
                    isComplete
                      ? "border-transparent bg-[var(--success)] text-[var(--success-foreground)]"
                      : isActive
                        ? "border-transparent bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground border-transparent"
                  )}
                >
                  {isBusy ? (
                    <Loader2Icon className="size-4 animate-spin" />
                  ) : isComplete ? (
                    <CheckIcon className="size-4" />
                  ) : (
                    <Icon className="size-4" />
                  )}
                </span>

                <span className="min-w-0">
                  <span
                    className={cn(
                      "block truncate text-[11px] leading-tight font-medium sm:text-sm",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.name}
                  </span>
                  <span className="text-muted-foreground hidden text-xs leading-tight sm:mt-0.5 sm:block">
                    {step.hint}
                  </span>
                </span>

                {/* Non-colour cue that the step already holds data. */}
                <span className="sr-only">
                  {isComplete ? " (complete)" : " (not started)"}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default StepNav;

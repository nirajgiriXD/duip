"use client";

/**
 * External dependencies.
 */
import { CheckIcon, Loader2Icon } from "lucide-react";

/**
 * Internal dependencies.
 */
import useApp from "@hooks/useApp";
import { cn } from "@/lib/utils";
import { PIPELINE_STAGES } from "@/lib/constants";

/**
 * Live feedback for the long running search / crawl / summarise pipeline.
 */
const RunStatus = () => {
  const { stage, isManual } = useApp();

  if (!stage) return null;

  const activeIndex = PIPELINE_STAGES.findIndex((item) => item.key === stage);

  // A manual run performs one stage at a time, so only that stage is relevant.
  const visibleStages = isManual
    ? PIPELINE_STAGES.filter((item) => item.key === stage)
    : PIPELINE_STAGES;

  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-card animate-in fade-in slide-in-from-top-1 overflow-hidden rounded-xl border shadow-sm duration-300"
    >
      {/* Indeterminate activity bar */}
      <div className="bg-muted h-1 w-full overflow-hidden">
        <div className="bg-primary h-full w-1/3 animate-[indeterminate_1.6s_ease-in-out_infinite] rounded-full" />
      </div>

      <div className="p-4 sm:p-5">
        <p className="text-sm font-semibold">Working on it</p>
        <p className="text-muted-foreground mt-0.5 text-xs">
          This runs a real browser and a local language model, so it can take a
          few minutes. Keep this tab open.
        </p>

        <ol className="mt-4 space-y-3">
          {visibleStages.map((item) => {
            const itemIndex = PIPELINE_STAGES.findIndex(
              (pipelineStage) => pipelineStage.key === item.key
            );
            const isDone = itemIndex < activeIndex;
            const isActive = itemIndex === activeIndex;

            return (
              <li key={item.key} className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold",
                    isDone &&
                      "border-transparent bg-[var(--success)] text-[var(--success-foreground)]",
                    isActive && "border-primary text-primary",
                    !isDone && !isActive && "text-muted-foreground"
                  )}
                >
                  {isDone ? (
                    <CheckIcon className="size-3" />
                  ) : isActive ? (
                    <Loader2Icon className="size-3 animate-spin" />
                  ) : (
                    itemIndex + 1
                  )}
                </span>

                <span className="min-w-0">
                  <span
                    className={cn(
                      "block text-sm leading-tight font-medium",
                      isActive
                        ? "text-foreground"
                        : isDone
                          ? "text-muted-foreground"
                          : "text-muted-foreground/70"
                    )}
                  >
                    {item.label}
                    {isDone && <span className="sr-only"> (done)</span>}
                    {isActive && <span className="sr-only"> (in progress)</span>}
                  </span>
                  <span className="text-muted-foreground mt-0.5 block text-xs">
                    {item.description}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default RunStatus;

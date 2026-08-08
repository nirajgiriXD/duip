/**
 * Internal dependencies.
 */
import { cn } from "@/lib/utils";

/**
 * The single empty-state treatment used everywhere in the app.
 */
const EmptyState = ({ icon: Icon, title, description, action, className }) => {
  return (
    <div
      className={cn(
        "border-border/70 bg-muted/30 flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-12 text-center",
        className
      )}
    >
      {Icon && (
        <span
          className="bg-background text-muted-foreground mb-4 flex size-11 items-center justify-center rounded-xl border shadow-sm"
          aria-hidden="true"
        >
          <Icon className="size-5" />
        </span>
      )}
      <h3 className="text-sm font-semibold text-balance">{title}</h3>
      {description && (
        <p className="text-muted-foreground mt-1.5 max-w-sm text-sm text-pretty">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};

export default EmptyState;

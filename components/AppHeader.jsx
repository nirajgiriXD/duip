"use client";

/**
 * External dependencies.
 */
import { RadarIcon, RotateCcwIcon } from "lucide-react";

/**
 * Internal dependencies.
 */
import useApp from "@hooks/useApp";
import ModeToggle from "./ModeToggle";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AppHeader = () => {
  const { resetApp, isSubmitting } = useApp();

  return (
    <header className="bg-background/80 supports-backdrop-filter:bg-background/60 sticky top-0 z-40 border-b backdrop-blur-lg">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex min-w-0 items-center gap-3">
          <span
            className="bg-primary text-primary-foreground ring-primary/20 flex size-9 shrink-0 items-center justify-center rounded-xl shadow-sm ring-4"
            aria-hidden="true"
          >
            <RadarIcon className="size-5" />
          </span>
          <div className="min-w-0">
            <h1 className="text-sm leading-tight font-semibold tracking-tight">
              DUIP
            </h1>
            <p className="text-muted-foreground truncate text-xs leading-tight">
              Discover User Internet Profile
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <ModeToggle />

          <AlertDialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    disabled={isSubmitting}
                    aria-label="Reset session"
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <RotateCcwIcon />
                  </Button>
                </AlertDialogTrigger>
              </TooltipTrigger>
              <TooltipContent>Reset session</TooltipContent>
            </Tooltip>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset this session?</AlertDialogTitle>
                <AlertDialogDescription>
                  This clears the search details, every profile you collected,
                  the assembled content and the generated summary from this
                  browser. It cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep my session</AlertDialogCancel>
                <AlertDialogAction
                  onClick={resetApp}
                  className="bg-destructive text-white hover:bg-destructive/90"
                >
                  Reset everything
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

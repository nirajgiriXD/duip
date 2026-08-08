"use client";

/**
 * External dependencies.
 */
import { useMemo, useState } from "react";
import {
  CheckIcon,
  CopyIcon,
  FileTextIcon,
  LockIcon,
  Loader2Icon,
  SparklesIcon,
  UsersIcon,
} from "lucide-react";

/**
 * Internal dependencies.
 */
import useApp from "@hooks/useApp";
import EmptyState from "./EmptyState";
import { DATA_ANALYST_TYPES, STEP_INDEX } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Content = () => {
  const {
    profileContent,
    handleContentChange,
    handleContentSubmit,
    dataAnalystType,
    setDataAnalystType,
    isSubmitting,
    isManual,
    setActiveTab,
  } = useApp();

  const [hasCopied, setHasCopied] = useState(false);

  const selectedLens = DATA_ANALYST_TYPES.find(
    (type) => type.value === dataAnalystType
  );

  const wordCount = useMemo(() => {
    const trimmed = profileContent.trim();
    return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
  }, [profileContent]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileContent);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    } catch {
      setHasCopied(false);
    }
  };

  if (profileContent === "") {
    return (
      <Card>
        <CardHeader>
          <CardTitle asChild>
            <h2>Assembled content</h2>
          </CardTitle>
          <CardDescription>
            The readable text pulled from every selected profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={FileTextIcon}
            title="Nothing assembled yet"
            description="Select the profiles worth reading, then assemble their content so the model has something to work from."
            action={
              <Button onClick={() => setActiveTab(STEP_INDEX.profiles)}>
                <UsersIcon aria-hidden="true" />
                Go to profiles
              </Button>
            }
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle asChild>
          <h2>Assembled content</h2>
        </CardTitle>
        <CardDescription>
          {isManual
            ? "Edit this text freely — the analysis is generated from exactly what is here."
            : "The text this run's analysis was generated from."}
        </CardDescription>

        <CardAction className="flex items-center gap-2">
          <Badge variant="secondary" className="tabular-nums">
            {wordCount.toLocaleString()} words
          </Badge>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={handleCopy}
                aria-label="Copy content to clipboard"
                className="text-muted-foreground"
              >
                {hasCopied ? <CheckIcon /> : <CopyIcon />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {hasCopied ? "Copied" : "Copy to clipboard"}
            </TooltipContent>
          </Tooltip>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-3">
        <Label htmlFor="profile-content" className="sr-only">
          Assembled profile content
        </Label>
        <Textarea
          id="profile-content"
          value={profileContent}
          onChange={handleContentChange}
          disabled={!isManual || isSubmitting}
          readOnly={!isManual}
          rows={16}
          spellCheck={false}
          aria-describedby="content-mode-hint"
          className="scrollbar-slim bg-muted/30 max-h-[50vh] min-h-64 resize-y font-mono text-xs leading-relaxed disabled:opacity-100"
        />

        {!isManual && (
          <p
            id="content-mode-hint"
            className="text-muted-foreground flex items-start gap-2 text-xs"
          >
            <LockIcon
              className="mt-0.5 size-3.5 shrink-0"
              aria-hidden="true"
            />
            <span>
              Automatic runs are read-only. Switch the run mode to{" "}
              <strong className="font-medium">Manual</strong> on the search step
              to edit this text and re-run the analysis.
            </span>
          </p>
        )}
      </CardContent>

      {isManual && (
        <CardFooter className="flex-col items-stretch gap-4 border-t">
          <div className="grid gap-2">
            <Label htmlFor="data-analyst-type">Analysis lens</Label>
            <Select
              value={dataAnalystType}
              onValueChange={setDataAnalystType}
              disabled={isSubmitting}
            >
              <SelectTrigger
                id="data-analyst-type"
                aria-describedby="data-analyst-type-hint"
                className="w-full sm:max-w-sm"
              >
                <SelectValue placeholder="Choose a lens">
                  {selectedLens?.label}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {DATA_ANALYST_TYPES.map((type) => (
                  <SelectItem
                    key={type.value}
                    value={type.value}
                    textValue={type.label}
                  >
                    <span className="flex flex-col items-start gap-0.5 py-0.5">
                      <span className="font-medium">{type.label}</span>
                      <span className="text-muted-foreground text-xs">
                        {type.description}
                      </span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p
              id="data-analyst-type-hint"
              className="text-muted-foreground text-xs"
            >
              {selectedLens?.description}
            </p>
          </div>

          <Button
            type="button"
            size="lg"
            onClick={handleContentSubmit}
            disabled={isSubmitting || profileContent.trim() === ""}
            className="w-full sm:w-auto sm:self-end"
          >
            {isSubmitting ? (
              <>
                <Loader2Icon className="animate-spin" aria-hidden="true" />
                Analyzing…
              </>
            ) : (
              <>
                <SparklesIcon aria-hidden="true" />
                Analyze
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default Content;

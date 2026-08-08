"use client";

/**
 * External dependencies.
 */
import { useMemo, useState } from "react";
import Markdown from "markdown-to-jsx";
import {
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  FileTextIcon,
  SparklesIcon,
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Typography for the model's markdown output, expressed with design tokens so
 * it stays consistent with the rest of the app in both themes.
 */
const markdownOptions = {
  overrides: {
    h1: {
      props: {
        className:
          "mt-8 mb-3 text-lg font-semibold tracking-tight first:mt-0 text-balance",
      },
    },
    h2: {
      props: {
        className:
          "mt-8 mb-3 text-base font-semibold tracking-tight first:mt-0 text-balance",
      },
    },
    h3: {
      props: {
        className: "mt-6 mb-2 text-sm font-semibold first:mt-0",
      },
    },
    h4: {
      props: { className: "mt-5 mb-2 text-sm font-semibold first:mt-0" },
    },
    p: {
      props: { className: "text-sm leading-relaxed text-pretty" },
    },
    ul: {
      props: { className: "my-3 ml-5 list-disc space-y-1.5 text-sm" },
    },
    ol: {
      props: { className: "my-3 ml-5 list-decimal space-y-1.5 text-sm" },
    },
    li: { props: { className: "leading-relaxed pl-1" } },
    strong: { props: { className: "font-semibold text-foreground" } },
    em: { props: { className: "italic" } },
    a: {
      props: {
        className:
          "text-primary underline underline-offset-4 hover:no-underline",
        target: "_blank",
        rel: "noopener noreferrer",
      },
    },
    blockquote: {
      props: {
        className:
          "my-4 border-l-2 border-primary/40 pl-4 text-sm italic text-muted-foreground",
      },
    },
    code: {
      props: {
        className: "rounded bg-muted px-1.5 py-0.5 font-mono text-[0.8em]",
      },
    },
    pre: {
      props: {
        className:
          "scrollbar-slim my-4 overflow-x-auto rounded-lg bg-muted p-3 font-mono text-xs",
      },
    },
    hr: { props: { className: "my-6 border-border" } },
    table: {
      props: {
        className: "my-4 w-full border-collapse text-sm",
      },
    },
    th: {
      props: {
        className: "border-b px-3 py-2 text-left text-xs font-semibold",
      },
    },
    td: { props: { className: "border-b px-3 py-2 align-top" } },
  },
};

const Summary = () => {
  const { profileSummary, summaryLens, setActiveTab, completed } = useApp();
  const [hasCopied, setHasCopied] = useState(false);

  const lens = useMemo(
    () => DATA_ANALYST_TYPES.find((type) => type.value === summaryLens),
    [summaryLens]
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileSummary);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    } catch {
      setHasCopied(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([profileSummary], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "duip-summary.md";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  if (profileSummary === "") {
    return (
      <Card>
        <CardHeader>
          <CardTitle asChild>
            <h2>Analysis</h2>
          </CardTitle>
          <CardDescription>
            What your local language model made of the assembled content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={SparklesIcon}
            title="No analysis yet"
            description={
              completed.content
                ? "The content is ready. Run the analysis to turn it into a summary."
                : "Assemble some profile content first — the model needs something to read."
            }
            action={
              <Button
                onClick={() =>
                  setActiveTab(
                    completed.content ? STEP_INDEX.content : STEP_INDEX.profiles
                  )
                }
              >
                <FileTextIcon aria-hidden="true" />
                {completed.content ? "Go to content" : "Go to profiles"}
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
          <h2>Analysis</h2>
        </CardTitle>
        <CardDescription>
          Generated locally from the assembled content. Treat it as a lead, not
          a fact.
        </CardDescription>

        <CardAction className="flex items-center gap-2">
          {lens && (
            <Badge variant="secondary" className="hidden sm:inline-flex">
              {lens.label} lens
            </Badge>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={handleCopy}
                aria-label="Copy summary to clipboard"
                className="text-muted-foreground"
              >
                {hasCopied ? <CheckIcon /> : <CopyIcon />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {hasCopied ? "Copied" : "Copy to clipboard"}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={handleDownload}
                aria-label="Download summary as Markdown"
                className="text-muted-foreground"
              >
                <DownloadIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Download as Markdown</TooltipContent>
          </Tooltip>
        </CardAction>
      </CardHeader>

      <CardContent>
        {/* Deliberately not height-capped: the report reads better as part of
            the page scroll than inside a nested scroll region. */}
        <article className="bg-muted/20 rounded-xl border p-4 sm:p-6">
          <Markdown options={markdownOptions}>{profileSummary}</Markdown>
        </article>
      </CardContent>
    </Card>
  );
};

export default Summary;

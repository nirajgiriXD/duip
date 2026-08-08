"use client";

/**
 * External dependencies.
 */
import { useMemo } from "react";
import {
  AtSignIcon,
  BriefcaseIcon,
  Building2Icon,
  InfoIcon,
  Loader2Icon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SearchIcon,
  UserIcon,
  WandSparklesIcon,
} from "lucide-react";

/**
 * Internal dependencies.
 */
import useApp from "@hooks/useApp";
import getSearchQuery from "@/utilities/getSearchQuery";
import { cn } from "@/lib/utils";
import {
  DATA_ANALYST_TYPES,
  PROCESS_MODES,
  SEARCH_FIELDS,
} from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const fieldIcons = {
  user: UserIcon,
  atSign: AtSignIcon,
  mail: MailIcon,
  phone: PhoneIcon,
  briefcase: BriefcaseIcon,
  building: Building2Icon,
  mapPin: MapPinIcon,
};

const Form = () => {
  const {
    formData,
    handleFormDataChange,
    setFormField,
    handleFormSubmit,
    isSubmitting,
    filledFieldCount,
    dataAnalystType,
    setDataAnalystType,
  } = useApp();

  const canSubmit = filledFieldCount > 0 && !isSubmitting;

  const selectedLens = DATA_ANALYST_TYPES.find(
    (type) => type.value === dataAnalystType
  );

  // Shows exactly what will be sent to the search engine.
  const previewQuery = useMemo(() => {
    if (filledFieldCount === 0) return "";

    try {
      return decodeURIComponent(
        getSearchQuery(formData).split("?q=")[1] || ""
      ).replace(/\+/g, " ");
    } catch {
      return "";
    }
  }, [formData, filledFieldCount]);

  return (
    <form onSubmit={handleFormSubmit} noValidate={false}>
      <Card>
        <CardHeader>
          <CardTitle asChild>
            <h2>Who are you looking for?</h2>
          </CardTitle>
          <CardDescription>
            Fill in whatever you know. Every field you add narrows the search,
            but one is enough to begin.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Identity details */}
          <fieldset
            disabled={isSubmitting}
            className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2"
          >
            <legend className="sr-only">Identity details</legend>

            {SEARCH_FIELDS.map((field) => {
              const Icon = fieldIcons[field.icon];
              const inputId = `search-${field.name}`;

              return (
                <div
                  key={field.name}
                  className={cn(
                    "flex flex-col gap-2",
                    field.fullWidth && "sm:col-span-2"
                  )}
                >
                  <Label htmlFor={inputId}>{field.label}</Label>
                  <div className="relative">
                    <Icon
                      className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                      aria-hidden="true"
                    />
                    <Input
                      id={inputId}
                      name={field.name}
                      type={field.type}
                      value={formData[field.name] || ""}
                      onChange={handleFormDataChange}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete}
                      className="pl-9"
                    />
                  </div>
                </div>
              );
            })}
          </fieldset>

          <Separator />

          {/* Run mode */}
          <fieldset disabled={isSubmitting} className="space-y-3">
            <legend className="text-sm font-medium">How should it run?</legend>
            <RadioGroup
              value={formData.process}
              onValueChange={(value) => setFormField("process", value)}
              className="grid gap-3 sm:grid-cols-2"
            >
              {PROCESS_MODES.map((mode) => {
                const isChecked = formData.process === mode.value;

                return (
                  <Label
                    key={mode.value}
                    htmlFor={`process-${mode.value}`}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors",
                      "hover:bg-accent/50 has-focus-visible:ring-ring/50 has-focus-visible:ring-[3px]",
                      isChecked
                        ? "border-primary/50 bg-primary/5"
                        : "border-border"
                    )}
                  >
                    <RadioGroupItem
                      id={`process-${mode.value}`}
                      value={mode.value}
                      className="mt-0.5"
                    />
                    <span className="grid gap-1">
                      <span className="text-sm leading-none font-medium">
                        {mode.label}
                      </span>
                      <span className="text-muted-foreground text-xs leading-relaxed font-normal">
                        {mode.description}
                      </span>
                    </span>
                  </Label>
                );
              })}
            </RadioGroup>
          </fieldset>

          {/* Analyst lens */}
          <div className="space-y-2">
            <Label htmlFor="analyst-lens">Analysis lens</Label>
            <Select
              value={dataAnalystType}
              onValueChange={setDataAnalystType}
              disabled={isSubmitting}
            >
              <SelectTrigger
                id="analyst-lens"
                aria-describedby="analyst-lens-hint"
                className="w-full sm:max-w-sm"
              >
                {/* Only the label belongs in the trigger; the description sits
                    below it so the control keeps a single-line height. */}
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
            <p id="analyst-lens-hint" className="text-muted-foreground text-xs">
              {selectedLens?.description} Sets the perspective the local model
              writes the summary from.
            </p>
          </div>

          {/* Query preview */}
          {previewQuery && (
            <div className="bg-muted/40 rounded-xl border p-3">
              <p className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
                <InfoIcon className="size-3.5" aria-hidden="true" />
                Search query preview
              </p>
              <p className="text-foreground/80 mt-1.5 font-mono text-xs wrap-break-word">
                {previewQuery}
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex-col items-stretch gap-3 border-t sm:flex-row sm:items-center sm:justify-between">
          <p
            className="text-muted-foreground text-xs"
            id="search-submit-hint"
            aria-live="polite"
          >
            {filledFieldCount === 0
              ? "Add at least one detail to start a search."
              : `${filledFieldCount} detail${filledFieldCount === 1 ? "" : "s"} will be used.`}
          </p>

          <Button
            type="submit"
            size="lg"
            disabled={!canSubmit}
            aria-describedby="search-submit-hint"
            className="w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2Icon className="animate-spin" aria-hidden="true" />
                Running…
              </>
            ) : formData.process === "manual" ? (
              <>
                <SearchIcon aria-hidden="true" />
                Search public data
              </>
            ) : (
              <>
                <WandSparklesIcon aria-hidden="true" />
                Search &amp; analyze
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Form;

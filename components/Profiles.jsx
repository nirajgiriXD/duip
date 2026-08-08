"use client";

/**
 * External dependencies.
 */
import { useState } from "react";
import {
  BookmarkIcon,
  ExternalLinkIcon,
  GlobeIcon,
  Loader2Icon,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
  UsersIcon,
} from "lucide-react";

/**
 * Internal dependencies.
 */
import useApp from "@hooks/useApp";
import EmptyState from "./EmptyState";
import ProfileDialog from "./ProfileDialog";
import { cn } from "@/lib/utils";
import { STEP_INDEX } from "@/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/** Readable host for a result URL, used as the secondary line. */
const getHostname = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

const ProfileAvatar = ({ profile }) => (
  <Avatar className="size-8 rounded-lg border">
    <AvatarImage src={profile.imageUrl || undefined} alt="" />
    <AvatarFallback className="rounded-lg text-xs">
      <GlobeIcon className="text-muted-foreground size-3.5" />
    </AvatarFallback>
  </Avatar>
);

const ProfileActions = ({ profile, onSave, onRemove }) => (
  <div className="flex items-center gap-0.5">
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => onSave(profile)}
          aria-pressed={Boolean(profile.isSaved)}
          aria-label={
            profile.isSaved
              ? `Stop keeping ${profile.title} across searches`
              : `Keep ${profile.title} across searches`
          }
          className={cn(
            profile.isSaved
              ? "text-primary hover:text-primary"
              : "text-muted-foreground"
          )}
        >
          <BookmarkIcon className={cn(profile.isSaved && "fill-current")} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {profile.isSaved ? "Kept across searches" : "Keep across searches"}
      </TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          asChild
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground"
        >
          <a
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${profile.title} in a new tab`}
          >
            <ExternalLinkIcon />
          </a>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Open in a new tab</TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => onRemove(profile)}
          aria-label={`Remove ${profile.title}`}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2Icon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Remove from the list</TooltipContent>
    </Tooltip>
  </div>
);

const Profiles = () => {
  const {
    isManual,
    profiles,
    isSubmitting,
    selectedProfileCount,
    removeProfile,
    handleProfileSave,
    handleProfileSelect,
    setAllProfilesSelected,
    handleProfileSubmit,
    setActiveTab,
    setIsProfileFormOpen,
  } = useApp();

  const [profileToRemove, setProfileToRemove] = useState(null);

  const allSelected =
    profiles.length > 0 && selectedProfileCount === profiles.length;

  if (profiles.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle asChild>
            <h2>Profiles</h2>
          </CardTitle>
          <CardDescription>
            Public results found across the web. Keep the ones worth reading.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={UsersIcon}
            title="No profiles yet"
            description="Run a search to collect public results, or add a page you already know about."
            action={
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button onClick={() => setActiveTab(STEP_INDEX.search)}>
                  <SearchIcon aria-hidden="true" />
                  Go to search
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsProfileFormOpen(true)}
                >
                  <PlusIcon aria-hidden="true" />
                  Add manually
                </Button>
              </div>
            }
          />
          {/* Mounted so the "Add manually" button above can open it. */}
          <ProfileDialog hideTrigger />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle asChild>
            <h2>Profiles</h2>
          </CardTitle>
          <CardDescription>
            {isManual
              ? "Choose which results the analysis should be based on."
              : "The results this run was based on."}
          </CardDescription>

          <CardAction className="flex items-center gap-2">
            <Badge variant="secondary" className="tabular-nums">
              {profiles.length} found
            </Badge>
            {isManual && (
              <Badge variant="outline" className="tabular-nums">
                {selectedProfileCount} selected
              </Badge>
            )}
          </CardAction>
        </CardHeader>

        <CardContent className="space-y-4">
          {isManual && (
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setAllProfilesSelected(!allSelected)}
              >
                {allSelected ? "Clear selection" : "Select all"}
              </Button>
              <ProfileDialog />
            </div>
          )}

          {/* Desktop: table */}
          <div className="hidden overflow-hidden rounded-xl border md:block">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-12">
                    {isManual ? (
                      <span className="sr-only">Include</span>
                    ) : (
                      <span className="sr-only">Position</span>
                    )}
                  </TableHead>
                  <TableHead className="w-14">
                    <span className="sr-only">Thumbnail</span>
                  </TableHead>
                  <TableHead>Result</TableHead>
                  {isManual && (
                    <TableHead className="w-32 text-right">Actions</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {profiles.map((profile, index) => (
                  <TableRow
                    key={profile.url}
                    data-state={
                      isManual && profile.isSelected ? "selected" : undefined
                    }
                  >
                    <TableCell>
                      {isManual ? (
                        <Checkbox
                          checked={Boolean(profile.isSelected)}
                          onCheckedChange={() => handleProfileSelect(profile)}
                          aria-label={`Include ${profile.title} in the analysis`}
                        />
                      ) : (
                        <span className="text-muted-foreground text-sm tabular-nums">
                          {index + 1}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <ProfileAvatar profile={profile} />
                    </TableCell>
                    <TableCell className="max-w-0">
                      <p
                        className="truncate text-sm font-medium"
                        title={profile.title}
                      >
                        {profile.title}
                      </p>
                      <p className="text-muted-foreground truncate text-xs">
                        {getHostname(profile.url)}
                      </p>
                    </TableCell>
                    {isManual && (
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <ProfileActions
                            profile={profile}
                            onSave={handleProfileSave}
                            onRemove={setProfileToRemove}
                          />
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile: cards */}
          <ul className="space-y-2 md:hidden">
            {profiles.map((profile, index) => (
              <li
                key={profile.url}
                className={cn(
                  "rounded-xl border p-3 transition-colors",
                  isManual && profile.isSelected && "border-primary/40 bg-primary/5"
                )}
              >
                <div className="flex items-start gap-3">
                  {isManual ? (
                    <Checkbox
                      checked={Boolean(profile.isSelected)}
                      onCheckedChange={() => handleProfileSelect(profile)}
                      aria-label={`Include ${profile.title} in the analysis`}
                      className="mt-1"
                    />
                  ) : (
                    <span className="text-muted-foreground mt-0.5 w-4 text-sm tabular-nums">
                      {index + 1}
                    </span>
                  )}

                  <ProfileAvatar profile={profile} />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {profile.title}
                    </p>
                    <p className="text-muted-foreground truncate text-xs">
                      {getHostname(profile.url)}
                    </p>
                  </div>
                </div>

                {isManual && (
                  <div className="mt-2 flex justify-end">
                    <ProfileActions
                      profile={profile}
                      onSave={handleProfileSave}
                      onRemove={setProfileToRemove}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </CardContent>

        {isManual && (
          <CardFooter className="flex-col items-stretch gap-3 border-t sm:flex-row sm:items-center sm:justify-between">
            <p className="text-muted-foreground text-xs" aria-live="polite">
              {selectedProfileCount === 0
                ? "Select at least one profile to continue."
                : `Content will be pulled from ${selectedProfileCount} profile${
                    selectedProfileCount === 1 ? "" : "s"
                  }.`}
            </p>
            <Button
              type="button"
              size="lg"
              onClick={handleProfileSubmit}
              disabled={isSubmitting || selectedProfileCount === 0}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2Icon className="animate-spin" aria-hidden="true" />
                  Assembling…
                </>
              ) : (
                "Assemble content"
              )}
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Remove confirmation */}
      <AlertDialog
        open={Boolean(profileToRemove)}
        onOpenChange={(open) => !open && setProfileToRemove(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this profile?</AlertDialogTitle>
            <AlertDialogDescription>
              &ldquo;{profileToRemove?.title}&rdquo; will be taken out of the
              list and will not be used in the analysis.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                removeProfile(profileToRemove);
                setProfileToRemove(null);
              }}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Profiles;

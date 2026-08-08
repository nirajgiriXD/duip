"use client";

/**
 * External dependencies.
 */
import { PlusIcon } from "lucide-react";

/**
 * Internal dependencies.
 */
import useApp from "@hooks/useApp";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Adds a profile that the search did not surface.
 */
const ProfileDialog = ({ trigger, hideTrigger = false }) => {
  const {
    newProfile,
    handleProfileFormChange,
    setNewProfileField,
    addProfile,
    isProfileFormOpen,
    setIsProfileFormOpen,
  } = useApp();

  const handleSubmit = (event) => {
    event.preventDefault();
    addProfile(newProfile);
  };

  return (
    <Dialog open={isProfileFormOpen} onOpenChange={setIsProfileFormOpen}>
      {!hideTrigger && (
        <DialogTrigger asChild>
          {trigger ?? (
            <Button variant="outline" size="sm">
              <PlusIcon aria-hidden="true" />
              Add profile
            </Button>
          )}
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add a profile</DialogTitle>
            <DialogDescription>
              Point DUIP at a page the search missed. It will be crawled with
              the rest when you assemble the content.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-6">
            <div className="grid gap-2">
              <Label htmlFor="profile-title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="profile-title"
                name="title"
                value={newProfile.title}
                onChange={handleProfileFormChange}
                placeholder="Ada Lovelace on LinkedIn"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="profile-url">
                Profile URL <span className="text-destructive">*</span>
              </Label>
              <Input
                id="profile-url"
                name="url"
                type="url"
                value={newProfile.url}
                onChange={handleProfileFormChange}
                placeholder="https://example.com/ada"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="profile-image-url">Image URL</Label>
              <Input
                id="profile-image-url"
                name="imageUrl"
                type="url"
                value={newProfile.imageUrl || ""}
                onChange={handleProfileFormChange}
                placeholder="https://example.com/avatar.png"
              />
              <p className="text-muted-foreground text-xs">
                Optional. Used as the thumbnail in the list.
              </p>
            </div>

            <fieldset className="grid gap-3">
              <legend className="mb-3 text-sm font-medium">Options</legend>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="profile-selected"
                  checked={
                    newProfile.isSelected === true ||
                    newProfile.isSelected === "true"
                  }
                  onCheckedChange={(checked) =>
                    setNewProfileField("isSelected", checked === true)
                  }
                />
                <Label
                  htmlFor="profile-selected"
                  className="grid gap-1 leading-none font-normal"
                >
                  <span className="text-sm font-medium">
                    Include in the analysis
                  </span>
                  <span className="text-muted-foreground text-xs">
                    Its content will be crawled and sent to the model.
                  </span>
                </Label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="profile-saved"
                  checked={
                    newProfile.isSaved === true || newProfile.isSaved === "true"
                  }
                  onCheckedChange={(checked) =>
                    setNewProfileField("isSaved", checked === true)
                  }
                />
                <Label
                  htmlFor="profile-saved"
                  className="grid gap-1 leading-none font-normal"
                >
                  <span className="text-sm font-medium">
                    Keep across searches
                  </span>
                  <span className="text-muted-foreground text-xs">
                    Saved profiles survive the next search instead of being
                    replaced.
                  </span>
                </Label>
              </div>
            </fieldset>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              <PlusIcon aria-hidden="true" />
              Add profile
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;

"use client";

/**
 * External dependencies.
 */
import { useCallback } from "react";

/**
 * Internal dependencies.
 */
import { postJson } from "@/lib/api";
import { INITIAL_NEW_PROFILE, STEP_INDEX, STORAGE_KEYS } from "@/lib/constants";
import { writeStored } from "@/lib/storage";

/** Normalises the loose `"true"`/`true` values coming out of form controls. */
const toBoolean = (value) => value === true || value === "true";

const useProfile = ({
  setActiveTab,
  setIsSubmitting,
  setStage,
  setError,
  formData,
  profiles,
  setProfiles,
  setNewProfile,
  setIsProfileFormOpen,
  fetchProfileContent,
  notify,
}) => {
  const persistProfiles = useCallback(
    (nextProfiles) => {
      setProfiles(nextProfiles);
      writeStored(STORAGE_KEYS.profiles, nextProfiles);
    },
    [setProfiles]
  );

  const fetchProfiles = useCallback(async () => {
    const data = await postJson("/api/search", formData);

    // Retrieve data from the response data
    const _profiles = data.profiles || [];
    const _searchQuery = data.searchQuery || "";

    // Merge with the saved profiles
    const savedProfiles = profiles.filter((profile) => profile.isSaved);
    const newProfiles = _profiles.filter(
      (item) => !savedProfiles.some((profile) => profile.url === item.url)
    );
    const mergedProfiles = [...savedProfiles, ...newProfiles];

    // Save the stringified JSON object to local storage
    writeStored(STORAGE_KEYS.profiles, mergedProfiles);
    writeStored(STORAGE_KEYS.searchQuery, _searchQuery);

    // Set profiles by merging the new profiles with the saved profiles
    setProfiles(mergedProfiles);

    return { _profiles: mergedProfiles, _searchQuery };
  }, [formData, profiles, setProfiles]);

  const handleProfileSelect = useCallback(
    (profile) => {
      persistProfiles(
        profiles.map((item) =>
          item.url === profile.url
            ? { ...item, isSelected: !item.isSelected }
            : item
        )
      );
    },
    [persistProfiles, profiles]
  );

  const handleProfileSave = useCallback(
    (profile) => {
      persistProfiles(
        profiles.map((item) =>
          item.url === profile.url ? { ...item, isSaved: !item.isSaved } : item
        )
      );
    },
    [persistProfiles, profiles]
  );

  /** Selects or clears every profile at once. */
  const setAllProfilesSelected = useCallback(
    (isSelected) => {
      persistProfiles(profiles.map((item) => ({ ...item, isSelected })));
    },
    [persistProfiles, profiles]
  );

  const handleProfileSubmit = useCallback(
    async (event) => {
      event?.preventDefault();
      setIsSubmitting(true);
      setError(null);

      try {
        setStage("assembling");
        await fetchProfileContent(profiles);
        setActiveTab(STEP_INDEX.content);
        notify.success("Content assembled.", {
          description: "Review or edit it before running the analysis.",
        });
      } catch (error) {
        setError(error.message);
        notify.error("Content could not be assembled.", {
          description: error.message,
        });
      } finally {
        setStage(null);
        setIsSubmitting(false);
      }
    },
    [
      fetchProfileContent,
      notify,
      profiles,
      setActiveTab,
      setError,
      setIsSubmitting,
      setStage,
    ]
  );

  const addProfile = useCallback(
    (profile) => {
      const title = profile.title?.trim() || "";
      const url = profile.url?.trim() || "";

      if (title === "" || url === "") {
        notify.error("Missing details.", {
          description: "A profile needs both a title and a URL.",
        });
        return false;
      }

      if (profiles.some((item) => item.url === url)) {
        notify.error("Already added.", {
          description: "A profile with that URL is already in the list.",
        });
        return false;
      }

      // Construct and add the new profile object
      const _profiles = [
        {
          ...profile,
          title,
          url,
          imageUrl: profile.imageUrl?.trim() || null,
          isSelected: toBoolean(profile.isSelected),
          isSaved: toBoolean(profile.isSaved),
        },
        ...profiles,
      ];

      // Save the data
      persistProfiles(_profiles);

      // Reset the form
      setNewProfile({ ...INITIAL_NEW_PROFILE });
      setIsProfileFormOpen(false);

      notify.success("Profile added.", { description: title });
      return true;
    },
    [notify, persistProfiles, profiles, setIsProfileFormOpen, setNewProfile]
  );

  const removeProfile = useCallback(
    (profile) => {
      persistProfiles(profiles.filter((item) => item.url !== profile.url));
      notify.success("Profile removed.", { description: profile.title });
    },
    [notify, persistProfiles, profiles]
  );

  const handleProfileFormChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setNewProfile((prev) => ({ ...prev, [name]: value }));
    },
    [setNewProfile]
  );

  /** Updates a new-profile field without needing a DOM event. */
  const setNewProfileField = useCallback(
    (name, value) => {
      setNewProfile((prev) => ({ ...prev, [name]: value }));
    },
    [setNewProfile]
  );

  return {
    addProfile,
    removeProfile,
    fetchProfiles,
    handleProfileFormChange,
    setNewProfileField,
    handleProfileSave,
    handleProfileSelect,
    setAllProfilesSelected,
    handleProfileSubmit,
  };
};

export default useProfile;

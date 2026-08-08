"use client";

/**
 * External dependencies.
 */
import { createContext, useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

/**
 * Internal dependencies.
 */
import useSearch from "@hooks/useSearch";
import useProfile from "@hooks/useProfile";
import useContent from "@hooks/useContent";
import useSummary from "@hooks/useSummary";
import useIsHydrated from "@hooks/useIsHydrated";
import {
  INITIAL_FORM_DATA,
  INITIAL_NEW_PROFILE,
  SEARCH_FIELD_NAMES,
  STEP_INDEX,
  STORAGE_KEYS,
} from "@/lib/constants";
import { clearStored, readStored, writeStored } from "@/lib/storage";

export const AppDataContext = createContext(null);

/**
 * Owns every piece of workflow state and the actions that mutate it.
 *
 * All of the workflow hooks are instantiated exactly once, here, so that the
 * panels below can consume the shared result instead of each rebuilding their
 * own copy of the handlers on every render.
 */
const AppDataProvider = ({ children }) => {
  // 0: search, 1: profiles, 2: content, 3: summary
  const [activeTab, setActiveTab] = useState(STEP_INDEX.search);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stage, setStage] = useState(null);
  const [error, setError] = useState(null);

  // The previous session is restored during lazy state initialisation. On the
  // server (and during the very first client render) `isHydrated` is false, so
  // nothing derived from local storage is painted until React has hydrated.
  const isHydrated = useIsHydrated();

  const [formData, setFormData] = useState(() => ({
    ...INITIAL_FORM_DATA,
    ...readStored(STORAGE_KEYS.form, {}),
  }));
  const [profileContent, setProfileContent] = useState(() =>
    readStored(STORAGE_KEYS.profileContent, "")
  );
  const [dataAnalystType, setDataAnalystTypeState] = useState(() =>
    readStored(STORAGE_KEYS.dataAnalystType, "researcher")
  );
  const [profiles, setProfiles] = useState(() =>
    readStored(STORAGE_KEYS.profiles, [])
  );
  const [profileSummary, setProfileSummary] = useState(() =>
    readStored(STORAGE_KEYS.profileSummary, "")
  );
  const [summaryLens, setSummaryLens] = useState(() =>
    readStored(STORAGE_KEYS.summaryLens, "researcher")
  );
  const [newProfile, setNewProfile] = useState(INITIAL_NEW_PROFILE);
  const [isProfileFormOpen, setIsProfileFormOpen] = useState(false);

  const isManual = formData.process === "manual";

  // Toast helpers, kept behind a stable interface so the workflow hooks stay
  // free of any UI imports.
  const notify = useMemo(
    () => ({
      success: (message, options) => toast.success(message, options),
      error: (message, options) => toast.error(message, options),
      info: (message, options) => toast(message, options),
    }),
    []
  );

  const setDataAnalystType = useCallback((value) => {
    setDataAnalystTypeState(value);
    writeStored(STORAGE_KEYS.dataAnalystType, value);
  }, []);

  const { fetchProfileSummary } = useSummary({
    setProfileSummary,
    setSummaryLens,
  });

  const { fetchProfileContent, handleContentChange, handleContentSubmit } =
    useContent({
      setIsSubmitting,
      setProfileContent,
      fetchProfileSummary,
      setActiveTab,
      setStage,
      setError,
      profileContent,
      dataAnalystType,
      notify,
    });

  const {
    addProfile,
    removeProfile,
    fetchProfiles,
    handleProfileSave,
    handleProfileSelect,
    setAllProfilesSelected,
    handleProfileSubmit,
    handleProfileFormChange,
    setNewProfileField,
  } = useProfile({
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
  });

  const { handleFormDataChange, setFormField, handleFormSubmit } = useSearch({
    formData,
    setFormData,
    setIsSubmitting,
    setActiveTab,
    setStage,
    setError,
    dataAnalystType,
    fetchProfiles,
    fetchProfileContent,
    fetchProfileSummary,
    notify,
  });

  const resetApp = useCallback(() => {
    clearStored();
    setFormData(INITIAL_FORM_DATA);
    setProfiles([]);
    setNewProfile(INITIAL_NEW_PROFILE);
    setIsProfileFormOpen(false);
    setIsSubmitting(false);
    setStage(null);
    setError(null);
    setActiveTab(STEP_INDEX.search);
    setProfileContent("");
    setProfileSummary("");
    setDataAnalystTypeState("researcher");
    setSummaryLens("researcher");
    notify.success("Session cleared.", {
      description: "Every stored search, profile and summary was removed.",
    });
  }, [notify]);

  // Derived state used across the panels.
  const selectedProfileCount = useMemo(
    () => profiles.filter((profile) => profile.isSelected).length,
    [profiles]
  );

  const filledFieldCount = useMemo(
    () =>
      SEARCH_FIELD_NAMES.filter((name) => (formData[name] || "").trim() !== "")
        .length,
    [formData]
  );

  // Kept empty until hydration so the first client render still matches the
  // server HTML, which knows nothing about the stored session.
  const completed = useMemo(
    () => ({
      search: isHydrated && filledFieldCount > 0,
      profiles: isHydrated && profiles.length > 0,
      content: isHydrated && profileContent.trim() !== "",
      summary: isHydrated && profileSummary.trim() !== "",
    }),
    [
      isHydrated,
      filledFieldCount,
      profiles.length,
      profileContent,
      profileSummary,
    ]
  );

  const valueToProvide = useMemo(
    () => ({
      // State
      activeTab,
      setActiveTab,
      isSubmitting,
      stage,
      error,
      setError,
      isHydrated,
      formData,
      profileContent,
      dataAnalystType,
      setDataAnalystType,
      profiles,
      profileSummary,
      summaryLens,
      newProfile,
      isProfileFormOpen,
      setIsProfileFormOpen,
      isManual,

      // Derived
      selectedProfileCount,
      filledFieldCount,
      completed,

      // Actions
      handleFormDataChange,
      setFormField,
      handleFormSubmit,
      addProfile,
      removeProfile,
      handleProfileSave,
      handleProfileSelect,
      setAllProfilesSelected,
      handleProfileSubmit,
      handleProfileFormChange,
      setNewProfileField,
      handleContentChange,
      handleContentSubmit,
      resetApp,
    }),
    [
      activeTab,
      isSubmitting,
      stage,
      error,
      isHydrated,
      formData,
      profileContent,
      dataAnalystType,
      setDataAnalystType,
      profiles,
      profileSummary,
      summaryLens,
      newProfile,
      isProfileFormOpen,
      isManual,
      selectedProfileCount,
      filledFieldCount,
      completed,
      handleFormDataChange,
      setFormField,
      handleFormSubmit,
      addProfile,
      removeProfile,
      handleProfileSave,
      handleProfileSelect,
      setAllProfilesSelected,
      handleProfileSubmit,
      handleProfileFormChange,
      setNewProfileField,
      handleContentChange,
      handleContentSubmit,
      resetApp,
    ]
  );

  return (
    <AppDataContext.Provider value={valueToProvide}>
      {children}
    </AppDataContext.Provider>
  );
};

export default AppDataProvider;

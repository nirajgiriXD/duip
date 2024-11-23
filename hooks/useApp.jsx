"use client";

/**
 * External dependencies.
 */
import { useContext, useEffect, useMemo } from "react";

/**
 * Internal dependencies.
 */
import { AppDataContext } from "@providers/AppDataProvider";
import useSearch from "./useSearch";
import useProfile from "./useProfile";
import useContent from "./useContent";
import useSummary from "./useSummary";

const useApp = () => {
  const {
    activeTab,
    setActiveTab,
    isSubmitting,
    setIsSubmitting,
    formData,
    setFormData,
    profileContent,
    setProfileContent,
    dataAnalystType,
    setDataAnalystType,
    profiles,
    setProfiles,
    profileSummary,
    setProfileSummary,
    newProfile,
    setNewProfile,
    isProfileFormOpen,
    setIsProfileFormOpen,
  } = useContext(AppDataContext);

  const isManual = useMemo(() => formData.process === "manual", [formData.process]);

  const { fetchProfileSummary } = useSummary({
    setProfileSummary,
    setIsSubmitting,
  });

  const { fetchProfileContent, handleContentSubmit } = useContent({
    setIsSubmitting,
    setProfileContent,
    fetchProfileSummary,
    setActiveTab,
    profileContent,
    dataAnalystType
  });

  const {
    addProfile,
    removeProfile,
    fetchProfiles,
    handleProfileSave,
    handleProfileSelect,
    handleProfileSubmit,
    handleProfileFormChange,
  } = useProfile({
    setActiveTab,
    setIsSubmitting,
    formData,
    profiles,
    setProfiles,
    setNewProfile,
  });

  const { handleFormDataChange, handleFormSubmit } = useSearch({
    setFormData,
    setIsSubmitting,
    setActiveTab,
    dataAnalystType,
    fetchProfiles,
    fetchProfileContent,
    fetchProfileSummary,
  });

  const resetApp = () => {
    if (confirm("Are you sure you want to reset the app?")) {
      localStorage.clear();
      setFormData({
        username: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        profession: "",
        organization: "",
        process: "automatic",
      });
      setProfiles([]);
      setIsSubmitting(false);
      setActiveTab(0);
      setProfileContent("");
      setProfileSummary("");
    }
  };

  const loadDataFromLocalStorage = async () => {
    // Retrieve the stringified JSON data from local storage
    const _formData = localStorage.getItem("form");
    const _profiles = localStorage.getItem("profiles");
    const _profileContent = localStorage.getItem("profile-content");
    const _profileSummary = localStorage.getItem("profile-summary");

    // Convert into JSON
    const __formData = (await JSON.parse(_formData)) || formData;
    const __profiles = (await JSON.parse(_profiles)) || [];
    const __profileContent = (await JSON.parse(_profileContent)) || "";
    const __profileSummary = (await JSON.parse(_profileSummary)) || "";

    // Set the data
    setFormData(__formData);
    setProfiles(__profiles);
    setProfileContent(__profileContent);
    setProfileSummary(__profileSummary);
  };

  useEffect(() => {
    loadDataFromLocalStorage();
  }, []);

  return {
    newProfile,
    activeTab,
    formData,
    profiles,
    isManual,
    profileContent,
    profileSummary,
    handleFormDataChange,
    handleFormSubmit,
    handleProfileSave,
    handleProfileSelect,
    handleProfileSubmit,
    handleContentSubmit,
    handleProfileFormChange,
    setDataAnalystType,
    setActiveTab,
    isProfileFormOpen,
    setIsProfileFormOpen,
    addProfile,
    removeProfile,
    resetApp,
    dataAnalystType,
    isSubmitting,
  };
};

export default useApp;

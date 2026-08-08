"use client";

/**
 * External dependencies.
 */
import { useCallback } from "react";

/**
 * Internal dependencies.
 */
import { postJson } from "@/lib/api";
import { STEP_INDEX, STORAGE_KEYS } from "@/lib/constants";
import { writeStored } from "@/lib/storage";

const useContent = ({
  setIsSubmitting,
  setProfileContent,
  fetchProfileSummary,
  setActiveTab,
  setStage,
  setError,
  profileContent,
  dataAnalystType,
  notify,
}) => {
  const fetchProfileContent = useCallback(
    async (_profiles) => {
      // Filter the selected profiles
      const selectedProfiles = _profiles.filter((item) => item.isSelected);
      if (selectedProfiles.length === 0) {
        throw new Error(
          "Please select at least one profile to assemble the content."
        );
      }

      const data = await postJson("/api/assemble", {
        profiles: selectedProfiles,
      });

      // Retrieve data from the response data
      const _profileContent = data.profileContent || "";

      if (_profileContent.trim() === "") {
        throw new Error(
          "None of the selected profiles returned readable content. Try selecting different results."
        );
      }

      // Save the stringified JSON object to local storage
      writeStored(STORAGE_KEYS.profileContent, _profileContent);

      // Set the content
      setProfileContent(_profileContent);

      return { _profileContent };
    },
    [setProfileContent]
  );

  const handleContentChange = useCallback(
    (event) => {
      const _profileContent = event.target.value;
      setProfileContent(_profileContent);
      writeStored(STORAGE_KEYS.profileContent, _profileContent);
    },
    [setProfileContent]
  );

  const handleContentSubmit = useCallback(
    async (event) => {
      event?.preventDefault();
      setIsSubmitting(true);
      setError(null);

      try {
        setStage("summarizing");
        await fetchProfileSummary(profileContent, dataAnalystType);
        setActiveTab(STEP_INDEX.summary);
        notify.success("Analysis ready.", {
          description: "The summary was generated from the assembled content.",
        });
      } catch (error) {
        setError(error.message);
        notify.error("The analysis could not be generated.", {
          description: error.message,
        });
      } finally {
        setStage(null);
        setIsSubmitting(false);
      }
    },
    [
      dataAnalystType,
      fetchProfileSummary,
      notify,
      profileContent,
      setActiveTab,
      setError,
      setIsSubmitting,
      setStage,
    ]
  );

  return {
    fetchProfileContent,
    handleContentChange,
    handleContentSubmit,
  };
};

export default useContent;

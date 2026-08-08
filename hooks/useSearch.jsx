"use client";

/**
 * External dependencies.
 */
import { useCallback } from "react";

/**
 * Internal dependencies.
 */
import { STEP_INDEX, STORAGE_KEYS } from "@/lib/constants";
import { writeStored } from "@/lib/storage";

const useSearch = ({
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
}) => {
  const handleFormDataChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setFormData((prev) => {
        const data = { ...prev, [name]: value };

        // Save the form data in local storage
        writeStored(STORAGE_KEYS.form, data);

        return data;
      });
    },
    [setFormData]
  );

  /** Updates a single field without needing a DOM event. */
  const setFormField = useCallback(
    (name, value) => {
      setFormData((prev) => {
        const data = { ...prev, [name]: value };
        writeStored(STORAGE_KEYS.form, data);

        return data;
      });
    },
    [setFormData]
  );

  const handleFormSubmit = useCallback(
    async (event) => {
      event?.preventDefault();
      setIsSubmitting(true);
      setError(null);

      try {
        setStage("searching");
        const { _profiles } = await fetchProfiles(formData);

        if (formData.process === "manual") {
          setActiveTab(STEP_INDEX.profiles);
          notify.success(
            _profiles.length === 1
              ? "1 profile found."
              : `${_profiles.length} profiles found.`,
            { description: "Choose which ones should feed the analysis." }
          );
        } else {
          setStage("assembling");
          const { _profileContent } = await fetchProfileContent(_profiles);

          setStage("summarizing");
          await fetchProfileSummary(_profileContent, dataAnalystType);

          setActiveTab(STEP_INDEX.summary);
          notify.success("Analysis ready.", {
            description: "The summary was generated from the profiles found.",
          });
        }
      } catch (error) {
        setError(error.message);
        notify.error("The run could not be completed.", {
          description: error.message,
        });
      } finally {
        setStage(null);
        setIsSubmitting(false);
      }
    },
    [
      dataAnalystType,
      fetchProfileContent,
      fetchProfileSummary,
      fetchProfiles,
      formData,
      notify,
      setActiveTab,
      setError,
      setIsSubmitting,
      setStage,
    ]
  );

  return {
    handleFormDataChange,
    setFormField,
    handleFormSubmit,
  };
};

export default useSearch;

"use client";

const useSearch = ({
  formData,
  setFormData,
  setIsSubmitting,
  setActiveTab,
  dataAnalystType,
  fetchProfiles,
  fetchProfileContent,
  fetchProfileSummary,
}) => {
  const handleFormDataChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      const data = {
        ...prev,
        [name]: value,
      };

      // Save the form data in local storage
      localStorage.setItem("form", JSON.stringify(data));

      return data;
    });
  };

  const handleFormSubmit = async (event) => {
    event?.preventDefault();
    setIsSubmitting(true);

    try {
      const { _searchQuery, _profiles } = await fetchProfiles(formData);

      if (formData.process === "manual") {
        setActiveTab(1);
      } else {
        const { _profileContent } = await fetchProfileContent(_profiles);
        const { _profileSummary } = await fetchProfileSummary(_profileContent, dataAnalystType);
        setActiveTab(3);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleFormDataChange,
    handleFormSubmit,
  };
};

export default useSearch;
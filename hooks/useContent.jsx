"use client";

const useContent = ({
  setIsSubmitting,
  setProfileContent,
  fetchProfileSummary,
  setActiveTab,
  profileContent,
  dataAnalystType,
}) => {
  const fetchProfileContent = async (_profiles) => {
    // Filter the selected profiles
    _profiles = _profiles.filter((item) => item.isSelected);
    if (_profiles.length === 0) {
      setIsSubmitting(false);
      throw new Error("Please select at least one profile to assemble the content.");
    }

    const response = await fetch("/api/assemble", {
      method: "POST",
      body: JSON.stringify({ profiles: _profiles }),
    });

    if (response.ok) {
      const data = await response.json();

      // Retrive data from the response data
      const _profileContent = data.profileContent || "";

      // Save the stringified JSON object to local storage
      localStorage.setItem("profile-content", JSON.stringify(_profileContent));

      // Set profiles
      setProfileContent(_profileContent);

      return { _profileContent };
    } else {
      throw new Error(data.message);
    }
  };

  const handleContentSubmit = async (event) => {
    event?.preventDefault();
    setIsSubmitting(true);

    try {
      await fetchProfileSummary(profileContent, dataAnalystType);
      setActiveTab(3);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    fetchProfileContent,
    handleContentSubmit,
  };
};

export default useContent;
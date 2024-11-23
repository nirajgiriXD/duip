"use client";

const useSummary = ({
  setProfileSummary,
  setIsSubmitting,
}) => {
  const fetchProfileSummary = async (_profileContent, _dataAnalystType) => {
    // Check if the profile content is empty
    if (_profileContent === "") {
      setIsSubmitting(false);
      throw new Error("Please provide profile content to summarize.");
    }

    const response = await fetch("/api/summarize", {
      method: "POST",
      body: JSON.stringify({ profileContent: _profileContent, dataAnalystType: _dataAnalystType }),
    });

    if (response.ok) {
      const data = await response.json();

      // Retrive data from the response data
      const _profileSummary = data.profileSummary || "";

      // Save the stringified JSON object to local storage
      localStorage.setItem("profile-summary", JSON.stringify(_profileSummary));

      // Set profiles
      setProfileSummary(_profileSummary);

      return { _profileSummary };
    } else {
      throw new Error(data.message);
    }
  };

  return { fetchProfileSummary };
};

export default useSummary;
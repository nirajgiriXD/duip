"use client";

const useProfile = ({
  setActiveTab,
  setIsSubmitting,
  formData,
  profiles,
  setProfiles,
  setNewProfile,
  setIsProfileFormOpen ,
  fetchProfileContent,
}) => {
  const fetchProfiles = async () => {
    const response = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      // Retrive data from the response data
      const _profiles = data.profiles || [];
      const _searchQuery = data.searchQuery || "";

      // Merge with the saved profiles
      const savedProfiles = profiles.filter((profile) => profile.isSaved);
      const newProfiles = _profiles.filter(item => !savedProfiles.some(profile => profile.url === item.url));
      const mergedProfiles = [...savedProfiles, ...newProfiles];

      // Save the stringified JSON object to local storage
      localStorage.setItem("profiles", JSON.stringify(mergedProfiles));
      localStorage.setItem("search-query", JSON.stringify(_searchQuery));

      // Set profiles by merging the new profiles with the saved profiles
      setProfiles(mergedProfiles);

      return { _profiles: mergedProfiles, _searchQuery };
    } else {
      throw new Error(data.message);
    }
  };

  const handleProfileSelect = (profile) => {
    const _profiles = profiles.map((item) => {
      if (item.url === profile.url) {
        item.isSelected = !item.isSelected;
      }

      return item;
    });

    setProfiles(_profiles);
    localStorage.setItem("profiles", JSON.stringify(_profiles));
  };

  const handleProfileSave = (profile) => {
    const _profiles = profiles.map((item) => {
      if (item.url === profile.url) {
        item.isSaved = !item.isSaved;
      }

      return item;
    });

    setProfiles(_profiles);
    localStorage.setItem("profiles", JSON.stringify(_profiles));
  };

  const handleProfileSubmit = async (event) => {
    event?.preventDefault();
    setIsSubmitting(true);

    try {
      await fetchProfileContent(profiles);
      setActiveTab(2);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addProfile = (profile) => {
    if (profiles.some((item) => item.url === profile.url)) {
      alert("Profile already added.");
      return false;
    }

    if (profile.title === "" || profile.url === "") {
      alert("Please provide a title and URL for the profile.");
      return false;
    }

    // Construct and add the new profile object
    const _profiles = [
      {
        ...profile,
        isSelected: profile.isSelected === "true",
        isSaved: profile.isSaved === "true",
      },
      ...profiles
    ];

    // Save the data
    setProfiles(_profiles);
    localStorage.setItem("profiles", JSON.stringify(_profiles));

    // Reset the form
    setNewProfile({
      title: "",
      imageUrl: "",
      url: "",
      isSelected: "true",
      isSaved: "true",
    });

    setIsProfileFormOpen(false);

    alert("Profile added successfully.");
    return true;
  };

  const removeProfile = (profile) => {
    if (confirm(`Are you sure you want to remove "${profile.title}"?`)) {
      const _profiles = profiles.filter((item) => item.url !== profile.url);
      setProfiles(_profiles);
      localStorage.setItem("profiles", JSON.stringify(_profiles));
    }
  };

  const handleProfileFormChange = (event) => {
    const { name, value } = event.target;
    setNewProfile((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    });
  };

  return {
    addProfile,
    removeProfile,
    fetchProfiles,
    handleProfileFormChange,
    handleProfileSave,
    handleProfileSelect,
    handleProfileSubmit,
  };
};

export default useProfile;

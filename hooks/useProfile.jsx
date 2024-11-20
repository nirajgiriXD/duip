"use client";

/**
 * External dependencies.
 */
import { useState, useEffect } from "react";

const useProfile = () => {
  const [currentPage, setCurrentPage] = useState("form"); // form | profiles | summary
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    profession: "",
    organization: "",
    process: "automatic",
  });
  const [profiles, setProfiles] = useState([]);
  const [profileSummary, setProfileSummary] = useState("");

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

      // Save the stringified JSON object to local storage
      localStorage.setItem("profiles", JSON.stringify(_profiles));
      localStorage.setItem("searchQuery", JSON.stringify(_searchQuery));

      // Set profiles
      setProfiles(_profiles);

      return { _profiles, _searchQuery };
    } else {
      throw new Error(data.message);
    }
  };

  const fetchSummary = async (_profiles) => {
    // Filter the selected profiles
    _profiles = _profiles.filter((item) => item.isSelected);
    if (_profiles.length === 0) {
      setIsSubmitting(false);
      throw new Error("Please select at least one profile to summarize.");
    }

    const response = await fetch("/api/summarize", {
      method: "POST",
      body: JSON.stringify({ searchResults: _profiles }),
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const { _profiles, _searchQuery } = await fetchProfiles(formData);

      if (formData.process === "manual") {
        setCurrentPage("profiles");
      } else {
        const { _profileSummary } = await fetchSummary(_profiles);
        setCurrentPage("summary");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProfileSelect = (id) => {
    const _profiles = profiles.map((item) => {
      if (item.id === id) {
        item.isSelected = !item.isSelected;
      }

      return item;
    });

    setProfiles(_profiles);
    localStorage.setItem("profiles", JSON.stringify(_profiles));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await fetchSummary(profiles);
      setCurrentPage("summary");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadDataFromLocalStorage = async () => {
    // Retrieve the stringified JSON data from local storage
    const _formData = localStorage.getItem("form");
    const _profiles = localStorage.getItem("profiles");
    const _profileSummary = localStorage.getItem("profile-summary");

    // Convert into JSON
    const __formData = (await JSON.parse(_formData)) || formData;
    const __profiles = (await JSON.parse(_profiles)) || [];
    const __profileSummary = (await JSON.parse(_profileSummary)) || "";

    // Set the data
    setFormData(__formData);
    setProfiles(__profiles);
    setProfileSummary(__profileSummary);
  };

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
      setCurrentPage("form");
      setProfileSummary("");
    }
  };

  useEffect(() => {
    loadDataFromLocalStorage();
  }, []);

  return {
    currentPage,
    formData,
    profiles,
    profileSummary,
    handleFormDataChange,
    handleFormSubmit,
    handleProfileSelect,
    handleProfileSubmit,
    setProfileSummary,
    setCurrentPage,
    resetApp,
    isSubmitting,
  };
};

export default useProfile;

"use client";

/**
 * External dependencies.
 */
import { createContext, useState } from "react";

export const AppDataContext = createContext();

const AppDataProvider = ({ children }) => {
  // 0: search, 1: profiles, 2: summary, 3: content, 4: reset
  const [activeTab, setActiveTab] = useState(0);
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
  const [profileContent, setProfileContent] = useState("");
  const [dataAnalystType, setDataAnalystType] = useState("general");
  const [profiles, setProfiles] = useState([]);
  const [profileSummary, setProfileSummary] = useState("");
  const [newProfile, setNewProfile] = useState({
    title: "",
    imageUrl: "",
    url: "",
    isSelected: "true",
    isSaved: "false",
  });
  const [isProfileFormOpen, setIsProfileFormOpen] = useState(false);

  const valueToProvide = {
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
  };

  return (
    <AppDataContext.Provider value={valueToProvide}>
      {children}
    </AppDataContext.Provider>
  );
};

export default AppDataProvider;
"use client";

/**
 * Internal dependencies.
 */
import useProfile from "@hooks/useProfile";
import { Form, Profiles, Summary, SpeedDial } from '@components';

const App = () => {
  const { currentPage, formData, profiles, profileSummary, handleFormDataChange, handleFormSubmit,  setCurrentPage, handleProfileSave, handleProfileSubmit, handleProfileSelect, resetApp, isSubmitting } = useProfile();

  return (
    <main className="relative min-h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Search Page */}
      {currentPage === 'form' && <Form formData={formData} handleFormDataChange={handleFormDataChange} handleFormSubmit={handleFormSubmit} isSubmitting={isSubmitting} />}

      {/* Profiles Page */}
      {currentPage === 'profiles' && <Profiles isManual={formData.process === "manual"} profiles={profiles} isSubmitting={isSubmitting} handleProfileSave={handleProfileSave} handleProfileSubmit={handleProfileSubmit} handleProfileSelect={handleProfileSelect} />}

      {/* Summary Page */}
      {currentPage === 'summary' && <Summary profileSummary={profileSummary} />}

      {/* SpeedDial */}
      <SpeedDial currentPage={currentPage} setCurrentPage={setCurrentPage} resetApp={resetApp} />
    </main>
  );
};

export default App;

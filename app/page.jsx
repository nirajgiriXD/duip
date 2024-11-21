"use client";

/**
 * Internal dependencies.
 */
import useProfile from "@hooks/useProfile";
import { Form, Profiles, Summary } from '@components';

const App = () => {
  const { activeTab, formData, profiles, profileSummary, handleFormDataChange, handleFormSubmit,  setActiveTab, handleProfileSave, handleProfileSubmit, handleProfileSelect, resetApp, isSubmitting } = useProfile();

  const tabs = [
    {
      name: 'Search',
      component: <Form formData={formData} handleFormDataChange={handleFormDataChange} handleFormSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
    },
    {
      name: 'Profiles',
      component: <Profiles isManual={formData.process === "manual"} profiles={profiles} isSubmitting={isSubmitting} handleProfileSave={handleProfileSave} handleProfileSubmit={handleProfileSubmit} handleProfileSelect={handleProfileSelect} />
    },
    {
      name: 'Summary',
      component: <Summary profileSummary={profileSummary} />
    },
    {
      name: 'Reset',
      action: resetApp
    },
  ];

  return (
    <main className="relative min-h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="py-4 flex flex-col justify-center sm:py-8">
        <div className="relative py-3 sm:mx-auto max-w-screen-md w-full">
          <div className="relative px-4 py-8 bg-white mx-8 md:mx-0 shadow rounded-2xl sm:p-8">
            <div className="mx-auto max-h-[540px] overflow-y-auto min-w-full">
              {/* Tabs */}
              <div className="w-full flex gap-1">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    className={`flex-1 py-2 rounded-md text-sm font-medium transition-all
                      ${
                        activeTab === index && !tab.action
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    onClick={() => {
                      if (tab.action) {
                        tab.action();
                      } else {
                        setActiveTab(index);
                      }
                    }}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="mt-6">
                {tabs[activeTab] && !tabs[activeTab].action && tabs[activeTab].component}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;

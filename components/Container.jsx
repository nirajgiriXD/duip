"use client";

/**
 * Internal dependencies.
 */
import { Form, Profiles, Content, Summary } from "@components";
import useApp from "@hooks/useApp";

const Container = () => {
  const { activeTab, setActiveTab, resetApp } = useApp();

  const tabs = [
    {
      name: "Search",
      component: <Form />,
    },
    {
      name: "Profiles",
      component: <Profiles />,
    },
    {
      name: "Content",
      component: <Content />,
    },
    {
      name: "Summary",
      component: <Summary />,
    },
    {
      name: "Reset",
      action: resetApp,
    },
  ];

  return (
    <main className="relative min-h-screen w-full bg-gray-50 text-gray-800">
      <div className="py-4 flex flex-col justify-center sm:py-8">
        <div className="relative py-3 sm:mx-auto max-w-screen-md w-full">
          <div className="relative px-4 py-8 bg-white mx-8 md:mx-0 shadow rounded-2xl sm:p-8">
            <div className="mx-auto max-h-[540px] min-w-full">
              {/* Tabs */}
              <div className="w-full flex gap-1 mb-6">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    className={`flex-1 py-2 rounded-md text-sm font-medium transition-all
                      ${
                        activeTab === index && !tab.action
                          ? "bg-blue-400 text-white hover:bg-blue-500"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
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
              {tabs[activeTab] &&
                !tabs[activeTab].action &&
                tabs[activeTab].component}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Container
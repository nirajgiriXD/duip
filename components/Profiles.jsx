"use client";

/**
 * External dependencies.
 */
import ClipLoader from "react-spinners/ClipLoader";

/**
 * internal dependencies.
 */
import useApp from "@hooks/useApp";
import { NothingFoundCard } from "@components";

const Profiles = () => {
  const {
    isProfileFormOpen,
    setIsProfileFormOpen,
    newProfile,
    isManual,
    profiles,
    isSubmitting,
    addProfile,
    removeProfile,
    handleProfileSave,
    handleProfileSelect,
    handleProfileSubmit,
    handleProfileFormChange,
  } = useApp();

  return (
    <div id="profile-container" className="overflow-auto max-h-[490px]">
      <div className="h-full">
        {profiles.length === 0 ? (
          <NothingFoundCard />
        ) : (
          <>
            {/* Table */}
            {isProfileFormOpen ? (
              <form method="POST">
                <div className="text-base leading-6 flex flex-col gap-4 text-gray-700 sm:text-lg sm:leading-7 border rounded-md p-4">
                  {/* Title */}
                  <div className="flex flex-col">
                    <label className="text-sm leading-loose">
                      Profile Title
                    </label>
                    <input
                      type="text"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      name="title"
                      value={newProfile.title}
                      onChange={handleProfileFormChange}
                      placeholder="Title"
                    />
                  </div>

                  {/* Profile URL */}
                  <div className="flex flex-col">
                    <label className="text-sm leading-loose">
                      Profile URL
                    </label>
                    <input
                      type="url"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      name="url"
                      value={newProfile.url}
                      onChange={handleProfileFormChange}
                      placeholder="https://example.com"
                    />
                  </div>

                  {/* Profile Image URL */}
                  <div className="flex flex-col">
                    <label className="text-sm leading-loose">
                      Profile Image URL
                    </label>
                    <input
                      type="url"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      name="imageUrl"
                      value={newProfile.imageUrl}
                      onChange={handleProfileFormChange}
                      placeholder="https://example.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Selected */}
                    <div className="flex flex-col">
                      <label className="text-sm leading-loose">
                        Is profile selected?
                      </label>
                      <select
                        onChange={handleProfileFormChange}
                        value={newProfile.isSelected ? "true" : "false"}
                        name="isSelected"
                        className="peer h-full w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50"
                      >
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>
                    </div>

                    {/* Saved */}
                    <div className="flex flex-col">
                      <label className="text-sm leading-loose">
                        Is profile saved?
                      </label>
                      <select
                        onChange={handleProfileFormChange}
                        value={newProfile.isSaved ? "true" : "false"}
                        name="isSaved"
                        className="peer h-full w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50"
                      >
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <table className="min-w-full bg-transparent border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-2 px-4 text-center">
                      {isManual
                        ? "Actions"
                        : "#"}
                    </th>
                    <th className="py-2 px-4 text-center">
                      Image
                    </th>
                    <th className="py-2 px-4 text-left">
                      Title
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {profiles.map((item, index) => {
                    return (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                        <th scope="row" className="py-2 px-4 text-left">
                          {isManual ? (
                            <div className="flex items-center justify-center gap-4">
                              <button onClick={() => handleProfileSelect(item)} title="Select profile for analysis">
                                {item.isSelected ? "✅" : "✖"}
                              </button>
                              <button onClick={() => handleProfileSave(item)} title="Save profile for next search">
                                {item.isSaved ? "💚" : "🤍"}
                              </button>
                              <button onClick={() => removeProfile(item)} title="Remove profile from analysis">🗑️</button>
                              <a href={item.url} target="_blank" rel="noopener noreferrer" title="Open link in new tab">🔗</a>
                            </div>
                          ) : (
                            index + 1
                          )}
                        </th>
                        <td className="py-2 px-4 flex justify-center">
                          <img src={item.imageUrl} className="rounded w-6 h-6" />
                        </td>
                        <td className="py-2 px-4 text-left" title={item.title}>
                          {item.title}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {/* Submit */}
            {isManual && (
              <div className="mt-6 flex gap-4 text-sm">
                {/* Add Profile Button */}
                <button className="bg-transparent hover:bg-blue-400 text-blue-600 font-semibold hover:text-white p-2 border border-blue-400 hover:border-transparent w-full rounded" onClick={() => setIsProfileFormOpen((prev) => !prev)}>
                  {isProfileFormOpen ? "Close Profile Form" : "Open Profile Form"}
                </button>

                {/* Submit Button */}
                <button
                  className="bg-blue-400 hover:bg-blue-500 flex justify-center items-center w-full text-white p-2 rounded-md focus:outline-none transition-all" type="submit" disabled={isSubmitting} onClick={isProfileFormOpen ? () => addProfile(newProfile) : () => handleProfileSubmit()}
                >
                  {isSubmitting ? (
                    <ClipLoader
                      color="#ffffff"
                      loading={
                        isSubmitting
                      }
                      size={20}
                      aria-label="Loading Spinner"
                      className="h-full"
                    />
                  ) : (
                    isProfileFormOpen ? "Add Profile" : "Assemble Profile Content"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profiles;

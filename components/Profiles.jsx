"use client";

/**
 * External dependencies.
 */
import ClipLoader from "react-spinners/ClipLoader";

/**
 * internal dependencies.
 */
import { NothingFoundCard } from "@components";

const Result = ({
  isManual,
  profiles,
  isSubmitting,
  handleProfileSave,
  handleProfileSelect,
  handleProfileSubmit,
}) => {
  return (
    <div id="profile-container" className="overflow-auto max-h-[490px]">
      <div className="h-full">
        {profiles.length === 0 ? (
          <NothingFoundCard />
        ) : (
          <>
            {/* Table */}
            <table className="w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="p-2 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    {isManual
                      ? "Select"
                      : "#"}
                  </th>
                  {isManual && (
                    <th className="p-2 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Save
                    </th>
                  )}
                  <th className="p-2 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-2 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Image
                  </th>
                  <th className="p-2 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Title
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {profiles.map((item, index) => {
                  return (
                    <tr
                      className="py-2"
                      key={index}
                    >
                      <th
                        scope="row"
                        className="border-t-0 align-middle border-l-0 border-r-0 px-4 py-1 text-left text-blueGray-700"
                      >
                        {isManual ? (
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4"
                            checked={
                              item.isSelected
                            }
                            onChange={() =>
                              handleProfileSelect(
                                item.url
                              )
                            }
                          />
                        ) : (
                          index + 1
                        )}
                      </th>
                      {isManual && (
                        <td className="border-t-0 align-middle border-l-0 border-r-0 px-4 py-1">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4"
                            checked={
                              item.isSaved
                            }
                            onChange={() =>
                              handleProfileSave(
                                item.url
                              )
                            }
                          />
                        </td>
                      )}
                      <td className="border-t-0 align-middle border-l-0 border-r-0 px-4 py-1">
                        <img
                          src={
                            item.imageUrl
                          }
                          className="rounded w-6 h-6"
                        />
                      </td>
                      <td className="border-t-0 align-middle border-l-0 border-r-0 whitespace-nowrap px-4 py-1">
                        <a
                          className="link-underline link-underline-opacity-0 hover:text-blue-700"
                          href={
                            item.url
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          title={
                            item.title
                          }
                        >
                          {item.title}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Submit */}
            {isManual && (
              <div>
                <hr className="bg-gray-200" />
                <button
                  className="bg-blue-500 flex justify-center items-center w-full text-white mt-6 p-2 rounded-md focus:outline-none text-sm"
                  type="submit"
                  disabled={isSubmitting}
                  onClick={
                    handleProfileSubmit
                  }
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
                    "Submit"
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

export default Result;

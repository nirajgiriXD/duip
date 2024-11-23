/**
 * External dependencies.
 */
import Markdown from "markdown-to-jsx";
import ClipLoader from "react-spinners/ClipLoader";

/**
 * Internal dependencies.
 */
import useApp from "@hooks/useApp";
import { NothingFoundCard } from "@components";

const Content = () => {
  const {
    profileContent,
    handleContentSubmit,
    dataAnalystType,
    setDataAnalystType,
    isSubmitting,
    isManual,
  } = useApp();

  return (
    <div className="h-full">
      <div
        id="profile-container"
        className="text-gray-800 overflow-auto max-h-[420px]"
      >
        {profileContent === "" ? (
          <NothingFoundCard />
        ) : (
          <div className="text-sm border rounded-md px-4 py-2">
            {/* Profile Content */}
            <Markdown>{profileContent}</Markdown>

            {/* Footer */}
            {isManual && (
              <div className="py-3 mt-3 flex flex-col gap-1 border border-t border-b-0 border-l-0 border-r-0">
                <label
                  htmlFor="data-analyst-type"
                  className="text-gray-800"
                >
                  Select the type of data analyst
                </label>
                <div className="flex gap-4">
                  {/* Data Analyst Type */}
                  <select
                    id="data-analyst-type"
                    value={dataAnalystType}
                    onChange={(event) =>
                      setDataAnalystType(
                        event.target.value
                      )
                    }
                    className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none"
                  >
                    <option value="general">General</option>
                    <option value="hr">HR</option>
                  </select>

                  {/* Submit */}
                  <button
                    className="bg-blue-400 hover:bg-blue-500 flex justify-center items-center w-full text-white p-2 rounded-md focus:outline-none text-sm transition-all"
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleContentSubmit}
                  >
                    {isSubmitting ? (
                      <ClipLoader
                        color="#ffffff"
                        loading={isSubmitting}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        className="h-full"
                      />
                    ) : (
                      "Analyze"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;

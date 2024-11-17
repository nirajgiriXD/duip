"use client";

/**
 * External dependencies.
 */
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const IndividualResult = () => {
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState([]);
  const [view, setView] = useState("table");
  const router = useRouter();

  useEffect(() => {
    const setDataFromLocalStorage = async () => {
      // Retrieve the stringified JSON data from local storage
      const _result = localStorage.getItem("result");
        const _summary = localStorage.getItem("summary");

      // If no result, redirect to search page
      if (!_result) {
        router.push("/search");
      }

      // Convert into JSON
      const result = (await JSON.parse(_result)) || [];
      const summary = (await JSON.parse(_summary)) || [];
      const formattedSummary = summary
        // Wrap text enclosed in backticks (`...`) with <code>
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        // Convert single * to <li> list items
        .replace(/(?<!\*)\* (.+?)(?=\n)/g, "<li>$1</li>")
        // Replace **bold** with <strong>
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        // Replace newlines for cleaner formatting
        .replace(/\n\n/g, "<br/>");

      setResults(result);
      setSummary(formattedSummary);
    };

    setDataFromLocalStorage();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className="m-5 p-5 bg-white rounded-lg shadow">
          <div className="relative flex flex-col text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
            <div className="overflow-x-auto">
              {/* Results */}
              {results.length ? (
                <div className="flex flex-col gap-4">
                  <div className="w-full flex justify-end">
                    <button
                        className="bg-transparent hover:bg-blue-400 text-blue-400 text-sm hover:text-white py-2 px-4 border border-blue-400 hover:border-transparent rounded"
                        onClick={() => setView((prev) => prev === "table" ? "card" : "table")}>
                        Toggle View
                    </button>
                  </div>

                  {/* Result */}
                  {view === "table" ? (
                    <table className="max-w-3xl w-full bg-transparent border-collapse">
                      <thead>
                        <tr>
                          <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            #
                          </th>
                          <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Thumbnail
                          </th>
                          <th className="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Title
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((item, index) => {
                          return (
                            <tr className="py-2" key={index}>
                              <th
                                scope="row"
                                className="border-t-0 align-middle border-l-0 border-r-0 whitespace-nowrap px-4 py-1 text-left text-blueGray-700"
                              >
                                {index + 1}
                              </th>
                              <td className="border-t-0 align-middle border-l-0 border-r-0 whitespace-nowrap px-4 py-1">
                                <img
                                  src={item.imageUrl}
                                  className="rounded w-6 h-6"
                                />
                              </td>
                              <td className="border-t-0 align-middle border-l-0 border-r-0 whitespace-nowrap px-4 py-1">
                                <a
                                  className="link-underline link-underline-opacity-0 hover:text-blue-700"
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {item.title}
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    ) : (
                    <div className="max-w-3xl w-full">
                      <div dangerouslySetInnerHTML={{ __html: summary }}></div>
                    </div>)
                  }
                </div>
              ) : (
                ""
              )}
            </div>

            {/* Divider */}
            <hr className="mt-6" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Home */}
              <button
                type="button"
                onClick={() => router.push("/")}
                className="mt-6 block w-full select-none rounded-lg bg-blue-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-400/10 transition-all hover:shadow-lg hover:shadow-blue-400/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Home Page
              </button>

              {/* Submit */}
              <button
                type="submit"
                onClick={() => router.push("/search")}
                className="mt-6 block w-full select-none rounded-lg bg-gray-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-500/10 transition-all hover:shadow-lg hover:shadow-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Search Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualResult;

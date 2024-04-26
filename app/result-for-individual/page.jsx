"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const IndividualResult = () => {
  const [results, setResults] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const setDataFromLocalStorage = async () => {
      // Retrieve the stringified JSON data from local storage
      const data = localStorage.getItem("result-for-individual");

      // If no result, redirect to search page
      if (!data) {
        router.push("/search");
      }

      // Convert into JSON
      const json = await JSON.parse(data || "[]");

      setResults(json);
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
                <table className="bg-transparent w-max border-collapse">
                  <thead>
                    <tr>
                      <th class="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        #
                      </th>
                      <th class="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Thumbnail
                      </th>
                      <th class="px-4 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
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
                            <img src={item.imageUrl} class="rounded w-6 h-6" />
                          </td>
                          <td className="border-t-0 align-middle border-l-0 border-r-0 whitespace-nowrap px-4 py-1">
                            <a
                              class="link-underline link-underline-opacity-0 hover:text-blue-700"
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
                ""
              )}
            </div>

            {/* Divider */}
            <hr className="mt-6" />

            {/* Home Button */}
            <button
              type="button"
              onClick={() => router.push("/")}
              className="mt-6 block w-full select-none rounded-lg bg-blue-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-400/10 transition-all hover:shadow-lg hover:shadow-blue-400/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualResult;

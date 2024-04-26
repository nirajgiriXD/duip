"use client";

import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="flex gap-8 flex-wrap justify-center items-center min-h-screen py-10">
      <div
        className="transform rounded-xl h-40 w-40 bg-white shadow-xl transition duration-100 hover:scale-105"
        role="button"
        onClick={() => router.push("/search-individual")}
      >
        <div className="flex h-full justify-center items-center">
          <span className="font-bold text-gray-500 p-3 text-center">
            Search Individual
          </span>
        </div>
      </div>

      <div
        className="transform rounded-xl h-40 w-40 bg-white shadow-xl transition duration-100 hover:scale-105"
        role="button"
        onClick={() => router.push("/search-group")}
      >
        <div className="flex h-full justify-center items-center">
          <span className="font-bold text-gray-500 p-3 text-center">
            Search Group
          </span>
        </div>
      </div>

      <div
        className="transform rounded-xl h-40 w-40 bg-white shadow-xl transition duration-100 hover:scale-105"
        role="button"
        onClick={() => router.push("/result-for-individual")}
      >
        <div className="flex h-full justify-center items-center">
          <span className="font-bold text-gray-500 p-3 text-center">
            Individual Search Result
          </span>
        </div>
      </div>

      <div
        className="transform rounded-xl h-40 w-40 bg-white shadow-xl transition duration-100 hover:scale-105"
        role="button"
        onClick={() => router.push("/result-for-group")}
      >
        <div className="flex h-full justify-center items-center">
          <span className="font-bold text-gray-500 p-3 text-center">
            Group Search Result
          </span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

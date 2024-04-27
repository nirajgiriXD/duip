"use client";

/**
 * External dependencies.
 */
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();

  return (
    <div className="flex gap-8 flex-wrap justify-center items-center min-h-screen py-10">
      <div
        className="transform rounded-xl h-40 w-40 bg-white shadow-xl transition duration-100 hover:scale-105"
        role="button"
        onClick={() => router.push("/search")}
      >
        <div className="flex h-full justify-center items-center">
          <span className="font-bold text-gray-500 p-3 text-center">
            Search Page
          </span>
        </div>
      </div>

      <div
        className="transform rounded-xl h-40 w-40 bg-white shadow-xl transition duration-100 hover:scale-105"
        role="button"
        onClick={() => router.push("/result")}
      >
        <div className="flex h-full justify-center items-center">
          <span className="font-bold text-gray-500 p-3 text-center">
            Result Page
          </span>
        </div>
      </div>

      <div
        className="transform rounded-xl h-40 w-40 bg-white shadow-xl transition duration-100 hover:scale-105"
        role="button"
        onClick={() => {
          localStorage.clear();
          alert("Data deleted succcessfully");
        }}
      >
        <div className="flex h-full justify-center items-center">
          <span className="font-bold text-gray-500 p-3 text-center">
            Clear Data
          </span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

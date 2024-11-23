"use client";

/**
 * External dependencies.
 */
import useApp from "@hooks/useApp";
import ClipLoader from "react-spinners/ClipLoader";

const Form = () => {
  const {
    formData,
    handleFormDataChange,
    handleFormSubmit,
    isSubmitting,
  } = useApp();

  return (
    <form method="POST" onSubmit={handleFormSubmit}>
      <div className="text-base leading-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 sm:text-lg sm:leading-7 border rounded-md p-4">
        {/* Name */}
        <div className="flex flex-col">
          <label className="text-sm leading-loose">Name</label>
          <input
            type="text"
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
            name="name"
            value={formData.name}
            onChange={handleFormDataChange}
            placeholder="Name"
          />
        </div>

        {/* Username */}
        <div className="flex flex-col">
          <label className="text-sm leading-loose">Username</label>
          <input
            type="text"
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
            name="username"
            value={formData.username}
            onChange={handleFormDataChange}
            placeholder="Username"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm leading-loose">Email</label>
          <input
            type="email"
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
            name="email"
            value={formData.email}
            onChange={handleFormDataChange}
            placeholder="name@example.com"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="text-sm leading-loose">Phone</label>
          <input
            type="tel"
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
            name="phone"
            value={formData.phone}
            onChange={handleFormDataChange}
            placeholder="98********"
          />
        </div>

        {/* Profession */}
        <div className="flex flex-col">
          <label className="text-sm leading-loose">Profession</label>
          <input
            type="text"
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
            name="profession"
            value={formData.profession}
            onChange={handleFormDataChange}
            placeholder="Profession"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label className="text-sm leading-loose">Address</label>
          <input
            type="text"
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
            name="address"
            value={formData.address}
            onChange={handleFormDataChange}
            placeholder="Address"
          />
        </div>

        {/* Organization */}
        <div className="flex flex-col">
          <label className="text-sm leading-loose">
            Organization
          </label>
          <input
            type="text"
            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
            name="organization"
            value={formData.organization}
            onChange={handleFormDataChange}
            placeholder="Organization"
          />
        </div>

        {/* Process */}
        <div className="flex flex-col">
          <label className="text-sm leading-loose">Process</label>
          <select
            onChange={handleFormDataChange}
            value={formData.process}
            name="process"
            className="peer h-full w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50"
          >
            <option value="automatic">Automatic</option>
            <option value="manual">Manual</option>
          </select>
        </div>
      </div>

      {/* Submit */}
      <div className="pt-6">
        <button
          className="bg-blue-400 hover:bg-blue-500 flex justify-center items-center w-full text-white p-2 rounded-md focus:outline-none text-sm transition-all"
          type="submit"
          disabled={isSubmitting}
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
          ) : formData.process === "manual" ? (
            "Search Publicly Available Data"
          ) : (
            "Search, Assemble and Summarize"
          )}
        </button>
      </div>
    </form>
  );
};

export default Form;

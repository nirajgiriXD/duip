"use client";

/**
 * External dependencies.
 */
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/navigation";

const SearchIndividual = () => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    interest: "",
    profession: "",
    organization: "",
    year_of_birth: "",
    search_type: "quick",
  });

  const router = useRouter();

  const handleFormDataChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      const data = {
        ...prev,
        [name]: value,
      };

      // Save the form data in local storage
      localStorage.setItem("search", JSON.stringify(data));

      return data;
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        // Save the stringified JSON object to local storage
        localStorage.setItem("result", JSON.stringify(data.data));

        // Redirect to result page
        router.push("/result");
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const setDataFromLocalStorage = async () => {
      // Retrieve the stringified JSON data from local storage
      const data = localStorage.getItem("search");

      // Convert into JSON
      const json = (await JSON.parse(data)) || formData;

      setFormData(json);
    };

    setDataFromLocalStorage();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto">
        <div className="m-5 p-5 bg-white rounded-lg shadow">
          <div className="relative flex flex-col text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
            <form
              className="max-w-screen-lg min-w-[600px] sm:w-96"
              method="POST"
              onSubmit={handleFormSubmit}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Name */}
                <div>
                  <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Name
                  </h6>
                  <div className="relative h-10 w-full min-w-[200px]">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormDataChange}
                      placeholder="Name"
                      className="peer h-full w-full rounded-md border border-blue-gray-200 !border-t-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50"
                    />
                  </div>
                </div>

                {/* Username */}
                <div>
                  <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Username
                  </h6>
                  <div className="relative h-10 w-full min-w-[200px]">
                    <input
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleFormDataChange}
                      placeholder="Username"
                      className="peer h-full w-full rounded-md border border-blue-gray-200 !border-t-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Email
                  </h6>
                  <div className="relative h-10 w-full min-w-[200px]">
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleFormDataChange}
                      placeholder="name@example.com"
                      className="peer h-full w-full rounded-md border border-blue-gray-200 !border-t-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Phone
                  </h6>
                  <div className="relative h-10 w-full min-w-[200px]">
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleFormDataChange}
                      placeholder="98********"
                      className="peer h-full w-full rounded-md border border-blue-gray-200 !border-t-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50"
                    />
                  </div>
                </div>

                {/* Interest */}
                <div>
                  <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Interest
                  </h6>
                  <div className="relative h-10 w-full min-w-[200px]">
                    <input
                      name="interest"
                      type="text"
                      value={formData.interest}
                      onChange={handleFormDataChange}
                      placeholder="Interest"
                      className="peer h-full w-full rounded-md border border-blue-gray-200 !border-t-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50"
                    />
                  </div>
                </div>

                {/* Profession */}
                <div>
                  <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Profession
                  </h6>
                  <div className="relative h-10 w-full min-w-[200px]">
                    <input
                      name="profession"
                      type="text"
                      value={formData.profession}
                      onChange={handleFormDataChange}
                      placeholder="Profession"
                      className="peer h-full w-full rounded-md border border-blue-gray-200 !border-t-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Address
                  </h6>
                  <div className="relative h-10 w-full min-w-[200px]">
                    <input
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleFormDataChange}
                      placeholder="Address"
                      className="peer h-full w-full rounded-md border border-blue-gray-200 !border-t-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50"
                    />
                  </div>
                </div>

                {/* Organization */}
                <div>
                  <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Organization
                  </h6>
                  <div className="relative h-10 w-full min-w-[200px]">
                    <input
                      name="organization"
                      type="text"
                      value={formData.organization}
                      onChange={handleFormDataChange}
                      placeholder="Organization"
                      className="peer h-full w-full rounded-md border border-blue-gray-200 !border-t-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Gender
                  </h6>
                  <div className="relative h-10 w-full min-w-[200px]">
                    <select
                      onChange={handleFormDataChange}
                      name="gender"
                      className="peer h-full w-full rounded-md border border-blue-gray-200 !border-t-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Year of Birth */}
                <div>
                  <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Year of Birth
                  </h6>
                  <div className="relative h-10 w-full min-w-[200px]">
                    <input
                      name="year_of_birth"
                      type="number"
                      value={formData.year_of_birth}
                      onChange={handleFormDataChange}
                      placeholder="Year of Birth"
                      className="peer h-full w-full rounded-md border border-blue-gray-200 !border-t-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50"
                    />
                  </div>
                </div>

                {/* Search Type */}
                <div>
                  <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                    Search Type
                  </h6>
                  <div className="relative h-10 w-full min-w-[200px]">
                    <select
                      onChange={handleFormDataChange}
                      name="search_type"
                      className="peer h-full w-full rounded-md border border-blue-gray-200 !border-t-blue-gray-200 bg-transparent px-3 py-2 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 disabled:bg-blue-gray-50"
                    >
                      <option value="quick">Quick</option>
                      <option value="normal">Normal</option>
                    </select>
                  </div>
                </div>
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
                  className="mt-6 block w-full select-none rounded-lg bg-gray-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-500/10 transition-all hover:shadow-lg hover:shadow-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  {submitting ? (
                    <ClipLoader
                      color="#ffffff"
                      loading={submitting}
                      size={13}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    "Search"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchIndividual;

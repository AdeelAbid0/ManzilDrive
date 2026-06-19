import { useState, useEffect, useRef } from "react";
import Pagination from "../../../../Common/Pagination";
import Details from "../../../../Components/Details";

const Checkbox = ({ checked, onChange }) => (
  <div
    onClick={onChange}
    className={`w-4 h-4 rounded-sm border cursor-pointer flex items-center justify-center flex-shrink-0 transition-colors ${
      checked ? "bg-primary border-primary" : "bg-white border-[#ADADAD]"
    }`}
  >
    {checked && (
      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 6l3 3 5-5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </div>
);

const ProductsList = ({
  allCarsData,
  formik,
  handleSearch,
  LoadingCarsData,
  page,
  handlePageChange,
  totalPages,
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMobileFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { values, setFieldValue } = formik;

  const toggleCheckbox = (field, value) => {
    const currentValues = [...(values[field] || [])];
    if (currentValues.includes(value)) {
      setFieldValue(
        field,
        currentValues.filter((item) => item !== value),
      );
    } else {
      setFieldValue(field, [...currentValues, value]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFieldValue("page", "1");
    handleSearch();
  };

  return (
    <div className="flex w-full justify-center">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col md:flex-row w-full justify-center gap-4 mt-6 pb-6"
      >
        {/* Sidebar Filters — Desktop */}
        <div className="hidden md:flex h-[480px] w-[13%] max-w-[180px] bg-white">
          <div className="flex flex-col w-[148px] ml-4 mt-4">
            <h1 className="font-inter font-medium text-sm text-transparent bg-clip-text bg-hero">
              Filters
            </h1>

            {/* Category */}
            <div>
              <h2 className="font-inter font-semibold text-xs mt-4 text-primaryblue">
                Category
              </h2>
              <div className="flex flex-col gap-4 mt-3">
                {["Economy", "Luxury", "Standard"].map((type) => (
                  <div key={type} className="flex items-center gap-2">
                    <Checkbox
                      checked={values.category?.includes(type) || false}
                      onChange={() => toggleCheckbox("category", type)}
                    />
                    <p className="font-inter font-normal text-sm text-secondary">
                      {type}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Transmission */}
            <div>
              <h2 className="font-inter font-semibold text-xs mt-6 text-primaryblue">
                Transmission
              </h2>
              <div className="flex flex-col mt-3 gap-4">
                {["automatic", "manual"].map((type) => (
                  <div key={type} className="flex items-center gap-2">
                    <Checkbox
                      checked={values.transmission?.includes(type) || false}
                      onChange={() => toggleCheckbox("transmission", type)}
                    />
                    <p className="font-inter font-normal text-sm text-secondary">
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Driver */}
            <div>
              <h2 className="font-inter font-semibold text-xs mt-6 text-primaryblue">
                Driver
              </h2>
              <div className="flex flex-col mt-3 gap-4">
                {[
                  { key: "withDriver", label: "With Driver" },
                  { key: "withoutDriver", label: "Without Driver" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center gap-2">
                    <Checkbox
                      checked={values.availability?.includes(item.key) || false}
                      onChange={() => toggleCheckbox("availability", item.key)}
                    />
                    <p className="font-inter font-normal text-sm text-secondary">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 bg-primary text-white text-sm py-2 rounded-md font-medium hover:bg-primary/50 h-[40px] w-full"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Mobile Filter Button and Dropdown */}
        <div className="relative z-20 w-full md:hidden px-4" ref={dropdownRef}>
          <div className="w-fit">
            <button
              type="button"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg
                className="h-5 w-5 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 019 17v-5.586L3.293 7.707A1 1 0 013 7V3z"
                  clipRule="evenodd"
                />
              </svg>
              Filters
            </button>
          </div>

          {showMobileFilters && (
            <div className="mt-2 bg-white rounded-lg shadow-lg p-4 w-[152px] absolute left-4 z-10">
              <div className="flex flex-col gap-4">
                {/* Category */}
                <div>
                  <h2 className="font-inter font-semibold text-xs text-primaryblue">
                    Category
                  </h2>
                  <div className="flex flex-col gap-2 mt-2">
                    {["Economy", "Luxury", "Standard"].map((type) => (
                      <div
                        key={`mobile-${type}`}
                        className="flex items-center gap-2"
                      >
                        <Checkbox
                          checked={values.category?.includes(type) || false}
                          onChange={() => toggleCheckbox("category", type)}
                        />
                        <p className="font-inter font-normal text-xs text-secondary">
                          {type}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transmission */}
                <div>
                  <h2 className="font-inter font-semibold text-xs mt-2 text-primaryblue">
                    Transmission
                  </h2>
                  <div className="flex flex-col gap-2 mt-2">
                    {["automatic", "manual"].map((type) => (
                      <div
                        key={`mobile-${type}`}
                        className="flex items-center gap-2"
                      >
                        <Checkbox
                          checked={values.transmission?.includes(type) || false}
                          onChange={() => toggleCheckbox("transmission", type)}
                        />
                        <p className="font-inter font-normal text-xs text-secondary">
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Driver */}
                <div>
                  <h2 className="font-inter font-semibold text-xs mt-2 text-primaryblue">
                    Driver
                  </h2>
                  <div className="flex flex-col gap-2 mt-2">
                    {[
                      { key: "withDriver", label: "With Driver" },
                      { key: "withoutDriver", label: "Without Driver" },
                    ].map((item) => (
                      <div
                        key={`mobile-${item.key}`}
                        className="flex items-center gap-2"
                      >
                        <Checkbox
                          checked={
                            values.availability?.includes(item.key) || false
                          }
                          onChange={() =>
                            toggleCheckbox("availability", item.key)
                          }
                        />
                        <p className="font-inter font-normal text-xs text-secondary">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    handleFormSubmit(e);
                    setShowMobileFilters(false);
                  }}
                  className="mt-2 bg-primary text-white text-xs py-1.5 rounded-md font-medium hover:bg-primary/50 w-full"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side Details */}
        <div className="flex w-full md:w-[70%] flex-col gap-4 px-4 md:px-0">
          <Details
            allCarsData={allCarsData}
            LoadingCarsData={LoadingCarsData}
          />
          {!LoadingCarsData && allCarsData?.length > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductsList;

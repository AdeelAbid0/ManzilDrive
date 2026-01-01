import Pagination from "../../../../Common/Pagination/Pagination";
import Details from "../../../../Components/Details/Details";

const ProductsList = ({
  allCarsData,
  formik,
  handleSearch,
  LoadingCarsData,
  page,
  handlePageChange,
  totalPages,
}) => {
  const { values, setFieldValue, handleSubmit } = formik;

  const toggleCheckbox = (field, value) => {
    const currentValues = [...(values[field] || [])];
    if (currentValues.includes(value)) {
      setFieldValue(
        field,
        currentValues.filter((item) => item !== value)
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
        className="flex w-full justify-center gap-4 mt-6"
      >
        {/* Sidebar Filters */}
        <div className="hidden md:flex h-[480px] w-[13%] max-w-[180px] bg-white">
          <div className="flex flex-col w-[148px] ml-4 mt-4">
            <h1 className="font-inter font-medium text-sm text-transparent bg-clip-text bg-hero">
              Filters
            </h1>

            {/* Category Filter */}
            <div>
              <h2 className="font-inter font-semibold text-xs mt-4 text-primaryblue">
                Category
              </h2>
              <div className="flex flex-col gap-4 mt-3">
                {["Economy", "Luxury", "Standard"].map((type) => (
                  <div key={type} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={values.category?.includes(type) || false}
                      onChange={() => toggleCheckbox("category", type)}
                      className="w-3 h-3 border border-[#ADADAD] rounded-sm"
                    />
                    <p className="font-inter font-normal text-sm text-secondary">
                      {type}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Transmission Filter */}
            <div>
              <h2 className="font-inter font-semibold text-xs mt-6 text-primaryblue">
                Transmission
              </h2>
              <div className="flex flex-col mt-3 gap-4">
                {["automatic", "manual"].map((type) => (
                  <div key={type} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={values.transmission?.includes(type) || false}
                      onChange={() => toggleCheckbox("transmission", type)}
                      className="w-3 h-3 border border-[#ADADAD] rounded-sm"
                    />
                    <p className="font-inter font-normal text-sm text-secondary">
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Driver Filter */}
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
                    <input
                      type="checkbox"
                      checked={values.availability?.includes(item.key) || false}
                      onChange={() => toggleCheckbox("availability", item.key)}
                      className="w-3 h-3 border border-[#ADADAD] rounded-sm"
                    />
                    <p className="font-inter font-normal text-sm text-secondary">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* APPLY FILTERS BUTTON */}
            <button
              type="submit"
              className="mt-6 bg-primaryblue text-white text-sm py-2 rounded-md font-medium hover:bg-blue-600 w-full"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Right Side Details */}
        <div className="flex flex-col gap-4">
          <Details
            allCarsData={allCarsData}
            LoadingCarsData={LoadingCarsData}
          />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </form>
    </div>
  );
};

export default ProductsList;

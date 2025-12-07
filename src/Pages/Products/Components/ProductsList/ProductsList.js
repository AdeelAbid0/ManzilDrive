import { useFormik } from "formik";
import Details from "../../../../Components/Details/Details";

const ProductsList = ({ allCarsData }) => {
  // Formik setup
  const formik = useFormik({
    initialValues: {
      shortcut: {
        economy: false,
        luxury: false,
        standard: false,
      },
      transmission: {
        auto: false,
        manual: false,
      },
      driver: {
        withDriver: false,
        withoutDriver: false,
      },
    },
    onSubmit: (values) => {},
  });

  const { values, handleChange, handleSubmit } = formik;

  return (
    <div className="flex w-full justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-full justify-center gap-4 mt-6"
      >
        {/* Sidebar Filters */}
        <div className="hidden md:flex h-[422px] w-[13%] max-w-[180px] bg-white ">
          <div className="flex flex-col w-[148px] ml-4 mt-4">
            <h1 className="font-inter font-medium text-sm leading-[18px] text-transparent bg-clip-text bg-hero">
              Filters
            </h1>

            {/* Shortcut */}
            <div>
              <h2 className="font-inter font-semibold text-xs leading-4 mt-4 text-primaryblue">
                Shortcut
              </h2>
              <div className="flex flex-col gap-4 mt-3">
                {["economy", "luxury", "standard"].map((type) => (
                  <div
                    key={type}
                    className="flex gap-2 h-[18px] items-center capitalize"
                  >
                    <input
                      type="checkbox"
                      name={`shortcut.${type}`}
                      checked={values.shortcut[type]}
                      onChange={handleChange}
                      className="w-3 h-3 border border-[#ADADAD] rounded-sm"
                    />
                    <p className="font-inter font-normal text-sm leading-[18px] text-secondary">
                      {type}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Transmission */}
            <div>
              <h2 className="font-inter font-semibold text-xs leading-4 mt-6 text-primaryblue">
                Transmission
              </h2>
              <div className="flex flex-col mt-3 gap-4">
                {["auto", "manual"].map((type) => (
                  <div
                    key={type}
                    className="flex gap-2 h-[18px] items-center capitalize"
                  >
                    <input
                      type="checkbox"
                      name={`transmission.${type}`}
                      checked={values.transmission[type]}
                      onChange={handleChange}
                      className="w-3 h-3 border border-[#ADADAD] rounded-sm"
                    />
                    <p className="font-inter font-normal text-sm leading-[18px] text-secondary">
                      {type}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Driver */}
            <div>
              <h2 className="font-inter font-semibold text-xs leading-4 mt-6 text-primaryblue">
                Driver
              </h2>
              <div className="flex flex-col mt-3 gap-4">
                {[
                  { key: "withDriver", label: "With Driver" },
                  { key: "withoutDriver", label: "Without Driver" },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex gap-2 h-[18px] items-center"
                  >
                    <input
                      type="checkbox"
                      name={`driver.${item.key}`}
                      checked={values.driver[item.key]}
                      onChange={handleChange}
                      className="w-3 h-3 border border-[#ADADAD] rounded-sm"
                    />
                    <p className="font-inter font-normal text-sm leading-[18px] text-secondary">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply Filters Button */}
            <button
              type="submit"
              className="mt-6 bg-primaryblue text-white text-sm py-2 rounded-md font-medium hover:bg-blue-600"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Right Side Details */}
        <div>
          <Details allCarsData={allCarsData} />
        </div>
      </form>
    </div>
  );
};

export default ProductsList;

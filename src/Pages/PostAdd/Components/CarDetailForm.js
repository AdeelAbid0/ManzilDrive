import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

const CarDetailForm = ({
  formik,
  data,
  modelsData,
  variantData,
  isEditMode,
}) => {
  return (
    <div className="flex flex-col w-full">
      <h1 className="font-inter font-semibold text-[32px] text-[#4D4D4D] leading-[100%]">
        {isEditMode ? "Edit Details" : "Car Details"}
      </h1>
      {!isEditMode && (
        <p className="mt-4 font-inter font-normal text-sm text-[#666666] leading-[18px]">
          Include Some Details
        </p>
      )}
      <div className="flex flex-col mt-4">
        <Dropdown
          value={formik.values.make}
          name="make"
          options={data || []}
          onChange={(e) => {
            formik.setFieldValue("make", e.value);
            formik.setFieldValue("model", "");
            formik.setFieldValue("variant", "");
          }}
          onBlur={formik.handleBlur}
          optionLabel="label"
          optionValue="_id"
          placeholder="Select Make"
          filter
          filterPlaceholder="Search Make"
          className={`font-inter items-center font-normal text-input text-sm h-[49px] bg-[#F7F7F7] rounded placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px]  ${
            formik.touched.make && formik.errors.make
              ? "border border-error text-error"
              : ""
          }`}
        />
        <Dropdown
          value={formik.values.model}
          name="model"
          options={modelsData || []}
          onChange={(e) => {
            formik.setFieldValue("model", e.value);
            formik.setFieldValue("variant", "");
          }}
          onBlur={formik.handleBlur}
          optionLabel="name"
          optionValue="_id"
          placeholder="Select Model"
          filter
          filterPlaceholder="Search Model"
          disabled={!formik.values.make}
          className={`mt-3 font-inter items-center font-normal text-input text-sm h-[49px] bg-[#F7F7F7] rounded placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] ${!formik.values.make ? "opacity-50" : ""} ${
            formik.touched.model && formik.errors.model
              ? "border border-error text-error"
              : ""
          }`}
        />
        <Dropdown
          value={formik.values.variant}
          name="variant"
          options={variantData || []}
          onChange={(e) => formik.setFieldValue("variant", e.value)}
          onBlur={formik.handleBlur}
          optionLabel="name"
          optionValue="_id"
          placeholder="Select Variant"
          filter
          filterPlaceholder="Search Variant"
          disabled={!formik.values.model}
          className={`mt-3 font-inter items-center font-normal text-input text-sm h-[49px] bg-[#F7F7F7] rounded placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] ${!formik.values.model ? "opacity-50" : ""} ${
            formik.touched.variant && formik.errors.variant
              ? "border border-error text-error"
              : ""
          }`}
        />
        <InputText
          type="number"
          name="year"
          value={formik.values.year}
          placeholder="Year"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`mt-3 font-inter font-normal text-input text-sm bg-[#F7F7F7] h-[49px] rounded focus:ring-0 focus:outline-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3  ${
            formik.touched.year && formik.errors.year
              ? "border border-error text-error"
              : ""
          }`}
        />
        <InputText
          type="number"
          name="rentPerDay"
          value={formik.values.rentPerDay}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Rent Per Day"
          className={`mt-3 font-inter font-normal text-input text-sm bg-[#F7F7F7] h-[49px] rounded focus:ring-0 focus:outline-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3  ${
            formik.touched.rentPerDay && formik.errors.rentPerDay
              ? "border border-error text-error"
              : ""
          }`}
        />

        <InputTextarea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoResize={false}
          placeholder="Add Description"
          className={`mt-3 font-inter font-normal text-input text-sm bg-[#F7F7F7] h-[120px] rounded focus:ring-0 focus:outline-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3 pt-4  ${
            formik.touched.description && formik.errors.description
              ? "border border-error text-error"
              : ""
          }`}
        />
      </div>
      <div>
        <div className="mt-4">
          <label className="font-inter font-medium text-xs text-[#808080] leading-4">
            Driver :
          </label>
          <div className="flex gap-4 w-full shrink-0 flex-wrap">
            {[
              { value: "withDriver", label: "With Driver" },
              { value: "withoutDriver", label: "Without Driver" },
              { value: "both", label: "Both" },
            ].map(({ value, label }) => (
              <div
                key={value}
                className="flex gap-2 h-7 items-center shrink-0 flex-wrap"
              >
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    name="availability"
                    value={value}
                    checked={formik.values.availability === value}
                    onChange={() => formik.setFieldValue("availability", value)}
                    className="w-5 h-5 border border-[#666666] accent-primary"
                  />
                </div>
                <p className="font-inter font-normal text-[#666666] text-sm leading-[18px]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <label className="font-inter font-medium text-xs text-[#808080] leading-4">
            Transmission :
          </label>
          <div className="flex gap-4">
            {["automatic", "manual"].map((option) => (
              <div
                key={option}
                className="flex gap-2 h-7 items-center shrink-0 flex-wrap"
              >
                <input
                  type="radio"
                  name="transmission"
                  value={option}
                  checked={formik.values.transmission === option}
                  onChange={() => formik.setFieldValue("transmission", option)}
                  className="w-5 h-5 border border-[#666666] accent-primary"
                />
                <p className="font-inter font-normal text-[#666666] text-sm leading-[18px]">
                  {option}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <label className="font-inter font-medium text-xs text-[#808080] leading-4">
            AC/Heater :
          </label>
          <div className="flex gap-4">
            {["AC / Heater installed", "None"].map((option) => (
              <div
                key={option}
                className="flex gap-2 h-7 items-center shrink-0 flex-wrap"
              >
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    name="acheater"
                    value={option}
                    checked={formik.values.acheater === option}
                    onChange={() => formik.setFieldValue("acheater", option)}
                    className="w-5 h-5 border border-[#666666] accent-primary"
                  />
                </div>
                <p className="font-inter font-normal text-[#666666] text-sm leading-[18px]">
                  {option}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <label className="font-inter font-medium text-xs text-[#808080] leading-4">
            Seats :
          </label>
          <div className="flex gap-4 mt-2 w-full shrink-0 flex-wrap">
            {["2", "4", "7"].map((option) => (
              <div
                key={option}
                className="flex gap-2 h-7 items-center shrink-0 flex-wrap"
              >
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    name="seats"
                    value={option}
                    checked={formik.values.seats === option}
                    onChange={() => formik.setFieldValue("seats", option)}
                    className="w-5 h-5 border border-[#666666] accent-primary"
                  />
                </div>
                <p className="font-inter font-normal text-[#666666] text-sm leading-[18px]">
                  {option} &nbsp;Persons
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailForm;

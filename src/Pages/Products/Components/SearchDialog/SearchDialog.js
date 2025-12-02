import { useFormik } from "formik";
import { searchDialogInitialValues } from "../../Form/searchDialog.initial";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import PrimaryButton from "../../../../Common/Button/Button";
import Location from "../../../../Common/LocationInput/Location";
import {
  useGetAllMakes,
  useGetAllmodelByMake,
  useGetAllVariantsBymodel,
} from "../../../PostAdd/hooks/PostApi";
import { useGetAllActiveByCountryId } from "../../hooks/ProductsApi";
const SearchDialog = () => {
  const formik = useFormik({
    initialValues: searchDialogInitialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  // ------------------- API HOOKS -------------------
  // Get all makes api
  const { data: makesData } = useGetAllMakes();
  const makeId = formik.values.make;
  const modelId = formik.values.model;
  // Get All models by make api
  const { data: modelsData, refetch: refetchmodel } =
    useGetAllmodelByMake(makeId);
  // Get All Variants api
  const { data: variantData, refetch: refetchVariant } =
    useGetAllVariantsBymodel(modelId);

  // Get all cities api
  const {
    data: CityData,
    isLoading,
    error,
  } = useGetAllActiveByCountryId("665000000000000000000001");
  const handleSearch = () => {
    console.log("handle search", formik.values);
  };
  const handleChange = (e) => {
    formik.setFieldValue("location", e.value);
  };
  return (
    <div className="flex flex-col mt-4">
      <div className="flex flex-col items-center w-full justify-center gap-3 mb-8 text-center">
        <h1 className="!m-0 font-bold text-2xl leading-[100%] text-[#394C49]">
          FIND THE BEST CAR
        </h1>
        <p className="!m-0 text-[#445D58] font-normal text-sm leading-[18px]">
          Verify your email to see all features and get a higher limit for your
          car ads.
        </p>
      </div>
      <Dropdown
        value={formik.values.make}
        name="make"
        options={makesData}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        optionLabel="label"
        optionValue="_id"
        placeholder="Select Make"
        filter
        filterPlaceholder="Search Make"
        className={`font-inter items-center font-normal text-input text-sm h-[49px] bg-[#F7F7F7] rounded placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px]`}
      />
      <Dropdown
        value={formik.values.model}
        name="model"
        options={modelsData ?? []}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        optionLabel="name"
        optionValue="_id"
        placeholder="Select model"
        filter
        filterPlaceholder="Search model"
        className={` mt-3 font-inter items-center font-normal text-input text-sm h-[49px] bg-[#F7F7F7] rounded placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px]`}
      />
      <Dropdown
        value={formik.values.variant}
        name="variant"
        options={variantData ?? []}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        optionLabel="name"
        optionValue="_id"
        placeholder="Select Variant"
        filter
        filterPlaceholder="Search Variant"
        className={` mt-3 font-inter items-center font-normal text-input text-sm h-[49px] bg-[#F7F7F7] rounded placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px]`}
      />
      <InputText
        type="number"
        name="year"
        value={formik.values.year}
        placeholder="Year"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`mt-3 font-inter font-normal text-input text-sm bg-[#F7F7F7] h-[49px] rounded focus:ring-0 focus:outline-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3`}
      />
      <Dropdown
        value={formik.values.city}
        name="city"
        options={CityData || []}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        optionLabel="name"
        optionValue="_id"
        placeholder="City"
        filter
        filterPlaceholder="Search Make"
        className={`mt-3 font-inter items-center font-normal text-input text-sm h-[49px] bg-[#F7F7F7] rounded placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px]`}
      />

      <Location
        value={formik.values.location}
        onChange={handleChange}
        placeholder="Search Location"
        className="mt-3 w-full !bg-[#F7F7F7] !h-[48px]"
      />

      <PrimaryButton
        type="submit"
        label="Search"
        handleClick={handleSearch}
        loading={""}
        className={"mt-8 "}
      />
    </div>
  );
};

export default SearchDialog;

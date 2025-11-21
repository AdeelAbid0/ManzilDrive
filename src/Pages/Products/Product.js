import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import HeroSection from "../../Components/HeroSection/HeroSection";
import ProductsList from "./Components/ProductsList/ProductsList";
import { useFormik } from "formik";
import { initialValues } from "./Form/Poducts.initail";
import { AutoComplete } from "primereact/autocomplete";
import {
  useGetAllActiveByCountryId,
  useGetAllCars,
  useGetLocation,
} from "./hooks/ProductsApi";

const Products = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [sessionToken, setSessionToken] = useState("");

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  // ✅ Cars API
  const { data: allCarsData, isPending: LoadingCarsData } = useGetAllCars();
  const {
    data: CityData,
    isLoading,
    error,
  } = useGetAllActiveByCountryId("665000000000000000000001");

  return (
    <div className="flex flex-col items-center h-auto">
      <div className="flex w-full md:flex-col flex-col-reverse">
        <HeroSection />
        <div className="flex justify-center w-full">
          <div className="flex items-center md:w-[90%] w-full h-[98px] md:h-[90px] md:rounded bg-search mt-0 md:mt-[-45px] md:pl-6 pl-3 md:pr-6 pr-3 md:gap-4">
            {/* Car Make or Model */}
            <div className="flex w-[33%]">
              <InputText
                placeholder="Car Make or Model"
                className="font-inter font-normal text-input text-sm w-full h-[42px] rounded md:rounded-tr-[4px] md:rounded-br-[4px] rounded-tr-none rounded-br-none focus:ring-0 focus:outline-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3"
              />
            </div>

            {/* City Dropdown */}
            <div className="flex w-[33%]">
              <Dropdown
                value={formik.values.city}
                name="city"
                options={CityData}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                optionLabel="name"
                optionValue="_id"
                placeholder="City"
                filter
                filterPlaceholder="Search Make"
                className="font-inter items-center md:border-none border border-l-[1px] border-l-[#BFBFBF] font-normal text-input text-sm w-full h-[42px] bg-white md:rounded rounded-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px]"
              />
            </div>

            {/* Location Search (Google Places Style) */}
            {/* <div className="hidden md:flex w-[33%]">
              <AutoComplete
                value={formik.values.location}
                suggestions={filteredSuggestions}
                completeMethod={handleSearch}
                itemTemplate={itemTemplate}
                onChange={handleChange}
                field="label"
                placeholder="Search Location"
                className="w-full"
              />
            </div> */}

            {/* Search Button */}
            <div className="flex w-[33%]">
              <Button
                label="Search"
                onClick={formik.handleSubmit}
                className="text-white font-inter font-medium text-sm rounded rounded-tl-none rounded-bl-none md:rounded-tl-[4px] md:rounded-bl-[4px] border-primary bg-[#22AB9B] w-full h-[42px] focus:ring-0 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className=" mt-6 md:mt-10">
        <h1 className="font-inter font-medium text-2xl leading-[100%] text-secondary">
          Rental Cars in Rawalpindi
        </h1>
      </div>

      <div className="flex w-full justify-center">
        <ProductsList allCarsData={allCarsData} />
      </div>
    </div>
  );
};

export default Products;

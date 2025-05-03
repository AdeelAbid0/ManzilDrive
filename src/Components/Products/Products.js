import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
// import { SearchIcon } from "../../Utils/Icons";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
// import Details from "../Details.js/Details";
import HeroSection from "../HeroSection/HeroSection";
import ProductsList from "./ProductsLIst/ProductsList";
const Products = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  // const [checked, setChecked] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  return (
    <div className="flex flex-col items-center h-auto">
      <div className="flex w-full md:flex-col flex-col-reverse">
        {!viewDetail && <HeroSection />}
        {!viewDetail && (
          <div className="flex justify-center w-full">
            <div className="flex items-center md:w-[90%] w-full h-[98px] md:h-[90px] md:rounded bg-search mt-0 md:mt-[-45px] md:pl-6 pl-3 md:pr-6 pr-3 md:gap-4">
              <div className="flex w-[33%]">
                <InputText
                  placeholder="Car Make or Model"
                  className="font-inter font-normal text-input text-sm w-full h-[42px] rounded md:rounded-tr-[4px] md:rounded-br-[4px] rounded-tr-none rounded-br-none focus:ring-0 focus:outline-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3"
                />
                {/* <div className="absolute mt-[14px] ml-[27%]">
              <SearchIcon />
            </div> */}
              </div>
              <div className="flex w-[33%]">
                <Dropdown
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.value)}
                  options={cities}
                  optionLabel="name"
                  placeholder="Select a City"
                  className="font-inter items-center md:border-none border border-l-[1px] border-l-[#BFBFBF] font-normal text-input text-sm w-full h-[42px] bg-white md:rounded rounded-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px]"
                />
              </div>
              <div className="hidden md:flex w-[33%]">
                <InputText
                  placeholder="Location"
                  className="font-inter font-normal text-input text-sm w-full h-[42px] rounded focus:ring-0 focus:outline-none placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3"
                />
              </div>
              <div className="flex w-[33%]">
                <Button
                  label="Search"
                  className="text-white font-inter font-medium text-sm rounded rounded-tl-none rounded-bl-none md:rounded-tl-[4px] md:rounded-bl-[4px] border-primary bg-[#22AB9B] w-full h-[42px] focus:ring-0 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {!viewDetail && (
        <div className=" mt-6 md:mt-10">
          <h1 className="font-inter font-medium text-2xl leading-[100%] text-secondary">
            Rental Cars in Rawalpindi
          </h1>
        </div>
      )}
      <div className="flex w-full justify-center">
        <ProductsList viewDetail={viewDetail} setViewDetail={setViewDetail} />
      </div>
    </div>
  );
};

export default Products;

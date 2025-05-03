import React, { useState } from "react";
import Details from "../../Details.js/Details";

const ProductsList = ({ viewDetail, setViewDetail }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex w-full justify-center">
      <div className="flex  mt-6 gap-1 h-auto">
        <div className="hidden lg:flex h-[422px] w-[180px] bg-white">
          <div className="flex flex-col w-[148px] h-[390px] ml-4 mt-4">
            <h1 className="font-inter font-medium text-sm leading-[18px] text-transparent bg-clip-text bg-hero">
              Filters
            </h1>
            <div>
              <h2 className="font-inter font-semibold text-xs leading-4 mt-4 text-primaryblue">
                Shortcut
              </h2>
              <div className="flex flex-col gap-4 mt-3">
                <div className="flex gap-2 h-[18px] items-center">
                  <input
                    type="checkbox"
                    checked={checked}
                    className="w-3 h-3 border border-[#ADADAD] rounded-sm"
                  ></input>
                  <p className="font-inter font-normal text-sm leading-[18px] text-secondary">
                    Economy
                  </p>
                </div>
                <div className="flex gap-2 h-[18px] items-center">
                  <input
                    type="checkbox"
                    checked={checked}
                    className="w-3 h-3 border border-[#ADADAD] rounded-sm"
                  ></input>
                  <p className="font-inter font-normal text-sm leading-[18px] text-secondary">
                    Luxury
                  </p>
                </div>
                <div className="flex gap-2 h-[18px] items-center ">
                  <input
                    type="checkbox"
                    checked={checked}
                    className="w-3 h-3 border border-[#ADADAD] rounded-sm"
                  ></input>
                  <p className="font-inter font-normal text-sm leading-[18px] text-secondary">
                    Standard
                  </p>
                </div>
                <div className="flex gap-2 h-[18px] items-center ">
                  <input
                    type="checkbox"
                    checked={checked}
                    className="w-3 h-3 border border-[#ADADAD] rounded-sm"
                  ></input>
                  <p className="font-inter font-normal text-sm leading-[18px] text-secondary">
                    Commercial
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-inter font-semibold text-xs leading-4 mt-6 text-primaryblue">
                Transmission
              </h2>
              <div className="flex flex-col mt-3 gap-4">
                <div className="flex gap-2 h-[18px] items-center">
                  <input
                    type="checkbox"
                    checked={checked}
                    className="w-3 h-3 border border-[#ADADAD] rounded-sm"
                  ></input>
                  <p className="font-inter font-normal text-sm leading-[18px] text-secondary">
                    Auto
                  </p>
                </div>
                <div className="flex gap-2 h-[18px] items-center">
                  <input
                    type="checkbox"
                    checked={checked}
                    className="w-3 h-3 border border-[#ADADAD] rounded-sm"
                  ></input>
                  <p className="font-inter font-normal text-sm leading-[18px] text-secondary">
                    Manual
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-inter font-semibold text-xs leading-4 mt-6 text-primaryblue">
                Driver
              </h2>
              <div className="flex flex-col mt-3 gap-4">
                <div className="flex gap-2 h-[18px] items-center">
                  <input
                    type="checkbox"
                    checked={checked}
                    className="w-3 h-3 border border-[#ADADAD] rounded-sm"
                  ></input>
                  <p className="font-inter font-normal text-sm leading-[18px] text-secondary">
                    With Driver
                  </p>
                </div>
                <div className="flex gap-2 h-[18px] items-center">
                  <input
                    type="checkbox"
                    checked={checked}
                    className="w-3 h-3 border border-[#ADADAD] rounded-sm"
                  ></input>
                  <p className="font-inter font-normal text-sm leading-[18px] text-secondary">
                    Without Driver
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-start h-auto md:ml-0 w-full">
          <Details viewDetail={viewDetail} setViewDetail={setViewDetail} />
        </div>
      </div>
    </div>
  );
};

export default ProductsList;

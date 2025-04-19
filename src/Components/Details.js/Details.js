import React from "react";
import {
  AC,
  Bag,
  Grid,
  List,
  Location,
  Passengers,
  Service,
  Steric,
} from "../../Utils/Icons";
import { Button } from "primereact/button";

const Details = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center h-12 pl-3 pr-3 bg-white">
        <div>
          <p className="font-inter font-semibold text-base text-secondary leading-[22px]">
            144 Cars available around Rawalpindi, Saddar
            <span className="font-inter font-semibold text-sm leading-[18px] underline underline-offset-4 text-primary ml-[20px]">
              Change
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <p className="font-inter font-medium text-sm leading-[100%] text-[#00132699]">
            Sort By :
          </p>
          <span className="flex items-center pl-1 pr-1 gap-[14px] h-6 w-[54px] border border-#E6E6E6 rounded-sm">
            <Grid />
            <List />
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-[2px]">
        <div className="flex  h-[192px] bg-white mt-[2px] gap-4">
          <div className="w-[280px] h-40 rounded mt-4 ml-4">
            <img src="./Carimage.png" alt="" />
          </div>
          <div>
            <div className="flex justify-between items-center h-[50px] w-[668px] mt-[27px] ">
              <div className="flex gap-3">
                <h1 className="font-inter font-bold text-xl leading-6 text-secondary">
                  Suzuki Alto VXL 2019
                </h1>
                <span className="flex items-center w-[81px] h-[23px] gap-[10px] rounded-[1px] bg-[#00796B1A]">
                  <p className="font-inter font-medium text-xs leading-[100%] pt-[2px] ml-1 text-primary">
                    Featured
                  </p>
                  <span>
                    <Steric />
                  </span>
                </span>
              </div>
              <div className="flex flex-col w-[99px] h-[50px]">
                <h1 className="font-inter font-bold text-2xl leading-8 text-end text-secondary">
                  Rs 2500
                </h1>
                <label className="font-inter font-medium text-xs leading-4 text-end text-[#6383A6]">
                  Per day
                </label>
              </div>
            </div>
            <div className="flex mt-4 h-4 gap-6">
              <div className="flex gap-[2px] w-[34px]">
                <span>
                  <Passengers />
                </span>
                <p className="font-inter font-medium text-xs leading-4 text-primarygrey">
                  04
                </p>
              </div>
              <div className="flex gap-[2px] w-[46px]  border-l-2 pl-3 border-primarygrey">
                <span>
                  <Bag />
                </span>
                <p className="font-inter font-medium text-xs leading-4 text-primarygrey">
                  02
                </p>
              </div>
              <div className="flex gap-[2px] w-[46px]  border-l-2 pl-3 border-primarygrey">
                <span>
                  <Service />
                </span>
                <p className="font-inter font-medium text-xs leading-4 text-primarygrey">
                  Auto
                </p>
              </div>
              <div className="flex gap-[2px] w-[46px]  border-l-2 pl-3 border-primarygrey">
                <span>
                  <AC />
                </span>
                <p className="font-inter font-medium text-xs leading-4 text-primarygrey">
                  A/C
                </p>
              </div>
            </div>
            <div className="flex w-[668px] justify-between h-10 mt-4">
              <div className="flex items-center">
                <div className="flex gap-2">
                  <p className="font-inter font-semibold text-xs leading-5 text-primarygrey">
                    4.5
                  </p>
                  <p className="font-inter font-semibold text-xs leading-5 text-primarygrey">
                    Excellent <span> </span>
                    <span className="font-inter font-semibold text-xs leading-5 text-primary">
                      (12 reviews)
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-1 pl-3 border-l-2 ml-8 border-primarygrey">
                  <span>
                    <Location />
                  </span>
                  <p className="font-inter font-normal text-xs leading-4 text-primarygrey">
                    Saddar Rawalpindi
                  </p>
                </div>
              </div>
              <div>
                <Button
                  label="View Details"
                  className="text-primary font-inter font-medium text-sm border rounded border-primary w-[126px] h-10 focus:ring-0 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex  h-[192px] bg-white  gap-4">
          <div className="w-[280px] h-40 rounded mt-4 ml-4">
            <img src="./Carimage.png" alt="" />
          </div>
          <div>
            <div className="flex justify-between items-center h-[50px] w-[668px] mt-[27px] ">
              <div className="flex gap-3">
                <h1 className="font-inter font-bold text-xl leading-6 text-secondary">
                  Suzuki Alto VXL 2019
                </h1>
                <span className="flex items-center w-[81px] h-[23px] gap-[10px] rounded-[1px] bg-[#00796B1A]">
                  <p className="font-inter font-medium text-xs leading-[100%] pt-[2px] ml-1 text-primary">
                    Featured
                  </p>
                  <span>
                    <Steric />
                  </span>
                </span>
              </div>
              <div className="flex flex-col w-[99px] h-[50px]">
                <h1 className="font-inter font-bold text-2xl leading-8 text-end text-secondary">
                  Rs 2500
                </h1>
                <label className="font-inter font-medium text-xs leading-4 text-end text-[#6383A6]">
                  Per day
                </label>
              </div>
            </div>
            <div className="flex mt-4 h-4 gap-6">
              <div className="flex gap-[2px] w-[34px]">
                <span>
                  <Passengers />
                </span>
                <p className="font-inter font-medium text-xs leading-4 text-primarygrey">
                  04
                </p>
              </div>
              <div className="flex gap-[2px] w-[46px]  border-l-2 pl-3 border-primarygrey">
                <span>
                  <Bag />
                </span>
                <p className="font-inter font-medium text-xs leading-4 text-primarygrey">
                  02
                </p>
              </div>
              <div className="flex gap-[2px] w-[46px]  border-l-2 pl-3 border-primarygrey">
                <span>
                  <Service />
                </span>
                <p className="font-inter font-medium text-xs leading-4 text-primarygrey">
                  Auto
                </p>
              </div>
              <div className="flex gap-[2px] w-[46px]  border-l-2 pl-3 border-primarygrey">
                <span>
                  <AC />
                </span>
                <p className="font-inter font-medium text-xs leading-4 text-primarygrey">
                  A/C
                </p>
              </div>
            </div>
            <div className="flex w-[668px] justify-between h-10 mt-4">
              <div className="flex items-center">
                <div className="flex gap-2">
                  <p className="font-inter font-semibold text-xs leading-5 text-primarygrey">
                    4.5
                  </p>
                  <p className="font-inter font-semibold text-xs leading-5 text-primarygrey">
                    Excellent <span> </span>
                    <span className="font-inter font-semibold text-xs leading-5 text-primary">
                      (12 reviews)
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-1 pl-3 border-l-2 ml-8 border-primarygrey">
                  <span>
                    <Location />
                  </span>
                  <p className="font-inter font-normal text-xs leading-4 text-primarygrey">
                    Saddar Rawalpindi
                  </p>
                </div>
              </div>
              <div>
                <Button
                  label="View Details"
                  className="text-primary font-inter font-medium text-sm border rounded border-primary w-[126px] h-10 focus:ring-0 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex  h-[192px] bg-white  gap-4">
          <div className="w-[280px] h-40 rounded mt-4 ml-4">
            <img src="./Carimage.png" alt="" />
          </div>
          <div>
            <div className="flex justify-between items-center h-[50px] w-[668px] mt-[27px] ">
              <div className="flex gap-3">
                <h1 className="font-inter font-bold text-xl leading-6 text-secondary">
                  Suzuki Alto VXL 2019
                </h1>
                <span className="flex items-center w-[81px] h-[23px] gap-[10px] rounded-[1px] bg-[#00796B1A]">
                  <p className="font-inter font-medium text-xs leading-[100%] pt-[2px] ml-1 text-primary">
                    Featured
                  </p>
                  <span>
                    <Steric />
                  </span>
                </span>
              </div>
              <div className="flex flex-col w-[99px] h-[50px]">
                <h1 className="font-inter font-bold text-2xl leading-8 text-end text-secondary">
                  Rs 2500
                </h1>
                <label className="font-inter font-medium text-xs leading-4 text-end text-[#6383A6]">
                  Per day
                </label>
              </div>
            </div>
            <div className="flex mt-4 h-4 gap-6">
              <div className="flex gap-[2px] w-[34px]">
                <span>
                  <Passengers />
                </span>
                <p className="font-inter font-medium text-xs leading-4 text-primarygrey">
                  04
                </p>
              </div>
              <div className="flex gap-[2px] w-[46px]  border-l-2 pl-3 border-primarygrey">
                <span>
                  <Bag />
                </span>
                <p className="font-inter font-medium text-xs leading-4 text-primarygrey">
                  02
                </p>
              </div>
              <div className="flex gap-[2px] w-[46px]  border-l-2 pl-3 border-primarygrey">
                <span>
                  <Service />
                </span>
                <p className="font-inter font-medium text-xs leading-4 text-primarygrey">
                  Auto
                </p>
              </div>
              <div className="flex gap-[2px] w-[46px]  border-l-2 pl-3 border-primarygrey">
                <span>
                  <AC />
                </span>
                <p className="font-inter font-medium text-xs leading-4 text-primarygrey">
                  A/C
                </p>
              </div>
            </div>
            <div className="flex w-[668px] justify-between h-10 mt-4">
              <div className="flex items-center">
                <div className="flex gap-2">
                  <p className="font-inter font-semibold text-xs leading-5 text-primarygrey">
                    4.5
                  </p>
                  <p className="font-inter font-semibold text-xs leading-5 text-primarygrey">
                    Excellent <span> </span>
                    <span className="font-inter font-semibold text-xs leading-5 text-primary">
                      (12 reviews)
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-1 pl-3 border-l-2 ml-8 border-primarygrey">
                  <span>
                    <Location />
                  </span>
                  <p className="font-inter font-normal text-xs leading-4 text-primarygrey">
                    Saddar Rawalpindi
                  </p>
                </div>
              </div>
              <div>
                <Button
                  label="View Details"
                  className="text-primary font-inter font-medium text-sm border rounded border-primary w-[126px] h-10 focus:ring-0 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

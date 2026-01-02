import { useLocation, useParams } from "react-router-dom";
import { useGetAllBusinessCars } from "./hooks/AllBusinessCarsApi";
import { useState } from "react";
import { ReactComponent as Avatar } from "../../assets/SVG/avatar.svg";
import {
  AC,
  Bag,
  Location,
  Passengers,
  Service,
  Steric,
} from "../../Utils/Icons";
const AllBusinessCars = () => {
  const location = useLocation();
  const carDetail = location.state;
  console.log({ carDetail });
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState("");
  const viewAll = true;
  const { data, isPending } = useGetAllBusinessCars(
    page,
    limit,
    status,
    viewAll,
    id
  );
  return (
    <div className="flex justify-center w-full h-full px-4 py-4 md:py-0 md:px-0 mt-4">
      <div className="flex flex-col md:flex-row gap-4 md:w-[92%] w-full">
        <div className="w-full md:w-[22%]">
          <div className="flex flex-col items-center w-full px-6 py-11 md:py-14 bg-white rounded">
            <Avatar />
            <h1 className="!m-0 text-[#001326] text-sm font-semibold leading-[100%] pt-2">
              {carDetail?.business?.name}
            </h1>
            <span className="text-[#00132699] font-normal text-sm leading-[100%] pt-4">
              Member since <span> </span>
              {new Date(carDetail?.business?.createdAt).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  year: "numeric",
                }
              )}
            </span>
            <p className="text-[#666666] font-medium text-sm pt-4">
              {carDetail?.business?.location?.address} Bug here : Not showing
              location
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-[78%]">
          <div className="flex flex-col gap-2 h-[77px] border-b border-[#DFE8E5]">
            <h1 className="text-[#303F3C] font-bold text-2xl">
              Hammad Rental Car Services
            </h1>
            <p className="text-[#719088] font-normal text-[20px]">
              Account Managed by hammad Nazir
            </p>
          </div>
          <div className="flex w-full gap-4 mt-4 flex-wrap justify-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
              return (
                <div className="flex w-full  md:items-center flex-col md:flex-row h-auto md:h-[192px] mt-[2px] gap-4 py-4 px-4 bg-white rounded">
                  <div className="w-full h-[200px] md:w-[280px] md:h-40 rounded">
                    <img
                      className=" relative w-full md:h-40 h-[200px] object-contain rounded z-10"
                      src={`http://localhost:5000/${carDetail?.photos[0]}`}
                      alt="Car-Image"
                    />
                  </div>
                  <div className="h-auto w-full ">
                    <div className="flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center h-[50px] w-full md:mt-[27px] ">
                      <div className="flex w-full md:justify-start gap-3 justify-between">
                        <h1 className="font-inter font-semibold md:font-bold text-base md:text-xl leading-[22px] md:leading-6 text-secondary">
                          {carDetail?.make?.name}&nbsp;
                          {/* {carDetail?.model?.name}&nbsp; */}
                          {carDetail?.variant?.name}
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
                      <div className="flex shrink-0 mt-2 md:mt-0 md:flex-col w-full md:w-[99px] h-[50px]">
                        <h1 className="font-inter font-semibold md:font-bold text-lg md:text-2xl leading-6 md:leading-8 text-end text-secondary">
                          {`Rs ${carDetail?.rentPerDay}`}
                        </h1>
                        <label className="font-inter ml-[4px] md:ml-0 mt-[6px] md:mt-0 font-medium text-xs leading-4 text-end text-[#6383A6]">
                          Per day
                        </label>
                      </div>
                    </div>
                    <div className="flex mt-4 h-4 gap-3 md:gap-6">
                      <div className="flex gap-[2px] w-[34px]">
                        <span>
                          <Passengers />
                        </span>
                        <p className="font-inter font-medium text-xs leading-4 text-primarygrey">
                          {carDetail?.seats}
                        </p>
                      </div>
                      <div className="flex gap-[2px] min-w-[46px]  border-l-2 pl-3 border-primarygrey">
                        <span>
                          <Bag />
                        </span>
                        <p className="font-inter font-medium text-xs leading-4 text-primarygrey">
                          02
                        </p>
                      </div>
                      <div className="flex gap-[2px] min-w-[46px]  border-l-2 pl-3 border-primarygrey">
                        <span>
                          <Service />
                        </span>
                        <p className="font-inter font-medium text-xs leading-4 text-primarygrey">
                          {carDetail?.transmission === "automatic"
                            ? "Auto"
                            : "Manual"}
                        </p>
                      </div>
                      <div className="flex gap-[2px] min-w-[46px]  border-l-2 pl-3 border-primarygrey">
                        <span>
                          <AC />
                        </span>
                        <p className="font-inter font-medium text-xs leading-4 text-primarygrey">
                          {carDetail?.acheater ? "A/C" : "None"}
                        </p>
                      </div>
                    </div>
                    <div className="flex md:flex-row flex-col w-full justify-start md:justify-between h-10 mt-4">
                      <div className="flex md:flex-row flex-col-reverse items-start md:items-center">
                        <div className="flex gap-2  md:mt-0 mt-3">
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
                        <div className="flex md:items-center gap-1 pl-0 md:pl-3 md:border-l-2 md:ml-8 md:border-primarygrey">
                          <span>
                            <Location />
                          </span>
                          <p className="font-inter font-normal text-xs leading-4 text-primarygrey">
                            {carDetail?.business?.location?.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBusinessCars;

import { useLocation, useParams } from "react-router-dom";
import { useGetAllBusinessCars } from "./hooks/AllBusinessCarsApi";
import { useState } from "react";
import { ReactComponent as Avatar } from "../../assets/SVG/avatar.svg";
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
    <div className="flex justify-center w-full h-full">
      <div className="flex gap-4 w-[92%]">
        <div className="w-[22%]">
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
        <div className="w-[78%]">
          <div className="flex flex-col gap-2 h-[77px] border-b border-[#DFE8E5]">
            <h1 className="text-[#303F3C] font-bold text-2xl">
              Hammad Rental Car Services
            </h1>
            <p className="text-[#719088] font-normal text-[20px]">
              Account Managed by hammad Nazir
            </p>
          </div>
          <div className="flex w-full gap-4 mt-4 flex-wrap">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
              return (
                <div className="bg-white min-w-[343px] md:min-w-[320px] w-[32.2%] h-[296px] rounded-lg px-3 py-6">
                  <img
                    src={`http://localhost:5000/${carDetail?.photos[0]}`}
                    className="w-full h-[164px] object-contain"
                    alt="car image"
                  />
                  <div>
                    <div className="flex w-full mt-3 justify-between">
                      <h1 className="font-inter font-semibold text-xs leading-4 text-secondary">
                        {carDetail?.make?.name}&nbsp;
                        {carDetail?.variant?.name}
                      </h1>
                      <div className="flex gap-1">
                        <h1 className="font-inter font-semibold text-xs leading-4 text-secondary">
                          {`Rs ${carDetail?.rentPerDay}`}
                        </h1>
                        <label className="flex items-end h-full text-[#001326] text-[10px] font-normal leading-[14px]">
                          Per day
                        </label>
                      </div>
                    </div>
                    <div className="flex w-full flex-wrap mt-3 h-4 gap-3">
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
                    <div className="flex mt-3">
                      <span>
                        <Location />
                      </span>
                      <p className="font-inter font-normal text-xs leading-4 text-primarygrey">
                        {carDetail?.business?.location?.address}
                      </p>
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

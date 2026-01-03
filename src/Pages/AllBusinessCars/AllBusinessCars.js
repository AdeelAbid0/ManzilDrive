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
import CarCard from "../../Components/CarCard/CarCard";
const AllBusinessCars = () => {
  const location = useLocation();
  const carDetail = location.state;
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
              return <CarCard key={index} items={carDetail} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBusinessCars;

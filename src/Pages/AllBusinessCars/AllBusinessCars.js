import { useLocation, useParams } from "react-router-dom";
import { useGetAllBusinessCars } from "./hooks/AllBusinessCarsApi";
import { useState } from "react";
import { ReactComponent as Avatar } from "../../assets/SVG/avatar.svg";
import CarCard from "../../Components/CarCard/CarCard";

const AllBusinessCars = () => {
  const BASE_URL_IMG = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const carDetail = location.state;
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState("");
  const viewAll = true;

  const { data: AllCarsData, isPending } = useGetAllBusinessCars(
    page,
    limit,
    status,
    viewAll,
    id,
  );

  const businessData = AllCarsData?.cars?.[0]?.business || carDetail?.business;

  return (
    <div className="flex justify-center w-full h-full px-4 py-4 md:py-0 md:px-0 mt-4">
      <div className="flex flex-col md:flex-row gap-4 md:w-[92%] w-full">
        {/* Left Sidebar - Business Info */}
        <div className="w-full md:w-[22%]">
          <div className="flex flex-col items-center w-full px-6 py-11 md:py-14 bg-white rounded">
            {/* <Avatar /> */}
            <img src={businessData?.img} alt="profile image" />
            <h1 className="!m-0 text-[#001326] text-sm font-semibold leading-[100%] pt-2">
              {businessData?.name || businessData?.shopName}
            </h1>
            <span className="text-[#00132699] font-normal text-sm leading-[100%] pt-4">
              Member since{" "}
              {businessData?.createdAt &&
                new Date(businessData.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
            </span>
            <p className="text-[#666666] font-medium text-sm pt-4">
              {businessData?.location?.address || "Location not available"}
            </p>
          </div>
        </div>

        {/* Right Content - Cars List */}
        <div className="flex flex-col w-full md:w-[78%]">
          <div className="flex flex-col gap-2 h-[77px] border-b border-[#DFE8E5]">
            <h1 className="text-[#303F3C] font-bold text-2xl">
              {businessData?.shopName || businessData?.name}
            </h1>
            <p className="text-[#719088] font-normal text-[20px]">
              Account Managed by {businessData?.userName || "Admin"}
            </p>
          </div>

          {/* Cars Grid */}
          <div className="flex w-full gap-4 mt-4 flex-wrap justify-center">
            {isPending ? (
              <div>Loading cars...</div>
            ) : AllCarsData?.cars?.length > 0 ? (
              AllCarsData?.cars?.map((item) => {
                return <CarCard items={item} />;
              })
            ) : (
              <div className="py-8 text-center text-gray-500">
                No cars found for this business.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBusinessCars;

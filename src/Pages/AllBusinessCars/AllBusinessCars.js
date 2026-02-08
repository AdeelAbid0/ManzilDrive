import { useLocation, useParams } from "react-router-dom";
import { useGetAllBusinessCars } from "./hooks/AllBusinessCarsApi";
import { useState } from "react";
import { ReactComponent as Avatar } from "../../assets/SVG/avatar.svg";
import CarCard from "../../Components/CarCard/CarCard";
import Loader from "../../Components/Loader/Loader";
import Pagination from "../../Common/Pagination/Pagination";
const AllBusinessCars = () => {
  const location = useLocation();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [status, setStatus] = useState("");
  const viewAll = true;
  const { data, isPending } = useGetAllBusinessCars(
    page,
    limit,
    status,
    viewAll,
    id,
  );
  const carsDetail = data?.cars;
  const businessDetail = data?.cars[0]?.business;
  return (
    <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-70px)] px-4 py-4 md:py-0 md:px-0 ">
      {isPending ? (
        <div className="flex justify-center items-center w-full h-full">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-4 md:w-[92%] w-full h-[calc(100vh-70px)] pt-4">
          <div className="w-full md:w-[22%]">
            <div className="flex flex-col items-center w-full px-6 py-11 md:py-14 bg-white rounded">
              {businessDetail?.img ? (
                <img
                  src={businessDetail?.img}
                  alt="profile image"
                  className="w-20 h-20 rounded-full border object-cover"
                />
              ) : (
                <Avatar />
              )}
              <h1 className="!m-0 text-[#001326] text-sm font-semibold leading-[100%] pt-2">
                {businessDetail?.name}
              </h1>
              <span className="text-[#00132699] font-normal text-sm leading-[100%] pt-4">
                Member since <span> </span>
                {new Date(businessDetail?.createdAt).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    year: "numeric",
                  },
                )}
              </span>
              <p className="text-[#666666] font-medium text-sm pt-4">
                {businessDetail?.location?.address} Bug here : Not showing
                location
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-[78%]">
            <div className="flex flex-col gap-2 h-[77px] border-b border-[#DFE8E5]">
              <h1 className="text-[#303F3C] font-bold text-2xl">
                {businessDetail?.shopName}
              </h1>
              <p className="text-[#719088] font-normal text-[20px]">
                Account Managed by {businessDetail?.name}
              </p>
            </div>
            <div className="flex w-full gap-4 mt-4 flex-wrap justify-center">
              {carsDetail?.map((item, index) => {
                return <CarCard key={index} items={item} />;
              })}
            </div>
          </div>
        </div>
      )}
      {data?.totalPages >= 1 && (
        <div className="mt-6 flex w-full px-14">
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default AllBusinessCars;

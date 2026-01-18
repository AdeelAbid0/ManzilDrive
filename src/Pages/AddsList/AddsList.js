import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "./Addlist.css";
import {
  ActiveAdds,
  AddImpression,
  DailyBooking,
  ExpireAdds,
} from "../../Utils/Icons";
import { useGetAddsCount, useGetAllCars } from "./hooks/DashboardApi";
import { ReactComponent as SearchIcon } from "../../assets/SVG/search.svg";
import { ReactComponent as FilterIcon } from "../../assets/SVG/filter.svg";
import { ReactComponent as Action } from "../../assets/SVG/action.svg";
import { useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import Pagination from "../../Common/Pagination/Pagination";
import CommonInput from "../../Common/InputText/InputText";

const AddList = () => {
  const user = useSelector((state) => state.user.user);
  const [AddStatus, setAddStatus] = useState({
    viewAll: true,
    active: false,
    inactive: false,
    pending: false,
    expired: false,
  });
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [status, setStatus] = useState("all");
  const [viewAll, setViewAll] = useState(true);
  const [filteredCarsData, setFilteredCarsData] = useState(null);
  const [showQrDialog, setShowQrDialog] = useState(false);
  const BASE_URL_IMG = process.env.REACT_APP_IMG_URL;

  const { data: AddsCount, isPending: LoadingAddsData } = useGetAddsCount(
    user?.business?._id,
  );
  const {
    data: AllCarsData,
    isLoading: CarsDataLoading,
    error: CarsDataError,
  } = useGetAllCars(page, limit, status, viewAll, user?.business?._id);

  const statusMap = {
    viewAll: "all",
    active: "active",
    inactive: "inactive",
    pending: "pending",
    expired: "expired",
  };

  useEffect(() => {
    if (!AllCarsData?.cars) return;

    const activeKey = Object.keys(AddStatus).find((key) => AddStatus[key]);
    const currentStatus = statusMap[activeKey];

    if (!activeKey || activeKey === "viewAll" || !currentStatus) {
      setFilteredCarsData(AllCarsData.cars);
      return;
    }

    const filteredData = AllCarsData.cars.filter(
      (item) => item?.status === currentStatus,
    );
    setFilteredCarsData(filteredData);
  }, [AddStatus, AllCarsData]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setPage(1);
  }, [status, viewAll]);
  const dummyCarsData = [
    {
      id: 1,
      user: {
        title: "Adeel Abid",
        userName: "alma.lawson@example.com",
        phoneNumber: "31234567890",
      },
      status: "Pending",
    },
  ];

  return (
    <div className="flex w-full items-center h-full flex-col">
      <div className="hidden md:flex flex-col h-[66px] w-[1094px] mt-8 gap-4">
        <div className="flex w-full justify-between h-[17px]">
          <h1 className="flex w-full font-archive font-semibold text-base text-[#4D4D4D]">
            Recently Requested
          </h1>
          <div className="flex w-full gap-2">
            <CommonInput
              type={"text"}
              name={"search"}
              placeholder={"Search here"}
              prefixIcon={SearchIcon}
              className="!h-10"
            />
            <div className="w-10 h-10 flex shrink-0 justify-center items-center rounded border border-[#DFE8E5] cursor-pointer">
              <FilterIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 addlist hidden md:block">
        {CarsDataLoading ? (
          <div className="flex w-full justify-center mt-5">
            <Loader />
          </div>
        ) : CarsDataError ? (
          <p>Error loading data</p>
        ) : (
          <div className="w-full">
            <DataTable
              value={dummyCarsData}
              rows={limit}
              paginator={false}
              className="w-full"
            >
              <Column
                header="Add Title"
                body={(rowData) => (
                  <p className="text-sm text-[#666666] font-normal">
                    {rowData?.user?.title || "N/A"}
                  </p>
                )}
                headerClassName="bg-blue-600 text-start py-2"
              />
              <Column
                header="User Name"
                body={(rowData) => (
                  <p className="text-sm text-[#666666] font-normal">
                    {rowData?.user?.userName || "N/A"}
                  </p>
                )}
                headerClassName="bg-blue-600 text-white text-start py-2"
              />
              <Column
                header="Phone"
                body={(rowData) => (
                  <p className="text-sm text-[#666666] font-normal">
                    {rowData?.user?.phoneNumber
                      ? `${rowData.user.phoneNumber}`
                      : "N/A"}
                  </p>
                )}
                headerClassName="bg-blue-600 text-white text-start py-2"
              />
              <Column
                header="Status"
                body={(rowData) => (
                  <p className="text-sm text-[#666666] font-normal">
                    {rowData?.status || "N/A"}
                  </p>
                )}
                headerClassName="bg-blue-600 text-white text-start py-2"
              />

              <Column
                header="Action"
                body={(rowData) => (
                  <div className="flex pl-3 items-center justify-center gap-2">
                    <Action />
                  </div>
                )}
                headerClassName="bg-blue-600 text-white text-start py-2"
              />
            </DataTable>
          </div>
        )}
      </div>
      {filteredCarsData?.length > 0 && AllCarsData?.totalPages > 1 && (
        <div className="mt-6 flex w-full px-14">
          <Pagination
            currentPage={page}
            totalPages={AllCarsData.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default AddList;

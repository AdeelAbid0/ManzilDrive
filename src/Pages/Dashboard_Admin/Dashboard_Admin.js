import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "./Dashboard-admin.css";
import { Users, Eye, Clock, XCircle } from "lucide-react";
import {
  useApproveBusiness,
  useGetAddsCount,
  useGetAllBusinesses,
  useRejectBusiness,
} from "./hooks/DashboardApi";
import { ReactComponent as SearchIcon } from "../../assets/SVG/search.svg";
import { ReactComponent as FilterIcon } from "../../assets/SVG/filter.svg";
import { ReactComponent as Action } from "../../assets/SVG/action.svg";
import { useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import Pagination from "../../Common/Pagination/Pagination";
import CommonInput from "../../Common/InputText/InputText";
import { OverlayPanel } from "primereact/overlaypanel";

const Dashboard_Admin = () => {
  const user = useSelector((state) => state.user.user);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filteredCarsData, setFilteredCarsData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const op = useRef(null);

  const { data: AddsCount, isPending: LoadingAddsData } = useGetAddsCount();

  const {
    data: AllBusinsses,
    isLoading: DashboardDataLoading,
    error: DashboardDataError,
  } = useGetAllBusinesses(page, limit);

  const { mutate: ApproveBusiness, isLoading: ApproveBusinessLoading } =
    useApproveBusiness();

  const { mutate: RejectBusiness, isLoading: RejectBusinessLoading } =
    useRejectBusiness();

  // Stats data with dynamic values from AddsCount
  const stats = [
    {
      icon: Users,
      label: "TOTAL USERS",
      value: AddsCount?.data?.totalUsers || 0,
      change: "+10%",
    },
    {
      icon: Eye,
      label: "ACTIVE ADDS",
      value: AddsCount?.data?.live || 0,
      change: "+10%",
    },
    {
      icon: Clock,
      label: "EXPIRED ADDS",
      value: AddsCount?.data?.expired || 0,
      change: "+10%",
    },
    {
      icon: XCircle,
      label: "INACTIVE ADDS",
      value: AddsCount?.data?.inactive || 0,
      change: "+10%",
    },
  ];

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleApprove = () => {
    ApproveBusiness(
      { businessId: selectedRow?._id },
      {
        onSuccess: (res) => {
          console.log({ res });
        },
      },
    );
    op.current.hide();
  };

  const handleReject = () => {
    RejectBusiness(
      { businessId: selectedRow?._id },
      {
        onSuccess: (res) => {
          console.log({ res });
        },
      },
    );
    op.current.hide();
  };

  // Agar data load ho raha hai to loading state dikhao
  if (LoadingAddsData) {
    return (
      <div className="flex w-full items-center h-full flex-col my-4">
        <Loader />
      </div>
    );
  }

  const bodyTemplate = (rowData) => {
    return (
      <div className="relative">
        <div
          className="flex align-items-center cursor-pointer"
          onClick={(e) => {
            setSelectedRow(rowData);
            op.current.toggle(e);
          }}
        >
          <Action />
        </div>
      </div>
    );
  };

  return (
    <div className="flex w-full items-center h-full flex-col my-4">
      <div className="flex w-full justify-center md:justify-star md:flex-nowrap flex-wrap gap-2 md:gap-6  px-4 md:px-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col w-[24%] min-w-[170px] h-[116px] border border-[#E3E8EA] bg-white rounded-lg gap-4 pt-4 md:pl-6 pl-4"
          >
            <div className="flex items-center gap-2 w-full">
              <stat.icon className="text-[#808080]" />
              <p className="font-inter font-medium text-[10px] text-[#808080] leading-[14px]">
                {stat.label}
              </p>
            </div>
            <div className="flex flex-col w-full h-12">
              <h1 className="font-archivo font-bold text-[32px] h-[35px] leading-[100%] text-[#44505A]">
                {stat.value}
              </h1>
            </div>
          </div>
        ))}
      </div>

      <OverlayPanel ref={op}>
        <div className="flex flex-col min-w-[120px]">
          <div
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
            onClick={() => {
              handleApprove();
              op.current.hide();
            }}
          >
            <p className="text-sm font-medium">Approve</p>
          </div>
          <div
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
            onClick={handleReject}
          >
            <p className="text-sm font-medium">Reject</p>
          </div>
        </div>
      </OverlayPanel>

      {/* Show datatable on desktop */}
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
          </div>
        </div>
      </div>

      {/* Baaki ka code same hai */}
      <div className="mt-6 dashboardadmin hidden md:block">
        {DashboardDataLoading ? (
          <div className="flex w-full justify-center mt-5">
            <Loader />
          </div>
        ) : DashboardDataError ? (
          <p>Error loading data</p>
        ) : (
          <div className="w-full">
            <DataTable
              value={AllBusinsses?.businesses}
              rows={limit}
              paginator={false}
              className="w-full"
            >
              <Column
                header="Name"
                body={(rowData) => (
                  <p className="text-sm text-[#666666] font-normal">
                    {rowData?.name || "N/A"}
                  </p>
                )}
                headerClassName="bg-blue-600 text-start py-2"
              />
              <Column
                header="Email"
                body={(rowData) => (
                  <p className="text-sm text-[#666666] font-normal">
                    {rowData?.email || "N/A"}
                  </p>
                )}
                headerClassName="bg-blue-600 text-white text-start py-2"
              />
              <Column
                header="Phone"
                body={(rowData) => (
                  <p className="text-sm text-[#666666] font-normal">
                    {rowData?.phoneNumber ? `${rowData?.phoneNumber}` : "N/A"}
                  </p>
                )}
                headerClassName="bg-blue-600 text-white text-start py-2"
              />
              <Column
                header="Location"
                body={(rowData) => (
                  <p className="text-sm text-[#666666] font-normal">
                    {rowData?.location?.city || "N/A"}
                  </p>
                )}
                headerClassName="bg-blue-600 text-white text-start py-2"
              />
              <Column
                header="Adds"
                body={(rowData) => (
                  <p className="text-sm text-[#666666] font-normal pl-2">
                    {10 || "N/A"}
                  </p>
                )}
                headerClassName="bg-blue-600 text-white text-start py-2"
              />
              <Column
                header="Action"
                body={bodyTemplate}
                headerClassName="bg-blue-600 text-white text-start py-2"
              />
            </DataTable>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard_Admin;

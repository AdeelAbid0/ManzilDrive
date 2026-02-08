import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import {
  ActiveAdds,
  AddImpression,
  DailyBooking,
  ExpireAdds,
} from "../../Utils/Icons";
import { useGetAddsCount, useGetAllCars } from "./hooks/DashboardApi";
import { ReactComponent as ArrowDownIcon } from "../../assets/SVG/arrow-down.svg";
import { useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import Pagination from "../../Common/Pagination/Pagination";
import QRDialog from "./Components/QRDialog";
import CarCard from "../../Components/CarCard/CarCard";

const Dashboard = () => {
  const navigate = useNavigate();
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
  const [showTabDropdown, setShowTabDropdown] = useState(false);
  const [selectedTab, setSelectedTab] = useState("View All");

  const handleTabSelect = (tab) => {
    const newStatus = {
      viewAll: false,
      active: false,
      inactive: false,
      pending: false,
      expired: false,
      [tab.key]: true,
    };
    setAddStatus(newStatus);
    setStatus(tab.statusValue);
    setViewAll(tab.viewAllFlag);
    setSelectedTab(tab.label);
    setShowTabDropdown(false);
  };

  //  Fetch data from API
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

  const stats = [
    {
      icon: DailyBooking,
      label: "TOTAL NUMBER OF ADS",
      value:
        (AddsCount?.data?.inactive || 0) +
        (AddsCount?.data?.live || 0) +
        (AddsCount?.data?.pending || 0),
    },
    {
      icon: ActiveAdds,
      label: "ACTIVE ADDS",
      value: AddsCount?.data?.live || 0,
    },
    {
      icon: AddImpression,
      label: "INACTIVE ADDS",
      value: AddsCount?.data?.inactive || 0,
    },
    {
      icon: ExpireAdds,
      label: "PENDING ADDS",
      value: AddsCount?.data?.pending || 0,
    },
  ];

  const addTabs = [
    {
      label: "View All",
      key: "viewAll",
      statusValue: "all",
      viewAllFlag: true,
    },
    {
      label: "Active Adds",
      key: "active",
      statusValue: "active",
      viewAllFlag: false,
    },
    {
      label: "Inactive Adds",
      key: "inactive",
      statusValue: "inactive",
      viewAllFlag: false,
    },
    {
      label: "Pending Adds",
      key: "pending",
      statusValue: "pending",
      viewAllFlag: false,
    },
    {
      label: "Expired",
      key: "expired",
      statusValue: "expired",
      viewAllFlag: false,
    },
  ];

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setPage(1);
  }, [status, viewAll]);
  const handleEdit = () => {
    console.log("handle edit called");
  };
  const handleRemoveAdd = () => {
    console.log("handle removeadd called");
  };
  return (
    <div className=" flex w-full items-center flex-col my-4 px-3">
      <div className="flex w-full justify-center md:justify-start px-1 md:flex-nowrap flex-wrap gap-2 md:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col w-[24%] min-w-[170px] h-[116px] border border-[#E3E8EA] bg-white rounded-lg gap-4 pt-4 md:pl-6 pl-4"
          >
            <div className="flex items-center gap-2 w-full">
              <stat.icon />
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
        <div className="md:hidden flex flex-col w-full px-4 mt-6">
          <div className="flex w-full justify-between items-center h-[17px] mb-2">
            <h1 className="w-full font-archive font-semibold text-base text-[#4D4D4D]">
              My Adds
            </h1>
            <div
              className="relative flex justify-center items-centerw w-full min-w-[105px] h-9 text-primary border border-primary rounded cursor-pointer"
              onClick={() => setShowTabDropdown(!showTabDropdown)}
            >
              <p className="flex items-center justify-between w-full px-3 text-primary">
                {selectedTab} <ArrowDownIcon className="text-primary" />
              </p>
              {showTabDropdown && (
                <div className="absolute top-full right-0 mt-1 w-full bg-white border border-[#E3E8EA] rounded shadow-lg z-50">
                  {addTabs.map((tab) => (
                    <div
                      key={tab.key}
                      className={`px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
                        selectedTab === tab.label
                          ? "bg-gray-100 text-primary"
                          : "text-gray-700"
                      }`}
                      onClick={() => handleTabSelect(tab)}
                    >
                      {tab.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="w-full h-px bg-[#E3E8EA] my-3"></div>
        </div>
        <div className="md:hidden flex gap-2 w-full px-4 mt-4">
          <Button
            label="Post ADD"
            onClick={() => navigate("/postadd")}
            className="text-white font-medium text-sm border rounded border-primary w-full h-[33px] bg-primary focus:ring-0 focus:outline-none"
          />
          <Button
            type="default"
            label="Share Profile"
            onClick={() => {
              setShowQrDialog(true);
            }}
            className="text-primary font-medium text-sm border rounded border-primary w-full h-[33px] focus:ring-0 focus:outline-none"
          />
        </div>
        <div className="md:hidden w-full block px-4">
          {filteredCarsData?.map((items) => {
            return (
              <CarCard
                items={items}
                handleEdit={handleEdit}
                handleRemoveAdd={handleRemoveAdd}
                isDashboard={true}
              />
            );
          })}
        </div>
      </div>

      {/* Show datatable on desktop */}
      <div className="hidden md:flex flex-col h-[66px] w-[1094px] mt-8 gap-4">
        <div className="h-[17px]">
          <h1 className="font-archive font-semibold text-base text-[#4D4D4D]">
            My Adds
          </h1>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-4">
            {addTabs.map((btn) => (
              <Button
                key={btn.key}
                label={btn.label}
                onClick={() => {
                  const newStatus = {
                    viewAll: false,
                    active: false,
                    inactive: false,
                    pending: false,
                    expired: false,
                    [btn.key]: true,
                  };
                  setAddStatus(newStatus);
                  setStatus(btn.statusValue);
                  setViewAll(btn.viewAllFlag);
                }}
                className={`font-medium text-xs border rounded-2xl w-[100px] h-[32px] focus:ring-0 focus:outline-none ${
                  AddStatus[btn.key]
                    ? "bg-[#00796B] text-white border-[#00796B]"
                    : "bg-white text-primary border-primary"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              label="Post ADD"
              onClick={() => navigate("/postadd")}
              className="text-white font-medium text-sm border rounded border-primary w-[106px] h-[33px] bg-primary focus:ring-0 focus:outline-none"
            />
            <Button
              type="default"
              label="Share Profile"
              onClick={() => {
                setShowQrDialog(true);
              }}
              className="text-primary font-medium text-sm border rounded border-primary w-[106px] h-[33px] focus:ring-0 focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div className="mt-6 dashboard hidden md:block">
        {CarsDataLoading ? (
          <div className="flex w-full justify-center mt-5">
            <Loader />
          </div>
        ) : CarsDataError ? (
          <p>Error loading data</p>
        ) : (
          <div className="w-full">
            <DataTable
              value={filteredCarsData ?? AllCarsData?.cars ?? []}
              rows={limit}
              paginator={false}
              className="w-full"
            >
              <Column
                header="Car"
                body={(rowData) => {
                  return (
                    <div className="flex items-center gap-4">
                      <img
                        src={rowData?.photos[0]}
                        alt="img"
                        className="w-10 h-10 rounded-[2px] object-cover transition-all duration-300"
                      />
                      <p className="text-sm text-[#666666] font-normal">
                        {rowData?.make?.name} {rowData?.variant?.name}
                      </p>
                    </div>
                  );
                }}
                headerClassName="bg-blue-600 text-white text-center py-2"
              />
              <Column
                field="rentPerDay"
                header="Rent"
                headerClassName="bg-blue-600 text-white text-center py-2"
              />
              <Column
                header="Status"
                body={(rowData) => {
                  return (
                    <div
                      className={`flex w-[104px] h-5 rounded-[4px] items-center justify-center ${
                        rowData?.status === "pending"
                          ? "bg-[#8D58031A]"
                          : rowData?.status === "live"
                            ? "bg-[#00796B1A]"
                            : rowData?.status === "inactive"
                              ? "bg-[#F55A5A1A]"
                              : ""
                      }
                      ${
                        rowData?.status === "pending"
                          ? "text-[#8D5803]"
                          : rowData?.status === "live"
                            ? "text-[#00796B]"
                            : rowData?.status === "inactive"
                              ? "text-[#F55A5A]"
                              : ""
                      }`}
                    >
                      <p className="!m-0 text-sm tracking-[0.5px] font-normal">
                        {rowData?.status}
                      </p>
                    </div>
                  );
                }}
                headerClassName="bg-blue-600 text-white text-center "
              />
              <Column
                header="Actions"
                body={(rowData) => {
                  return (
                    <div
                      className={`flex items-center justify-center rounded-[4px] py-[6px] ${
                        rowData?.status === "inactive"
                          ? "bg-[#00796B]"
                          : "bg-[#001F3F]"
                      }`}
                    >
                      <p className="text-white text-sm font-normal">
                        {rowData?.status === "inactive"
                          ? "Available"
                          : "Unavailable"}
                      </p>
                    </div>
                  );
                }}
                headerClassName="bg-blue-600 text-white text-center py-2"
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
      {showQrDialog && (
        <QRDialog
          showQrDialog={showQrDialog}
          setShowQrDialog={setShowQrDialog}
          user={user}
        />
      )}
    </div>
  );
};

export default Dashboard;

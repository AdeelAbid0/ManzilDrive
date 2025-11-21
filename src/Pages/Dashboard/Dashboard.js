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
import { useGetAllCars } from "./hooks/DashboardApi";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [AddStatus, setAddStatus] = useState({
    viewAll: true,
    active: false,
    inactive: false,
    pending: false,
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState("all");
  const [viewAll, setViewAll] = useState(true);
  const [filteredCarsData, setFilteredCarsData] = useState(null);
  const BASE_URL_IMG = process.env.REACT_APP_IMG_URL;

  // ✅ Fetch data from API
  const {
    data: AllCarsData,
    isLoading: CarsDataLoading,
    error: CarsDataError,
    refetch,
  } = useGetAllCars(page, limit, status, viewAll, user?.business?._id);

  useEffect(() => {
    if (user?.business?._id) {
      refetch();
    }
  }, [user?.business?._id, refetch]);

  const statusMap = {
    viewAll: null, // null => show all
    active: "active", // backend active status string
    inactive: "inactive",
    pending: "pending",
    expired: "expired",
  };

  useEffect(() => {
    const cars = AllCarsData?.cars || [];

    const activeKey = Object.keys(AddStatus).find((key) => AddStatus[key]);

    if (!activeKey || activeKey === "viewAll" || !statusMap[activeKey]) {
      setFilteredCarsData(cars);
      return;
    }

    const wantedStatus = statusMap[activeKey];
    const data = cars.filter((item) => item?.status === wantedStatus);
    setFilteredCarsData(data);
  }, [AddStatus, AllCarsData]);

  // ✅ Sample stats (replace with dynamic data if API provides)
  const stats = [
    { icon: DailyBooking, label: "DAILY BOOKING", value: 10, change: "+10%" },
    { icon: ActiveAdds, label: "ACTIVE ADDS", value: 10, change: "+10%" },
    {
      icon: AddImpression,
      label: "ADD IMPRESSIONS",
      value: 10,
      change: "+10%",
    },
    { icon: ExpireAdds, label: "EXPIRE ADDS", value: 10, change: "+10%" },
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

  return (
    <div className="flex flex-col m-6">
      {/* ✅ Stats cards */}
      <div className="flex gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col w-[255.5px] h-[116px] border border-[#E3E8EA] rounded-lg gap-4 pt-4 pl-6"
          >
            <div className="flex items-center gap-2 w-[207.5px]">
              <stat.icon />
              <p className="font-inter font-medium text-[10px] text-[#808080] leading-[14px]">
                {stat.label}
              </p>
            </div>
            <div className="flex flex-col w-[207.5px] h-12">
              <h1 className="font-archivo font-bold text-[32px] h-[35px] leading-[100%] text-[#44505A]">
                {stat.value}
              </h1>
              <p className="font-inter font-medium text-[11px] text-[#778C99] leading-[100%] h-[79px] flex items-center">
                <span className="text-[#32B550] mr-[2px]">{stat.change}</span>
                Last week
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Buttons */}
      <div className="flex flex-col h-[66px] w-[1094px] mt-8 gap-4">
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
                  setAddStatus({
                    viewAll: false,
                    active: false,
                    inactive: false,
                    pending: false,
                    [btn.key]: true,
                  });
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
          <Button
            label="Post ADD"
            onClick={() => navigate("/postadd")}
            className="text-white font-medium text-sm border rounded border-primary w-[106px] h-[33px] bg-primary focus:ring-0 focus:outline-none"
          />
        </div>
      </div>

      {/* ✅ Data Table */}
      <div className="mt-6 dashboard">
        {CarsDataLoading ? (
          <p>Loading...</p>
        ) : CarsDataError ? (
          <p>Error loading data</p>
        ) : (
          <DataTable
            value={filteredCarsData ?? AllCarsData?.cars ?? []}
            className="flex flex-col gap-[98px]"
          >
            <Column
              header="Car"
              body={(rowData) => {
                return (
                  <div className="flex items-center gap-4">
                    <img
                      src={`${BASE_URL_IMG}/${rowData?.photos[0]}`}
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
        )}
      </div>
    </div>
  );
};

export default Dashboard;

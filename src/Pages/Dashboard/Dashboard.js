import { useState, useEffect, useRef, useCallback } from "react";
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
import {
  useBoostAd,
  useDeleteAd,
  useGetAddsCount,
  useGetAllCars,
} from "./hooks/DashboardApi";
import { ReactComponent as ArrowDownIcon } from "../../assets/SVG/arrow-down.svg";
import { ReactComponent as EditIcon } from "../../assets/SVG/edit.svg";
import { ReactComponent as DeleteIcon } from "../../assets/SVG/delete.svg";
import { ReactComponent as CarIcon } from "../../assets/SVG/car.svg";
import { ReactComponent as BoostIcon } from "../../assets/SVG/boost.svg";
import { useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import Pagination from "../../Common/Pagination/Pagination";
import QRDialog from "./Components/QRDialog";
import CarCard from "../../Components/CarCard/CarCard";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputSwitch } from "primereact/inputswitch";
import CommonDialog from "../../Common/Dialog/CommonDialog";
import { Dropdown } from "primereact/dropdown";
import PrimaryButton from "../../Common/Button/Button";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { showNotification } from "../../slices/notificationSlice";
import { useQueryClient } from "@tanstack/react-query";

const Dashboard = () => {
  const op = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.user.user);

  // State management
  const [showBoostDialog, setShowBoostDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [addStatus, setAddStatus] = useState("viewAll");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [showQrDialog, setShowQrDialog] = useState(false);
  const [showTabDropdown, setShowTabDropdown] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedTab, setSelectedTab] = useState("View All");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  // Status mapping
  const statusMap = {
    viewAll: "all",
    active: "active",
    inactive: "inactive",
    pending: "pending",
    expired: "expired",
  };

  // Get status and viewAll based on addStatus
  const status = statusMap[addStatus];
  const viewAll = addStatus === "viewAll";

  // Days options for boost dialog
  const daysOptions = [
    { label: "5 days", value: "5" },
    { label: "10 days", value: "10" },
    { label: "15 days", value: "15" },
    { label: "20 days", value: "20" },
    { label: "30 days", value: "30" },
  ];

  // Formik for boost dialog
  const formik = useFormik({
    initialValues: {
      days: "",
    },
    onSubmit: (values) => {
      if (selectedRow && values.days) {
        handleBoostSubmit(values.days);
      }
    },
  });

  // API calls
  const {
    data: addsCount,
    isPending: loadingAddsData,
    refetch: refetchAddsCount,
  } = useGetAddsCount(user?.business?._id);

  const {
    data: allCarsData,
    isLoading: carsDataLoading,
    error: carsDataError,
    refetch: refetchAllCars,
  } = useGetAllCars(page, limit, status, viewAll, user?.business?._id);

  const { mutate: boostAd, isPending: boostAdLoading } = useBoostAd();
  const { mutate: deleteAd } = useDeleteAd();

  // Stats data
  const stats = [
    {
      icon: DailyBooking,
      label: "TOTAL NUMBER OF ADS",
      value:
        (addsCount?.data?.inactive || 0) +
        (addsCount?.data?.live || 0) +
        (addsCount?.data?.pending || 0),
    },
    {
      icon: ActiveAdds,
      label: "ACTIVE ADDS",
      value: addsCount?.data?.live || 0,
    },
    {
      icon: AddImpression,
      label: "INACTIVE ADDS",
      value: addsCount?.data?.inactive || 0,
    },
    {
      icon: ExpireAdds,
      label: "PENDING ADDS",
      value: addsCount?.data?.pending || 0,
    },
  ];

  // Tab configuration
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

  // Handlers
  const handleTabSelect = useCallback((tab) => {
    setAddStatus(tab.key);
    setSelectedTab(tab.label);
    setShowTabDropdown(false);
    setPage(1); // Reset to first page on tab change
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleEdit = useCallback((rowData) => {
    navigate(`/editAdd/${rowData?._id}`);
  }, []);

  const handleRemoveAddClick = useCallback((rowData) => {
    setCarToDelete(rowData);
    setShowDeleteDialog(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (!carToDelete) return;

    setDeleteLoading(true);
    deleteAd(
      { carId: carToDelete._id },
      {
        onSuccess: (res) => {
          dispatch(
            showNotification({
              message: res?.message || "Ad deleted successfully",
              status: "success",
            }),
          );
          queryClient.invalidateQueries({
            queryKey: ["GetAllCars"],
          });

          refetchAddsCount();

          // Close dialog and reset states
          setShowDeleteDialog(false);
          setCarToDelete(null);
          setDeleteLoading(false);
        },
        onError: (error) => {
          dispatch(
            showNotification({
              message: error?.response?.data?.message || "Failed to delete ad",
              status: "error",
            }),
          );
          setShowDeleteDialog(false);
          setCarToDelete(null);
          setDeleteLoading(false);
        },
      },
    );
  }, [carToDelete, deleteAd, dispatch, refetchAllCars, refetchAddsCount]);

  const handleToggleAvailability = useCallback((carId, newStatus) => {
    console.log(`Toggling availability for car ${carId} to ${newStatus}`);
    // Implement toggle functionality here
    // You might want to call an API here to update the status
  }, []);

  const handleBoostAdd = useCallback(
    (rowData) => {
      setSelectedRow(rowData);
      setShowBoostDialog(true);
      formik.resetForm();
    },
    [formik],
  );

  const handleBoostSubmit = useCallback(
    (days) => {
      if (!selectedRow || !days) return;
      boostAd(
        {
          carId: selectedRow._id,
          days: days,
        },
        {
          onSuccess: (res) => {
            dispatch(
              showNotification({
                message: res?.message,
                status: "success",
              }),
            );
            setShowBoostDialog(false);
            formik.resetForm();
            // Refresh the data
            refetchAllCars();
            refetchAddsCount();
          },
          onError: (error) => {
            dispatch(
              showNotification({
                message: error?.message || "Failed to boost ad",
                status: "error",
              }),
            );
          },
        },
      );
    },
    [selectedRow, boostAd, formik, dispatch, refetchAllCars, refetchAddsCount],
  );

  // Overlay panel menu items
  const overlayMenuItems = [
    {
      icon: <EditIcon className="text-[#5D717D] w-4 h-4 flex shrink-0" />,
      label: "Edit Ad",
      onClick: (rowData) => {
        handleEdit(rowData);
        op.current.hide();
      },
    },
    {
      icon: <CarIcon className="text-[#5D717D] w-4 h-4 flex shrink-0" />,
      label: "Available",
      hasToggle: true,
      getValue: (rowData) => rowData?.status === "inactive",
      onToggle: (rowData, value) => {
        const newStatus = value ? "inactive" : "active";
        handleToggleAvailability(rowData._id, newStatus);
      },
    },
    {
      icon: <DeleteIcon className="text-[#5D717D] w-4 h-4 flex shrink-0" />,
      label: "Remove Ad",
      onClick: (rowData) => {
        handleRemoveAddClick(rowData);
        op.current.hide();
      },
    },
    {
      icon: <BoostIcon className="text-[#5D717D] w-4 h-4 flex shrink-0" />,
      label: "Boost Ad",
      onClick: (rowData) => {
        handleBoostAdd(rowData);
        op.current.hide();
      },
    },
  ];

  // Table body template
  const actionsBodyTemplate = (rowData) => {
    return (
      <div
        className="flex border border-primary rounded px-4 py-2 cursor-pointer hover:bg-blue-50 transition-colors duration-200"
        onClick={(e) => {
          setSelectedRow(rowData);
          op.current.toggle(e);
        }}
      >
        <span className="flex gap-2 items-center text-primary text-[16px] leading-6 font-medium">
          Edit <EditIcon />
        </span>
      </div>
    );
  };

  // Status badge styling
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case "pending":
        return { background: "#8D58031A", color: "#8D5803" };
      case "live":
        return { background: "#00796B1A", color: "#00796B" };
      case "inactive":
        return { background: "#F55A5A1A", color: "#F55A5A" };
      default:
        return { background: "#E3E8EA", color: "#666666" };
    }
  };

  // Display data
  const displayData = allCarsData?.cars || [];

  return (
    <div className="flex w-full overflow-auto items-center flex-col my-4 px-3">
      {/* Stats Section */}
      <div className="flex w-full justify-center lg:justify-start px-1 lg:flex-nowrap flex-wrap gap-2 lg:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col w-[24%] min-w-[170px] h-[116px] border border-[#E3E8EA] bg-white rounded-lg gap-4 pt-4 lg:pl-6 pl-4 hover:shadow-sm transition-shadow duration-300"
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
      </div>

      {/* Mobile View */}
      <div className="lg:hidden flex flex-col w-full px-4 mt-6">
        <div className="flex w-full justify-between items-center h-[17px] mb-2">
          <h1 className="w-full font-archive font-semibold text-base text-[#4D4D4D]">
            My Adds
          </h1>
          <div
            className="relative flex justify-center items-center w-full min-w-[105px] h-9 text-primary border border-primary rounded cursor-pointer hover:bg-blue-50"
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
                    className={`px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer transition-colors duration-200 ${
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

        <div className="flex gap-2 w-full mt-4">
          <Button
            label="Post ADD"
            onClick={() => navigate("/postadd")}
            className="text-white font-medium text-sm border rounded border-primary w-full h-[33px] bg-primary "
          />
          <Button
            type="default"
            label="Share Profile"
            onClick={() => setShowQrDialog(true)}
            className="text-primary font-medium text-sm border rounded border-primary w-full h-[33px] hover:bg-blue-50 transition-colors duration-300 focus:ring-0 focus:outline-none"
          />
        </div>

        {/* Mobile Car Cards */}
        <div className="w-full mt-4">
          {carsDataLoading ? (
            <div className="flex w-full justify-center mt-5">
              <Loader />
            </div>
          ) : carsDataError ? (
            <p className="text-red-500 text-center">Error loading data</p>
          ) : displayData?.length > 0 ? (
            displayData.map((item, index) => (
              <CarCard
                key={item._id || index}
                items={item}
                handleEdit={(e) => {
                  e?.stopPropagation();
                  setSelectedRow(item);

                  op.current?.toggle(e);
                }}
                handleRemoveAdd={() => handleRemoveAddClick(item)}
                isDashboard={true}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center">No ads found</p>
          )}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex flex-col w-[95%] mt-8 gap-4">
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
                onClick={() => handleTabSelect(btn)}
                className={`font-medium text-xs border rounded-2xl w-[100px] h-[32px] transition-colors duration-300 focus:ring-0 focus:outline-none ${
                  addStatus === btn.key
                    ? "bg-[#00796B] text-white border-[#00796B] hover:bg-[#00695C]"
                    : "bg-white text-primary border-primary hover:bg-blue-50"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              label="Post ADD"
              onClick={() => navigate("/postadd")}
              className="text-white font-medium text-sm border rounded border-primary w-[106px] h-[33px] bg-primary "
            />
            <Button
              type="default"
              label="Share Profile"
              onClick={() => setShowQrDialog(true)}
              className="text-primary font-medium text-sm border rounded border-primary w-[106px] h-[33px] hover:bg-blue-50 transition-colors duration-300 focus:ring-0 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Desktop DataTable */}
      <div className="mt-6 dashboard hidden lg:block w-[90%]">
        {carsDataLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader />
          </div>
        ) : carsDataError ? (
          <p className="text-red-500 text-center">Error loading data</p>
        ) : (
          <div className="w-full overflow-x-auto">
            <DataTable
              value={displayData}
              rows={limit}
              paginator={false}
              className="w-full"
              scrollable
              scrollHeight="flex"
            >
              <Column
                header="Car"
                body={(rowData) => {
                  return (
                    <div className="flex items-center gap-4">
                      <img
                        src={rowData?.photos?.[0] || "/placeholder-car.jpg"}
                        alt={`${rowData?.make?.name || ""} ${rowData?.variant?.name || ""}`}
                        className="w-10 h-10 rounded-[2px] object-cover transition-all duration-300 hover:scale-105"
                        onError={(e) => {
                          e.target.src = "/placeholder-car.jpg";
                        }}
                      />
                      <p className="text-sm text-[#666666] font-normal">
                        {rowData?.make?.name} {rowData?.variant?.name}
                      </p>
                    </div>
                  );
                }}
                headerClassName="bg-blue-600 text-white text-center py-2"
                style={{ minWidth: "300px" }}
              />

              <Column
                field="rentPerDay"
                header="Rent"
                body={(rowData) => (
                  <span className="font-medium">
                    ${rowData?.rentPerDay || 0}/day
                  </span>
                )}
                headerClassName="bg-blue-600 text-white text-center py-2"
                style={{ minWidth: "100px" }}
              />

              <Column
                header="Status"
                body={(rowData) => {
                  const style = getStatusBadgeStyle(rowData?.status);
                  return (
                    <div
                      className="flex w-[104px] h-5 rounded-[4px] items-center justify-center capitalize"
                      style={{
                        background: style.background,
                        color: style.color,
                      }}
                    >
                      <p className="!m-0 text-sm tracking-[0.5px] font-normal">
                        {rowData?.status}
                      </p>
                    </div>
                  );
                }}
                headerClassName="bg-blue-600 text-white text-center"
                style={{ minWidth: "120px" }}
              />

              <Column
                header="Availability"
                body={(rowData) => {
                  const isAvailable = rowData?.status === "inactive";
                  return (
                    <div
                      className={`flex items-center justify-center rounded-[4px] px-2 py-[6px] ${
                        isAvailable ? "bg-[#00796B]" : "bg-[#001F3F]"
                      }`}
                    >
                      <p className="text-white text-sm font-normal">
                        {isAvailable ? "Available" : "Unavailable"}
                      </p>
                    </div>
                  );
                }}
                headerClassName="bg-blue-600 text-white text-center py-2"
                style={{ minWidth: "150px" }}
              />

              <Column
                header="Actions"
                body={actionsBodyTemplate}
                headerClassName="bg-blue-600 text-white text-center py-2"
                style={{ minWidth: "150px" }}
              />
            </DataTable>
          </div>
        )}
      </div>

      {/* Pagination */}
      {displayData?.length > 0 && allCarsData?.totalPages > 1 && (
        <div className="mt-6 flex w-full justify-center px-14">
          <Pagination
            currentPage={page}
            totalPages={allCarsData.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Overlay Panel */}
      <OverlayPanel ref={op} className="mt-1 shadow-lg" dismissable={true}>
        <div className="flex flex-col md:w-[230px]">
          {overlayMenuItems.map((item, index) => (
            <div
              key={index}
              className="border-b border-[#EFEFEF] last:border-b-0"
              onClick={(e) => {
                if (item.hasToggle) {
                  return;
                }
                if (item.onClick && selectedRow) {
                  item.onClick(selectedRow);
                }
              }}
            >
              <div className="flex justify-between items-center px-3 py-4 hover:bg-gray-100 cursor-pointer transition-colors duration-200">
                <span className="flex gap-3 items-center">
                  {item.icon}
                  <span className="text-sm font-normal text-[#5D717D]">
                    {item.label}
                  </span>
                </span>
                {item.hasToggle && selectedRow && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <InputSwitch
                      checked={selectedRow?.status === "inactive"}
                      onChange={(e) => {
                        if (item.onToggle) {
                          item.onToggle(selectedRow, e.value);
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </OverlayPanel>

      {/* QR Dialog */}
      {showQrDialog && (
        <QRDialog
          showQrDialog={showQrDialog}
          setShowQrDialog={setShowQrDialog}
          user={user}
        />
      )}

      {/* Boost Dialog */}
      <CommonDialog
        open={showBoostDialog}
        onClose={() => {
          setShowBoostDialog(false);
          formik.resetForm();
        }}
        className={
          "md:!max-w-[450px] md:!w-[30%] !w-full !max-w-full mx-1 md:mx-0"
        }
      >
        <div className="max-h-[90vh] overflow-y-auto p-6">
          <h1 className="text-xl font-semibold text-[#1A1A1A]">Boost Ad</h1>
          <p className="text-sm text-[#5D717D] mt-2">
            Boost your ad to get more calls
          </p>

          <div className="mt-6">
            <Dropdown
              options={daysOptions}
              placeholder="Number of days"
              value={formik.values.days}
              onChange={(e) => formik.setFieldValue("days", e.value)}
              className="w-full font-inter font-normal items-center text-input text-sm h-[49px] bg-[#F7F7F7] rounded"
            />
          </div>

          <div className="flex gap-4 w-full justify-between mt-8">
            <Button
              type="default"
              label="Cancel"
              onClick={() => {
                setShowBoostDialog(false);
                formik.resetForm();
              }}
              className="bg-transparent! border border-primary! w-full"
            />
            <PrimaryButton
              type="primary"
              label="Boost Ad"
              onClick={() => formik.handleSubmit()}
              disabled={!formik.values.days}
              loading={boostAdLoading}
              className=""
            />
          </div>
        </div>
      </CommonDialog>

      {/* Delete Confirmation Dialog */}
      <CommonDialog
        open={showDeleteDialog}
        onClose={() => {
          if (!deleteLoading) {
            setShowDeleteDialog(false);
            setCarToDelete(null);
          }
        }}
        className="md:!max-w-[450px] md:!w-[30%] !w-full !max-w-full mx-1 md:mx-0"
      >
        <div className="max-h-[90vh] overflow-y-auto p-6">
          <h1 className="text-xl font-semibold text-[#1A1A1A]">Delete Ad</h1>
          <p className="text-sm text-[#5D717D] mt-2">
            Are you sure you want to delete this ad? This action cannot be
            undone.
          </p>

          <div className="mt-6">
            <p className="text-base font-medium text-[#4D4D4D]">
              {carToDelete?.make?.name} {carToDelete?.variant?.name}
            </p>
          </div>

          <div className="flex gap-4 w-full justify-between mt-8">
            <Button
              type="default"
              label="Cancel"
              onClick={() => {
                if (!deleteLoading) {
                  setShowDeleteDialog(false);
                  setCarToDelete(null);
                }
              }}
              disabled={deleteLoading}
              className="bg-transparent! border border-primary! w-full"
            />
            <PrimaryButton
              type="primary"
              label={deleteLoading ? "Deleting..." : "Delete Ad"}
              onClick={handleConfirmDelete}
              disabled={deleteLoading}
              loading={deleteLoading}
              className="bg-red-600! hover:bg-red-700! border-red-600!"
            />
          </div>
        </div>
      </CommonDialog>
    </div>
  );
};

export default Dashboard;

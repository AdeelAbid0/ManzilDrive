import { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import "./AdsList.css";
import { useApproveAd, useGetAllAds } from "./hooks/AdsListApi";
import SearchIcon from "../../../assets/SVG/search.svg?react";
import Action from "../../../assets/SVG/action.svg?react";
import FilterIcon from "../../../assets/SVG/filter.svg?react";
import Loader from "../../../Components/Loader/Loader";
import Pagination from "../../../Common/Pagination/Pagination";
import CommonInput from "../../../Common/InputText/InputText";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showNotification } from "../../../slices/notificationSlice";

const AddList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const op = useRef(null);
  const filterOp = useRef(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [status, setStatus] = useState("new");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: GetAdsList,
    isPending: AdsLoading,
    error: AdsError,
  } = useGetAllAds(page, limit, status);
  const { mutate: approveAd, isPending: approveAdLoading } = useApproveAd();
  const handleActionClick = (e, rowData) => {
    setSelectedRow(rowData);
    op.current.toggle(e);
  };

  const handleApprove = () => {
    console.log("Approve clicked for:", selectedRow);
    approveAd(
      {
        carId: selectedRow._id,
      },
      {
        onSuccess: (response) => {
          dispatch(
            showNotification({
              message: response?.message,
              status: "success",
            }),
          );
        },
        onError: (error) => {
          dispatch(
            showNotification({
              message: error?.message || "Failed to approve ad",
              status: "error",
            }),
          );
        },
      },
    );
    op.current?.hide();
  };

  const handleViewDetail = () => {
    console.log("View Detail clicked for:", selectedRow);
    navigate("/detail", { state: selectedRow });
    op.current?.hide();
  };

  const handleEdit = () => {
    console.log("Edit clicked for:", selectedRow);
    navigate("/admin/edit-ad", { state: { carData: selectedRow } });
    op.current?.hide();
  };

  const handleDelete = () => {
    console.log("Delete clicked for:", selectedRow);
    op.current?.hide();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleFilterClick = (e) => {
    filterOp.current.toggle(e);
  };

  const handleStatusFilter = (statusValue) => {
    setStatus(statusValue);
    setPage(1);
    filterOp.current?.hide();
  };

  useEffect(() => {
    setPage(1);
  }, [status]);

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="action-cell">
        <div
          className="flex align-items-center cursor-pointer justify-center"
          onClick={(e) => handleActionClick(e, rowData)}
        >
          <Action />
        </div>
      </div>
    );
  };

  if (AdsLoading) {
    return (
      <div className="flex w-full items-center justify-center h-[calc(100vh-200px)] flex-col my-4">
        <Loader />
      </div>
    );
  }

  if (AdsError) {
    return (
      <div className="flex w-full justify-center mt-5">
        <p className="text-red-500">Error loading data</p>
      </div>
    );
  }
  console.log({ approveAdLoading });
  return (
    <div className="flex w-full items-center flex-col my-4 max-w-[1102px]">
      <div className="w-full">
        <h1 className="font-archive font-semibold text-base text-[#4D4D4D] mb-4">
          List of Ads
        </h1>

        <div className="flex w-full justify-between">
          <div className="flex w-fit border-b border-[#DEDEDE] gap-5 mt-4 h-8">
            <h1
              className={`font-medium text-sm cursor-pointer transition-all duration-300 ${
                status === "new"
                  ? "text-primary border-primary border-b"
                  : "text-[#3E464C]"
              }`}
              onClick={() => setStatus("new")}
            >
              New Requests
              <span className="font-bold pl-1">
                {GetAdsList?.data?.length || 0}
              </span>
            </h1>
            <h1
              className={`font-medium text-sm leading-5 cursor-pointer transition-all duration-300 ${
                status === "all"
                  ? "text-primary border-primary border-b"
                  : "text-[#3E464C]"
              }`}
              onClick={() => setStatus("all")}
            >
              All Ads
            </h1>
          </div>
          <div className="flex gap-4">
            <div className="flex w-full gap-2">
              <CommonInput
                type="text"
                name="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search here"
                prefixIcon={SearchIcon}
                prefixIconClassName="!left-3 !top-[9px]"
                className="!h-10 w-full"
              />
            </div>
            <div
              className="!w-10 !h-10 !rounded-sm border border-[#E3E7EA] flex shrink-0 cursor-pointer hover:bg-gray-100 justify-center items-center"
              onClick={handleFilterClick}
            >
              <FilterIcon />
            </div>
          </div>
        </div>

        <div className="mt-6 boostadd hidden md:block">
          <DataTable
            value={GetAdsList?.data || []}
            rows={limit}
            paginator={false}
            className="w-full"
          >
            <Column
              header="Ad Title"
              body={(rowData) => (
                <div className="flex items-center gap-2">
                  <img
                    src={`${rowData?.photos[0]}`}
                    alt="ad-image"
                    className="!w-10 !h-10 object-cover rounded"
                  />
                  <p className="text-sm text-[#666666] font-normal">
                    {rowData?.make?.name ? `${rowData?.make?.name} ` : ""}{" "}
                    {rowData?.model?.name ? `${rowData?.model?.name}` : ""}{" "}
                    {rowData?.year ? `${rowData?.year}` : ""}
                  </p>
                </div>
              )}
              headerClassName="bg-blue-600 text-start py-2"
            />
            <Column
              header="User Name"
              body={(rowData) => (
                <p className="text-sm text-[#666666] font-normal">
                  {rowData?.business?.name || "N/A"}
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
              body={actionBodyTemplate}
              headerClassName="bg-blue-600 text-white text-start py-2"
            />
          </DataTable>

          <OverlayPanel ref={op}>
            {status === "new" ? (
              <div className="flex flex-col min-w-[120px] my-2">
                <div
                  className="px-3 py-2 border-b border-[#EFEFEF] text-[#5D717D] hover:bg-primary hover:text-white cursor-pointer rounded hover:rounded-none"
                  onClick={handleApprove}
                >
                  <p className="text-sm font-normal">Approve</p>
                </div>
                <div
                  className="px-3 py-2 border-b border-[#EFEFEF] text-[#5D717D] hover:bg-primary hover:text-white cursor-pointer rounded hover:rounded-none"
                  onClick={handleViewDetail}
                >
                  <p className="text-sm font-normal">Reject</p>
                </div>
                <div
                  className="px-3 py-2 border-b border-[#EFEFEF] text-[#5D717D] hover:bg-primary hover:text-white cursor-pointer rounded hover:rounded-none"
                  onClick={handleEdit}
                >
                  <p className="text-sm font-normal">Edit</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col min-w-[120px] my-2">
                <div
                  className="px-3 py-2 border-b border-[#EFEFEF] text-[#5D717D] hover:bg-primary hover:text-white cursor-pointer rounded hover:rounded-none"
                  onClick={handleApprove}
                >
                  <p className="text-sm font-normal">Approve</p>
                </div>
                <div
                  className="px-3 py-2 border-b border-[#EFEFEF] text-[#5D717D] hover:bg-primary hover:text-white cursor-pointer rounded hover:rounded-none"
                  onClick={handleViewDetail}
                >
                  <p className="text-sm font-normal">View Detail</p>
                </div>
                <div
                  className="px-3 py-2 border-b border-[#EFEFEF] text-[#5D717D] hover:bg-primary hover:text-white cursor-pointer rounded hover:rounded-none"
                  onClick={handleEdit}
                >
                  <p className="text-sm font-normal">Edit</p>
                </div>

                <div
                  className="px-3 py-2 text-[#5D717D] hover:bg-primary hover:text-white cursor-pointer rounded hover:rounded-none"
                  onClick={handleDelete}
                >
                  <p className="text-sm font-normal">Delete</p>
                </div>
              </div>
            )}
          </OverlayPanel>

          {/* Filter Overlay Panel */}
          <OverlayPanel ref={filterOp}>
            <div className="flex flex-col w-[257px] m-3">
              <div
                className="px-3 py-2 border-b border-[#EFEFEF] text-[#5D717D] hover:bg-primary hover:text-white cursor-pointer rounded hover:rounded-none flex justify-between items-center"
                onClick={() => handleStatusFilter("active")}
              >
                <p className="text-sm font-normal">ACTIVE</p>
                <span className="text-sm font-normal">
                  {GetAdsList?.counts?.active || 0}
                </span>
              </div>
              <div
                className="px-3 py-2 border-b border-[#EFEFEF] text-[#5D717D] hover:bg-primary hover:text-white cursor-pointer rounded hover:rounded-none flex justify-between items-center"
                onClick={() => handleStatusFilter("pending")}
              >
                <p className="text-sm font-normal">PENDING</p>
                <span className="text-sm font-normal">
                  {GetAdsList?.counts?.pending || 0}
                </span>
              </div>
              <div
                className="px-3 py-2 border-b border-[#EFEFEF] text-[#5D717D] hover:bg-primary hover:text-white cursor-pointer rounded hover:rounded-none flex justify-between items-center"
                onClick={() => handleStatusFilter("expired")}
              >
                <p className="text-sm font-normal">EXPIRE</p>
                <span className="text-sm font-normal">
                  {GetAdsList?.counts?.expired || 0}
                </span>
              </div>
              <div
                className="px-3 py-2 border-b border-[#EFEFEF] text-[#5D717D] hover:bg-primary hover:text-white cursor-pointer rounded hover:rounded-none flex justify-between items-center"
                onClick={() => handleStatusFilter("rejected")}
              >
                <p className="text-sm font-normal">REJECTED</p>
                <span className="text-sm font-normal">
                  {GetAdsList?.counts?.rejected || 0}
                </span>
              </div>
            </div>
          </OverlayPanel>
        </div>

        {/* Pagination */}
        {GetAdsList?.data?.length > 0 &&
          GetAdsList?.pagination?.totalPages > 1 && (
            <div className="mt-6 flex w-full justify-center px-4">
              <Pagination
                currentPage={page}
                totalPages={GetAdsList.pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
      </div>
    </div>
  );
};

export default AddList;

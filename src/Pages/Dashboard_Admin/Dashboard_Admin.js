import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./Dashboard-admin.css";
import { Users, Eye, Clock, XCircle } from "lucide-react";
import {
  useApproveBusiness,
  useGetAddsCount,
  useGetAllBusinesses,
  useRejectBusiness,
} from "./hooks/DashboardApi";
import { ReactComponent as SearchIcon } from "../../assets/SVG/search.svg";
import { ReactComponent as Action } from "../../assets/SVG/action.svg";
import { useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import Pagination from "../../Common/Pagination/Pagination";
import CommonInput from "../../Common/InputText/InputText";
import CommonDialog from "../../Common/Dialog/CommonDialog";
import { InputTextarea } from "primereact/inputtextarea";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import PrimaryButton from "../../Common/Button/Button";

const Dashboard_Admin = () => {
  const user = useSelector((state) => state.user.user);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const op = useRef(null);

  const { data: AddsCount, isPending: LoadingAddsData } = useGetAddsCount();

  const {
    data: AllBusinsses,
    isLoading: DashboardDataLoading,
    error: DashboardDataError,
    refetch: refetchBusinesses,
  } = useGetAllBusinesses(page, limit);

  const { mutate: ApproveBusiness, isLoading: ApproveBusinessLoading } =
    useApproveBusiness();

  const { mutate: RejectBusiness, isLoading: RejectBusinessLoading } =
    useRejectBusiness();

  // Stats data
  const stats = [
    {
      icon: Users,
      label: "TOTAL USERS",
      value: AddsCount?.data?.totalUsers || 0,
    },
    {
      icon: Eye,
      label: "ACTIVE ADDS",
      value: AddsCount?.data?.live || 0,
    },
    {
      icon: Clock,
      label: "EXPIRED ADDS",
      value: AddsCount?.data?.expired || 0,
    },
    {
      icon: XCircle,
      label: "INACTIVE ADDS",
      value: AddsCount?.data?.inactive || 0,
    },
  ];

  // Filter businesses based on search term
  const filteredBusinesses = AllBusinsses?.businesses?.filter((business) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      business?.name?.toLowerCase().includes(searchLower) ||
      business?.email?.toLowerCase().includes(searchLower) ||
      business?.phoneNumber?.toLowerCase().includes(searchLower) ||
      business?.location?.city?.toLowerCase().includes(searchLower)
    );
  });

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleApprove = () => {
    ApproveBusiness(
      { businessId: selectedRow?._id },
      {
        onSuccess: () => {
          refetchBusinesses();
          op.current.hide();
        },
      },
    );
  };

  const handleRejectWithReason = () => {
    if (!rejectReason.trim()) return;

    RejectBusiness(
      {
        businessId: selectedRow?._id,
        rejectReason: rejectReason.trim(),
      },
      {
        onSuccess: () => {
          setShowRejectDialog(false);
          setRejectReason("");
          refetchBusinesses();
          op.current?.hide();
        },
      },
    );
  };

  const handleReject = () => {
    setShowRejectDialog(true);
    op.current?.hide();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  // Action button template
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="action-cell">
        <div
          className="flex align-items-center cursor-pointer justify-center"
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

  // Name template
  const nameBodyTemplate = (rowData) => {
    return <span className="cell-content">{rowData?.name || "N/A"}</span>;
  };

  // Email template
  const emailBodyTemplate = (rowData) => {
    return <span className="cell-content">{rowData?.email || "N/A"}</span>;
  };

  // Phone template
  const phoneBodyTemplate = (rowData) => {
    return (
      <span className="cell-content">
        {rowData?.phoneNumber ? `${rowData?.phoneNumber}` : "N/A"}
      </span>
    );
  };

  // Location template
  const locationBodyTemplate = (rowData) => {
    return (
      <span className="cell-content">{rowData?.location?.city || "N/A"}</span>
    );
  };

  // Adds count template
  const addsBodyTemplate = (rowData) => {
    return <span className="cell-content">{rowData?.totalAdds || 0}</span>;
  };

  if (LoadingAddsData) {
    return (
      <div className="flex w-full items-center h-full flex-col my-4">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex w-full items-center h-full flex-col my-4">
      {/* Stats Cards */}
      <div className="flex w-full justify-center md:justify-start md:flex-nowrap flex-wrap gap-2 md:gap-6 px-4 md:px-6">
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

      {/* Overlay Panel */}
      <OverlayPanel ref={op}>
        <div className="flex flex-col min-w-[120px]">
          <div
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
            onClick={handleApprove}
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

      {/* Search Section */}
      <div className="w-full max-w-[1102px] mt-8 px-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-archive font-semibold text-base text-[#4D4D4D]">
            Recently Requested
          </h1>
          <div className="w-[300px]">
            <CommonInput
              type="text"
              name="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by name, email, phone..."
              prefixIcon={SearchIcon}
              className="!h-10 w-full"
            />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="dashboardadmin w-full max-w-[1102px]">
        {DashboardDataLoading ? (
          <div className="flex w-full justify-center mt-5">
            <Loader />
          </div>
        ) : DashboardDataError ? (
          <div className="flex w-full justify-center mt-5">
            <p className="text-red-500">Error loading data</p>
          </div>
        ) : (
          <div className="w-full">
            <DataTable
              value={filteredBusinesses || []}
              rows={limit}
              paginator={false}
              className="w-full"
            >
              <Column
                header="Name"
                body={nameBodyTemplate}
                headerClassName="bg-blue-600 text-white"
                style={{ width: "200px" }}
              />
              <Column
                header="Email"
                body={emailBodyTemplate}
                headerClassName="bg-blue-600 text-white"
                style={{ width: "240px" }}
              />
              <Column
                header="Phone"
                body={phoneBodyTemplate}
                headerClassName="bg-blue-600 text-white"
                style={{ width: "130px" }}
              />
              <Column
                header="Location"
                body={locationBodyTemplate}
                headerClassName="bg-blue-600 text-white"
                style={{ width: "303px" }}
              />
              <Column
                header="Adds"
                body={addsBodyTemplate}
                headerClassName="bg-blue-600 text-white"
                style={{ width: "38px" }}
              />
              <Column
                header="Action"
                body={actionBodyTemplate}
                headerClassName="bg-blue-600 text-white"
                style={{ width: "46px" }}
              />
            </DataTable>
          </div>
        )}
      </div>

      {/* Pagination */}
      {AllBusinsses?.businesses?.length > 0 && AllBusinsses?.totalPages > 1 && (
        <div className="mt-6 flex w-full justify-center px-4 max-w-[1102px]">
          <Pagination
            currentPage={page}
            totalPages={AllBusinsses.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* Reject Dialog */}
      <CommonDialog
        open={showRejectDialog}
        onClose={() => {
          setShowRejectDialog(false);
          setRejectReason("");
        }}
        className="md:!max-w-[450px] md:!w-[30%] !w-full !max-w-full mx-1 md:mx-0"
      >
        <div className="max-h-[90vh] overflow-y-auto p-6">
          <h1 className="text-xl font-semibold text-[#1A1A1A]">
            Reject Business
          </h1>
          <p className="text-sm text-[#5D717D] mt-2">
            Please provide a reason for rejecting this business
          </p>

          <div className="mt-6">
            <InputTextarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason"
              rows={4}
              className="font-inter font-normal text-input text-sm bg-[#F7F7F7] w-full h-[120px] rounded placeholder-placeholder placeholder:font-normal placeholder:font-inter placeholder:text-sm placeholder:leading-[18px] pl-3 pt-4"
            />
          </div>

          <div className="flex justify-end gap-3 mt-3">
            <Button
              label="Cancel"
              className="px-4 py-2 w-full border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={() => {
                setShowRejectDialog(false);
                setRejectReason("");
              }}
            />
            <PrimaryButton
              label={RejectBusinessLoading ? "Processing..." : "Reject"}
              onClick={handleRejectWithReason}
              loading={RejectBusinessLoading}
              disabled={!rejectReason.trim() || RejectBusinessLoading}
            />
          </div>
        </div>
      </CommonDialog>
    </div>
  );
};

export default Dashboard_Admin;

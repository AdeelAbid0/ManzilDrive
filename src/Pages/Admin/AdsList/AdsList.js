import { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import "./AdsList.css";
import { useGetAllAds } from "./hooks/AdsListApi";
import { ReactComponent as Action } from "../../../assets/SVG/action.svg";
import Loader from "../../../Components/Loader/Loader";
import Pagination from "../../../Common/Pagination/Pagination";

const AddList = () => {
  const op = useRef(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const {
    data: GetAdsList,
    isLoading: AdsLoading,
    error: AdsError,
  } = useGetAllAds(page, limit);

  const handleActionClick = (e, rowData) => {
    setSelectedRow(rowData);
    op.current.toggle(e);
  };

  const handleApprove = () => {
    console.log("Approve clicked for:", selectedRow);
    op.current?.hide();
  };

  const handleViewDetail = () => {
    console.log("View Detail clicked for:", selectedRow);
    op.current?.hide();
  };

  const handleEdit = () => {
    console.log("Edit clicked for:", selectedRow);
    op.current?.hide();
  };

  const handleRenew = () => {
    console.log("Renew clicked for:", selectedRow);
    op.current?.hide();
  };

  const handleBoost = () => {
    console.log("Boost clicked for:", selectedRow);
    op.current?.hide();
  };

  const handleContact = () => {
    console.log("Contact clicked for:", selectedRow);
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

  return (
    <div className="flex w-full items-center flex-col my-4 max-w-[1102px]">
      <div className="w-full">
        <h1 className="font-archive font-semibold text-base text-[#4D4D4D] mb-4">
          Ads List
        </h1>

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
            <div className="flex flex-col min-w-[120px]">
              <div
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded opacity-50"
                onClick={handleApprove}
              >
                <p className="text-sm font-medium">Approve</p>
              </div>
              <div
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                onClick={handleViewDetail}
              >
                <p className="text-sm font-medium">View Detail</p>
              </div>
              <div
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                onClick={handleEdit}
              >
                <p className="text-sm font-medium">Edit</p>
              </div>
              <div
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                onClick={handleRenew}
              >
                <p className="text-sm font-medium">Renew</p>
              </div>
              <div
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                onClick={handleBoost}
              >
                <p className="text-sm font-medium">Boost</p>
              </div>
              <div
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                onClick={handleContact}
              >
                <p className="text-sm font-medium">Contact</p>
              </div>
              <div
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded"
                onClick={handleDelete}
              >
                <p className="text-sm font-medium">Delete</p>
              </div>
            </div>
          </OverlayPanel>
        </div>
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
  );
};

export default AddList;

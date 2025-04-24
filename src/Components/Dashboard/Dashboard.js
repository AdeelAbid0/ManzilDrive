import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./Dashboard.css";
import {
  ActiveAdds,
  AddImpression,
  DailyBooking,
  ExpireAdds,
} from "../../Utils/Icons";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col mt-10">
        <div className="flex gap-6">
          <div className="flex flex-col w-[255.5px] h-[116px] border border-[#E3E8EA] rounded-lg gap-4 pt-4 pl-6">
            <div className="flex items-center gap-2 w-[207.5px]">
              <DailyBooking />
              <p className="font-inter font-medium text-[10px] text-[#808080] leading-[14px]">
                DAILY BOOKING
              </p>
            </div>
            <div className="flex flex-col w-[207.5px] h-12">
              <h1 className="font-archivo font-bold text-[32px] h-[35px] leading-[100%] text-[#44505A]">
                10
              </h1>
              <p className="font-inter font-medium text-[11px] text-[#778C99] leading-[100%] h-[79px] flex items-center">
                <span className="text-[#32B550] mr-[2px]">+10% </span>Last week
              </p>
            </div>
          </div>
          <div className="flex flex-col w-[255.5px] h-[116px] border border-[#E3E8EA] rounded-lg gap-4 pt-4 pl-6">
            <div className="flex items-center gap-2 w-[207.5px]">
              <ActiveAdds />
              <p className="font-inter font-medium text-[10px] text-[#808080] leading-[14px]">
                ACTIVE ADDS
              </p>
            </div>
            <div className="flex flex-col w-[207.5px] h-12">
              <h1 className="font-archivo font-bold text-[32px] h-[35px] leading-[100%] text-[#44505A]">
                10
              </h1>
              <p className="font-inter font-medium text-[11px] text-[#778C99] leading-[100%] h-[79px] flex items-center">
                <span className="text-[#32B550] mr-[2px]">+10% </span>Last week
              </p>
            </div>
          </div>
          <div className="flex flex-col w-[255.5px] h-[116px] border border-[#E3E8EA] rounded-lg gap-4 pt-4 pl-6">
            <div className="flex items-center gap-2 w-[207.5px]">
              <AddImpression />
              <p className="font-inter font-medium text-[10px] text-[#808080] leading-[14px]">
                ADD IMPRESSIONS
              </p>
            </div>
            <div className="flex flex-col w-[207.5px] h-12">
              <h1 className="font-archivo font-bold text-[32px] h-[35px] leading-[100%] text-[#44505A]">
                10
              </h1>
              <p className="font-inter font-medium text-[11px] text-[#778C99] leading-[100%] h-[79px] flex items-center">
                <span className="text-[#32B550] mr-[2px]">+10% </span>Last week
              </p>
            </div>
          </div>
          <div className="flex flex-col w-[255.5px] h-[116px] border border-[#E3E8EA] rounded-lg gap-4 pt-4 pl-6">
            <div className="flex items-center gap-2 w-[207.5px]">
              <ExpireAdds />
              <p className="font-inter font-medium text-[10px] text-[#808080] leading-[14px]">
                EXPIRE ADDS
              </p>
            </div>
            <div className="flex flex-col w-[207.5px] h-12">
              <h1 className="font-archivo font-bold text-[32px] h-[35px] leading-[100%] text-[#44505A]">
                10
              </h1>
              <p className="font-inter font-medium text-[11px] text-[#778C99] leading-[100%] h-[79px] flex items-center">
                <span className="text-[#32B550] mr-[2px]">+10% </span>Last week
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-[66px] w-[1094px] mt-8 gap-4">
          <div className="h-[17px]">
            <h1 className="font-archive font-semibold text-base text-[#4D4D4D]">
              My Adds
            </h1>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-4">
              <Button
                label="View All"
                className="text-primary font-medium text-xs border rounded-2xl border-primary w-[100px] h-[32px] bg-white focus:ring-0 focus:outline-none"
              />
              <Button
                label="Active Adds"
                className="text-primary font-medium text-xs border rounded-2xl border-primary w-[100px] h-[32px] bg-white focus:ring-0 focus:outline-none"
              />
              <Button
                label="Inactive Adds"
                className="text-primary font-medium text-xs border rounded-2xl border-primary w-[100px] h-[32px] bg-white focus:ring-0 focus:outline-none"
              />
              <Button
                label="Pending Adds"
                className="text-primary font-medium text-xs border rounded-2xl border-primary w-[100px] h-[32px] bg-white focus:ring-0 focus:outline-none"
              />
            </div>
            <div>
              <Button
                label="Post ADD"
                onClick={() => {
                  navigate("/postadd");
                }}
                className="text-white font-medium text-sm border rounded border-primary w-[106px] h-[33px] bg-primary focus:ring-0 focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 dashboard">
          {/* <DataTable>
          <Column field="code" header="Car"></Column>
          <Column field="name" header="Rent"></Column>
          <Column field="category" header="Status"></Column>
          <Column field="quantity" header="Actions"></Column>
        </DataTable> */}
          <DataTable
            value={[
              {
                code: "C001",
                name: "$100/day",
                category: "Available",
                quantity: "Edit",
              },
              {
                code: "C002",
                name: "$150/day",
                category: "Rented",
                quantity: "Edit",
              },
              {
                code: "C003",
                name: "$120/day",
                category: "Available",
                quantity: "Edit",
              },
            ]}
            className="flex flex-col gap-[98px]"
          >
            <Column
              field="code"
              header="Car"
              headerClassName="bg-blue-600 h-[13px] w-[474px] text-white text-center py-2"
            />
            <Column
              field="name"
              header="Rent"
              headerClassName="bg-blue-600 h-[13px] w-[100px] text-white text-center py-2"
            />
            <Column
              field="category"
              header="Status"
              headerClassName="bg-blue-600 h-[13px] w-[104px] text-white text-center py-2"
            />
            <Column
              field="quantity"
              header="Actions"
              headerClassName="bg-blue-600 h-[13px] w-[120px] text-white text-center py-2"
            />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

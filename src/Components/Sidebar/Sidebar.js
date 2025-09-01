import {
  CarRentalIcon,
  DashboardIcon,
  MessagesIcon,
  SettingsIcon,
} from "../../Utils/Icons";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-2 h-auto rounded-tr-[4px] w-full bg-white">
      <div className="h-full pt-12 ">
        <h1 className="pl-6 font-inter font-normal text-xs leading-[100%] tracking-[1px] text-[#082431]">
          MENU
        </h1>
        <div className="flex flex-col gap-2">
          <div
            className="flex items-center pl-6 h-[36px] gap-2 mt-4 hover:bg-[#00796B1A] hover:cursor-pointer group"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <span>
              <DashboardIcon />
            </span>
            <p className="font-inter font-normal text-sm text-primary leading-5 tracking-[.5px] group-hover:font-medium">
              Dashboard
            </p>
          </div>
          <div className="flex items-center pl-6 h-[36px] gap-2 mt-4 hover:bg-[#00796B1A] hover:cursor-pointer group">
            <span>
              <CarRentalIcon />
            </span>
            <p className="font-inter font-normal text-sm text-primary leading-5 tracking-[.5px] group-hover:font-medium">
              Car Rental
            </p>
          </div>
          <div className="flex items-center pl-6 h-[36px] gap-2 mt-4 hover:bg-[#00796B1A] hover:cursor-pointer group">
            <span>
              <MessagesIcon />
            </span>
            <p className="font-inter font-normal text-sm text-primary leading-5 tracking-[.5px] group-hover:font-medium">
              Messages
            </p>
          </div>
          <div className="flex items-center pl-6 h-[36px] gap-2 mt-4 hover:bg-[#00796B1A] hover:cursor-pointer group">
            <span>
              <SettingsIcon />
            </span>
            <p className="font-inter font-normal text-sm text-primary leading-5 tracking-[.5px] group-hover:font-medium">
              Settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

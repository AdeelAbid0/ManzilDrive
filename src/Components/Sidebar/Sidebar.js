import { NavLink } from "react-router-dom";
import { DashboardIcon } from "../../Utils/Icons";

const Sidebar = () => {
  return (
    <div className="mt-[72px] h-[calc(100vh-72px)] rounded-tr-[4px] w-[242px] bg-white fixed">
      <div className="h-full pt-12 ">
        <h1 className="pl-6 font-inter font-normal text-xs leading-[100%] tracking-[1px] text-[#082431]">
          MENU
        </h1>
        <div className="flex flex-col gap-2">
          {/* Dashboard Link */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center pl-6 h-[36px] gap-2 mt-4 hover:bg-[#00796B1A] hover:cursor-pointer group ${
                isActive ? "bg-[#00796B1A] font-medium" : ""
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>
                  <DashboardIcon isActive={isActive} />
                </span>
                <p
                  className={`font-inter text-sm text-primary leading-5 tracking-[.5px] group-hover:font-medium ${
                    isActive ? "font-medium" : "font-normal"
                  }`}
                >
                  Dashboard
                </p>
              </>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

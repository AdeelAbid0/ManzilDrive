import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ReactComponent as AvatarIcon } from "../../assets/SVG/avatar.svg";
import { ReactComponent as ProfileIcon } from "../../assets/SVG/profile-icon.svg";
import { ReactComponent as LogoutIcon } from "../../assets/SVG/logout.svg";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../slices/userSlice";
import { Button } from "primereact/button";

const SideMenu = ({ setMenu }) => {
  const BASE_URL_IMG = process.env.REACT_APP_IMG_URL;
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsMounted(true);
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "0px";
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMenu(false);
    }, 300);
  };
  const handleNavClick = () => {
    handleClose();
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [setMenu]);

  const handleOverlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleClose();
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 z-[999] rounded-lg">
      <div
        className={`fixed top-0 left-0 w-full h-full bg-[#42424299] z-[999]
                   transition-opacity duration-300 ${
                     isClosing ? "opacity-0" : "opacity-100"
                   } ${isMounted ? "opacity-100" : "opacity-0"}`}
        onClick={handleOverlayClick}
        onTouchMove={handleTouchMove}
        onWheel={(e) => e.preventDefault()}
        style={{
          touchAction: "none",
          overscrollBehavior: "contain",
        }}
      />
      <div
        className={`w-[343px] rounded-tl-lg rounded-bl-lg bg-white shadow-lg fixed top-0 right-0 h-full z-[1000]
                   transition-transform duration-300 ease-out ${
                     isClosing ? "translate-x-full" : "translate-x-0"
                   } ${isMounted ? "translate-x-0" : "translate-x-full"}`}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end p-4">
          <span className="cursor-pointer text-xl" onClick={handleClose}>
            ✕
          </span>
        </div>
        {user ? (
          <div className="flex flex-col gap-[2px] z-[999] w-full h-auto bg-white rounded-lg p-3">
            <div className="flex gap-3 p-3 border-b border-[#EFEFEF] cursor-pointer group">
              <div>
                {user?.business?.img ? (
                  <img
                    src={`${BASE_URL_IMG}/${user?.business?.img}`}
                    className="w-10 h-10 rounded-[4px] object-cover"
                    alt="Profile"
                  />
                ) : (
                  <AvatarIcon className="w-10 h-10" />
                )}
              </div>
              <div className="flex flex-col gap-[6px]">
                <h1 className="!m-0 text-sm font-medium text-[#505F6A]">
                  {user?.business?.name || ""}
                </h1>
                <p className="!m-0 text-xs font-normal text-[#788C98]">
                  {user?.business?.phoneVerified
                    ? `+92 ${user?.business?.phoneNumber}`
                    : ""}
                </p>
              </div>
            </div>
            <NavLink
              to="/dashboard"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex gap-3 p-3 border-b border-[#EFEFEF] cursor-pointer group ${
                  isActive ? "text-primary" : "text-[#788C98]"
                }`
              }
            >
              <p className="!m-0 text-sm font-normal group-hover:text-[#00796B]">
                Dashboard
              </p>
            </NavLink>

            <p className="text-sm font-normal text-[#788C98] group-hover:text-[#00796B] mt-6">
              Personal
            </p>
            <NavLink
              to="/profile"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex gap-3 p-3 border-b border-[#EFEFEF] cursor-pointer group ${
                  isActive ? "text-primary" : "text-[#788C98]"
                }`
              }
            >
              <div
                className={`group-hover:text-[#00796B] ${
                  window.location.pathname === "/profile"
                    ? "text-primary"
                    : "text-[#788C98]"
                }`}
              >
                <ProfileIcon className="w-5 h-5" />
              </div>
              <p className="!m-0 text-sm font-normal group-hover:text-[#00796B]">
                Profile
              </p>
            </NavLink>
            <NavLink
              to="/my-ads"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex gap-3 p-3 border-b border-[#EFEFEF] cursor-pointer group ${
                  isActive ? "text-primary" : "text-[#788C98]"
                }`
              }
            >
              <div
                className={`group-hover:text-[#00796B] ${
                  window.location.pathname === "/my-ads"
                    ? "text-primary"
                    : "text-[#788C98]"
                }`}
              >
                <ProfileIcon className="w-5 h-5" />
              </div>
              <p className="!m-0 text-sm font-normal group-hover:text-[#00796B]">
                My Adds
              </p>
            </NavLink>
            <NavLink
              to="/change-password"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `flex gap-3 p-3 border-b border-[#EFEFEF] cursor-pointer group ${
                  isActive ? "text-primary" : "text-[#788C98]"
                }`
              }
            >
              <div
                className={`group-hover:text-[#00796B] ${
                  window.location.pathname === "/change-password"
                    ? "text-primary"
                    : "text-[#788C98]"
                }`}
              >
                <ProfileIcon className="w-5 h-5" />
              </div>
              <p className="!m-0 text-sm font-normal group-hover:text-[#00796B]">
                Change Password
              </p>
            </NavLink>
            <div
              className="flex gap-3 p-3 border-b border-[#EFEFEF] cursor-pointer group"
              onClick={() => {
                handleNavClick();
                dispatch(clearUser());
                navigate("/");
              }}
            >
              <div className="group-hover:text-[#00796B]">
                <LogoutIcon className="w-5 h-5 text-[#788C98]" />
              </div>
              <p className="!m-0 text-sm font-normal text-[#788C98] group-hover:text-[#00796B]">
                Logout
              </p>
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-3 p-3">
            <Button
              label={"Login"}
              onClick={() => {
                handleNavClick();
                navigate("/login");
              }}
              className="w-full text-primary font-inter font-medium text-sm border rounded border-primary h-[46px]"
            />
            <Button
              label="Register"
              onClick={() => {
                handleNavClick();
                navigate("/register");
              }}
              className="w-fulltext-white font-medium text-sm border rounded border-primary text-white h-[46px] bg-primary"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SideMenu;

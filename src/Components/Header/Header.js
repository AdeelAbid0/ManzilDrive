import { useState, useRef, useEffect } from "react";
import { Hambergur, Logo } from "../../Utils/Icons";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { ReactComponent as AvatarIcon } from "../../assets/SVG/avatar.svg";
import { ReactComponent as ArorwDownIcon } from "../../assets/SVG/arrow-down.svg";
import { ReactComponent as ProfileIcon } from "../../assets/SVG/profile-icon.svg";
import { ReactComponent as LogoutIcon } from "../../assets/SVG/logout.svg";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../slices/userSlice";
const BASE_URL_IMG = process.env.REACT_APP_IMG_URL;
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);
  const [menu, setMenu] = useState(false);
  const user = useSelector((state) => state.user.user);
  const profileDropdownRef = useRef(null);

  // Handle click outside to close profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        const profileIcon = document.querySelector(".profile-icon-container");
        if (profileIcon && !profileIcon.contains(event.target)) {
          setOpenProfile(false);
        }
      }
    };

    if (openProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openProfile]);
  return (
    <div className="flex justify-center items-center w-full max-w-[1440px] h-[70px] bg-white fixed z-[999]">
      <div className="flex w-[91.11%] max-w-[1312px] md:gap-10 lg:gap-20">
        <div
          className="flex items-center  w-[11.96%] min-w-[156px] gap-[8px] cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <Logo />
          <h1 className="text-primary font-bold text-lg font-inter leading-[100%]">
            Manzil Drive
          </h1>
        </div>
        <div className="hidden md:flex justify-between w-[81.9%]">
          <div className="flex text-primary font-inter list-none items-center gap-8 min-w-[236px] w-[21.95%]">
            <li>Car Rental</li>
            <li>Events</li>
            <li>Tour</li>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <div
                className="flex items-center w-[68px] h-10 gap-1 cursor-pointer profile-icon-container"
                onClick={() => setOpenProfile((prev) => !prev)}
              >
                {user?.business?.img ? (
                  <img
                    src={`${BASE_URL_IMG}/${user?.business?.img}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <AvatarIcon className="w-10 h-10" />
                )}
                <ArorwDownIcon />
              </div>
            ) : (
              <Button
                label={"Login"}
                onClick={() => {
                  navigate("/login");
                }}
                className="text-primary font-inter font-medium text-sm border rounded border-primary w-[140px] h-[46px]"
              />
            )}

            {!user && (
              <Button
                label="Register"
                onClick={() => {
                  navigate("/register");
                }}
                className="text-white font-medium text-sm border rounded border-primary w-[140px] h-[46px] bg-primary"
              />
            )}
          </div>
        </div>
        <div
          className="flex w-full justify-end md:hidden cursor-pointer"
          onClick={() => {
            setMenu(true);
          }}
        >
          <Hambergur />
        </div>
      </div>
      {openProfile && (
        <div
          ref={profileDropdownRef}
          className="absolute flex flex-col gap-[2px] top-[68px] right-[64px] z-[999] w-[273px] h-auto border border-[#DCDCDC] shadow-[0px_4px_12px_0px_#00000040] bg-white rounded-lg p-3"
        >
          <div className="flex gap-3 p-3 border-b border-[#EFEFEF] cursor-pointer">
            <div>
              {user?.business?.img ? (
                <img
                  src={`${BASE_URL_IMG}/${user?.business?.img}`}
                  className="w-10 h-10 rounded-[4px] object-cover"
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
          <div
            className="flex gap-3 p-3 border-b border-[#EFEFEF] cursor-pointer"
            onClick={() => {
              navigate("/profile");
              setOpenProfile(false);
            }}
          >
            <div>
              <ProfileIcon />
            </div>
            <p className="!m-0 text-sm font-normal text-[#788C98]">Profile</p>
          </div>
          <div className="flex gap-3 p-3 border-b border-[#EFEFEF] cursor-pointer">
            <div>
              <ProfileIcon />
            </div>
            <p className="!m-0 text-sm font-normal text-[#788C98]">My Adds</p>
          </div>
          <div className="flex gap-3 p-3 border-b border-[#EFEFEF] cursor-pointer">
            <div>
              <ProfileIcon />
            </div>
            <p className="!m-0 text-sm font-normal text-[#788C98]">
              Change Password
            </p>
          </div>
          <div className="flex gap-3 p-3 border-b border-[#EFEFEF] cursor-pointer">
            <div>
              <LogoutIcon />
            </div>
            <p
              className="!m-0 text-sm font-normal text-[#788C98]"
              onClick={() => {
                setOpenProfile((prev) => !prev);
                dispatch(clearUser());
                navigate("/");
              }}
            >
              Logout
            </p>
          </div>
        </div>
      )}
      {menu && (
        <Sidebar
          showCloseIcon={false}
          visible={menu}
          onHide={() => setMenu(false)}
          className="w-[200px]"
        >
          <div>
            <ul className="flex flex-col gap-8 list-none text-primary font-inter ">
              <li>Car Rental</li>
              <li>Events</li>
              <li>Tour</li>
            </ul>
          </div>
        </Sidebar>
      )}
    </div>
  );
};

export default Header;

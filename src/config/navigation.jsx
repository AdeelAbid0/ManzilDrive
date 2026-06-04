import { DashboardIcon } from "../Utils/Icons";
import ProfileIcon from "../assets/SVG/profile-icon.svg?react";
import LogoutIcon from "../assets/SVG/logout.svg?react";
import { ROUTES } from "../constants/routes";

export const sidebarNavItems = [
  {
    title: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: DashboardIcon,
  },
];

export const sidebarNavItemsAdmin = [
  {
    title: "Dashboard",
    path: ROUTES.DASHBOARD_ADMIN,
    icon: DashboardIcon,
  },
  {
    title: "List of Ads",
    path: ROUTES.LIST_ADS,
    icon: DashboardIcon,
  },
  {
    title: "Boost Ads",
    path: ROUTES.BOOST_ADS,
    icon: DashboardIcon,
  },
];

export const profileNavItems = [
  {
    title: "Profile",
    path: ROUTES.PROFILE,
    icon: ProfileIcon,
  },
  {
    title: "Logout",
    path: ROUTES.LANDING,
    icon: LogoutIcon,
    isLogout: true,
  },
];

export const authNavItems = [
  {
    title: "Login",
    path: ROUTES.LOGIN,
    type: "button",
    variant: "outline",
  },
  {
    title: "Register",
    path: ROUTES.REGISTER,
    type: "button",
    variant: "primary",
  },
];

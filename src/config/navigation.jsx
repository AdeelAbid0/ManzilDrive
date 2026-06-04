import { DashboardIcon } from "../Utils/Icons";
import ProfileIcon from "../assets/SVG/profile-icon.svg?react";
import LogoutIcon from "../assets/SVG/logout.svg?react";

// Main navigation items for the sidebar
export const sidebarNavItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: DashboardIcon,
  },
];
export const sidebarNavItemsAdmin = [
  {
    title: "Dashboard",
    path: "/dashboard-admin",
    icon: DashboardIcon,
  },
  {
    title: "List of Ads",
    path: "/list-ads",
    icon: DashboardIcon,
  },
  {
    title: "Boost Ads",
    path: "/boost-ads",
    icon: DashboardIcon,
  },
];

export const profileNavItems = [
  {
    title: "Profile",
    path: "/profile",
    icon: ProfileIcon,
  },
  {
    title: "My Ads",
    path: "/my-ads",
    icon: ProfileIcon,
  },
  {
    title: "Change Password",
    path: "/change-password",
    icon: ProfileIcon,
  },
  {
    title: "Logout",
    path: "/logout",
    icon: LogoutIcon,
    isLogout: true,
  },
];

// Auth navigation items for login/register
export const authNavItems = [
  {
    title: "Login",
    path: "/login",
    type: "button",
    variant: "outline",
  },
  {
    title: "Register",
    path: "/register",
    type: "button",
    variant: "primary",
  },
];

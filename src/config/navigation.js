import { DashboardIcon } from "../Utils/Icons";
import { ReactComponent as ProfileIcon } from "../assets/SVG/profile-icon.svg";
import { ReactComponent as LogoutIcon } from "../assets/SVG/logout.svg";

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
    title: "List of Adds",
    path: "/list-adds",
    icon: DashboardIcon,
  },
  {
    title: "Boost Adds",
    path: "/boost-adds",
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
    title: "My Adds",
    path: "/my-adds",
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

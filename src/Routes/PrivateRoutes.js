import Dashboard from "../Pages/Dashboard/Dashboard";
import PostAdd from "../Pages/PostAdd/PostAdd";
import Profile from "../Pages/Profile/Profile";

export const PrivateRoutes = [
  {
    id: 1,
    name: "dashboard",
    path: "/dashboard",
    component: Dashboard,
  },
  {
    id: 2,
    name: "postAdd",
    path: "/postAdd",
    component: PostAdd,
  },
  {
    id: 3,
    name: "profile",
    path: "/profile",
    component: Profile,
  },
];

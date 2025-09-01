import Dashboard from "../Pages/Dashboard/Dashboard";
import PostAdd from "../Pages/PostAdd/PostAdd";

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
];

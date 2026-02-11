import AddsList from "../Pages/AddsList/AddsList";
import BoostAdds from "../Pages/BoostAdds/BoostAdds";
import Categories from "../Pages/Categories/Categories";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Dashboard_Admin from "../Pages/Dashboard_Admin/Dashboard_Admin";
import PostAdd from "../Pages/PostAdd/PostAdd";
import Profile from "../Pages/Profile/Profile";
import Products from "../Pages/Products/Product";
import EditAd from "../Pages/EditAd/EditAd";

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
    name: "editAdd",
    path: "/editAdd/:id",
    component: EditAd,
  },
  {
    id: 4,
    name: "profile",
    path: "/profile",
    component: Profile,
  },
  //Admin routes
  {
    id: 5,
    name: "dashboard-admin",
    path: "/dashboard-admin",
    component: Dashboard_Admin,
  },
  {
    id: 6,
    name: "list of adds",
    path: "/list-adds",
    component: AddsList,
  },
  {
    id: 7,
    name: "categories",
    path: "/categories",
    component: Categories,
  },
  {
    id: 8,
    name: "boost-adds",
    path: "/boost-adds",
    component: BoostAdds,
  },
  {
    id: 9,
    name: "landing",
    path: "/landing-page",
    component: Products,
  },
];

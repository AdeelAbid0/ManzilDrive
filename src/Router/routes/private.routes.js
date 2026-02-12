import { lazy } from "react";
import { ROUTES } from "../../constants/routes";
import PrivateRoutes from "../PrivateRoutes";

const PostAdd = lazy(() => import("../../Pages/PostAdd/PostAdd"));
const EditAd = lazy(() => import("../../Pages/EditAd/EditAd"));
const AddList = lazy(() => import("../../Pages/AddsList/AddsList"));
const Dashboard = lazy(() => import("../../Pages/Dashboard/Dashboard"));
const Profile = lazy(() => import("../../Pages/Profile/Profile"));
const Dashboard_Admin = lazy(
  () => import("../../Pages/Dashboard_Admin/Dashboard_Admin"),
);
const Categories = lazy(() => import("../../Pages/Categories/Categories"));
const BoostAdds = lazy(() => import("../../Pages/BoostAdds/BoostAdds"));
const Products = lazy(() => import("../../Pages/Products/Product"));

export const PRIVATE_ROUTES = [
  {
    path: ROUTES.DASHBOARD,
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
  },
  {
    path: ROUTES.POSTADD,
    element: (
      <PrivateRoutes>
        <PostAdd />
      </PrivateRoutes>
    ),
  },
  {
    path: ROUTES.EDITADD,
    element: (
      <PrivateRoutes>
        <EditAd />
      </PrivateRoutes>
    ),
  },
  {
    path: ROUTES.PROFILE,
    element: (
      <PrivateRoutes>
        <Profile />
      </PrivateRoutes>
    ),
  },
  {
    path: ROUTES.DASHBOARD_ADMIN,
    element: (
      <PrivateRoutes>
        <Dashboard_Admin />
      </PrivateRoutes>
    ),
  },
  {
    path: ROUTES.LIST_ADDS,
    element: (
      <PrivateRoutes>
        <AddList />
      </PrivateRoutes>
    ),
  },
  {
    path: ROUTES.CATEGORIES,
    element: (
      <PrivateRoutes>
        <Categories />
      </PrivateRoutes>
    ),
  },
  {
    path: ROUTES.BOOST_ADDS,
    element: (
      <PrivateRoutes>
        <BoostAdds />
      </PrivateRoutes>
    ),
  },
  {
    path: ROUTES.LANDING_PAGE,
    element: (
      <PrivateRoutes>
        <Products />
      </PrivateRoutes>
    ),
  },
];

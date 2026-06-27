import { lazy } from "react";
import { ROUTES } from "../../constants/routes";
import PrivateRoutes from "../PrivateRoutes";

const PostAd = lazy(() => import("../../Pages/PostAd/PostAd"));
const EditAd = lazy(() => import("../../Pages/EditAd/EditAd"));
const AdminEditAd = lazy(() => import("../../Pages/Admin/EditAd/EditAd"));
const AddList = lazy(() => import("../../Pages/Admin/AdsList/AdsList"));
const Dashboard = lazy(() => import("../../Pages/Dashboard/Dashboard"));
const Profile = lazy(() => import("../../Pages/Profile/Profile"));
const Dashboard_Admin = lazy(
  () => import("../../Pages/Admin/Dashboard_Admin/Dashboard_Admin"),
);
const BoostAdds = lazy(() => import("../../Pages/Admin/BoostAds/BoostAds"));
const Products = lazy(() => import("../../Pages/Products/Product"));
const Events = lazy(() => import("../../Pages/Events/Events"));
const CreateEvent = lazy(() => import("../../Pages/Events/CreateEvent"));
const EventDetail = lazy(() => import("../../Pages/Events/EventDetail"));
const AdminEventsList = lazy(() => import("../../Pages/Admin/EventsList/EventsList"));

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
    path: ROUTES.POSTAD,
    element: (
      <PrivateRoutes>
        <PostAd />
      </PrivateRoutes>
    ),
  },
  {
    path: ROUTES.EDITAD,
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
    path: ROUTES.LIST_ADS,
    element: (
      <PrivateRoutes>
        <AddList />
      </PrivateRoutes>
    ),
  },
  {
    path: ROUTES.EDIT_AD,
    element: (
      <PrivateRoutes>
        <AdminEditAd />
      </PrivateRoutes>
    ),
  },
  {
    path: ROUTES.BOOST_ADS,
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
  {
    path: ROUTES.EVENTS,
    element: (
      <PrivateRoutes>
        <Events />
      </PrivateRoutes>
    ),
  },
  {
    path: ROUTES.CREATE_EVENT,
    element: (
      <PrivateRoutes>
        <CreateEvent />
      </PrivateRoutes>
    ),
  },
  {
    path: ROUTES.EDIT_EVENT,
    element: (
      <PrivateRoutes>
        <CreateEvent />
      </PrivateRoutes>
    ),
  },
  {
    path: ROUTES.EVENT_DETAIL,
    element: (
      <PrivateRoutes>
        <EventDetail />
      </PrivateRoutes>
    ),
  },
  {
    path: ROUTES.ADMIN_EVENTS,
    element: (
      <PrivateRoutes>
        <AdminEventsList />
      </PrivateRoutes>
    ),
  },
];

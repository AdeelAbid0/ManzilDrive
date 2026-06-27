import { lazy } from "react";
import PublicRoutes from "../PublicRoutes";
import { ROUTES } from "../../constants/routes";

const Products = lazy(() => import("../../Pages/Products/Product"));
const AllBusinessCars = lazy(
  () => import("../../Pages/AllBusinessCars/AllBusinessCars"),
);
const SinglePage = lazy(() => import("../../Pages/SinglePage/SinglePage"));
const PublicEvents = lazy(() => import("../../Pages/PublicEvents/PublicEvents"));
const PublicEventDetail = lazy(() => import("../../Pages/PublicEvents/PublicEventDetail"));

export const LANDINGPAGE_ROUTES = [
  {
    path: ROUTES.LANDING,
    element: (
      <PublicRoutes>
        <Products />
      </PublicRoutes>
    ),
  },
  {
    path: ROUTES.DETAIL,
    element: (
      <PublicRoutes>
        <SinglePage />
      </PublicRoutes>
    ),
  },
  {
    path: ROUTES.VIEWALLCARS,
    element: (
      <PublicRoutes>
        <AllBusinessCars />
      </PublicRoutes>
    ),
  },
  {
    path: ROUTES.PUBLIC_EVENTS,
    element: (
      <PublicRoutes>
        <PublicEvents />
      </PublicRoutes>
    ),
  },
  {
    path: ROUTES.PUBLIC_EVENT_DETAIL,
    element: (
      <PublicRoutes>
        <PublicEventDetail />
      </PublicRoutes>
    ),
  },
];

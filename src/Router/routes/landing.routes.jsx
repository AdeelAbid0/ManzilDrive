import { lazy } from "react";
import PublicRoutes from "../PublicRoutes";
import { ROUTES } from "../../constants/routes";

const Products = lazy(() => import("../../Pages/Products/Product"));
const AllBusinessCars = lazy(
  () => import("../../Pages/AllBusinessCars/AllBusinessCars"),
);
const SinglePage = lazy(() => import("../../Pages/SinglePage/SinglePage"));

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
];

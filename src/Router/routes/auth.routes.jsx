import { lazy } from "react";
import PublicRoutes from "../PublicRoutes";
import { ROUTES } from "../../constants/routes";

const Register = lazy(() => import("../../Pages/Register/Register"));
const Login = lazy(() => import("../../Pages/Login/Login"));
const ForgetPassword = lazy(
  () => import("../../Pages/ForgetPassword/ForgetPassword"),
);

export const AUTH_ROUTES = [
  {
    path: ROUTES.REGISTER,
    element: (
      <PublicRoutes>
        <Register />
      </PublicRoutes>
    ),
  },
  {
    path: ROUTES.LOGIN,
    element: (
      <PublicRoutes>
        <Login />
      </PublicRoutes>
    ),
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: (
      <PublicRoutes>
        <ForgetPassword />
      </PublicRoutes>
    ),
  },
];

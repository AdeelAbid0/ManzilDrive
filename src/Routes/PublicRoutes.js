import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Products from "../Pages/Products/Product";
import SinglePage from "../Pages/SinglePage/SinglePage";
import AllBusinessCars from "../Pages/AllBusinessCars/AllBusinessCars";

export const PublicRoutes = [
  {
    id: 1,
    name: "landing",
    path: "/",
    component: Products,
  },
  {
    id: 2,
    name: "detail",
    path: "/detail",
    component: SinglePage,
  },
  {
    id: 3,
    name: "viewAllCars",
    path: "/viewAll",
    component: AllBusinessCars,
  },
  {
    id: 4,
    name: "register",
    path: "/register",
    component: Register,
  },
  {
    id: 5,
    name: "login",
    path: "/login",
    component: Login,
  },
];

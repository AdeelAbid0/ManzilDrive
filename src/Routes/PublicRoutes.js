import Products from "../Components/Products/Products";
import SinglePage from "../Components/SinglePage/SinglePage";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

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
    name: "register",
    path: "/register",
    component: Register,
  },
  {
    id: 4,
    name: "login",
    path: "/login",
    component: Login,
  },
];

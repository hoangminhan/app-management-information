import LoginPage from "./page/LoginPage/LoginPage";
import HomePage from "./page/OverallPage/HomePage";
import StaffPage from "./page/StaffPage/StaffPage";
import ProductPage from "./page/productPage/ProductPage";
import ClientPage from "./page/CLientPage/ClientPage";
import NotFond from "./components/NotFound/NotFond";

const routes = [
  {
    path: "/",
    exact: true,
    main: HomePage,
  },
  {
    path: "/login",
    exact: false,
    main: LoginPage,
  },

  {
    path: "/staffs",
    exact: false,
    main: StaffPage,
  },
  {
    path: "/products",
    exact: false,
    main: ProductPage,
  },
  {
    path: "/clients",
    exact: false,
    main: ClientPage,
  },
  {
    path: "",
    exact: false,
    main: NotFond,
  },
];
export default routes;

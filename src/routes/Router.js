import { Routes, Route } from "react-router-dom";

import {
  ErrorPage,
  DashboardHome,
  Home,
  Administrator,
  Login,
  Signup,
  Products,
  Stocks,
  SaleOffer,
} from "../pages";
import {
  DASHBOARD,
  HOME,
  LOGIN,
  PRODUCTS,
  STOCKS,
  STAFFSHIFT,
  SIGNUP,
  SALEOFFER,
  ADMINISTRATOR,
} from "./CONSTANTS";

import { ProtectedRoute, PublicRoute } from "../components/guards";
import StaffShift from "../pages/StaffShift";

const RouterConfig = () => {
  return (
    <div>
      <Routes>
        {/* Public routes should be placed in here */}
        <Route path={HOME} element={<Home />} />
        <Route path="/" element={<PublicRoute />}>
          {/* Auth pages */}
          <Route path={LOGIN} element={<Login />} />
          <Route path={SIGNUP} element={<Signup />} />
          <Route path={DASHBOARD} element={<DashboardHome />}></Route>
          <Route path={ADMINISTRATOR} element={<Administrator />}></Route>
          <Route path={PRODUCTS} element={<Products />}></Route>
          <Route path={STOCKS} element={<Stocks />}></Route>
          <Route path={SALEOFFER} element={<SaleOffer />}></Route>
          <Route path={STAFFSHIFT} element={<StaffShift />}></Route>
        </Route>
        {/* dashboard routes should be placed in here */}
        <Route></Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default RouterConfig;

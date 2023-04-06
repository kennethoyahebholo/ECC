// import { useAppSelector } from "hooks";
// import { DASHBOARD } from "../../routes/CONSTANTS";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
  const { isLoggedIn } = true;
  return isLoggedIn ? <Navigate to="" replace /> : <Outlet />;
};

export default PublicRoutes;

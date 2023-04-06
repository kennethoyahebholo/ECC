// import { useAppSelector } from "hooks";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ navigate }) => {
  const { isLoggedIn } = true;
  return isLoggedIn ? <Outlet /> : <Navigate to={navigate} replace />;
};

export default ProtectedRoute;

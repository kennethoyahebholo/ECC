import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../../redux/slices/auth.slice";

import {
  DASHBOARD,
  STAFFSHIFT,
  ADMINISTRATOR,
  SETTINGS,
  PRODUCTS,
  STAFFOFFER,
  STOCKS,
  HOME,
  SALEOFFER,
} from "../../../routes/CONSTANTS";
// import ZuHome from "../../icons/ZuHome";
import { EcHome, EcLogout, EcSettings } from "../../icons";
// import SvgZuSettings from "../../icons/ZuSettings";
// import { LOGIN } from "../../../services/CONSTANTS";
import AlertModal from "../../modules/modals/AlertModal";

const sidebar = [
  {
    Icon: EcHome,
    name: "Home",
    to: DASHBOARD,
  },
  {
    Icon: EcSettings,
    name: "Administrator",
    to: ADMINISTRATOR,
  },
  {
    Icon: EcSettings,
    name: "Products",
    to: PRODUCTS,
  },
  {
    Icon: EcSettings,
    name: "Stocks",
    to: STOCKS,
  },
  {
    Icon: EcSettings,
    name: "Sale Offer",
    to: SALEOFFER,
  },
  {
    Icon: EcSettings,
    name: "Staff Shift",
    to: STAFFSHIFT,
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  const [logoutModal, setLogoutModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutSubmit = () => {
    void dispatch(logout())
      .unwrap()
      .then(() => navigate(HOME))
      .catch((err) => console.log(err));
  };

  return (
    <div className="md:w-1/3 lg:w-1/4 xl:w-1/5 h-full pt-5 md:pt-8 px-3 md:pl-5 md:pr-2 flex flex-col gap-2 bg-slate-100">
      {sidebar.map(({ Icon, name, to }, key) => (
        <Link
          key={key}
          to={to}
          className={`${
            pathname === to
              ? "bg-slate-400 rounded-sm text-white p-2 flex items-center gap-4"
              : "text-gray-500 p-2 flex items-center gap-4"
          } flex items-center`}
        >
          <div className="w-5">
            <Icon size={20} />
          </div>
          <div className="w-full hidden md:block">
            <span className="text-md">{name}</span>
          </div>
        </Link>
      ))}
      <div
        onClick={() => setLogoutModal(true)}
        className="text-gray-200 p-5 flex items-center gap-4 cursor-pointer"
      >
        <div className="w-5">
          <EcLogout size={20} className="text-red-600" />
        </div>
        <div className="w-full hidden md:block">
          <span className="text-lg text-red-600">Logout</span>
        </div>
      </div>
      {logoutModal && (
        <AlertModal
          title={`Logout?`}
          subTitle={`Are you sure you want to Logout?`}
          action={`Logout`}
          handleAction={onLogoutSubmit}
          setOpenModal={setLogoutModal}
        />
      )}
    </div>
  );
};

export default Sidebar;

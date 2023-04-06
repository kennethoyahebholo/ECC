import { Link } from "react-router-dom";

// import { ZUimages } from "assets";
import { HOME } from "../../../routes/CONSTANTS";
// import { Dropdown } from "components/widgets";
// import { ZuDown, ZuFlagUnitedKingdom } from "components/icons";

// w-full lg:w-3/5 h-full pt-20 px-5 md:px-10 lg:px-20 flex items-center justify-center bg-white overflow-hidden

const AuthLayout = ({ children, reverse = false }) => {
  return (
    <div
      className={`${
        reverse ? "flex-col" : "flex-col"
      } relative w-full min-h-screen lg:h-screen flex`}
    >
      <div className="flex items-center p-6 bg-white">
        <Link to={HOME}>
          YOUR LOGO
        </Link>
      </div>
      <div className="w-full h-full bg-[#f2f2f2] overflow-auto no-scrollbar">{children}</div>
    </div>
  );
};

export default AuthLayout;

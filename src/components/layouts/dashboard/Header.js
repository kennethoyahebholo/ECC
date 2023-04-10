import { search, bell, user } from "../../../assets/images";
// import { ZuZumaridiLogo } from "components/icons";
import { Link } from "react-router-dom";
import { HOME } from "../../../routes/CONSTANTS";

const Header = () => {
  return (
    <div className="w-full h-[10vh] px-5 md:pr-[65px] md:pl-5 flex items-center justify-between bg-slate-100">
      <Link to={HOME}>
        <div className="mt:0 lg:mt-5">YOUR LOGO</div>
      </Link>

      <div className="flex items-center space-x-3 md:space-x-5 w-[200px] justify-between">
        <div className="p-3 rounded-full shadow-md">
          <img src={search} alt="" />
        </div>
        <div>
          <img src={bell} alt="" />
        </div>
        <div>
          <img
            src={user}
            alt=""
            className="rounded-full w-10 h-10 md:w-14 md:h-14"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;

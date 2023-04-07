import { Link, useLocation } from "react-router-dom";

const NavLink = ({ to, children, borderRight }) => {
  const { pathname } = useLocation();
  return (
    <Link
      to={to}
      className={`${
        pathname === to
          ? "text-primary border-b-2 border-b-primary text-[#3d3d3d] "
          : "text-[#3d3d3d] hover:text-primary"
      } pb-px px-1 ${
        borderRight &&
        "border-l-[1px] border-[#cecece] h-full flex items-center lg:px-2 xl:px-4 text-center"
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;

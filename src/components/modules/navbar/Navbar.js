import NavLink from "./NavLink";
import { Input } from "../../widgets";

const Navbar = ({ transparent = false }) => {
  return (
    <div
      className={`${
        transparent ? "bg-transparent" : "bg-black-100"
      } relative lg:relative top-0 left-0 right-0 text-white z-50`}
    >
      <div
        className="relative w-full py-1 px-5 md:px-10 xl:px-10 hidden lg:inline-flex items-center
        justify-end z-50 border-b-[1px] border-slate-300"
      >
        <div className="space-x-3 text-slate-700 relative">
          <NavLink to="">Account</NavLink>
          <div className="absolute bg-slate-300 left-0">
            <h6>Sign in</h6>
            <h6>Register</h6>
          </div>
          <NavLink to="">Contact us</NavLink>
          <NavLink to="#">Help</NavLink>
        </div>
      </div>
      <div
        className="relative w-full py-5 px-5 md:px-10 xl:px-20 flex items-center
        justify-between z-50"
      >
        <NavLink to="">YOURLOGO</NavLink>
        <div className="hidden lg:inline-flex items-center space-x-3 text-slate-700">
          <Input size="sm" placeholder="Search for a product or brand..." />
        </div>
        <div className="inline-flex items-center space-x-3 text-slate-700">
          <NavLink to="">Ideas & Advice</NavLink>
          <NavLink to="">Stores</NavLink>
          <NavLink to="#">Basket</NavLink>
        </div>
      </div>
      <div
        className="hidden lg:flex relative w-full py-1 px-5 lg:px-8 xl:px-28
        justify-center z-50 border border-y-slate-300"
      >
        <div className="hidden lg:inline-flex items-center space-x-3 text-slate-700 lg:text-[12px] xl:text-[14px]">
          <NavLink to="" borderRight>
            Deals
          </NavLink>
          <NavLink to="" borderRight>
            Stores
          </NavLink>
          <NavLink to="" borderRight>
            Painting & Decorating
          </NavLink>
          <NavLink to="" borderRight>
            Garden & Outdoor
          </NavLink>
          <NavLink to="#" borderRight>
            Kitchen
          </NavLink>
          <NavLink to="" borderRight>
            Bathroom & Pluming
          </NavLink>
          <NavLink to="" borderRight>
            Flooring & Tiling
          </NavLink>
          <NavLink to="" borderRight>
            Lighting Electrical & Heating
          </NavLink>
          <NavLink to="" borderRight>
            Furniture
          </NavLink>
          <NavLink to="" borderRight>
            Storage & Home
          </NavLink>
          <NavLink to="" borderRight>
            Building & Hardware
          </NavLink>
          <NavLink to="" borderRight>
            Tool
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

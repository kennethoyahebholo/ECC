import NavLink from "./NavLink";
import { Input } from "../../widgets";
import { useState } from "react";
import { HOME, LOGIN, SIGNUP } from "../../../routes/CONSTANTS";

const Navbar = ({ transparent = false }) => {
  const [showAuthComp, setShowAuthComp] = useState(false);
  const handleShowAuthComp = () => {
    setShowAuthComp(!showAuthComp);
  };
  return (
    <div
      className={`${
        transparent ? "bg-transparent" : "bg-black-100"
      } relative lg:relative top-0 left-0 right-0 text-white`}
    >
      <div
        className="relative w-full py-1 px-5 md:px-10 xl:px-10 inline-flex items-center
        justify-end border-b-[1px] border-slate-300 z-50"
      >
        <div className="mr-3 flex text-slate-700 relative space-x-3">
          <div className="relative">
            <div
              className="cursor-pointer"
              // onMouseEnter={handleShowAuthComp}
              onClick={handleShowAuthComp}
            >
              Account
            </div>
            {showAuthComp && (
              <div className="absolute bg-slate-200 right-0">
                <div className="p-3 lg:p-5 space-y-4 z-50">
                  <NavLink to={LOGIN}>
                    <div className="bg-green-700 py-2 px-[20px] lg:px-[100px] rounded-full flex items-center justify-center">
                      <h6 className="font-bold text-white text-[12px] lg:text-[14px] ">
                        Login
                      </h6>
                    </div>
                  </NavLink>
                  <NavLink to={SIGNUP}>
                    <div className="border border-green-700 py-2 px-[20px] lg:px-[100px] rounded-full flex items-center justify-center text-white">
                      <h6 className="font-bold text-green-800 text-[12px] lg:text-[14px] ">
                        Register
                      </h6>
                    </div>
                  </NavLink>
                </div>
                <div className="bg-white text-[12px] lg:text-[16px] p-5 space-y-4">
                  <h6>Your Wishlist</h6>
                  <h6>Your Orders</h6>
                </div>
              </div>
            )}
          </div>
          <div>
            <NavLink to="">Contact us</NavLink>
          </div>
          <div>
            <NavLink to="#">Help</NavLink>
          </div>
        </div>
      </div>
      <div
        className="relative w-full py-5 px-5 md:px-10 xl:px-20 flex items-center
        justify-between"
      >
        <NavLink to={HOME}>AUTO Supermarket</NavLink>
        <div className="hidden lg:inline-flex items-center space-x-3 text-slate-700">
          <Input size="md" placeholder="Search for a product or brand..." />
        </div>
        <div className="hidden lg:inline-flex items-center space-x-3 text-slate-700">
          <NavLink to="">Ideas & Advice</NavLink>
          <NavLink to="">Stores</NavLink>
          <NavLink to="#">Basket</NavLink>
        </div>
      </div>
      <div
        className="hidden lg:flex relative w-full py-1 px-5 lg:px-8 xl:px-28
        justify-center border border-y-slate-300"
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

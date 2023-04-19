import { useLocation } from "react-router-dom";
import { Footer, Navbar } from "../../modules";

const Landing = ({ children, footer = true }) => {
  const { pathname } = useLocation();
  return (
    <div className="relative w-full min-h-screen">
      <Navbar />

      <div className={`${pathname === "/" ? "pt-0" : "pt-[10vh]"} lg:pt-0`}>
        {children}
        {footer && <Footer />}
      </div>
    </div>
  );
};

export default Landing;

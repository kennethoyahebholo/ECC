import Header from "./Header";
import Sidebar from "./Sidebar";

const Dashboard = ({ children }) => {
  return (
    <div className="w-full relative h-screen">
      <Header />

      <div className="w-full flex h-[90vh]">
        <Sidebar />

        {/* Content */}
        <div className="w-full md:w-2/3 lg:w-3/4 xl:w-4/5 h-full pt-5 lg:pt-[30px] px-5 md:px-[22px] overflow-scroll">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

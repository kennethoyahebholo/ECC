// import { AcheiveMore, Create, Hero, Integrations, Process, Save, Testimonial } from "components";
import {
  PopularCategories,
  OurLatestDeals,
  HeroSliderComp,
} from "./homeComponents";

const HomeView = () => {
  return (
    <div className="overflow-hidden">
      <HeroSliderComp />
      {/* <AcheiveMore /> */}
      {/* <Integrations /> */}
      {/* <Save /> */}
      {/* <Process /> */}
      <OurLatestDeals />
      <PopularCategories />
    </div>
  );
};
export default HomeView;

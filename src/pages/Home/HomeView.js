import {
  PopularCategories,
  OurLatestDeals,
  HeroSliderComp,
} from "./homeComponents";

const HomeView = () => {
  return (
    <div className="overflow-hidden">
      <HeroSliderComp />
      <OurLatestDeals />
      <PopularCategories />
    </div>
  );
};
export default HomeView;

import React from "react";
import { Button, ProductComp } from "../../../../components";
import { latestDeals } from "../../../../utils/deals";

const OurLatestDeals = () => {
  return (
    <div className="">
      <div className="px-5 md:px-10 bg-[#f1f1f2] py-2">
        <label className="flex items-center justify-center text-[20px] md:text-[25px] mb-5 md:mb-10 text-[#373a36] font-[500]">
          <h4>Our latest Deals</h4>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {latestDeals?.map((productDetail) => (
            <ProductComp key={productDetail?.id} {...productDetail} />
          ))}
        </div>
      </div>
      <div className="bg-white px-5 md:px-10 py-10">
        <Button className="m-auto" variant="outline">
          View all deals
        </Button>
      </div>
    </div>
  );
};

export default OurLatestDeals;

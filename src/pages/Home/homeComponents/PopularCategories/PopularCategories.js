import React from "react";
import { ProductComp } from "../../../../components";
import { productDetails } from "../../../../utils/products";

const PopularCategories = () => {
  return (
    <div className="bg-[#f1f1f2] px-5 md:px-10 py-2">
      <label className="flex items-center justify-center text-[20px] md:text-[25px] mb-5 md:mb-10 text-[#373a36] font-[500]">
        <h4>Popular Categories</h4>
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
        {productDetails?.map((productDetail) => (
          <ProductComp key={productDetail?.id} {...productDetail} />
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;

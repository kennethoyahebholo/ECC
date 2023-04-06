import React from "react";

const ProductComp = ({ ...productDetail }) => {
  return (
    <div className="flex flex-col justify-center items-center max-w-[200px] md:max-w-[400px] space-y-3 mb-2 md:mb-8  m-auto">
      <img src={productDetail?.IconUrl} alt="" />
      <h5 className="text-[#373a36] text-[12px] md:text-[14px] font-[500] max-w-[220px] text-center">
        {productDetail?.product_name}
      </h5>
    </div>
  );
};

export default ProductComp;

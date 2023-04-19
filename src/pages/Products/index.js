import React from "react";
import { Dashboard } from "../../components";
import { Routes, Route } from "react-router-dom";
import AllProd from "./AllProd";
import { ProductProvider } from "../../redux/Product/product.provider";

const AllProducts = () => {
  return (
    <ProductProvider>
      <Dashboard>
        <Routes>
          <Route path="/" element={<AllProd />} />
        </Routes>
      </Dashboard>
    </ProductProvider>
  );
};

export default AllProducts;

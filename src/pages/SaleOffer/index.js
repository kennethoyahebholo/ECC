import React from "react";
import { Dashboard } from "../../components";
import { SaleOfferProvider } from "../../redux/SaleOffer/sale-offer.provider";
import SaleOffer from "./SaleOffer";

const AllProducts = () => {
  return (
    <SaleOfferProvider>
      <Dashboard>
        <SaleOffer />
      </Dashboard>
    </SaleOfferProvider>
  );
};

export default AllProducts;

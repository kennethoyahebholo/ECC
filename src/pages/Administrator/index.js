import React from "react";
import { Dashboard } from "../../components";
import { SaleOfferProvider } from "../../redux/SaleOffer/sale-offer.provider";
import Admin from "./Admin";

const Administrator = () => {
  return (
    <SaleOfferProvider>
      <Dashboard>
        <Admin />
      </Dashboard>
    </SaleOfferProvider>
  );
};

export default Administrator;

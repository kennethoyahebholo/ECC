import React from "react";
import { Dashboard } from "../../components";
import { Routes, Route } from "react-router-dom";
import AllStock from "./AllStock";
import { StockProvider } from "../../redux/Stock/stock.provider";

const AllStocks = () => {
  return (
    <StockProvider>
      <Dashboard>
        <Routes>
          <Route path="/" element={<AllStock />} />
        </Routes>
      </Dashboard>
    </StockProvider>
  );
};

export default AllStocks;

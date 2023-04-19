import React, { useEffect, useState } from "react";
import { Dashboard, Table } from "../../components";
import { getStaffShift } from "../../services/staff.service";

const StaffShift = () => {
  const [allStaffs, setAllStaffs] = useState([]);
  const getAllStaffs = async () => {
    try {
      const resp = await getStaffShift();
      console.log(resp);
      if (resp && resp.data?.product) {
        setAllStaffs(resp?.data?.product);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllStaffs();
  }, []);

  const formatProducts = (productData) => {
    const InvoiceList = Array.isArray(productData)
      ? productData?.map((product) => {
          return {
            id: product?.id,
            productName: product?.productName,
            categoryName: product?.categoryName,
            quantity: product?.quantity,
            price: product?.price,
            created_at: product?.createdTs,
          };
        })
      : [];
    return InvoiceList;
  };
  return (
    <Dashboard>
      <Table
        tableTitle="Staff Shift"
        tableData={formatProducts(allStaffs)}
        tableCol={[
          "id",
          "productName",
          "categoryName",
          "quantity",
          "price",
          "created_at",
          "",
        ]}
        enableButton
      />
    </Dashboard>
  );
};

export default StaffShift;

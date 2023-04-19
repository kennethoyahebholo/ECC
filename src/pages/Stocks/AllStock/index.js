import React, { useContext, useEffect, useState } from "react";
import {
  deleteStockAction,
  getStocksAction,
  stockLoadingAction,
} from "../../../redux/Stock/stock.action";
import {
  StockDispatchContext,
  StockStateContext,
} from "../../../redux/Stock/stock.provider";
import { TableProvider } from "../../../components/widgets/table/TableProvider";
import { ViewStockModal } from "./ViewStockModal";
import AddStockModal from "./AddStockModal";
import { Table } from "../../../components";
import { toast } from "react-toastify";
import { titleCase } from "../../../utils/helpers";

const AllProd = () => {
  const [actionModal, setActionModal] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const formatStocks = (stockData) => {
    const StockList = Array.isArray(stockData)
      ? stockData?.map((stock) => {
          return {
            id: stock?.id,
            stockStatus: stock?.stockStatus,
            count: stock?.count,
            productName: stock?.productName,
            price: stock?.totalPrice,
            updated_at: stock?.lastUpdated,
          };
        })
      : [];
    return StockList;
  };

  const { loading, stocks, meta } = useContext(StockStateContext);

  const dispatch = useContext(StockDispatchContext);

  const dispatchStocks = React.useCallback(
    async (pageQuery) => {
      try {
        dispatch(stockLoadingAction(true));
        dispatch(await getStocksAction(pageQuery));
        // console.log(stocks);
        dispatch(stockLoadingAction(false));
      } catch (error) {
        console.log(
          error?.response?.message || error?.message || "Invoice Fatal error"
        );
        dispatch(stockLoadingAction(false));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    dispatchStocks();
  }, [dispatchStocks]);

  const handleDeleteStock = async () => {
    try {
      await deleteStockAction(activeId);
      dispatch(stockLoadingAction(true));
      dispatch(await getStocksAction());
      dispatch(stockLoadingAction(false));
      toast.success("Stock deleted successfully");
      setActionModal(false);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response.data.errors
          ? `${error.response.data.errors[0].message} for ${titleCase(
              error.response.data.errors[0].field
            )}`
          : "Something went wrong"
      );
      setActionModal(false);
    }
  };

  return (
    <TableProvider>
      <Table
        tableTitle="Stocks"
        tableData={formatStocks(stocks?.stock)}
        tableCol={[
          "id",
          "status",
          "count",
          "product",
          "price",
          "updated_at",
          "",
        ]}
        enableButton
        loading={loading}
        dispatchAction={dispatchStocks}
        addButton
        actionModal={actionModal}
        setActionModal={setActionModal}
        handleDelete={handleDeleteStock}
        setActiveId={setActiveId}
        setAddModal={setAddModal}
        // setAddItemModal={setAddItemModal}
        // handleAddModalClick={() => setAddItemModal(true)}
      />
      <ViewStockModal />
      {addModal && (
        <AddStockModal handleCloseModal={() => setAddModal(false)} />
      )}
    </TableProvider>
  );
};
export default AllProd;

import { StockService } from "../../services";

export const stockActions = {
  FIND_STOCK: "FIND_STOCK",
  ADD_STOCK: "CREATE_STOCK",
  UPDATE_STOCK: "UPDATE_STOCK",
  DELETE_STOCK: "DELETE_STOCK",
  GET_STOCKS: "GET_STOCKS",
  STOCK_LOADING: "STOCK_LOADING",
  STOCK_ERROR: "STOCK_ERROR",
};

export const findStockAction = async (stockId) => {
  try {
    const stock = await StockService.findStock(stockId);
    return {
      type: stockActions.FIND_STOCK,
      payload: { ...stock.data },
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addStockAction = async (stockPayload) => {
  try {
    const addStock = await StockService.addStock(stockPayload);
    return {
      type: stockActions.ADD_STOCK,
      payload: { ...addStock?.data },
    };
  } catch (error) {
    throw error;
  }
};

export const updateStockAction = async (stockPayload) => {
  try {
    const updatedStock = await StockService.updateStock(stockPayload);
    return {
      type: stockActions.UPDATE_STOCK,
      payload: { ...updatedStock?.data },
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteStockAction = async (productPayload) => {
  try {
    const deleteStock = await StockService.deleteStock(productPayload);
    return {
      type: stockActions.DELETE_STOCK,
      payload: { ...deleteStock?.data },
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getStocksAction = async (pageQuery) => {
  try {
    const stocks = await StockService.getStocks(pageQuery);
    return {
      type: stockActions.GET_STOCKS,
      payload: stocks.data,
      meta: stocks.paginationMetadata,
    };
  } catch (error) {
    throw error;
  }
};

export const stockLoadingAction = (payload) => {
  return {
    type: stockActions.STOCK_LOADING,
    payload,
  };
};

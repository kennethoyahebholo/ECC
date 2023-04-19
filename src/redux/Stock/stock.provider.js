import { createContext, useReducer } from "react";
import { STOCK_INITIAL_STATE, stockReducer } from "./stock.reducer";

export const StockStateContext = createContext({ ...STOCK_INITIAL_STATE });
export const StockDispatchContext = createContext(null);

export const StockProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stockReducer, STOCK_INITIAL_STATE);

  return (
    <StockDispatchContext.Provider value={dispatch}>
      <StockStateContext.Provider value={state}>
        {children}
      </StockStateContext.Provider>
    </StockDispatchContext.Provider>
  );
};

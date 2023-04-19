import { createContext, Dispatch, useReducer } from "react";
import {
  SALE_OFFER_INITIAL_STATE,
  saleOfferReducer,
} from "./sale-offer.reducer";

export const SaleOfferStateContext = createContext({
  ...SALE_OFFER_INITIAL_STATE,
});
export const SaleOfferDispatchContext = createContext(null);

export const SaleOfferProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    saleOfferReducer,
    SALE_OFFER_INITIAL_STATE
  );

  return (
    <SaleOfferDispatchContext.Provider value={dispatch}>
      <SaleOfferStateContext.Provider value={state}>
        {children}
      </SaleOfferStateContext.Provider>
    </SaleOfferDispatchContext.Provider>
  );
};

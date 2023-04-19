import { createContext, Dispatch, useReducer } from "react";
import { PRODUCT_INITIAL_STATE, productReducer } from "./product.reducer";

export const ProductStateContext = createContext({ ...PRODUCT_INITIAL_STATE });
export const ProductDispatchContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, PRODUCT_INITIAL_STATE);

  return (
    <ProductDispatchContext.Provider value={dispatch}>
      <ProductStateContext.Provider value={state}>
        {children}
      </ProductStateContext.Provider>
    </ProductDispatchContext.Provider>
  );
};

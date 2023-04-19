import { stockActions } from "./stock.action";

export const STOCK_INITIAL_STATE = {
  stocks: [],
  stock: undefined,
  meta: undefined,
  loading: false,
  error: false,
};

export const stockReducer = (state = STOCK_INITIAL_STATE, action) => {
  switch (action.type) {
    case stockActions.ADD_STOCK:
      return {
        ...state,
        stock: action.payload,
        meta: action.payload.paginationMetadata,
        loading: false,
      };
    case stockActions.GET_STOCKS:
      return {
        ...state,
        stocks: action.payload,
        meta: action?.meta,
        loading: false,
      };
    case stockActions.FIND_STOCK:
      return {
        ...state,
        stock: { ...state.stock, ...action.payload },
        loading: false,
      };
    case stockActions.DELETE_STOCK:
      return {
        ...state,
        stock: { ...state.product, ...action.payload },
        loading: false,
      };
    case stockActions.STOCK_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case stockActions.STOCK_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

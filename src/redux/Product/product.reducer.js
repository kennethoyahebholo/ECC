import { productActions } from "./product.action";

export const PRODUCT_INITIAL_STATE = {
  products: [],
  product: undefined,
  meta: undefined,
  loading: false,
  error: false,
};

export const productReducer = (state = PRODUCT_INITIAL_STATE, action) => {
  switch (action.type) {
    case productActions.ADD_PRODUCT:
      return {
        ...state,
        product: action.payload,
        meta: action.payload.paginationMetadata,
        loading: false,
      };
    case productActions.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        meta: action?.meta,
        loading: false,
      };
    case productActions.FIND_PRODUCT:
      return {
        ...state,
        product: { ...state.product, ...action.payload },
        loading: false,
      };
    case productActions.DELETE_PRODUCT:
      return {
        ...state,
        product: { ...state.product, ...action.payload },
        loading: false,
      };
    case productActions.PRODUCT_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case productActions.PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

import { saleOfferActions } from "./sale-offer.action";

export const SALE_OFFER_INITIAL_STATE = {
  saleOffers: [],
  saleOffer: undefined,
  meta: undefined,
  loading: false,
  error: false,
};

export const saleOfferReducer = (state = SALE_OFFER_INITIAL_STATE, action) => {
  switch (action.type) {
    case saleOfferActions.ADD_SALE_OFFER:
      return {
        ...state,
        saleOffer: action.payload,
        meta: action.payload.paginationMetadata,
        loading: false,
      };
    case saleOfferActions.GET_SALE_OFFERS:
      return {
        ...state,
        saleOffers: action.payload,
        meta: action?.meta,
        loading: false,
      };
    case saleOfferActions.FIND_SALE_OFFER:
      return {
        ...state,
        saleOffer: { ...state.product, ...action.payload },
        loading: false,
      };
    case saleOfferActions.DELETE_SALE_OFFER:
      return {
        ...state,
        saleOffer: { ...state.product, ...action.payload },
        loading: false,
      };
    case saleOfferActions.SALE_OFFER_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case saleOfferActions.SALE_OFFER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

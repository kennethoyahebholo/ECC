import { SaleOfferService } from "../../services";

export const saleOfferActions = {
  FIND_SALE_OFFER: "FIND_SALE_OFFER",
  ADD_SALE_OFFER: "CREATE_SALE_OFFER",
  UPDATE_SALE_OFFER: "UPDATE_SALE_OFFER",
  DELETE_SALE_OFFER: "DELETE_SALE_OFFER",
  GET_SALE_OFFERS: "GET_SALE_OFFERS",
  SALE_OFFER_LOADING: "SALE_OFFER_LOADING",
  SALE_OFFER_ERROR: "SALE_OFFER_ERROR",
};

export const findSaleOfferAction = async (saleOfferId) => {
  try {
    const saleOffer = await SaleOfferService.findSaleOffer(saleOfferId);
    return {
      type: saleOfferActions.FIND_SALE_OFFER,
      payload: { ...saleOffer.data },
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addSaleOfferAction = async (saleOfferPayload) => {
  try {
    const addSaleOffer = await SaleOfferService.addSaleOffer(saleOfferPayload);
    return {
      type: saleOfferActions.ADD_SALE_OFFER,
      payload: { ...addSaleOffer?.data },
    };
  } catch (error) {
    throw error;
  }
};

export const updateSaleOfferAction = async (saleOfferPayload) => {
  try {
    const updatedSaleOffer = await SaleOfferService.updateSaleOffer(
      saleOfferPayload
    );
    return {
      type: saleOfferActions.UPDATE_SALE_OFFER,
      payload: { ...updatedSaleOffer?.data },
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteSaleOfferAction = async (productPayload) => {
  try {
    const deleteSaleOffer = await SaleOfferService.deleteSaleOffer(
      productPayload
    );
    return {
      type: saleOfferActions.DELETE_SALE_OFFER,
      payload: { ...deleteSaleOffer?.data },
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSaleOffersAction = async (pageQuery) => {
  try {
    const saleOffers = await SaleOfferService.getSaleOffer(pageQuery);
    // console.log(products?.paginationMetadata);
    return {
      type: saleOfferActions.GET_SALE_OFFERS,
      payload: saleOffers.data,
      meta: saleOffers.paginationMetadata,
    };
  } catch (error) {
    throw error;
  }
};

export const saleOfferLoadingAction = (payload) => {
  return {
    type: saleOfferActions.SALE_OFFER_LOADING,
    payload,
  };
};

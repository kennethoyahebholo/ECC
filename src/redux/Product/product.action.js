import { ProductService } from "../../services";

export const productActions = {
  FIND_PRODUCT: "FIND_PRODUCT",
  ADD_PRODUCT: "CREATE_PRODUCT",
  UPDATE_PRODUCT: "UPDATE_PRODUCT",
  DELETE_PRODUCT: "DELETE_PRODUCT",
  GET_PRODUCTS: "GET_PRODUCTS",
  PRODUCT_LOADING: "PRODUCT_LOADING",
  PRODUCT_ERROR: "PRODUCT_ERROR",
};

export const findProductAction = async (productId) => {
  try {
    const product = await ProductService.findProduct(productId);
    return {
      type: productActions.FIND_PRODUCT,
      payload: { ...product.data },
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addProductAction = async (productPayload) => {
  try {
    const addProduct = await ProductService.addProduct(productPayload);
    return {
      type: productActions.ADD_PRODUCT,
      payload: { ...addProduct?.data },
    };
  } catch (error) {
    throw error;
  }
};

export const updateProductAction = async (productPayload) => {
  try {
    const updatedProduct = await ProductService.updateProduct(productPayload);
    return {
      type: productActions.UPDATE_PRODUCT,
      payload: { ...updatedProduct?.data },
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteProductAction = async (productPayload) => {
  try {
    const deleteInvoice = await ProductService.deleteProduct(productPayload);
    return {
      type: productActions.DELETE_PRODUCT,
      payload: { ...deleteInvoice?.data },
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProductsAction = async (pageQuery) => {
  try {
    const products = await ProductService.getProducts(pageQuery);
    // console.log(products?.paginationMetadata);
    return {
      type: productActions.GET_PRODUCTS,
      payload: products.data,
      meta: products.paginationMetadata,
    };
  } catch (error) {
    throw error;
  }
};

export const productLoadingAction = (payload) => {
  return {
    type: productActions.PRODUCT_LOADING,
    payload,
  };
};

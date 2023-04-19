import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ProductService } from "../../services";
import { formatErrorResponse } from "../../utils/formatErrorResponse";

export const getProducts = createAsyncThunk("product/get", async (thunkAPI) => {
  try {
    const { MESSAGE, DATA } = await ProductService.getProducts();
    toast.success(MESSAGE);
    return { data: DATA };
  } catch (error) {
    const message = formatErrorResponse(error);
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, image }, thunkAPI) => {
    try {
      const { MESSAGE, DATA } = await ProductService.updateProduct(id, image);
      toast.success(MESSAGE);
      return { imageId: DATA.imageId };
    } catch (error) {
      const message = formatErrorResponse(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/add",
  async (productData, thunkAPI) => {
    try {
      const { MESSAGE, DATA } = await ProductService.addProduct(productData);
      toast.success(MESSAGE);
      return DATA.product;
    } catch (error) {
      const message = formatErrorResponse(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, thunkAPI) => {
    try {
      const { MESSAGE, DATA } = await ProductService.deleteProduct(id);
      toast.success(MESSAGE);
      return { ...DATA };
    } catch (error) {
      const message = formatErrorResponse(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  products: [],
  product: undefined,
  isLoading: false,
  error: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // update image actions
    builder.addCase(updateProduct.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload.product;
    });
    builder.addCase(updateProduct.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    // add product actions
    builder.addCase(addProduct.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });

    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });

    builder.addCase(addProduct.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    // delete image actions
    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.isLoading = false;
      state.product = "";
      state.products = "";
      state.image = null;
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.isLoading = false;
    });

    // get product actions
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload.products;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

const { reducer } = productSlice;
export default reducer;

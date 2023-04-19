import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { StaffShiftService } from "../../services";
import { formatErrorResponse } from "../../utils/formatErrorResponse";

export const getStaffShift = createAsyncThunk(
  "staff-shift/get",
  async (thunkAPI) => {
    try {
      const { MESSAGE, DATA } = await StaffShiftService.getStaffShift();
      toast.success(MESSAGE);
      return { data: DATA };
    } catch (error) {
      const message = formatErrorResponse(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateStaffShift = createAsyncThunk(
  "staff-shift/update",
  async ({ id, image }, thunkAPI) => {
    try {
      const { MESSAGE, DATA } = await StaffShiftService.updateStaffShift(
        id,
        image
      );
      toast.success(MESSAGE);
      return { imageId: DATA.imageId };
    } catch (error) {
      const message = formatErrorResponse(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteStaffShift = createAsyncThunk(
  "staff-shift/delete",
  async (id, thunkAPI) => {
    try {
      const { MESSAGE, DATA } = await StaffShiftService.deleteStaffShift(id);
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

const StaffShiftSlice = createSlice({
  name: "staffShift",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // update image actions
    builder.addCase(updateStaffShift.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(updateStaffShift.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload.product;
    });
    builder.addCase(updateStaffShift.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    // delete image actions
    builder.addCase(deleteStaffShift.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(deleteStaffShift.fulfilled, (state) => {
      state.isLoading = false;
      state.product = "";
      state.products = "";
      state.image = null;
    });
    builder.addCase(deleteStaffShift.rejected, (state) => {
      state.isLoading = false;
    });

    // get product actions
    builder.addCase(getStaffShift.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(getStaffShift.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload.products;
    });
    builder.addCase(getStaffShift.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

const { reducer } = StaffShiftSlice;
export default reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import {
  Register,
  Signin,
  ForgotPassword,
  Logout,
  // signinSuccess,
} from "../../services";
import { formatErrorResponse } from "../../utils/formatErrorResponse";
import { ECC_USER_DATA } from "../../services/CONSTANTS";
// import axios from "axios";
// import { env } from "../../configs/environment.config";

const user = JSON.parse(localStorage.getItem(ECC_USER_DATA));

export const register = createAsyncThunk(
  "auth/register",
  async (
    {
      firstName,
      lastName,
      email,
      phoneNumber,
      UserRole,
      password,
      confirmPassword,
    },
    thunkAPI
  ) => {
    try {
      const resp = await Register({
        firstName,
        lastName,
        email,
        phoneNumber,
        confirmPassword,
        UserRole,
        password,
      });
      toast.success(resp.userResult);
      return { resp: resp.userResult };
    } catch (error) {
      const message = formatErrorResponse(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// export const registerBusiness = createAsyncThunk(
//   "auth/registerBusiness",
//   async (
//     {
//       firstName,
//       lastName,
//       email,
//       password
//     },
//     thunkAPI
//   ) => {
//     try {
//       const { MESSAGE, DATA } = await AuthService.registerBusiness({
//         firstName,
//         lastName,
//         email,
//         password
//       });
//       toast.success(MESSAGE);
//       return { userId: DATA.id, email: DATA.email };
//     } catch (error) {
//       const message = formatErrorResponse(error);
//       toast.error(message);
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const resp = await Signin({ email, password });
      // return { userId: DATA.id, email: DATA.email };
      return resp;
    } catch (error) {
      const message = formatErrorResponse(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// export const loginSuccess = createAsyncThunk(
//   "auth/loginSuccess",
//   async (_, thunkAPI) => {
//     try {
//       const { DATA } = await signinSuccess();
//       console.log(DATA);
//       return { user: DATA };
//     } catch (error) {
//       const message = formatErrorResponse(error);
//       toast.error(message);
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// export const loginSuccess = createAsyncThunk(
//   "auth/loginSuccess",
//   async (_, thunkAPI) => {
//     try {
//       const { DATA } = await AuthService.loginSuccess();
//       return { user: DATA };
//     } catch (error) {
//       const message = formatErrorResponse(error);
//       toast.error(message);
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// export const confirmAccount = createAsyncThunk(
//   "auth/confirmAccount",
//   async (code, thunkAPI) => {
//     try {
//       const { MESSAGE, DATA } = await AuthService.confirmAccount(code);
//       toast.success(MESSAGE);
//       return { userId: DATA.id, email: DATA.email };
//     } catch (error) {
//       const message = formatErrorResponse(error);
//       toast.error(message);
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (details, thunkAPI) => {
    try {
      const { DATA, MESSAGE } = await ForgotPassword(details);
      toast.success(MESSAGE);
      return { userId: DATA.id, email: DATA.email };
    } catch (error) {
      const message = formatErrorResponse(error);
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// export const resetPassword = createAsyncThunk(
//   "auth/resetPassword",
//   async (details, thunkAPI) => {
//     try {
//       const { DATA, MESSAGE } = await AuthService.resetPassword(details);
//       toast.success(MESSAGE);
//       return { userId: DATA.id, email: DATA.email };
//     } catch (error) {
//       const message = formatErrorResponse(error);
//       toast.error(message);
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );
// Change Password slice
// export const changePassword = createAsyncThunk(
//   "auth/changePassword",
//   async (details, thunkAPI) => {
//     try {
//       const { DATA, MESSAGE } = await AuthService.changePassword(details);
//       toast.success(MESSAGE);
//       return { userId: DATA.id, email: DATA.email };
//     } catch (error) {
//       const message = formatErrorResponse(error);
//       toast.error(message);
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await Logout();
  } catch (error) {
    const message = formatErrorResponse(error);
    toast.error(message);
  }
});

const initialState = user
  ? { isLoggedIn: true, user: null, isLoading: false, passwordReset: false }
  : { isLoggedIn: false, user: null, isLoading: false, passwordReset: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // register actions
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.isLoading = false;
    });
    builder.addCase(register.rejected, (state) => {
      state.isLoggedIn = false;
      state.isLoading = false;
    });
    // register business actions
    // builder.addCase(registerBusiness.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(registerBusiness.fulfilled, (state) => {
    //   state.isLoggedIn = false;
    //   state.isLoading = false;
    // });
    // builder.addCase(registerBusiness.rejected, (state) => {
    //   state.isLoggedIn = false;
    //   state.isLoading = false;
    // });
    // login actions
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isLoading = false;
    });
    // login success actions
    // builder.addCase(loginSuccess.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(loginSuccess.fulfilled, (state, action) => {
    //   state.isLoggedIn = true;
    //   state.user = action.payload.user;
    //   state.isLoading = false;
    // });
    // builder.addCase(loginSuccess.rejected, (state) => {
    //   state.isLoggedIn = false;
    //   state.user = null;
    //   state.isLoading = false;
    // });
    // forgot password actions
    // builder.addCase(forgotPassword.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(forgotPassword.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.passwordReset = true;
    //   state.user = action.payload;
    // });
    // builder.addCase(forgotPassword.rejected, (state) => {
    //   state.isLoading = false;
    // });
    // forgot password actions
    // builder.addCase(resetPassword.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(resetPassword.fulfilled, (state) => {
    //   state.isLoading = false;
    // });
    // builder.addCase(resetPassword.rejected, (state) => {
    //   state.isLoading = false;
    // });
    // logout
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isLoading = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

const { reducer } = authSlice;

export default reducer;

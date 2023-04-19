// import * as AuthService from '../../services/internal/auth.service';
import { toast } from "react-toastify";
import { AuthService } from "../../services";
import { getAuthUser } from "../../services/internal/auth";
import { formatErrorResponse } from "../../utils/formatErrorResponse";

export const authActions = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  AUTH_LOADING: "AUTH_LOADING",
  AUTH_ERROR: "AUTH_ERROR",
  AUTH_USER: "AUTH_USER",
  GLOBAL_ERROR: "GLOBAL_ERROR",
  GLOBAL_SUCCESS: "GLOBAL_SUCCESS",
  LOGOUT: "LOGOUT",
};

export const loginAction = async (payload) => {
  try {
    const { email, password } = payload;
    const newLogin = await AuthService.Signin({ email, password });
    return {
      type: authActions.LOGIN,
      payload: { ...newLogin.data, email },
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const registerAction = async ({
  firstName,
  lastName,
  email,
  phoneNumber,
  UserRole,
  password,
  confirmPassword,
}) => {
  try {
    const resp = await AuthService.Register({
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
  }
};

// export const registerAction = async (payload) => {
//   try {
//     const { email, password } = payload;
//     const newLogin = await AuthService.Register({ email, password });
//     return {
//       type: authActions.LOGIN,
//       payload: { ...newLogin.data, email },
//     };
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

export const authLoadingAction = (payload) => {
  return {
    type: authActions.AUTH_LOADING,
    payload,
  };
};

export const getAuthUserAction = async () => {
  try {
    const userResponse = await getAuthUser();
    return {
      type: authActions.AUTH_USER,
      payload: userResponse.data.data,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const UpdateUserAction = async (userPayload) => {
  try {
    const userResponse = await AuthService.updateUser(userPayload);
    return {
      type: authActions.AUTH_USER,
      payload: userResponse.data,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

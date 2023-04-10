// eslint-disable-next-line no-restricted-imports
import { CHANGE_PASSWORD } from "../routes/CONSTANTS";
import axios from "axios";

import env from "../configs";
import authHeader from "./auth-header";
import {
  FORGOT_PASSWORD,
  LOGIN,
  //   LOGIN_SUCCESS_URL,
  LOG_OUT,
  REGISTER,
  RESET_PASSWORD,
  ECC_USER_DATA,
} from "./CONSTANTS";

export const Signin = async ({ email, password }) => {
  return await axios
    .post(`${env.API_BASE_URL}/${LOGIN}`, {
      email,
      password,
    })
    .then((res) => {
      const data = res.data;
      if (data) {
        localStorage.setItem(ECC_USER_DATA, JSON.stringify(data));
      }
      return res;
    });
};

// export const loginSuccess = async () => {
//   try {
//     const config = {
//       url: `${env.API_BASE_URL}/${LOGIN_SUCCESS_URL}`,
//       method: "get",
//       withCredentials: true,
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Credentials": true,
//       },
//     };
//     const response = await axios(config);
//     if (response.data?.DATA?.accessToken) {
//       localStorage.setItem(ECC_USER_DATA, JSON.stringify(response.data.DATA));
//     }
//     return response.data;
//   } catch (err) {
//     return err;
//   }
// };

export const Register = async (details) => {
  try {
    const response = await axios.post(
      `${env.API_BASE_URL}/${REGISTER}`,
      details
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// export const registerBusiness = async (details) => {
//   const response = await axios.post(
//     `${env.API_BASE_URL}/${REGISTER}?type=business`,
//     details
//   );
//   return response.data;
// };

// export const confirmAccount = async (confirmationCode) => {
//   const response = await axios.get(
//     env.API_BASE_URL + `/auth/confirm/${confirmationCode}`
//   );
//   return response.data;
// };

export const Logout = async () => {
  return await axios
    .get(`${env.API_BASE_URL}/${LOG_OUT}`, { headers: authHeader() })
    .finally(() => {
      localStorage.removeItem(ECC_USER_DATA);
      window.location.reload();
    });
};

export const ForgotPassword = async (details) => {
  const response = await axios.post(
    `${env.API_BASE_URL}/${FORGOT_PASSWORD}`,
    details
  );
  return response.data;
};

export const ResetPassword = async (details) => {
  const response = await axios.patch(
    `${env.API_BASE_URL}/${RESET_PASSWORD}`,
    details
  );
  return response.data;
};

export const ChangePassword = async (details) => {
  const response = await axios.patch(
    `${env.API_BASE_URL}/${CHANGE_PASSWORD}`,
    details
  );
  return response.data;
};

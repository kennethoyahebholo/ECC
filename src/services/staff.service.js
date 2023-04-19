import axios from "axios";

import env from "../configs";
import authHeader from "./auth-header";
import {
  ADD_STAFF_SHIFT,
  DELETE_STAFF_SHIFT,
  GET_STAFF_SHIFT,
  UPDATE_STAFF_SHIFT,
} from "./CONSTANTS";

export const getStaffShift = async () => {
  const response = await axios.get(`${env.API_BASE_URL}${GET_STAFF_SHIFT}`, {
    headers: authHeader(),
  });
  return response.data;
};

export const updateStaffShift = async (productPayload) => {
  try {
    const { data } = await axios.put(
      `${env.API_BASE_URL}${UPDATE_STAFF_SHIFT}`,
      productPayload
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const addStaffShift = async (payload) => {
  try {
    const { data } = await axios.post(
      `${env.API_BASE_URL}${ADD_STAFF_SHIFT}`,
      payload
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteStaffShift = async (id) => {
  const response = await axios.delete(
    `${env.API_BASE_URL}${DELETE_STAFF_SHIFT}/${id}`
  );
  console.log(response);
  return response.data;
};

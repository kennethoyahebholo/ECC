import axios from "axios";

import env from "../configs";
import authHeader from "./auth-header";
import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
} from "./CONSTANTS";

export const getProducts = async () => {
  const response = await axios.get(`${env.API_BASE_URL}${GET_PRODUCTS}`, {
    headers: authHeader(),
  });
  return response.data;
};

export const findProduct = async (productId) => {
  const response = await axios.get(
    `${env.API_BASE_URL}${GET_PRODUCTS}?id=${productId}`,
    {
      headers: authHeader(),
    }
  );
  return response.data;
};

export const updateProduct = async (productPayload) => {
  try {
    const { data } = await axios.put(
      `${env.API_BASE_URL}${UPDATE_PRODUCT}`,
      productPayload
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const addProduct = async (payload) => {
  try {
    const { data } = await axios.post(
      `${env.API_BASE_URL}${ADD_PRODUCT}`,
      payload,
      {
        headers: authHeader(),
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(
    `${env.API_BASE_URL}${DELETE_PRODUCT}?id=${id}`,
    {
      headers: authHeader(),
    }
  );
  console.log(response);
  return response.data;
};

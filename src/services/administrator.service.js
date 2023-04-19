import axios from "axios";

import env from "../configs";
import authHeader from "./auth-header";
import { ADD_STOCK, DELETE_STOCK, GET_STOCKS, UPDATE_STOCK } from "./CONSTANTS";

export const getStocks = async () => {
  const response = await axios.get(`${env.API_BASE_URL}${GET_STOCKS}`, {
    headers: authHeader(),
  });
  return response.data;
};

export const findStock = async (id) => {
  const response = await axios.get(
    `${env.API_BASE_URL}${GET_STOCKS}?id=${id}`,
    {
      headers: authHeader(),
    }
  );
  return response.data;
};

export const updateStock = async (stockPayload) => {
  try {
    const { data } = await axios.put(
      `${env.API_BASE_URL}${UPDATE_STOCK}`,
      stockPayload
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const addStock = async (payload) => {
  try {
    const { data } = await axios.post(
      `${env.API_BASE_URL}${ADD_STOCK}`,
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

export const deleteStock = async (id) => {
  const response = await axios.delete(
    `${env.API_BASE_URL}${DELETE_STOCK}?id=${id}`,
    {
      headers: authHeader(),
    }
  );
  console.log(response);
  return response.data;
};

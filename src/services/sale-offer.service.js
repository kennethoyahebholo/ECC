import axios from "axios";

import env from "../configs";
import authHeader from "./auth-header";
import {
  ADD_SALE_OFFER,
  DELETE_SALE_OFFER,
  GET_SALE_OFFER,
  UPDATE_SALE_OFFER,
} from "./CONSTANTS";

export const getSaleOffer = async () => {
  const response = await axios.get(`${env.API_BASE_URL}${GET_SALE_OFFER}`, {
    headers: authHeader(),
  });
  return response.data;
};

export const findSaleOffer = async (id) => {
  const response = await axios.get(
    `${env.API_BASE_URL}${GET_SALE_OFFER}?id=${id}`,
    {
      headers: authHeader(),
    }
  );
  return response.data;
};

export const updateSaleOffer = async (salePayload) => {
  try {
    const { data } = await axios.put(
      `${env.API_BASE_URL}${UPDATE_SALE_OFFER}`,
      salePayload
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const addSaleOffer = async (payload) => {
  try {
    const { data } = await axios.post(
      `${env.API_BASE_URL}${ADD_SALE_OFFER}`,
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

export const deleteSaleOffer = async (id) => {
  const response = await axios.delete(
    `${env.API_BASE_URL}${DELETE_SALE_OFFER}?id=${id}`,
    {
      headers: authHeader(),
    }
  );
  console.log(response);
  return response.data;
};

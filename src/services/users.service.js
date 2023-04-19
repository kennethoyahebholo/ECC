import { env } from "configs/environment.config";
// import { IRefer } from "pages/ReferAFriend/ReferAFriendView";
import { GET_USER } from "./CONSTANTS";
import fetch from "./utils/FetchInterceptor";

export const getUserById = async (id) => {
  try {
    const data = await fetch({
      url: `${GET_USER}/${id}`,
      method: "get",
    });
    return data;
  } catch (err) {
    return err;
  }
};

export const sendReferral = async (body, id) => {
  return await fetch.post(`${env.API_BASE_URL}/users/${id}/invite`, body);
};

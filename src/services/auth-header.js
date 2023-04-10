import { ECC_USER_DATA } from "./CONSTANTS";

export default function authHeader() {
  const user = JSON.parse(localStorage.getItem(ECC_USER_DATA));
  if (user?.accessToken) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
}

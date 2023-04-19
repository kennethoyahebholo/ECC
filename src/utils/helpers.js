import moment from "moment";
import { getItem } from "./storage";

export function toDateFormat(date, format = "DD MMMM YYYY") {
  return moment(new Date(date)).format(format);
}

export const toAbsoluteUrl = (pathname) => process.env.PUBLIC_URL + pathname;

export const moneyFormat = (x) => {
  const get_currency = getItem("default_currency");
  const default_currency = get_currency === "NGN" ? "₦" : "$";
  return (
    default_currency +
    x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
  );
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const truncate = (str, n) => {
  if (typeof str === "string")
    return str.length > n ? str.substring(0, n - 1) + "..." : str;
  return str;
};

export const titleCase = (s) =>
  s
    .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Initial char (after -/_)
    .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase()); // First char after each -/_

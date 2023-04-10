import env from "../configs";

// Auth routes
export const LOG_OUT = "Authentication/logout";
export const LOGIN = "Authentication/authenticate";
export const REGISTER = "Authentication/create-user";
export const LOGIN_SUCCESS_URL = "auth/login/success";
export const VERIFY_TOKEN = "/auth/verify";
export const GOOGLE_END_POINT = `${env.API_BASE_URL}/auth/google`;
export const LINKED_IN_END_POINT = `${env.API_BASE_URL}/auth/linkedin`;
export const MICROSOFT_END_POINT = `${env.API_BASE_URL}/auth/microsoft`;

export const GET_USER = "/users";
export const FORGOT_PASSWORD = "Authentication/forgot-password";
export const RESET_PASSWORD = "Authentication/reset-password";

export const UPDATE_USER = "/update_user";
export const DELETE_USER = "/delete_user";

export const GOOGLE_LOGIN = "/google/signup";
export const GOOGLE_CALLBACK = "/google/callback";
export const LINKED_LOGIN = "/linkedin/signup";
export const MICROSOFT_LOGIN = "/microsoft/signup";
export const MICROSOFT_CALLBACK = "/microsoft/callback";
export const FACEBOOK_CALLBACK = "/auth/facebook/callback ";

/**
 * Settings
 */

export const UPDATE_USER_PROFILE = "/user";
export const UPLOAD_FILE = "/upload/profile-photo/";

export const PUBLIC_REQUEST_KEY = "public-request";

/**
 * Meetings
 */

export const CREATE_NEW_MEETING = "/meetings/new-meeting";

/**
 * Upload Image
 */
export const UPLOAD_IMAGE = "/upload/images";
/*
Contact
*/

export const ECC_USER_DATA = "ECC_USER_DATA";

export const TECHNICAL_SUPPORT = "/technical-support";

// Request Status

export const RESPONSE_SUCCESS = "SUCCESS";
export const RESPONSE_ERROR = "FAILURE";

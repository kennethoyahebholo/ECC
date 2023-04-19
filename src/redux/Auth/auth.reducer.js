import { getAuth, removeAuth, setAuth } from "../../utils/storage";
import { authActions } from "./auth.actions";

export const AUTH_INITIAL_STATE = {
  user: undefined,
  auth: getAuth() || undefined,
  loading: false,
  error: false,
  newUser: false,
  global_error: undefined,
  global_success: undefined,
  logout: () => {},
};

export const authReducer = (state = AUTH_INITIAL_STATE, action) => {
  switch (action.type) {
    case authActions.LOGIN:
      setAuth(action.payload);
      return {
        ...state,
        auth: {
          ...state.auth,
          ...action.payload,
        },
        loading: false,
        newUser: false,
      };
    case authActions.REGISTER:
      return {
        ...state,
        newUser: true,
        loading: false,
      };
    case authActions.AUTH_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case authActions.AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case authActions.AUTH_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case authActions.LOGOUT:
      removeAuth();
      return {
        ...state,
        user: undefined,
        auth: undefined,
      };
    case authActions.GLOBAL_ERROR:
      return {
        ...state,
        global_error: action.payload,
        global_success: undefined,
      };
    case authActions.GLOBAL_SUCCESS:
      return {
        ...state,
        global_success: action.payload,
        global_error: undefined,
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

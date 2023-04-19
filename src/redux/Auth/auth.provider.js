import { createContext, Dispatch, useReducer } from "react";
import { AUTH_INITIAL_STATE, authReducer } from "./auth.reducer";

export const AuthStateContext = createContext({ ...AUTH_INITIAL_STATE });
export const AuthDispatchContext = createContext(() => {});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

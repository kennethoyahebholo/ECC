import { combineReducers } from "@reduxjs/toolkit";

import auth from "./auth.slice";

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;

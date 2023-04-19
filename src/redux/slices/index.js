import { combineReducers } from "@reduxjs/toolkit";

import auth from "./auth.slice";
import product from "./products.slice";

const rootReducer = combineReducers({
  auth,
  product,
});

export default rootReducer;

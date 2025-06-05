import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import agentReducer from "./slices/agentSlice";
import farmerReducer from "./slices/farmerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, //this stores users authentication
    agent: agentReducer,
    farmer: farmerReducer,
  },
});

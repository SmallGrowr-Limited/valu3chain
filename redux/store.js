import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import agentReducer from "./slices/agentSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer, //this stores users authentication 
    agent: agentReducer
    // city: getCityReducer,
  },
});

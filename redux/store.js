import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import agentReducer from "./slices/agentSlice";
import farmerReducer from "./slices/farmerSlice";
import partnerReducer from "./slices/partnerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, //this stores users authentication
    agent: agentReducer,
    farmer: farmerReducer,
    partner: partnerReducer,
  },
});

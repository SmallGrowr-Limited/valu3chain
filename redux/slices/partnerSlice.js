import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  partnerData: null,
  loading: false,
  error: null,
  productOrder: null,
};

const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {
    createPartnerProfile: (state, action) => {
      state.partnerData = action.payload;
    },
    createProductOrder: (state, action) => {
      state.productOrder = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { createPartnerProfile, createProductOrder, setLoading, setError } = partnerSlice.actions;
export default partnerSlice.reducer;

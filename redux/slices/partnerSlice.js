import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  partnerData: null,
  loading: false,
  error: null,
};

const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {
    createPartnerProfile: (state, action) => {
      state.partnerData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { createPartnerProfile, setLoading, setError } = partnerSlice.actions;
export default partnerSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  agentData: null,
  loading: false,
  error: null,
};

const agentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {
    createAgentProfile: (state, action) => {
      state.agentData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { createAgentProfile, setLoading, setError } = agentSlice.actions;
export default agentSlice.reducer;

// src/store/authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Load initial user from AsyncStorage
export const loadAuthData = createAsyncThunk('auth/loadAuthData', async () => {
  const user = await AsyncStorage.getItem('user');
  const token = await AsyncStorage.getItem('token');
  return {
    user: user ? JSON.parse(user) : null,
    token: token || null,
  };
});

const initialState = {
  user: null,
  token: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      AsyncStorage.setItem("user", JSON.stringify(action.payload.user));
      AsyncStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      AsyncStorage.removeItem("user");
      AsyncStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loadAuthData.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,
//   role: null,
//   token: null,
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     loggedInUser: (state, action) => {
//       state.user = action.payload;
//     },
//     setCredentials: (state, action) => {
//       state.user = action.payload;
//       //state.token = action.payload.token;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.role = null;
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
// });

// export const {
//   loggedInUser,
//   setCredentials,
//   logout,
//   setLoading,
//   setError,
//   clearError,
// } = authSlice.actions;

// export default authSlice.reducer;

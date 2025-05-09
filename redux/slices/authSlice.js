// store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signupRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupRequest,
  signupSuccess,
  signupFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;

// Simulate an API call
const fakeApiCall = (partnerData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (partnerData.email === 'test@example.com' && partnerData.password === 'password') {
        resolve(partnerData, { token: "fake-token" });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 5000);
  });
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { dispatch }) => {
    dispatch(loginRequest());
    try {
      const user = await fakeApiCall(email, password);
      dispatch(loginSuccess(user));
    } catch (error) {
      dispatch(loginFailure(console.log(error)));
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signupAgent",
  async (partnerData, { dispatch }) => {
    dispatch(signupRequest());
    try {
      //const user = await fakeApiCall(partnerData);
      dispatch(signupSuccess(partnerData));
    } catch (error) {
      dispatch(signupFailure(error.message));
    }
  }
);


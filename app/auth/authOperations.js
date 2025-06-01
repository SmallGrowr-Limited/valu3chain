import { AsyncStorage } from "react-native";
import client  from "../../apollo/client";
import { LOGIN_USER, SIGNUP_USER } from "../../graphql/userAuthMutation";
import { setCredentials, logout, setLoading, setError } from "../../redux/slices/authSlice";

export const loginUser = (email, password, role) => async (dispatch) => {
  dispatch(setLoading(true));
  // dispatch(clearError());

  try {
    const { data } = await client.mutate({
      mutation: LOGIN_USER,
      variables: { email, password, role },
    });

    if (data.loginUser.token) {
      await AsyncStorage.setItem("token", data.loginUser.token);
      dispatch(
        setCredentials({
          user: data.loginUser.user,
          token: data.loginUser.token,
        })
      );
    }
  } catch (err) {
    dispatch(setError(err.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const signupUser = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  // dispatch(clearError());

  try {
    const { data } = await client.mutate({
      mutation: SIGNUP_USER,
      variables: userData,
    });

    console.log("data:")

    if (data.signupUser.token) {
      await AsyncStorage.setItem("token", data.signupUser.token);
      dispatch(
        setCredentials({
          user: data.signupUser.user,
          token: data.signupUser.token,
        })
      );
    }
  } catch (err) {
    console.log(err.message);
    
    dispatch(setError(err.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutUser = () => async (dispatch) => {
  await AsyncStorage.removeItem("token");
  dispatch(logout());
};

export const checkAuthStatus = () => async (dispatch) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    // You might want to verify the token with your backend here
    dispatch(setCredentials({ token, user: null })); // User data might need to be fetched
  }
};

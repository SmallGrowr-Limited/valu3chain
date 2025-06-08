// components/AuthLoader.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadAuthData } from "../redux/slices/authSlice";

export default function AuthLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAuthData());
  }, [dispatch]);

  return null; // No UI, just triggers loading auth data
}

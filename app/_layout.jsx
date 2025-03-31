import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {Provider} from "react-redux";
import {store} from "../redux/store"

export default function RootLayout() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: "Home" }}
        />
        <Stack.Screen
          name="onboarding"
          options={{ headerShown: false, title: "Onboarding" }}
        />
        <Stack.Screen
          name="onboarding1"
          options={{ headerShown: true, title: "" }}
        />
        <Stack.Screen
          name="onboarding2"
          options={{ headerShown: true, title: "" }}
        />
        <Stack.Screen
          name="landing"
          options={{ headerShown: false, title: "" }}
        />
        <Stack.Screen
          name="auth/signup"
          options={{ headerShown: true, title: "" }}
        />
        <Stack.Screen
          name="auth/login"
          options={{ headerShown: true, title: "" }}
        />
        <Stack.Screen
          name="qrcode"
          options={{ headerShown: true, title: "Scane QR Code" }}
        />
      </Stack>
    </Provider>
  );
}

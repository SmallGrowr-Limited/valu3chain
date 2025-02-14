import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: true, title: "Home" }}
        />
        <Stack.Screen
          name="onboarding"
          options={{ headerShown: true, title: "Onboarding" }}
        />
        <Stack.Screen
          name="onboarding1"
          options={{ headerShown: true, title: "Onboarding" }}
        />
        <Stack.Screen
          name="onboarding2"
          options={{ headerShown: true, title: "Onboarding" }}
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
      </Stack>
    </>
  );
}

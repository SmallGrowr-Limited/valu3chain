import { Stack } from "expo-router";

export default function RootLayout() {
  return (
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
        name="signup"
        options={{ headerShown: true, title: "Sign up" }}
      />
    </Stack>
  );
}

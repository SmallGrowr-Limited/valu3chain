import { Stack } from "expo-router";

export default function AgentLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: "" }} />

      <Stack.Screen
        name="updateAgent"
        options={{ headerShown: true, title: "" }}
      />
      <Stack.Screen name="profile" options={{ headerShown: true, title: "" }} />
      <Stack.Screen
        name="onboardfarmer"
        options={{ headerShown: true, title: "Farmer Onboarding" }}
      />
      <Stack.Screen
        name="updatefarmer"
        options={{ headerShown: true, title: "Farmer Onboarding" }}
      />
      <Stack.Screen
        name="demand"
        options={{ headerShown: true, title: "" }}
      />
    </Stack>
  );
}


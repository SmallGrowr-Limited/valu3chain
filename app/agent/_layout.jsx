import { Stack } from "expo-router";

export default function AgentLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: "" }} />
      <Stack.Screen name="profile" options={{ headerShown: true, title: "" }} />
      <Stack.Screen
        name="onboardfarmer"
        options={{ headerShown: true, title: "Farmer Onboarding" }}
      />
      <Stack.Screen
        name="agentProfileForm"
        options={{ headerShown: true, title: "Agent Profile" }}
      />
      <Stack.Screen name="request" options={{ headerShown: true, title: "Request" }} />
      <Stack.Screen
        name="farmAudit"
        options={{ headerShown: true, title: "Farm Audit" }}
      />
    </Stack>
  );
}


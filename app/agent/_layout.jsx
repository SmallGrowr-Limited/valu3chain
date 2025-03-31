import { Stack } from "expo-router";

export default function () {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: "" }} />

      <Stack.Screen
        name="updateAgent"
        options={{ headerShown: true, title: "" }}
      />
      {/* <Stack.Screen
        name="settings"
        options={{ headerShown: false, title: "" }}
      /> */}
      <Stack.Screen
        name="onboardfarmer"
        options={{ headerShown: true, title: "" }}
      />
      <Stack.Screen
        name="updatefarmer"
        options={{ headerShown: true, title: "" }}
      />
    </Stack>
  );
}


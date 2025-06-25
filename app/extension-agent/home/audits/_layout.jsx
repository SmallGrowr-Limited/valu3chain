import { Stack } from "expo-router";

export default function AuditsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
      <Stack.Screen name="conduct" options={{ headerShown: false }} />
      <Stack.Screen name="conduct/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}

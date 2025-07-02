import { Stack } from "expo-router";

export default function ReportsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="monthly" options={{ headerShown: false }} />
      <Stack.Screen name="weekly" options={{ headerShown: false }} />
    </Stack>
  );
}

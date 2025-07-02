import { Stack } from "expo-router";

export default function InputsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="distribution" options={{ headerShown: false }} />
      <Stack.Screen name="requests" options={{ headerShown: false }} />
    </Stack>
  );
}

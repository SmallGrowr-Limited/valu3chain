import { Stack } from "expo-router";

export default function InputsLayout() {
    return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="request" options={{ headerShown: false }} />
        <Stack.Screen name="[id]" options={{ headerShown: false }} />
      </Stack>
    );
}
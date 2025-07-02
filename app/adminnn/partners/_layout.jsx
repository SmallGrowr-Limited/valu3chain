import { Stack } from "expo-router";

export default function PartnersLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="investments" options={{ headerShown: false }} />
      
    </Stack>
  );
}

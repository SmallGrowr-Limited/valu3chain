import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="aiQuery" options={{ headerShown: false }} />
      <Stack.Screen name="fundAllocation" options={{ headerShown: false }} />
      <Stack.Screen name="investmentDetails" options={{ headerShown: false }} />
      <Stack.Screen name="payments" options={{ headerShown: false }} />
      <Stack.Screen name="transactions" options={{ headerShown: false }} />
      <Stack.Screen name="purchaseOrder" options={{ headerShown: false }} />
      <Stack.Screen name="returns" options={{ headerShown: false }} />
    </Stack>
  );
}

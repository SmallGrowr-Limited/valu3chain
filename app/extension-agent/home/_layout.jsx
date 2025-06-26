import { Stack } from "expo-router";

export default function HomeLayout() {
    
    return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="farmers" options={{ headerShown: false }} />
        <Stack.Screen name="inputs" options={{ headerShown: false }} />
        <Stack.Screen name="audits" options={{ headerShown: false }} />
        <Stack.Screen name="market" options={{ headerShown: false }} />
      </Stack>
    );
}
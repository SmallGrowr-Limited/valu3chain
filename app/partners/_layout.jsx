import {Stack} from "expo-router";

export default function Partners(params) {
    return (
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: "" }}
        />
        <Stack.Screen
          name="investments"
          options={{ headerShown: true, title: "" }}
        />
        <Stack.Screen
          name="transactions"
          options={{ headerShown: true, title: "" }}
        />
        <Stack.Screen
          name="orderPreview"
          options={{ headerShown: false, title: "" }}
        />
        <Stack.Screen
          name="fundAllocation"
          options={{ headerShown: true, title: "" }}
        />
        <Stack.Screen
          name="profileForm1"
          options={{ headerShown: true, title: "Business Profile" }}
        />
        <Stack.Screen
          name="profileForm2"
          options={{ headerShown: true, title: "Business Profile" }}
        />
      </Stack>
    );
}
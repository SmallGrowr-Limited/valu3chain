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
          name="partnerProfileForm"
          options={{ headerShown: true, title: "Business Profile" }}
        />

        <Stack.Screen
          name="dashboard"
          options={{ headerShown: true, title: "Home" }}
        />
      </Stack>
    );
}
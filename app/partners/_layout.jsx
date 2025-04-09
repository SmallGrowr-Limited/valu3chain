import {Stack} from "expo-router";

export default function Partners(params) {
    return (
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: "" }}
        />
        <Stack.Screen
          name="demand"
          options={{ headerShown: true, title: "" }}
        />
      </Stack>
    );
}
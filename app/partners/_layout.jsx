import {Stack} from "expo-router";

export default function Partners(params) {
    return (
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: "" }}
        />
        {/* <Stack.Screen
          name="updateProfile"
          options={{ headerShown: true, title: "Ecosystem  Partner" }}
        /> */}
      </Stack>
    );
}
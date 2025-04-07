import { Text, View, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const router = useRouter();

  const checkFirstLaunch = async () => {
    try {
      // Prevent the splash screen from hiding
      await SplashScreen.preventAutoHideAsync();

      const hasLaunched = await AsyncStorage.getItem("hasLaunched");
      setIsFirstLaunch(hasLaunched === null);

      if (hasLaunched === null) {
        router.navigate("/auth/verifyPhone");
      } else {
        router.navigate("/onboarding");
      }

      // Hide the splash screen once routing is decided
      SplashScreen.hideAsync();
    } catch (error) {
      console.error("Error checking launch state:", error);
      SplashScreen.hideAsync();
    }
  };
  useEffect(() => {
    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return null;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="red" />
    </View>
  );
}

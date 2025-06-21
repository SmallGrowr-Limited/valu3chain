// app/index.tsx
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useEffect, useState } from "react";
//import { useAuth } from "../hooks/useAuth"; // Optional: if using authentication

export default function Index() {
  // Optional: Add authentication state check
  //const { user, loading } = useAuth();
  const [appReady, setAppReady] = useState(false);

  // Optional: Add any initial app loading logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading || !appReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  // Optional: Redirect to login if not authenticated
  // if (!user) {
  //   return <Redirect href="/login" />;
  // }

  // Redirect to the dashboard tab by default
  return <Redirect href="/(tabs)/dashboard" />;
}

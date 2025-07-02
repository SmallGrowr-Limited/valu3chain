import { Tabs } from "expo-router";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";
import { Colors } from "../../components/constants/colors";
import { PaperProvider } from "react-native-paper";

export default function TabLayout() {
  return (
    <PaperProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
          },
          tabBarStyle: {
            paddingBottom: 5,
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="trade"
          options={{
            headerShown: false,
            title: "Trade",
            tabBarIcon: ({ color }) => (
              // <Ionicons name="home" size={24} color={color} />
              <MaterialIcons name="clean-hands" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="invest"
          options={{
            headerShown: false,
            title: "Invest",
            tabBarIcon: ({ color }) => (
              // <Ionicons name="home" size={24} color={color} />
              <FontAwesome5 name="handshake" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            headerShown: false,
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <Ionicons name="settings" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}

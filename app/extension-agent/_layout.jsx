import { Tabs } from "expo-router";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { colors } from "../../components/agent-components/constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown:false,
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="home"
        options={{
          headerShown:false,
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      /> */}
      {/* <Tabs.Screen
        name="farmers"
        options={{
          headerShown: false,
          title: "Farmers",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" size={24} color={color} />
          ),
        }}
      /> */}
      {/* <Tabs.Screen
        name="inputs"
        options={{
          title: "Inputs",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="tractor" size={24} color={color} />
          ),
        }}
      /> */}
      {/* <Tabs.Screen
        name="audits"
        options={{
          title: "Audits",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="clipboard" size={24} color={color} />
          ),
        }}
      /> */}
      {/* <Tabs.Screen
        name="market"
        options={{
          title: "Market",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="line-chart" size={24} color={color} />
          ),
        }}
      /> */}
      {/* <Tabs.Screen
        name="support"
        options={{
          title: "Support",
          tabBarIcon: ({ color }) => (
            <Ionicons name="help-circle" size={24} color={color} />
          ),
        }}
      /> */}
    </Tabs>
  );
}

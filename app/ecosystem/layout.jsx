import { Tabs } from "expo-router";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import { Colors } from "../../components/constants/colors";

export default function TabLayout() {
  return (
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
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <Ionicons name="grid" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="investments"
        options={{
          title: "Investments",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="attach-money" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          title: "Payments",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="credit-card" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="monitoring"
        options={{
          title: "Monitoring",
          tabBarIcon: ({ color }) => (
            <Feather name="bar-chart-2" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="returns"
        options={{
          title: "Returns",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="trending-up" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="aiQuery"
        options={{
          title: "AI Query",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="trending-up" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="purchaseOrder"
        options={{
          title: "Purchase Order",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="trending-up" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="productListing"
        options={{
          title: "Product Listing",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="trending-up" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

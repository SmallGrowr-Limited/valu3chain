import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, Text, StyleSheet } from "react-native";

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>Farm Admin</Text>
      </View>

      <DrawerItem
        label="Dashboard"
        onPress={() => props.navigation.navigate("index")}
      />
      <DrawerItem
        label="Farmers"
        onPress={() => props.navigation.navigate("farmers")}
      />
      <DrawerItem
        label="Input Distribution"
        onPress={() => props.navigation.navigate("inputs")}
      />
      <DrawerItem
        label="Marketplace"
        onPress={() => props.navigation.navigate("marketplace")}
      />
      <DrawerItem
        label="Partners"
        onPress={() => props.navigation.navigate("partners")}
      />
      <DrawerItem
        label="Reports"
        onPress={() => props.navigation.navigate("reports")}
      />
    </DrawerContentScrollView> 
  );
}

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="index" options={{ title: "Dashboard" }} />
        <Drawer.Screen name="farmers" options={{ title: "Farmers" }} />
        <Drawer.Screen
          name="inputs"
          options={{ title: "Input Distribution" }}
        />
        <Drawer.Screen
          name="marketplace"
          options={{ title: "Marketplace" }}
        />
        <Drawer.Screen name="partners" options={{ title: "Partners" }} />
        <Drawer.Screen name="reports" options={{ title: "Reports" }} />
      </Drawer>
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc", 
  },
  drawerHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

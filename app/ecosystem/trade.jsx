import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Picker,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import PurchaseOrder from "../../components/productOrder";
import ProductSeller from "../../components/productSeller";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";



const farms = [
  {
    id: "1",
    name: "Yeboah Main Farm",
    size: "5 acres",
    crops: ["Maize", "Cassava"],
    lastAudit: "2023-10-15",
    auditStatus: "Good",
  },
  {
    id: "2",
    name: "Yeboah Vegetable Farm",
    size: "2 acres",
    crops: ["Tomatoes", "Peppers", "Onions"],
    lastAudit: "2023-09-28",
    auditStatus: "Needs Improvement",
  },
  {
    id: "3",
    name: "Yeboah Vegetable Farm",
    size: "2 acres",
    crops: ["Tomatoes", "Peppers", "Onions"],
    lastAudit: "2023-09-28",
    auditStatus: "Needs Improvement",
  },
];

const ProductListingForm = () => {
  const router = useRouter();
  const [selectedTrade, setSelectedTrade] = useState("description");

  const recentTransactions = () => (
    <View style={styles.section}>
      {farms.map((farm) => (
        <TouchableOpacity
          key={farm.id}
          style={styles.farmCard}
          onPress={() => router.push(`/farms/${farm.id}`)}
        >
          <View style={styles.farmHeader}>
            <Text style={styles.farmName}>{farm.name}</Text>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    farm.auditStatus === "Good"
                      ? Colors.successLight
                      : Colors.warningLight,
                },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  {
                    color:
                      farm.auditStatus === "Good"
                        ? Colors.success
                        : Colors.warning,
                  },
                ]}
              >
                {farm.auditStatus}
              </Text>
            </View>
          </View>

          <View style={styles.farmDetails}>
            <Text style={styles.farmDetail}>Size: {farm.size}</Text>
            <Text style={styles.farmDetail}>
              Crops: {farm.crops.join(", ")}
            </Text>
            <Text style={styles.farmDetail}>Last Audit: {farm.lastAudit}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );


  return (
    <View style={styles.container}>
      <Text style={styles.header}> Agro Commodity</Text>

      {/* Tabs Selection */}

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tabs,
            selectedTrade === "buy_product" && styles.activeTypeButton,
          ]}
          onPress={() => setSelectedTrade("buy_product")}
        >
          <Text
            style={[
              styles.typeButtonText,
              selectedTrade === "buy_product" && styles.activeTypeButtonText,
            ]}
          >
            Buy Products
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabs,
            selectedTrade === "sell_product" && styles.activeTypeButton,
          ]}
          onPress={() => setSelectedTrade("sell_product")}
        >
          <Text
            style={[
              styles.typeButtonText,
              selectedTrade === "sell_product" && styles.activeTypeButtonText,
            ]}
          >
            Sell Product
          </Text>
        </TouchableOpacity>
      </View>
      {selectedTrade === "description" && recentTransactions()}
      {selectedTrade === "buy_product" && <PurchaseOrder />}
      {selectedTrade === "sell_product" && <ProductSeller />}
    </View>
  );
};

const Colors = {
  primary: "#2E7D32", // Deep green - represents agriculture and growth
  primaryLight: "#E8F5E9",
  primaryDark: "#1B5E20",
  secondary: "#FF8F00", // Amber - for attention and actions
  background: "#F8FAF8", // Very light green tint
  white: "#FFFFFF",
  cardBg: "#FFFFFF",
  textPrimary: "#263238", // Dark blue-gray
  textSecondary: "#455A64",
  textTertiary: "#718096",
  border: "#CFD8DC",
  success: "#388E3C",
  warning: "#F57C00",
  error: "#D32F2F",
  info: "#0288D1",
  disabled: "#B0BEC5",
  highlight: "#FFF9C4",
  priceHighlight: "#2E7D32",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },

  header: {
    fontSize: 24,
    fontFamily: "Inter-SemiBold",
    // color: Colors.primary,
    marginBottom: 24,
    textAlign: "center",
    letterSpacing: -0.3,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 24,
  },

  tabs: {
    backgroundColor: Colors.primaryLight,
    width: "48%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 1,
  },

  tabsText: {
    color: Colors.white,
    fontSize: 18,
  },

  activeTypeButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryDark,
    elevation: 2,
  },

  farmCard: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  farmHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  farmName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.dark,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  farmDetails: {
    gap: 6,
  },
  farmDetail: {
    fontSize: 13,
    color: Colors.gray,
  },
  addFarmButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    marginTop: 8,
  },
  addFarmText: {
    fontSize: 14,
    color: Colors.primary,
    marginLeft: 8,
    fontWeight: "500",
  },
});

export default ProductListingForm;

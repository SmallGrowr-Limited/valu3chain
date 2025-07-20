import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export  const CommodityPricesSection = () => {
  // Sample data structure
  const priceData = {
    GRAINS: [
      { commodity: "Yellow maize", price: "47,000", change: -2.1 },
      { commodity: "White maize", price: "45,000", change: -4.3 },
      { commodity: "White beans", price: "103,000", change: -1.9 },
      { commodity: "Brown beans", price: "105,000", change: -4.5 },
      { commodity: "Sorghum (dawa)", price: "49,000", change: -3.9 },
      { commodity: "Soyabeans", price: "83,000", change: -2.3 },
      { commodity: "Long grain rice", price: "45,000", change: 0 },
      { commodity: "Short grain rice", price: "41,000", change: 0 },
    ],
    VEGETABLES: [
      { commodity: "Tomatoes", price: "35,000", change: 5.2 },
      { commodity: "Onions", price: "28,000", change: -1.8 },
      { commodity: "Peppers", price: "42,000", change: 3.4 },
    ],
    TUBERS: [
      { commodity: "Yam", price: "38,000", change: 2.1 },
      { commodity: "Cassava", price: "22,000", change: -0.5 },
      { commodity: "Potatoes", price: "31,000", change: 1.2 },
    ],
  };

  const [selectedCategory, setSelectedCategory] = useState("GRAINS");
  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text style={styles.title}>Weekly Price Alert</Text>
        <Text style={styles.subtitle}>Week 3 - July 2025 • Kaduna Region</Text>
        <MaterialIcons
          name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color="#666"
          style={styles.expandIcon}
        />
      </TouchableOpacity>

      {expanded && (
        <>
          <View style={styles.categoryContainer}>
            {Object.keys(priceData).map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.selectedCategory,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category &&
                      styles.selectedCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionTitle}>{selectedCategory}</Text>

          <View style={styles.tableHeader}>
            <Text style={[styles.headerText, { flex: 3 }]}>Commodity</Text>
            <Text style={[styles.headerText, { flex: 2 }]}>Price (₦)</Text>
            <Text style={[styles.headerText, { flex: 1 }]}>%-WoW</Text>
          </View>

          <ScrollView style={styles.tableScroll}>
            {priceData[selectedCategory].map((item, index) => (
              <View key={index} style={styles.row}>
                <Text style={[styles.cell, { flex: 3 }]}>{item.commodity}</Text>
                <Text style={[styles.cell, { flex: 2 }]}>{item.price}</Text>
                <View
                  style={[
                    styles.cell,
                    { flex: 1, flexDirection: "row", alignItems: "center" },
                  ]}
                >
                  {item.change < 0 && (
                    <>
                      <MaterialIcons
                        name="arrow-drop-down"
                        size={18}
                        color="#E53935"
                      />
                      <Text style={[styles.changeText, { color: "#E53935" }]}>
                        {Math.abs(item.change)}
                      </Text>
                    </>
                  )}
                  {item.change > 0 && (
                    <>
                      <MaterialIcons
                        name="arrow-drop-up"
                        size={18}
                        color="#4CAF50"
                      />
                      <Text style={[styles.changeText, { color: "#4CAF50" }]}>
                        {item.change}
                      </Text>
                    </>
                  )}
                  {item.change === 0 && (
                    <Text style={[styles.changeText, { color: "#757575" }]}>
                      0
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <Text style={styles.footerText}>www.smallgrowr.com</Text>
            <Text style={styles.footerText}>support@smallgrowr.com</Text>
            <Text style={styles.footerText}>For bookings: 0707 375 3283</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    margin: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
  },
  header: {
    padding: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  expandIcon: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  categoryContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: "#f5f5f5",
  },
  selectedCategory: {
    backgroundColor: "#4CAF50",
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
  },
  selectedCategoryText: {
    color: "white",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginTop: 12,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  tableHeader: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f9f9f9",
  },
  headerText: {
    fontWeight: "600",
    color: "#000",
    fontSize: 13,
  },
  tableScroll: {
    maxHeight: 300,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  cell: {
    fontSize: 13,
    color: "#333",
  },
  changeText: {
    fontSize: 13,
    fontWeight: "500",
  },
  footer: {
    padding: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#f9f9f9",
  },
  footerText: {
    fontSize: 11,
    color: "#333",
    marginBottom: 2,
  },
});



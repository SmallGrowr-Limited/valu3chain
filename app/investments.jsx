import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Colors } from "../components/constants/colors";
import {
  MaterialIcons,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const InvestmentDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");

  const investments = [
    {
      id: "1",
      type: "Farm Inputs",
      title: "Premium Hybrid Maize Seeds",
      description:
        "High-yield hybrid maize seeds with 95% germination rate and drought resistance",
      eligibility:
        "Minimum investment: ₦500,000\nFarm size: 5+ hectares\nLocation: Northern regions",
      availability: { start: "2023-09-01", end: "2023-11-15" },
      roi: "18-25%",
      duration: "6 months",
      risk: "Medium",
      image: require("../assets/images/maize.jpeg"),
      category: "seeds",
    },
    {
      id: "2",
      type: "Equipment",
      title: "Tractor Lease Program",
      description:
        "Modern tractors available for seasonal lease with operator and maintenance included",
      eligibility:
        "Minimum investment: ₦1,200,000\nFarm cooperatives preferred",
      availability: { start: "2023-08-15", end: "2024-02-28" },
      roi: "12-15%",
      duration: "12 months",
      risk: "Low",
      image: require("../assets/images/tractor.jpeg"),
      category: "equipment",
    },
    {
      id: "3",
      type: "Funding",
      title: "Cassava Processing Facility",
      description:
        "Equity investment in modern cassava processing plant serving 200 smallholder farmers",
      eligibility: "Minimum investment: ₦2,500,000\nAccredited investors only",
      availability: { start: "2023-10-01", end: "2023-12-31" },
      roi: "22-30%",
      duration: "18 months",
      risk: "High",
      image: require("../assets/images/cassava.jpg"),
      category: "funding",
    },
    {
      id: "4",
      type: "Farm Inputs",
      title: "Organic Fertilizer Package",
      description:
        "Premium organic fertilizer tailored for vegetable production",
      eligibility:
        "Minimum investment: ₦750,000\nMust commit to organic practices",
      availability: { start: "2023-09-15", end: "2024-01-15" },
      roi: "15-20%",
      duration: "8 months",
      risk: "Medium",
      image: require("../assets/images/fertilizer.jpg"),
      category: "inputs",
    },
  ];

  const filteredInvestments =
    activeTab === "all"
      ? investments
      : investments.filter((inv) => inv.category === activeTab);

  const getTypeIcon = (type) => {
    switch (type) {
      case "Farm Inputs":
        return <MaterialIcons name="grass" size={24} color={Colors.primary} />;
      case "Equipment":
        return <FontAwesome name="gears" size={24} color={Colors.primary} />;
      case "Funding":
        return (
          <MaterialCommunityIcons
            name="hand-coin"
            size={24}
            color={Colors.primary}
          />
        );
      default:
        return <Ionicons name="leaf" size={24} color={Colors.primary} />;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recent Investments</Text>
        <TouchableOpacity onPress={() => router.push("/investments/filter")}>
          <Ionicons name="filter" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Investment Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
      >
        <TouchableOpacity
          style={[
            styles.categoryButton,
            activeTab === "all" && styles.activeCategory,
          ]}
          onPress={() => setActiveTab("all")}
        >
          <Text
            style={[
              styles.categoryText,
              activeTab === "all" && styles.activeCategoryText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.categoryButton,
            activeTab === "seeds" && styles.activeCategory,
          ]}
          onPress={() => setActiveTab("seeds")}
        >
          <MaterialIcons
            name="grass"
            size={20}
            color={
              activeTab === "seeds" ? Colors.textOnPrimary : Colors.primary
            }
          />
          <Text
            style={[
              styles.categoryText,
              activeTab === "seeds" && styles.activeCategoryText,
            ]}
          >
            Seeds
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.categoryButton,
            activeTab === "inputs" && styles.activeCategory,
          ]}
          onPress={() => setActiveTab("inputs")}
        >
          <MaterialCommunityIcons
            name="sack"
            size={20}
            color={
              activeTab === "inputs" ? Colors.textOnPrimary : Colors.primary
            }
          />
          <Text
            style={[
              styles.categoryText,
              activeTab === "inputs" && styles.activeCategoryText,
            ]}
          >
            Inputs
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.categoryButton,
            activeTab === "equipment" && styles.activeCategory,
          ]}
          onPress={() => setActiveTab("equipment")}
        >
          <FontAwesome
            name="gears"
            size={20}
            color={
              activeTab === "equipment" ? Colors.textOnPrimary : Colors.primary
            }
          />
          <Text
            style={[
              styles.categoryText,
              activeTab === "equipment" && styles.activeCategoryText,
            ]}
          >
            Equipment
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.categoryButton,
            activeTab === "funding" && styles.activeCategory,
          ]}
          onPress={() => setActiveTab("funding")}
        >
          <MaterialCommunityIcons
            name="hand-coin"
            size={20}
            color={
              activeTab === "funding" ? Colors.textOnPrimary : Colors.primary
            }
          />
          <Text
            style={[
              styles.categoryText,
              activeTab === "funding" && styles.activeCategoryText,
            ]}
          >
            Funding
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Investment Opportunities */}
      <ScrollView style={styles.investmentContainer}>
        {filteredInvestments.map((investment) => (
          <TouchableOpacity
            key={investment.id}
            style={styles.investmentCard}
            onPress={() => router.push(`/investments`)}
            // onPress={() => router.push(`/investments/${investment.id}`)}
          >
            <Image source={investment.image} style={styles.investmentImage} />

            <View style={styles.investmentContent}>
              <View style={styles.investmentHeader}>
                {getTypeIcon(investment.type)}
                <Text style={styles.investmentType}>{investment.type}</Text>
                <View
                  style={[
                    styles.roiPill,
                    investment.risk === "High"
                      ? styles.highRisk
                      : investment.risk === "Medium"
                      ? styles.mediumRisk
                      : styles.lowRisk,
                  ]}
                >
                  <Text style={styles.roiText}>{investment.roi} ROI</Text>
                </View>
              </View>

              <Text style={styles.investmentTitle}>{investment.title}</Text>

              <Text style={styles.investmentDescription} numberOfLines={2}>
                {investment.description}
              </Text>

              <View style={styles.detailRow}>
                <MaterialIcons
                  name="calendar-today"
                  size={16}
                  color={Colors.secondaryText}
                />
                <Text style={styles.detailText}>
                  {formatDate(investment.availability.start)} -{" "}
                  {formatDate(investment.availability.end)}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={16}
                  color={Colors.secondaryText}
                />
                <Text style={styles.detailText}>{investment.duration}</Text>
              </View>

              <View style={styles.detailRow}>
                <MaterialIcons
                  name="assessment"
                  size={16}
                  color={Colors.secondaryText}
                />
                <Text style={styles.detailText}>Risk: {investment.risk}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingTop: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primaryText,
  },
  categoryContainer: {
    marginBottom: 16,
    maxHeight: 50,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  activeCategory: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    marginLeft: 6,
    color: Colors.primaryText,
    fontWeight: "500",
  },
  activeCategoryText: {
    color: Colors.textOnPrimary,
  },
  investmentContainer: {
    flex: 1,
    marginBottom: 16,
  },
  investmentCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  investmentImage: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },
  investmentContent: {
    padding: 16,
  },
  investmentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  investmentType: {
    marginLeft: 8,
    color: Colors.primaryText,
    fontWeight: "600",
  },
  roiPill: {
    marginLeft: "auto",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  lowRisk: {
    backgroundColor: Colors.successLight,
  },
  mediumRisk: {
    backgroundColor: Colors.warningLight,
  },
  highRisk: {
    backgroundColor: Colors.dangerLight,
  },
  roiText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  investmentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primaryText,
    marginBottom: 8,
  },
  investmentDescription: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginBottom: 12,
    lineHeight: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.secondaryText,
  },
});

export default InvestmentDashboard;

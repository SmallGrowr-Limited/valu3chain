import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useState, useContext } from "react";
import { Colors } from "../../../components/constants/colors";
import InvestmentCard from "../../../components/elements/InvestmentCard";
import AnalyticsChart from "../../../components/elements/AnalyticsChart";
import ROIWidget from "../../../components/elements/ROIWidget";
import SearchFilter from "../../../components/elements/SearchFilter";

// import { AuthContext } from "../../context/AuthContext";

export default function Dashboard() {
  const router = useRouter();
  // const { user } = useContext(AuthContext);
  const [filter, setFilter] = useState("all");

  // Sample data - replace with actual API calls
  const portfolioData = {
    totalInvested: 1250000,
    activeInvestments: 18,
    projectedROI: 22.5,
    recentOpportunities: [
      {
        id: 1,
        category: "Cabbages",
        location: "Zaria",
        amount: 75000,
        farmers: 12,
        genderRatio: { male: 0.4, female: 0.6 },
        status: "Active",
      },
      {
        id: 2,
        category: "Maize",
        location: "Kafanchan",
        amount: 120000,
        farmers: 24,
        genderRatio: { male: 0.6, female: 0.4 },
        status: "Active",
      },
      {
        id: 3,
        category: "Rice",
        location: "Saminaka",
        amount: 250000,
        farmers: 24,
        genderRatio: { male: 0.6, female: 0.4 },
        status: "Active",
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.title}>Welcome, {user?.name}</Text> */}
        <Text style={styles.subtitle}>Ecosystem Partner Dashboard</Text>
      </View>

      {/* AI Query Button */}
      <TouchableOpacity
        style={styles.aiButton}
        onPress={() => router.push("/ecosystem/aiQuery")}
      >
        <Text style={styles.aiButtonText}>AI Market Analysis</Text>
      </TouchableOpacity>

      {/* Portfolio Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Investment Portfolio Summary</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              ₦{(portfolioData.totalInvested / 1000).toFixed(0)}K
            </Text>
            <Text style={styles.statLabel}>Total Invested</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {portfolioData.activeInvestments}
            </Text>
            <Text style={styles.statLabel}>Active Investments</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{portfolioData.projectedROI}%</Text>
            <Text style={styles.statLabel}>Projected ROI</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/ecosystem/purchaseOrder")}
          >
            <Text style={styles.actionText}>Create  Order</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/ecosystem/fundAllocation")}
          >
            <Text style={styles.actionText}>Allocate Funds</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/ecosystem/returns")}
          >
            <Text style={styles.actionText}>Returns</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/ecosystem/productListing")}
          >
            <Text style={styles.actionText}>Product Listing</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Analytics Preview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Market Performance</Text>
        <AnalyticsChart height={200} />
      </View>

      {/* Market Opportunities represent recent farmers demand */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Market Opportunities</Text>
          {/* <SearchFilter currentFilter={filter} onFilterChange={setFilter} /> */}
        </View>
        {portfolioData.recentOpportunities.map((opportunity) => (
          <InvestmentCard
            key={opportunity.id}
            data={opportunity}
            
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primaryText,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.secondaryText,
    marginTop: 4,
  },
  aiButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  aiButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primaryText,
    marginBottom: 5,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    width: "30%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.secondaryText,
    marginTop: 4,
    textAlign: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom:10,
  },
  actionButton: {
    backgroundColor: Colors.secondary,
    padding: 16,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  actionText: {
    color: "white",
    fontWeight: "bold",
  },
});

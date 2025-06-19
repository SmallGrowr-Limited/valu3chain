import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "../../../components/constants/colors";
import { useState } from "react";

export default function AIQuery() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResults({
        opportunities: [
          {
            category: "Rice",
            location: "Zaria",
            potential: "High",
            avgInvestment: 65000,
            farmersNeeded: 15,
            projectedROI: "18-24%",
          },
          {
            category: "Maize",
            location: "Saminaka",
            potential: "Medium",
            avgInvestment: 45000,
            farmersNeeded: 25,
            projectedROI: "12-15%",
          },
        ],
        insights: [
          "High demand for Rice inputs among female farmers in Zaria",
          "Maize farmers in Saminaka showing increased productivity with improved seeds",
        ],
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.navigate("/ecosystem/dashboard")}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Fund Allocation</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>AI Market Opportunity Finder</Text>
          <Text style={styles.subtitle}>
            Discover investment opportunities without accessing personal farmer
            data
          </Text>

          <TextInput
            style={styles.input}
            placeholder="E.g. 'Rice farmers in Zaria needing feed'"
            value={query}
            onChangeText={setQuery}
            multiline
          />

          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
            disabled={isLoading}
          >
            <Text style={styles.searchButtonText}>
              {isLoading ? "Analyzing..." : "Find Opportunities"}
            </Text>
          </TouchableOpacity>

          {results && (
            <View style={styles.resultsContainer}>
              <Text style={styles.resultsTitle}>Opportunities Found</Text>

              {results.opportunities.map((opp, index) => (
                <View key={index} style={styles.opportunityCard}>
                  <Text style={styles.oppCategory}>
                    {opp.category} - {opp.location}
                  </Text>
                  <Text style={styles.oppPotential}>
                    Potential: {opp.potential}
                  </Text>
                  <View style={styles.oppDetails}>
                    <Text>Avg Investment: ${opp.avgInvestment}</Text>
                    <Text>Farmers Needed: {opp.farmersNeeded}</Text>
                    <Text>Projected ROI: {opp.projectedROI}</Text>
                  </View>
                </View>
              ))}

              <Text style={styles.resultsTitle}>Market Insights</Text>
              <View style={styles.insightsContainer}>
                {results.insights.map((insight, index) => (
                  <Text key={index} style={styles.insight}>
                    • {insight}
                  </Text>
                ))}
              </View>
            </View>
          )}

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: Colors.background,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primaryText,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primaryText,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.secondaryText,
    marginBottom: 24,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
    textAlignVertical: "top",
    fontSize: 16,
    color: Colors.primaryText,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  searchButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  searchButtonText: {
    color: Colors.textOnPrimary,
    fontWeight: "bold",
    fontSize: 18,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primaryText,
    marginBottom: 16,
  },
  opportunityCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  oppCategory: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primaryText,
    marginBottom: 8,
  },
  oppPotential: {
    fontSize: 16,
    color: Colors.secondary,
    marginBottom: 8,
    fontWeight: "600",
  },
  oppDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  insightsContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  insight: {
    fontSize: 16,
    color: Colors.primaryText,
    marginBottom: 8,
    lineHeight: 24,
  },
  closeButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 20,
  },
  closeButtonText: {
    color: Colors.textOnSecondary,
    fontWeight: "bold",
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.primary,
  },
  // Add these new styles for better visual hierarchy
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionIcon: {
    marginRight: 8,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  tag: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: Colors.primaryDark,
    fontSize: 14,
  },
  // Add these for the results state
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.secondaryText,
    textAlign: "center",
    marginTop: 16,
  },
});

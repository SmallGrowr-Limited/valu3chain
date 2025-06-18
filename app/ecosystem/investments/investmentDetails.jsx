import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../../components/constants/colors";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import AnalyticsChart from "../../../components/elements/AnalyticsChart";

const InvestmentDetails = ({ route, navigation }) => {
  // Get investment data from navigation params
  const investment = route.params?.investment || {
    id: 1,
    category: "Dairy",
    location: "Nakuru",
    amount: 75000,
    farmers: 12,
    genderRatio: { male: 0.4, female: 0.6 },
    status: "active",
    startDate: "2023-03-15",
    duration: "12 months",
    projectedROI: 18,
    currentROI: 15.5,
    riskLevel: "medium",
    description:
      "Dairy farming expansion with improved cattle breeds and feeding systems",
    progress: 65,
    updates: [
      {
        date: "2023-06-15",
        title: "Feed distribution completed",
        description: "Distributed 500kg of premium animal feed to all farmers",
      },
      {
        date: "2023-05-28",
        title: "Veterinary services",
        description: "Conducted monthly health check for all cattle",
      },
    ],
    performanceData: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      data: [5, 8, 12, 10, 15, 15.5],
    },
  };

  const renderRiskIndicator = () => {
    let riskColor, riskIcon;
    switch (investment.riskLevel) {
      case "high":
        riskColor = Colors.danger;
        riskIcon = "alert-circle";
        break;
      case "medium":
        riskColor = Colors.warning;
        riskIcon = "alert";
        break;
      default:
        riskColor = Colors.success;
        riskIcon = "checkmark-circle";
    }

    return (
      <View style={[styles.riskIndicator, { backgroundColor: riskColor }]}>
        <Ionicons name={riskIcon} size={16} color={Colors.textOnPrimary} />
        <Text style={styles.riskText}>{investment.riskLevel}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>{investment.category} Investment</Text>
        {renderRiskIndicator()}
      </View>

      {/* Key Metrics */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Amount Invested</Text>
          <Text style={styles.metricValue}>
            ${investment.amount.toLocaleString()}
          </Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Current ROI</Text>
          <Text
            style={[
              styles.metricValue,
              investment.currentROI >= investment.projectedROI
                ? styles.positiveROI
                : styles.negativeROI,
            ]}
          >
            {investment.currentROI}%
          </Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Projected ROI</Text>
          <Text style={styles.metricValue}>{investment.projectedROI}%</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.sectionTitle}>Project Progress</Text>
          <Text style={styles.progressText}>
            {investment.progress}% complete
          </Text>
        </View>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${investment.progress}%` },
            ]}
          />
        </View>
      </View>

      {/* Performance Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Performance Trend</Text>
        <AnalyticsChart
          height={200}
          type="line"
          data={investment.performanceData.data}
          labels={investment.performanceData.labels}
        />
      </View>

      {/* Details Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Investment Details</Text>
        <View style={styles.detailRow}>
          <MaterialIcons name="location-on" size={20} color={Colors.primary} />
          <Text style={styles.detailText}>{investment.location} Region</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="people" size={20} color={Colors.primary} />
          <Text style={styles.detailText}>
            {investment.farmers} farmers ({investment.genderRatio.female * 100}%
            women)
          </Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="date-range" size={20} color={Colors.primary} />
          <Text style={styles.detailText}>
            {investment.startDate} - {investment.duration}
          </Text>
        </View>
        <Text style={styles.descriptionText}>{investment.description}</Text>
      </View>

      {/* Updates Section */}
      <View style={styles.updatesContainer}>
        <Text style={styles.sectionTitle}>Recent Updates</Text>
        {investment.updates.map((update, index) => (
          <View key={index} style={styles.updateCard}>
            <View style={styles.updateHeader}>
              <FontAwesome
                name="newspaper-o"
                size={16}
                color={Colors.primary}
              />
              <Text style={styles.updateDate}>{update.date}</Text>
            </View>
            <Text style={styles.updateTitle}>{update.title}</Text>
            <Text style={styles.updateDescription}>{update.description}</Text>
          </View>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
          <Text style={styles.actionButtonText}>View Farmers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]}>
          <Text style={styles.actionButtonText}>Financial Report</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primaryText,
  },
  riskIndicator: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  riskText: {
    color: Colors.textOnPrimary,
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  metricCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    width: "30%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  metricLabel: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  positiveROI: {
    color: Colors.success,
  },
  negativeROI: {
    color: Colors.warning,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primaryText,
  },
  progressText: {
    color: Colors.primary,
    fontWeight: "600",
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: Colors.lightGray,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  chartContainer: {
    marginBottom: 24,
  },
  detailsContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  detailText: {
    fontSize: 16,
    color: Colors.primaryText,
    marginLeft: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.primaryText,
    lineHeight: 22,
    marginTop: 12,
  },
  updatesContainer: {
    marginBottom: 24,
  },
  updateCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  updateHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  updateDate: {
    fontSize: 12,
    color: Colors.secondaryText,
    marginLeft: 8,
  },
  updateTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primaryText,
    marginBottom: 4,
  },
  updateDescription: {
    fontSize: 14,
    color: Colors.secondaryText,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  actionButton: {
    borderRadius: 12,
    padding: 16,
    width: "48%",
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
  },
  actionButtonText: {
    color: Colors.textOnPrimary,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default InvestmentDetails;

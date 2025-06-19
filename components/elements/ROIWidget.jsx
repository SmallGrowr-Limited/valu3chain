import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

const ROIWidget = ({ data, onReinvest, onDetails }) => {
  // Calculate percentage for the progress bar
  const progressPercentage = Math.min(
    Math.max((data.currentROI / data.targetROI) * 100, 0),
    100
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Investment Returns</Text>
        {data.timeRemaining && (
          <Text style={styles.timeRemaining}>
            {data.timeRemaining} remaining
          </Text>
        )}
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.metricContainer}>
          <Text style={styles.metricLabel}>Current ROI</Text>
          <Text
            style={[
              styles.metricValue,
              data.currentROI >= data.targetROI
                ? styles.positive
                : styles.negative,
            ]}
          >
            {data.currentROI}%
          </Text>
        </View>

        <View style={styles.metricContainer}>
          <Text style={styles.metricLabel}>Target ROI</Text>
          <Text style={styles.metricValue}>{data.targetROI}%</Text>
        </View>

        <View style={styles.metricContainer}>
          <Text style={styles.metricLabel}>Amount</Text>
          <Text style={styles.metricValue}>
            ₦{data.amount}
          </Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarFill,
            {
              width: `${progressPercentage}%`,
              backgroundColor:
                progressPercentage >= 100 ? Colors.success : Colors.primary,
            },
          ]}
        />
      </View>

      {/* Performance indicator */}
      <View style={styles.performanceContainer}>
        <Text style={styles.performanceText}>
          Performance:{" "}
          <Text
            style={
              data.currentROI >= data.targetROI
                ? styles.positive
                : styles.negative
            }
          >
            {data.currentROI >= data.targetROI ? "Exceeding" : "Below"} Target
          </Text>
        </Text>
      </View>

      {/* Action buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.reinvestButton]}
          onPress={onReinvest}
        >
          <Text style={styles.buttonText}>Reinvest</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.detailsButton]}
          onPress={onDetails}
        >
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Default props in case some data isn't provided
ROIWidget.defaultProps = {
  data: {
    currentROI: 0,
    targetROI: 0,
    amount: 0,
    timeRemaining: "",
  },
  onReinvest: () => {},
  onDetails: () => {},
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primaryText,
  },
  timeRemaining: {
    fontSize: 14,
    color: Colors.secondaryText,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  metricContainer: {
    alignItems: "center",
  },
  metricLabel: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primaryText,
  },
  positive: {
    color: Colors.success,
  },
  negative: {
    color: Colors.warning,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: Colors.lightGray,
    borderRadius: 4,
    marginBottom: 12,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  performanceContainer: {
    marginBottom: 16,
  },
  performanceText: {
    fontSize: 14,
    color: Colors.primaryText,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 4,
  },
  reinvestButton: {
    backgroundColor: Colors.secondary,
  },
  detailsButton: {
    backgroundColor: Colors.primary,
  },
  buttonText: {
    color: Colors.textOnSecondary,
    fontWeight: "bold",
  },
});

export default ROIWidget;

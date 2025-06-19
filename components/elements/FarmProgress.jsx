import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../constants/colors";
import { ProgressChart } from "react-native-chart-kit";

const FarmProgress = ({ data }) => {
  // Prepare chart data
  const chartData = {
    labels: ["Distributed", "In Transit", "Delivered"],
    colors: [Colors.primary, Colors.warning, Colors.success],
    data: [
      data.distributed / data.total,
      data.inTransit / data.total,
      data.delivered / data.total,
    ],
  };

  // Prepare status items
  const statusItems = [
    { label: "Total Inputs", value: data.total, color: Colors.primaryText },
    { label: "Distributed", value: data.distributed, color: Colors.primary },
    { label: "In Transit", value: data.inTransit, color: Colors.warning },
    { label: "Delivered", value: data.delivered, color: Colors.success },
    {
      label: "Remaining",
      value: data.total - data.distributed - data.inTransit - data.delivered,
      color: Colors.gray,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Input Distribution Progress</Text>

      {/* Circular progress chart */}
      <View style={styles.chartContainer}>
        <ProgressChart
          data={chartData}
          width={Dimensions.get("window").width - 60}
          height={200}
          chartConfig={{
            backgroundColor: Colors.background,
            backgroundGradientFrom: Colors.background,
            backgroundGradientTo: Colors.background,
            decimalPlaces: 0,
            color: (opacity = 1, index) => chartData.colors[index],
            labelColor: (opacity = 1) => Colors.primaryText,
          }}
          hideLegend={true}
          style={styles.chart}
        />
      </View>

      {/* Legend */}
      <View style={styles.legendContainer}>
        {chartData.labels.map((label, index) => (
          <View key={label} style={styles.legendItem}>
            <View
              style={[
                styles.legendColor,
                { backgroundColor: chartData.colors[index] },
              ]}
            />
            <Text style={styles.legendText}>{label}</Text>
          </View>
        ))}
      </View>

      {/* Status breakdown */}
      <View style={styles.statusContainer}>
        {statusItems.map((item) => (
          <View key={item.label} style={styles.statusItem}>
            <View style={styles.statusLabelContainer}>
              <View
                style={[styles.statusColor, { backgroundColor: item.color }]}
              />
              <Text style={styles.statusLabel}>{item.label}</Text>
            </View>
            <Text style={styles.statusValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      {/* Timeline */}
      {data.timeline && (
        <View style={styles.timelineContainer}>
          <Text style={styles.timelineTitle}>Recent Activity</Text>
          {data.timeline.map((event, index) => (
            <View key={index} style={styles.timelineItem}>
              <View
                style={[
                  styles.timelineDot,
                  {
                    backgroundColor:
                      event.status === "delivered"
                        ? Colors.success
                        : event.status === "distributed"
                        ? Colors.primary
                        : Colors.warning,
                  },
                ]}
              />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineEvent}>{event.event}</Text>
                <Text style={styles.timelineDate}>{event.date}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

// Default props
FarmProgress.defaultProps = {
  data: {
    total: 100,
    distributed: 40,
    inTransit: 30,
    delivered: 20,
    timeline: [
      {
        event: "50 bags of fertilizer distributed to Zaria",
        date: "May 15, 2023",
        status: "distributed",
      },
      {
        event: "20 irrigation kits delivered to Kasimu",
        date: "May 10, 2023",
        status: "delivered",
      },
      {
        event: "30 seed packages in transit to Rukayya",
        date: "May 5, 2023",
        status: "inTransit",
      },
    ],
  },
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primaryText,
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  chart: {
    borderRadius: 16,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    flexWrap: "wrap",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    marginVertical: 4,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 14,
    color: Colors.secondaryText,
  },
  statusContainer: {
    marginBottom: 16,
  },
  statusItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  statusLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusLabel: {
    fontSize: 14,
    color: Colors.primaryText,
  },
  statusValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.primaryText,
  },
  timelineContainer: {
    marginTop: 8,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primaryText,
    marginBottom: 12,
  },
  timelineItem: {
    flexDirection: "row",
    marginBottom: 12,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
  },
  timelineEvent: {
    fontSize: 14,
    color: Colors.primaryText,
    marginBottom: 2,
  },
  timelineDate: {
    fontSize: 12,
    color: Colors.secondaryText,
  },
});

export default FarmProgress;

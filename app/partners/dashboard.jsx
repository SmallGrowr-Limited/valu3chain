import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Dashboard = () => {
  // Sample data
  const stats = [
    { title: "Total Users", value: "1,234", icon: "people", color: "#4CAF50" },
    {
      title: "Revenue",
      value: "$8,567",
      icon: "attach-money",
      color: "#2196F3",
    },
    { title: "Tasks", value: "32/50", icon: "list-alt", color: "#FF9800" },
    { title: "Messages", value: "12", icon: "message", color: "#9C27B0" },
  ];

  const recentActivities = [
    { id: 1, title: "New user registered", time: "2 mins ago" },
    { id: 2, title: "Project X completed", time: "1 hour ago" },
    { id: 3, title: "Payment received", time: "3 hours ago" },
    { id: 4, title: "New task assigned", time: "5 hours ago" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity>
          <MaterialIcons name="notifications" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.statsContainer}
      >
        {stats.map((stat, index) => (
          <View
            key={index}
            style={[styles.statCard, { backgroundColor: stat.color }]}
          >
            <MaterialIcons name={stat.icon} size={30} color="white" />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {/* Chart Section (Placeholder) */}
        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Performance Overview</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.placeholderText}>
              Chart will be displayed here
            </Text>
          </View>
        </View>

        {/* Recent Activities */}
        <View style={styles.activitiesContainer}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          {recentActivities.map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <View style={styles.activityDot} />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="dashboard" size={24} color="#2196F3" />
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="analytics" size={24} color="#888" />
          <Text style={styles.navText}>Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="settings" size={24} color="#888" />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    elevation: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  statsContainer: {
    paddingVertical: 16,
    paddingLeft: 16,
  },
  statCard: {
    width: 150,
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 8,
  },
  statTitle: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  chartContainer: {
    marginBottom: 24,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: "white",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
  },
  placeholderText: {
    color: "#888",
  },
  activitiesContainer: {
    marginBottom: 24,
  },
  activityItem: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: "center",
    elevation: 1,
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2196F3",
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    color: "#333",
  },
  activityTime: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default Dashboard;

import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../../../components/agent-components/Header";
import { colors } from "../../../../components/agent-components/constants/colors";

// Mock data - replace with your actual data source
const auditData = [
  {
    id: "1",
    farmerId: "1",
    farmerName: "Kwame Yeboah",
    farmName: "Yeboah Main Farm",
    scheduledDate: "2023-11-15",
    completedDate: "2023-11-15",
    status: "completed",
    progress: 100,
    findings: "Good soil quality, proper irrigation",
    recommendations: "Add organic fertilizer",
  },
  {
    id: "2",
    farmerId: "2",
    farmerName: "Adwoa Mensah",
    farmName: "Mensah Vegetable Farm",
    scheduledDate: "2023-11-20",
    completedDate: null,
    status: "scheduled",
    progress: 0,
    findings: "",
    recommendations: "",
  },
  {
    id: "3",
    farmerId: "3",
    farmerName: "Kofi Asante",
    farmName: "Asante Maize Farm",
    scheduledDate: "2023-11-25",
    completedDate: null,
    status: "scheduled",
    progress: 0,
    findings: "",
    recommendations: "",
  },
  {
    id: "4",
    farmerId: "1",
    farmerName: "Kwame Yeboah",
    farmName: "Yeboah Vegetable Farm",
    scheduledDate: "2023-12-05",
    completedDate: null,
    status: "pending",
    progress: 0,
    findings: "",
    recommendations: "",
  },
];

export default function FarmAudit() {
  const router = useRouter();
  const [audits, setAudits] = useState(auditData);
  const [activeTab, setActiveTab] = useState("scheduled");

  // Calculate audit statistics
  const completedAudits = audits.filter((a) => a.status === "completed").length;
  const totalAudits = audits.length;
  const completionPercentage = Math.round(
    (completedAudits / totalAudits) * 100
  );

  const filteredAudits = audits.filter((audit) => {
    if (activeTab === "scheduled") return audit.status !== "completed";
    if (activeTab === "completed") return audit.status === "completed";
    return true;
  });

  const handleStartAudit = (auditId) => {
    router.push(`/extension-agent/home/audits/conduct/${auditId}`);
  };

  const renderAuditItem = ({ item }) => (
    <TouchableOpacity
      style={styles.auditCard}
      onPress={() => router.push(`extension-agent/home/audits/${item.id}`)}
    >
      <View style={styles.auditHeader}>
        <View>
          <Text style={styles.farmerName}>{item.farmerName}</Text>
          <Text style={styles.farmName}>{item.farmName}</Text>
        </View>
        {item.status === "completed" ? (
          <View style={[styles.statusBadge, styles.completedBadge]}>
            <Text style={styles.statusText}>Completed</Text>
          </View>
        ) : (
          <View style={[styles.statusBadge, styles.pendingBadge]}>
            <Text style={styles.statusText}>
              {item.status === "scheduled" ? "Scheduled" : "Pending"}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.auditDetails}>
        <View style={styles.detailItem}>
          <Ionicons name="calendar" size={16} color={colors.gray} />
          <Text style={styles.detailText}>
            {item.scheduledDate}{" "}
            {item.status === "completed" &&
              `(Completed: ${item.completedDate})`}
          </Text>
        </View>

        {item.status !== "completed" && (
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => handleStartAudit(item.id)}
          >
            <MaterialCommunityIcons
              name="clipboard-check"
              size={18}
              color={colors.white}
            />
            <Text style={styles.startButtonText}>Start Audit</Text>
          </TouchableOpacity>
        )}
      </View>

      {item.status === "completed" && (
        <View style={styles.findingsContainer}>
          <Text style={styles.findingsTitle}>Key Findings:</Text>
          <Text style={styles.findingsText}>{item.findings}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Farm Audits"
        rightAction={
          <TouchableOpacity
            onPress={() =>
              router.push("extension-agent/home/audits/schedule")
            }
          >
            <Ionicons name="add" size={24} color={colors.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Audit Progress */}
        <View style={styles.progressContainer}>
          <Text style={styles.sectionTitle}>Audit Completion Progress</Text>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${completionPercentage}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {completedAudits} of {totalAudits} audits completed (
              {completionPercentage}%)
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{completedAudits}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {audits.filter((a) => a.status === "scheduled").length}
              </Text>
              <Text style={styles.statLabel}>Scheduled</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {audits.filter((a) => a.status === "pending").length}
              </Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
          </View>
        </View>

        {/* Audit List Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "scheduled" && styles.activeTab]}
            onPress={() => setActiveTab("scheduled")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "scheduled" && styles.activeTabText,
              ]}
            >
              Scheduled/Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "completed" && styles.activeTab]}
            onPress={() => setActiveTab("completed")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "completed" && styles.activeTabText,
              ]}
            >
              Completed
            </Text>
          </TouchableOpacity>
        </View>

        {/* Audits List */}
        {filteredAudits.length > 0 ? (
          <FlatList
            data={filteredAudits}
            renderItem={renderAuditItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              size={48}
              color={colors.lightGray}
            />
            <Text style={styles.emptyText}>
              {activeTab === "completed"
                ? "No completed audits"
                : "No scheduled audits"}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  progressContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark,
    marginBottom: 12,
  },
  progressBarContainer: {
    marginBottom: 16,
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: colors.lightGray,
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    color: colors.gray,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray,
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 1,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.gray,
  },
  activeTabText: {
    color: colors.white,
  },
  listContainer: {
    marginBottom: 16,
  },
  auditCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
  },
  auditHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  farmerName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark,
  },
  farmName: {
    fontSize: 14,
    color: colors.gray,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedBadge: {
    backgroundColor: colors.successLight,
  },
  pendingBadge: {
    backgroundColor: colors.warningLight,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  auditDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: colors.gray,
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  startButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "500",
  },
  findingsContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  findingsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.dark,
    marginBottom: 4,
  },
  findingsText: {
    fontSize: 13,
    color: colors.gray,
    lineHeight: 18,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 1,
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray,
    marginTop: 16,
  },
  successLight: {
    backgroundColor: "#E8F5E9",
  },
  warningLight: {
    backgroundColor: "#FFF3E0",
  },
});

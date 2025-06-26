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
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Header from "../../../../components/agent-components/Header";
import { colors } from "../../../../components/agent-components/constants/colors";

// Mock data - replace with your actual data source
const aggregatedInputs = [
  {
    id: "fert-2023-11",
    type: "Fertilizer (NPK)",
    totalRequests: 24,
    totalQuantity: "1200 kg",
    status: "Pending Approval",
    farmers: 18,
    dateRange: "Nov 1-15, 2023",
    inputs: [
      { farmerName: "Kwame Yeboah", quantity: "50 kg", status: "Pending" },
      { farmerName: "Adwoa Mensah", quantity: "40 kg", status: "Pending" },
      { farmerName: "Kofi Asante", quantity: "60 kg", status: "Pending" },
    ],
  },
  {
    id: "seed-2023-11",
    type: "Maize Seeds",
    totalRequests: 15,
    totalQuantity: "150 kg",
    status: "Approved",
    farmers: 15,
    dateRange: "Nov 1-10, 2023",
    inputs: [
      { farmerName: "Yaw Osei", quantity: "10 kg", status: "Approved" },
      { farmerName: "Ama Boateng", quantity: "15 kg", status: "Approved" },
    ],
  },
  {
    id: "pest-2023-11",
    type: "Pesticides",
    totalRequests: 8,
    totalQuantity: "40 liters",
    status: "Partially Delivered",
    farmers: 8,
    dateRange: "Nov 5-12, 2023",
    inputs: [
      { farmerName: "Kwame Yeboah", quantity: "5 liters", status: "Delivered" },
      { farmerName: "Esi Johnson", quantity: "5 liters", status: "In Transit" },
    ],
  },
];

export default function InputAggregation() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [expandedGroup, setExpandedGroup] = useState(null);

  const filteredGroups =
    activeTab === "all"
      ? aggregatedInputs
      : aggregatedInputs.filter((group) =>
          group.status.toLowerCase().includes(activeTab.toLowerCase())
        );

  const toggleExpand = (groupId) => {
    setExpandedGroup(expandedGroup === groupId ? null : groupId);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending approval":
        return colors.warning;
      case "approved":
        return colors.primary;
      case "partially delivered":
        return colors.info;
      case "fully delivered":
        return colors.success;
      default:
        return colors.gray;
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.groupCard}>
      <TouchableOpacity onPress={() => toggleExpand(item.id)}>
        <View style={styles.groupHeader}>
          <View style={styles.groupInfo}>
            <MaterialCommunityIcons
              name={
                item.type.includes("Fertilizer")
                  ? "sack"
                  : item.type.includes("Seed")
                  ? "seed"
                  : "spray"
              }
              size={24}
              color={colors.primary}
            />
            <View style={styles.groupText}>
              <Text style={styles.groupTitle}>{item.type}</Text>
              <Text style={styles.groupSubtitle}>
                {item.totalQuantity} • {item.farmers} farmers • {item.dateRange}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(item.status) },
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </TouchableOpacity>

      {expandedGroup === item.id && (
        <View style={styles.expandedContent}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{item.totalRequests}</Text>
              <Text style={styles.statLabel}>Requests</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{item.totalQuantity}</Text>
              <Text style={styles.statLabel}>Total Quantity</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{item.farmers}</Text>
              <Text style={styles.statLabel}>Farmers</Text>
            </View>
          </View>

          <Text style={styles.subsectionTitle}>Individual Requests</Text>
          <FlatList
            data={item.inputs}
            renderItem={({ item: input }) => (
              <View style={styles.inputItem}>
                <Text style={styles.inputFarmer}>{input.farmerName}</Text>
                <Text style={styles.inputQuantity}>{input.quantity}</Text>
                <View
                  style={[
                    styles.inputStatus,
                    { backgroundColor: getStatusColor(input.status) },
                  ]}
                >
                  <Text style={styles.inputStatusText}>{input.status}</Text>
                </View>
              </View>
            )}
            keyExtractor={(input, index) => index.toString()}
            scrollEnabled={false}
          />

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push(`/inputs/aggregate/${item.id}`)}
            >
              <MaterialIcons name="list-alt" size={20} color={colors.white} />
              <Text style={styles.actionButtonText}>View Full Report</Text>
            </TouchableOpacity>

            {item.status === "Pending Approval" && (
              <TouchableOpacity
                style={[styles.actionButton, styles.approveButton]}
                onPress={() =>
                  router.push(`/inputs/approve-aggregate/${item.id}`)
                }
              >
                <MaterialIcons
                  name="check-circle"
                  size={20}
                  color={colors.white}
                />
                <Text style={styles.actionButtonText}>Approve Batch</Text>
              </TouchableOpacity>
            )}

            {item.status === "Approved" && (
              <TouchableOpacity
                style={[styles.actionButton, styles.deliverButton]}
                onPress={() =>
                  router.push(`/inputs/schedule-delivery/${item.id}`)
                }
              >
                <MaterialCommunityIcons
                  name="truck-delivery"
                  size={20}
                  color={colors.white}
                />
                <Text style={styles.actionButtonText}>Schedule Delivery</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Input Aggregation"
        rightAction={
          <TouchableOpacity
            onPress={() => router.push("/extension-agent/home/inputs/aggregate-requests")}
          >
            <Ionicons name="add" size={24} color={colors.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Filter Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "all" && styles.activeTab]}
            onPress={() => setActiveTab("all")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "all" && styles.activeTabText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "pending" && styles.activeTab]}
            onPress={() => setActiveTab("pending")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "pending" && styles.activeTabText,
              ]}
            >
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "approved" && styles.activeTab]}
            onPress={() => setActiveTab("approved")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "approved" && styles.activeTabText,
              ]}
            >
              Approved
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "delivered" && styles.activeTab]}
            onPress={() => setActiveTab("delivered")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "delivered" && styles.activeTabText,
              ]}
            >
              Delivery
            </Text>
          </TouchableOpacity>
        </View>

        {/* Summary Stats */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>3</Text>
            <Text style={styles.summaryLabel}>Input Types</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>47</Text>
            <Text style={styles.summaryLabel}>Total Requests</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>32</Text>
            <Text style={styles.summaryLabel}>Farmers</Text>
          </View>
        </View>

        {/* Aggregated Groups */}
        {filteredGroups.length > 0 ? (
          <FlatList
            data={filteredGroups}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="tractor"
              size={48}
              color={colors.lightGray}
            />
            <Text style={styles.emptyText}>No aggregated inputs found</Text>
            <Text style={styles.emptySubtext}>
              Try creating a new aggregation
            </Text>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/inputs/aggregate-requests")}
            >
              <Text style={styles.addButtonText}>Create New Aggregation</Text>
            </TouchableOpacity>
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
  summaryCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
  },
  summaryItem: {
    alignItems: "center",
    flex: 1,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.gray,
  },
  listContainer: {
    marginBottom: 16,
  },
  groupCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 1,
    overflow: "hidden",
  },
  groupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  groupInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  groupText: {
    flex: 1,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark,
  },
  groupSubtitle: {
    fontSize: 13,
    color: colors.gray,
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.white,
  },
  expandedContent: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.dark,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.dark,
    marginTop: 8,
    marginBottom: 12,
  },
  inputItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  inputFarmer: {
    flex: 1,
    fontSize: 14,
    color: colors.dark,
  },
  inputQuantity: {
    width: 80,
    fontSize: 14,
    color: colors.gray,
    textAlign: "right",
  },
  inputStatus: {
    width: 100,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: "center",
    marginLeft: 8,
  },
  inputStatusText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.white,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  approveButton: {
    backgroundColor: colors.success,
  },
  deliverButton: {
    backgroundColor: colors.info,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
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
    fontSize: 18,
    fontWeight: "600",
    color: colors.dark,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 4,
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: colors.white,
    fontWeight: "600",
  },
});

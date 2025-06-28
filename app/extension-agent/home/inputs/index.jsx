import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../../../components/agent-components/Header";
import { colors } from "../../../../components/agent-components/constants/colors";

// Mock data - replace with your actual data source
const inputsData = [
  {
    id: "1",
    farmerId: "1",
    farmerName: "Kwame Yeboah",
    type: "Fertilizer (NPK)",
    quantity: "50 kg",
    status: "Delivered",
    dateRequested: "2023-10-15",
    dateDelivered: "2023-10-20",
    notes: "Delivered to farm storage",
  },
  {
    id: "2",
    farmerId: "2",
    farmerName: "Adwoa Mensah",
    type: "Maize Seeds",
    quantity: "10 kg",
    status: "Pending",
    dateRequested: "2023-11-05",
    dateDelivered: null,
    notes: "Awaiting approval from district office",
  },
  {
    id: "3",
    farmerId: "3",
    farmerName: "Kofi Asante",
    type: "Pesticides",
    quantity: "5 liters",
    status: "In Transit",
    dateRequested: "2023-11-10",
    dateDelivered: null,
    notes: "Shipped from Accra warehouse",
  },
  {
    id: "4",
    farmerId: "1",
    farmerName: "Kwame Yeboah",
    type: "Herbicides",
    quantity: "8 liters",
    status: "Approved",
    dateRequested: "2023-11-12",
    dateDelivered: null,
    notes: "Processing for delivery",
  },
];

export default function InputsList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [inputs, setInputs] = useState(inputsData);

  // Filter inputs based on search and status filter
  const filteredInputs = inputs.filter((input) => {
    const matchesSearch =
      input.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      input.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "All" || input.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return colors.success;
      case "Pending":
        return colors.warning;
      case "In Transit":
        return colors.info;
      case "Approved":
        return colors.primary;
      default:
        return colors.gray;
    }
  };

  const renderInputItem = ({ item }) => (
    <TouchableOpacity
      style={styles.inputCard}
      onPress={() =>
        router.push(`/extension-agent/home/inputs/${item.id}`)
      }
    >
      <View style={styles.inputHeader}>
        <View>
          <Text style={styles.farmerName}>{item.farmerName}</Text>
          <Text style={styles.inputType}>{item.type}</Text>
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

      <View style={styles.inputDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={16} color={colors.gray} />
          <Text style={styles.detailText}>Requested: {item.dateRequested}</Text>
        </View>

        {item.dateDelivered && (
          <View style={styles.detailRow}>
            <Ionicons name="checkmark-circle" size={16} color={colors.gray} />
            <Text style={styles.detailText}>
              Delivered: {item.dateDelivered}
            </Text>
          </View>
        )}

        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="scale" size={16} color={colors.gray} />
          <Text style={styles.detailText}>Quantity: {item.quantity}</Text>
        </View>
      </View>

      {item.notes && (
        <View style={styles.notesContainer}>
          <Text style={styles.notesText} numberOfLines={2}>
            {item.notes}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Farm Inputs"
        rightAction={
          <TouchableOpacity
            onPress={() => router.push("/extension-agent/home/inputs/request")}
          >
            <Ionicons name="add" size={24} color={colors.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color={colors.gray} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search inputs..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close" size={20} color={colors.gray} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === "All" && styles.activeFilter,
              ]}
              onPress={() => setFilter("All")}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === "All" && styles.activeFilterText,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === "Pending" && styles.activeFilter,
              ]}
              onPress={() => setFilter("Pending")}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === "Pending" && styles.activeFilterText,
                ]}
              >
                Pending
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === "Approved" && styles.activeFilter,
              ]}
              onPress={() => setFilter("Approved")}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === "Approved" && styles.activeFilterText,
                ]}
              >
                Approved
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === "In Transit" && styles.activeFilter,
              ]}
              onPress={() => setFilter("In Transit")}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === "In Transit" && styles.activeFilterText,
                ]}
              >
                In Transit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === "Delivered" && styles.activeFilter,
              ]}
              onPress={() => setFilter("Delivered")}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === "Delivered" && styles.activeFilterText,
                ]}
              >
                Delivered
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{inputs.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.success }]}>
              {inputs.filter((i) => i.status === "Delivered").length}
            </Text>
            <Text style={styles.statLabel}>Delivered</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.warning }]}>
              {inputs.filter((i) => i.status === "Pending").length}
            </Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
        </View>

        {/* Inputs List */}
        {filteredInputs.length > 0 ? (
          <FlatList
            data={filteredInputs}
            renderItem={renderInputItem}
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
            <Text style={styles.emptyText}>No inputs found</Text>
            <Text style={styles.emptySubtext}>
              Try adjusting your search or filters
            </Text>

            <TouchableOpacity
              style={styles.addInputButton}
              onPress={() => router.push("/inputs/request")}
            >
              <Text style={styles.addInputText}>Request New Input</Text>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 12,
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: colors.textPrimary,
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeFilter: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
  },
  filterText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: colors.textSecondary,
  },
  activeFilterText: {
    color: colors.white,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 22,
    fontFamily: "Inter-Bold",
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    fontFamily: "Inter-Medium",
    color: colors.textSecondary,
  },
  listContainer: {
    gap: 12,
  },
  inputCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  inputHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  farmerName: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  inputType: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    color: colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 80,
    alignItems: "center",
  },
  statusText: {
    fontSize: 13,
    fontFamily: "Inter-SemiBold",
    color: colors.white,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  inputDetails: {
    gap: 12,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailIcon: {
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: colors.textSecondary,
  },
  notesContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  notesLabel: {
    fontSize: 13,
    fontFamily: "Inter-Medium",
    color: colors.textTertiary,
    marginBottom: 8,
  },
  notesText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: colors.textSecondary,
    lineHeight: 20,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    backgroundColor: colors.white,
    borderRadius: 16,
    elevation: 2,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 15,
    fontFamily: "Inter-Regular",
    color: colors.textSecondary,
    marginBottom: 24,
    textAlign: "center",
    paddingHorizontal: 40,
  },
  addInputButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    elevation: 2,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  addInputText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
  },
});
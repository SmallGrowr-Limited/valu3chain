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
    padding: 16,
    paddingBottom: 32,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    flexWrap: "wrap",
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.white,
    elevation: 1,
  },
  activeFilter: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 12,
    color: colors.gray,
  },
  activeFilterText: {
    color: colors.white,
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray,
  },
  listContainer: {
    marginBottom: 16,
  },
  inputCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
  },
  inputHeader: {
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
  inputType: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.white,
  },
  inputDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailText: {
    fontSize: 13,
    color: colors.gray,
  },
  notesContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  notesText: {
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
  addInputButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addInputText: {
    color: colors.white,
    fontWeight: "600",
  },
});

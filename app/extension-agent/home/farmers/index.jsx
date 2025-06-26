import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Header from "../../../../components/agent-components/Header";
import { colors } from "../../../../components/agent-components/constants/colors";
import {farmersData} from "../../../../components/agent-components/constants/data";

export default function FarmersScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const router = useRouter();

  // Filter farmers based on search and status filter
  const filteredFarmers = farmersData.filter((farmer) => {
    const matchesSearch =
      farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.phone.includes(searchQuery);
    const matchesFilter = filter === "All" || farmer.status === filter;
    return matchesSearch && matchesFilter;
  });

  const renderFarmerItem = ({ item }) => (
    <TouchableOpacity
      style={styles.farmerCard}
      onPress={() => router.push(`/extension-agent/home/farmers/${item.id}`)}
    >
      <View style={styles.farmerAvatar}>
        <Ionicons name="person" size={24} color={colors.primary} />
      </View>
      <View style={styles.farmerInfo}>
        <Text style={styles.farmerName}>{item.name}</Text>
        <View style={styles.farmerDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="location" size={14} color={colors.gray} />
            <Text style={styles.detailText}>{item.location}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="call" size={14} color={colors.gray} />
            <Text style={styles.detailText}>{item.phone}</Text>
          </View>
        </View>
      </View>
      <View style={styles.farmerStatus}>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                item.status === "Active"
                  ? colors.successLight
                  : colors.warningLight,
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color:
                  item.status === "Active" ? colors.success : colors.warning,
              },
            ]}
          >
            {item.status}
          </Text>
        </View>
        <Text style={styles.farmsText}>
          {item.farms} {item.farms > 1 ? "farms" : "farm"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Farmers"
        rightAction={
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/extension-agent/home/farmers/add")}
          >
            <Ionicons name="add" size={24} color={colors.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.scrollContainer}>
          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{farmersData.length}</Text>
              <Text style={styles.statLabel}>Total Farmers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {farmersData.filter((f) => f.status === "Active").length}
              </Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {farmersData.reduce((total, farmer) => total + farmer.farms, 0)}
              </Text>
              <Text style={styles.statLabel}>Total Farms</Text>
            </View>
          </View>

          {/* Search and Filter */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search" size={20} color={colors.gray} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search farmers..."
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
                  filter === "Active" && styles.activeFilter,
                ]}
                onPress={() => setFilter("Active")}
              >
                <Text
                  style={[
                    styles.filterText,
                    filter === "Active" && styles.activeFilterText,
                  ]}
                >
                  Active
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  filter === "Inactive" && styles.activeFilter,
                ]}
                onPress={() => setFilter("Inactive")}
              >
                <Text
                  style={[
                    styles.filterText,
                    filter === "Inactive" && styles.activeFilterText,
                  ]}
                >
                  Inactive
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Farmers List */}
          {filteredFarmers.length > 0 ? (
            <FlatList
              data={filteredFarmers}
              renderItem={renderFarmerItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.listContainer}
            />
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons
                name="people-outline"
                size={48}
                color={colors.lightGray}
              />
              <Text style={styles.emptyText}>No farmers found</Text>
              <Text style={styles.emptySubtext}>
                Try adjusting your search or filters
              </Text>

              <TouchableOpacity
                style={styles.addFarmerButton}
                onPress={() => router.push("/extension-agent/home/farmers")}
              >
                <Text style={styles.addFarmerText}>Add New Farmer</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
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
    paddingBottom: 32,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    elevation: 2,
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
    marginBottom: 16,
    elevation: 2,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
    fontSize: 16,
    color: colors.textPrimary,
    fontFamily: "Inter-Medium",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  filterButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.white,
    marginHorizontal: 6,
    elevation: 2,
  },
  activeFilter: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  filterText: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    color: colors.gray,
  },
  activeFilterText: {
    color: colors.white,
  },
  listContainer: {
    marginBottom: 16,
  },
  farmerCard: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
    elevation: 2,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  farmerAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  farmerInfo: {
    flex: 1,
  },
  farmerName: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  farmerDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: colors.textSecondary,
    marginLeft: 8,
  },
  farmerStatus: {
    alignItems: "flex-end",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 13,
    fontFamily: "Inter-SemiBold",
  },
  farmsText: {
    fontSize: 13,
    fontFamily: "Inter-Medium",
    color: colors.textSecondary,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 56,
    backgroundColor: colors.white,
    borderRadius: 16,
    elevation: 2,
  },
  emptyText: {
    fontSize: 20,
    fontFamily: "Inter-SemiBold",
    color: colors.textPrimary,
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: colors.textSecondary,
    marginTop: 8,
    marginBottom: 28,
    textAlign: "center",
    paddingHorizontal: 40,
  },
  addFarmerButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addFarmerText: {
    color: colors.white,
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    elevation: 2,
    shadowColor: colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    color: colors.primary,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: colors.textSecondary,
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: colors.background,
  // },
  // scrollContainer: {
  //   paddingHorizontal: 16,
  //   paddingTop: 10,
  //   paddingBottom: 32,
  // },
  // addButton: {
  //   width: 40,
  //   height: 40,
  //   borderRadius: 20,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // searchContainer: {
  //   marginBottom: 16,
  // },
  // searchInputContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   backgroundColor: colors.white,
  //   borderRadius: 8,
  //   paddingHorizontal: 12,
  //   paddingVertical: 8,
  //   marginBottom: 12,
  //   elevation: 1,
  // },
  // searchInput: {
  //   flex: 1,
  //   marginLeft: 8,
  //   marginRight: 8,
  //   fontSize: 18,
  //   paddingVertical: 8,
  //   // borderWidth: 1,
  // },
  // filterContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   marginBottom: 8,
  // },
  // filterButton: {
  //   flex: 1,
  //   alignItems: "center",
  //   paddingVertical: 8,
  //   borderRadius: 8,
  //   backgroundColor: colors.white,
  //   marginHorizontal: 4,
  //   elevation: 1,
  // },
  // activeFilter: {
  //   backgroundColor: colors.primary,
  // },
  // filterText: {
  //   fontSize: 14,
  //   color: colors.gray,
  // },
  // activeFilterText: {
  //   color: colors.white,
  //   fontWeight: "bold",
  // },
  // listContainer: {
  //   marginBottom: 16,
  // },
  // farmerCard: {
  //   flexDirection: "row",
  //   backgroundColor: colors.white,
  //   borderRadius: 12,
  //   padding: 16,
  //   marginBottom: 12,
  //   alignItems: "center",
  //   elevation: 1,
  // },
  // farmerAvatar: {
  //   width: 48,
  //   height: 48,
  //   borderRadius: 24,
  //   backgroundColor: colors.lightPrimary,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginRight: 16,
  // },
  // farmerInfo: {
  //   flex: 1,
  // },
  // farmerName: {
  //   fontSize: 16,
  //   fontWeight: "600",
  //   color: colors.dark,
  //   marginBottom: 8,
  // },
  // farmerDetails: {
  //   gap: 8,
  // },
  // detailItem: {
  //   flexDirection: "row",
  //   alignItems: "center",
  // },
  // detailText: {
  //   fontSize: 12,
  //   color: colors.gray,
  //   marginLeft: 4,
  // },
  // farmerStatus: {
  //   alignItems: "flex-end",
  // },
  // statusBadge: {
  //   paddingHorizontal: 8,
  //   paddingVertical: 4,
  //   borderRadius: 12,
  //   marginBottom: 8,
  // },
  // statusText: {
  //   fontSize: 12,
  //   fontWeight: "600",
  // },
  // farmsText: {
  //   fontSize: 12,
  //   color: colors.gray,
  // },
  // emptyState: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   paddingVertical: 48,
  //   backgroundColor: colors.white,
  //   borderRadius: 12,
  //   elevation: 1,
  // },
  // emptyText: {
  //   fontSize: 18,
  //   fontWeight: "600",
  //   color: colors.dark,
  //   marginTop: 16,
  // },
  // emptySubtext: {
  //   fontSize: 14,
  //   color: colors.gray,
  //   marginTop: 4,
  //   marginBottom: 24,
  // },
  // addFarmerButton: {
  //   backgroundColor: colors.primary,
  //   paddingHorizontal: 24,
  //   paddingVertical: 12,
  //   borderRadius: 8,
  // },
  // addFarmerText: {
  //   color: colors.white,
  //   fontWeight: "600",
  // },
  // statsContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   backgroundColor: colors.white,
  //   borderRadius: 12,
  //   padding: 16,
  //   marginBottom: 16,
  //   elevation: 1,
  // },
  // statItem: {
  //   alignItems: "center",
  // },
  // statValue: {
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   color: colors.primary,
  //   marginBottom: 4,
  // },
  // statLabel: {
  //   fontSize: 12,
  //   color: colors.gray,
  // },
  // successLight: {
  //   backgroundColor: "#E8F5E9",
  // },
  // warningLight: {
  //   backgroundColor: "#FFF3E0",
  // },
});

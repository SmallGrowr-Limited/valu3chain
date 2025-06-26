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
const priceHistory = [
  {
    id: "1",
    cropId: "1",
    cropName: "Maize",
    unit: "kg",
    price: 2.5,
    date: "2023-11-20",
    updatedBy: "John Doe",
    trend: "up",
    notes: "Increased demand from local mills",
  },
  {
    id: "2",
    cropId: "1",
    cropName: "Maize",
    unit: "kg",
    price: 2.3,
    date: "2023-11-15",
    updatedBy: "Jane Smith",
    trend: "down",
    notes: "Harvest season surplus",
  },
  {
    id: "3",
    cropId: "1",
    cropName: "Maize",
    unit: "kg",
    price: 2.4,
    date: "2023-11-10",
    updatedBy: "John Doe",
    trend: "up",
    notes: "Early season price adjustment",
  },
  {
    id: "4",
    cropId: "2",
    cropName: "Rice",
    unit: "kg",
    price: 3.8,
    date: "2023-11-18",
    updatedBy: "Jane Smith",
    trend: "stable",
    notes: "Stable import prices",
  },
  {
    id: "5",
    cropId: "3",
    cropName: "Beans",
    unit: "kg",
    price: 4.2,
    date: "2023-11-17",
    updatedBy: "John Doe",
    trend: "up",
    notes: "Reduced supply from northern regions",
  },
  {
    id: "6",
    cropId: "4",
    cropName: "Tomatoes",
    unit: "kg",
    price: 5.0,
    date: "2023-11-16",
    updatedBy: "Jane Smith",
    trend: "down",
    notes: "Increased production from greenhouse farms",
  },
];

const crops = [
  { id: "1", name: "Maize" },
  { id: "2", name: "Rice" },
  { id: "3", name: "Beans" },
  { id: "4", name: "Tomatoes" },
  { id: "5", name: "Onions" },
  { id: "6", name: "Cassava" },
];

export default function PriceHistory() {
  const router = useRouter();
  const [selectedCrop, setSelectedCrop] = useState("all");
  const [filteredHistory, setFilteredHistory] = useState(priceHistory);

  // Filter history based on selected crop
  useEffect(() => {
    if (selectedCrop === "all") {
      setFilteredHistory(priceHistory);
    } else {
      setFilteredHistory(
        priceHistory.filter((item) => item.cropId === selectedCrop)
      );
    }
  }, [selectedCrop]);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return (
          <MaterialCommunityIcons
            name="arrow-up"
            size={20}
            color={colors.success}
          />
        );
      case "down":
        return (
          <MaterialCommunityIcons
            name="arrow-down"
            size={20}
            color={colors.danger}
          />
        );
      default:
        return (
          <MaterialCommunityIcons
            name="arrow-right"
            size={20}
            color={colors.gray}
          />
        );
    }
  };

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyCard}>
      <View style={styles.historyHeader}>
        <Text style={styles.cropName}>{item.cropName}</Text>
        <View style={styles.priceContainer}>
          {getTrendIcon(item.trend)}
          <Text style={styles.priceText}>
            {item.price} / {item.unit}
          </Text>
        </View>
      </View>

      <View style={styles.historyDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={16} color={colors.gray} />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="person" size={16} color={colors.gray} />
          <Text style={styles.detailText}>{item.updatedBy}</Text>
        </View>
      </View>

      {item.notes && (
        <View style={styles.notesContainer}>
          <Text style={styles.notesText}>{item.notes}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Price History"
        rightAction={
          <TouchableOpacity
            onPress={() => router.push("/extension-agent/home/market")}
          >
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Crop Filter */}
        <Text style={styles.sectionTitle}>Filter by Crop</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cropFilter}
        >
          <TouchableOpacity
            style={[
              styles.cropFilterButton,
              selectedCrop === "all" && styles.selectedCropFilter,
            ]}
            onPress={() => setSelectedCrop("all")}
          >
            <Text
              style={[
                styles.cropFilterText,
                selectedCrop === "all" && styles.selectedCropFilterText,
              ]}
            >
              All Crops
            </Text>
          </TouchableOpacity>

          {crops.map((crop) => (
            <TouchableOpacity
              key={crop.id}
              style={[
                styles.cropFilterButton,
                selectedCrop === crop.id && styles.selectedCropFilter,
              ]}
              onPress={() => setSelectedCrop(crop.id)}
            >
              <Text
                style={[
                  styles.cropFilterText,
                  selectedCrop === crop.id && styles.selectedCropFilterText,
                ]}
              >
                {crop.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Statistics */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{filteredHistory.length}</Text>
            <Text style={styles.statLabel}>Records</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {[...new Set(filteredHistory.map((item) => item.cropId))].length}
            </Text>
            <Text style={styles.statLabel}>Crops</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {
                [...new Set(filteredHistory.map((item) => item.updatedBy))]
                  .length
              }
            </Text>
            <Text style={styles.statLabel}>Agents</Text>
          </View>
        </View>

        {/* Price History */}
        <Text style={styles.sectionTitle}>
          {selectedCrop === "all"
            ? "All Price Updates"
            : `${crops.find((c) => c.id === selectedCrop)?.name} Prices`}
        </Text>

        {filteredHistory.length > 0 ? (
          <FlatList
            data={filteredHistory}
            renderItem={renderHistoryItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="chart-line"
              size={48}
              color={colors.lightGray}
            />
            <Text style={styles.emptyText}>No price history found</Text>
            <Text style={styles.emptySubtext}>
              Try selecting a different crop
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark,
    marginTop: 16,
    marginBottom: 12,
  },
  cropFilter: {
    paddingBottom: 8,
  },
  cropFilterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: colors.white,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  selectedCropFilter: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  cropFilterText: {
    fontSize: 14,
    color: colors.dark,
  },
  selectedCropFilterText: {
    color: colors.white,
  },
  statsCard: {
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
  },
  statLabel: {
    fontSize: 12,
    color: colors.gray,
  },
  listContainer: {
    marginBottom: 16,
  },
  historyCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cropName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark,
  },
  historyDetails: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.gray,
  },
  notesContainer: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  notesText: {
    fontSize: 14,
    color: colors.dark,
    lineHeight: 20,
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
    fontWeight: "600",
    color: colors.dark,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 4,
  },
});

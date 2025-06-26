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
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Header from "../../../../components/agent-components/Header";
import { colors } from "../../../../components/agent-components/constants/colors";

// Mock data - replace with your actual data source
const pendingRequests = [
  {
    id: "1",
    farmerId: "1",
    farmerName: "Kwame Yeboah",
    type: "Fertilizer (NPK)",
    quantity: "50 kg",
    dateRequested: "2023-11-15",
    farmName: "Yeboah Main Farm",
  },
  {
    id: "2",
    farmerId: "2",
    farmerName: "Adwoa Mensah",
    type: "Maize Seeds",
    quantity: "10 kg",
    dateRequested: "2023-11-16",
    farmName: "Mensah Family Farm",
  },
  {
    id: "3",
    farmerId: "3",
    farmerName: "Kofi Asante",
    type: "Fertilizer (NPK)",
    quantity: "60 kg",
    dateRequested: "2023-11-17",
    farmName: "Asante Maize Fields",
  },
  {
    id: "4",
    farmerId: "4",
    farmerName: "Ama Boateng",
    type: "Pesticides",
    quantity: "5 liters",
    dateRequested: "2023-11-18",
    farmName: "Boateng Organic Farm",
  },
  {
    id: "5",
    farmerId: "5",
    farmerName: "Yaw Osei",
    type: "Maize Seeds",
    quantity: "15 kg",
    dateRequested: "2023-11-19",
    farmName: "Osei Seed Company",
  },
];

export default function NewAggregation() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState("");
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [notes, setNotes] = useState("");
  const [filteredRequests, setFilteredRequests] = useState(pendingRequests);

  // Filter requests by selected type
  useEffect(() => {
    if (selectedType) {
      setFilteredRequests(
        pendingRequests.filter((req) => req.type === selectedType)
      );
    } else {
      setFilteredRequests(pendingRequests);
    }
  }, [selectedType]);

  const toggleRequestSelection = (requestId) => {
    setSelectedRequests((prev) =>
      prev.includes(requestId)
        ? prev.filter((id) => id !== requestId)
        : [...prev, requestId]
    );
  };

  const handleSubmit = () => {
    if (selectedRequests.length === 0) {
      Alert.alert(
        "No Requests Selected",
        "Please select at least one input request to include in this aggregation"
      );
      return;
    }

    const selected = pendingRequests.filter((req) =>
      selectedRequests.includes(req.id)
    );
    const inputTypes = [...new Set(selected.map((req) => req.type))];

    if (inputTypes.length > 1) {
      Alert.alert(
        "Multiple Input Types",
        "All selected requests must be of the same input type"
      );
      return;
    }

    // In a real app, you would submit to your backend here
    Alert.alert(
      "Aggregation Created",
      `Created new aggregation with ${selectedRequests.length} ${inputTypes[0]} requests`,
      [
        {
          text: "OK",
          onPress: () => router.push("/inputs/aggregate"),
        },
      ]
    );
  };

  const getInputTypes = () => {
    const types = [...new Set(pendingRequests.map((req) => req.type))];
    return types.map((type) => ({
      label: type,
      value: type,
      icon: type.includes("Fertilizer")
        ? "sack"
        : type.includes("Seed")
        ? "seed"
        : "spray",
    }));
  };

  return (
    <View style={styles.container}>
      <Header title="New Input Aggregation" showBackButton />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>1. Select Input Type</Text>
        <View style={styles.typeSelector}>
          {getInputTypes().map((type, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.typeButton,
                selectedType === type.value && styles.selectedTypeButton,
              ]}
              onPress={() => setSelectedType(type.value)}
            >
              <MaterialCommunityIcons
                name={type.icon}
                size={24}
                color={
                  selectedType === type.value ? colors.white : colors.primary
                }
              />
              <Text
                style={[
                  styles.typeButtonText,
                  selectedType === type.value && styles.selectedTypeButtonText,
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>2. Select Requests to Include</Text>
        {filteredRequests.length > 0 ? (
          <FlatList
            data={filteredRequests}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.requestCard,
                  selectedRequests.includes(item.id) &&
                    styles.selectedRequestCard,
                ]}
                onPress={() => toggleRequestSelection(item.id)}
              >
                <View style={styles.requestInfo}>
                  <Text style={styles.farmerName}>{item.farmerName}</Text>
                  <Text style={styles.farmName}>{item.farmName}</Text>
                  <Text style={styles.requestDate}>
                    Requested: {item.dateRequested}
                  </Text>
                </View>
                <View style={styles.requestQuantity}>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  {selectedRequests.includes(item.id) && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={colors.success}
                    />
                  )}
                </View>
              </TouchableOpacity>
            )}
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
            <Text style={styles.emptyText}>
              {selectedType
                ? "No pending requests for this input type"
                : "Select an input type to view requests"}
            </Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>3. Aggregation Summary</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Selected Input Type:</Text>
            <Text style={styles.summaryValue}>
              {selectedType || "None selected"}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Number of Requests:</Text>
            <Text style={styles.summaryValue}>{selectedRequests.length}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Quantity:</Text>
            <Text style={styles.summaryValue}>
              {selectedRequests.length > 0
                ? `${selectedRequests
                    .map((id) => {
                      const req = pendingRequests.find((r) => r.id === id);
                      return parseFloat(req.quantity);
                    })
                    .reduce((sum, qty) => sum + qty, 0)} ${
                    pendingRequests[0].quantity.split(" ")[1]
                  }`
                : "0"}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>4. Additional Notes</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Add any notes about this aggregation..."
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity
          style={[
            styles.submitButton,
            selectedRequests.length === 0 && styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={selectedRequests.length === 0}
        >
          <MaterialIcons name="group-work" size={20} color={colors.white} />
          <Text style={styles.submitButtonText}>Create Aggregation</Text>
        </TouchableOpacity>
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
  typeSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },
  typeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.lightGray,
    gap: 8,
  },
  selectedTypeButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeButtonText: {
    fontSize: 14,
    color: colors.dark,
  },
  selectedTypeButtonText: {
    color: colors.white,
  },
  listContainer: {
    marginBottom: 16,
  },
  requestCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  selectedRequestCard: {
    borderColor: colors.primary,
    backgroundColor: colors.lightPrimary,
  },
  requestInfo: {
    flex: 1,
  },
  farmerName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark,
  },
  farmName: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 4,
  },
  requestDate: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 4,
  },
  requestQuantity: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginLeft: 12,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  emptyText: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 16,
    textAlign: "center",
  },
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.gray,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.dark,
  },
  notesInput: {
    minHeight: 100,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    padding: 12,
    textAlignVertical: "top",
    marginBottom: 24,
  },
  submitButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});

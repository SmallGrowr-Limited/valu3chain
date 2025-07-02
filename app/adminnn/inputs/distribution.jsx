import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { DataTable, Button, Searchbar, Chip, TextInput, Card, Menu } from "react-native-paper";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function InputDistribution() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [quantity, setQuantity] = useState("");
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [selectedInput, setSelectedInput] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  // Sample data - in a real app, this would come from an API
  const availableInputs = [
    { id: 1, type: "Maize Seeds", category: "Seeds", quantity: 380, unit: "kg" },
    { id: 2, type: "Rice Seeds", category: "Seeds", quantity: 250, unit: "kg" },
    { id: 3, type: "NPK Fertilizer", category: "Fertilizer", quantity: 600, unit: "kg" },
    { id: 4, type: "Urea", category: "Fertilizer", quantity: 400, unit: "kg" },
    { id: 5, type: "Herbicide", category: "Chemicals", quantity: 150, unit: "liters" },
  ];

  const farmers = [
    { id: 1, name: "John Doe", region: "North", status: "Active" },
    { id: 2, name: "Jane Smith", region: "South", status: "Active" },
    { id: 3, name: "Robert Johnson", region: "East", status: "Verified" },
  ];

  // Filter inputs based on search and category
  const filteredInputs = availableInputs.filter(input => {
    const matchesSearch = input.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || input.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Handle assignment of inputs to farmers
  const handleAssign = () => {
    if (!selectedInput || !selectedFarmer || !quantity) {
      Alert.alert("Error", "Please select input, farmer, and enter quantity");
      return;
    }

    if (parseInt(quantity) > selectedInput.quantity) {
      Alert.alert("Error", "Not enough quantity available");
      return;
    }

    // In a real app, this would call an API to record the assignment
    Alert.alert(
      "Success", 
      `Assigned ${quantity} ${selectedInput.unit} of ${selectedInput.type} to ${selectedFarmer.name}`,
      [
        { text: "OK", onPress: () => router.back() }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {id ? "Assign Input to Request" : "Distribute Inputs"}
      </Text>

      {/* Input Selection Section */}
      <Card style={styles.section}>
        <Card.Title title="Select Input" />
        <Card.Content>
          <View style={styles.filterRow}>
            <Searchbar
              placeholder="Search inputs"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.search}
            />
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <Button 
                  onPress={() => setMenuVisible(true)}
                  style={styles.filterButton}
                >
                  {categoryFilter === "all" ? "All Categories" : categoryFilter}
                </Button>
              }
            >
              <Menu.Item 
                onPress={() => { setCategoryFilter("all"); setMenuVisible(false); }} 
                title="All Categories" 
              />
              <Menu.Item 
                onPress={() => { setCategoryFilter("Seeds"); setMenuVisible(false); }} 
                title="Seeds" 
              />
              <Menu.Item 
                onPress={() => { setCategoryFilter("Fertilizer"); setMenuVisible(false); }} 
                title="Fertilizer" 
              />
              <Menu.Item 
                onPress={() => { setCategoryFilter("Chemicals"); setMenuVisible(false); }} 
                title="Chemicals" 
              />
            </Menu>
          </View>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Input Type</DataTable.Title>
              <DataTable.Title numeric>Available</DataTable.Title>
              <DataTable.Title>Unit</DataTable.Title>
            </DataTable.Header>

            {filteredInputs.map(input => (
              <DataTable.Row 
                key={input.id} 
                onPress={() => setSelectedInput(input)}
                style={selectedInput?.id === input.id ? styles.selectedRow : null}
              >
                <DataTable.Cell>{input.type}</DataTable.Cell>
                <DataTable.Cell numeric>{input.quantity}</DataTable.Cell>
                <DataTable.Cell>{input.unit}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>

      {/* Farmer Selection Section */}
      <Card style={styles.section}>
        <Card.Title title="Select Farmer" />
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Region</DataTable.Title>
              <DataTable.Title>Status</DataTable.Title>
            </DataTable.Header>

            {farmers.map(farmer => (
              <DataTable.Row 
                key={farmer.id} 
                onPress={() => setSelectedFarmer(farmer)}
                style={selectedFarmer?.id === farmer.id ? styles.selectedRow : null}
              >
                <DataTable.Cell>{farmer.name}</DataTable.Cell>
                <DataTable.Cell>{farmer.region}</DataTable.Cell>
                <DataTable.Cell>{farmer.status}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>

      {/* Quantity Input Section */}
      <Card style={styles.section}>
        <Card.Title title="Quantity Details" />
        <Card.Content>
          <View style={styles.quantityContainer}>
            <TextInput
              label="Quantity"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              style={styles.quantityInput}
              disabled={!selectedInput}
            />
            <Text style={styles.unitText}>
              {selectedInput ? selectedInput.unit : ""}
            </Text>
          </View>
          {selectedInput && (
            <Text style={styles.availableText}>
              Available: {selectedInput.quantity} {selectedInput.unit}
            </Text>
          )}
        </Card.Content>
      </Card>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button 
          mode="outlined" 
          onPress={() => router.back()}
          style={styles.button}
        >
          Cancel
        </Button>
        <Button 
          mode="contained" 
          onPress={handleAssign}
          style={styles.button}
          disabled={!selectedInput || !selectedFarmer || !quantity}
        >
          {id ? "Assign to Request" : "Distribute Inputs"}
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  search: {
    flex: 1,
    marginRight: 8,
  },
  filterButton: {
    width: 150,
  },
  selectedRow: {
    backgroundColor: "#e3f2fd",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityInput: {
    flex: 1,
    marginRight: 8,
  },
  unitText: {
    fontSize: 16,
    width: 60,
  },
  availableText: {
    marginTop: 8,
    color: "#666",
    fontStyle: "italic",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});
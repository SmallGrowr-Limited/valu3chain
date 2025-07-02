import { View, Text, ScrollView, StyleSheet } from "react-native";
import { DataTable, Card, Button, Searchbar, Chip } from "react-native-paper";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function InputsDashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Sample data - in a real app, this would come from an API
  const inventory = [
    {
      id: 1,
      type: "Maize Seeds",
      category: "Seeds",
      quantity: 500,
      assigned: 120,
      distributed: 80,
      lastUpdated: "2023-05-15",
    },
    {
      id: 2,
      type: "NPK Fertilizer",
      category: "Fertilizer",
      quantity: 1000,
      assigned: 400,
      distributed: 350,
      lastUpdated: "2023-05-14",
    },
    {
      id: 3,
      type: "Herbicide",
      category: "Chemicals",
      quantity: 200,
      assigned: 50,
      distributed: 30,
      lastUpdated: "2023-05-16",
    },
  ];

  const distributionHistory = [
    {
      id: 1,
      farmer: "John Doe",
      agent: "Agent 1",
      inputType: "Maize Seeds",
      quantity: 5,
      date: "2023-05-10",
      status: "Delivered",
    },
    {
      id: 2,
      farmer: "Jane Smith",
      agent: "Agent 2",
      inputType: "NPK Fertilizer",
      quantity: 10,
      date: "2023-05-12",
      status: "Assigned",
    },
  ];

  const filteredInventory = inventory.filter((item) =>
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Input Distribution</Text>

      <View style={styles.filterContainer}>
        <Searchbar
          placeholder="Search inputs"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.search}
        />
        <View style={styles.chipContainer}>
          <Chip
            selected={statusFilter === "all"}
            onPress={() => setStatusFilter("all")}
            style={styles.chip}
          >
            All
          </Chip>
          <Chip
            selected={statusFilter === "Seeds"}
            onPress={() => setStatusFilter("Seeds")}
            style={styles.chip}
          >
            Seeds
          </Chip>
          <Chip
            selected={statusFilter === "Fertilizer"}
            onPress={() => setStatusFilter("Fertilizer")}
            style={styles.chip}
          >
            Fertilizer
          </Chip>
          <Chip
            selected={statusFilter === "Chemicals"}
            onPress={() => setStatusFilter("Chemicals")}
            style={styles.chip}
          >
            Chemicals
          </Chip>
        </View>
      </View>

      <Card style={styles.card}>
        <Card.Title
          title="Current Inventory"
          right={() => (
            <Button onPress={() => router.push("/inputs/distribution")}>
              Manage
            </Button>
          )}
        />
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Input Type</DataTable.Title>
              <DataTable.Title numeric>Total</DataTable.Title>
              <DataTable.Title numeric>Assigned</DataTable.Title>
              <DataTable.Title numeric>Distributed</DataTable.Title>
              <DataTable.Title>Available</DataTable.Title>
            </DataTable.Header>

            {filteredInventory.map((item) => (
              <DataTable.Row key={item.id}>
                <DataTable.Cell>{item.type}</DataTable.Cell>
                <DataTable.Cell numeric>{item.quantity}</DataTable.Cell>
                <DataTable.Cell numeric>{item.assigned}</DataTable.Cell>
                <DataTable.Cell numeric>{item.distributed}</DataTable.Cell>
                <DataTable.Cell numeric>
                  {item.quantity - item.assigned}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title
          title="Recent Distributions"
          right={() => (
            <Button onPress={() => router.push("/inputs/requests")}>
              View All
            </Button>
          )}
        />
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Farmer</DataTable.Title>
              <DataTable.Title>Agent</DataTable.Title>
              <DataTable.Title>Input</DataTable.Title>
              <DataTable.Title numeric>Qty</DataTable.Title>
              <DataTable.Title>Status</DataTable.Title>
            </DataTable.Header>

            {distributionHistory.map((dist) => (
              <DataTable.Row key={dist.id}>
                <DataTable.Cell>{dist.farmer}</DataTable.Cell>
                <DataTable.Cell>{dist.agent}</DataTable.Cell>
                <DataTable.Cell>{dist.inputType}</DataTable.Cell>
                <DataTable.Cell numeric>{dist.quantity}</DataTable.Cell>
                <DataTable.Cell>
                  <Text style={{ color: getStatusColor(dist.status) }}>
                    {dist.status}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>

      <View style={styles.buttonRow}>
        <Button
          mode="contained"
          icon="qrcode-scan"
          onPress={() => router.push("/inputs/scan")}
          style={styles.actionButton}
        >
          Scan Delivery
        </Button>
        <Button
          mode="outlined"
          icon="clipboard-list"
          onPress={() => router.push("/inputs/requests")}
          style={styles.actionButton}
        >
          View Requests
        </Button>
      </View>
    </ScrollView>
  );
}

function getStatusColor(status) {
  switch (status) {
    case "Delivered":
      return "green";
    case "Assigned":
      return "blue";
    case "Pending":
      return "orange";
    default:
      return "black";
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  filterContainer: {
    marginBottom: 16,
  },
  search: {
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  chip: {
    marginRight: 4,
    marginBottom: 4,
  },
  card: {
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});
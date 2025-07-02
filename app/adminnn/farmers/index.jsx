import { View, Text, ScrollView, StyleSheet } from "react-native";
import { DataTable, Searchbar, Chip, Menu, Divider, Button } from "react-native-paper";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function FarmersList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [visibleMenu, setVisibleMenu] = useState(false);

  // Sample data
  const farmers = [
    { id: 1, name: "John Doe", region: "North", crop: "Maize", status: "Verified", agent: "Agent 1", date: "2023-04-15" },
    { id: 2, name: "Jane Smith", region: "South", crop: "Rice", status: "Pending", agent: "Agent 2", date: "2023-04-20" },
    { id: 3, name: "Bob Johnson", region: "East", crop: "Wheat", status: "Active", agent: "Agent 3", date: "2023-04-25" },
  ];

  const filteredFarmers = farmers.filter((farmer) => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || farmer.status === statusFilter;
    const matchesRegion = regionFilter === "all" || farmer.region === regionFilter;
    return matchesSearch && matchesStatus && matchesRegion;
  });

  const regions = [...new Set(farmers.map(f => f.region))];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Farmers Management</Text>
      
      <View style={styles.filterContainer}>
        <Searchbar
          placeholder="Search farmers"
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
            All Status
          </Chip>
          <Chip
            selected={statusFilter === "Pending"}
            onPress={() => setStatusFilter("Pending")}
            style={styles.chip}
          >
            Pending
          </Chip>
          <Chip
            selected={statusFilter === "Verified"}
            onPress={() => setStatusFilter("Verified")}
            style={styles.chip}
          >
            Verified
          </Chip>
          <Chip
            selected={statusFilter === "Active"}
            onPress={() => setStatusFilter("Active")}
            style={styles.chip}
          >
            Active
          </Chip>
        </View>
        
        <Menu
          visible={visibleMenu}
          onDismiss={() => setVisibleMenu(false)}
          anchor={
            <Button onPress={() => setVisibleMenu(true)}>
              {regionFilter === "all" ? "All Regions" : regionFilter}
            </Button>
          }
        >
          <Menu.Item onPress={() => { setRegionFilter("all"); setVisibleMenu(false); }} title="All Regions" />
          {regions.map(region => (
            <Menu.Item 
              key={region} 
              onPress={() => { setRegionFilter(region); setVisibleMenu(false); }} 
              title={region} 
            />
          ))}
        </Menu>
      </View>
      
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Region</DataTable.Title>
          <DataTable.Title>Crop</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
          <DataTable.Title>Actions</DataTable.Title>
        </DataTable.Header>
        
        {filteredFarmers.map((farmer) => (
          <DataTable.Row key={farmer.id} onPress={() => router.push(`/adminnn/farmers/${farmer.id}`)}>
            <DataTable.Cell>{farmer.name}</DataTable.Cell>
            <DataTable.Cell>{farmer.region}</DataTable.Cell>
            <DataTable.Cell>{farmer.crop}</DataTable.Cell>
            <DataTable.Cell>
              <Text style={{ color: getStatusColor(farmer.status) }}>
                {farmer.status}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Button 
                compact 
                mode="outlined" 
                onPress={() => router.push(`/adminnn/farmers/${farmer.id}`)}
              >
                View
              </Button>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
}

function getStatusColor(status) {
  switch(status) {
    case "Pending": return "orange";
    case "Verified": return "blue";
    case "Active": return "green";
    default: return "black";
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
});
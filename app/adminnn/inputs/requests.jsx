import { View, Text, ScrollView, StyleSheet } from "react-native";
import { DataTable, Searchbar, Chip, Button, Menu, Divider } from "react-native-paper";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function InputRequests() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [inputTypeFilter, setInputTypeFilter] = useState("all");
  const [visibleMenu, setVisibleMenu] = useState(false);

  // Sample data
  const requests = [
    { 
      id: 1, 
      farmer: "John Doe", 
      agent: "Agent 1", 
      inputType: "Seeds", 
      quantity: 5, 
      requestDate: "2023-05-01", 
      status: "Pending" 
    },
    { 
      id: 2, 
      farmer: "Jane Smith", 
      agent: "Agent 2", 
      inputType: "Fertilizer", 
      quantity: 10, 
      requestDate: "2023-05-02", 
      status: "Approved" 
    },
    { 
      id: 3, 
      farmer: "Bob Johnson", 
      agent: "Agent 3", 
      inputType: "Pesticide", 
      quantity: 3, 
      requestDate: "2023-05-03", 
      status: "Declined" 
    },
  ];

  const filteredRequests = requests.filter((request) => {
    const matchesSearch = request.farmer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    const matchesInputType = inputTypeFilter === "all" || request.inputType === inputTypeFilter;
    return matchesSearch && matchesStatus && matchesInputType;
  });

  const inputTypes = [...new Set(requests.map(r => r.inputType))];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Input Requests</Text>
      
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
            selected={statusFilter === "Approved"}
            onPress={() => setStatusFilter("Approved")}
            style={styles.chip}
          >
            Approved
          </Chip>
          <Chip
            selected={statusFilter === "Declined"}
            onPress={() => setStatusFilter("Declined")}
            style={styles.chip}
          >
            Declined
          </Chip>
        </View>
        
        <Menu
          visible={visibleMenu}
          onDismiss={() => setVisibleMenu(false)}
          anchor={
            <Button onPress={() => setVisibleMenu(true)}>
              {inputTypeFilter === "all" ? "All Input Types" : inputTypeFilter}
            </Button>
          }
        >
          <Menu.Item onPress={() => { setInputTypeFilter("all"); setVisibleMenu(false); }} title="All Input Types" />
          {inputTypes.map(type => (
            <Menu.Item 
              key={type} 
              onPress={() => { setInputTypeFilter(type); setVisibleMenu(false); }} 
              title={type} 
            />
          ))}
        </Menu>
      </View>
      
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Farmer</DataTable.Title>
          <DataTable.Title>Agent</DataTable.Title>
          <DataTable.Title>Input</DataTable.Title>
          <DataTable.Title>Qty</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
          <DataTable.Title>Actions</DataTable.Title>
        </DataTable.Header>
        
        {filteredRequests.map((request) => (
          <DataTable.Row key={request.id}>
            <DataTable.Cell>{request.farmer}</DataTable.Cell>
            <DataTable.Cell>{request.agent}</DataTable.Cell>
            <DataTable.Cell>{request.inputType}</DataTable.Cell>
            <DataTable.Cell>{request.quantity}</DataTable.Cell>
            <DataTable.Cell>{request.requestDate}</DataTable.Cell>
            <DataTable.Cell>
              <Text style={{ color: getRequestStatusColor(request.status) }}>
                {request.status}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              {request.status === "Pending" && (
                <View style={styles.actionButtons}>
                  <Button 
                    compact 
                    mode="contained" 
                    onPress={() => handleApprove(request.id)}
                    style={styles.smallButton}
                  >
                    Approve
                  </Button>
                  <Button 
                    compact 
                    mode="outlined" 
                    onPress={() => handleDecline(request.id)}
                    style={styles.smallButton}
                  >
                    Decline
                  </Button>
                </View>
              )}
              {request.status === "Approved" && (
                <Button 
                  compact 
                  mode="contained" 
                  onPress={() => handleAssign(request.id)}
                >
                  Assign
                </Button>
              )}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );

  function handleApprove(id) {
    // Approve logic
    console.log("Approved request:", id);
  }

  function handleDecline(id) {
    // Decline logic
    console.log("Declined request:", id);
  }

  function handleAssign(id) {
    // Assign from inventory logic
    router.push(`/inputs/distribution?id=${id}`);
  }
}

function getRequestStatusColor(status) {
  switch(status) {
    case "Pending": return "orange";
    case "Approved": return "green";
    case "Declined": return "red";
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
  actionButtons: {
    flexDirection: "row",
  },
  smallButton: {
    marginHorizontal: 2,
  },
});
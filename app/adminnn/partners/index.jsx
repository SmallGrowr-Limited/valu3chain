import { View, Text, ScrollView, StyleSheet } from "react-native";
import { DataTable, Searchbar, Chip, Button } from "react-native-paper";
import { useState } from "react";

export default function PartnersManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Sample data
  const partners = [
    { 
      id: 1, 
      name: "AgroTech Ltd", 
      orderDate: "2023-05-01", 
      products: "Fertilizer", 
      quantity: 100, 
      totalPrice: 5000, 
      status: "Pending",
      type: "Input Supply",
      repayment: "30 days"
    },
    { 
      id: 2, 
      name: "GrainCo", 
      orderDate: "2023-05-05", 
      products: "Maize", 
      quantity: 500, 
      totalPrice: 75000, 
      status: "Approved",
      type: "Produce Buyback",
      repayment: "On delivery"
    },
    { 
      id: 3, 
      name: "Seed Masters", 
      orderDate: "2023-05-10", 
      products: "Hybrid Seeds", 
      quantity: 200, 
      totalPrice: 10000, 
      status: "Fulfilled",
      type: "Input Supply",
      repayment: "15 days"
    },
  ];

  const filteredPartners = partners.filter((partner) => {
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || partner.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Partners Management</Text>
      
      <View style={styles.filterContainer}>
        <Searchbar
          placeholder="Search partners"
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
            selected={statusFilter === "Fulfilled"}
            onPress={() => setStatusFilter("Fulfilled")}
            style={styles.chip}
          >
            Fulfilled
          </Chip>
        </View>
      </View>
      
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Partner</DataTable.Title>
          <DataTable.Title>Order Date</DataTable.Title>
          <DataTable.Title>Products</DataTable.Title>
          <DataTable.Title>Qty</DataTable.Title>
          <DataTable.Title>Total</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
          <DataTable.Title>Actions</DataTable.Title>
        </DataTable.Header>
        
        {filteredPartners.map((partner) => (
          <DataTable.Row key={partner.id}>
            <DataTable.Cell>{partner.name}</DataTable.Cell>
            <DataTable.Cell>{partner.orderDate}</DataTable.Cell>
            <DataTable.Cell>{partner.products}</DataTable.Cell>
            <DataTable.Cell>{partner.quantity}</DataTable.Cell>
            <DataTable.Cell>${partner.totalPrice}</DataTable.Cell>
            <DataTable.Cell>
              <Text style={{ color: getPartnerStatusColor(partner.status) }}>
                {partner.status}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <View style={styles.actionButtons}>
                {partner.status === "Pending" && (
                  <>
                    <Button 
                      compact 
                      mode="contained" 
                      onPress={() => handleApprove(partner.id)}
                      style={styles.smallButton}
                    >
                      Approve
                    </Button>
                    <Button 
                      compact 
                      mode="outlined" 
                      onPress={() => handleDecline(partner.id)}
                      style={styles.smallButton}
                    >
                      Decline
                    </Button>
                  </>
                )}
                {partner.status === "Approved" && (
                  <Button 
                    compact 
                    mode="contained" 
                    onPress={() => handleFulfill(partner.id)}
                    style={styles.smallButton}
                  >
                    Fulfill
                  </Button>
                )}
              </View>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );

  function handleApprove(id) {
    // Approve logic
    console.log("Approved partner investment:", id);
  }

  function handleDecline(id) {
    // Decline logic
    console.log("Declined partner investment:", id);
  }

  function handleFulfill(id) {
    // Mark as fulfilled logic
    console.log("Marked as fulfilled:", id);
  }
}

function getPartnerStatusColor(status) {
  switch(status) {
    case "Pending": return "orange";
    case "Approved": return "blue";
    case "Fulfilled": return "green";
    default: return "black";
  }
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
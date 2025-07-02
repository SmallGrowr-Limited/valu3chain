import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { DataTable, Button, Searchbar, Chip, Card, Menu, Avatar } from "react-native-paper";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function PartnerInvestments() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [menuVisible, setMenuVisible] = useState(false);

  // Sample data - in a real app, this would come from an API
  const investments = [
    {
      id: 1,
      partnerName: "AgroTech Ltd",
      partnerLogo: "AT",
      orderDate: "2023-05-01",
      products: "Fertilizer",
      quantity: 100,
      totalPrice: 5000,
      type: "Input Supply",
      repaymentTerms: "30 days",
      status: "Pending",
      contact: "john@agrotech.com",
      phone: "+1234567890",
    },
    {
      id: 2,
      partnerName: "GrainCo",
      partnerLogo: "GC",
      orderDate: "2023-05-05",
      products: "Maize",
      quantity: 500,
      totalPrice: 75000,
      type: "Produce Buyback",
      repaymentTerms: "On delivery",
      status: "Approved",
      contact: "jane@grainco.com",
      phone: "+1987654321",
    },
    {
      id: 3,
      partnerName: "Seed Masters",
      partnerLogo: "SM",
      orderDate: "2023-05-10",
      products: "Hybrid Seeds",
      quantity: 200,
      totalPrice: 10000,
      type: "Input Supply",
      repaymentTerms: "15 days",
      status: "Fulfilled",
      contact: "bob@seedmasters.com",
      phone: "+1122334455",
    },
  ];

  // Filter investments based on search and status
  const filteredInvestments = investments.filter((investment) => {
    const matchesSearch = investment.partnerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || investment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id) => {
    Alert.alert(
      "Approve Investment",
      "Are you sure you want to approve this investment?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Approve", 
          onPress: () => {
            // In a real app, this would call an API to approve the investment
            Alert.alert("Success", "Investment approved successfully");
          }
        }
      ]
    );
  };

  const handleDecline = (id) => {
    Alert.alert(
      "Decline Investment",
      "Are you sure you want to decline this investment?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Decline", 
          onPress: () => {
            // In a real app, this would call an API to decline the investment
            Alert.alert("Success", "Investment declined successfully");
          }
        }
      ]
    );
  };

  const handleFulfill = (id) => {
    Alert.alert(
      "Mark as Fulfilled",
      "Are you sure you want to mark this investment as fulfilled?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Confirm", 
          onPress: () => {
            // In a real app, this would call an API to mark as fulfilled
            Alert.alert("Success", "Investment marked as fulfilled");
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Partner Investments</Text>

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
            All
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
          <DataTable.Title numeric>Total</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
          <DataTable.Title>Actions</DataTable.Title>
        </DataTable.Header>

        {filteredInvestments.map((investment) => (
          <DataTable.Row key={investment.id}>
            <DataTable.Cell>
              <View style={styles.partnerCell}>
                <Avatar.Text 
                  size={36} 
                  label={investment.partnerLogo} 
                  style={styles.avatar}
                />
                <Text>{investment.partnerName}</Text>
              </View>
            </DataTable.Cell>
            <DataTable.Cell>{investment.orderDate}</DataTable.Cell>
            <DataTable.Cell>{investment.products}</DataTable.Cell>
            <DataTable.Cell numeric>${investment.totalPrice}</DataTable.Cell>
            <DataTable.Cell>
              <Text style={{ color: getStatusColor(investment.status) }}>
                {investment.status}
              </Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <View style={styles.actionButtons}>
                {investment.status === "Pending" && (
                  <>
                    <Button 
                      compact 
                      mode="contained" 
                      onPress={() => handleApprove(investment.id)}
                      style={styles.smallButton}
                    >
                      Approve
                    </Button>
                    <Button 
                      compact 
                      mode="outlined" 
                      onPress={() => handleDecline(investment.id)}
                      style={styles.smallButton}
                    >
                      Decline
                    </Button>
                  </>
                )}
                {investment.status === "Approved" && (
                  <Button 
                    compact 
                    mode="contained" 
                    onPress={() => handleFulfill(investment.id)}
                    style={styles.smallButton}
                  >
                    Fulfill
                  </Button>
                )}
                {investment.status === "Fulfilled" && (
                  <Button 
                    compact 
                    mode="outlined" 
                    onPress={() => router.push(`/partners/${investment.id}`)}
                    style={styles.smallButton}
                  >
                    Details
                  </Button>
                )}
              </View>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>

      {/* Investment Details Modal would go here */}
    </ScrollView>
  );
}

function getStatusColor(status) {
  switch(status) {
    case "Pending": return "orange";
    case "Approved": return "green";
    case "Fulfilled": return "blue";
    case "Declined": return "red";
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
  partnerCell: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 8,
    backgroundColor: '#6200ee',
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  smallButton: {
    margin: 2,
  },
});
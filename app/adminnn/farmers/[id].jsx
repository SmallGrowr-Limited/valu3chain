import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { DataTable, Card, Button, Chip } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";


export default function FarmerDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  // Sample data - in a real app, this would come from an API
  const farmer = {
    id: 1,
    name: "John Doe",
    region: "North",
    crop: "Maize",
    status: "Verified",
    agent: "Agent 1",
    date: "2023-04-15",
    inputs: [
      { type: "Seeds", quantity: 5, date: "2023-04-20", status: "Delivered" },
      { type: "Fertilizer", quantity: 10, date: "2023-05-01", status: "Pending" },
    ],
    audits: [
      { date: "2023-04-25", action: "Verification", by: "Admin 1" },
      { date: "2023-04-20", action: "Onboarding", by: "Agent 1" },
    ],
    yield: "5.2 tons/ha",
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.navigate("/adminnn/farmers")}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{farmer.name}</Text>
        <Chip
          style={styles.statusChip}
          textStyle={{ color: getStatusColor(farmer.status) }}
        >
          {farmer.status}
        </Chip>
      </View>

      <Card style={styles.card}>
        <Card.Title title="Basic Information" />
        <Card.Content>
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell>Region</DataTable.Cell>
              <DataTable.Cell>{farmer.region}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Primary Crop</DataTable.Cell>
              <DataTable.Cell>{farmer.crop}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Agent</DataTable.Cell>
              <DataTable.Cell>{farmer.agent}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Onboarding Date</DataTable.Cell>
              <DataTable.Cell>{farmer.date}</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Yield</DataTable.Cell>
              <DataTable.Cell>{farmer.yield}</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Inputs Received" />
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Type</DataTable.Title>
              <DataTable.Title>Quantity</DataTable.Title>
              <DataTable.Title>Date</DataTable.Title>
              <DataTable.Title>Status</DataTable.Title>
            </DataTable.Header>

            {farmer.inputs.map((input, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{input.type}</DataTable.Cell>
                <DataTable.Cell>{input.quantity}</DataTable.Cell>
                <DataTable.Cell>{input.date}</DataTable.Cell>
                <DataTable.Cell>
                  <Text style={{ color: getStatusColor(input.status) }}>
                    {input.status}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title
          title="Audit History"
          right={() => (
            <Button
              onPress={() => router.push(`/adminnn/farmers/audit?id=${id}`)}
            >
              View Full
            </Button>
          )}
        />
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Date</DataTable.Title>
              <DataTable.Title>Action</DataTable.Title>
              <DataTable.Title>By</DataTable.Title>
            </DataTable.Header>

            {farmer.audits.slice(0, 3).map((audit, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{audit.date}</DataTable.Cell>
                <DataTable.Cell>{audit.action}</DataTable.Cell>
                <DataTable.Cell>{audit.by}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>

      <View style={styles.actions}>
        {farmer.status === "Pending" && (
          <>
            <Button mode="contained" style={styles.actionButton}>
              Verify Farmer
            </Button>
            <Button mode="outlined" style={styles.actionButton}>
              Decline
            </Button>
          </>
        )}
        {farmer.status === "Verified" && (
          <Button mode="contained" style={styles.actionButton}>
            Activate Account
          </Button>
        )}
      </View>
    </ScrollView>
  );
}

function getStatusColor(status) {
  switch(status) {
    case "Pending": return "orange";
    case "Verified": return "blue";
    case "Active": 
    case "Delivered": 
      return "green";
    default: return "black";
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 8,
  },
  statusChip: {
    alignSelf: "flex-start",
  },
  card: {
    marginBottom: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  actionButton: {
    marginHorizontal: 8,
  },
});
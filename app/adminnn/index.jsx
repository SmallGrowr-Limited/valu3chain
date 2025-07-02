import { View, Text, ScrollView, StyleSheet } from "react-native";
import { DataTable, Card, Button } from "react-native-paper";
import { useRouter } from "expo-router";
import KpiCard from "../../components/admin/KpiCard";
import LineChart from "../../components/admin/LineChart";
import BarChart from "../../components/admin/BarChart";
import RecentActivity from "../../components/admin/RecentActivity";
import activityData from "../../components/admin/data/testData";

export default function Dashboard() {
  const router = useRouter();

  // Sample data
  const recentFarmers = [
    { id: 1, name: "John Doe", region: "North", status: "Verified" },
    { id: 2, name: "Jane Smith", region: "South", status: "Pending" },
    { id: 3, name: "Bob Johnson", region: "East", status: "Active" },
  ];

  const pendingRequests = [
    { id: 1, farmer: "John Doe", input: "Seeds", quantity: 5, date: "2023-05-01" },
    { id: 2, farmer: "Jane Smith", input: "Fertilizer", quantity: 10, date: "2023-05-02" },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.title}>Admin Dashboard</Text> */}

      {/* KPI Cards */}
      <View style={styles.kpiRow}>
        <KpiCard title="Farmers" value="2,458" icon="account-group" />
        <KpiCard title="Agents" value="42" icon="account-supervisor" />
        <KpiCard title="Partners" value="18" icon="cart" />
      </View>

      <Card style={styles.card}>
        <Card.Title title="Pending Requests" />
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Farmer</DataTable.Title>
              <DataTable.Title>Input</DataTable.Title>
              <DataTable.Title>Quantity</DataTable.Title>
              <DataTable.Title>Date</DataTable.Title>
            </DataTable.Header>

            {pendingRequests.map((request) => (
              <DataTable.Row key={request.id}>
                <DataTable.Cell>{request.farmer}</DataTable.Cell>
                <DataTable.Cell>{request.input}</DataTable.Cell>
                <DataTable.Cell>{request.quantity}</DataTable.Cell>
                <DataTable.Cell>{request.date}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => router.push("/adminnn/inputs/requests")}>
            Manage Requests
          </Button>
        </Card.Actions>
      </Card>

      {/* Charts */}
      <Card style={styles.chartCard}>
        <Card.Title title="Market Price Trends" />
        <Card.Content><LineChart  /> </Card.Content>
      </Card>

      {/* Recent Activity */}
      <RecentActivity data={activityData} />

      <Card style={styles.card}>
        <Card.Title title="Recent Farmers" />
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Region</DataTable.Title>
              <DataTable.Title>Status</DataTable.Title>
            </DataTable.Header>

            {recentFarmers.map((farmer) => (
              <DataTable.Row key={farmer.id}>
                <DataTable.Cell>{farmer.name}</DataTable.Cell>
                <DataTable.Cell>{farmer.region}</DataTable.Cell>
                <DataTable.Cell>{farmer.status}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => router.push("/adminnn/farmers")}>
            View All
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
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
  card: {
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  kpiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  chartCard: { marginVertical: 8, backgroundColor: "#fff" },
});
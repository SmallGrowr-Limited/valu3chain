import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { DataTable, Card, Button, Searchbar, Avatar } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react"; 
import { Ionicons } from "@expo/vector-icons";

export default function FarmerAudit() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data - in a real app, this would come from an API
  const farmer = {
    id: 1,
    name: "John Doe",
    region: "North",
    agent: "Agent 1",
    status: "Verified",
    avatar: "JD",
  };

  const auditLogs = [
    {
      id: 1,
      date: "2023-05-15 14:30",
      action: "Status Changed",
      details: "From Pending to Verified",
      performedBy: "Admin 1",
      role: "System Admin",
    },
    {
      id: 2,
      date: "2023-05-10 11:15",
      action: "Input Assigned",
      details: "5kg Maize Seeds",
      performedBy: "Agent 1",
      role: "Field Agent",
    },
    {
      id: 3,
      date: "2023-05-05 09:45",
      action: "Profile Updated",
      details: "Changed farm size from 2 to 3 acres",
      performedBy: "John Doe",
      role: "Farmer",
    },
    {
      id: 4,
      date: "2023-05-01 16:20",
      action: "Account Created",
      details: "Farmer onboarded",
      performedBy: "Agent 1",
      role: "Field Agent",
    },
  ];

  const filteredLogs = auditLogs.filter(log =>
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.performedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.navigate("/adminnn/farmers")}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Avatar.Text size={48} label={farmer.avatar} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.title}>Audit Log - {farmer.name}</Text>
          <Text style={styles.subtitle}>
            {farmer.region} • {farmer.agent} • {farmer.status}
          </Text>
        </View>
      </View>

      <Searchbar
        placeholder="Search audit logs..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.search}
      />

      <Card style={styles.card}>
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Date</DataTable.Title>
              <DataTable.Title>Action</DataTable.Title>
              <DataTable.Title>Performed By</DataTable.Title>
            </DataTable.Header>

            {filteredLogs.map((log) => (
              <DataTable.Row
                key={log.id}
                onPress={() =>
                  router.push({
                    pathname: `/adminnn/farmers/audit/details`,
                    params: { logId: log.id },
                  })
                }
              >
                <DataTable.Cell>{log.date}</DataTable.Cell>
                <DataTable.Cell>{log.action}</DataTable.Cell>
                <DataTable.Cell>
                  <View style={styles.performer}>
                    <Avatar.Text
                      size={24}
                      label={log.performedBy
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                      style={styles.smallAvatar}
                    />
                    <Text>{log.performedBy}</Text>
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>

      <View style={styles.actions}>
        <Button
          mode="outlined"
          onPress={() => router.back()}
          style={styles.button}
        >
          Back to Farmer
        </Button>
        <Button
          mode="contained"
          onPress={() => console.log("Export audit log")}
          style={styles.button}
        >
          Export Audit Log
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    marginRight: 16,
    backgroundColor: '#6200ee',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  search: {
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  performer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallAvatar: {
    marginRight: 8,
    backgroundColor: '#03a9f4',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});
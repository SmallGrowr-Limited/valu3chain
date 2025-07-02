import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Card, Button } from "react-native-paper";
import { useRouter } from "expo-router";

export default function ReportsDashboard() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Reports</Text>
      
      <Card style={styles.card} onPress={() => router.push("/reports/weekly")}>
        <Card.Content>
          <Text style={styles.cardTitle}>Weekly Reports</Text>
          <Text style={styles.cardText}>
            View and generate weekly reports on investments, produce sold, input usage, and agent performance.
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button>View Weekly Reports</Button>
        </Card.Actions>
      </Card>
      
      <Card style={styles.card} onPress={() => router.push("/reports/monthly")}>
        <Card.Content>
          <Text style={styles.cardTitle}>Monthly Reports</Text>
          <Text style={styles.cardText}>
            Comprehensive monthly reports with analytics and trends.
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button>View Monthly Reports</Button>
        </Card.Actions>
      </Card>
      
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Investments Report</Text>
          <Text style={styles.cardText}>
            Track all partner investments, status, and returns.
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button>Generate Report</Button>
        </Card.Actions>
      </Card>
      
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Produce Sales Report</Text>
          <Text style={styles.cardText}>
            Analyze produce sold through the marketplace.
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button>Generate Report</Button>
        </Card.Actions>
      </Card>
      
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Input Usage Report</Text>
          <Text style={styles.cardText}>
            Track distribution and usage of seeds, fertilizer, etc.
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button>Generate Report</Button>
        </Card.Actions>
      </Card>
      
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Agent Performance</Text>
          <Text style={styles.cardText}>
            Evaluate agent performance metrics and farmer onboarding.
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button>Generate Report</Button>
        </Card.Actions>
      </Card>
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
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardText: {
    color: "#666",
    marginBottom: 8,
  },
});
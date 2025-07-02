import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import InvestmentCard from "../../../components/elements/InvestmentCard";
import { Colors } from "../../../components/constants/colors";
import { investmentPortfolio } from "../../../components/constants/data";

export default function Investments() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Investment Management</Text>

      <TouchableOpacity
        style={styles.aiButton}
        onPress={() => router.push("/modal/ai-query")}
      >
        <Text style={styles.aiButtonText}>
          Find Market Opportunities with AI
        </Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Your Portfolio</Text>
      {investmentPortfolio.map((item) => (
        <InvestmentCard
          key={item.id}
          data={item}
          onPress={() => router.push(`/investments/details/${item.id}`)}
        />
      ))}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.actionButton]}
          onPress={() => router.push("/modal/purchase-order")}
        >
          <Text style={styles.actionText}>Make Purchase Order</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.actionButton]}
          onPress={() => router.push("/modal/fund-allocation")}
        >
          <Text style={styles.actionText}>Allocate Funds</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // ... styles similar to dashboard
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primaryText,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.secondaryText,
    marginTop: 4,
  },
  aiButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  aiButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primaryText,
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    width: "30%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.secondaryText,
    marginTop: 4,
    textAlign: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    backgroundColor: Colors.secondary,
    padding: 16,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  actionText: {
    color: "white",
    fontWeight: "bold",
  },
});

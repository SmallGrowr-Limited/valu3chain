import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import TransactionItem from "../../../components/elements/TransactionItem";
import { Colors } from "../../../components/constants/colors";
import { paymentHistory } from "../../../components/constants/data";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Payments() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.navigate("/ecosystem/home")}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}></Text>
        <View style={{ width: 24 }} />
      </View>
      <Text style={styles.title}>Payment Gateway</Text>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Escrow Account Balance</Text>
        <Text style={styles.balanceAmount}>$245,780.50</Text>
      </View>

      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      <FlatList
        data={paymentHistory}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />

      <View style={styles.actions}>
        <Text style={styles.actionText}>Need to make a payment?</Text>
        <Text style={styles.actionSubtext}>
          All payments are processed through our secure escrow system
        </Text>
      </View>
    </ScrollView>
  );
}


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingTop: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primaryText,
  },
  filterButton: {
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    padding: 8,
  },
  balanceCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  balanceLabel: {
    fontSize: 16,
    color: Colors.secondaryText,
    marginBottom: 8,
    textAlign: "center",
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
    marginBottom: 8,
  },
  balanceSubtext: {
    fontSize: 14,
    color: Colors.secondaryText,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.primaryText,
    marginBottom: 16,
  },
  transactionList: {
    marginBottom: 24,
  },
  transactionItem: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  transactionLeft: {
    flex: 1,
    marginRight: 12,
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.primaryText,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: Colors.secondaryText,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  creditAmount: {
    color: Colors.success,
  },
  debitAmount: {
    color: Colors.primaryText,
  },
  transactionStatus: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: "hidden",
  },
  statusCompleted: {
    backgroundColor: Colors.successLight,
    color: Colors.successDark,
  },
  statusPending: {
    backgroundColor: Colors.warningLight,
    color: Colors.warningDark,
  },
  statusFailed: {
    backgroundColor: Colors.dangerLight,
    color: Colors.dangerDark,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginHorizontal: 4,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.lightGray,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  primaryButtonText: {
    color: Colors.textOnPrimary,
  },
  secondaryButtonText: {
    color: Colors.primaryText,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.secondaryText,
    textAlign: "center",
    marginTop: 16,
  },
  paymentMethodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.primaryText,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 12,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

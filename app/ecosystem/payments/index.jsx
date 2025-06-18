import { View, ScrollView, Text, StyleSheet, FlatList } from "react-native";
import TransactionItem from "../../../components/elements/TransactionItem";
import { Colors } from "../../../components/constants/colors";
import { paymentHistory } from "../../../components/constants/data";

export default function Payments() {
  return (
    <ScrollView style={styles.container}>
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

const styles = StyleSheet.create({
  // ... payment-specific styles
});

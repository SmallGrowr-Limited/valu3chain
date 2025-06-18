import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const TransactionItem = ({ transaction, onPress }) => {
  // Determine styling based on transaction type and status
  const amountColor =
    transaction.type === "credit" ? Colors.success : Colors.primaryText;
  const statusColor =
    transaction.status === "completed"
      ? Colors.success
      : transaction.status === "pending"
      ? Colors.warning
      : Colors.danger;
  const iconName =
    transaction.type === "credit" ? "arrow-down-circle" : "arrow-up-circle";
  const iconColor =
    transaction.type === "credit" ? Colors.success : Colors.primary;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={24} color={iconColor} />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.description} numberOfLines={1}>
          {transaction.description}
        </Text>
        <View style={styles.metaContainer}>
          <Text style={[styles.status, { color: statusColor }]}>
            {transaction.status}
          </Text>
          <Text style={styles.date}>{transaction.date}</Text>
        </View>
      </View>

      <View style={styles.amountContainer}>
        <Text style={[styles.amount, { color: amountColor }]}>
          {transaction.type === "credit" ? "+" : "-"}$
          {transaction.amount.toLocaleString()}
        </Text>
        <Text style={styles.reference}>{transaction.reference}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
    marginRight: 8,
  },
  description: {
    fontSize: 15,
    fontWeight: "500",
    color: Colors.primaryText,
    marginBottom: 4,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  status: {
    fontSize: 12,
    fontWeight: "600",
    marginRight: 8,
    textTransform: "capitalize",
  },
  date: {
    fontSize: 12,
    color: Colors.secondaryText,
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  reference: {
    fontSize: 10,
    color: Colors.secondaryText,
    fontFamily: "monospace",
  },
});

export default TransactionItem;

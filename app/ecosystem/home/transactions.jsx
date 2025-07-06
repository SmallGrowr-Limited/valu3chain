import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Colors } from "../../../components/constants/colors";
import {
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const TransactionHistory = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  // Sample transaction data
  const transactions = [
    {
      id: "1",
      type: "investment",
      category: "farm_input",
      title: "Maize Seeds Purchase",
      amount: 750000,
      date: "2023-06-15",
      status: "completed",
      details: {
        inputType: "seeds",
        quantity: 500,
        unit: "kg",
      },
    },
    {
      id: "2",
      type: "purchase",
      category: "farm_product",
      title: "Tomato Harvest Purchase",
      amount: 450000,
      date: "2023-06-10",
      status: "completed",
      details: {
        product: "tomatoes",
        quantity: 1200,
        unit: "kg",
        farmer: "Kaduna Growers Co-op",
      },
    },
    {
      id: "3",
      type: "investment",
      category: "equipment",
      title: "Tractor Lease",
      amount: 1200000,
      date: "2023-06-05",
      status: "active",
      details: {
        equipmentType: "tractor",
        duration: "6 months",
      },
    },
    {
      id: "4",
      type: "sale",
      category: "warehouse",
      title: "Stored Maize Sale",
      amount: 680000,
      date: "2023-05-28",
      status: "completed",
      details: {
        product: "maize",
        quantity: 800,
        unit: "kg",
        buyer: "Flour Mills Nigeria",
      },
    },
    {
      id: "5",
      type: "investment",
      category: "funding",
      title: "Cassava Processing",
      amount: 2500000,
      date: "2023-05-20",
      status: "active",
      details: {
        projectId: "PROJ-2023-05",
        roi: "22%",
      },
    },
  ];

  // Filter transactions based on active filter
  const filteredTransactions = transactions.filter((transaction) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "investment") return transaction.type === "investment";
    if (activeFilter === "purchase") return transaction.type === "purchase";
    if (activeFilter === "sale") return transaction.type === "sale";
    return true;
  });

  const getTransactionIcon = (transaction) => {
    switch (transaction.type) {
      case "investment":
        if (transaction.category === "farm_input") {
          return (
            <MaterialIcons name="grass" size={24} color={Colors.primary} />
          );
        } else if (transaction.category === "equipment") {
          return <FontAwesome name="gears" size={24} color={Colors.primary} />;
        } else {
          return (
            <MaterialCommunityIcons
              name="hand-coin"
              size={24}
              color={Colors.primary}
            />
          );
        }
      case "purchase":
        return (
          <MaterialCommunityIcons
            name="basket"
            size={24}
            color={Colors.success}
          />
        );
      case "sale":
        return (
          <MaterialCommunityIcons
            name="warehouse"
            size={24}
            color={Colors.secondary}
          />
        );
      default:
        return (
          <MaterialIcons name="attach-money" size={24} color={Colors.primary} />
        );
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return styles.statusCompleted;
      case "active":
        return styles.statusActive;
      case "pending":
        return styles.statusPending;
      case "failed":
        return styles.statusFailed;
      default:
        return styles.statusDefault;
    }
  };

  const renderTransactionItem = ({ item }) => (
    <TouchableOpacity style={styles.transactionCard}>
      <View style={styles.transactionHeader}>
        <View style={styles.transactionIcon}>{getTransactionIcon(item)}</View>
        <View style={styles.transactionTitle}>
          <Text style={styles.transactionName}>{item.title}</Text>
          <Text style={styles.transactionDate}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.transactionAmount}>
          <Text
            style={[
              styles.amountText,
              item.type === "sale"
                ? styles.positiveAmount
                : styles.negativeAmount,
            ]}
          >
            {item.type === "sale" ? "+" : "-"}₦{item.amount.toLocaleString()}
          </Text>
          <Text style={[styles.statusText, getStatusStyle(item.status)]}>
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.transactionDetails}>
        {Object.entries(item.details).map(([key, value]) => (
          <View key={key} style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              :
            </Text>
            <Text style={styles.detailValue}>{value}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transaction History</Text>
        <TouchableOpacity style={styles.filterButton}>
          <MaterialIcons name="filter-list" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.filterTabs}>
        <TouchableOpacity
          style={[styles.filterTab, activeFilter === "all" && styles.activeTab]}
          onPress={() => setActiveFilter("all")}
        >
          <Text
            style={[
              styles.filterTabText,
              activeFilter === "all" && styles.activeTabText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterTab,
            activeFilter === "investment" && styles.activeTab,
          ]}
          onPress={() => setActiveFilter("investment")}
        >
          <MaterialIcons
            name="grass"
            size={16}
            color={
              activeFilter === "investment"
                ? Colors.textOnPrimary
                : Colors.primary
            }
          />
          <Text
            style={[
              styles.filterTabText,
              activeFilter === "investment" && styles.activeTabText,
            ]}
          >
            Investments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterTab,
            activeFilter === "purchase" && styles.activeTab,
          ]}
          onPress={() => setActiveFilter("purchase")}
        >
          <MaterialCommunityIcons
            name="basket"
            size={16}
            color={
              activeFilter === "purchase"
                ? Colors.textOnPrimary
                : Colors.success
            }
          />
          <Text
            style={[
              styles.filterTabText,
              activeFilter === "purchase" && styles.activeTabText,
            ]}
          >
            Purchases
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterTab,
            activeFilter === "sale" && styles.activeTab,
          ]}
          onPress={() => setActiveFilter("sale")}
        >
          <MaterialCommunityIcons
            name="warehouse"
            size={16}
            color={
              activeFilter === "sale" ? Colors.textOnPrimary : Colors.secondary
            }
          />
          <Text
            style={[
              styles.filterTabText,
              activeFilter === "sale" && styles.activeTabText,
            ]}
          >
            Sales
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTransactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialIcons
              name="receipt"
              size={48}
              color={Colors.secondaryText}
            />
            <Text style={styles.emptyStateText}>
              No {activeFilter === "all" ? "" : activeFilter} transactions found
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
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
  filterTabs: {
    flexDirection: "row",
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  filterTab: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: Colors.lightGray,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  filterTabText: {
    marginLeft: 4,
    color: Colors.primaryText,
  },
  activeTabText: {
    color: Colors.textOnPrimary,
  },
  listContent: {
    paddingBottom: 24,
  },
  transactionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  transactionIcon: {
    marginRight: 12,
  },
  transactionTitle: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primaryText,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: Colors.secondaryText,
  },
  transactionAmount: {
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  positiveAmount: {
    color: Colors.success,
  },
  negativeAmount: {
    color: Colors.primaryText,
  },
  statusText: {
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
  statusActive: {
    backgroundColor: Colors.primaryLight,
    color: Colors.primaryDark,
  },
  statusPending: {
    backgroundColor: Colors.warningLight,
    color: Colors.warningDark,
  },
  statusFailed: {
    backgroundColor: Colors.dangerLight,
    color: Colors.dangerDark,
  },
  statusDefault: {
    backgroundColor: Colors.lightGray,
    color: Colors.secondaryText,
  },
  transactionDetails: {
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    paddingTop: 12,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  detailLabel: {
    width: 120,
    fontSize: 14,
    color: Colors.secondaryText,
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
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
});

export default TransactionHistory;

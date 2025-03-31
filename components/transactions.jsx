import React, { useState } from "react";
import { View, Text, FlatList, Switch, StyleSheet } from "react-native";

const transactions = [
  { id: "1", title: "Soya Beans", amount: "120tons", date: "2025-03-30" },
  { id: "2", title: "Maize", amount: "150tons", date: "2025-03-28" },
  { id: "3", title: "Rice", amount: "105tos", date: "2025-03-27" },
  {
    id: "4",
    title: "Onions",
    amount: "60tons",
    date: "2025-03-26",
  },
  { id: "5", title: "Cabbages", amount: "76tons", date: "2025-03-25" },
];

const Transactions = () => {
  const [isRow, setIsRow] = useState(false);

  const renderItem = ({ item }) => (
    <View
      style={[styles.transaction, isRow ? styles.rowItem : styles.columnItem]}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.amount}>{item.amount}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <Text style={styles.headerText}>Demand Volumn</Text>
        <Switch value={isRow} onValueChange={setIsRow} />
      </View>
      {isRow ? (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
        // <FlatList
        //   data={transactions}
        //   keyExtractor={(item) => item.id}
        //   renderItem={renderItem}
        //   numColumns={2}
        // />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  headerText: {
    fontSize: 20,
    fontWeight: 700,
    color: "#0a990b",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  transaction: {
    padding: 16,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  columnItem: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 14,
    color: "#ff4500",
  },
  date: {
    fontSize: 12,
    color: "gray",
  },
});

export default Transactions;

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import PieChartComponent from "../../components/charts/pieChart";
import { trades } from "../../components/data";

const Index = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.rowItem}>
      <View style={styles.nameFieldWrap}>
        <Text style={styles.field}>{item.name}</Text>
      </View>
      <View style={styles.dateFieldWrap}>
        <Text style={styles.field}>{item.date}</Text>
      </View>
      <View style={styles.statusFieldWrap}>
        <Text style={[styles.field, item.status == "Completed" ? styles.completedFont : item.status == "Failed" ? styles.failed : styles.inprogressFont]}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.notifications}>
        <View>
          <Text style={styles.userName}>Hello, Admin</Text>
        </View>
        <Ionicons name="notifications-circle" size={30} color="#000" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.chartSection}>
          <Text style={styles.title}>Commodity Price Chart</Text>
          <PieChartComponent />
        </View>
        <View style={styles.listItem}>
          <Text style={styles.title}>Transaction History</Text>
          <FlatList
            data={trades}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  contentWrapper: { flex: 1, padding: 10 },
  notifications: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  userName: { fontSize: 18, fontWeight: 500, color: "#0a990b" },
  title: { fontSize: 18, fontWeight: 500, padding: 10 },
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    marginBottom: 5,
    paddingVertical: 10,
    width: "100%",
  },
  listItem: {
    marginTop: 20,
    padding: 10,
  },
  field: {
    fontSize: 16,
  },
  nameFieldWrap: {
    width: "40%",
  },
  dateFieldWrap: {
    width: "30%",
  },
  statusFieldWrap: {
    width: "30%",
  },
  inprogressFont: {
   
    color: "#FFB715",
  },

  completedFont: {
    
    color: "#16B116",
  },
  failed: {
   
    color: "#E81D0B",
  },
});

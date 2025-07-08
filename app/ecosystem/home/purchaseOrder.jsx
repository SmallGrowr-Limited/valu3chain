import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Picker,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Colors } from "../../../components/constants/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import PurchaseOrder from "../../../components/productOrder";

const PurchaseOrderModal = ({router}) => {
  router = useRouter()
  return (
    <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.navigate("/ecosystem/home")}>
            <Ionicons name="close" size={28} color={Colors.primaryText} />
          </TouchableOpacity>
          <Text style={styles.title}>New Purchase Order</Text>
          <View style={{ width: 28 }} />
        </View>
        {/* Product Order Component */}
        <PurchaseOrder />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
 
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primaryText,
  },
});

export default PurchaseOrderModal;

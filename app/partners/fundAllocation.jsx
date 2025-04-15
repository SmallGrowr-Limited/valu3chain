import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, {useState} from 'react'
import { SelectList } from "react-native-dropdown-select-list";

export default function FundAllocation() {
 const [transactionType, setTransactionType] = useState("");
  const values = [
    { key: "1", value: "Seeds/Fertilizers" },
    { key: "2", value: "Irrigation" },
    { key: "3", value: "Irrigation" },
  ];

  const purpose = [
    { key: "1", value: "Loan" },
    { key: "2", value: "Sponsorship" },
    { key: "3", value: "Partnership" },
    { key: "3", value: "Equity" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Fund Allocation</Text>
      </View>
      <View style={styles.formSection}>
        <View style={styles.formInput}>
          <Text style={styles.formLabel}>Purpose of Fund</Text>
          <SelectList
            setSelected={(val) => setTransactionType(val)}
            data={values}
            save="value"
            style={styles.formInput}
          />
        </View>
        <View style={styles.formInput}>
          <Text style={styles.formLabel}>Purpose of Fund</Text>
          <SelectList
            setSelected={(val) => setTransactionType(val)}
            data={purpose}
            save="value"
            style={styles.formInput}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 10,
    paddingHorizontal: 20,
  },

  headerText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 500,
  },

  formSection: {
    paddingHorizontal: 20,
  },

  formLabel: {
    marginBottom: 5,
    marginTop: 15,
    color: "#333",
  },

  formControl: {
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#ffffff",
    // height: 45,
  },
  buttonSection: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#0a990b",
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
  },
});
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import DemandForm from "../../components/forms/farmerDemand";

export default function FarmerDemand() {
  const [demandType, setDemandType] = useState("");

  const demandValue = [
    { key: "1", value: "Purchase" },
    { key: "2", value: "Investment" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Register Demand</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formSection}>
          <DemandForm/>
        </View>
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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

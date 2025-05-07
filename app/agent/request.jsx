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
  const [farmerId, setFarmerId] = useState("");
  const [farmerName, setFarmerName] = useState("");
  const [requestType, setRequestType] = useState("");
  const [termOfDemand, setTermOfDemand] = useState("");
  const [equity, setEquity] = useState("");
  const [itemType, setItemType] = useState("");
  const [description, setDescription] = useState("");
  const [metric, setMetric] = useState("");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");
  const [requiredInput, setRequiredInput] = useState("");

  const demandValue = [
    { key: "1", value: "Purchase" },
    { key: "2", value: "Investment" },
  ];

  const demandtype = [
    { key: "1", value: "Outright Purchase" },
    { key: "2", value: "Credit" },
    { key: "3", value: "Equity" },
  ];

  const itemtype = [
    { key: "1", value: "Fund" },
    { key: "2", value: "Farm Inputs" },
    { key: "3", value: "Equipment" },
  ];

  const input = [
    { key: "1", value: "Fertilizer" },
    { key: "2", value: "Improved Seeds" },
    { key: "3", value: "Herbicides/Pesticides" },
    { key: "4", value: "Organic Manure" },
  ];

  const termofdemand = [
    { key: "1", value: "1 year" },
    { key: "2", value: "2 years" },
    { key: "3", value: "3 years" },
  ];
  const equitydata = [
    { key: "1", value: "0.5%" },
    { key: "2", value: "1%" },
    { key: "3", value: "1.5%" },
    { key: "4", value: "2%" },
  ];

  const farmersList = [
    { key: "1", value: "" },
    { key: "2", value: "" },
    { key: "3", value: "" },
    { key: "4", value: "" },
  ];

  const minimumSize = [
    { key: "1", value: "0.5" },
    { key: "2", value: "1" },
    { key: "3", value: "Above 1" },
    { key: "4", value: "Not Applicable" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Farmer Application Form</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formSection}>
          <View style={styles.formInput}>
        <Text style={styles.formLabel}>Farmer Name</Text>
        <SelectList
          setSelected={(val) => setFarmerName(val)}
          data={farmersList}
          save="value"
          style={styles.formInput}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Request Status</Text>
        <SelectList
          setSelected={(val) => setRequestType(val)}
          data={demandtype}
          save="value"
          style={styles.formInput}
        />
      </View>
      {
        requestType === "Equity" ? (<View style={styles.formInput}>
        <Text style={styles.formLabel}>Equity</Text>
        <SelectList
          setSelected={(val) => setEquity(val)}
          data={equitydata}
          save="value"
          style={styles.formInput}
        />
      </View>): null
      }

      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Category</Text>
        <SelectList
          setSelected={(val) => setItemType(val)}
          data={itemtype}
          save="value"
          style={styles.formInput}
        />
      </View>

      {
        itemType === "Fund" ? (
        <>
        <View style={styles.formInput}>
        <Text style={styles.formLabel}>Amount</Text>
        <TextInput
          style={styles.formControl}
          placeholder=""
          keyboardType="text"
          onChangeText={(val) => setAmount(val)}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Purpose of Funds</Text>
        <TextInput
          style={styles.formControl}
          placeholder=""
          keyboardType="text"
          multiline={4}
          onChangeText={(val) => setDescription(val)}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Farm Size</Text>
        <SelectList
          setSelected={(val) => setInvestmentType(val)}
          data={minimumSize}
          save="value"
        />
      </View>
        </>
      ) : itemType === "Farm Inputs" ? (
        <>
          <View style={styles.formInput}>
            <Text style={styles.formLabel}>Required Inputs</Text>
            <SelectList
              setSelected={(val) => setRequiredInput(val)}
              data={input}
              save="value"
            />
          </View>
          <View style={styles.formInput}>
            <Text style={styles.formLabel}>Quantity</Text>
            <SelectList
              setSelected={(val) => setQuantity(val)}
              data={minimumSize}
              save="value"
            />
          </View>
        </>
      ) : null
      }
        </View>
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Submit Request</Text>
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

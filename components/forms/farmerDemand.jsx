import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";

export default function DemandForm() {
  const [farmerName, setFarmerName] = useState("");
  const [demandType, setDemandType] = useState("");
  const [termOfDemand, setTermOfDemand] = useState("");
  const [equity, setEquity] = useState("");
  const [itemType, setItemType] = useState("");
  const [description, setDescription] = useState("");
  const [metric, setMetric] = useState("");
  const [quantity, setQuantity] = useState("");

  const demandtype = [
    { key: "1", value: "Outright Purchase" },
    { key: "2", value: "Credit" },
    { key: "3", value: "Equity" },
  ];

  itemtype = [
    { key: "1", value: "Seed" },
    { key: "2", value: "Seedlings" },
    { key: "3", value: "Other input" },
    { key: "4", value: "Equipment" },
  ];

  termofdemand = [
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
  return (
    <>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Farmer</Text>
        <SelectList
          setSelected={(val) => setFarmerName(val)}
          data={farmersList}
          save="value"
          style={styles.formInput}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Type of Demand</Text>
        <SelectList
          setSelected={(val) => setDemandType(val)}
          data={demandtype}
          save="value"
          style={styles.formInput}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Term of Demand</Text>
        <SelectList
          setSelected={(val) => setTermOfDemand(val)}
          data={termofdemand}
          save="value"
          style={styles.formInput}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Equity</Text>
        <SelectList
          setSelected={(val) => setEquity(val)}
          data={equitydata}
          save="value"
          style={styles.formInput}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Type of Item</Text>
        <SelectList
          setSelected={(val) => setItemType(val)}
          data={itemtype}
          save="value"
          style={styles.formInput}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Description</Text>
        <TextInput
          style={styles.formControl}
          placeholder=""
          keyboardType="text"
          onChangeText={(val) => setDescription(val)}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Quantity (kg)</Text>
        <TextInput
          style={styles.formControl}
          placeholder=""
          keyboardType="text"
          onChangeText={(val) => setQuantity(val)}
        />
      </View>
      {/* <View style={styles.formInput}>
        <Text style={styles.formLabel}>Metric</Text>
        <SelectList
          setSelected={(val) => setMetric(val)}
          data={purchase}
          save="value"
          style={styles.formInput}
        />
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
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
});

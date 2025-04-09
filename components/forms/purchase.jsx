import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";

export default function Purchase() {
    const [commodity, setCommodity] = useState("");
  const [variety, setVariety] = useState("");
  const [brand, setBrand] = useState("");
  const [moisture, setMoisture] = useState("");
  const [purchaseType, setPurchaseType] = useState("");
  const [payment, setPayment] = useState("");

  const demandItems = [
    { key: "1", value: "Rice paddy" },
    { key: "2", value: "Maize" },
    { key: "3", value: "Soybean" },
    { key: "4", value: "Sorghum" },
    { key: "5", value: "Tomatoes" },
    { key: "6", value: "Peppers" },
    { key: "7", value: "Onion" },
  ];

  verietyType = [
    { key: "1", value: "Type 1" },
    { key: "2", value: "Type 2" },
  ];

  const purchase = [
    { key: "1", value: "Outright" },
    { key: "2", value: "Storage)" },
  ];
  return (
    <>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Commodity</Text>
        <SelectList
          setSelected={(val) => setVariety(val)}
          data={demandItems}
          save="value"
          style={styles.formInput}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Preferred Variety</Text>
        <SelectList
          setSelected={(val) => setVariety(val)}
          data={verietyType}
          save="value"
          style={styles.formInput}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Preferred Brand</Text>
        <SelectList
          setSelected={(val) => setBrand(val)}
          data={verietyType}
          save="value"
          style={styles.formInput}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Acceptable moisture level</Text>
        <SelectList
          setSelected={(val) => setMoisture(val)}
          data={verietyType}
          save="value"
          style={styles.formInput}
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
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Type of Purchase</Text>
        <SelectList
          setSelected={(val) => setPurchaseType(val)}
          data={purchase}
          save="value"
          style={styles.formInput}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Make advance payment.</Text>
        <SelectList
          setSelected={(val) => setPayment(val)}
          data={verietyType}
          save="value"
          style={styles.formInput}
        />
      </View>
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

import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";

export default function ProductListingForm() {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productVariety, setProductVariety] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [minimumOrder, setMinimumOrder] = useState("");
  const [storageCondition, setStorageCondition] = useState("");
  const [packagingType, setPackagingType] = useState("");
  const [deliveryCharges, setDeliveryCharges] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliverMethod, setDeliveryMethod] = useState("");


  const category = [
    { key: "1", value: "Grains" },
    { key: "2", value: "Vegetables" },
    { key: "3", value: "Fruits" },
    { key: "4", value: "Tubers" },
    { key: "5", value: "Poultry" },
  ];

  const packagingTypes = [
    { key: "1", value: "Sack" },
    { key: "2", value: "Bag" },
    { key: "3", value: "Crate" },
    { key: "4", value: "Loose" },
    { key: "5", value: "Others" },
  ];
  const storage = [
    { key: "1", value: "Dry" },
    { key: "2", value: "Cool " },
    { key: "3", value: "Refrigerated" },
    { key: "3", value: "Not Applicable" },
  ];
  const deliveryMethods = [
    { key: "1", value: "Pickup" },
    { key: "2", value: "Company Delivery" },
    { key: "3", value: "Third-Party Logistics" },
  ];
  const paymentModes = [
    { key: "1", value: "Bank Transfer" },
    { key: "2", value: "Cheque" },
    { key: "2", value: "Cash" },
  ];
  const paymentTerms = [
    { key: "1", value: "On Delivery" },
    { key: "2", value: "50% Advance" },
  ];
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>Product Information</Text>
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Product Name</Text>
        <TextInput
          style={styles.formControl}
          placeholder=""
          keyboardType="text"
          onChangeText={(val) => setProductName(val)}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Product Category</Text>
        <SelectList
          setSelected={(val) => setProductCategory(val)}
          data={category}
          save="value"
          style={styles.formInput}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Product Description</Text>
        <TextInput
          style={styles.formControl}
          placeholder=""
          keyboardType="text"
          onChangeText={(val) => setProductDescription(val)}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Product Variety (if any)</Text>
        <TextInput
          style={styles.formControl}
          placeholder=""
          keyboardType="text"
          onChangeText={(val) => setProductVariety(val)}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Quantity Available</Text>
        <TextInput
          style={styles.formControl}
          placeholder="e.g., 10 tons, 50 crates, etc."
          keyboardType="text"
          onChangeText={(val) => setAvailableQuantity(val)}
        />
      </View>
      <View style={styles.quantity}>
        <View style={{ width: "46%" }}>
          <Text style={styles.formLabel}>Unit Price (₦)</Text>
          <TextInput
            style={styles.formControl}
            placeholder=""
            keyboardType="text"
            onChangeText={(val) => setUnitPrice(val)}
          />
        </View>
        <View style={{ width: "46%" }}>
          <Text style={styles.formLabel}>Minimum Order </Text>
          <TextInput
            style={styles.formControl}
            placeholder=""
            keyboardType="text"
            onChangeText={(val) => setMinimumOrder(val)}
          />
        </View>
      </View>

      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Packaging Type</Text>
        <SelectList
          setSelected={(val) => setPackagingType(val)}
          data={packagingTypes}
          save="value"
          style={styles.formInput}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Storage Conditions</Text>
        <SelectList
          setSelected={(val) => setStorageCondition(val)}
          data={storage}
          save="value"
          style={styles.formInput}
        />
      </View>

      <View style={styles.header}>
        <Text style={styles.headerText}>Delivery and Fulfillment</Text>
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Delivery Address</Text>
        <TextInput
          style={styles.formControl}
          placeholder=""
          keyboardType="text"
          onChangeText={(val) => setDeliveryAddress(val)}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Delivery Method</Text>
        <SelectList
          setSelected={(val) => setDeliveryMethod(val)}
          data={deliveryMethods}
          save="value"
          style={styles.formInput}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Delivery Charges (₦)</Text>
        <TextInput
          style={styles.formControl}
          placeholder=""
          keyboardType="text"
          onChangeText={(val) => setDeliveryCharges(val)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: { marginTop: 15 },
  headerText: { fontSize: 18, fontWeight: 500 },
  formLabel: {
    marginBottom: 5,
    marginTop: 15,
    color: "#333",
  },

  quantity: {
    flexDirection: "row",
    justifyContent: "space-between",
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

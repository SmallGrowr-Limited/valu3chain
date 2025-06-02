import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "expo-router";
import { CREATE_PRODUCT_ORDER } from "../../graphql/mutations/orderMutation";

export default function ProductOrderForm() {
  const router = useRouter()
  // Form state consolidated into a single object
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    unit: "kg", // Default value
    unitPrice: "",
    totalPrice: "",
    variety: "",
    moisture: "",
    purchaseType: "",
    deliveryAddress: "",
    deliverMethod: "",
    paymentTerm: "",
    paymentMode: "",
  });

  // Dropdown options (moved outside component if reused elsewhere)
  const dropdownOptions = {
    varietyType: [
      { key: "1", value: "Type 1" },
      { key: "2", value: "Type 2" },
    ],
    purchaseType: [
      { key: "1", value: "Outright" },
      { key: "2", value: "Storage" },
    ],
    units: [
      { key: "1", value: "kg" },
      { key: "2", value: "tons" },
    ],
    deliveryMethods: [
      { key: "1", value: "Company Truck" },
      { key: "2", value: "Supplier Delivery" },
      { key: "3", value: "Third-Party Logistics" },
    ],
    paymentModes: [
      { key: "1", value: "Bank Transfer" },
      { key: "2", value: "Cheque" },
      { key: "3", value: "Cash" }, // Fixed duplicate key
    ],
    paymentTerms: [
      { key: "1", value: "On Delivery" },
      { key: "2", value: "50% Advance" },
    ],
    moistureOpt: [
      { key: "1", value: "Type 1" },
      { key: "2", value: "Type 2" },
    ],
  };

  const [productOrder, { loading }] = useMutation(CREATE_PRODUCT_ORDER, {
    onCompleted: () => {
      
      // Reset form after successful submission
      setFormData({
        productName: "",
        quantity: "",
        unit: "kg",
        unitPrice: "",
        totalPrice: "",
        variety: "",
        moisture: "",
        purchaseType: "",
        deliveryAddress: "",
        deliverMethod: "",
        paymentTerm: "",
        paymentMode: "",
      });
    },
  });
  

  const handleSubmit = async () => {
    // Basic validation
    if (
      !formData.productName ||
      !formData.quantity ||
      !formData.deliveryAddress
    ) {
      alert("Validation Error", "Please fill in all required fields");
      return;
    }

    try {
      const { data } = await productOrder({
        variables: {
          input: {
            productName: formData.productName,
            quantity: formData.quantity,
            unit: formData.unit,
            unitPrice: formData.unitPrice,
            totalPrice: formData.totalPrice,
            variety: formData.variety,
            moisture: formData.moisture,
            purchaseType: formData.purchaseType,
            deliveryAddress: formData.deliveryAddress,
            deliverMethod: formData.deliverMethod,
            paymentTerm: formData.paymentTerm,
            paymentMode: formData.paymentMode,
          },
        },
      });
      
      console.log(data);
      
      router.navigate("/partners")
    } catch (error) {
      console.log("Mutation response:", error);
    }
  };

  // Helper function to update form data
  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Order Details</Text>
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Product Name</Text>
        <TextInput
          style={styles.formControl}
          placeholder=""
          keyboardType="text"
          value={formData.productName}
          onChangeText={(val) => updateFormData("productName", val)}
        />
      </View>
      <View style={styles.row}>
        <View style={{ width: "46%" }}>
          <Text style={styles.formLabel}>Quantity</Text>
          <TextInput
            style={styles.formControl}
            placeholder=""
            value={formData.quantity}
            keyboardType="numeric"
            onChangeText={(val) => updateFormData("quantity", val)}
          />
        </View>
        <View style={{ width: "46%" }}>
          <Text style={styles.formLabel}>Unit</Text>
          <SelectList
            setSelected={(val) => updateFormData("unit", val)}
            data={dropdownOptions.units}
            save="value"
            defaultOption={{ key: "1", value: "kg" }}
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={{ width: "46%" }}>
          <Text style={styles.formLabel}>Unit Price (₦)</Text>
          <TextInput
            style={styles.formControl}
            placeholder=""
            keyboardType="text"
            value={formData.unitPrice}
            onChangeText={(val) => updateFormData("unitPrice", val)}
          />
        </View>
        <View style={{ width: "46%" }}>
          <Text style={styles.formLabel}>Total Price (₦)</Text>
          <TextInput
            style={styles.formControl}
            placeholder=""
            keyboardType="numeric"
            value={formData.totalPrice}
            onChangeText={(val) => updateFormData("totalPrice", val)}
          />
        </View>
      </View>

      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Preferred Variety</Text>
        <SelectList
          setSelected={(val) => updateFormData("variety", val)}
          data={dropdownOptions.varietyType}
          save="value"
          style={styles.formInput}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Acceptable moisture level</Text>
        <SelectList
          setSelected={(val) => updateFormData("moisture", val)}
          data={dropdownOptions.moistureOpt}
          save="value"
          style={styles.formInput}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Type of Purchase</Text>
        <SelectList
          setSelected={(val) => updateFormData("purchaseType", val)}
          data={dropdownOptions.purchaseType}
          save="value"
          style={styles.formInput}
        />
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Delivery and Payment</Text>
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Delivery Address</Text>
        <TextInput
          style={styles.formControl}
          placeholder=""
          keyboardType="text"
          value={formData.deliveryAddress}
          onChangeText={(val) => updateFormData("deliveryAddress", val)}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Delivery Method</Text>
        <SelectList
          setSelected={(val) => updateFormData("deliverMethod", val)}
          data={dropdownOptions.deliveryMethods}
          save="value"
          style={styles.formInput}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Payment Terms</Text>
        <SelectList
          setSelected={(val) => updateFormData("paymentTerm", val)}
          data={dropdownOptions.paymentTerms}
          save="value"
          style={styles.formInput}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Payment Mode</Text>
        <SelectList
          setSelected={(val) => updateFormData("paymentMode", val)}
          data={dropdownOptions.paymentModes}
          save="value"
          style={styles.formInput}
        />
      </View>
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Submitting..." : "Submit Order"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  header: {
    marginTop: 20,
    marginBottom: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "500",
  },
  formLabel: {
    marginBottom: 5,
    marginTop: 15,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  column: {
    width: "48%",
  },
  formControl: {
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#ffffff",
    marginBottom: 15,
  },
  buttonSection: {
    marginVertical: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#508060",
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
  },
});


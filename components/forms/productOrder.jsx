import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";

export default function ProductOrderForm() {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [variety, setVariety] = useState("");
  const [brand, setBrand] = useState("");
  const [moisture, setMoisture] = useState("");
  const [purchaseType, setPurchaseType] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliverMethod, setDeliveryMethod] = useState("");
  const [paymentTerm, setPaymentTerm] = useState("");
  const [paymentMode, setPaymentMode] = useState("");

  verietyType = [
    { key: "1", value: "Type 1" },
    { key: "2", value: "Type 2" },
  ];

  const purchase = [
    { key: "1", value: "Outright" },
    { key: "2", value: "Storage" },
  ];
  const units = [
    { key: "1", value: "kg" },
    { key: "2", value: "tons" },
  ];
  const deliveryMethods = [
    { key: "1", value: "Company Truck" },
    { key: "2", value: "Supplier Delivery" },
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
        <Text style={styles.headerText}>Order Details</Text>
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
      <View style={styles.quantity}>
        <View style={{ width: "46%" }}>
          <Text style={styles.formLabel}>Quantity</Text>
          <TextInput
            style={styles.formControl}
            placeholder=""
            keyboardType="text"
            onChangeText={(val) => setQuantity(val)}
          />
        </View>
        <View style={{ width: "46%" }}>
          <Text style={styles.formLabel}>Unit</Text>
          <SelectList
            setSelected={(val) => setUnit(val)}
            data={units}
            save="value"
            defaultOption={{key:"1", value:"kg"}}
            style={styles.formInput}
          />
        </View>
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
          <Text style={styles.formLabel}>Total Price (₦)</Text>
          <TextInput
            style={styles.formControl}
            placeholder=""
            keyboardType="text"
            onChangeText={(val) => setTotalPrice(val)}
          />
        </View>
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
        <Text style={styles.formLabel}>Acceptable moisture level</Text>
        <SelectList
          setSelected={(val) => setMoisture(val)}
          data={verietyType}
          save="value"
          style={styles.formInput}
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
      <View style={styles.header}>
        <Text style={styles.headerText}>Delivery and Payment</Text>
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
        <Text style={styles.formLabel}>Payment Terms</Text>
        <SelectList
          setSelected={(val) => setPaymentTerm(val)}
          data={paymentTerms}
          save="value"
          style={styles.formInput}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Payment Mode</Text>
        <SelectList
          setSelected={(val) => setPaymentMode(val)}
          data={paymentModes}
          save="value"
          style={styles.formInput}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header:{marginTop:15},
  headerText:{fontSize:18, fontWeight:500},
  formLabel: {
    marginBottom: 5,
    marginTop: 15,
    color: "#333",
  },

  quantity:{
    flexDirection:"row",
    justifyContent:"space-between"
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

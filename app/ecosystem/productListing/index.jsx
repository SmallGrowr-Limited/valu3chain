import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "../../../components/constants/colors";

export default function ProductListingForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    productName: "",
    productCategory: "",
    productDescription: "",
    productVariety: "",
    availableQuantity: "",
    unitPrice: "",
    minimumOrder: "",
    storageCondition: "",
    packagingType: "",
    deliveryCharges: "",
    deliveryAddress: "",
    deliverMethod: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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
    { key: "2", value: "Cool" },
    { key: "3", value: "Refrigerated" },
    { key: "4", value: "Not Applicable" },
  ];

  const deliveryMethods = [
    { key: "1", value: "Pickup" },
    { key: "2", value: "Company Delivery" },
    { key: "3", value: "Third-Party Logistics" },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.navigate("/ecosystem/dashboard")}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Listing</Text>
        <View style={{ width: 24 }} />
      </View>
      <SectionHeader title="Product Information" />

      <FormInput
        label="Product Name"
        value={formData.productName}
        onChangeText={(val) => handleInputChange("productName", val)}
      />

      <FormSelect
        label="Product Category"
        data={category}
        onSelect={(val) => handleInputChange("productCategory", val)}
      />

      <FormInput
        label="Product Description"
        value={formData.productDescription}
        onChangeText={(val) => handleInputChange("productDescription", val)}
        multiline
        numberOfLines={3}
      />

      <FormInput
        label="Product Variety (if any)"
        value={formData.productVariety}
        onChangeText={(val) => handleInputChange("productVariety", val)}
      />

      <FormInput
        label="Quantity Available"
        value={formData.availableQuantity}
        onChangeText={(val) => handleInputChange("availableQuantity", val)}
        placeholder="e.g., 10 tons, 50 crates, etc."
      />

      <View style={styles.row}>
        <View style={styles.col}>
          <FormInput
            label="Unit Price (₦)"
            value={formData.unitPrice}
            onChangeText={(val) => handleInputChange("unitPrice", val)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.col}>
          <FormInput
            label="Minimum Order"
            value={formData.minimumOrder}
            onChangeText={(val) => handleInputChange("minimumOrder", val)}
          />
        </View>
      </View>

      <FormSelect
        label="Packaging Type"
        data={packagingTypes}
        onSelect={(val) => handleInputChange("packagingType", val)}
      />

      <FormSelect
        label="Storage Conditions"
        data={storage}
        onSelect={(val) => handleInputChange("storageCondition", val)}
      />

      <SectionHeader title="Delivery and Fulfillment" />

      <FormInput
        label="Delivery Address"
        value={formData.deliveryAddress}
        onChangeText={(val) => handleInputChange("deliveryAddress", val)}
        multiline
        numberOfLines={2}
      />

      <FormSelect
        label="Delivery Method"
        data={deliveryMethods}
        onSelect={(val) => handleInputChange("deliverMethod", val)}
      />

      <FormInput
        label="Delivery Charges (₦)"
        value={formData.deliveryCharges}
        onChangeText={(val) => handleInputChange("deliveryCharges", val)}
        keyboardType="numeric"
      />
    </ScrollView>
  );
}

// Reusable components
const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionHeaderText}>{title}</Text>
  </View>
);

const FormInput = ({ label, ...props }) => (
  <View style={styles.formInput}>
    <Text style={styles.formLabel}>{label}</Text>
    <TextInput
      style={styles.formControl}
      placeholderTextColor="#999"
      {...props}
    />
  </View>
);

const FormSelect = ({ label, data, onSelect }) => (
  <View style={styles.formInput}>
    <Text style={styles.formLabel}>{label}</Text>
    <SelectList
      setSelected={onSelect}
      data={data}
      save="value"
      boxStyles={styles.selectBox}
      inputStyles={styles.selectInput}
      dropdownStyles={styles.selectDropdown}
      dropdownTextStyles={styles.selectDropdownText}
    />
  </View>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primaryText,
  },
  sectionHeader: {
    marginTop: 25,
    marginBottom: 15,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e5e9",
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2c3e50",
  },
  formInput: {
    marginBottom: 15,
  },
  formLabel: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#34495e",
  },
  formControl: {
    borderWidth: 1,
    borderColor: "#d6dbdf",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#ffffff",
    fontSize: 15,
    color: "#2c3e50",
  },
  selectBox: {
    borderWidth: 1,
    borderColor: "#d6dbdf",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    height: 48,
  },
  selectInput: {
    fontSize: 15,
    color: "#2c3e50",
  },
  selectDropdown: {
    borderWidth: 1,
    borderColor: "#d6dbdf",
    borderRadius: 8,
    marginTop: 5,
  },
  selectDropdownText: {
    fontSize: 15,
    color: "#2c3e50",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  col: {
    width: "48%",
  },
});

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
// } from "react-native";
// import { SelectList } from "react-native-dropdown-select-list";
// import { Colors } from "../../../components/constants/colors";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { useRouter } from "expo-router";

// const ProductListingModal = ({ route, navigation }) => {
//   const [supplier, setSupplier] = useState("Smallgrowr Limited");
//   const [deliveryAddress, setDeliveryAddress] = useState("");
//   const [deliveryMethod, setDeliveryMethod] = useState("");
//   const [deliveryDate, setDeliveryDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [items, setItems] = useState([
//     { id: 1, name: "", quantity: "", unit: "kg", unitPrice: "" },
//   ]);
//   const [notes, setNotes] = useState("");
//   const [paymentTerms, setPaymentTerms] = useState("30 days after delivery");
//   const router = useRouter();

//   const investment = {
//     id: 1,
//     category: "Dairy",
//     location: "Zaria",
//   };

//   // Dropdown options (moved outside component if reused elsewhere)
//   const dropdownOptions = {
//     varietyType: [
//       { key: "1", value: "Type 1" },
//       { key: "2", value: "Type 2" },
//     ],
//     purchaseType: [
//       { key: "1", value: "Outright" },
//       { key: "2", value: "Storage" },
//     ],
//     units: [
//       { key: "1", value: "kg" },
//       { key: "2", value: "tons" },
//     ],
//     deliveryMethods: [
//       { key: "1", value: "Company Truck" },
//       { key: "2", value: "Supplier Delivery" },
//       { key: "3", value: "Third-Party Logistics" },
//     ],
//     paymentModes: [
//       { key: "1", value: "Bank Transfer" },
//       { key: "2", value: "Cheque" },
//       { key: "3", value: "Cash" }, // Fixed duplicate key
//     ],
//     paymentTerms: [
//       { key: "1", value: "On Delivery" },
//       { key: "2", value: "50% Advance" },
//     ],
//     moistureOpt: [
//       { key: "1", value: "Type 1" },
//       { key: "2", value: "Type 2" },
//     ],
//   };

//   const handleAddItem = () => {
//     setItems([
//       ...items,
//       {
//         id: items.length + 1,
//         name: "",
//         quantity: "",
//         unit: "kg",
//         unitPrice: "",
//       },
//     ]);
//   };

//   const handleRemoveItem = (id) => {
//     if (items.length > 1) {
//       setItems(items.filter((item) => item.id !== id));
//     }
//   };

//   const handleItemChange = (id, field, value) => {
//     setItems(
//       items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
//     );
//   };

//   const handleDateChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) {
//       setDeliveryDate(selectedDate);
//     }
//   };

//   const calculateTotal = () => {
//     return items.reduce((total, item) => {
//       const quantity = parseFloat(item.quantity) || 0;
//       const price = parseFloat(item.unitPrice) || 0;
//       return total + quantity * price;
//     }, 0);
//   };

//   const handleSubmit = () => {
//     const order = {
//       investmentId: investment.id,
//       supplier,
//       deliveryAddress,
//       deliveryDate,
//       items,
//       total: calculateTotal(),
//       notes,
//       paymentTerms,
//       deliveryMethod,
//       status: "pending",
//       createdAt: new Date(),
//     };
//     console.log("Purchase Order Submitted:", order);
//     router.navigate("/ecosystem/dashboard");
//     // navigation.goBack();
//     // Here you would typically send the order to your backend
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity
//             onPress={() => router.navigate("/ecosystem/dashboard")}
//           >
//             <Ionicons name="close" size={28} color={Colors.primaryText} />
//           </TouchableOpacity>
//           <Text style={styles.title}>New Product Listing</Text>
//           <View style={{ width: 28 }} /> {/* Spacer for alignment */}
//         </View>

//         {/* Product Owner Information */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Product Owner Details</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Supplier Name"
//             value={supplier}
//             onChangeText={setSupplier}
//             placeholderTextColor={Colors.secondaryText}
//           />
//         </View>

//         {/* Delivery Information */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Delivery Information</Text>

//         </View>

//         {/* Order Items */}
//         <View style={styles.section}>

//         </View>

//         {/* Payment Terms */}
//         <View style={styles.section}>

//         </View>

//         {/* Notes */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Notes</Text>
//           <TextInput
//             style={[styles.input, styles.notesInput]}
//             placeholder="Additional notes..."
//             value={notes}
//             onChangeText={setNotes}
//             multiline
//             numberOfLines={3}
//             placeholderTextColor={Colors.secondaryText}
//           />
//         </View>
//       </ScrollView>

//       {/* Submit Button */}
//       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//         <Text style={styles.submitButtonText}>Submit Product</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.background,
//   },
//   scrollContainer: {
//     padding: 20,
//     paddingBottom: 100,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: Colors.primaryText,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: Colors.secondaryText,
//     marginBottom: 24,
//   },
//   section: {
//     marginBottom: 24,
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: Colors.primaryText,
//     marginBottom:10,
//   },
//   input: {
//     backgroundColor: Colors.surface,
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     color: Colors.primaryText,
//     borderWidth: 1,
//     borderColor: Colors.lightGray,
//   },
//   dateInput: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: Colors.surface,
//     borderRadius: 8,
//     padding: 12,
//     borderWidth: 1,
//     borderColor: Colors.lightGray,
//   },
//   dateText: {
//     fontSize: 16,
//     color: Colors.primaryText,
//     marginLeft: 8,
//   },
//   addButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: Colors.primary,
//     borderRadius: 8,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//   },
//   addButtonText: {
//     color: Colors.textOnPrimary,
//     marginLeft: 4,
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   itemCard: {
//     backgroundColor: Colors.surface,
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: Colors.lightGray,
//   },
//   itemRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   itemInput: {
//     flex: 1,
//     marginRight: 8,
//   },
//   removeButton: {
//     padding: 8,
//   },
//   quantityRow: {
//     flexDirection: "row",
//     marginTop: 8,
//   },
//   quantityInput: {
//     flex: 2,
//     marginRight: 8,
//   },
//   unitInput: {
//     flex: 1,
//     marginRight: 8,
//   },
//   priceInput: {
//     flex: 2,
//   },
//   notesInput: {
//     minHeight: 80,
//     textAlignVertical: "top",
//   },
//   totalContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: Colors.surface,
//     borderRadius: 8,
//     padding: 16,
//     marginTop: 12,
//   },
//   totalLabel: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: Colors.primaryText,
//   },
//   totalAmount: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: Colors.primary,
//   },
//   submitButton: {
//     position: "absolute",
//     bottom: 20,
//     left: 20,
//     right: 20,
//     backgroundColor: Colors.primary,
//     borderRadius: 8,
//     padding: 16,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   submitButtonText: {
//     color: Colors.textOnPrimary,
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default ProductListingModal;

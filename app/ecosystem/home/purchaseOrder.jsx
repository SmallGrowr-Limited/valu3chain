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

const PurchaseOrderModal = ({ route, navigation }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState(new Date());

  // Product categories and types
  const categories = [
    { id: "grains", name: "Grains" },
    { id: "vegetables", name: "Vegetables" },
    { id: "fruits", name: "Fruits" },
    { id: "tubers", name: "Tubers" },
    { id: "livestock", name: "Livestock" },
    { id: "poultry", name: "Poultry" },
    { id: "dairy", name: "Dairy" },
  ];

  const productNames = {
    grains: ["Maize", "Rice", "Wheat", "Barley", "Sorghum", "Millet"],
    vegetables: ["Tomato", "Onion", "Pepper", "Cabbage", "Carrot", "Lettuce"],
    fruits: ["Apple", "Orange", "Banana", "Mango", "Pineapple", "Watermelon"],
    tubers: ["Potato", "Yam", "Cassava", "Sweet Potato", "Cocoyam"],
    livestock: ["Cattle", "Goat", "Sheep", "Pig"],
    poultry: ["Chicken", "Turkey", "Duck", "Quail"],
    dairy: ["Milk", "Cheese", "Yogurt", "Butter"],
  };

  // Market prices (would typically come from an API)
  const marketPrices = {
    Maize: 500000,
    Rice: 30000,
    Wheat: 35000,
    Tomato: 80000,
    Onion: 75000,
    // ... other prices
  };

  const [errors, setErrors] = useState({});
  const [availableTypes, setAvailableTypes] = useState([]);

  const router = useRouter();

  //Form state
  const [formData, setFormData] = useState({
    supplier: "Smallgrowr Limited",
    category: "",
    productName: "",
    quantity: "",
    unit: "tons",
    pricePerUnit: "",
    totalPrice: "",
    deliveryAddress: "",
    deliveryDate: new Date(),
    purchaseType: "",
    varietyType: "",
    moistureLevel: "",
    notes: "",
    paymentTerms: "",
  });

  // Update available product types when category changes
  useEffect(() => {
    if (formData.category) {
      setAvailableTypes(productNames[formData.category] || []);
      setFormData((prev) => ({ ...prev, productName: "" }));
    }
  }, [formData.category]);

  // Calculate price when product type or quantity changes
  useEffect(() => {
    if (formData.productName && formData.quantity) {
      const price = marketPrices[formData.productName] || 0;
      const quantity = parseFloat(formData.quantity) || 0;

      setFormData((prev) => ({
        ...prev,
        pricePerUnit: price.toFixed(2),
        totalPrice: (price * quantity).toFixed(2),
      }));
    }
  }, [formData.productName, formData.quantity]);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      console.log(selectedDate);
      //setFormData(selectedDate);
    }
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when field is updated
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.productName)
      newErrors.productName = "Product type is required";
    if (!formData.totalInStore)
      newErrors.totalInStore = "Total in store is required";
    if (!formData.quantity) newErrors.quantity = "Quantity to sell is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Product Ordered successfully!");
    router.back();
    // if (validateForm()) {
    //   // Here you would typically send the data to your API
    //   console.log("Form submitted:", formData);
    //   alert("Product listed successfully!");
    //   router.back();
    // }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.navigate("/ecosystem/home")}>
            <Ionicons name="close" size={28} color={Colors.primaryText} />
          </TouchableOpacity>
          <Text style={styles.title}>New Purchase Order</Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Supplier Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Supplier Details</Text>
          <Text style={styles.supplierName}>Smallgrowr Limited</Text>
        </View>

        {/* Delivery Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <MaterialIcons name="date-range" size={20} color={Colors.primary} />
            <Text style={styles.dateText}>
              {formData.deliveryDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={formData.deliveryDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          {/* Category Selection */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Product Category</Text>
            <View
              style={[
                styles.pickerContainer,
                errors.category && styles.errorBorder,
              ]}
            >
              <Picker
                selectedValue={formData.category}
                onValueChange={(value) => handleChange("category", value)}
                style={styles.picker}
              >
                <Picker.Item label="Select a category" value="" />
                {categories.map((category) => (
                  <Picker.Item
                    key={category.id}
                    label={category.name}
                    value={category.id}
                  />
                ))}
              </Picker>
            </View>
            {errors.category && (
              <Text style={styles.errorText}>{errors.category}</Text>
            )}
          </View>

          {/* Product Type Selection */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Product Name</Text>
            <View
              style={[
                styles.pickerContainer,
                errors.productName && styles.errorBorder,
              ]}
            >
              <Picker
                selectedValue={formData.productName}
                onValueChange={(value) => handleChange("productName", value)}
                style={styles.picker}
                enabled={!!formData.category}
              >
                <Picker.Item label="Select a Product" value="" />
                {availableTypes.map((type) => (
                  <Picker.Item key={type} label={type} value={type} />
                ))}
              </Picker>
            </View>
            {errors.productName && (
              <Text style={styles.errorText}>{errors.productName}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Quantity(tons)</Text>
            <TextInput
              style={[styles.input, styles.quantityInput]}
              placeholder="Quantity"
              value={formData.quantity}
              onChangeText={(text) => handleChange("quantity", text)}
              keyboardType="numeric"
              placeholderTextColor={Colors.secondaryText}
            />
          </View>

          {/* Price Information */}
          <View style={styles.priceContainer}>
            <View style={styles.priceBox}>
              <Text style={styles.priceLabel}>Price Per Unit (ton)</Text>
              <Text style={styles.priceValue}>
                ₦{formData.pricePerUnit || "0.00"}
              </Text>
            </View>
            <View style={styles.priceBox}>
              <Text style={styles.priceLabel}>Total Price</Text>
              <Text style={styles.priceValue}>
                ₦{formData.totalPrice || "0.00"}
              </Text>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Preferred Variety</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.varietyType}
                onValueChange={(value) => handleChange("varietyType", value)}
                style={styles.picker}
              >
                <Picker.Item label="Select " value="" />
                <Picker.Item label="Type A" value="Type A" />
                <Picker.Item label="Type B" value="Type B" />
                <Picker.Item label="Type C" value="Type C" />
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Acceptable Moisture Level</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.moistureLevel}
                onValueChange={(value) => handleChange("moistureLevel", value)}
                style={styles.picker}
              >
                <Picker.Item label="Select " value="" />
                <Picker.Item label="Level A" value="Level A" />
                <Picker.Item label="Level B" value="Level B" />
                <Picker.Item label="Level C" value="Level C" />
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Purchase Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.purchaseType}
                onValueChange={(value) => handleChange("purchaseType", value)}
                style={styles.picker}
              >
                <Picker.Item label="Select " value="" />
                <Picker.Item label="Outright" value="Outright" />
                <Picker.Item label="Storage" value="Storage" />
              </Picker>
            </View>
          </View>
        </View>

        {/* Delivery and Payment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery and Payment</Text>
          <View style={{ marginVertical: 10 }}>
            <TextInput
              style={styles.input}
              placeholder="Delivery Address"
              value={formData.deliveryAddress}
              multiline
              numberOfLines={3}
              onChangeText={(text) => handleChange("deliveryAddress", text)}
              placeholderTextColor={Colors.secondaryText}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Delivery Method</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.deliveryMethods}
                onValueChange={(value) =>
                  handleChange("deliveryMethods", value)
                }
                style={styles.picker}
              >
                <Picker.Item label="Select " value="" />
                <Picker.Item
                  label="Supplier Delivery"
                  value="Supplier Delivery"
                />
                <Picker.Item label="Buyer Truck" value="Buyer Truck" />
                <Picker.Item
                  label="Third-Party Logistics"
                  value="Third-Party Logistics"
                />
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Payment Terms</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.paymentTerms}
                onValueChange={(value) => handleChange("paymentTerms", value)}
                style={styles.picker}
              >
                <Picker.Item label="Select " value="" />
                <Picker.Item label="100% Upfront" value="100% Upfront" />
                <Picker.Item label="50% Advance" value="50% Advance" />
                <Picker.Item label="On Delivery" value="On Delivery" />
              </Picker>
            </View>
          </View>
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <TextInput
            style={[styles.input, styles.notesInput]}
            placeholder="Additional notes..."
            value={formData.notes}
            onChangeText={(text) => handleChange("notes", text)}
            multiline
            numberOfLines={3}
            placeholderTextColor={Colors.secondaryText}
          />
        </View>
      </ScrollView>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Purchase Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primaryText,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.secondaryText,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.primaryText,
  },
  supplierName: {
    marginTop: 10,
    color: Colors.secondaryText,
    fontSize: 16,
  },

  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  dateText: {
    fontSize: 16,
    color: Colors.primaryText,
    marginLeft: 8,
  },

  notesInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },

  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    // fontFamily: "Inter-Medium",
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  requiredLabel: {
    color: Colors.error,
  },
  input: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    elevation: 1,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: "top",
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  pickerContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    overflow: "hidden",
    elevation: 1,
  },
  picker: {
    height: 46,
    width: "100%",
    color: Colors.textPrimary,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  priceBox: {
    backgroundColor: Colors.earthLight,
    padding: 16,
    borderRadius: 12,
    width: "48%",
    alignItems: "center",
    elevation: 1,
  },
  priceLabel: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    // color: Colors.primaryDark,
    marginBottom: 8,
  },
  priceValue: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    // color: Colors.priceHighlight,
  },

  submitButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  submitButtonText: {
    color: Colors.textOnPrimary,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PurchaseOrderModal;

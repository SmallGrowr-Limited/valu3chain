import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Picker,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

const ProductListingForm = () => {
  const router = useRouter();

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

  const productTypes = {
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

  // Form state
  const [formData, setFormData] = useState({
    category: "",
    productType: "",
    totalInStore: "",
    quantityToSell: "",
    pricePerUnit: "",
    totalPrice: "",
    productName: "",
    description: "",
    qualityGrade: "A",
    packagingType: "Bag",
    harvestDate: "",
    location: "",
  });

  const [errors, setErrors] = useState({});
  const [availableTypes, setAvailableTypes] = useState([]);

  // Update available product types when category changes
  useEffect(() => {
    if (formData.category) {
      setAvailableTypes(productTypes[formData.category] || []);
      setFormData((prev) => ({ ...prev, productType: "" }));
    }

  }, [formData.category]);

  // Calculate price when product type or quantity changes
  useEffect(() => {
    if (formData.productType && formData.quantityToSell) {
      const price = marketPrices[formData.productType] || 0;
      const quantity = parseFloat(formData.quantityToSell) || 0;

      setFormData((prev) => ({
        ...prev,
        pricePerUnit: price.toFixed(2),
        totalPrice: (price * quantity).toFixed(2),
      }));
    }
  }, [formData.productType, formData.quantityToSell]);

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
    if (!formData.productType)
      newErrors.productType = "Product type is required";
    if (!formData.totalInStore)
      newErrors.totalInStore = "Total in store is required";
    if (!formData.quantityToSell)
      newErrors.quantityToSell = "Quantity to sell is required";
    if (
      parseFloat(formData.quantityToSell) > parseFloat(formData.totalInStore)
    ) {
      newErrors.quantityToSell = "Cannot sell more than in store";
    }
    if (!formData.productName)
      newErrors.productName = "Product name is required";
    if (!formData.description)
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Here you would typically send the data to your API
      console.log("Form submitted:", formData);
      alert("Product listed successfully!");
      router.back();
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.header}> Farm Commodity</Text>

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
        <Text style={styles.label}>Product Type</Text>
        <View
          style={[
            styles.pickerContainer,
            errors.productType && styles.errorBorder,
          ]}
        >
          <Picker
            selectedValue={formData.productType}
            onValueChange={(value) => handleChange("productType", value)}
            style={styles.picker}
            enabled={!!formData.category}
          >
            <Picker.Item label="Select a product type" value="" />
            {availableTypes.map((type) => (
              <Picker.Item key={type} label={type} value={type} />
            ))}
          </Picker>
        </View>
        {errors.productType && (
          <Text style={styles.errorText}>{errors.productType}</Text>
        )}
      </View>

      {/* Inventory Information */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Total Quantity in Store (tons)</Text>
        <TextInput
          style={[styles.input, errors.totalInStore && styles.errorBorder]}
          placeholder="e.g. 30"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={formData.totalInStore}
          onChangeText={(text) => handleChange("totalInStore", text)}
        />
        {errors.totalInStore && (
          <Text style={styles.errorText}>{errors.totalInStore}</Text>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Quantity to Sell (tons)</Text>
        <TextInput
          style={[styles.input, errors.quantityToSell && styles.errorBorder]}
          placeholder="e.g. 20"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={formData.quantityToSell}
          onChangeText={(text) => handleChange("quantityToSell", text)}
        />
        {errors.quantityToSell && (
          <Text style={styles.errorText}>{errors.quantityToSell}</Text>
        )}
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

      {/* Product Details */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Product Name</Text>
        <TextInput
          style={[styles.input, errors.productName && styles.errorBorder]}
          placeholder="e.g. Premium Quality Rice"
          placeholderTextColor="#aaa"
          value={formData.productName}
          onChangeText={(text) => handleChange("productName", text)}
        />
        {errors.productName && (
          <Text style={styles.errorText}>{errors.productName}</Text>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Product Description</Text>
        <TextInput
          style={[styles.textArea, errors.description && styles.errorBorder]}
          placeholder="Describe your product in detail (quality, processing, etc.)"
          placeholderTextColor="#aaa"
          multiline
          numberOfLines={4}
          value={formData.description}
          onChangeText={(text) => handleChange("description", text)}
        />
        {errors.description && (
          <Text style={styles.errorText}>{errors.description}</Text>
        )}
      </View>

      {/* Additional Information */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Quality Grade</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.qualityGrade}
            onValueChange={(value) => handleChange("qualityGrade", value)}
            style={styles.picker}
          >
            <Picker.Item label="Grade A" value="A" />
            <Picker.Item label="Grade B" value="B" />
            <Picker.Item label="Grade C" value="C" />
          </Picker>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Packaging Type</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.packagingType}
            onValueChange={(value) => handleChange("packagingType", value)}
            style={styles.picker}
          >
            <Picker.Item label="Bag" value="Bag" />
            <Picker.Item label="Crate" value="Crate" />
            <Picker.Item label="Basket" value="Basket" />
            <Picker.Item label="Sack" value="Sack" />
            <Picker.Item label="Box" value="Box" />
          </Picker>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Farm or storage location"
          placeholderTextColor="#aaa"
          value={formData.location}
          onChangeText={(text) => handleChange("location", text)}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const Colors = {
  primary: "#2E7D32", // Deep green - represents agriculture and growth
  primaryLight: "#E8F5E9",
  primaryDark: "#1B5E20",
  secondary: "#FF8F00", // Amber - for attention and actions
  background: "#F8FAF8", // Very light green tint
  white: "#FFFFFF",
  cardBg: "#FFFFFF",
  textPrimary: "#263238", // Dark blue-gray
  textSecondary: "#455A64",
  textTertiary: "#718096",
  border: "#CFD8DC",
  success: "#388E3C",
  warning: "#F57C00",
  error: "#D32F2F",
  info: "#0288D1",
  disabled: "#B0BEC5",
  highlight: "#FFF9C4",
  priceHighlight: "#2E7D32",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontFamily: "Inter-SemiBold",
    // color: Colors.primary,
    marginBottom: 24,
    textAlign: "center",
    letterSpacing: -0.3,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontFamily: "Inter-Medium",
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
    borderColor: Colors.border,
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
    borderColor: Colors.border,
    overflow: "hidden",
    elevation: 1,
  },
  picker: {
    height: 56,
    width: "100%",
    color: Colors.textPrimary,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  priceBox: {
    backgroundColor: Colors.primaryLight,
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
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    marginTop: 32,
    elevation: 3,
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
  },
  errorText: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: Colors.error,
    marginTop: 8,
  },
  errorBorder: {
    borderColor: Colors.error,
  },
  formRow: {
    flexDirection: "row",
    gap: 16,
  },
  formCol: {
    flex: 1,
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f9f9f9",
//     padding: 16,
//   },
//   contentContainer: {
//     paddingBottom: 30,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 24,
//     color: "#2c3e50",
//     textAlign: "center",
//   },
//   formGroup: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 8,
//     color: "#34495e",
//     fontWeight: "500",
//   },
//   input: {
//     backgroundColor: "white",
//     padding: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     fontSize: 16,
//   },
//   textArea: {
//     backgroundColor: "white",
//     padding: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     fontSize: 16,
//     height: 100,
//     textAlignVertical: "top",
//   },
//   pickerContainer: {
//     backgroundColor: "white",
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     overflow: "hidden",
//   },
//   picker: {
//     height: 50,
//     width: "100%",
//   },
//   priceContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   priceBox: {
//     backgroundColor: "#3498db",
//     padding: 16,
//     borderRadius: 8,
//     width: "48%",
//     alignItems: "center",
//   },
//   priceLabel: {
//     color: "white",
//     fontSize: 14,
//     marginBottom: 4,
//   },
//   priceValue: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   submitButton: {
//     backgroundColor: "#27ae60",
//     padding: 16,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   submitButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   errorText: {
//     color: "#e74c3c",
//     fontSize: 14,
//     marginTop: 4,
//   },
//   errorBorder: {
//     borderColor: "#e74c3c",
//   },
// });

export default ProductListingForm;

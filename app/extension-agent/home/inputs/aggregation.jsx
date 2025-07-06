// ProductAggregation.jsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TextInput, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useLocalSearchParams, router } from "expo-router";

const ProductAggregation = () => {
  const { agentId } = useLocalSearchParams();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [farmersCount, setFarmersCount] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample product data - in a real app, this would come from an API
  const availableProducts = [
    { id: "1", name: "Maize" },
    { id: "2", name: "Beans" },
    { id: "3", name: "Rice" },
    { id: "4", name: "Wheat" },
    { id: "5", name: "Sorghum" },
    { id: "6", name: "Millet" },
    { id: "7", name: "Potatoes" },
    { id: "8", name: "Tomatoes" },
  ];

  useEffect(() => {
    // In a real app, you might fetch existing aggregated data here
  }, [agentId]);

  const handleAddProduct = () => {
    if (
      !selectedProduct ||
      !quantity ||
      isNaN(quantity) ||
      parseFloat(quantity) <= 0
    ) {
      Alert.alert(
        "Validation Error",
        "Please select a product and enter a valid quantity"
      );
      return;
    }

    const productName = availableProducts.find(
      (p) => p.id === selectedProduct
    )?.name;

    const newProduct = {
      id: Date.now().toString(),
      productId: selectedProduct,
      productName,
      quantity: parseFloat(quantity),
      unit,
      farmersCount: farmersCount ? parseInt(farmersCount) : 0,
      notes,
    };

    setProducts([...products, newProduct]);
    resetForm();
  };

  const resetForm = () => {
    setSelectedProduct("");
    setQuantity("");
    setUnit("kg");
    setFarmersCount("");
    setNotes("");
  };

  const handleRemoveProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleSubmit = () => {
    if (products.length === 0) {
      Alert.alert(
        "No Products",
        "Please add at least one product before submitting"
      );
      return;
    }

    setIsSubmitting(true);

    // In a real app, you would submit to an API here
    console.log("Submitting:", { agentId, products });

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert("Success", "Product aggregation submitted successfully", [
        { text: "OK", onPress: () => router.back() },
      ]);
    }, 1500);
  };

  const calculateTotalQuantity = () => {
    return products.reduce((total, product) => total + product.quantity, 0);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Product Aggregation</Text>
        <Text style={styles.subHeader}>Agent ID: {agentId}</Text>

        {/* Product Selection Form */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Add Product</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Product</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedProduct}
                onValueChange={(itemValue) => setSelectedProduct(itemValue)}
                style={styles.picker}
                dropdownIconColor="#666"
              >
                <Picker.Item label="Select a product..." value="" />
                {availableProducts.map((product) => (
                  <Picker.Item
                    key={product.id}
                    label={product.name}
                    value={product.id}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 2 }]}>
              <Text style={styles.label}>Quantity</Text>
              <TextInput
                mode="outlined"
                keyboardType="numeric"
                value={quantity}
                onChangeText={setQuantity}
                placeholder="0.00"
                style={styles.input}
                outlineColor="#ddd"
                activeOutlineColor="#4CAF50"
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
              <Text style={styles.label}>Unit</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={unit}
                  onValueChange={(itemValue) => setUnit(itemValue)}
                  style={styles.picker}
                  dropdownIconColor="#666"
                >
                  <Picker.Item label="kg" value="kg" />
                  <Picker.Item label="tons" value="tons" />
                  <Picker.Item label="bags" value="bags" />
                  <Picker.Item label="liters" value="liters" />
                </Picker>
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Number of Farmers</Text>
            <TextInput
              mode="outlined"
              keyboardType="numeric"
              value={farmersCount}
              onChangeText={setFarmersCount}
              placeholder="Optional"
              style={styles.input}
              outlineColor="#ddd"
              activeOutlineColor="#4CAF50"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              mode="outlined"
              value={notes}
              onChangeText={setNotes}
              placeholder="Any additional notes"
              multiline
              numberOfLines={3}
              style={[styles.input, { height: 80 }]}
              outlineColor="#ddd"
              activeOutlineColor="#4CAF50"
            />
          </View>

          <Button
            mode="contained"
            onPress={handleAddProduct}
            style={styles.addButton}
            labelStyle={styles.buttonLabel}
            icon="plus"
          >
            Add Product
          </Button>
        </View>

        {/* Aggregated Products List */}
        {products.length > 0 && (
          <View style={styles.listContainer}>
            <Text style={styles.sectionTitle}>Aggregated Products</Text>
            <View style={styles.listHeader}>
              <Text style={[styles.listHeaderText, { flex: 3 }]}>Product</Text>
              <Text style={[styles.listHeaderText, { flex: 2 }]}>Quantity</Text>
              <Text style={[styles.listHeaderText, { flex: 1 }]}>Action</Text>
            </View>

            {products.map((product) => (
              <View key={product.id} style={styles.listItem}>
                <Text style={[styles.listItemText, { flex: 3 }]}>
                  {product.productName}
                </Text>
                <Text style={[styles.listItemText, { flex: 2 }]}>
                  {product.quantity} {product.unit}
                </Text>
                <TouchableOpacity
                  onPress={() => handleRemoveProduct(product.id)}
                  style={styles.deleteButton}
                >
                  <Icon name="delete" size={20} color="#F44336" />
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total Quantity:</Text>
              <Text style={styles.totalAmount}>{calculateTotalQuantity()}</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Submit Button */}
      {products.length > 0 && (
        <View style={styles.footer}>
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.submitButton}
            labelStyle={styles.buttonLabel}
            loading={isSubmitting}
            disabled={isSubmitting}
            icon="check"
          >
            Submit Aggregation
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addButton: {
    marginTop: 8,
    backgroundColor: "#4CAF50",
    borderRadius: 4,
    paddingVertical: 6,
  },
  listContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    elevation: 2,
  },
  listHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
    marginBottom: 8,
  },
  listHeaderText: {
    fontWeight: "bold",
    color: "#666",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  listItemText: {
    color: "#333",
  },
  deleteButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalText: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 16,
  },
  totalAmount: {
    fontWeight: "bold",
    color: "#4CAF50",
    fontSize: 16,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    elevation: 4,
  },
  submitButton: {
    backgroundColor: "#2196F3",
    borderRadius: 4,
    paddingVertical: 6,
  },
  buttonLabel: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ProductAggregation;

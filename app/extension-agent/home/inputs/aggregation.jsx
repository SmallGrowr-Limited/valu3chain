import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

const FarmProduceAggregation = () => {
  // State for the form
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState("");
  const [showFarmerList, setShowFarmerList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [aggregationData, setAggregationData] = useState({
    farmerId: "",
    farmerName: "",
    season: new Date().getFullYear().toString(),
    date: new Date().toISOString().split("T")[0],
    products: [],
    notes: "",
  });

  // Sample farmers data
  const [farmers, setFarmers] = useState([
    {
      id: "farmer001",
      name: "John Kamau",
      location: "Kiambu",
      phone: "0721000111",
      farmSize: "2 acres",
    },
    {
      id: "farmer002",
      name: "Mary Wanjiku",
      location: "Murang'a",
      phone: "0722000222",
      farmSize: "3.5 acres",
    },
    {
      id: "farmer003",
      name: "Peter Mwangi",
      location: "Nyeri",
      phone: "0723000333",
      farmSize: "5 acres",
    },
  ]);

  // Sample product types with current market prices
  const productTypes = [
    {
      id: "prod1",
      name: "Maize Grain",
      category: "Cereals",
      moistureThreshold: "14%",
      currentMarketPrice: 45.0,
      unit: "90kg bag",
    },
    {
      id: "prod2",
      name: "Arabica Coffee",
      category: "Cash Crops",
      moistureThreshold: "11.5%",
      currentMarketPrice: 320.0,
      unit: "50kg bag",
    },
    {
      id: "prod3",
      name: "Tomatoes",
      category: "Vegetables",
      moistureThreshold: "N/A",
      currentMarketPrice: 80.0,
      unit: "20kg crate",
    },
    {
      id: "prod4",
      name: "Avocados",
      category: "Fruits",
      moistureThreshold: "N/A",
      currentMarketPrice: 25.0,
      unit: "kg",
    },
    {
      id: "prod5",
      name: "Beans",
      category: "Legumes",
      moistureThreshold: "15%",
      currentMarketPrice: 120.0,
      unit: "90kg bag",
    },
  ];

  // Filter farmers based on search query
  const filteredFarmers = farmers.filter(
    (farmer) =>
      farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.phone.includes(searchQuery)
  );

  const handleAddProduct = () => {
    if (!currentProduct) return;

    const selected = productTypes.find(
      (product) => product.id === currentProduct
    );
    if (selected) {
      setSelectedProducts([
        ...selectedProducts,
        {
          ...selected,
          totalQuantity: 0,
          quantityAvailable: 0,
          moistureLevel: "",
          totalValue: 0,
        },
      ]);
      setCurrentProduct("");
    }
  };

  const handleQuantityChange = (id, field, value) => {
    const updatedProducts = selectedProducts.map((product) => {
      if (product.id === id) {
        const quantity = parseFloat(value) || 0;
        const update = {
          ...product,
          [field]: quantity,
        };

        // Calculate total value based on available quantity
        if (field === "quantityAvailable") {
          update.totalValue = quantity * product.currentMarketPrice;
        }

        return update;
      }
      return product;
    });
    setSelectedProducts(updatedProducts);
  };

  const handleMoistureChange = (id, value) => {
    const updatedProducts = selectedProducts.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          moistureLevel: value,
        };
      }
      return product;
    });
    setSelectedProducts(updatedProducts);
  };

  const removeProduct = (id) => {
    setSelectedProducts(
      selectedProducts.filter((product) => product.id !== id)
    );
  };

  const selectFarmer = (farmer) => {
    setAggregationData({
      ...aggregationData,
      farmerId: farmer.id,
      farmerName: farmer.name,
    });
    setShowFarmerList(false);
    setSearchQuery("");
  };

  const handleSubmit = () => {
    const totalAggregation = {
      ...aggregationData,
      products: selectedProducts,
      totalQuantity: selectedProducts.reduce(
        (sum, product) => sum + product.totalQuantity,
        0
      ),
      totalAvailable: selectedProducts.reduce(
        (sum, product) => sum + product.quantityAvailable,
        0
      ),
      totalValue: selectedProducts.reduce(
        (sum, product) => sum + product.totalValue,
        0
      ),
    };

    // Here you would typically send the data to your backend
    console.log("Aggregation data:", totalAggregation);
    alert("Produce aggregation recorded successfully!");

    // Reset form
    setSelectedProducts([]);
    setAggregationData({
      ...aggregationData,
      farmerId: "",
      farmerName: "",
      products: [],
      notes: "",
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Input Aggregation</Text>
        <Text style={styles.subHeader}>
          Record end-of-season produce for farmers
        </Text>
      </View>

      {/* Farmer Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Farmer Details</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Select Farmer</Text>
          <TouchableOpacity
            style={styles.farmerSelectButton}
            onPress={() => setShowFarmerList(!showFarmerList)}
          >
            <Text
              style={
                aggregationData.farmerName
                  ? styles.farmerSelectedText
                  : styles.farmerPlaceholderText
              }
            >
              {aggregationData.farmerName || "Tap to select farmer"}
            </Text>
            <MaterialCommunityIcons
              name={showFarmerList ? "chevron-up" : "chevron-down"}
              size={24}
              color="#566573"
            />
          </TouchableOpacity>
        </View>

        {showFarmerList && (
          <View style={styles.farmerSearchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search farmers by name, ID or phone"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <FlatList
              data={filteredFarmers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.farmerListItem}
                  onPress={() => selectFarmer(item)}
                >
                  <View>
                    <Text style={styles.farmerName}>{item.name}</Text>
                    <Text style={styles.farmerDetails}>
                      ID: {item.id} • {item.phone}
                    </Text>
                    <Text style={styles.farmerDetails}>
                      {item.location} • {item.farmSize}
                    </Text>
                  </View>
                  {aggregationData.farmerId === item.id && (
                    <MaterialCommunityIcons
                      name="check"
                      size={24}
                      color="#4CAF50"
                    />
                  )}
                </TouchableOpacity>
              )}
              style={styles.farmerList}
              contentContainerStyle={{ paddingBottom: 10 }}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Season</Text>
          <TextInput
            style={styles.input}
            value={aggregationData.season}
            onChangeText={(text) =>
              setAggregationData({ ...aggregationData, season: text })
            }
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Record Date</Text>
          <TextInput
            style={styles.input}
            value={aggregationData.date}
            onChangeText={(text) =>
              setAggregationData({ ...aggregationData, date: text })
            }
          />
        </View>
      </View>

      {/* Product Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add Harvested Products</Text>
        <View style={styles.inputRow}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={currentProduct}
              onValueChange={(itemValue) => setCurrentProduct(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select a product..." value="" />
              {productTypes.map((product) => (
                <Picker.Item
                  key={product.id}
                  label={`${product.name} (${product.category})`}
                  value={product.id}
                />
              ))}
            </Picker>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
            <MaterialCommunityIcons name="plus" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Selected Products List */}
      {selectedProducts.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recorded Products</Text>
          {selectedProducts.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productCardHeader}>
                <View>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productCategory}>{product.category}</Text>
                </View>
                <TouchableOpacity onPress={() => removeProduct(product.id)}>
                  <MaterialCommunityIcons
                    name="close"
                    size={20}
                    color="#F44336"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.productDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Market Price:</Text>
                  <Text style={styles.detailValue}>
                    ₦ {product.currentMarketPrice.toFixed(2)}/{product.unit}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Moisture Threshold:</Text>
                  <Text style={styles.detailValue}>
                    {product.moistureThreshold}
                  </Text>
                </View>

                <View style={styles.quantityRow}>
                  <View style={styles.quantityGroup}>
                    <Text style={styles.quantityLabel}>Total Harvested</Text>
                    <View style={styles.quantityInputContainer}>
                      <TextInput
                        style={styles.quantityInput}
                        value={product.totalQuantity.toString()}
                        onChangeText={(text) =>
                          handleQuantityChange(
                            product.id,
                            "totalQuantity",
                            text
                          )
                        }
                        keyboardType="numeric"
                      />
                      <Text style={styles.quantityUnit}>{product.unit}</Text>
                    </View>
                  </View>

                  <View style={styles.quantityGroup}>
                    <Text style={styles.quantityLabel}>Available to Sell</Text>
                    <View style={styles.quantityInputContainer}>
                      <TextInput
                        style={styles.quantityInput}
                        value={product.quantityAvailable.toString()}
                        onChangeText={(text) =>
                          handleQuantityChange(
                            product.id,
                            "quantityAvailable",
                            text
                          )
                        }
                        keyboardType="numeric"
                      />
                      <Text style={styles.quantityUnit}>{product.unit}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.moistureRow}>
                  <Text style={styles.detailLabel}>Moisture Level:</Text>
                  <TextInput
                    style={[styles.input, styles.moistureInput]}
                    value={product.moistureLevel}
                    onChangeText={(text) =>
                      handleMoistureChange(product.id, text)
                    }
                    placeholder="Enter moisture %"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.valueRow}>
                  <Text style={styles.detailLabel}>Estimated Value:</Text>
                  <Text style={styles.productValue}>
                    ₦ {product.totalValue.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Aggregation Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Farmer:</Text>
          <Text style={styles.summaryValue}>
            {aggregationData.farmerName || "Not selected"}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Products Recorded:</Text>
          <Text style={styles.summaryValue}>{selectedProducts.length}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Harvested:</Text>
          <Text style={styles.summaryValue}>
            {selectedProducts.reduce(
              (sum, product) => sum + product.totalQuantity,
              0
            )}{" "}
            units
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Available to Sell:</Text>
          <Text style={styles.summaryValue}>
            {selectedProducts.reduce(
              (sum, product) => sum + product.quantityAvailable,
              0
            )}{" "}
            units
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Estimated Value:</Text>
          <Text style={[styles.summaryValue, styles.totalValue]}>
            ₦{" "}
            {selectedProducts
              .reduce((sum, product) => sum + product.totalValue, 0)
              .toFixed(2)}
          </Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.notesInput]}
            value={aggregationData.notes}
            onChangeText={(text) =>
              setAggregationData({ ...aggregationData, notes: text })
            }
            placeholder="Any quality notes, storage conditions, etc..."
            multiline
          />
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[
          styles.submitButton,
          (!aggregationData.farmerId || selectedProducts.length === 0) &&
            styles.disabledButton,
        ]}
        onPress={handleSubmit}
        disabled={!aggregationData.farmerId || selectedProducts.length === 0}
      >
        <Text style={styles.submitButtonText}>Save Aggregation Record</Text>
        <FontAwesome
          name="save"
          size={20}
          color="#fff"
          style={styles.saveIcon}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

// Modern Agricultural UI Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F9F7",
  },
  headerContainer: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E8E5",
  },
  header: {
    fontSize: 26,
    fontWeight: "800",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 14,
    color: "#689F38",
    textAlign: "center",
    fontWeight: "500",
  },
  section: {
    marginBottom: 25,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 18,
    shadowColor: "#2E7D32",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: 15,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E8F5E9",
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    color: "#455A64",
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CFD8DC",
    borderRadius: 8,
    padding: 14,
    fontSize: 15,
    color: "#37474F",
    backgroundColor: "#FAFBFA",
  },
  farmerSelectButton: {
    borderWidth: 1,
    borderColor: "#CFD8DC",
    borderRadius: 8,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FAFBFA",
  },
  farmerSelectedText: {
    fontSize: 15,
    color: "#37474F",
    fontWeight: "500",
  },
  farmerPlaceholderText: {
    fontSize: 15,
    color: "#90A4AE",
    fontStyle: "italic",
  },
  farmerSearchContainer: {
    marginBottom: 15,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#CFD8DC",
    borderRadius: 8,
    padding: 14,
    fontSize: 14,
    color: "#37474F",
    backgroundColor: "#FAFBFA",
    marginBottom: 10,
  },
  farmerList: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: "#E0E8E5",
    borderRadius: 8,
  },
  farmerListItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E8E5",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5F9F7",
  },
  farmerName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#37474F",
    marginBottom: 2,
  },
  farmerDetails: {
    fontSize: 12,
    color: "#78909C",
    marginBottom: 2,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CFD8DC",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#FAFBFA",
  },
  picker: {
    height: 50,
    color: "#37474F",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 14,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2E7D32",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  productCard: {
    backgroundColor: "#F5F9F7",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
    shadowColor: "#2E7D32",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  productCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E8E5",
  },
  productName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2E7D32",
  },
  productCategory: {
    fontSize: 12,
    color: "#689F38",
    fontWeight: "500",
    marginTop: 2,
  },
  productDetails: {
    marginBottom: 5,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: "#546E7A",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 14,
    color: "#37474F",
    fontWeight: "600",
  },
  quantityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  quantityGroup: {
    width: "48%",
  },
  quantityLabel: {
    fontSize: 13,
    color: "#607D8B",
    marginBottom: 6,
    fontWeight: "500",
  },
  quantityInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: "#CFD8DC",
    borderRadius: 6,
    padding: 10,
    width: 70,
    textAlign: "center",
    marginRight: 8,
    backgroundColor: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    color: "#37474F",
  },
  quantityUnit: {
    fontSize: 13,
    color: "#78909C",
  },
  moistureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  moistureInput: {
    width: 100,
    padding: 10,
    textAlign: "center",
  },
  valueRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E0E8E5",
  },
  productValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2E7D32",
  },
  notesInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 15,
    color: "#546E7A",
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#37474F",
  },
  totalValue: {
    color: "#2E7D32",
    fontWeight: "700",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 20,
    shadowColor: "#2E7D32",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: "#B0BEC5",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    marginRight: 10,
  },
  saveIcon: {
    marginLeft: 5,
  },
});

export default FarmProduceAggregation;

// // ProductAggregation.jsx
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { TextInput, Button } from "react-native-paper";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { useLocalSearchParams, router } from "expo-router";

// const ProductAggregation = () => {
//   const { agentId } = useLocalSearchParams();
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [unit, setUnit] = useState("kg");
//   const [farmersCount, setFarmersCount] = useState("");
//   const [notes, setNotes] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Sample product data - in a real app, this would come from an API
//   const availableProducts = [
//     { id: "1", name: "Maize" },
//     { id: "2", name: "Beans" },
//     { id: "3", name: "Rice" },
//     { id: "4", name: "Wheat" },
//     { id: "5", name: "Sorghum" },
//     { id: "6", name: "Millet" },
//     { id: "7", name: "Potatoes" },
//     { id: "8", name: "Tomatoes" },
//   ];

//   useEffect(() => {
//     // In a real app, you might fetch existing aggregated data here
//   }, [agentId]);

//   const handleAddProduct = () => {
//     if (
//       !selectedProduct ||
//       !quantity ||
//       isNaN(quantity) ||
//       parseFloat(quantity) <= 0
//     ) {
//       Alert.alert(
//         "Validation Error",
//         "Please select a product and enter a valid quantity"
//       );
//       return;
//     }

//     const productName = availableProducts.find(
//       (p) => p.id === selectedProduct
//     )?.name;

//     const newProduct = {
//       id: Date.now().toString(),
//       productId: selectedProduct,
//       productName,
//       quantity: parseFloat(quantity),
//       unit,
//       farmersCount: farmersCount ? parseInt(farmersCount) : 0,
//       notes,
//     };

//     setProducts([...products, newProduct]);
//     resetForm();
//   };

//   const resetForm = () => {
//     setSelectedProduct("");
//     setQuantity("");
//     setUnit("kg");
//     setFarmersCount("");
//     setNotes("");
//   };

//   const handleRemoveProduct = (id) => {
//     setProducts(products.filter((product) => product.id !== id));
//   };

//   const handleSubmit = () => {
//     if (products.length === 0) {
//       Alert.alert(
//         "No Products",
//         "Please add at least one product before submitting"
//       );
//       return;
//     }

//     setIsSubmitting(true);

//     // In a real app, you would submit to an API here
//     console.log("Submitting:", { agentId, products });

//     // Simulate API call
//     setTimeout(() => {
//       setIsSubmitting(false);
//       Alert.alert("Success", "Product aggregation submitted successfully", [
//         { text: "OK", onPress: () => router.back() },
//       ]);
//     }, 1500);
//   };

//   const calculateTotalQuantity = () => {
//     return products.reduce((total, product) => total + product.quantity, 0);
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <Text style={styles.header}>Product Aggregation</Text>
//         <Text style={styles.subHeader}>Agent ID: {agentId}</Text>

//         {/* Product Selection Form */}
//         <View style={styles.formContainer}>
//           <Text style={styles.sectionTitle}>Add Product</Text>

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Product</Text>
//             <View style={styles.pickerContainer}>
//               <Picker
//                 selectedValue={selectedProduct}
//                 onValueChange={(itemValue) => setSelectedProduct(itemValue)}
//                 style={styles.picker}
//                 dropdownIconColor="#666"
//               >
//                 <Picker.Item label="Select a product..." value="" />
//                 {availableProducts.map((product) => (
//                   <Picker.Item
//                     key={product.id}
//                     label={product.name}
//                     value={product.id}
//                   />
//                 ))}
//               </Picker>
//             </View>
//           </View>

//           <View style={styles.row}>
//             <View style={[styles.inputGroup, { flex: 2 }]}>
//               <Text style={styles.label}>Quantity</Text>
//               <TextInput
//                 mode="outlined"
//                 keyboardType="numeric"
//                 value={quantity}
//                 onChangeText={setQuantity}
//                 placeholder="0.00"
//                 style={styles.input}
//                 outlineColor="#ddd"
//                 activeOutlineColor="#4CAF50"
//               />
//             </View>

//             <View style={[styles.inputGroup, { flex: 1, marginLeft: 10 }]}>
//               <Text style={styles.label}>Unit</Text>
//               <View style={styles.pickerContainer}>
//                 <Picker
//                   selectedValue={unit}
//                   onValueChange={(itemValue) => setUnit(itemValue)}
//                   style={styles.picker}
//                   dropdownIconColor="#666"
//                 >
//                   <Picker.Item label="kg" value="kg" />
//                   <Picker.Item label="tons" value="tons" />
//                   <Picker.Item label="bags" value="bags" />
//                   <Picker.Item label="liters" value="liters" />
//                 </Picker>
//               </View>
//             </View>
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Number of Farmers</Text>
//             <TextInput
//               mode="outlined"
//               keyboardType="numeric"
//               value={farmersCount}
//               onChangeText={setFarmersCount}
//               placeholder="Optional"
//               style={styles.input}
//               outlineColor="#ddd"
//               activeOutlineColor="#4CAF50"
//             />
//           </View>

//           <View style={styles.inputGroup}>
//             <Text style={styles.label}>Notes</Text>
//             <TextInput
//               mode="outlined"
//               value={notes}
//               onChangeText={setNotes}
//               placeholder="Any additional notes"
//               multiline
//               numberOfLines={3}
//               style={[styles.input, { height: 80 }]}
//               outlineColor="#ddd"
//               activeOutlineColor="#4CAF50"
//             />
//           </View>

//           <Button
//             mode="contained"
//             onPress={handleAddProduct}
//             style={styles.addButton}
//             labelStyle={styles.buttonLabel}
//             icon="plus"
//           >
//             Add Product
//           </Button>
//         </View>

//         {/* Aggregated Products List */}
//         {products.length > 0 && (
//           <View style={styles.listContainer}>
//             <Text style={styles.sectionTitle}>Aggregated Products</Text>
//             <View style={styles.listHeader}>
//               <Text style={[styles.listHeaderText, { flex: 3 }]}>Product</Text>
//               <Text style={[styles.listHeaderText, { flex: 2 }]}>Quantity</Text>
//               <Text style={[styles.listHeaderText, { flex: 1 }]}>Action</Text>
//             </View>

//             {products.map((product) => (
//               <View key={product.id} style={styles.listItem}>
//                 <Text style={[styles.listItemText, { flex: 3 }]}>
//                   {product.productName}
//                 </Text>
//                 <Text style={[styles.listItemText, { flex: 2 }]}>
//                   {product.quantity} {product.unit}
//                 </Text>
//                 <TouchableOpacity
//                   onPress={() => handleRemoveProduct(product.id)}
//                   style={styles.deleteButton}
//                 >
//                   <Icon name="delete" size={20} color="#F44336" />
//                 </TouchableOpacity>
//               </View>
//             ))}

//             <View style={styles.totalContainer}>
//               <Text style={styles.totalText}>Total Quantity:</Text>
//               <Text style={styles.totalAmount}>{calculateTotalQuantity()}</Text>
//             </View>
//           </View>
//         )}
//       </ScrollView>

//       {/* Submit Button */}
//       {products.length > 0 && (
//         <View style={styles.footer}>
//           <Button
//             mode="contained"
//             onPress={handleSubmit}
//             style={styles.submitButton}
//             labelStyle={styles.buttonLabel}
//             loading={isSubmitting}
//             disabled={isSubmitting}
//             icon="check"
//           >
//             Submit Aggregation
//           </Button>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   scrollContainer: {
//     padding: 16,
//     paddingBottom: 100,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 4,
//   },
//   subHeader: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 20,
//   },
//   formContainer: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 16,
//     marginBottom: 20,
//     elevation: 2,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#333",
//     marginBottom: 16,
//   },
//   inputGroup: {
//     marginBottom: 16,
//   },
//   label: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 8,
//   },
//   input: {
//     backgroundColor: "white",
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 4,
//     overflow: "hidden",
//   },
//   picker: {
//     height: 50,
//     width: "100%",
//     backgroundColor: "white",
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   addButton: {
//     marginTop: 8,
//     backgroundColor: "#4CAF50",
//     borderRadius: 4,
//     paddingVertical: 6,
//   },
//   listContainer: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 16,
//     elevation: 2,
//   },
//   listHeader: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//     paddingBottom: 8,
//     marginBottom: 8,
//   },
//   listHeaderText: {
//     fontWeight: "bold",
//     color: "#666",
//   },
//   listItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#f5f5f5",
//   },
//   listItemText: {
//     color: "#333",
//   },
//   deleteButton: {
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 8,
//   },
//   totalContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 16,
//     paddingTop: 16,
//     borderTopWidth: 1,
//     borderTopColor: "#eee",
//   },
//   totalText: {
//     fontWeight: "bold",
//     color: "#333",
//     fontSize: 16,
//   },
//   totalAmount: {
//     fontWeight: "bold",
//     color: "#4CAF50",
//     fontSize: 16,
//   },
//   footer: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "white",
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: "#eee",
//     elevation: 4,
//   },
//   submitButton: {
//     backgroundColor: "#2196F3",
//     borderRadius: 4,
//     paddingVertical: 6,
//   },
//   buttonLabel: {
//     color: "white",
//     fontWeight: "bold",
//   },
// });

// export default ProductAggregation;

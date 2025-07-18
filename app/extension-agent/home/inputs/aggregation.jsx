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
  const [showFarmerProducts, setShowFarmerProducts] = useState(false);
  const [aggregationData, setAggregationData] = useState({
    farmerId: "",
    farmerName: "",
    season: new Date().getFullYear().toString(),
    date: new Date().toISOString().split("T")[0],
    products: [],
    notes: "",
  });

  // Sample farmers data with their products
  const [farmers, setFarmers] = useState([
    {
      id: "farmer001",
      name: "John Kamau",
      location: "Kiambu",
      phone: "0721000111",
      farmSize: "2 acres",
      products: [
        {
          id: "prod1",
          name: "Maize Grain",
          quantity: 50,
          unit: "90kg bag",
          moistureLevel: "12%",
          storage: "Silo",
          packaging: "Gunny bags",
          price: 45.0,
        },
        {
          id: "prod5",
          name: "Beans",
          quantity: 30,
          unit: "90kg bag",
          moistureLevel: "14%",
          storage: "Warehouse",
          packaging: "Gunny bags",
          price: 120.0,
        },
      ],
    },
    {
      id: "farmer002",
      name: "Mary Wanjiku",
      location: "Murang'a",
      phone: "0722000222",
      farmSize: "3.5 acres",
      products: [
        {
          id: "prod2",
          name: "Arabica Coffee",
          quantity: 15,
          unit: "50kg bag",
          moistureLevel: "11%",
          storage: "Cool dry place",
          packaging: "Vacuum packs",
          price: 320.0,
        },
        {
          id: "prod4",
          name: "Avocados",
          quantity: 200,
          unit: "kg",
          moistureLevel: "N/A",
          storage: "Cold storage",
          packaging: "Cartons",
          price: 25.0,
        },
      ],
    },
    {
      id: "farmer003",
      name: "Peter Mwangi",
      location: "Nyeri",
      phone: "0723000333",
      farmSize: "5 acres",
      products: [
        {
          id: "prod3",
          name: "Tomatoes",
          quantity: 40,
          unit: "20kg crate",
          moistureLevel: "N/A",
          storage: "Refrigerated",
          packaging: "Plastic crates",
          price: 80.0,
        },
        {
          id: "prod1",
          name: "Maize Grain",
          quantity: 80,
          unit: "90kg bag",
          moistureLevel: "13%",
          storage: "Silo",
          packaging: "Gunny bags",
          price: 45.0,
        },
      ],
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

  // Get the selected farmer's products
  const selectedFarmerProducts =
    farmers.find((farmer) => farmer.id === aggregationData.farmerId)
      ?.products || [];

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
    setShowFarmerProducts(true);
  };

  const addFarmerProduct = (product) => {
    // Check if product is already added
    if (selectedProducts.some((p) => p.id === product.id)) return;

    const productType = productTypes.find((p) => p.id === product.id);
    if (productType) {
      setSelectedProducts([
        ...selectedProducts,
        {
          ...productType,
          totalQuantity: product.quantity,
          quantityAvailable: product.quantity,
          moistureLevel: product.moistureLevel,
          totalValue: product.quantity * product.price,
        },
      ]);
    }
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
    setShowFarmerProducts(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Commodity Aggregation</Text>
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

        {showFarmerProducts && (
          <View style={styles.farmerProductsSection}>
            <Text style={styles.sectionTitle}>Farmer's Products</Text>
            <Text style={styles.farmerProductsSubtitle}>
              Available products from {aggregationData.farmerName}
            </Text>

            {selectedFarmerProducts.map((product) => (
              <View
                key={`${product.id}-${product.quantity}`}
                style={styles.farmerProductCard}
              >
                <View style={styles.farmerProductHeader}>
                  <Text style={styles.farmerProductName}>{product.name}</Text>
                  <Text style={styles.farmerProductQuantity}>
                    {product.quantity} {product.unit}
                  </Text>
                </View>

                <View style={styles.farmerProductDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Moisture Level:</Text>
                    <Text style={styles.detailValue}>
                      {product.moistureLevel}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Storage:</Text>
                    <Text style={styles.detailValue}>{product.storage}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Packaging:</Text>
                    <Text style={styles.detailValue}>{product.packaging}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Price:</Text>
                    <Text style={styles.detailValue}>
                      ₦ {product.price.toFixed(2)}/{product.unit}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.addFarmerProductButton}
                  onPress={() => addFarmerProduct(product)}
                  disabled={selectedProducts.some((p) => p.id === product.id)}
                >
                  <Text style={styles.addFarmerProductButtonText}>
                    {selectedProducts.some((p) => p.id === product.id)
                      ? "Added"
                      : "Add to Aggregation"}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
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
  // New styles for farmer products section
  farmerProductsSection: {
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
  farmerProductsSubtitle: {
    fontSize: 14,
    color: "#689F38",
    marginBottom: 15,
    fontWeight: "500",
  },
  farmerProductCard: {
    backgroundColor: "#F5F9F7",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#689F38",
  },
  farmerProductHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  farmerProductName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#37474F",
  },
  farmerProductQuantity: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2E7D32",
  },
  farmerProductDetails: {
    marginBottom: 10,
  },
  addFarmerProductButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 6,
    padding: 10,
    alignItems: "center",
    marginTop: 5,
  },
  addFarmerProductButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default FarmProduceAggregation;


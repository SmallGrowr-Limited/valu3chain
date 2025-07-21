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
  const [targetQuantity, setTargetQuantity] = useState(40);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [aggregationProgress, setAggregationProgress] = useState(0);

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

  // Get farmers who have the selected crop
  const farmersWithSelectedCrop = selectedCrop
    ? farmers.filter((farmer) =>
        farmer.products.some((product) => product.id === selectedCrop.id)
      )
    : [];

  // Get the selected farmer's products
  const selectedFarmerProducts =
    farmers.find((farmer) => farmer.id === aggregationData.farmerId)
      ?.products || [];

  // Calculate aggregation progress
  useEffect(() => {
    if (selectedCrop && targetQuantity > 0) {
      const totalAggregated = selectedProducts
        .filter((product) => product.id === selectedCrop.id)
        .reduce((sum, product) => sum + product.quantityAvailable, 0);
      const progress = Math.min((totalAggregated / targetQuantity) * 100, 100);
      setAggregationProgress(progress);
    } else {
      setAggregationProgress(0);
    }
  }, [selectedProducts, targetQuantity, selectedCrop]);

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
    if (!selectedCrop || product.id !== selectedCrop.id) return;

    const productType = productTypes.find((p) => p.id === product.id);
    if (productType) {
      setSelectedProducts([
        ...selectedProducts,
        {
          ...productType,
          farmerId: aggregationData.farmerId,
          farmerName: aggregationData.farmerName,
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
    setSelectedCrop(null);
    setAggregationData({
      ...aggregationData,
      farmerId: "",
      farmerName: "",
      products: [],
      notes: "",
    });
    setShowFarmerProducts(false);
    setTargetQuantity(40);
    setAggregationProgress(0);
  };

  const handleCropSelection = (productId) => {
    const crop = productTypes.find((p) => p.id === productId);
    setSelectedCrop(crop);
    setShowFarmerList(true);
  };

  // Calculate total aggregated for the selected crop
  const totalAggregated = selectedCrop
    ? selectedProducts
        .filter((product) => product.id === selectedCrop.id)
        .reduce((sum, product) => sum + product.quantityAvailable, 0)
    : 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Commodity Aggregation</Text>
        <Text style={styles.subHeader}>
          Record end-of-season produce for farmers
        </Text>
      </View>

      {/* Crop Selection and Target Quantity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Crop Aggregation</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Select Crop to Aggregate</Text>
          <Picker
            selectedValue={selectedCrop?.id || ""}
            onValueChange={handleCropSelection}
            style={styles.picker}
          >
            <Picker.Item label="Select a crop..." value="" />
            {productTypes.map((product) => (
              <Picker.Item
                key={product.id}
                label={`${product.name} (${product.category})`}
                value={product.id}
              />
            ))}
          </Picker>
        </View>

        {selectedCrop && (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Target Quantity (units)</Text>
              <TextInput
                style={styles.input}
                value={targetQuantity.toString()}
                onChangeText={(text) => setTargetQuantity(Number(text) || 0)}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Aggregation Progress</Text>
                <Text style={styles.progressText}>
                  {totalAggregated} / {targetQuantity} {selectedCrop.unit}
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${aggregationProgress}%` },
                  ]}
                />
              </View>
              <Text style={styles.progressPercentage}>
                {Math.round(aggregationProgress)}%
              </Text>
            </View>
          </>
        )}
      </View>

      {/* Farmer Selection */}
      {selectedCrop && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Farmers</Text>
          <Text style={styles.sectionSubtitle}>
            Farmers with {selectedCrop.name}
          </Text>

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

          {showFarmerList && (
            <View style={styles.farmerSearchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search farmers by name, ID or phone"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <FlatList
                data={filteredFarmers.filter((farmer) =>
                  farmer.products.some((p) => p.id === selectedCrop.id)
                )}
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
                      <Text style={styles.farmerProductInfo}>
                        {
                          item.products.find((p) => p.id === selectedCrop.id)
                            .quantity
                        }{" "}
                        {selectedCrop.unit} available
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
              <Text style={styles.sectionSubtitle}>
                {selectedCrop.name} from {aggregationData.farmerName}
              </Text>

              {selectedFarmerProducts
                .filter((product) => product.id === selectedCrop.id)
                .map((product) => (
                  <View
                    key={`${product.id}-${product.quantity}`}
                    style={styles.farmerProductCard}
                  >
                    <View style={styles.farmerProductHeader}>
                      <Text style={styles.farmerProductName}>
                        {product.name}
                      </Text>
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
                        <Text style={styles.detailValue}>
                          {product.storage}
                        </Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Packaging:</Text>
                        <Text style={styles.detailValue}>
                          {product.packaging}
                        </Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Price:</Text>
                        <Text style={styles.detailValue}>
                          ₦ {product.price.toFixed(2)}/{product.unit}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.addFarmerProductButton,
                        totalAggregated >= targetQuantity &&
                          styles.disabledButton,
                      ]}
                      onPress={() => addFarmerProduct(product)}
                      disabled={
                        selectedProducts.some(
                          (p) =>
                            p.id === product.id &&
                            p.farmerId === aggregationData.farmerId
                        ) || totalAggregated >= targetQuantity
                      }
                    >
                      <Text style={styles.addFarmerProductButtonText}>
                        {selectedProducts.some(
                          (p) =>
                            p.id === product.id &&
                            p.farmerId === aggregationData.farmerId
                        )
                          ? "Added"
                          : totalAggregated >= targetQuantity
                            ? "Target Reached"
                            : "Add to Aggregation"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
            </View>
          )}
        </View>
      )}

      {/* Selected Products List */}
      {selectedProducts.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aggregated Products</Text>
          {selectedProducts
            .filter((product) =>
              selectedCrop ? product.id === selectedCrop.id : true
            )
            .map((product) => (
              <View
                key={`${product.id}-${product.farmerId}`}
                style={styles.productCard}
              >
                <View style={styles.productCardHeader}>
                  <View>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productCategory}>
                      {product.category}
                    </Text>
                    <Text style={styles.farmerInfo}>
                      From: {product.farmerName}
                    </Text>
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
                      <Text style={styles.quantityLabel}>
                        Available to Sell
                      </Text>
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
      {selectedCrop && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aggregation Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Crop:</Text>
            <Text style={styles.summaryValue}>{selectedCrop.name}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Target Quantity:</Text>
            <Text style={styles.summaryValue}>
              {targetQuantity} {selectedCrop.unit}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Aggregated Quantity:</Text>
            <Text style={styles.summaryValue}>
              {totalAggregated} {selectedCrop.unit}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Remaining:</Text>
            <Text style={styles.summaryValue}>
              {Math.max(0, targetQuantity - totalAggregated)}{" "}
              {selectedCrop.unit}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Farmers Contributed:</Text>
            <Text style={styles.summaryValue}>
              {
                new Set(
                  selectedProducts
                    .filter((p) => p.id === selectedCrop.id)
                    .map((p) => p.farmerId)
                ).size
              }
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Estimated Value:</Text>
            <Text style={[styles.summaryValue, styles.totalValue]}>
              ₦{" "}
              {selectedProducts
                .filter((p) => p.id === selectedCrop.id)
                .reduce((sum, product) => sum + product.totalValue, 0)
                .toFixed(2)}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.section}>
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
  sectionSubtitle: {
    fontSize: 14,
    color: "#689F38",
    marginBottom: 15,
    fontWeight: "500",
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
  farmerProductInfo: {
    fontSize: 12,
    color: "#2E7D32",
    fontWeight: "600",
    marginTop: 4,
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
  farmerInfo: {
    fontSize: 12,
    color: "#546E7A",
    marginTop: 4,
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
  // Farmer products section
  farmerProductsSection: {
    marginBottom: 15,
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
  // Progress bar styles
  progressContainer: {
    marginTop: 15,
    marginBottom: 10,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#455A64",
  },
  progressText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2E7D32",
  },
  progressBar: {
    height: 10,
    backgroundColor: "#E0E8E5",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 5,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
  progressPercentage: {
    textAlign: "right",
    fontSize: 12,
    color: "#78909C",
  },
});

export default FarmProduceAggregation;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FarmInputDistribution = () => {
  // State for the form
  const [selectedInputs, setSelectedInputs] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [showFarmerList, setShowFarmerList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const [distributionData, setDistributionData] = useState({
    farmerId: "",
    farmerName: "",
    season: new Date().getFullYear().toString(),
    date: new Date().toISOString().split("T")[0],
    inputs: [],
    notes: "",
    packages: [],
  });

  // Package rates per hectare
  const packageRates = {
    seeds: {
      maize: { quantity: 10, unit: "kg" }, // 10kg per hectare
      rice: { quantity: 20, unit: "kg" }, // 20kg per hectare
    },
    fertilizer: {
      npk: { quantity: 2, unit: "50kg bags" }, // 2 bags per hectare
      urea: { quantity: 1, unit: "50kg bags" }, // 1 bag per hectare
    },
    agroChemicals: {
      herbicide: { quantity: 1, unit: "5L containers" }, // 1 container per hectare
    },
  };

  // Sample verification codes (in real app, these would come from backend)
  const verificationCodes = {
    farmer001: "CODE123",
    farmer002: "CODE456",
    farmer003: "CODE789",
    farmer004: "CODE101",
    farmer005: "CODE112",
  };

  // Sample farmers data
  const [farmers, setFarmers] = useState([
    {
      id: "farmer001",
      name: "John Kamau",
      location: "Kiambu",
      phone: "0721000111",
      farmSize: "2",
    },
    {
      id: "farmer002",
      name: "Mary Wanjiku",
      location: "Murang'a",
      phone: "0722000222",
      farmSize: "3.5",
    },
    {
      id: "farmer003",
      name: "Peter Mwangi",
      location: "Nyeri",
      phone: "0723000333",
      farmSize: "5",
    },
    {
      id: "farmer004",
      name: "Grace Akinyi",
      location: "Kisumu",
      phone: "0724000444",
      farmSize: "1.2",
    },
    {
      id: "farmer005",
      name: "James Mutua",
      location: "Machakos",
      phone: "0725000555",
      farmSize: "4",
    },
  ]);

  // Sample input types data
  const inputTypes = [
    {
      id: "fert1",
      name: "NPK Fertilizer",
      type: "fertilizer",
      category: "npk",
      producer: "AgroSolutions Ltd",
      units: "50kg bags",
      available: 250,
      pricePerUnit: 45.0,
    },
    {
      id: "seed1",
      name: "Maize Seed - Hybrid",
      type: "seed",
      category: "maize",
      producer: "SeedCo International",
      units: "10kg bags",
      available: 180,
      pricePerUnit: 120.0,
      variety: "SC 403",
    },
    {
      id: "fert2",
      name: "Urea",
      type: "fertilizer",
      category: "urea",
      producer: "FarmChem",
      units: "50kg bags",
      available: 175,
      pricePerUnit: 38.5,
    },
    {
      id: "seed2",
      name: "Rice Seed - Improved",
      type: "seed",
      category: "rice",
      producer: "RiceTech Africa",
      units: "5kg bags",
      available: 210,
      pricePerUnit: 85.0,
      variety: "RT 101",
    },
    {
      id: "pest1",
      name: "Herbicide - Glyphosate",
      type: "pesticide",
      category: "herbicide",
      producer: "CropShield",
      units: "5L containers",
      available: 90,
      pricePerUnit: 75.0,
    },
  ];

  // Filter farmers based on search query
  const filteredFarmers = farmers.filter(
    (farmer) =>
      farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.phone.includes(searchQuery)
  );

  // Calculate package quantities based on farm size
  const calculatePackages = () => {
    if (!farmSize || isNaN(farmSize) || parseFloat(farmSize) <= 0) {
      Alert.alert(
        "Invalid Farm Size",
        "Please enter a valid farm size in hectares"
      );
      return;
    }

    const hectares = parseFloat(farmSize);
    const packages = [];

    // Calculate seed packages
    const maizeSeed = {
      inputId: "seed1",
      name: "Maize Seed Package",
      quantity: hectares * packageRates.seeds.maize.quantity,
      unit: packageRates.seeds.maize.unit,
      type: "seed",
    };
    packages.push(maizeSeed);

    const riceSeed = {
      inputId: "seed2",
      name: "Rice Seed Package",
      quantity: hectares * packageRates.seeds.rice.quantity,
      unit: packageRates.seeds.rice.unit,
      type: "seed",
    };
    packages.push(riceSeed);

    // Calculate fertilizer packages
    const npkFertilizer = {
      inputId: "fert1",
      name: "NPK Fertilizer Package",
      quantity: hectares * packageRates.fertilizer.npk.quantity,
      unit: packageRates.fertilizer.npk.unit,
      type: "fertilizer",
    };
    packages.push(npkFertilizer);

    const ureaFertilizer = {
      inputId: "fert2",
      name: "Urea Fertilizer Package",
      quantity: hectares * packageRates.fertilizer.urea.quantity,
      unit: packageRates.fertilizer.urea.unit,
      type: "fertilizer",
    };
    packages.push(ureaFertilizer);

    // Calculate agrochemical packages
    const herbicide = {
      inputId: "pest1",
      name: "Herbicide Package",
      quantity: hectares * packageRates.agroChemicals.herbicide.quantity,
      unit: packageRates.agroChemicals.herbicide.unit,
      type: "pesticide",
    };
    packages.push(herbicide);

    setDistributionData((prev) => ({
      ...prev,
      packages: packages,
    }));

    // Auto-select the package items
    const packageInputs = packages.map((pkg) => {
      const input = inputTypes.find((i) => i.id === pkg.inputId);
      return {
        ...input,
        quantity: pkg.quantity,
        totalPrice: pkg.quantity * input.pricePerUnit,
      };
    });

    setSelectedInputs(packageInputs);
  };

  const handleAddInput = () => {
    if (!currentInput) return;

    const selected = inputTypes.find((input) => input.id === currentInput);
    if (selected) {
      setSelectedInputs([
        ...selectedInputs,
        {
          ...selected,
          quantity: 1,
          totalPrice: selected.pricePerUnit,
        },
      ]);
      setCurrentInput("");
    }
  };

  const handleQuantityChange = (id, value) => {
    const updatedInputs = selectedInputs.map((input) => {
      if (input.id === id) {
        const quantity = parseInt(value) || 0;
        return {
          ...input,
          quantity,
          totalPrice: quantity * input.pricePerUnit,
        };
      }
      return input;
    });
    setSelectedInputs(updatedInputs);
  };

  const removeInput = (id) => {
    setSelectedInputs(selectedInputs.filter((input) => input.id !== id));
  };

  const selectFarmer = (farmer) => {
    setDistributionData({
      ...distributionData,
      farmerId: farmer.id,
      farmerName: farmer.name,
    });
    setFarmSize(farmer.farmSize);
    setShowFarmerList(false);
    setSearchQuery("");
    setIsVerified(false); // Reset verification when farmer changes
    setVerificationCode("");
  };

  const verifyCode = () => {
    if (!distributionData.farmerId) {
      Alert.alert("Error", "Please select a farmer first");
      return;
    }

    if (!verificationCode) {
      Alert.alert("Error", "Please enter the verification code");
      return;
    }

    // In a real app, this would be an API call
    if (verificationCodes[distributionData.farmerId] === verificationCode) {
      setIsVerified(true);
      Alert.alert("Success", "Code verified successfully");
    } else {
      setIsVerified(false);
      Alert.alert("Error", "Invalid verification code");
    }
  };

  const handleSubmit = () => {
    try {
      if (!isVerified) {
        Alert.alert(
          "Verification Required",
          "Please verify the code before submission"
        );
        return;
      }

      if (!distributionData.farmerId) {
        Alert.alert("Error", "Please select a farmer");
        return;
      }

      if (selectedInputs.length === 0) {
        Alert.alert("Error", "Please select at least one input");
        return;
      }

      const totalDistribution = {
        ...distributionData,
        inputs: selectedInputs,
        totalQuantity: selectedInputs.reduce(
          (sum, input) => sum + input.quantity,
          0
        ),
        totalPrice: selectedInputs.reduce(
          (sum, input) => sum + input.totalPrice,
          0
        ),
        farmSize: farmSize,
        verificationCode: verificationCode,
        verified: isVerified,
        timestamp: new Date().toISOString(),
      };

      // Log the form data
      console.log(
        "Distribution data:",
        JSON.stringify(totalDistribution, null, 2)
      );

      // Here you would typically send the data to your backend
      Alert.alert(
        "Success",
        `Distribution recorded successfully for ${totalDistribution.farmerName}!
        \nTotal Inputs: ${totalDistribution.totalQuantity}
        \nTotal Price: ₦${totalDistribution.totalPrice.toFixed(2)}`
      );

      // Reset form
      setSelectedInputs([]);
      setDistributionData({
        farmerId: "",
        farmerName: "",
        season: new Date().getFullYear().toString(),
        date: new Date().toISOString().split("T")[0],
        inputs: [],
        notes: "",
        packages: [],
      });
      setFarmSize("");
      setVerificationCode("");
      setIsVerified(false);
    } catch (error) {
      console.error("Submission error:", error);
      Alert.alert("Error", "An error occurred while submitting the form");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Farm Input Distribution</Text>

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
                distributionData.farmerName
                  ? styles.farmerSelectedText
                  : styles.farmerPlaceholderText
              }
            >
              {distributionData.farmerName || "Tap to select farmer"}
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
                      {item.location} • {item.farmSize} hectares
                    </Text>
                  </View>
                  {distributionData.farmerId === item.id && (
                    <MaterialCommunityIcons
                      name="check"
                      size={24}
                      color="#27AE60"
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
          <Text style={styles.label}>Farm Size (hectares)</Text>
          <TextInput
            style={styles.input}
            value={farmSize}
            onChangeText={setFarmSize}
            placeholder="Enter farm size in hectares"
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.calculateButton}
            onPress={calculatePackages}
            disabled={!farmSize || !distributionData.farmerId}
          >
            <Text style={styles.calculateButtonText}>
              Calculate Package Quantities
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Season</Text>
          <TextInput
            style={styles.input}
            value={distributionData.season}
            onChangeText={(text) =>
              setDistributionData({ ...distributionData, season: text })
            }
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Distribution Date</Text>
          <TextInput
            style={styles.input}
            value={distributionData.date}
            onChangeText={(text) =>
              setDistributionData({ ...distributionData, date: text })
            }
          />
        </View>
      </View>

      {/* Verification Code */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Verification</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Verification Code</Text>
          <TextInput
            style={styles.input}
            value={verificationCode}
            onChangeText={setVerificationCode}
            placeholder="Enter code sent to farmer"
          />
          <TouchableOpacity
            style={styles.verifyButton}
            onPress={verifyCode}
            disabled={!verificationCode || !distributionData.farmerId}
          >
            <Text style={styles.verifyButtonText}>
              {isVerified ? "Verified" : "Verify Code"}
            </Text>
            {isVerified && (
              <MaterialCommunityIcons
                name="check-circle"
                size={20}
                color="#fff"
                style={{ marginLeft: 5 }}
              />
            )}
          </TouchableOpacity>
          {isVerified && (
            <Text style={styles.verifiedText}>Code verified successfully!</Text>
          )}
        </View>
      </View>

      {/* Input Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Farm Inputs</Text>
        <View style={styles.inputRow}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={currentInput}
              onValueChange={(itemValue) => setCurrentInput(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select an input..." value="" />
              {inputTypes.map((input) => (
                <Picker.Item
                  key={input.id}
                  label={`${input.name} (${input.producer})`}
                  value={input.id}
                />
              ))}
            </Picker>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAddInput}>
            <MaterialCommunityIcons name="plus" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Selected Inputs List */}
      {selectedInputs.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Inputs</Text>
          {selectedInputs.map((input) => (
            <View key={input.id} style={styles.inputCard}>
              <View style={styles.inputCardHeader}>
                <Text style={styles.inputName}>{input.name}</Text>
                <TouchableOpacity onPress={() => removeInput(input.id)}>
                  <MaterialCommunityIcons
                    name="close"
                    size={20}
                    color="#E74C3C"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.inputDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Producer:</Text>
                  <Text style={styles.detailValue}>{input.producer}</Text>
                </View>
                {input.variety && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Variety:</Text>
                    <Text style={styles.detailValue}>{input.variety}</Text>
                  </View>
                )}
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Available:</Text>
                  <Text style={styles.detailValue}>
                    {input.available} {input.units}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>
                    Price per {input.units.split(" ")[1]}:
                  </Text>
                  <Text style={styles.detailValue}>
                    ₦{input.pricePerUnit.toFixed(2)}
                  </Text>
                </View>
              </View>

              <View style={styles.quantityControl}>
                <Text style={styles.quantityLabel}>Quantity:</Text>
                <TextInput
                  style={styles.quantityInput}
                  value={input.quantity.toString()}
                  onChangeText={(text) => handleQuantityChange(input.id, text)}
                  keyboardType="numeric"
                />
                <Text style={styles.quantityUnit}>{input.units}</Text>
                <Text style={styles.totalPrice}>
                  Total: ₦{input.totalPrice.toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Summary and Notes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Farmer:</Text>
          <Text style={styles.summaryValue}>
            {distributionData.farmerName || "Not selected"}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Farm Size:</Text>
          <Text style={styles.summaryValue}>{farmSize || "0"} hectares</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Inputs Selected:</Text>
          <Text style={styles.summaryValue}>{selectedInputs.length}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Quantity:</Text>
          <Text style={styles.summaryValue}>
            {selectedInputs.reduce((sum, input) => sum + input.quantity, 0)}{" "}
            units
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Price:</Text>
          <Text style={styles.summaryValue}>
            ₦
            {selectedInputs
              .reduce((sum, input) => sum + input.totalPrice, 0)
              .toFixed(2)}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Verification Status:</Text>
          <Text
            style={[
              styles.summaryValue,
              { color: isVerified ? "#27AE60" : "#E74C3C" },
            ]}
          >
            {isVerified ? "Verified" : "Not Verified"}
          </Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, styles.notesInput]}
            value={distributionData.notes}
            onChangeText={(text) =>
              setDistributionData({ ...distributionData, notes: text })
            }
            placeholder="Any additional notes..."
            multiline
          />
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[
          styles.submitButton,
          (!distributionData.farmerId ||
            selectedInputs.length === 0 ||
            !isVerified) &&
            styles.disabledButton,
        ]}
        onPress={handleSubmit}
        disabled={
          !distributionData.farmerId ||
          selectedInputs.length === 0 ||
          !isVerified
        }
      >
        <Text style={styles.submitButtonText}>Record Distribution</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Updated styles with new button styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 25,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#27AE60",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEDED",
    paddingBottom: 8,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#566573",
    marginBottom: 5,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D5D8DC",
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    color: "#2C3E50",
    backgroundColor: "#FDFEFE",
  },
  notesInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  farmerSelectButton: {
    borderWidth: 1,
    borderColor: "#D5D8DC",
    borderRadius: 6,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FDFEFE",
  },
  farmerSelectedText: {
    fontSize: 16,
    color: "#2C3E50",
  },
  farmerPlaceholderText: {
    fontSize: 16,
    color: "#95A5A6",
  },
  farmerSearchContainer: {
    marginBottom: 15,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#D5D8DC",
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    color: "#2C3E50",
    backgroundColor: "#FDFEFE",
    marginBottom: 10,
  },
  farmerList: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: "#EAEDED",
    borderRadius: 6,
  },
  farmerListItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEDED",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  farmerName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2C3E50",
    marginBottom: 2,
  },
  farmerDetails: {
    fontSize: 12,
    color: "#7F8C8D",
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
    borderColor: "#D5D8DC",
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: "#FDFEFE",
  },
  picker: {
    height: 50,
    color: "#2C3E50",
  },
  addButton: {
    backgroundColor: "#27AE60",
    borderRadius: 6,
    padding: 13,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  calculateButton: {
    backgroundColor: "#3498DB",
    borderRadius: 6,
    padding: 12,
    marginTop: 10,
    alignItems: "center",
  },
  calculateButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  verifyButton: {
    backgroundColor: "#27AE60",
    borderRadius: 6,
    padding: 12,
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  verifiedText: {
    color: "#27AE60",
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  inputCard: {
    backgroundColor: "#F8F9F9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#27AE60",
  },
  inputCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  inputName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
    flex: 1,
  },
  inputDetails: {
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 14,
    color: "#566573",
    width: 100,
  },
  detailValue: {
    fontSize: 14,
    color: "#2C3E50",
    fontWeight: "500",
    flex: 1,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityLabel: {
    fontSize: 14,
    color: "#566573",
    marginRight: 10,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: "#D5D8DC",
    borderRadius: 4,
    padding: 8,
    width: 60,
    textAlign: "center",
    marginRight: 10,
    backgroundColor: "#FDFEFE",
  },
  quantityUnit: {
    fontSize: 14,
    color: "#2C3E50",
    marginRight: 15,
  },
  totalPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#27AE60",
    marginLeft: "auto",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEDED",
  },
  summaryLabel: {
    fontSize: 15,
    color: "#566573",
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2C3E50",
  },
  submitButton: {
    backgroundColor: "#27AE60",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: "#95A5A6",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FarmInputDistribution;


import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import { Checkbox } from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import Header from "../../../../components/agent-components/Header";

// Crop types for credit purchases
const cropTypes = [
  { id: "1", name: "Maize" },
  { id: "2", name: "Rice" },
  { id: "3", name: "Soybean" },
  { id: "4", name: "Wheat" },
];

// Package rates per hectare for different crops (credit purchases)
const packageRates = {
  maize: {
    seeds: { quantity: 10, unit: "kg", type: "Maize Seed" },
    fertilizer: [
      { type: "NPK", quantity: 2, unit: "50kg bags" },
      { type: "Urea", quantity: 1, unit: "50kg bags" },
    ],
    agroChemicals: [{ type: "Herbicide", quantity: 1, unit: "5L containers" }],
  },
  rice: {
    seeds: { quantity: 20, unit: "kg", type: "Rice Seed" },
    fertilizer: [
      { type: "NPK", quantity: 3, unit: "50kg bags" },
      { type: "Urea", quantity: 2, unit: "50kg bags" },
    ],
    agroChemicals: [
      { type: "Herbicide", quantity: 1.5, unit: "5L containers" },
    ],
  },
  soybean: {
    seeds: { quantity: 15, unit: "kg", type: "Soybean Seed" },
    fertilizer: [{ type: "NPK", quantity: 1, unit: "50kg bags" }],
    agroChemicals: [
      { type: "Herbicide", quantity: 0.5, unit: "5L containers" },
    ],
  },
  wheat: {
    seeds: { quantity: 12, unit: "kg", type: "Wheat Seed" },
    fertilizer: [
      { type: "NPK", quantity: 2, unit: "50kg bags" },
      { type: "DAP", quantity: 1, unit: "50kg bags" },
    ],
    agroChemicals: [{ type: "Fungicide", quantity: 1, unit: "500g packets" }],
  },
};

// Input categories for outright purchases
const inputCategories = [
  { id: "1", name: "Fertilizer" },
  { id: "2", name: "Seed" },
  { id: "3", name: "Pesticide" },
  { id: "4", name: "Equipment" },
  { id: "5", name: "Animal Feed" },
];

const inputTypes = [
  // Fertilizers
  {
    id: "1",
    name: "NPK Fertilizer",
    unit: "50kg bag",
    description: "Balanced NPK fertilizer for general crop use",
    producer: "AgroSolutions Ltd",
    price: 45.0,
    category: "Fertilizer",
    type: "NPK",
  },
  {
    id: "2",
    name: "Urea",
    unit: "50kg bag",
    description: "Nitrogen-rich fertilizer",
    producer: "FertilizerPlus",
    price: 38.0,
    category: "Fertilizer",
    type: "Urea",
  },
  {
    id: "3",
    name: "DAP",
    unit: "50kg bag",
    description: "Diammonium phosphate fertilizer",
    producer: "CropGrow",
    price: 52.0,
    category: "Fertilizer",
    type: "DAP",
  },
  // Seeds
  {
    id: "4",
    name: "Maize Seed",
    unit: "10kg bag",
    description: "High-yield hybrid maize seed",
    producer: "SeedCo International",
    price: 120.0,
    category: "Seed",
    type: "Maize",
    variety: "SC 403",
  },
  {
    id: "5",
    name: "Rice Seed",
    unit: "10kg bag",
    description: "Improved rice variety",
    producer: "West Africa Seed",
    price: 95.0,
    category: "Seed",
    type: "Rice",
    variety: "WAR 77",
  },
  {
    id: "6",
    name: "Soybean Seed",
    unit: "10kg bag",
    description: "High protein soybean",
    producer: "SeedCo International",
    price: 85.0,
    category: "Seed",
    type: "Soybean",
    variety: "SC 701",
  },
  // Pesticides
  {
    id: "7",
    name: "Herbicide",
    unit: "5L container",
    description: "Glyphosate-based weed control",
    producer: "CropShield",
    price: 75.0,
    category: "Pesticide",
    type: "Herbicide",
  },
  {
    id: "8",
    name: "Insecticide",
    unit: "1L bottle",
    description: "Broad-spectrum insect control",
    producer: "PestFree",
    price: 45.0,
    category: "Pesticide",
    type: "Insecticide",
  },
  {
    id: "9",
    name: "Fungicide",
    unit: "500g packet",
    description: "Prevents fungal infections",
    producer: "CropShield",
    price: 32.0,
    category: "Pesticide",
    type: "Fungicide",
  },
  // Equipment
  {
    id: "10",
    name: "Sprayer",
    unit: "unit",
    description: "Manual backpack sprayer",
    producer: "AgriTools",
    price: 150.0,
    category: "Equipment",
    type: "Sprayer",
  },
  {
    id: "11",
    name: "Water Pump",
    unit: "unit",
    description: "Diesel-powered water pump",
    producer: "IrriTech",
    price: 450.0,
    category: "Equipment",
    type: "Water Pump",
  },
  // Animal Feed
  {
    id: "12",
    name: "Poultry Feed",
    unit: "25kg bag",
    description: "Starter feed for chicks",
    producer: "FeedMaster",
    price: 35.0,
    category: "Animal Feed",
    type: "Poultry",
  },
  {
    id: "13",
    name: "Cattle Feed",
    unit: "50kg bag",
    description: "High protein cattle feed",
    producer: "NutriLivestock",
    price: 65.0,
    category: "Animal Feed",
    type: "Cattle",
  },
];

const farmersList = [
  {
    id: "1",
    name: "Kwame Yeboah",
    location: "Ashanti Region",
    phone: "0244112233",
    farmSize: "2",
  },
  {
    id: "2",
    name: "Adwoa Mensah",
    location: "Eastern Region",
    phone: "0203445566",
    farmSize: "3.5",
  },
  {
    id: "3",
    name: "Kofi Asante",
    location: "Brong-Ahafo",
    phone: "0277889900",
    farmSize: "5",
  },
];

export default function RequestInputs() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedFarmer, setSelectedFarmer] = useState(params.farmerId || "");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedInput, setSelectedInput] = useState("");
  const [quantity, setQuantity] = useState("");
  const [urgency, setUrgency] = useState("normal");
  const [notes, setNotes] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState(0);
  const [requestItems, setRequestItems] = useState([]);
  const [showInputDetails, setShowInputDetails] = useState(false);
  const [commitmentFeePaid, setCommitmentFeePaid] = useState(false);
  const [requestStatus, setRequestStatus] = useState("outright");
  const [upfrontPayment, setUpfrontPayment] = useState(0);
  const [upfrontPaymentPaid, setUpfrontPaymentPaid] = useState(false);
  const [farmSize, setFarmSize] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [packageInputs, setPackageInputs] = useState([]);

  // Filter input types based on selected category
  const filteredInputTypes = selectedCategory
    ? inputTypes.filter((input) => input.category === selectedCategory)
    : [];

  // Set default farmer if coming from farmer details
  useEffect(() => {
    setSelectedFarmer(params.farmerId);
    if (params.farmerId) {
      const farmer = farmersList.find((f) => f.id === params.farmerId);
      if (farmer) {
        setFarmSize(farmer.farmSize);
      }
    }
  }, [params.farmerId]);

  // Generate package inputs when crop or farm size changes
  useEffect(() => {
    if (requestStatus === "credit" && selectedCrop && farmSize) {
      const hectares = parseFloat(farmSize);
      if (!isNaN(hectares)) {
        const cropPackage = packageRates[selectedCrop.toLowerCase()];
        const inputs = [];

        // Add seeds
        const seedInput = inputTypes.find((i) =>
          i.name.includes(cropPackage.seeds.type)
        );
        if (seedInput) {
          inputs.push({
            id: `seed-${Date.now()}`,
            name: cropPackage.seeds.type,
            quantity: (hectares * cropPackage.seeds.quantity).toFixed(2),
            unit: cropPackage.seeds.unit,
            price: seedInput.price,
            type: "Seed",
            category: "Seed",
            packageItem: true,
          });
        }

        // Add fertilizers
        cropPackage.fertilizer.forEach((fert) => {
          const fertInput = inputTypes.find((i) => i.type === fert.type);
          if (fertInput) {
            inputs.push({
              id: `fert-${Date.now()}-${fert.type}`,
              name: `${fert.type} Fertilizer`,
              quantity: (hectares * fert.quantity).toFixed(2),
              unit: fert.unit,
              price: fertInput.price,
              type: fert.type,
              category: "Fertilizer",
              packageItem: true,
            });
          }
        });

        // Add agrochemicals
        cropPackage.agroChemicals.forEach((chem) => {
          const chemInput = inputTypes.find((i) => i.type === chem.type);
          if (chemInput) {
            inputs.push({
              id: `chem-${Date.now()}-${chem.type}`,
              name: chem.type,
              quantity: (hectares * chem.quantity).toFixed(2),
              unit: chem.unit,
              price: chemInput.price,
              type: chem.type,
              category: "Pesticide",
              packageItem: true,
            });
          }
        });

        setPackageInputs(inputs);
      }
    } else {
      setPackageInputs([]);
    }
  }, [selectedCrop, farmSize, requestStatus]);

  // Reset input type when category changes
  useEffect(() => {
    setSelectedInput("");
    setQuantity("");
    setUnit("");
    setPrice(0);
  }, [selectedCategory]);

  // Update unit and price when input type changes
  useEffect(() => {
    if (selectedInput) {
      const input = inputTypes.find((item) => item.id === selectedInput);
      setUnit(input?.unit || "");
      setPrice(input?.price || 0);
    } else {
      setUnit("");
      setPrice(0);
    }
  }, [selectedInput]);

  // Calculate upfront payment when request items or status changes
  useEffect(() => {
    if (requestStatus === "credit" && requestItems.length > 0) {
      const totalAmount = requestItems.reduce(
        (sum, item) => sum + parseFloat(item.totalPrice),
        0
      );
      const payment = totalAmount * 0.1; // 10% of total
      setUpfrontPayment(payment);
    } else {
      setUpfrontPayment(0);
    }
  }, [requestItems, requestStatus]);

  const addRequestItem = () => {
    if (!selectedInput || !quantity) {
      Alert.alert(
        "Missing Information",
        "Please select an input type and quantity"
      );
      return;
    }

    const input = inputTypes.find((i) => i.id === selectedInput);
    const totalPrice = (input.price * parseFloat(quantity)).toFixed(2);

    const newItem = {
      id: Date.now().toString(),
      inputId: selectedInput,
      name: input.name,
      quantity: quantity,
      unit: input.unit,
      price: input.price,
      totalPrice: totalPrice,
      urgency: urgency,
      category: input.category,
      type: input.type,
      producer: input.producer,
      description: input.description,
      ...(input.variety && { variety: input.variety }),
    };

    setRequestItems([...requestItems, newItem]);
    resetInputFields();
  };

  const removeRequestItem = (id) => {
    setRequestItems(requestItems.filter((item) => item.id !== id));
  };

  const resetInputFields = () => {
    setSelectedInput("");
    setQuantity("");
    setUrgency("normal");
    setUnit("");
    setPrice(0);
  };

  const handleSubmit = () => {
    if (!selectedFarmer || requestItems.length === 0) {
      Alert.alert(
        "Missing Information",
        "Please select a farmer and add at least one input item"
      );
      return;
    }

    if (!commitmentFeePaid) {
      Alert.alert(
        "Commitment Fee Required",
        "Please confirm payment of the 1000 Naira commitment fee"
      );
      return;
    }

    if (requestStatus === "credit" && !upfrontPaymentPaid) {
      Alert.alert(
        "Upfront Payment Required",
        `A 10% upfront payment of ₦${upfrontPayment.toFixed(2)} is required for credit requests`
      );
      return;
    }

    const farmer = farmersList.find((f) => f.id === selectedFarmer);
    const totalValue = requestItems
      .reduce((sum, item) => sum + parseFloat(item.totalPrice), 0)
      .toFixed(2);

    Alert.alert(
      "Request Submitted",
      `Request for ${requestItems.length} inputs totaling ₦${totalValue} for ${farmer?.name} has been submitted as ${requestStatus} payment`,
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]
    );
  };

  const renderInputItem = ({ item }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemName}>{item.name}</Text>
        <TouchableOpacity onPress={() => removeRequestItem(item.id)}>
          <MaterialCommunityIcons name="close" size={20} color={colors.error} />
        </TouchableOpacity>
      </View>

      <View style={styles.itemDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Quantity:</Text>
          <Text style={styles.detailValue}>
            {item.quantity} {item.unit}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Price:</Text>
          <Text style={styles.detailValue}>
            ₦{item.price.toFixed(2)}/{item.unit.split(" ")[1] || item.unit}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total:</Text>
          <Text style={styles.detailValue}>₦{item.totalPrice}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Type:</Text>
          <Text style={styles.detailValue}>{item.type}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Urgency:</Text>
          <View
            style={[
              styles.urgencyTag,
              styles[
                `urgency${item.urgency.charAt(0).toUpperCase() + item.urgency.slice(1)}`
              ],
            ]}
          >
            <Text style={styles.urgencyTagText}>{item.urgency}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.moreDetailsButton}
        onPress={() => setShowInputDetails(!showInputDetails)}
      >
        <Text style={styles.moreDetailsText}>
          {showInputDetails ? "Hide Details" : "View Details"}
        </Text>
        <MaterialCommunityIcons
          name={showInputDetails ? "chevron-up" : "chevron-down"}
          size={20}
          color={colors.primary}
        />
      </TouchableOpacity>

      {showInputDetails && (
        <View style={styles.expandedDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category:</Text>
            <Text style={styles.detailValue}>{item.category}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Producer:</Text>
            <Text style={styles.detailValue}>{item.producer}</Text>
          </View>
          {item.variety && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Variety:</Text>
              <Text style={styles.detailValue}>{item.variety}</Text>
            </View>
          )}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Description:</Text>
            <Text style={styles.detailValue}>{item.description}</Text>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Request Farm Inputs"
        rightAction={
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/extension-agent/home/inputs")}
          >
            <Ionicons name="arrow-back" size={24} color={colors.dark} />
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Farmer Information</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Farmer</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedFarmer}
              onValueChange={(itemValue) => {
                setSelectedFarmer(itemValue);
                const farmer = farmersList.find((f) => f.id === itemValue);
                if (farmer) setFarmSize(farmer.farmSize);
              }}
              style={styles.picker}
              dropdownIconColor={colors.primary}
            >
              <Picker.Item label="Select a farmer..." value="" />
              {farmersList.map((farmer) => (
                <Picker.Item
                  key={farmer.id}
                  label={`${farmer.name} (${farmer.location})`}
                  value={farmer.id}
                />
              ))}
            </Picker>
          </View>
        </View>

        {selectedFarmer && (
          <>
            {/* Payment Status Selection */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Payment Status</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={requestStatus}
                  onValueChange={(itemValue) => {
                    setRequestStatus(itemValue);
                    setSelectedCrop("");
                    setSelectedCategory("");
                    setSelectedInput("");
                    setQuantity("");
                  }}
                  style={styles.picker}
                  dropdownIconColor={colors.primary}
                >
                  <Picker.Item label="Outright" value="outright" />
                  <Picker.Item label="Credit" value="credit" />
                </Picker>
              </View>
            </View>

            {/* Farm Size */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Farm Size (hectares)</Text>
              <TextInput
                style={styles.input}
                value={farmSize}
                onChangeText={setFarmSize}
                keyboardType="numeric"
                placeholder="Enter farm size"
              />
            </View>

            {requestStatus === "credit" ? (
              <>
                {/* Crop Selection for Credit */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Select Crop to Plant</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={selectedCrop}
                      onValueChange={setSelectedCrop}
                      style={styles.picker}
                      dropdownIconColor={colors.primary}
                    >
                      <Picker.Item label="Select crop..." value="" />
                      {cropTypes.map((crop) => (
                        <Picker.Item
                          key={crop.id}
                          label={crop.name}
                          value={crop.name.toLowerCase()}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>

                {/* Display Package Inputs */}
                {selectedCrop && farmSize && (
                  <View style={styles.packageContainer}>
                    <Text style={styles.packageTitle}>
                      Recommended Inputs for{" "}
                      {selectedCrop.charAt(0).toUpperCase() +
                        selectedCrop.slice(1)}{" "}
                      ({farmSize} ha)
                    </Text>

                    {packageInputs.map((input) => (
                      <View key={input.id} style={styles.packageItem}>
                        <Text style={styles.packageItemName}>{input.name}</Text>
                        <Text style={styles.packageItemDetail}>
                          {input.quantity} {input.unit}
                        </Text>
                        <TouchableOpacity
                          style={styles.addPackageButton}
                          onPress={() => {
                            const totalPrice = (
                              input.price * parseFloat(input.quantity)
                            ).toFixed(2);
                            const newItem = {
                              id: Date.now().toString(),
                              inputId: input.id,
                              name: input.name,
                              quantity: input.quantity,
                              unit: input.unit,
                              price: input.price,
                              totalPrice: totalPrice,
                              urgency: "normal",
                              category: input.category,
                              type: input.type,
                              packageItem: true,
                            };
                            setRequestItems([...requestItems, newItem]);
                          }}
                        >
                          <Text style={styles.addPackageButtonText}>Add</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}
              </>
            ) : (
              <>
                {/* Regular Input Selection for Outright */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Input Category</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={selectedCategory}
                      onValueChange={setSelectedCategory}
                      style={styles.picker}
                      dropdownIconColor={colors.primary}
                    >
                      <Picker.Item label="Select category..." value="" />
                      {inputCategories.map((category) => (
                        <Picker.Item
                          key={category.id}
                          label={category.name}
                          value={category.name}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>

                {selectedCategory && (
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Input Type</Text>
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={selectedInput}
                        onValueChange={setSelectedInput}
                        style={styles.picker}
                        dropdownIconColor={colors.primary}
                      >
                        <Picker.Item label="Select input..." value="" />
                        {filteredInputTypes.map((input) => (
                          <Picker.Item
                            key={input.id}
                            label={`${input.name} (${input.unit})`}
                            value={input.id}
                          />
                        ))}
                      </Picker>
                    </View>
                  </View>
                )}

                {selectedInput && (
                  <View style={styles.inputRow}>
                    <View style={[styles.inputContainer, { flex: 1 }]}>
                      <Text style={styles.label}>Quantity</Text>
                      <View style={styles.quantityInput}>
                        <TextInput
                          style={styles.input}
                          keyboardType="numeric"
                          value={quantity}
                          onChangeText={setQuantity}
                          placeholder="0"
                        />
                        {unit && (
                          <Text style={styles.unit}>
                            {unit.split(" ")[1] || unit}
                          </Text>
                        )}
                      </View>
                    </View>
                    <View style={[styles.inputContainer, { flex: 1 }]}>
                      <Text style={styles.label}>Urgency</Text>
                      <View style={styles.pickerContainer}>
                        <Picker
                          selectedValue={urgency}
                          onValueChange={setUrgency}
                          style={styles.picker}
                          dropdownIconColor={colors.primary}
                        >
                          <Picker.Item label="Normal" value="normal" />
                          <Picker.Item label="High" value="high" />
                          <Picker.Item label="Urgent" value="urgent" />
                        </Picker>
                      </View>
                    </View>
                  </View>
                )}

                {selectedInput && quantity && (
                  <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>
                      Price per {unit.split(" ")[1] || unit}:
                    </Text>
                    <Text style={styles.priceValue}>₦{price.toFixed(2)}</Text>

                    <Text style={styles.priceLabel}>Total:</Text>
                    <Text style={styles.priceValue}>
                      ₦{(price * parseFloat(quantity)).toFixed(2)}
                    </Text>
                  </View>
                )}

                {selectedInput && quantity && (
                  <TouchableOpacity
                    style={styles.addItemButton}
                    onPress={addRequestItem}
                  >
                    <MaterialCommunityIcons
                      name="plus"
                      size={20}
                      color={colors.white}
                    />
                    <Text style={styles.addItemButtonText}>Add to Request</Text>
                  </TouchableOpacity>
                )}
              </>
            )}

            {/* Request Items List */}
            {requestItems.length > 0 && (
              <View style={styles.itemsSection}>
                <Text style={styles.sectionTitle}>Request Items</Text>
                <FlatList
                  data={requestItems}
                  renderItem={renderInputItem}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                />

                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Total Items:</Text>
                  <Text style={styles.summaryValue}>{requestItems.length}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Total Value:</Text>
                  <Text style={styles.summaryTotal}>
                    ₦
                    {requestItems
                      .reduce(
                        (sum, item) => sum + parseFloat(item.totalPrice),
                        0
                      )
                      .toFixed(2)}
                  </Text>
                </View>
                {requestStatus === "credit" && (
                  <>
                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>
                        Upfront Payment (10%):
                      </Text>
                      <Text style={styles.summaryValue}>
                        ₦{upfrontPayment.toFixed(2)}
                      </Text>
                    </View>
                    <View style={styles.commitmentFeeRow}>
                      <Checkbox
                        value={upfrontPaymentPaid}
                        onValueChange={setUpfrontPaymentPaid}
                        color={upfrontPaymentPaid ? colors.primary : undefined}
                      />
                      <Text style={styles.commitmentFeeText}>
                        I confirm payment of {upfrontPayment.toFixed(2)} Naira
                        upfront
                      </Text>
                    </View>
                  </>
                )}
              </View>
            )}

            {/* Commitment Fee Section */}
            <View style={styles.commitmentFeeContainer}>
              <View style={styles.commitmentFeeRow}>
                <Checkbox
                  value={commitmentFeePaid}
                  onValueChange={setCommitmentFeePaid}
                  color={commitmentFeePaid ? colors.primary : undefined}
                />
                <Text style={styles.commitmentFeeText}>
                  I confirm payment of 1000 Naira commitment fee
                </Text>
              </View>
              {!commitmentFeePaid && (
                <Text style={styles.commitmentFeeNote}>
                  Note: A 1000 Naira commitment fee is required to process your
                  request
                </Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Additional Notes</Text>
              <TextInput
                style={[styles.input, styles.multilineInput]}
                multiline
                numberOfLines={4}
                value={notes}
                onChangeText={setNotes}
                placeholder="Any special instructions or details..."
              />
            </View>

            <TouchableOpacity
              style={[
                styles.submitButton,
                (!selectedFarmer || requestItems.length === 0) &&
                  styles.disabledButton,
              ]}
              onPress={handleSubmit}
              disabled={!selectedFarmer || requestItems.length === 0}
            >
              <MaterialCommunityIcons
                name="send"
                size={20}
                color={colors.white}
              />
              <Text style={styles.submitButtonText}>Submit Request</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const colors = {
  primary: "#2E7D32", // Deep green - represents agriculture and growth
  primaryLight: "#E8F5E9",
  primaryDark: "#1B5E20",
  secondary: "#FF8F00", // Amber for important actions
  background: "#F5F9F5", // Very light green tint
  white: "#FFFFFF",
  cardBg: "#FFFFFF",
  textPrimary: "#263238", // Dark blue-gray
  textSecondary: "#455A64",
  textTertiary: "#718096",
  border: "#E0E0E0",
  success: "#388E3C",
  warning: "#F57C00",
  error: "#D32F2F",
  urgencyNormal: "#1976D2",
  urgencyHigh: "#FF8F00",
  urgencyCritical: "#D32F2F",
  disabled: "#BDBDBD",
  detailBg: "#FAFAFA",
  infoBg: "#E3F2FD",
  infoText: "#1565C0",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 16,
    marginTop: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.primaryLight,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primaryDark,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
    color: colors.textPrimary,
  },
  quantityInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textPrimary,
  },
  unit: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textTertiary,
    marginLeft: 8,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    fontSize: 16,
    color: colors.textPrimary,
  },
  addItemButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  addItemButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  itemsSection: {
    marginBottom: 16,
  },
  itemCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  itemDetails: {
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: "500",
    flex: 1,
    textAlign: "right",
  },
  urgencyTag: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: "flex-end",
  },
  urgencyNormal: {
    backgroundColor: colors.urgencyNormal,
  },
  urgencyHigh: {
    backgroundColor: colors.urgencyHigh,
  },
  urgencyCritical: {
    backgroundColor: colors.urgencyCritical,
  },
  urgencyTagText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.white,
    textTransform: "uppercase",
  },
  moreDetailsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  moreDetailsText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "500",
    marginRight: 4,
  },
  expandedDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  summaryLabel: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: "600",
  },
  summaryTotal: {
    fontSize: 18,
    color: colors.primaryDark,
    fontWeight: "700",
  },
  submitButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 24,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: colors.disabled,
    shadowOpacity: 0,
  },
  commitmentFeeContainer: {
    backgroundColor: colors.primaryLight,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  commitmentFeeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  commitmentFeeText: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: "500",
    marginLeft: 8,
  },
  commitmentFeeNote: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: "italic",
  },
  packageContainer: {
    backgroundColor: colors.infoBg,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  packageTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.infoText,
    marginBottom: 12,
  },
  packageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  packageItemName: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textPrimary,
    flex: 2,
  },
  packageItemDetail: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
    textAlign: "right",
    marginRight: 16,
  },
  addPackageButton: {
    backgroundColor: colors.primary,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  addPackageButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "500",
  },
});

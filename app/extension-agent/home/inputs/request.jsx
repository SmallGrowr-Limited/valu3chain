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
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import Header from "../../../../components/agent-components/Header";

// Mock data - replace with your actual data sources
const inputTypes = [
  {
    id: "1",
    name: "NPK Fertilizer",
    unit: "50kg bag",
    description: "Balanced NPK fertilizer for general crop use",
    producer: "AgroSolutions Ltd",
    price: 45.0,
    category: "Fertilizer",
  },
  {
    id: "2",
    name: "Maize Seed",
    unit: "10kg bag",
    description: "High-yield hybrid maize seed",
    producer: "SeedCo International",
    price: 120.0,
    category: "Seed",
    variety: "SC 403",
  },
  {
    id: "3",
    name: "Herbicide",
    unit: "5L container",
    description: "Glyphosate-based weed control",
    producer: "CropShield",
    price: 75.0,
    category: "Pesticide",
  },
];

const farmersList = [
  {
    id: "1",
    name: "Kwame Yeboah",
    location: "Ashanti Region",
    phone: "0244112233",
  },
  {
    id: "2",
    name: "Adwoa Mensah",
    location: "Eastern Region",
    phone: "0203445566",
  },
  {
    id: "3",
    name: "Kofi Asante",
    location: "Brong-Ahafo",
    phone: "0277889900",
  },
];

export default function RequestInputs() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedFarmer, setSelectedFarmer] = useState(params.farmerId || "");
  const [selectedInput, setSelectedInput] = useState("");
  const [quantity, setQuantity] = useState("");
  const [urgency, setUrgency] = useState("normal");
  const [notes, setNotes] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState(0);
  const [requestItems, setRequestItems] = useState([]);
  const [showInputDetails, setShowInputDetails] = useState(false);

  // Set default farmer if coming from farmer details
  useEffect(() => {
    if (params.farmerId) {
      setSelectedFarmer(params.farmerId);
    }
  }, [params.farmerId]);

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

    const farmer = farmersList.find((f) => f.id === selectedFarmer);
    const totalValue = requestItems
      .reduce((sum, item) => sum + parseFloat(item.totalPrice), 0)
      .toFixed(2);

    Alert.alert(
      "Request Submitted",
      `Request for ${requestItems.length} inputs totaling ${totalValue} for ${farmer?.name} has been submitted`,
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
              onValueChange={(itemValue) => setSelectedFarmer(itemValue)}
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
            <Text style={styles.sectionTitle}>Input Details</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Input Type</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedInput}
                  onValueChange={(itemValue) => setSelectedInput(itemValue)}
                  style={styles.picker}
                  dropdownIconColor={colors.primary}
                >
                  <Picker.Item label="Select input type..." value="" />
                  {inputTypes.map((input) => (
                    <Picker.Item
                      key={input.id}
                      label={`${input.name} (${input.unit})`}
                      value={input.id}
                    />
                  ))}
                </Picker>
              </View>
            </View>

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
                      onValueChange={(itemValue) => setUrgency(itemValue)}
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
              </View>
            )}

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
});

// import { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   Alert,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import Header from "../../../../components/agent-components/Header";

// // Mock data - replace with your actual data sourcec
// const inputTypes = [
//   { id: "1", name: "Fertilizer", unit: "kg" },
//   { id: "2", name: "Seeds/Seedling", unit: "kg" },
// ];

// const farmersList = [
//   { id: "1", name: "Kwame Yeboah" },
//   { id: "2", name: "Adwoa Mensah" },
//   { id: "3", name: "Kofi Asante" },
// ];

// export default function RequestInputs() {
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const [selectedFarmer, setSelectedFarmer] = useState(params.farmerId || "");
//   const [selectedInput, setSelectedInput] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [urgency, setUrgency] = useState("normal");
//   const [notes, setNotes] = useState("");
//   const [unit, setUnit] = useState("");

//   // Set default farmer if coming from farmer details
//   useEffect(() => {
//     if (params.farmerId) {
//       setSelectedFarmer(params.farmerId);
//     }
//   }, [params.farmerId]);

//   // Update unit when input type changes
//   useEffect(() => {
//     if (selectedInput) {
//       const input = inputTypes.find((item) => item.id === selectedInput);
//       setUnit(input?.unit || "");
//     } else {
//       setUnit("");
//     }
//   }, [selectedInput]);

//   const handleSubmit = () => {
//     if (!selectedFarmer || !selectedInput || !quantity) {
//       Alert.alert(
//         "Missing Information",
//         "Please select a farmer, input type, and quantity"
//       );
//       return;
//     }

//     // In a real app, you would submit to your backend here
//     const farmer = farmersList.find((f) => f.id === selectedFarmer);
//     const input = inputTypes.find((i) => i.id === selectedInput);

//     Alert.alert(
//       "Request Submitted",
//       `Request for ${quantity}${unit} of ${input?.name} for ${farmer?.name} has been submitted`,
//       [
//         {
//           text: "OK",
//           onPress: () => router.back(),
//         },
//       ]
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Header
//         title="Request Farm Inputs"
//         rightAction={
//           <TouchableOpacity
//             style={styles.addButton}
//             onPress={() => router.push("/extension-agent/home/inputs")}
//           >
//             <Ionicons name="arrow-back" size={24} color={colors.dark} />
//           </TouchableOpacity>
//         }
//       />

//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <Text style={styles.sectionTitle}>Farmer Information</Text>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Select Farmer</Text>
//           <View style={styles.pickerContainer}>
//             <Picker
//               selectedValue={selectedFarmer}
//               onValueChange={(itemValue) => setSelectedFarmer(itemValue)}
//               style={styles.picker}
//               dropdownIconColor={colors.primary}
//             >
//               <Picker.Item label="Select a farmer..." value="" />
//               {farmersList.map((farmer) => (
//                 <Picker.Item
//                   key={farmer.id}
//                   label={farmer.name}
//                   value={farmer.id}
//                 />
//               ))}
//             </Picker>
//           </View>
//         </View>

//         <Text style={styles.sectionTitle}>Input Details</Text>
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Input Type</Text>
//           <View style={styles.pickerContainer}>
//             <Picker
//               selectedValue={selectedInput}
//               onValueChange={(itemValue) => setSelectedInput(itemValue)}
//               style={styles.picker}
//               dropdownIconColor={colors.primary}
//             >
//               <Picker.Item label="Select input type..." value="" />
//               {inputTypes.map((input) => (
//                 <Picker.Item
//                   key={input.id}
//                   label={`${input.name} (${input.unit})`}
//                   value={input.id}
//                 />
//               ))}
//             </Picker>
//           </View>
//         </View>

//         <View style={styles.inputRow}>
//           <View style={[styles.inputContainer, { flex: 1 }]}>
//             <Text style={styles.label}>Quantity</Text>
//             <View style={styles.quantityInput}>
//               <TextInput
//                 style={styles.input}
//                 keyboardType="numeric"
//                 value={quantity}
//                 onChangeText={setQuantity}
//                 placeholder="0"
//               />
//               {unit && <Text style={styles.unit}>{unit}</Text>}
//             </View>
//           </View>

//           <View style={[styles.inputContainer, { flex: 1 }]}>
//             <Text style={styles.label}>Urgency</Text>
//             <View style={styles.pickerContainer}>
//               <Picker
//                 selectedValue={urgency}
//                 onValueChange={(itemValue) => setUrgency(itemValue)}
//                 style={styles.picker}
//                 dropdownIconColor={colors.primary}
//               >
//                 <Picker.Item label="Normal" value="normal" />
//                 <Picker.Item label="High" value="high" />
//                 <Picker.Item label="Urgent" value="urgent" />
//               </Picker>
//             </View>
//           </View>
//         </View>

//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Additional Notes</Text>
//           <TextInput
//             style={[styles.input, styles.multilineInput]}
//             multiline
//             numberOfLines={4}
//             value={notes}
//             onChangeText={setNotes}
//             placeholder="Any special instructions or details..."
//           />
//         </View>

//         <TouchableOpacity
//           style={[
//             styles.submitButton,
//             (!selectedFarmer || !selectedInput || !quantity) &&
//               styles.disabledButton,
//           ]}
//           onPress={handleSubmit}
//           disabled={!selectedFarmer || !selectedInput || !quantity}
//         >
//           <MaterialCommunityIcons name="send" size={20} color={colors.white} />
//           <Text style={styles.submitButtonText}>Submit Request</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// }

// const colors = {
//   primary: "#3A7D44", // Earthy green - represents agriculture
//   primaryLight: "#E8F5E9",
//   primaryDark: "#2B5E35",
//   secondary: "#FF9E1B", // Amber for important actions
//   background: "#F8FAF8", // Very light green tint
//   white: "#FFFFFF",
//   cardBg: "#FFFFFF",
//   textPrimary: "#263238", // Dark blue-gray
//   textSecondary: "#455A64",
//   textTertiary: "#718096",
//   border: "#E2E8F0",
//   success: "#388E3C",
//   warning: "#F57C00",
//   error: "#D32F2F",
//   urgencyNormal: "#3182CE",
//   urgencyHigh: "#DD6B20",
//   urgencyCritical: "#E53E3E",
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   scrollContainer: {
//     paddingHorizontal: 20,
//     paddingTop: 16,
//     paddingBottom: 40,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     //fontFamily: "Inter-SemiBold",
//     // color: colors.textPrimary,
//     marginBottom: 16,
//     letterSpacing: -0.2,
//   },
//   inputContainer: {
//     marginBottom: 24,
//   },
//   inputRow: {
//     flexDirection: "row",
//     gap: 16,
//   },
//   labelContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   label: {
//     fontSize: 14,
//     //fontFamily: "Inter-Medium",
//     // color: colors.textSecondary,
//     marginRight: 4,
//   },
//   requiredIndicator: {
//     color: colors.error,
//   },
//   pickerContainer: {
//     backgroundColor: colors.white,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: colors.border,
//     overflow: "hidden",
//     elevation: 1,
//     shadowColor: colors.textPrimary,
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//   },
//   picker: {
//     height: 56,
//     width: "100%",
//     color: colors.textPrimary,
//   },
//   quantityInput: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: colors.white,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: colors.border,
//     paddingHorizontal: 16,
//     elevation: 1,
//   },
//   input: {
//     flex: 1,
//     paddingVertical: 14,
//     fontSize: 16,
//     //fontFamily: "Inter-Regular",
//     color: colors.textPrimary,
//   },
//   unit: {
//     fontSize: 14,
//     //fontFamily: "Inter-Medium",
//     color: colors.textTertiary,
//     marginLeft: 8,
//   },
//   multilineInput: {
//     minHeight: 120,
//     textAlignVertical: "top",
//     backgroundColor: colors.white,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: colors.border,
//     padding: 16,
//     fontSize: 16,
//     //fontFamily: "Inter-Regular",
//     color: colors.textPrimary,
//     elevation: 1,
//   },
//   submitButton: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: colors.primary,
//     paddingVertical: 16,
//     paddingHorizontal: 24,
//     borderRadius: 12,
//     marginTop: 32,
//     elevation: 3,
//     shadowColor: colors.primaryDark,
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//   },
//   submitButtonText: {
//     color: colors.white,
//     fontSize: 16,
//     //fontFamily: "Inter-SemiBold",
//     marginLeft: 8,
//   },
//   disabledButton: {
//     backgroundColor: colors.disabled,
//     shadowOpacity: 0,
//   },
//   urgencyTag: {
//     position: "absolute",
//     right: 16,
//     top: 14,
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 4,
//   },
//   urgencyTagText: {
//     fontSize: 12,
//     //fontFamily: "Inter-SemiBold",
//     color: colors.white,
//     textTransform: "uppercase",
//   },
// });

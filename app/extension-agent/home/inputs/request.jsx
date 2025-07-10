import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../../../components/agent-components/Header";
//import { colors } from "../../../../components/agent-components/constants/colors";

// Mock data - replace with your actual data sourcec
const inputTypes = [
  { id: "1", name: "Fertilizer", unit: "kg" },
  { id: "2", name: "Seeds/Seedling", unit: "kg" },
];

const farmersList = [
  { id: "1", name: "Kwame Yeboah" },
  { id: "2", name: "Adwoa Mensah" },
  { id: "3", name: "Kofi Asante" },
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

  // Set default farmer if coming from farmer details
  useEffect(() => {
    if (params.farmerId) {
      setSelectedFarmer(params.farmerId);
    }
  }, [params.farmerId]);

  // Update unit when input type changes
  useEffect(() => {
    if (selectedInput) {
      const input = inputTypes.find((item) => item.id === selectedInput);
      setUnit(input?.unit || "");
    } else {
      setUnit("");
    }
  }, [selectedInput]);

  const handleSubmit = () => {
    if (!selectedFarmer || !selectedInput || !quantity) {
      Alert.alert(
        "Missing Information",
        "Please select a farmer, input type, and quantity"
      );
      return;
    }

    // In a real app, you would submit to your backend here
    const farmer = farmersList.find((f) => f.id === selectedFarmer);
    const input = inputTypes.find((i) => i.id === selectedInput);

    Alert.alert(
      "Request Submitted",
      `Request for ${quantity}${unit} of ${input?.name} for ${farmer?.name} has been submitted`,
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]
    );
  };

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
                  label={farmer.name}
                  value={farmer.id}
                />
              ))}
            </Picker>
          </View>
        </View>

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
              {unit && <Text style={styles.unit}>{unit}</Text>}
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
            (!selectedFarmer || !selectedInput || !quantity) &&
              styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={!selectedFarmer || !selectedInput || !quantity}
        >
          <MaterialCommunityIcons name="send" size={20} color={colors.white} />
          <Text style={styles.submitButtonText}>Submit Request</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}


const colors = {
  primary: "#3A7D44", // Earthy green - represents agriculture
  primaryLight: "#E8F5E9",
  primaryDark: "#2B5E35",
  secondary: "#FF9E1B", // Amber for important actions
  background: "#F8FAF8", // Very light green tint
  white: "#FFFFFF",
  cardBg: "#FFFFFF",
  textPrimary: "#263238", // Dark blue-gray
  textSecondary: "#455A64",
  textTertiary: "#718096",
  border: "#E2E8F0",
  success: "#388E3C",
  warning: "#F57C00",
  error: "#D32F2F",
  urgencyNormal: "#3182CE",
  urgencyHigh: "#DD6B20",
  urgencyCritical: "#E53E3E",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    //fontFamily: "Inter-SemiBold",
    // color: colors.textPrimary,
    marginBottom: 16,
    letterSpacing: -0.2,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: "row",
    gap: 16,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    //fontFamily: "Inter-Medium",
    // color: colors.textSecondary,
    marginRight: 4,
  },
  requiredIndicator: {
    color: colors.error,
  },
  pickerContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    elevation: 1,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  picker: {
    height: 56,
    width: "100%",
    color: colors.textPrimary,
  },
  quantityInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    elevation: 1,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    //fontFamily: "Inter-Regular",
    color: colors.textPrimary,
  },
  unit: {
    fontSize: 14,
    //fontFamily: "Inter-Medium",
    color: colors.textTertiary,
    marginLeft: 8,
  },
  multilineInput: {
    minHeight: 120,
    textAlignVertical: "top",
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    fontSize: 16,
    //fontFamily: "Inter-Regular",
    color: colors.textPrimary,
    elevation: 1,
  },
  submitButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 32,
    elevation: 3,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    //fontFamily: "Inter-SemiBold",
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: colors.disabled,
    shadowOpacity: 0,
  },
  urgencyTag: {
    position: "absolute",
    right: 16,
    top: 14,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  urgencyTagText: {
    fontSize: 12,
    //fontFamily: "Inter-SemiBold",
    color: colors.white,
    textTransform: "uppercase",
  },
});

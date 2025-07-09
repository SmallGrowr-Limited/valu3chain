import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Picker,
  Image,
} from "react-native";
//import { Colors } from "../../components/constants/colors";
import {
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const investments = [
  {
    id: "1",
    type: "Farm Inputs",
    title: "Premium Hybrid Maize Seeds",
    description:
      "High-yield hybrid maize seeds with 95% germination rate and drought resistance",
    eligibility:
      "Minimum investment: ₦500,000\nFarm size: 5+ hectares\nLocation: Northern regions",
    availability: { start: "2023-09-01", end: "2023-11-15" },
    roi: "18-25%",
    duration: "6 months",
    risk: "Medium",
    image: require("../../assets/images/maize.jpeg"),
    category: "seeds",
  },
  {
    id: "2",
    type: "Equipment",
    title: "Tractor Lease Program",
    description:
      "Modern tractors available for seasonal lease with operator and maintenance included",
    eligibility: "Minimum investment: ₦1,200,000\nFarm cooperatives preferred",
    availability: { start: "2023-08-15", end: "2024-02-28" },
    roi: "12-15%",
    duration: "12 months",
    risk: "Low",
    image: require("../../assets/images/tractor.jpeg"),
    category: "equipment",
  },
  {
    id: "3",
    type: "Funding",
    title: "Cassava Processing Facility",
    description:
      "Equity investment in modern cassava processing plant serving 200 smallholder farmers",
    eligibility: "Minimum investment: ₦2,500,000\nAccredited investors only",
    availability: { start: "2023-10-01", end: "2023-12-31" },
    roi: "22-30%",
    duration: "18 months",
    risk: "High",
    image: require("../../assets/images/cassava.jpg"),
    category: "funding",
  },
  {
    id: "4",
    type: "Farm Inputs",
    title: "Organic Fertilizer Package",
    description: "Premium organic fertilizer tailored for vegetable production",
    eligibility:
      "Minimum investment: ₦750,000\nMust commit to organic practices",
    availability: { start: "2023-09-15", end: "2024-01-15" },
    roi: "15-20%",
    duration: "8 months",
    risk: "Medium",
    image: require("../../assets/images/fertilizer.jpg"),
    category: "inputs",
  },
]

const Investment = ({ navigation }) => {
  const [investmentType, setInvestmentType] = useState("home");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 6)),
    showStartDatePicker: false,
    showEndDatePicker: false,
    // Farm Input specific
    inputType: "seeds",
    quantity: "",
    unit: "kg",
    farmerType: "",
    targetCrops: "",
    // Equipment specific
    equipmentType: "tractor",
    duration: "",
    // Funding specific
    projectId: "",
    minAmount: "5,000,000",
  });

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (event, selectedDate, field) => {
    const currentDate = selectedDate || formData[field];
    setFormData({
      ...formData,
      [field]: currentDate,
      [`show${field.charAt(0).toUpperCase() + field.slice(1)}Picker`]: false,
    });
  };

  const handleSubmit = () => {
    // Process form data based on investment type
    const investmentData = {
      type: investmentType,
      title: formData.title,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate,
      amount: formData.amount,
      ...(investmentType === "farm_input" && {
        inputType: formData.inputType,
        quantity: formData.quantity,
        unit: formData.unit,
        farmerType: formData.farmerType,
        targetCrops: formData.targetCrops,
      }),
      ...(investmentType === "equipment" && {
        equipmentType: formData.equipmentType,
        duration: formData.duration,
      }),
      ...(investmentType === "funding" && {
        projectId: formData.projectId,
        minAmount: formData.minAmount,
      }),
    };

    console.log("Investment Submitted:", investmentData);
    navigation.goBack();
  };

  const renderFarmInputFields = () => (
    <>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Input Type</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.inputType}
            onValueChange={(value) => handleChange("inputType", value)}
            style={styles.picker}
          >
            <Picker.Item label="Seeds" value="seeds" />
            <Picker.Item label="Fertilizer" value="fertilizer" />
            <Picker.Item label="Pesticides" value="pesticides" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputRow}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={formData.quantity}
            onChangeText={(text) => handleChange("quantity", text)}
            placeholder="Enter quantity"
          />
        </View>

        <View style={[styles.inputGroup, { flex: 1 }]}>
          <Text style={styles.label}>Unit</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.unit}
              onValueChange={(value) => handleChange("unit", value)}
              style={styles.picker}
            >
              <Picker.Item label="kg" value="kg" />
              <Picker.Item label="liters" value="liters" />
              <Picker.Item label="bags" value="bags" />
              <Picker.Item label="units" value="units" />
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Type of farmers</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.farmerType}
            onValueChange={(value) => handleChange("farmerType", value)}
            style={styles.picker}
          >
            <Picker.Item label="Any" value="Any" />
            <Picker.Item label="Female Farmers" value="Female" />
            <Picker.Item label="Male Farmers" value="Male" />
            <Picker.Item
              label="Farmers with Disability"
              value="Farmers with Disability"
            />
          </Picker>
        </View>
      </View>

      {formData.inputType === "seeds" && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Target Crops</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.targetCrops}
              onValueChange={(value) => handleChange("targetCrops", value)}
              style={styles.picker}
            >
              <Picker.Item label="Any" value="Any" />
              <Picker.Item label="Grains" value="Grains" />
              <Picker.Item label="Vegitables" value="Vegitables" />
            </Picker>
          </View>
        </View>
      )}
    </>
  );

  const renderEquipmentFields = () => (
    <>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Equipment Type</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.equipmentType}
            onValueChange={(value) => handleChange("equipmentType", value)}
            style={styles.picker}
          >
            <Picker.Item label="Tractor" value="tractor" />
            <Picker.Item label="Harvester" value="harvester" />
            <Picker.Item label="Irrigation System" value="irrigation_system" />
            <Picker.Item
              label="Processing Equipment"
              value="processing_equipment"
            />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Duration (months)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formData.duration}
          onChangeText={(text) => handleChange("duration", text)}
          placeholder="Enter duration in months"
          placeholderTextColor="#aaa"
        />
      </View>
    </>
  );

  const renderFundingFields = () => (
    <>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Amount to Invest (₦)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formData.amount}
          onChangeText={(text) => handleChange("amount", text)}
          placeholder="Enter amount"
          placeholderTextColor="#aaa"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Project ID</Text>
        <TextInput
          style={styles.input}
          value={formData.projectId}
          onChangeText={(text) => handleChange("projectId", text)}
          placeholder="Enter project ID"
          placeholderTextColor="#aaa"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Minimum Investment (₦)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={formData.minAmount}
          onChangeText={(text) => handleChange("minAmount", text)}
          placeholder="Enter minimum amount"
          placeholderTextColor="#aaa"
        />
      </View>
    </>
  );

  const renderInvestmentOpportunity = ()=>{
    return (
      <View>
        {/* Investment Opportunities */}
        <ScrollView style={styles.investmentContainer}>
          {investments.map((investment) => (
            <TouchableOpacity
              key={investment.id}
              style={styles.investmentCard}
              
              // onPress={() => router.push(`/investments/${investment.id}`)}
            >
              <Image source={investment.image} style={styles.investmentImage} />

              <View style={styles.investmentContent}>
                <View style={styles.investmentHeader}>
                  {/* {getTypeIcon(investment.type)} */}
                  <Text style={styles.investmentType}>{investment.type}</Text>
                  <View
                    style={[
                      styles.roiPill,
                      investment.risk === "High"
                        ? styles.highRisk
                        : investment.risk === "Medium"
                          ? styles.mediumRisk
                          : styles.lowRisk,
                    ]}
                  >
                    <Text style={styles.roiText}>{investment.roi} ROI</Text>
                  </View>
                </View>

                <Text style={styles.investmentTitle}>{investment.title}</Text>

                <Text style={styles.investmentDescription} numberOfLines={2}>
                  {investment.description}
                </Text>

                <View style={styles.detailRow}>
                  <MaterialIcons
                    name="calendar-today"
                    size={16}
                    color={Colors.secondaryText}
                  />
                  <Text style={styles.detailText}>
                    {formatDate(investment.availability.start)} -{" "}
                    {formatDate(investment.availability.end)}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <MaterialCommunityIcons
                    name="clock-outline"
                    size={16}
                    color={Colors.secondaryText}
                  />
                  <Text style={styles.detailText}>{investment.duration}</Text>
                </View>

                <View style={styles.detailRow}>
                  <MaterialIcons
                    name="assessment"
                    size={16}
                    color={Colors.secondaryText}
                  />
                  <Text style={styles.detailText}>Risk: {investment.risk}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setInvestmentType("home")}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Investment</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.formContainer}>
        {/* Investment Type Selection */}
        <View style={styles.inputGroup}>
          {/* <Text style={styles.label}>Investment Type</Text> */}
          <View style={styles.typeButtons}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                investmentType === "farm_input" && styles.activeTypeButton,
              ]}
              onPress={() => setInvestmentType("farm_input")}
            >
              <MaterialIcons
                name="grass"
                size={20}
                color={
                  investmentType === "farm_input"
                    ? Colors.textOnPrimary
                    : Colors.primary
                }
              />
              <Text
                style={[
                  styles.typeButtonText,
                  investmentType === "farm_input" &&
                    styles.activeTypeButtonText,
                ]}
              >
                Farm Inputs
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={[
                styles.typeButton,
                investmentType === "equipment" && styles.activeTypeButton,
              ]}
              onPress={() => setInvestmentType("equipment")}
            >
              <FontAwesome
                name="gears"
                size={20}
                color={
                  investmentType === "equipment"
                    ? Colors.textOnPrimary
                    : Colors.primary
                }
              />
              <Text
                style={[
                  styles.typeButtonText,
                  investmentType === "equipment" && styles.activeTypeButtonText,
                ]}
              >
                Equipment
              </Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              style={[
                styles.typeButton,
                investmentType === "funding" && styles.activeTypeButton,
              ]}
              onPress={() => setInvestmentType("funding")}
            >
              <MaterialCommunityIcons
                name="hand-coin"
                size={20}
                color={
                  investmentType === "funding"
                    ? Colors.textOnPrimary
                    : Colors.primary
                }
              />
              <Text
                style={[
                  styles.typeButtonText,
                  investmentType === "funding" && styles.activeTypeButtonText,
                ]}
              >
                Funding
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {investmentType === "home" ? (
          renderInvestmentOpportunity()
        ) : (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Investment Title</Text>
              <TextInput
                style={styles.input}
                value={formData.title}
                onChangeText={(text) => handleChange("title", text)}
                placeholder="e.g., “Tractor Loan for Maize Farmers - Bauchi”"
                placeholderTextColor="#aaa"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[
                  styles.input,
                  { height: 100, textAlignVertical: "top" },
                ]}
                multiline
                value={formData.description}
                onChangeText={(text) => handleChange("description", text)}
                placeholder="Detailed description of the investment"
                placeholderTextColor="#aaa"
              />
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Start Date</Text>
                <TouchableOpacity
                  style={styles.dateInput}
                  onPress={() => handleChange("showStartDatePicker", true)}
                >
                  <Text>{formData.startDate.toLocaleDateString()}</Text>
                  <MaterialIcons
                    name="calendar-today"
                    size={20}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
                {formData.showStartDatePicker && (
                  <DateTimePicker
                    value={formData.startDate}
                    mode="date"
                    display="default"
                    onChange={(e, d) => handleDateChange(e, d, "startDate")}
                  />
                )}
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>End Date</Text>
                <TouchableOpacity
                  style={styles.dateInput}
                  onPress={() => handleChange("showEndDatePicker", true)}
                >
                  <Text>{formData.endDate.toLocaleDateString()}</Text>
                  <MaterialIcons
                    name="calendar-today"
                    size={20}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
                {formData.showEndDatePicker && (
                  <DateTimePicker
                    value={formData.endDate}
                    mode="date"
                    display="default"
                    onChange={(e, d) => handleDateChange(e, d, "endDate")}
                    minimumDate={formData.startDate}
                  />
                )}
              </View>
            </View>

            {/* Dynamic Fields Based on Investment Type */}

            {investmentType === "farm_input" && renderFarmInputFields()}
            {investmentType === "equipment" && renderEquipmentFields()}
            {investmentType === "funding" && renderFundingFields()}

            {/* Amount Field (Common but required for funding) */}
            {investmentType !== "funding" && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Amount (₦)</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={formData.amount}
                  onChangeText={(text) => handleChange("amount", text)}
                  placeholder="Enter investment amount"
                />
              </View>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit Investment</Text>
            </TouchableOpacity>
          </>
        )}
        {/* Common Fields */}
      </View>
    </ScrollView>
  );
};

const Colors = {
  primary: "#2E7D32", // Deep green - represents growth and agriculture
  primaryLight: "#E8F5E9",
  primaryDark: "#1B5E20",
  secondary: "#FF8F00", // Amber - for attention and actions
  background: "#F8FAF8", // Very light green tint
  white: "#FFFFFF",
  cardBg: "#FFFFFF",
  textPrimary: "#263238", // Dark blue-gray
  textSecondary: "#455A64",
  textTertiary: "#718096",
  textOnPrimary: "#FFFFFF",
  border: "#CFD8DC",
  success: "#388E3C",
  warning: "#F57C00",
  error: "#D32F2F",
  disabled: "#B0BEC5",
  highlight: "#FFF9C4",
  surface: "#FFFFFF",
  lightGray: "#ECEFF1",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Inter-SemiBold",
    color: Colors.primary,
    letterSpacing: -0.3,
  },
  formContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: "row",
    gap: 16,
  },
  label: {
    fontSize: 15,
    fontFamily: "Inter-Medium",
    color: Colors.textPrimary,
    marginBottom: 12,
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
  dateInput: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 1,
  },
  typeButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  typeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 1,
  },
  activeTypeButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryDark,
    elevation: 2,
  },
  typeButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: Colors.textPrimary,
  },
  activeTypeButtonText: {
    color: Colors.textOnPrimary,
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
    color: Colors.textOnPrimary,
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
  },
  disabledButton: {
    opacity: 0.6,
    elevation: 0,
  },
  currencyInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  currencySymbol: {
    position: "absolute",
    left: 16,
    zIndex: 2,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: Colors.textSecondary,
  },
  currencyInputField: {
    paddingLeft: 40,
  },
  validationError: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: Colors.error,
    marginTop: 8,
  },
  investmentContainer: {
    flex: 1,
    marginBottom: 16,
  },
  investmentCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  investmentImage: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },
  investmentContent: {
    padding: 16,
  },
  investmentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  investmentType: {
    marginLeft: 8,
    color: Colors.primaryText,
    fontWeight: "600",
  },
  roiPill: {
    marginLeft: "auto",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  lowRisk: {
    backgroundColor: Colors.successLight,
  },
  mediumRisk: {
    backgroundColor: Colors.warningLight,
  },
  highRisk: {
    backgroundColor: Colors.dangerLight,
  },
  roiText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  investmentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primaryText,
    marginBottom: 8,
  },
  investmentDescription: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginBottom: 12,
    lineHeight: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.secondaryText,
  },
});



export default Investment;

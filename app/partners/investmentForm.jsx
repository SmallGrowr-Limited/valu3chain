import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Picker,
} from "react-native";
import { Colors } from "../../components/constants/colors";
import {
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const InvestmentForm = ({ navigation }) => {
  const [investmentType, setInvestmentType] = useState("farm_input");
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
    farmerType:"",
    targetCrops:"",
    // Equipment specific
    equipmentType: "tractor",
    duration: "",
    // Funding specific
    projectId: "",
    minAmount: "5,000,000",
  });

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

      {formData.inputType ===
        "seeds" && (
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Investment</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.formContainer}>
        {/* Investment Type Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Investment Type</Text>
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

            <TouchableOpacity
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
            </TouchableOpacity>

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

        {/* Common Fields */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={formData.title}
            onChangeText={(text) => handleChange("title", text)}
            placeholder="Investment title"
            placeholderTextColor="#aaa"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, { height: 100, textAlignVertical: "top" }]}
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
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Investment</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primaryText,
  },
  formContainer: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 14,
    color: Colors.primaryText,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.primaryText,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  dateInput: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  typeButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  typeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
  },
  activeTypeButton: {
    backgroundColor: Colors.primary,
  },
  typeButtonText: {
    marginLeft: 8,
    color: Colors.primaryText,
  },
  activeTypeButtonText: {
    color: Colors.textOnPrimary,
  },
  pickerContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
    color: Colors.primaryText,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 24,
  },
  submitButtonText: {
    color: Colors.textOnPrimary,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default InvestmentForm;

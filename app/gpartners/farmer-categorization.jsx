import { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  Button,
  Checkbox,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import InputField from "../../components/gpartners/InputField";

const demographicOptions = {
  gender: ["Male", "Female", "Other"],
  disability: ["Yes", "No"],
  ageGroup: ["Youth (<35)", "Middle-aged", "Senior"],
  experience: ["New/Emerging", "Experienced"],
  farmType: ["Smallholder", "Commercial", "Cooperative"],
};

export default function FarmerCategorization() {
  const { colors } = useTheme();
  const [farmer, setFarmer] = useState({
    id: "",
    name: "",
    phone: "",
    address: "",
    location: "",
    farmSize: "",
    crops: "",
    demographics: {
      gender: "",
      disability: "No",
      ageGroup: "",
      experience: "",
      farmType: "",
    },
  });

  const handleInputChange = (field, value) => {
    setFarmer((prev) => ({ ...prev, [field]: value }));
  };

  const handleDemographicChange = (category, value) => {
    setFarmer((prev) => ({
      ...prev,
      demographics: { ...prev.demographics, [category]: value },
    }));
  };

  const handleSave = () => {
    console.log(farmer);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text
        variant="headlineSmall"
        style={[styles.sectionTitle, { color: colors.primary }]}
      >
        Farmer Registration/Profiling
      </Text>

      <InputField
        label="Farmer ID"
        value={farmer.id}
        onChangeText={(value) => handleInputChange("id", value)}
      />
      <InputField
        label="Full Name"
        value={farmer.name}
        onChangeText={(value) => handleInputChange("name", value)}
      />
      <InputField
        label="Phone Number"
        value={farmer.phone}
        onChangeText={(value) => handleInputChange("phone", value)}
        keyboardType="phone-pad"
      />
      <InputField
        label="Address"
        value={farmer.address}
        onChangeText={(value) => handleInputChange("address", value)}
        multiline
      />
      <InputField
        label="Farm Location"
        value={farmer.location}
        onChangeText={(value) => handleInputChange("location", value)}
      />
      <InputField
        label="Farm Size (acres)"
        value={farmer.farmSize}
        onChangeText={(value) => handleInputChange("farmSize", value)}
        keyboardType="numeric"
      />
      <InputField
        label="Crops Cultivated"
        value={farmer.crops}
        onChangeText={(value) => handleInputChange("crops", value)}
        placeholder="Comma separated list"
      />

      <Text
        variant="titleMedium"
        style={[styles.subsectionTitle, { color: colors.primary }]}
      >
        Demographic Categories
      </Text>

      {Object.entries(demographicOptions).map(([category, options]) => (
        <View key={category} style={styles.demographicSection}>
          <Text variant="labelLarge" style={styles.demographicLabel}>
            {category.charAt(0).toUpperCase() + category.slice(1)}:
          </Text>
          <View style={styles.optionsContainer}>
            {options.map((option) => (
              <View key={option} style={styles.optionRow}>
                <Checkbox
                  status={
                    farmer.demographics[category] === option
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => handleDemographicChange(category, option)}
                />
                <Text>{option}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}

      <Button
        mode="contained"
        onPress={handleSave}
        style={[styles.button, { backgroundColor: colors.primary }]}
        labelStyle={styles.buttonLabel}
      >
        Save Farmer Profile
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    marginBottom: 24,
    fontWeight: "bold",
  },
  subsectionTitle: {
    marginTop: 16,
    marginBottom: 12,
    fontWeight: "bold",
  },
  demographicSection: {
    marginBottom: 16,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    elevation: 2,
  },
  demographicLabel: {
    marginBottom: 8,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    marginBottom: 4,
  },
  button: {
    marginTop: 24,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
  },
});

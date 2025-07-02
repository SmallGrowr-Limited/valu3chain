import { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Button, Divider, Text, TextInput, useTheme } from "react-native-paper";
import FarmerCard from "../../components/gpartners/FarmerCard";
import InputField from "../../components/gpartners/InputField";

// Mock data - in a real app, this would come from your state or API
const mockFarmers = [
  {
    id: "F001",
    name: "John Doe",
    location: "Ogun State",
    farmSize: "5 acres",
    crops: "Maize, Cassava",
    demographics: {
      gender: "Male",
      ageGroup: "Middle-aged",
      experience: "Experienced",
    },
  },
  {
    id: "F002",
    name: "Amina Musa",
    location: "Kano State",
    farmSize: "3 acres",
    crops: "Rice, Sorghum",
    demographics: {
      gender: "Female",
      ageGroup: "Youth (<35)",
      experience: "New/Emerging",
    },
  },
  {
    id: "F003",
    name: "Chukwu Emeka",
    location: "Enugu State",
    farmSize: "8 acres",
    crops: "Yam, Cassava",
    demographics: {
      gender: "Male",
      ageGroup: "Senior",
      experience: "Experienced",
    },
  },
];

const categories = [
  "Seeds/Seedlings",
  "Fertilizers",
  "Pesticides/Herbicides",
  "Equipment Rental",
  "Labor",
  "Irrigation",
  "Transportation",
  "Processing",
  "Miscellaneous",
];

export default function FundDisbursement() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [disbursements, setDisbursements] = useState([]);
  const [currentDisbursement, setCurrentDisbursement] = useState({
    category: "",
    amount: "",
    method: "Bank Transfer",
    date: new Date().toISOString().split("T")[0],
  });

  const handleFarmerSelect = (farmer) => {
    setSelectedFarmer(farmer);
    setCurrentDisbursement((prev) => ({
      ...prev,
      farmerId: farmer.id,
      farmerName: farmer.name,
    }));
  };

  const handleDisbursementChange = (field, value) => {
    setCurrentDisbursement((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddDisbursement = () => {
    if (!currentDisbursement.category || !currentDisbursement.amount) return;

    const newDisbursement = {
      ...currentDisbursement,
      id: Date.now().toString(),
    };

    setDisbursements((prev) => [...prev, newDisbursement]);
    setCurrentDisbursement({
      category: "",
      amount: "",
      method: "Bank Transfer",
      date: new Date().toISOString().split("T")[0],
      farmerId: selectedFarmer?.id,
      farmerName: selectedFarmer?.name,
    });
  };

  const filteredFarmers = mockFarmers.filter(
    (farmer) =>
      farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text
        variant="headlineSmall"
        style={[styles.sectionTitle, { color: colors.primary }]}
      >
        Farmer-Specific Fund Disbursement
      </Text>

      <InputField
        label="Search Farmers"
        value={searchQuery}
        onChangeText={setSearchQuery}
        left={<TextInput.Icon icon="magnify" />}
      />

      <Text variant="titleMedium" style={styles.subsectionTitle}>
        Select Farmer
      </Text>

      <View style={styles.farmersContainer}>
        {filteredFarmers.map((farmer) => (
          <FarmerCard
            key={farmer.id}
            farmer={farmer}
            onPress={() => handleFarmerSelect(farmer)}
            isSelected={selectedFarmer?.id === farmer.id}
          />
        ))}
      </View>

      {selectedFarmer && (
        <>
          <Divider style={styles.divider} />

          <Text variant="titleMedium" style={styles.subsectionTitle}>
            Disburse Funds to {selectedFarmer.name}
          </Text>

          <InputField
            label="Category"
            value={currentDisbursement.category}
            onChangeText={(value) =>
              handleDisbursementChange("category", value)
            }
            select
            selectOptions={categories.map((cat) => ({
              label: cat,
              value: cat,
            }))}
          />

          <InputField
            label="Amount (NGN)"
            value={currentDisbursement.amount}
            onChangeText={(value) => handleDisbursementChange("amount", value)}
            keyboardType="numeric"
            left={<TextInput.Affix text="₦" />}
          />

          <InputField
            label="Disbursement Method"
            value={currentDisbursement.method}
            onChangeText={(value) => handleDisbursementChange("method", value)}
            select
            selectOptions={[
              { label: "Bank Transfer", value: "Bank Transfer" },
              { label: "Mobile Money", value: "Mobile Money" },
              { label: "In-kind Provision", value: "In-kind Provision" },
            ]}
          />

          <InputField
            label="Disbursement Date"
            value={currentDisbursement.date}
            onChangeText={(value) => handleDisbursementChange("date", value)}
            placeholder="YYYY-MM-DD"
          />

          <Button
            mode="contained"
            onPress={handleAddDisbursement}
            style={[styles.addButton, { backgroundColor: colors.primary }]}
            labelStyle={styles.buttonLabel}
            disabled={
              !currentDisbursement.category || !currentDisbursement.amount
            }
          >
            Add Disbursement
          </Button>

          {disbursements.filter((d) => d.farmerId === selectedFarmer.id)
            .length > 0 && (
            <>
              <Text
                variant="titleMedium"
                style={[styles.subsectionTitle, { marginTop: 24 }]}
              >
                Current Disbursements
              </Text>

              <View style={styles.disbursementsList}>
                {disbursements
                  .filter((d) => d.farmerId === selectedFarmer.id)
                  .map((disbursement, index) => (
                    <View key={disbursement.id} style={styles.disbursementItem}>
                      <Text variant="bodyMedium">
                        {disbursement.category}: ₦{disbursement.amount}
                      </Text>
                      <Text
                        variant="bodySmall"
                        style={styles.disbursementDetails}
                      >
                        {disbursement.method} • {disbursement.date}
                      </Text>
                      {index < disbursements.length - 1 && <Divider />}
                    </View>
                  ))}
              </View>
            </>
          )}
        </>
      )}

      <Button
        mode="contained"
        onPress={() => console.log("Save disbursements", disbursements)}
        style={[styles.saveButton, { backgroundColor: colors.primary }]}
        labelStyle={styles.buttonLabel}
        disabled={disbursements.length === 0}
      >
        Save All Disbursements
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
    marginVertical: 16,
    fontWeight: "bold",
  },
  farmersContainer: {
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
  addButton: {
    marginTop: 16,
    paddingVertical: 8,
  },
  saveButton: {
    marginTop: 32,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
  },
  disbursementsList: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    elevation: 2,
  },
  disbursementItem: {
    paddingVertical: 12,
  },
  disbursementDetails: {
    color: "#666",
    marginTop: 4,
  },
});

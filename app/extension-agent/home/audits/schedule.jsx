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
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../../../components/agent-components/Header";
import { colors } from "../../../../components/agent-components/constants/colors";

// Mock data - replace with your actual data source
const farmersList = [
  {
    id: "1",
    name: "Kwame Yeboah",
    farms: ["Yeboah Main Farm", "Yeboah Vegetable Farm"],
  },
  { id: "2", name: "Adwoa Mensah", farms: ["Mensah Vegetable Farm"] },
  { id: "3", name: "Kofi Asante", farms: ["Asante Maize Farm"] },
];

export default function ScheduleAudit() {
  const router = useRouter();
  const [selectedFarmer, setSelectedFarmer] = useState("");
  const [selectedFarm, setSelectedFarm] = useState("");
  const [auditDate, setAuditDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [notes, setNotes] = useState("");
  const [farms, setFarms] = useState([]);

  // Update farms list when farmer changes
  useEffect(() => {
    if (selectedFarmer) {
      const farmer = farmersList.find((f) => f.id === selectedFarmer);
      setFarms(farmer?.farms || []);
      setSelectedFarm("");
    } else {
      setFarms([]);
      setSelectedFarm("");
    }
  }, [selectedFarmer]);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setAuditDate(selectedDate);
    }
  };

  const handleSubmit = () => {
    if (!selectedFarmer || !selectedFarm || !auditDate) {
      Alert.alert(
        "Missing Information",
        "Please select a farmer, farm, and audit date"
      );
      return;
    }

    const farmer = farmersList.find((f) => f.id === selectedFarmer);

    Alert.alert(
      "Audit Scheduled",
      `Audit for ${selectedFarm} (${
        farmer?.name
      }) scheduled for ${auditDate.toDateString()}`,
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]
    );

    // In a real app, you would submit to your backend here
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <View style={styles.container}>
      <Header title="Schedule New Audit" showBackButton />

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

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Farm</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedFarm}
              onValueChange={(itemValue) => setSelectedFarm(itemValue)}
              style={styles.picker}
              dropdownIconColor={colors.primary}
              enabled={farms.length > 0}
            >
              <Picker.Item
                label={farms.length ? "Select a farm..." : "No farms available"}
                value=""
              />
              {farms.map((farm) => (
                <Picker.Item key={farm} label={farm} value={farm} />
              ))}
            </Picker>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Audit Details</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Audit Date</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar" size={20} color={colors.primary} />
            <Text style={styles.dateText}>{formatDate(auditDate)}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={auditDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Notes (Optional)</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            multiline
            numberOfLines={4}
            value={notes}
            onChangeText={setNotes}
            placeholder="Any special instructions or focus areas for this audit..."
          />
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            (!selectedFarmer || !selectedFarm) && styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={!selectedFarmer || !selectedFarm}
        >
          <MaterialCommunityIcons
            name="calendar-check"
            size={20}
            color={colors.white}
          />
          <Text style={styles.submitButtonText}>Schedule Audit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark,
    marginTop: 8,
    marginBottom: 12,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    overflow: "hidden",
  },
  picker: {
    width: "100%",
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    padding: 12,
    gap: 8,
  },
  dateText: {
    fontSize: 16,
    color: colors.dark,
  },
  input: {
    paddingVertical: 12,
    fontSize: 16,
    color: colors.dark,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    padding: 12,
  },
  submitButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    gap: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});

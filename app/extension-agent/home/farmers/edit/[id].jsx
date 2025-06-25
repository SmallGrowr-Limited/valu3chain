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
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import Header from "../../../../../components/agent-components/Header";
import { colors } from "../../../../../components/agent-components/constants/colors";

// Mock data - replace with your actual data source
const farmerData = {
  id: "1",
  firstName: "Kwame",
  lastName: "Yeboah",
  phone: "+233 24 123 4567",
  email: "kwame.yeboah@example.com",
  location: "Kumasi",
  address: "123 Farm Road, Kumasi",
  farmSize: "5",
  mainCrops: "Maize, Cassava",
  farmingExperience: "10",
  status: "Active",
  farms: [
    { id: "1", name: "Yeboah Main Farm", size: "5 acres" },
    { id: "2", name: "Yeboah Vegetable Farm", size: "2 acres" },
  ],
};

export default function EditFarmer() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [formData, setFormData] = useState(farmerData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // In a real app, you would fetch farmer data based on the id
  useEffect(() => {
    // Fetch farmer data here
    // setFormData(fetchedData);
  }, [id]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.firstName || !formData.phone || !formData.location) {
      Alert.alert(
        "Required Fields",
        "Please fill in all required fields (Name, Phone, Location)"
      );
      return;
    }

    setIsSubmitting(true);

    // In a real app, you would submit to your backend here
    setTimeout(() => {
      Alert.alert(
        "Changes Saved",
        `${formData.firstName} ${formData.lastName}'s information has been updated`,
        [
          {
            text: "OK",
            onPress: () => router.push(`/farmers/${id}`),
          },
        ]
      );
      setIsSubmitting(false);
    }, 1500);
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to remove ${formData.firstName} ${formData.lastName}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // In a real app, you would delete from your backend here
            router.push("/farmers");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Edit Farmer"
        rightAction={
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => router.push("/extension-agent/home/farmers")}
          >
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <View style={styles.inputRow}>
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={styles.label}>First Name *</Text>
            <TextInput
              style={styles.input}
              value={formData.firstName}
              onChangeText={(text) => handleInputChange("firstName", text)}
              placeholder="John"
            />
          </View>

          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={formData.lastName}
              onChangeText={(text) => handleInputChange("lastName", text)}
              placeholder="Doe"
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(text) => handleInputChange("phone", text)}
              placeholder="+233 24 123 4567"
              keyboardType="phone-pad"
            />
          </View>

          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => handleInputChange("email", text)}
              placeholder="farmer@example.com"
              keyboardType="email-address"
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Location Information</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Location/Village *</Text>
          <TextInput
            style={styles.input}
            value={formData.location}
            onChangeText={(text) => handleInputChange("location", text)}
            placeholder="Enter village or town"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Address</Text>
          <TextInput
            style={styles.input}
            value={formData.address}
            onChangeText={(text) => handleInputChange("address", text)}
            placeholder="Detailed address including landmarks"
          />
        </View>

        <Text style={styles.sectionTitle}>Farming Information</Text>

        <View style={styles.inputRow}>
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={styles.label}>Farm Size (acres)</Text>
            <TextInput
              style={styles.input}
              value={formData.farmSize}
              onChangeText={(text) => handleInputChange("farmSize", text)}
              placeholder="5"
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={styles.label}>Years of Experience</Text>
            <TextInput
              style={styles.input}
              value={formData.farmingExperience}
              onChangeText={(text) =>
                handleInputChange("farmingExperience", text)
              }
              placeholder="10"
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Main Crops/Products</Text>
          <TextInput
            style={styles.input}
            value={formData.mainCrops}
            onChangeText={(text) => handleInputChange("mainCrops", text)}
            placeholder="Maize, Cassava, Vegetables"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Farms</Text>
          {formData.farms.map((farm) => (
            <TouchableOpacity
              key={farm.id}
              style={styles.farmItem}
              onPress={() => router.push(`/farms/edit/${farm.id}`)}
            >
              <Text style={styles.farmName}>{farm.name}</Text>
              <Text style={styles.farmSize}>{farm.size}</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.gray} />
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.addFarmButton}
            onPress={() => router.push(`/farms/add?farmerId=${id}`)}
          >
            <Ionicons name="add" size={20} color={colors.primary} />
            <Text style={styles.addFarmText}>Add New Farm</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <FontAwesome name="spinner" size={16} color={colors.white} />
            ) : (
              <MaterialIcons name="save" size={16} color={colors.white} />
            )}
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={handleDelete}
          >
            <MaterialIcons name="delete" size={16} color={colors.white} />
            <Text style={styles.buttonText}>Delete Farmer</Text>
          </TouchableOpacity>
        </View>
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
  inputRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 4,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    padding: 12,
    fontSize: 16,
  },
  section: {
    marginTop: 16,
  },
  farmItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    elevation: 1,
  },
  farmName: {
    flex: 1,
    fontSize: 14,
    color: colors.dark,
  },
  farmSize: {
    fontSize: 14,
    color: colors.gray,
    marginRight: 8,
  },
  addFarmButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    marginTop: 8,
  },
  addFarmText: {
    marginLeft: 8,
    color: colors.primary,
    fontWeight: "500",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 24,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  deleteButton: {
    backgroundColor: colors.danger,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});

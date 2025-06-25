import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import Header from "../../../../components/agent-components/Header";
import { colors } from "../../../../components/agent-components/constants/colors";

export default function AddFarmer() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    location: "",
    address: "",
    farmSize: "",
    mainCrops: "",
    farmingExperience: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        "Farmer Added",
        `${formData.firstName} ${formData.lastName} has been successfully registered`,
        [
          {
            text: "OK",
            onPress: () => router.push("/farmers"),
          },
        ]
      );
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Add New Farmer"
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

        <TouchableOpacity
          style={[
            styles.submitButton,
            isSubmitting && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <FontAwesome name="spinner" size={20} color={colors.white} />
          ) : (
            <MaterialIcons name="person-add" size={20} color={colors.white} />
          )}
          <Text style={styles.submitButtonText}>
            {isSubmitting ? "Registering..." : "Register Farmer"}
          </Text>
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
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});

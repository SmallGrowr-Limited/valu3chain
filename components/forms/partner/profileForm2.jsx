import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import { PARTNER_PROFILE } from "../../../graphql/mutations/partnerMutation.js";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";

export default function TermsOfService() {
  const router = useRouter();
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [formData, setFormData] = useState({
    businessRegistrationNumber: "",
    haveFarmersDirectory: "",
    termsOfServiceAgreement: "",
  });
  const id = useSelector((state) => state.auth.user.userId);
  const partnerData = useSelector((state) => state.partner.partnerData);
  const [registerPartner] = useMutation(PARTNER_PROFILE);

  const permit = [
    { key: "1", value: "Yes" },
    { key: "2", value: "No" },
  ];

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    try {
      const { data } = await registerPartner({
        variables: {
          input: {
            partnerId: id,
            businessName: partnerData.businessName,
            contactPersonName: partnerData.contactPersonName,
            email: partnerData.email,
            phoneNumber: partnerData.phoneNumber,
            businessAddress: partnerData.businessAddress,
            businessPermit: partnerData.businessPermit,
            statesOfOperation: partnerData.statesOfOperation,
            businessRegistrationNumber: formData.businessRegistrationNumber,
            haveFarmersDirectory: formData.haveFarmersDirectory,
            termsOfServiceAgreement: formData.termsOfServiceAgreement,
          },
        },
      });

      router.navigate("/partners");
    } catch (error) {
      console.log("signup Failed:", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.service}>
          <View style={styles.formInput}>
            <Text style={styles.formLabel}>Business Registration Number</Text>
            <TextInput
              style={styles.formControl}
              value={formData.businessRegistrationNumber}
              placeholder=""
              placeholderTextColor="#aaa"
              keyboardType="text"
              onChangeText={(val) =>
                handleChange("businessRegistrationNumber", val)
              }
            />
          </View>
          <View style={styles.formInput}>
            <Text style={styles.formLabel}>
              Do You Have a Farmers Directory?
            </Text>
            <SelectList
              setSelected={(val) => handleChange("haveFarmersDirectory", val)}
              data={permit}
              save="value"
            />
          </View>
          <Text style={styles.paragraph}>
            Are You Willing to Transparently Sync Your Directory with Our AI
            Model to Increase Opportunities for Your Farmers and Reduce the Risk
            of Doing Business with Them?
          </Text>

          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked1}
              onValueChange={setChecked1}
            />
            <Text style={styles.paragraph}>Yes</Text>
          </View>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked2}
              onValueChange={setChecked2}
              color={isChecked2 ? "#4630EB" : undefined}
            />
            <Text style={styles.paragraph}>No</Text>
          </View>
        </View>
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8f5e4",
  },
  content: {
    flex: 1,
    padding: 10,
    margin: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  service: { flex: 3, padding: 20 },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  paragraph: {
    fontSize: 18,
    lineHeight: 32,
  },
  checkbox: {
    margin: 8,
  },
  buttonSection: { flex: 1 },
  button: {
    marginTop: 30,
    backgroundColor: "#508060",
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 16,
  },

  formInput: { marginBottom: 15 },

  formControl: {
    borderColor: "#666",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#ffffff",
    height: 45,
  },

  formLabel: {
    marginBottom: 5,
    marginTop: 5,
    color: "#000",
  },
});

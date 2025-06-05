import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, {useState} from 'react';
import { SelectList } from "react-native-dropdown-select-list";
import { banks } from "../../../banks";
import { useRouter } from "expo-router";

export default function ProfileForm2() {
    const [loading, setLoading] = useState(false);
    const [showID, setShowID] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState({
      fullName: "",
      gender: "",
      dateOfBirth: "",
      email: "",
      role: "",
      phoneNumber: "",
      address: "",
      state: "",
      nationality: "",
      identification: "",
      profileImage: "",
      farmAddress: "",
      farmSize: "",
      cropType: "",
      bankName: "",
      accountNumber: "",
      agentId: "123",
    });

    const idcard = [
      { key: "1", value: "NIN" },
      { key: "2", value: "BVN" },
      { key: "3", value: "International Passport" },
    ];

    const handleIdSelection = (val) => {
      setIdentification(val);
      setShowID(true);
    };
    
  return (
    <View style={styles.formSection}>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Identification</Text>
        <SelectList
          setSelected={handleIdSelection}
          data={idcard}
          save="value"
          style={styles.formInput}
        />
      </View>
      {showID ? (
        <View style={styles.formInput}>
          <Text style={styles.formLabel}>ID Number</Text>
          <TextInput
            style={styles.formControl}
            placeholder=""
            keyboardType="text"
            onChangeText={(value) => setIdNumber(value)}
          />
        </View>
      ) : (
        ""
      )}
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Farm Size (in hectares)</Text>
        <TextInput
          style={styles.formControl}
          placeholder=""
          keyboardType="text"
          onChangeText={(farmSize) => setFarmSize(farmSize)}
        />
      </View>

      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Farm Address</Text>
        <TextInput
          style={styles.formControl}
          placeholder=""
          keyboardType="text"
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => setfarmAddress(value)}
        />
      </View>

      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Crops cultivated</Text>
        <TextInput
          style={styles.formControl}
          placeholder=""
          keyboardType="text"
          onChangeText={(value) => setCropType(value)}
        />
      </View>

      <Text style={styles.formLabel}>Bank Details</Text>

      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Bank</Text>
        <SelectList
          setSelected={(val) => setBankName(val)}
          data={banks}
          save="value"
          style={styles.formInput}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Account Number</Text>
        <TextInput
          style={styles.formControl}
          placeholder=""
          keyboardType="text"
          onChangeText={(cropType) => setAccountNumber(cropType)}
        />
      </View>

      <View style={styles.formInput}>
        <TouchableOpacity style={styles.button}>
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text
              style={{
                textAlign: "center",
                color: "#ffffff",
                fontSize: 16,
              }}
            >
              Submit
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formSection: {
    paddingHorizontal: 20,
  },

  formLabel: {
    marginBottom: 5,
    marginTop: 15,
    color: "#000",
  },

  formControl: {
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#0a990b",
    borderRadius: 10,
    padding: 10,
  },
  
  placeholderText: {
    position: "relative",
    textAlign: "center",
    alignSelf: "center",
  },
});
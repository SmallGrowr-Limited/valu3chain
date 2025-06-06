import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { banks } from "../../../banks";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { REGISTER_FARMER } from "../../../graphql/mutations/farmerMutation";

export default function ProfileForm2() {
  const [loading, setLoading] = useState(false);
  const [showID, setShowID] = useState(false);
  const [idedntification, setIdentification] = useState("");
  const farmer = useSelector((state) => state.farmer.farmerData);
  const userId = useSelector((state) => state.auth.user.userId);
  const [registerFarmer] = useMutation(REGISTER_FARMER);

  const router = useRouter();
  const [formData, setFormData] = useState({
    identification: "",
    profileImage: "url",
    farmAddress: "",
    farmSize: "",
    cropType: "",
    bankName: "",
    accountNumber: "",
    agentId: userId,
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

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    
    try {
      console.log(farmer);
      console.log(userId)
      console.log(formData);

      const { data } = await registerFarmer({
        variables: {
          input: {
            fullName: farmer.fullName,
            gender: farmer.gender,
            dateOfBirth: farmer.dateOfBirth,
            email: farmer.email,
            phoneNumber: farmer.phoneNumber,
            address: farmer.address,
            state: farmer.state,
            nationality: farmer.nationality,
            identification: formData.identification,
            profileImage: formData.profileImage,
            farmAddress: formData.farmAddress,
            farmSize: formData.farmSize,
            cropType: formData.cropType,
            bankName: formData.bankName,
            accountNumber: formData.accountNumber,
            agentId: formData.agentId,
          },
        },
      });

      //console.log("farmers2:", data);
      if(data) router.navigate("/agent")
    } catch (error) {
      console.log(error.message);
    }
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
            value={formData.identificationNumber}
            placeholder=""
            keyboardType="text"
            onChangeText={(value) =>
              handleChange("identification", value)
            }
          />
        </View>
      ) : null}
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Farm Size (in hectares)</Text>
        <TextInput
          style={styles.formControl}
          value={formData.farmSize}
          placeholder=""
          keyboardType="text"
          onChangeText={(val) => handleChange("farmSize", val)}
        />
      </View>

      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Farm Address</Text>
        <TextInput
          style={styles.formControl}
          value={formData.farmAddress}
          placeholder=""
          keyboardType="text"
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => handleChange("farmAddress", value)}
        />
      </View>

      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Crops cultivated</Text>
        <TextInput
          style={styles.formControl}
          value={formData.cropType}
          placeholder=""
          keyboardType="text"
          onChangeText={(value) => handleChange("cropType", value)}
        />
      </View>

      <Text style={styles.formLabel}>Bank Details</Text>

      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Bank Name</Text>
        <SelectList
          setSelected={(val) => handleChange("bankName", val)}
          data={banks}
          save="value"
          style={styles.formInput}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Account Number</Text>
        <TextInput
          style={styles.formControl}
          value={formData.accountNumber}
          placeholder=""
          keyboardType="text"
          onChangeText={(val) => handleChange("accountNumber", val)}
        />
      </View>

      <View style={styles.formInput}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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

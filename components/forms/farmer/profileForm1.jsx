import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { stateslist } from "../../../states";

export default function ProfileForm1({setToggleForm}) {
  const [loading, setLoading] = useState();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    gender: "",
    email: "",
    nationality: "",
    state: "",
    address: "",
  });

  const nationalityValue = [{ key: "1", value: "Nigeria" }];
  const genderValue = [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
  ];

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (val) => {
    //Update agent state in redux store and navigate to next page
    console.log(formData)
    setToggleForm(true);
  };

  return (
    <View style={styles.formSection}>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Full Name</Text>
        <TextInput
          style={styles.formControl}
          value={formData.fullName}
          placeholder=""
          keyboardType="text"
          onChangeText={(val) => handleChange("fullName", val)}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Phone Number</Text>
        <TextInput
          style={styles.formControl}
          value={formData.phoneNumber}
          placeholder=""
          keyboardType="text"
          onChangeText={(val) => handleChange("phoneNumber", val)}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Gender</Text>
        <SelectList
          setSelected={(val) => handleChange("gender", val)}
          data={genderValue}
          save="value"
          style={styles.formInput}
        />
      </View>

      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Email</Text>
        <TextInput
          style={styles.formControl}
          value={formData.email}
          placeholder=""
          keyboardType="text"
          placeholder="Enter email if any"
          placeholderTextColor="#aaa"
          onChangeText={(val) => handleChange("email", val)}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Nationality</Text>
        <SelectList
          setSelected={(val) => handleChange("nationality", val)}
          data={nationalityValue}
          save="value"
          style={styles.formInput}
        />
      </View>

      <View style={styles.formInput}>
        <Text style={styles.formLabel}>State of Origin</Text>
        <SelectList
          setSelected={(val) => handleChange("state", val)}
          data={stateslist}
          save="value"
          style={styles.formInput}
        />
      </View>
      <View style={styles.formInput}>
        <Text style={styles.formLabel}>Resident Address</Text>
        <TextInput
          style={styles.formControl}
          value={formData.address}
          placeholder=""
          keyboardType="text"
          multiline={true}
          numberOfLines={4}
          onChangeText={(val) => handleChange("address", val)}
        />
      </View>

      <View style={styles.formInput}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text
              style={{
                textAlign: "center",
                color: "#ffffff",
                fontSize: 16,
              }}
            >
              Next
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
    marginBottom:20
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
    // height: 45,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#0a990b",
    borderRadius: 10,
    padding: 10,
  },
});

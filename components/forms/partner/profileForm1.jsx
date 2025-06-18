import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import {
  createPartnerProfile,
  setLoading,
  setError,
} from "../../../redux/slices/partnerSlice";

const PartnerProfileForm1 = ({ setToggleForm }) => {
  const router = useRouter();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const userValue = [
    { key: "1", value: "Value 1" },
    { key: "2", value: "Value 2" },
  ];

  const permit = [
    { key: "1", value: "Yes" },
    { key: "2", value: "No" },
  ];

  const [partnerData, setPartnerData] = useState({
    businessName: "",
    contactPersonName: "",
    email: "",
    phoneNumber: "",
    businessAddress: "",
    businessPermit: "",
    statesOfOperation: "",
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (name, value) => {
    setPartnerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    //Update agent state in redux store and navigate to next page
    dispatch(createPartnerProfile(partnerData));
    setToggleForm(true);
  };

  return (
    <View style={styles.content}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formSection}>
          <View style={styles.formInput}>
            <Text style={styles.formLabel}>Name of Business</Text>
            <TextInput
              style={styles.formControl}
              value={partnerData.businessName}
              placeholder="Name of Business"
              placeholderTextColor="#aaa"
              keyboardType="text"
              onChangeText={(val) => handleChange("businessName", val)}
            />
          </View>
          <View style={styles.formInput}>
            <Text style={styles.formLabel}>Name of Contact Person</Text>
            <TextInput
              style={styles.formControl}
              value={partnerData.contactPersonName}
              placeholder="Name of Contact Person"
              placeholderTextColor="#aaa"
              keyboardType="text"
              onChangeText={(val) => handleChange("contactPersonName", val)}
            />
          </View>
          <View style={styles.formInput}>
            <Text style={styles.formLabel}>Email Address</Text>
            <TextInput
              style={styles.formControl}
              value={partnerData.email}
              placeholder="Email Address"
              placeholderTextColor="#aaa"
              keyboardType="text"
              onChangeText={(val) => handleChange("email", val)}
            />
          </View>
          <View style={styles.formInput}>
            <Text style={styles.formLabel}>PhoneNumber</Text>
            <TextInput
              style={styles.formControl}
              value={partnerData.phoneNumber}
              placeholder="phoneNumber"
              placeholderTextColor="#aaa"
              keyboardType="text"
              onChangeText={(val) => handleChange("phoneNumber", val)}
            />
          </View>
          <View style={styles.formInput}>
            <Text style={styles.formLabel}>Head Office Address</Text>
            <TextInput
              style={styles.formControl}
              value={partnerData.businessAddress}
              placeholder="Head Office Address"
              placeholderTextColor="#aaa"
              keyboardType="text"
              onChangeText={(val) => handleChange("businessAddress", val)}
            />
          </View>
          <View style={styles.formInput}>
            <Text style={styles.formLabel}>
              Permitted to Do Business in Nigeria?
            </Text>
            <SelectList
              setSelected={(val) => handleChange("businessPermit", val)}
              data={permit}
              save="value"
            />
          </View>
          <View style={styles.formInput}>
            <Text style={styles.formLabel}>States of Operation</Text>
            <TextInput
              style={styles.formControl}
              value={partnerData.statesOfOperation}
              placeholder="States of Operation"
              placeholderTextColor="#aaa"
              keyboardType="text"
              onChangeText={(val) => handleChange("statesOfOperation", val)}
            />
          </View>

          <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PartnerProfileForm1;

const styles = StyleSheet.create({
  
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 8,
  },
  header: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  headerTex: { fontSize: 18, fontWeight: 700 },
  formSection: { flex: 3 },
  formInput: { marginBottom: 15 },

  formControl: {
    borderColor: "#666",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#ffffff",
    height: 45,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 14,
    borderColor: "#666",
    borderWidth: 0.5,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    color: "#000",
    paddingVertical: 10,
    paddingRight: 10,
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
  buttonSection: { flex: 1 },
  button: {
    marginVertical: 20,
    backgroundColor: "#508060",
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 16,
  },

  formLabel: {
    marginBottom: 5,
    marginTop: 5,
    color: "#000",
  },
});

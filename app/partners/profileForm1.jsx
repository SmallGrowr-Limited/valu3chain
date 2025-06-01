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
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/slices/authSlice";
import { SIGNUP_MUTATION } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";

const PartnerProfileForm1 = () => {
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

  //const { loading, error } = useSelector((state) => state.auth);
  const [signup, { loading }] = useMutation(SIGNUP_MUTATION);

  const [partnerData, setPartnerData] = useState({
    businessName: "",
    contactPersonName: "",
    email: "",
    phoneNumber: "",
    businessAddress: "",
    businessPermit: "",
    statesOfOperation: "",
    businessRegistrationNumber: "",
    haveFarmersDirectory: "",
    termsOfServiceAgreement:"",
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (name, value) => {
    setPartnerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    try {
      console.log(partnerData);
      
      // const { data } = await signup({
      //   variables: {
      //     businessName,
      //     contactPersonName,
      //     email,
      //     phoneNumber,
      //     businessAddress,
      //     userObjective,
      //     businessPermit,
      //     statesOfOperation,
      //     businessRegistrationNumber,
      //     haveFarmersDirectory,
      //     termsOfServiceAgreement
      //   },
      // });

      // dispatch(setAuth(data.signup));
      // Alert.alert("Success", "Logged in!");
      router.navigate("/partners/profileForm2")
    } catch (error) {
      Alert.alert("signup Failed", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          {/* <Text style={styles.headerTex}>Create Account</Text> */}
        </View>
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
            {/* <View style={styles.formInput}>
              <Text style={styles.formLabel}>Your Objective on Valu3Chain</Text>
              <SelectList
                setSelected={(val) => handleChange("userObjective", val)}
                data={userValue}
                save="value"
              />
            </View> */}
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
    </SafeAreaView>
  );
};

export default PartnerProfileForm1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e8f5e4",
  },
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

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
//import EcosystemPartnerSignup from "../../components/forms/ecosystemPartnerSignup";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/slices/authSlice";

const SignupPartner = () => {
  const router = useRouter();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const [partnerData, setPartnerData] = useState({
    businessName: "",
    contactPersonName: "",
    email: "",
    phoneNumber: "",
    password: "",
    businessAddress: "",
    userObjective: "",
    businessPermit: "",
    statesOfOperation: "",
    businessRegistrationNumber: "",
    haveFarmersDirectory: "",
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (name, value) => {
    setPartnerData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = () => {
    dispatch(signup(partnerData));
    router.navigate("/auth/signupPartner2");

  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTex}>Create Account</Text>
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
            <Text style={styles.formLabel}>Enter Your Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                secureTextEntry={!showPassword}
                value={partnerData.password}
                onChangeText={(val) => handleChange("password", val)}
                style={styles.input}
                placeholder="Enter Your Password"
                placeholderTextColor="#aaa"
              />
              <MaterialCommunityIcons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#aaa"
                style={styles.icon}
                onPress={toggleShowPassword}
              />
            </View>
            <View style={styles.formInput}>
              <Text style={styles.formLabel}>Confirm Password</Text>
              <TextInput
                style={styles.formControl}
                value={confirmPassword}
                placeholder="Confirm Password"
                placeholderTextColor="#aaa"
                keyboardType="text"
                onChangeText={(val) => setConfirmPassword(val)}
              />
            </View>
            <View style={styles.buttonSection}>
              <TouchableOpacity
                style={styles.button}
                // onPress={() => router.navigate("/auth/signupPartner2")}
                onPress={submitForm}
              >
                <Text style={styles.buttonText}>Proceed</Text>
              </TouchableOpacity>
              <View style={styles.signIn}>
                <Text style={styles.signInText}>
                  Already have an account?{" "}
                  <TouchableOpacity
                    onPress={() => router.navigate("/auth/login")}
                  >
                    <Text style={[styles.linkText, { marginBottom: -5 }]}>
                      Sign in
                    </Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
            {/* <EcosystemPartnerSignup /> */}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SignupPartner;

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
    marginHorizontal: 10,
  },
  header: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
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
  signIn: {
    flexDirection: "row",
    justifyContent: "center",
  },

  linkText: {
    color: "green",
  },

  formLabel: {
    marginBottom: 5,
    marginTop: 5,
    color: "#000",
  },
});

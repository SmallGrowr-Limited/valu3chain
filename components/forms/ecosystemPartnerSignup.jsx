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
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

export default function EcosystemPartnerSignup() {
  const [businessName, setBusinessName] = useState("");
  const [contactPersonName, setContactPersonName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <View style={styles.formInput}>
        <TextInput
          style={styles.formControl}
          value={businessName}
          placeholder="Name of Business"
          placeholderTextColor="#aaa"
          keyboardType="text"
          onChangeText={(val) => setBusinessName(val)}
        />
      </View>
      <View style={styles.formInput}>
        <TextInput
          style={styles.formControl}
          value={contactPersonName}
          placeholder="Name of Contact Person"
          placeholderTextColor="#aaa"
          keyboardType="text"
          onChangeText={(val) => setContactPersonName(val)}
        />
      </View>
      <View style={styles.formInput}>
        <TextInput
          style={styles.formControl}
          value={password}
          placeholder="Email Address"
          placeholderTextColor="#aaa"
          keyboardType="text"
          onChangeText={(val) => setEmail(val)}
        />
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(val) => setPassword(val)}
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
        <TextInput
          style={styles.formControl}
          value={email}
          placeholder="Password"
          placeholderTextColor="#aaa"
          keyboardType="text"
          onChangeText={(val) => setPassword(val)}
        />
      </View>
      <View style={styles.formInput}>
        <TextInput
          style={styles.formControl}
          value={confirmPassword}
          placeholder="Confirm Password"
          placeholderTextColor="#aaa"
          keyboardType="text"
          onChangeText={(val) => setConfirmPassword(val)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
});

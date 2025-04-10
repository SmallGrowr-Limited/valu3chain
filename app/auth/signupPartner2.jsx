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
import { useRouter } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";

export default function UpdatePartnerSignup() {
  const router = useRouter();
  const [businessAddress, setBusinessAddress] = useState("");
  const [userObjective, setUserObjective] = useState("");

  const userValue = [
    { key: "1", value: "Extention Agent" },
    { key: "2", value: "Ecosystem Partner" },
  ];

  const permit = [
    { key: "1", value: "Yes" },
    { key: "2", value: "No" },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.formSection}>
          <View style={styles.formInput}>
            <SelectList
              setSelected={(val) => setUserObjective(val)}
              data={userValue}
              save="value"
              defaultOption={{
                key: "1",
                value: "Your Objective on Valu3Chain",
              }}
            />
          </View>
          <View style={styles.formInput}>
            <TextInput
              style={styles.formControl}
              value={businessAddress}
              placeholder="Head Office Address"
              placeholderTextColor="#aaa"
              keyboardType="text"
              onChangeText={(val) => setBusinessAddress(val)}
            />
          </View>
          <View style={styles.formInput}>
            <Text style={styles.formLabel}></Text>
            <SelectList
              setSelected={(val) => setUserObjective(val)}
              data={permit}
              save="value"
              defaultOption={{
                key: "1",
                value: "Permitted to Do Business in Nigeria?",
              }}
            />
          </View>
          <View style={styles.formInput}>
            <TextInput
              style={styles.formControl}
              value={businessAddress}
              placeholder="States of Operation"
              placeholderTextColor="#aaa"
              keyboardType="text"
              onChangeText={(val) => setBusinessAddress(val)}
            />
          </View>
          <View style={styles.formInput}>
            <TextInput
              style={styles.formControl}
              value={businessAddress}
              placeholder="Enter Business Registration Number"
              placeholderTextColor="#aaa"
              keyboardType="text"
              onChangeText={(val) => setBusinessAddress(val)}
            />
          </View>
          <View style={styles.formInput}>
            <Text style={styles.formLabel}></Text>
            <SelectList
              setSelected={(val) => setUserObjective(val)}
              data={permit}
              save="value"
              defaultOption={{
                key: "1",
                value: "Do You Have a Farmers’ Directory?",
              }}
            />
          </View>
        </View>
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.navigate("/auth/signupPartner3")}
          >
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
    backgroundColor: "#fff",
  },
  content: { flex: 1, padding: 20, marginTop: 20 },
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
  buttonSection: { flex: 1 },
  button: {
    marginVertical: 20,
    backgroundColor: "#0a990b",
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 16,
  },
});

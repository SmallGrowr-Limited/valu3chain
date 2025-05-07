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
  // const [businessAddress, setBusinessAddress] = useState("");
  // const [userObjective, setUserObjective] = useState("");
  // const [businessPermit, setbusinessPermit] = useState("");
  // const [statesOfOperation, setStatesOfOperation] = useState("");
  // const [businessRegistrationNumber, setBusinessRegistrationNumber] = useState("");
  // const [haveFarmersDirectory, setHaveFarmersDirectory] = useState("");

   const [data, setData] = useState({
     businessAddress: "",
     userObjective: "",
     businessPermit: "",
     statesOfOperation: "",
     businessRegistrationNumber: "",
     haveFarmersDirectory: "",
   }) 


  const userValue = [
    { key: "1", value: "" },
    { key: "2", value: "" },
  ];

  const permit = [
    { key: "1", value: "Yes" },
    { key: "2", value: "No" },
  ];

  const handleChange = (name, value)=>{
    setData((prev)=>({...prev, [name]: value}))
    
  }
 
  const handleSubmit = () => {
    console.log("Data:", data);
    router.navigate("/auth/signupPartner3");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.formSection}>
            <View style={styles.formInput}>
              <Text style={styles.formLabel}>Your Objective on Valu3Chain</Text>
              <SelectList
                setSelected={(val) => handleChange("userObjective", val)}
                data={userValue}
                save="value"
              />
            </View>
            <View style={styles.formInput}>
              <Text style={styles.formLabel}>Head Office Address</Text>
              <TextInput
                style={styles.formControl}
                value={data.businessAddress}
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
                value={data.statesOfOperation}
                placeholder="States of Operation"
                placeholderTextColor="#aaa"
                keyboardType="text"
                onChangeText={(val) => handleChange("statesOfOperation", val)}
              />
            </View>
            <View style={styles.formInput}>
              <Text style={styles.formLabel}>Business Registration Number</Text>
              <TextInput
                style={styles.formControl}
                value={data.businessRegistrationNumber}
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
            <View style={styles.buttonSection}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
                // onPress={() => router.navigate("/auth/signupPartner3")}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
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
  formLabel: {
    marginBottom: 5,
    marginTop: 5,
    color: "#000",
  },
});

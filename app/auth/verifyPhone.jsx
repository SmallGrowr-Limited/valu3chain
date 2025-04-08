import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

export default function PhoneVerificaion() {
  const [verificaionCode, setVerificationCode] = useState("");
  const router = useRouter();

  const verifyCode = () => {
    
    if (verificaionCode === "123456") router.navigate("/agent");
    if (verificaionCode === "225566") router.navigate("/");
  
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Phone Verificaion</Text>
          <Text style={styles.headerSubText}>
            Verification Code have been Sent to your Phone Number.
          </Text>
        </View>

        <View style={styles.formInput}>
          <Text style={styles.formLabel}>Enter Verification Code</Text>
          <TextInput
            style={styles.formControl}
            placeholder=""
            keyboardType="text"
            onChangeText={(val) => setVerificationCode(val)}
          />
        </View>
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.button} onPress={verifyCode}>
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
  },
  headerText: { fontSize: 18, fontWeight: 700, marginBottom: 10 },
  headerSubText: { color: "#666" },
  formInput: { flex: 2, paddingTop: 10 },
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
  buttonSection: {
    flex: 1,
  },
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

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
import EcosystemPartnerSignup from "../../components/forms/ecosystemPartnerSignup";
import { useRouter } from "expo-router";

const SignupPartner = () => {
    
    const router = useRouter()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTex}>Sign-Up</Text>
        </View>
        <View style={styles.formSection}>
          <EcosystemPartnerSignup />
        </View>
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Proceed</Text>
          </TouchableOpacity>
          <View style={styles.signIn}>
            <Text style={styles.signInText}>
              Already have an account?{" "}
              <TouchableOpacity onPress={() => router.navigate("/auth/login")}>
                <Text style={[styles.linkText, { marginBottom: -5 }]}>
                  Sign in
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupPartner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  content: { flex: 1, padding: 20 },
  header: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  headerTex: { fontSize: 18, fontWeight: 700 },
  formSection: { flex: 3 },
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
  signIn: {
    flexDirection: "row",
    justifyContent: "center",
  },
  linkText: {
    color: "green",
  },
});

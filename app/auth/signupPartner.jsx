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

const SignupPartner = () => {
    
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTex}>Create Account</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.formSection}>
            <EcosystemPartnerSignup />
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
 
});

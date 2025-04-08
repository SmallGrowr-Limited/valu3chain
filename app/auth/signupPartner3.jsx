import {
  StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput} from "react-native";
import React, {useState} from 'react';
import Checkbox from "expo-checkbox";

export default function TermsOfService() {
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.service}>
          <Text style={styles.paragraph}>
            Are You Willing to Transparently Sync Your Directory with Our AI
            Model to Increase Opportunities for Your Farmers and Reduce the Risk
            of Doing Business with Them?
          </Text>

          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked1}
              onValueChange={setChecked1}
            />
            <Text style={styles.paragraph}>Yes</Text>
          </View>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked2}
              onValueChange={setChecked2}
              color={isChecked2 ? "#4630EB" : undefined}
            />
            <Text style={styles.paragraph}>No</Text>
          </View>
        </View>
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.button}>
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
  service: { flex: 3 },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginTop:10
  },
  paragraph: {
    fontSize: 18,
  },
  checkbox: {
    margin: 8,
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
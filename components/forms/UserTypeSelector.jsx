import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { setRole } from "../../redux/slices/authSlice";

const UserTypeSelector = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>I am a:</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => dispatch(setRole("AGENT"))}
      >
        <Text style={styles.buttonText}>Extension Agent</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => dispatch(setRole("INVESTOR"))}
      >
        <Text style={styles.buttonText}>Investor</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default UserTypeSelector;

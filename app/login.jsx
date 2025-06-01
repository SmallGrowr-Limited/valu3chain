import React from "react";
import { View, StyleSheet } from "react-native";
import UserTypeSelector from "../components/forms/UserTypeSelector";
import LoginForm from "../components/forms/LoginForm";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <UserTypeSelector />
      <LoginForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

export default LoginScreen;

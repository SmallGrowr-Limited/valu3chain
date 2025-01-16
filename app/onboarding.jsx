import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Onboarding = () => {
  return (
    <View style={styles.container}>
      <Text>Onboarding</Text>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
     alignItems: "center" ,
    justifyContent: "center",
  },
});

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";

import ProfileForm1 from "../../components/forms/farmer/profileForm1";
import ProfileForm2 from "../../components/forms/farmer/profileForm2";

export default function FarmerOnboarding() {
  const [toggleForm, setToggleForm] = useState(false);
  const agent = useSelector((state) => state.auth.user);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>New Farmer</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={true}>
        {!toggleForm ? (
          <ProfileForm1 setToggleForm={setToggleForm} />
        ) : (
          <ProfileForm2 />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 10,
    paddingHorizontal: 20,
  },

  headerText: {
    textAlign: "center",
    fontSize: 18,
  },
});

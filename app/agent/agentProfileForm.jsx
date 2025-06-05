import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import ProfileForm1 from "../../components/forms/agent/profileForm1";
import ProfileForm2 from "../../components/forms/agent/profileForm2";

const AgentPersonalInformation = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {!toggleForm ? (
        <ProfileForm1 setToggleForm={setToggleForm} />
      ) : (
        <ProfileForm2 />
      )}
    </SafeAreaView>
  );
};

export default AgentPersonalInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8f5e4",
  },
});

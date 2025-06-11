import { StyleSheet, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";

import PartnerProfileForm1 from "../../components/forms/partner/profileForm1";
import PartnerProfileForm2 from "../../components/forms/partner/profileForm2";

const PartnerProfileForm = () => {
  const [toggleForm, setToggleForm] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      {!toggleForm ? (
        <PartnerProfileForm1 setToggleForm={setToggleForm} />
      ) : (
        <PartnerProfileForm2 />
      )}
    </SafeAreaView>
  );
};

export default PartnerProfileForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e8f5e4",
  },
});

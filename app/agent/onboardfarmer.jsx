import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {useSelector} from "react-redux"

import ProfileForm1 from "../../components/forms/farmer/profileForm1";
import ProfileForm2 from "../../components/forms/farmer/profileForm2";

export default function FarmerOnboarding() {
  const [toggleForm, setToggleForm] = useState(false);
  const agent = useSelector(state=>state.auth.user)

  useEffect(()=>{
    console.log("from onboarding:", agent)
  },)

  // const handleSubmit = async () => {

  //   try {
  //     const { data } = await registerFarmer({
  //       variables: {
  //         input: {
  //           fullName:formData.fullName,
  //           gender:formData.gender,
  //           dateOfBirth:formData.dateOfBirth,
  //           email:formData.email,
  //           phoneNumber:formData.phoneNumber,
  //           address:formData.address,
  //           state:formData.state,
  //           nationality:formData.nationality,
  //           identification:formData.identification,
  //           profileImage:formData.profileImage,
  //           farmAddress:formData.farmAddress,
  //           farmSize:formData.farmSize,
  //           cropType:formData.cropType,
  //           bankName:formData.bankName,
  //           accountNumber:formData.accountNumber,
  //           agentId:formData.agentId,
  //         },
  //       },
  //     });

  //     console.log("farmers2:", data);
  //   } catch (error) {
  //     console.log(error.message);

  //   }
  // };

  //Dropdown menu item

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>New Farmer</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={true}>
        {!toggleForm ? <ProfileForm1 setToggleForm={setToggleForm}/> : <ProfileForm2 />}
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

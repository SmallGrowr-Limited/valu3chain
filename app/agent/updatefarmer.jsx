import React, { useState, useEffect, useContext } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";



const RegisterFarmer = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //input fields

  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [nationality, setNationality] = useState("");
  const [identification, setIdentification] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [profileImage, setProfileImage] = useState("");

  //Farm details
  const [farmAddress, setfarmAddress] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [cropType, setCropType] = useState("");
  const [docId, setDocId] = useState("");
  const [showID, setShowID] = useState(false);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrapper}>
         
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterFarmer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  contentWrapper: {
    flex: 1,
    paddingTop: 20,
  },

  

  
 

  imageUploadButton: {
    marginBottom: 20,
    backgroundColor: "#0e6f2b",
    borderRadius: 5,
    padding: 5,
    width: 150,
    alignSelf: "center",
  },

  placeholderText: {
    position: "relative",
    textAlign: "center",
    alignSelf: "center",
  },
});

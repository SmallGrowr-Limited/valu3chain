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

import { SelectList } from "react-native-dropdown-select-list";
import { stateslist } from "../../states";
import { banks } from "../../banks";
import AuthContext from "../../context/AuthContext";
import { useRouter } from "expo-router";

const RegisterFarmer = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //input fields
  const { farmerId, setFarmerId, setProfileUpdate } = useContext(AuthContext);
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

  const nationalityValue = [{ key: "1", value: "Nigeria" }];
  const idcard = [
    { key: "1", value: "NIN" },
    { key: "2", value: "BVN" },
    { key: "3", value: "International Passport" },
  ];

  const handleIdSelection = (val) => {
    setIdentification(val);
    setShowID(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrapper}>
          <View style={styles.formSection}>
            <View style={styles.formInput}>
              <Text style={styles.formLabel}>Nationality</Text>
              <SelectList
                setSelected={(val) => setNationality(val)}
                data={nationalityValue}
                save="value"
                style={styles.formInput}
              />
            </View>
            <View style={styles.formInput}>
              <Text style={styles.formLabel}>State of Origin</Text>
              <SelectList
                setSelected={(val) => setState(val)}
                data={stateslist}
                save="value"
                style={styles.formInput}
              />
            </View>

            <View style={styles.formInput}>
              <Text style={styles.formLabel}>Resident Address</Text>
              <TextInput
                style={styles.formControl}
                placeholder=""
                keyboardType="text"
                multiline={true}
                numberOfLines={4}
                onChangeText={(address) => setAddress(address)}
              />
            </View>
            <View style={styles.formInput}>
              <Text style={styles.formLabel}>Identification</Text>
              <SelectList
                setSelected={handleIdSelection}
                data={idcard}
                save="value"
                style={styles.formInput}
              />
            </View>
            {showID ? (
              <View style={styles.formInput}>
                <Text style={styles.formLabel}>ID Number</Text>
                <TextInput
                  style={styles.formControl}
                  placeholder=""
                  keyboardType="text"
                  onChangeText={(value) => setIdNumber(value)}
                />
              </View>
            ) : (
              ""
            )}
            <View style={styles.formInput}>
              <Text style={styles.formLabel}>Farm Size (in hectares)</Text>
              <TextInput
                style={styles.formControl}
                placeholder=""
                keyboardType="text"
                onChangeText={(farmSize) => setFarmSize(farmSize)}
              />
            </View>

            <View style={styles.formInput}>
              <Text style={styles.formLabel}>Farm Address</Text>
              <TextInput
                style={styles.formControl}
                placeholder=""
                keyboardType="text"
                multiline={true}
                numberOfLines={4}
                onChangeText={(value) => setfarmAddress(value)}
              />
            </View>

            <View style={styles.formInput}>
              <Text style={styles.formLabel}>Crops cultivated</Text>
              <TextInput
                style={styles.formControl}
                placeholder=""
                keyboardType="text"
                onChangeText={(value) => setCropType(value)}
              />
            </View>

            <Text style={styles.formLabel}>Bank Details</Text>

            <View style={styles.formInput}>
              <Text style={styles.formLabel}>Bank</Text>
              <SelectList
                setSelected={(val) => setBankName(val)}
                data={banks}
                save="value"
                style={styles.formInput}
              />
            </View>
            <View style={styles.formInput}>
              <Text style={styles.formLabel}>Account Number</Text>
              <TextInput
                style={styles.formControl}
                placeholder=""
                keyboardType="text"
                onChangeText={(cropType) => setAccountNumber(cropType)}
              />
            </View>

            <View style={styles.formInput}>
              <TouchableOpacity style={styles.button} >
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#ffffff",
                      fontSize: 16,
                    }}
                  >
                    Submit
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterFarmer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF4F7",
  },

  contentWrapper: {
    flex: 1,
    paddingTop: 20,
  },

  formSection: {
    paddingHorizontal: 20,
  },

  formLabel: {
    marginBottom: 5,
    marginTop: 15,
    color: "#000",
  },

  formControl: {
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#ffffff",
    // height: 45,
  },

  input: {
    flex: 1,
    color: "#333",
    paddingVertical: 10,
    paddingRight: 10,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 14,
    borderColor: "#000",
    borderWidth: 1,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#0a990b",
    borderRadius: 10,
    padding: 10,
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

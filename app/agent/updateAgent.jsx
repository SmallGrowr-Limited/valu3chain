import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from "react-native";

import { SimpleLineIcons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
// import * as ImagePicker from "expo-image-picker";
// import ImageViewer from "../../components/image/profileImageViewer";
import { stateslist } from "../../states";

import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../../context/AuthContext";
import { useRouter } from "expo-router";

const AgentPersonalInformation = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { agentId, setAgentId } = useContext(AuthContext);
  const router = useRouter();

  //input fields

  const [agentStatus, setAgentStatus] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nationality, setNationality] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [identification, setIdentification] = useState("");
  const [idNumber, setIdNumber] = useState("");

  const [experience, setExperience] = useState("");
  const [experty, setExperty] = useState("");
  const [training, setTraining] = useState("");
  const [preferredlocation, setPreferredLocation] = useState("");

  const [profileImage, setProfileImage] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [docId, setDocId] = useState("");

  const [showID, setShowID] = useState(false);

  const handleIdSelection = (val) => {
    setIdentification(val);
    setShowID(true);
  };

  const nationalityValue = [{ key: "1", value: "Nigeria" }];
  const idcard = [
    { key: "1", value: "NIN" },
    { key: "2", value: "BVN" },
    { key: "3", value: "International Passport" },
  ];

  const agentType = [
    { key: "1", value: "PlowAfrika’s Dedicated Agent" },
    { key: "2", value: "Freelance Agent" },
  ];

  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.formSection}>
            <View style={styles.formInput}></View>
            <TouchableOpacity style={styles.imageUploadButton}>
              <Text
                style={{
                  textAlign: "center",
                  color: "#ffffff",
                  fontSize: 16,
                }}
              >
                Upload Picture
              </Text>
            </TouchableOpacity>

            <View style={styles.formInput}>
              <Text style={styles.formLabel}>Agent Status</Text>
              <SelectList
                setSelected={(val) => setAgentStatus(val)}
                data={agentType}
                save="value"
                style={styles.formInput}
              />
            </View>
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
              <Text style={styles.formLabel}>Phone Number</Text>
              <TextInput
                style={styles.formControl}
                placeholder=""
                keyboardType="phone-pad"
                onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
              />
            </View>

            <View style={styles.formInput}>
              <Text style={styles.formLabel}>Address</Text>
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
                  keyboardType="number-pad"
                  onChangeText={(value) => setIdNumber(value)}
                />
              </View>
            ) : (
              ""
            )}

            <View style={styles.formInput}>
              <Text style={styles.formLabel}>Years of Experience</Text>
              <TextInput
                style={styles.formControl}
                placeholder=""
                keyboardType="number-pad"
                onChangeText={(value) => setExperience(value)}
              />
            </View>

            <View style={styles.formInput}>
              <Text style={styles.formLabel}>Preffered Location</Text>
              <SelectList
                setSelected={(val) => setPreferredLocation(val)}
                data={stateslist}
                save="value"
                style={styles.formInput}
              />
            </View>

            <View style={styles.formInput}>
              <Text style={styles.formLabel}>Areas of Expertise</Text>
              <TextInput
                style={styles.formControl}
                placeholder=""
                keyboardType="text"
                onChangeText={(value) => setExperty(value)}
              />
            </View>

            <View style={styles.formInput}>
              <Text style={styles.formLabel}>
                Relevant certifications/Programs completed
              </Text>
              <TextInput
                style={styles.formControl}
                placeholder=""
                keyboardType="text"
                multiline={true}
                numberOfLines={4}
                onChangeText={(address) => setTraining(address)}
              />
            </View>

            <View style={styles.formInput}>
              <TouchableOpacity style={styles.button} >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AgentPersonalInformation;

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
    marginVertical: 20,
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
  bgColor1: {
    backgroundColor: "#f0604a",
  },
  bgColor2: {
    backgroundColor: "#0a990b",
  },
  bgColor3: {
    backgroundColor: "#ffcc33",
  },
});

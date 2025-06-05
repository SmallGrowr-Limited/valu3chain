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
} from "react-native";

import { SimpleLineIcons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { stateslist } from "../../../states";
import image1 from "../../../assets/images/p1.webp";
import { useRouter } from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import {createAgentProfile, setLoading, setError} from "../../../redux/slices/agentSlice"

const ProfileForm1 = ({setToggleForm}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const id = useSelector(state=>state.auth.user.userId)


  //input fields
  const [formData, setFormData] = useState({
    agentId: id,
    fullName: "",
    gender: "",
    dateOfBirth: "",
    phoneNumber: "",
    nationality: "",
    state: "",
    address: "",
    idNumber: "",
    imageUrl: "uri",
  });

  const [profileImage, setProfileImage] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const nationalityValue = [{ key: "1", value: "Nigeria" }];
  const genderValue = [
    { key: "1", value: "Female" },
    { key: "2", value: "Male" },
  ];

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (val) => {
    //Update agent state in redux store and navigate to next page
    dispatch(createAgentProfile(formData))
    setToggleForm(true);
  };

  return (
    <View style={styles.contentWrapper}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formSection}>
          <View style={styles.profileImage}>
            <Image source={image1} alt="" style={styles.image} />
          </View>
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
            <Text style={styles.formLabel}>Full Name</Text>
            <TextInput
              style={styles.formControl}
              value={formData.fullName}
              placeholder=""
              keyboardType="text"
              onChangeText={(val) => handleChange("fullName", val)}
            />
          </View>
          <View style={styles.formInput}>
            <Text style={styles.formLabel}>Gender</Text>
            <SelectList
              setSelected={(val) => handleChange("gender", val)}
              data={genderValue}
              save="value"
              style={styles.formInput}
            />
          </View>
          <View style={styles.formInput}>
            <Text style={styles.formLabel}>Date of Birth</Text>
            <TextInput
              style={styles.formControl}
              value={formData.dateOfBirth}
              placeholder=""
              keyboardType="text"
              onChangeText={(val) => handleChange("dateOfBirth", val)}
            />
          </View>

          <View style={styles.formInput}>
            <Text style={styles.formLabel}>Phone Number</Text>
            <TextInput
              style={styles.formControl}
              value={formData.phoneNumber}
              placeholder=""
              keyboardType="phone-pad"
              onChangeText={(val) => handleChange("phoneNumber", val)}
            />
          </View>

          <View style={styles.formInput}>
            <Text style={styles.formLabel}>Nationality</Text>
            <SelectList
              setSelected={(val) => handleChange("nationality", val)}
              data={nationalityValue}
              save="value"
              style={styles.formInput}
            />
          </View>
          <View style={styles.formInput}>
            <Text style={styles.formLabel}>State of Origin</Text>
            <SelectList
              setSelected={(val) => handleChange("state", val)}
              data={stateslist}
              save="value"
              style={styles.formInput}
            />
          </View>

          <View style={styles.formInput}>
            <Text style={styles.formLabel}>Address</Text>
            <TextInput
              style={styles.formControl}
              value={formData.address}
              placeholder=""
              keyboardType="text"
              multiline={true}
              numberOfLines={4}
              onChangeText={(val) => handleChange("address", val)}
            />
          </View>

          <View style={styles.formInput}>
            <Text style={styles.formLabel}>NIN Number</Text>
            <TextInput
              style={styles.formControl}
              value={formData.idNumber}
              placeholder=""
              keyboardType="number-pad"
              onChangeText={(val) => handleChange("idNumber", val)}
            />
          </View>

          <View style={styles.formInput}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
                  Next
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileForm1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8f5e4",
  },

  contentWrapper: {
    flex: 1,
  },

  formSection: {
    paddingHorizontal: 20,
    margin: 10,
    backgroundColor: "#ffffff",
  },

  profileImage: {
    alignItems: "center",
    paddingVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
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
});

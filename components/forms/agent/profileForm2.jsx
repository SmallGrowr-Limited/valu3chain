import React, { useState, useEffect } from "react";
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

import { SelectList } from "react-native-dropdown-select-list";
import { banks } from "../../../banks";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { useMutation} from "@apollo/client";
import {EXTENSION_AGENT} from "../../../graphql/mutations/agentMutation";

const ProfileForm2 = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const agentData = useSelector((state) => state.agent.agentData);
  const [registerAgent] = useMutation(EXTENSION_AGENT)

  //input fields

  const [formData, setFormData] = useState({
    disability: "",
    bankName: "",
    accountNumber: "",
    businessOutlet: "",
    businessName: "",
    businessType: "",
    registrationCategory: "",
    businessRegistrationNumber: "",
  });

  const [profileImage, setProfileImage] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const disabilityStatus = [
    { key: "1", value: "No" },
    { key: "2", value: "Yes" },
  ];
  const busOutlet = [
    { key: "1", value: "Yes" },
    { key: "2", value: "No" },
  ];

  const busType = [
    { key: "1", value: "Input Sales" },
    { key: "2", value: "Commodity Aggregation" },
  ];

  const regCategory = [
    { key: "1", value: "CAC-Name" },
    { key: "2", value: "CAC-Ltd," },
    { key: "3", value: "SMEDAN," },
  ];

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // generate userId using random number function
    let randomNumber = Math.floor(Math.random() * 1000) + 1;
    id = "ABC" + "-" + randomNumber;
    try {
      const {data} = await registerAgent({
        variables:{
          input:{
            agentId:id,
            fullName:agentData.fullName,
            gender:agentData.gender,
            dateOfBirth:agentData.dateOfBirth,
            phoneNumber:agentData.phoneNumber,
            nationality:agentData.nationality,
            state:agentData.state,
            address:agentData.address,
            idNumber:agentData.idNumber,
            imageUrl:agentData.imageUrl,
            disability:formData.disability,
            bankName:formData.bankName,
            accountNumber:formData.accountNumber,
            businessOutlet:formData.businessOutlet,
            businessName:formData.businessName,
            businessType:formData.businessType,
            registrationCategory:formData.registrationCategory,
          }
        }
      })
      
      router.navigate("/agent")
    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <View style={styles.contentWrapper}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formSection}>
          <View style={styles.formInput}>
            <Text style={styles.formLabel}>Do You Have Any Disability?</Text>
            <SelectList
              setSelected={(val) => handleChange("disability", val)}
              data={disabilityStatus}
              save="value"
              style={styles.formInput}
            />
          </View>

          <View style={styles.formInput}>
            <Text style={styles.formLabel}>Bank Name</Text>
            <SelectList
              setSelected={(val) => handleChange("bankName", val)}
              data={banks}
              save="value"
              style={styles.formInput}
            />
          </View>

          <View style={styles.formInput}>
            <Text style={styles.formLabel}>Accoun Number</Text>
            <TextInput
              style={styles.formControl}
              value={formData.accountNumber}
              placeholder=""
              keyboardType="number-pad"
              onChangeText={(val) => handleChange("accountNumber", val)}
            />
          </View>

          <View style={styles.formInput}>
            <Text style={styles.formLabel}>
              Do you have a agri-business outlet?
            </Text>
            <SelectList
              setSelected={(val) => handleChange("businessOutlet", val)}
              data={busOutlet}
              save="value"
              style={styles.formInput}
            />
          </View>

          {formData.businessOutlet === "Yes" ? (
            <View>
              <View style={styles.formInput}>
                <Text style={styles.formLabel}>Business Name</Text>
                <TextInput
                  style={styles.formControl}
                  value={formData.businessName}
                  placeholder=""
                  keyboardType="text"
                  onChangeText={(val) =>
                    handleChange("businessName", val)
                  }
                />
              </View>
              <View style={styles.formInput}>
                <Text style={styles.formLabel}>Type of Outlet</Text>
                <SelectList
                  setSelected={(val) => handleChange("businessType", val)}
                  data={busType}
                  save="value"
                  style={styles.formInput}
                />
              </View>
              <View style={styles.formInput}>
                <Text style={styles.formLabel}>Type of Registration</Text>
                <SelectList
                  setSelected={(val) =>
                    handleChange("registrationCategory", val)
                  }
                  data={regCategory}
                  save="value"
                  style={styles.formInput}
                />
              </View>
              <View style={styles.formInput}>
                <Text style={styles.formLabel}>Registration Number</Text>
                <TextInput
                  style={styles.formControl}
                  value={formData.businessRegistrationNumber}
                  placeholder=""
                  keyboardType="text"
                  onChangeText={(val) =>
                    handleChange("businessRegistrationNumber", val)
                  }
                />
              </View>
            </View>
          ) : (
            ""
          )}

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
                  Submit
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileForm2;

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

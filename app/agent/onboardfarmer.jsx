import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { REGISTER_FARMER } from "../../graphql/mutations/registerFarmerMutation";
import {useMutation} from "@apollo/client"

export default function SignUpEmail({ navigation }) {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    role: "",
    phoneNumber: "",
    address: "",
    state: "",
    nationality: "",
    identification: "",
    profileImage: "",
    farmAddress: "",
    farmSize: "",
    cropType: "",
    bankName: "",
    accountNumber: "",
    agentId:"123"
  });

  const [registerFarmer] = useMutation(REGISTER_FARMER);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [idNumber, setIdNumber] = useState("");

  //Date picker
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const router = useRouter();

  const users = [
    { key: "1", value: "Farmer" },
    { key: "2", value: "Extension Agent" },
    { key: "3", value: "Buyer" },
  ];

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleSubmitButton = () => {
    if (role === "Farmer") set;
  };

  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
    setShow(false);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    console.log("farmers:", formData);
    try {
      const { data } = await registerFarmer({
        variables: {
          input: {
            fullName:formData.fullName,
            gender:formData.gender,
            dateOfBirth:formData.dateOfBirth,
            email:formData.email,
            phoneNumber:formData.phoneNumber,
            address:formData.address,
            state:formData.state,
            nationality:formData.nationality,
            identification:formData.identification,
            profileImage:formData.profileImage,
            farmAddress:formData.farmAddress,
            farmSize:formData.farmSize,
            cropType:formData.cropType,
            bankName:formData.bankName,
            accountNumber:formData.accountNumber,
            agentId:formData.agentId,
          },
        },
      });

      console.log("farmers2:", data);
    } catch (error) {
      console.log(error.message);
      
    }
  };

  //Dropdown menu item
  const genderValue = [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>New Farmer</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={true}>
        <KeyboardAvoidingView behvior="padding">
          <View style={styles.formSection}>
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
              <Text style={styles.formLabel}>Phone Number</Text>
              <TextInput
                style={styles.formControl}
                value={formData.phoneNumber}
                placeholder=""
                keyboardType="text"
                onChangeText={(val) => handleChange("phoneNumber", val)}
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
              <Text style={styles.formLabel}>Email</Text>
              <TextInput
                style={styles.formControl}
                value={formData.email}
                placeholder=""
                keyboardType="text"
                placeholder="Enter email if any"
                placeholderTextColor="#aaa"
                onChangeText={(val) => handleChange("email", val)}
              />
            </View>

            {/* <View style={styles.formInput}>
              <Text style={styles.formLabel}>Password</Text>
            </View> */}

            {/* <View style={styles.passwordContainer}>
              <TextInput
                secureTextEntry={!showPassword}
                value={formData.password}
                value={formData.password}
                onChangeText={(val) => handleChange("password", val)}
                style={styles.input}
                placeholder="Enter Password"
                placeholderTextColor="#aaa"
              />
              <MaterialCommunityIcons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#aaa"
                style={styles.icon}
                onPress={toggleShowPassword}
              />
            </View> */}

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
        </KeyboardAvoidingView>
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

  icon: {
    marginLeft: 10,
  },
});

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
// import DateTimePicker from "@react-native-community/datetimepicker";
import AuthContext from "../../context/AuthContext";

export default function SignUpEmail({ navigation }) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Farmer");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(AuthContext);

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
                placeholder=""
                keyboardType="text"
                onChangeText={(val) => setName(val)}
              />
            </View>
            <View style={styles.formInput}>
              <Text style={styles.formLabel}>Phone Number</Text>
              <TextInput
                style={styles.formControl}
                placeholder=""
                keyboardType="text"
                onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
              />
            </View>
            <View style={styles.formInput}>
              <Text style={styles.formLabel}>Gender</Text>
              <SelectList
                setSelected={(val) => setGender(val)}
                data={genderValue}
                save="value"
                style={styles.formInput}
              />
            </View>
            

            <View style={styles.formInput}>
              <Text style={styles.formLabel}>Email</Text>
              <TextInput
                style={styles.formControl}
                placeholder=""
                keyboardType="text"
                onChangeText={(val) => setEmail(val)}
              />
            </View>

            <View style={styles.formInput}>
              <Text style={styles.formLabel}>Password</Text>
            </View>

            <View style={styles.passwordContainer}>
              <TextInput
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(val) => setPassword(val)}
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
    backgroundColor: "#FBF4F7",
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

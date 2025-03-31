import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import {useRouter} from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";

const Signup = () => {
  const [selectedGender, setSelectedGender] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <ScrollView>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <View style={styles.phoneContainer}>
          <Text style={styles.countryCode}>+234</Text>
          <TextInput
            style={styles.phoneInput}
            placeholder="Your mobile number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedGender}
            onValueChange={(itemValue) => setSelectedGender(itemValue)}
            style={styles.input}
          >
            <Picker.Item label="Gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>

        <Text style={styles.termsText}>
          By signing up, you agree to the{" "}
          <TouchableOpacity>
            <Text style={[styles.linkText, { marginBottom: -5 }]}>
              Terms of service
            </Text>
          </TouchableOpacity>{" "}
          and
          <TouchableOpacity>
            <Text style={styles.linkText}> Privacy policy</Text>
          </TouchableOpacity>
          .
        </Text>

        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.socialButtons}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="gmail"
              size={20}
              color="red"
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome
              name="facebook"
              size={20}
              color="blue"
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.signInText}>
          Already have an account?{" "}
          <TouchableOpacity onPress={()=>router.navigate("/auth/login")}>
            <Text style={[styles.linkText, { marginBottom: -5 }]}>Sign in</Text>
          </TouchableOpacity>
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 400,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  countryCode: {
    marginRight: 10,
    fontWeight: "bold",
  },
  phoneInput: {
    flex: 1,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
  termsText: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
  },
  linkText: {
    color: "green",
  },
  signUpButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  signUpText: {
    color: "#fff",
    fontWeight: "bold",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 10,
  },
  orText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  socialIcon: {
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
  },
  signInText: {
    textAlign: "center",
  },
});

export default Signup;

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutations/userMutation";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
import valu3chain from "../assets/images/resources/valu3chain.png";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { data, loading, error }] = useMutation(LOGIN_USER); 
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (name, value) => {
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const { data } = await login({
        variables: {
          input: {
            email: userData.email,
            password: userData.password,
          },
        },
      });

      dispatch(loginSuccess(data.login));

      if (data.login.user.role === "Extention Agent") {
        router.navigate("/agent");
      }

      if (data.login.user.role === "Ecosystem Partner") {
        router.navigate("/partners");
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.brandSection}>
          <Image source={valu3chain} alt="" style={styles.image} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.formSection}>
            <View style={styles.formInput}>
              <Text style={styles.formLabel}>Email Address</Text>
              <TextInput
                style={styles.formControl}
                value={userData.email}
                placeholder="Email Address"
                placeholderTextColor="#aaa"
                keyboardType="text"
                onChangeText={(val) => handleChange("email", val)}
              />
            </View>

            <Text style={styles.formLabel}>Enter Your Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                secureTextEntry={!showPassword}
                value={userData.password}
                onChangeText={(val) => handleChange("password", val)}
                style={styles.input}
                placeholder="Enter Your Password"
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

            <View style={styles.buttonSection}>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <View style={styles.signIn}>
                <Text style={styles.signInText}>
                  Don't have an account?
                  <TouchableOpacity
                    onPress={() => router.navigate("/register")}
                  >
                    <Text style={[styles.linkText, { marginBottom: -5 }]}>
                      Sign up
                    </Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e8f5e4",
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    marginHorizontal: 10,
  },
  header: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  headerTex: { fontSize: 18, fontWeight: 700 },
  brandSection: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 20,
    //borderWidth: 1,
  },
  image: {
    width: 280,
    height: 90,
    marginTop: 20,
  },
  formSection: { flex: 3, marginTop: 20 },
  formInput: { marginBottom: 15 },

  formControl: {
    borderColor: "#666",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#ffffff",
    height: 45,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 14,
    borderColor: "#666",
    borderWidth: 0.5,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    color: "#000",
    paddingVertical: 10,
    paddingRight: 10,
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
  buttonSection: { flex: 1 },
  button: {
    marginVertical: 20,
    backgroundColor: "#508060",
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 16,
  },
  signIn: {
    flexDirection: "row",
    justifyContent: "center",
  },

  linkText: {
    color: "green",
  },

  formLabel: {
    marginBottom: 5,
    marginTop: 5,
    color: "#000",
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    dispatch(login({ email, password }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>Sign in</Text>
        <KeyboardAvoidingView behvior="padding">
          <View style={[styles.formSection, styles.shadowPro]}>
            <View style={styles.formInput}>
              <TextInput
                style={styles.formControl}
                value={email}
                placeholder="Email or Phone Number"
                placeholderTextColor="#aaa"
                keyboardType="text"
                onChangeText={(val) => setEmail(val)}
              />
            </View>

            <View style={styles.passwordContainer}>
              <TextInput
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(val) => setPassword(val)}
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

            <View style={styles.formInput}>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                {loading ? (
                  <ActivityIndicator size="small" color="#0000ff" />
                ) : (
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#ffffff",
                      fontSize: 16,
                    }}
                  >
                    Sign In
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity>
                <Text style={styles.forgottenPassword}>
                  Forgotten Password?
                </Text>
              </TouchableOpacity>
            </View>

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

            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "grey" }}>Don't have an account?</Text>
              <TouchableOpacity
                onPress={() => router.navigate("/auth/signupAgent")}
              >
                <Text style={{ color: "#16B116" }}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },

  contentWrapper: {
    flex: 1,
    paddingTop: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 500,
    marginBottom: 20,
  },

  formSection: {
    paddingHorizontal: 10,
  },

  formControl: {
    borderColor: "#ccc",
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#ffffff",
    fontSize: 16,
    marginVertical: 20,
  },

  button: {
    marginTop: 20,
    backgroundColor: "#16B116",
    borderRadius: 10,
    padding: 10,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 14,
    borderColor: "#ccc",
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

  forgottenPassword: {
    margin: 8,
    color: "#16B116",
    textAlign: "right",
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

export default Login;

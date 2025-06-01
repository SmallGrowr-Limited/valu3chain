import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {signupUser}  from "../../app/auth/authOperations";
import {setError} from "../../redux/slices/authSlice"

import { useQuery, useMutation} from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "../../graphql/queries/userQuery";
import { SIGN_UP } from "../../graphql/mutations/userMutation";


const SignupForm = () => {
  const [email, setEmail] = useState("test@example.com");
  const [role, setRole] = useState("Admin");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileData, setProfileData] = useState({});
  const dispatch = useDispatch();
  // const { role,  setError } = useSelector((state) => state.auth);
  const [signup, { loading, error}] = useMutation(SIGN_UP);
  // const { loading, error, data } = useQuery(GET_AUTHENTICATED_USER);

  // useEffect(()=>{
  //   console.log("Loading:", loading);
  //   console.log("Authenticated User:", data);
  //   console.log("Error:", error);
    
  // },[])

  const userData = {
    email,
    role,
    password,
  };

  const handleSignup = async () => {

    try {
      await signup({
        variables:{
          input: userData
        }
      })
    } catch (error) {
      console.log(error);
      
    }


    if (!role) {
      console.log("Please select user type first");
      dispatch(setError("Please select user type first"));
      return;
    }

    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      
      dispatch(setError("Passwords do not match"));
      return;
    }

    const userData = {
      email,
      password,
      role,
      profileData: getUserSpecificProfileData(),
    };

    dispatch(signupUser(userData));
  };

  const getUserSpecificProfileData = () => {
    if (role === "INVESTOR") {
      return {
        investmentFocus: profileData.investmentFocus || "",
        // other investor-specific fields
      };
    } else if (role === "AGENT") {
      return {
        extensionField: profileData.extensionField || "",
        // other agent-specific fields
      };
    }
    return {};
  };

  const renderUserSpecificFields = () => {
    if (role === "INVESTOR") {
      return (
        <TextInput
          style={styles.input}
          placeholder="Investment Focus"
          value={profileData.investmentFocus || ""}
          onChangeText={(text) =>
            setProfileData({ ...profileData, investmentFocus: text })
          }
        />
      );
    } else if (role === "AGENT") {
      return (
        <TextInput
          style={styles.input}
          placeholder="Extension Field"
          value={profileData.extensionField || ""}
          onChangeText={(text) =>
            setProfileData({ ...profileData, extensionField: text })
          }
        />
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {renderUserSpecificFields()}

      <Button
        title={loading ? "Loading..." : "Sign Up"}
        onPress={handleSignup}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginBottom: 15,
    textAlign: "center",
  },
});

export default SignupForm;

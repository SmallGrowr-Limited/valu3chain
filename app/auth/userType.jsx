import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import React, {useState} from "react";
import { SelectList } from "react-native-dropdown-select-list";
import valu3chain from "../../assets/images/resources/valu3chain.png";
import {useRouter} from "expo-router"

const UserType = () => {
    const [userType, setUserType] = useState("");
    const router = useRouter()

    const userValue = [
      { key: "1", value: "Extention Agent" },
      { key: "2", value: "Ecosystem Partner" },
    ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.brandSection}>
          <Image source={valu3chain} alt="" style={styles.image} />
        </View>
        <View style={styles.formInput}>
          <Text style={styles.formLabel}>Register As</Text>
          <SelectList
            setSelected={(val) => setUserType(val)}
            data={userValue}
            save="value"
          />
        </View>
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.navigate("/auth/signup")}
          >
            <Text style={styles.buttonText}>Proceed</Text>
          </TouchableOpacity>
          <View style={styles.signIn}>
            <Text style={styles.signInText}>
              Already have an account?{" "}
              <TouchableOpacity onPress={() => router.navigate("/auth/login")}>
                <Text style={[styles.linkText, { marginBottom: -5 }]}>
                  Sign in
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  brandSection: {
    flex: 1,
    justifyContent: "center",
    //borderWidth: 1,
  },
  image: {
    width: 280,
    height: 90,
    marginTop:20
  },
  formInput: {
    flex: 3,
    paddingTop: 40,
  },
  formLabel: {
    marginBottom: 10,
    marginTop: 15,
    color: "#666",
    fontSize: 18,
    fontWeight: 700,
  },
  buttonSection: {
    flex: 1,
  },
  button: {
    marginVertical: 20,
    backgroundColor: "#0a990b",
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
});

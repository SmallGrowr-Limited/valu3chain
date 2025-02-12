import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {useRouter} from "expo-router";
import image1 from "../assets/images/resources/img_landing1.png";

const LandingPage = () => {
  const router = useRouter()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={image1} style={styles.image} />
      </View>

      <View style={styles.buttonSection}>
        <View style={styles.highlight}>
          <Text style={styles.highlightText}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis
            magni necessitatibus eligendi dolore.
          </Text>
        </View>
        <TouchableOpacity style={styles.btnSignup} onPress={()=>router.navigate("/auth/signup")}>
          <Text style={{ color: "#fff", fontSize: 16 }}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnLogin} onPress={()=>router.navigate("/auth/login")}>
          <Text style={{ fontSize: 16 }}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  imageContainer: {
    flex: 2,

    marginTop: 20,
    padding: 10,
  },
  image: {
    width: "100%",
    // borderRadius:50,
    // height:350
  },
  buttonSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    // borderWidth: 1,
  },
  btnSignup: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#16B116",
    padding: 10,
    borderRadius: 8,
  },
  btnLogin: {
    borderWidth: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderColor: "#16B116",
    padding: 10,
    borderRadius: 8,
  },

  highlight: {
    alignItems: "center",
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  highlightText: {
    fontSize: 15,
    textAlign: "justify",
    lineHeight: 22,
  },
});

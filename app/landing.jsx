import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from "react-native";
import React from "react";
import {useRouter} from "expo-router";
import bgImage from "../assets/images/resources/onboarding2.png";

const {width, height} = Dimensions.get("window")

const LandingPage = () => {
  const router = useRouter()
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={bgImage} style={styles.contentWrapper}>
        <View style={styles.brandContainer}>
          <Text style={styles.brand}>Valu3Chain</Text>
          <View style={styles.highlight}>
            <Text style={styles.highlightText}>Welcome!!</Text>
            
          </View>
        </View>
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={styles.authButton}
            onPress={() => router.navigate("/auth/signup")}
          >
            <Text style={styles.authButtonText}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.authButton}
            onPress={() => router.navigate("/auth/login")}
          >
            <Text style={styles.authButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    marginTop: height * 0.05,
  },
  brandContainer: {
    flex: 2,
    marginTop: 20,
    padding: 10,
  },

  brand: {
    color: "#ccc",
    fontSize: 18,
    fontStyle: "italic",
    marginBottom: height * 0.09,
    paddingHorizontal: 5,
  },

  highlight: {
    alignItems: "center",
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  highlightText: {
    fontSize: 22,
    textAlign: "justify",
    lineHeight: 22,
    color: "#fff",
  },

  buttonSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    // borderWidth: 1,
  },

  authButton: {
    borderWidth: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderColor: "#16B116",
    padding: 10,
    borderRadius: 8,
  },

  authButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

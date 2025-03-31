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
import BarChartComponent from "../components/chart";
import CarouselComponent from "../components/carousel";
import QuickLinks from "../components/quicklinks";
import Transactions from "../components/transactions";

const {width, height} = Dimensions.get("window");

const LandingPage = () => {
  const router = useRouter()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.brandContainer}>
        <BarChartComponent />
      </View>
      <View>
        <QuickLinks/>
      </View>
      {/* <View style={styles.carousel}>
        <TouchableOpacity onPress={() => router.navigate("/qrcode")}>
          <CarouselComponent />
        </TouchableOpacity>
      </View> */}
      <View>
        <Transactions/>
      </View>
      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={styles.authButton}
          onPress={() => router.navigate("/auth/login")}
        >
          <Text style={styles.authButtonText}>Login</Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "center",
            //borderWidth: 1,
          }}
        >
          <Text style={{ color: "grey" }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.navigate("/auth/signup")}>
            <Text style={{ color: "#16B116" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    flex: 1,
    marginTop: height * 0.06,
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
    backgroundColor: "#16B116",
    borderColor: "#16B116",
    padding: 10,
    borderRadius: 8,
  },

  authButtonText: {
    color: "#fff",
    fontSize: 16,
  },

  carousel: {
    //borderWidth: 1,
    marginTop: height * 0.3,
    marginBottom: 15,
  },

  
});

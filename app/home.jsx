import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView
} from "react-native";
import React from "react";
import {useRouter} from "expo-router";
import BarChartComponent from "../components/charts/barChart";
import CarouselComponent from "../components/carousel";
import QuickLinks from "../components/quicklinks";
import Transactions from "../components/transactions";


const {width, height} = Dimensions.get("window");

const LandingPage = () => {
  const router = useRouter()
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.brandContainer}>
          <BarChartComponent />
        </View>
        <View>
          <QuickLinks />
        </View>
        <View>
          <Transactions />
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
              marginTop: 5,
              flexDirection: "row",
              justifyContent: "center",
              //borderWidth: 1,
            }}
          >
            <Text style={{ color: "grey" }}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.navigate("/auth/userType")}>
              <Text style={{ color: "#16B116" }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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

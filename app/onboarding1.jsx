import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import Image1 from "../assets/images/resources/img_landing1.png";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const Onboarding1 = () => {
  return (
    <ImageBackground source={Image1} style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity>
        <Text style={styles.skip}>Skip</Text>
      </TouchableOpacity>

      {/* Title & Subtitle */}
      <View style={styles.text}>
        <Text style={styles.title}>Anywhere you are</Text>
        <Text style={styles.subtitle}>
          Access Value3chain easily with our easy-to-use mobile app which delivers exceptional services.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.halfColorLeft} />
        <View style={styles.halfColorRight} />
        <TouchableOpacity style={styles.button}>
          <AntDesign name="arrowright" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Onboarding1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  skip: {
    fontSize: 15,
    color: "grey",
    fontWeight: "500",
    marginLeft: width * 0.8,
  },
  text: {
    marginTop: height * 0.35,
    flexDirection: "column",
    width: "100%",
    marginLeft: width * 0.1,
  },
  subtitle: {
    fontSize: 15,
    color: "grey",
    fontWeight: "500",
    width: "80%",
    marginLeft: width * 0.1,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "500",
    marginLeft: width * 0.15,
  },
  buttonContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginTop: height * 0.2,
    overflow: "hidden", 
  },
  halfColorLeft: {
    position: "absolute",
    width: "200%", 
    height: "100%",
    backgroundColor: "white", 
    left: 0,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50, 
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50, 
  },
  halfColorRight: {
    position: "absolute",
    width: "150%",
    height: "100%",
    backgroundColor: "grey", 
    right: 0,
    borderRadius: 50 
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: "green",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
});
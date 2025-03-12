import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import {useRouter} from "expo-router";
import Image1 from "../assets/images/resources/img_landing1.png";
import bgImage from "../assets/images/resources/bg_black.png";


const { width, height } = Dimensions.get('window');

const Onboarding = () => {
  const router = useRouter()
  return (
    <ImageBackground style={styles.container}>
      <Text style={styles.text}>You are</Text>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.imageContainer1}
          onPress={() => router.navigate("/onboarding1")}
        >
          <Image style={styles.image} alt="Image" source={Image1} />
          <Text style={styles.imageText}>Agent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageContainer1}
          onPress={() => router.navigate("/onboarding2")}
        >
          <Image
            style={[styles.image, { borderColor: "indigo" }]}
            alt="Image"
            source={Image1}
          />
          <Text style={styles.imageText}>Partner</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Set up Profile</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center" ,
    padding : 16
  },
  text: {
    fontSize: 15,
    color: 'grey',
    top: height * 0.05,
    fontWeight: 500
  },
  imageContainer: {
    marginTop: height * 0.15,
    flexDirection: 'row',
    width: '90%',
    paddingHorizontal:20
  },
  imageContainer1: {
     flexDirection: 'column',
     marginHorizontal: 25
  },
 image: {
  width: 80,
  height: 80,
  borderWidth: 2,
  borderRadius: 50,
  borderColor: 'green'
 },
 imageText: { 
  marginTop: height * 0.01,
  marginLeft: width * 0.05
 },
 button: {
  marginTop: height * 0.5,
  width: "90%",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 20,
  backgroundColor: "#16B116",
  padding: 10,
  borderRadius: 8,
 },
 buttonText: {
  fontSize: 16,
  color: "#fff",
 }
});

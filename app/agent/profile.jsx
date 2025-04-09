import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react';
import image1 from "../../assets/images/p1.webp";
import { Ionicons, Entypo } from "@expo/vector-icons";

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileImage}>
        <Image source={image1} alt="" style={styles.image} />
        <Text>Aliyu Abubakar</Text>
        <View style={styles.edit}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={styles.details}>
          <View style={styles.personalInfo}>
            <Text style={styles.title}>Personal Information</Text>
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.text}>Gender: Male</Text>
            </View>
            <View style={styles.location}>
              <Ionicons name="location" size={24} color="black" />
              <Text style={styles.text}>Zaria, Kaduna State</Text>
            </View>
            <View style={styles.location}>
              <Entypo name="phone" size={24} color="black" />
              <Text style={styles.text}>+23485663412</Text>
            </View>
            <View style={styles.location}>
              <Entypo name="mail" size={24} color="black" />
              <Text style={styles.text}>aliyuabubakar@gmail.com</Text>
            </View>
            <View style={styles.location}>
              <Entypo name="link" size={24} color="black" />
              <Text style={styles.text}>56447788221</Text>
            </View>
          </View>
          <View style={styles.expertise}>
            <Text style={styles.title}>Experience</Text>
            <View style={styles.column}>
              <Text style={styles.text}>Agent Status:</Text>
              <Text style={styles.text}>tetst</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>Years of Experience:</Text>
              <Text style={styles.text}>16 Years</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>Areas of Expertise:</Text>
              <Text style={styles.text}>Irrigation Farming</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>Relevant certifications:</Text>
              <Text style={styles.text}>BSc Crop Production</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>Preffered Location:</Text>
              <Text style={styles.text}>Zaria, Kaduna</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileImage: {
    alignItems: "center",
    paddingVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
  },
  details: {
    flex: 1,
    padding: 20,
  },
  personalInfo: {
    padding: 10,
    backgroundColor: "#EFECEC",
    borderRadius: 8,
  },
  text: { color: "#333", margin: 5 },
  title: { fontSize: 18, fontWeight: 500, marginBottom: 5 },
  location: { flexDirection: "row", marginVertical: 10 },
  expertise: {
    padding: 10,
    backgroundColor: "#EFECEC",
    borderRadius: 8,
    marginVertical: 20,
  },
  column: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
  },
  edit: { marginTop: 20, borderRadius: 4, backgroundColor: "#1630B1" },
  editButton: {  paddingHorizontal: 10, paddingVertical:5 },
  editText: { color: "#fff", fontSize:12 },
});
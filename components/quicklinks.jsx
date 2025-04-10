import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import {
  SimpleLineIcons,
  Ionicons,
  Fontisto,
  MaterialCommunityIcons,
  FontAwesome6,
} from "@expo/vector-icons";
import {useRouter} from "expo-router"

const { width, height } = Dimensions.get("window");

const QuickLinks = () => {
    const router = useRouter()
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Quick Links</Text>
      </View>
      <View style={styles.quickLinks}>
        <View style={[styles.card25, styles.shadowProp, styles.bgColor]}>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => router.navigate("/qrcode")}
          >
            <Ionicons name="qr-code" size={44} color="#000" />
            <Text style={{ fontWeight: "bol", color: "#f0604a", fontSize: 10 }}>
              Scan Qr-Code
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.card25, styles.shadowProp, styles.bgColor]}>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => router.navigate("/weather")}
          >
            <MaterialCommunityIcons
              name="weather-pouring"
              size={44}
              color="black"
            />
            <Text style={{ fontWeight: "bol", color: "#f0604a", fontSize: 10 }}>
              Weaher Forcast
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.card25, styles.shadowProp, styles.bgColor]}>
          <TouchableOpacity
            style={{ alignItems: "center" }}
            onPress={() => router.navigate("/home")}
          >
            <Ionicons name="folder" size={44} color="#000" />
            <Text style={{ fontWeight: "bol", color: "#f0604a", fontSize: 10 }}>
              Resources
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default QuickLinks;

const styles = StyleSheet.create({
  container: {
    marginTop: height * 0.2,
  },
  header: {
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 700,
    color: "#0a990b",
  },
  quickLinks: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 5,
    // backgroundColor: "#FBF4F7",
  },
  card25: {
    width: "30%",
    padding: 20,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  
  bgColor1: {
    backgroundColor: "#f0604a",
  },
  bgColor2: {
    backgroundColor: "#0a990b",
  },
  bgColor3: {
    backgroundColor: "#ffcc33",
  },
});

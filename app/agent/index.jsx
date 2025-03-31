import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "expo-router";
import {
  SimpleLineIcons,
  Ionicons,
  Fontisto,
  MaterialCommunityIcons,
  FontAwesome6,
} from "@expo/vector-icons";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchBar from "../../components/searchbar";

export default function AgentDashboard() {
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [assignedFarmers, setAssignedFarmers] = useState(0);
  const [facilitatedTransactions, setFacilitatedTransactions] = useState(0);
  const router = useRouter();

  const { city, setUser } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.notifications}>
        <View style={{ width: "90%", color: "#0a990b" }}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </View>

        <Ionicons name="notifications-circle" size={30} color="#000" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrapper}>
          <View></View>
          <View style={styles.statsSection}>
            <TouchableOpacity
              style={[styles.stats, styles.shadowProp, styles.bgColor]}
              onPress={() => router.navigate("/agent")}
            >
              <Text style={styles.statsValue}>{assignedFarmers}</Text>
              <Text style={styles.statsCaption}> Total Farmers </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.stats, styles.shadowProp, styles.bgColor1]}
            >
              <Text style={styles.statsValue}>{facilitatedTransactions}</Text>
              <Text style={styles.statsCaption}>Pending Task</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#508020",
                marginTop: 25,
                paddingLeft: 5,
              }}
            >
              Quick Actions
            </Text>
          </View>
          <View style={[styles.servicesSection]}>
            <View style={[styles.card24, styles.shadowProp, styles.bgColor1]}>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => router.navigate("/agent/onboardfarmer")}
              >
                <Ionicons name="people" size={54} color="#fff" />
                <Text
                  style={{ fontWeight: "bol", color: "#fff", fontSize: 10 }}
                >
                  Farmers
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.card24, styles.shadowProp, styles.bgColor2]}>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => router.navigate("/")}
              >
                <Fontisto name="line-chart" size={44} color="#fff" />
                <Text style={{ marginTop: 5, color: "#fff", fontSize: 10 }}>
                  Input Request
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.servicesSection]}>
            <View style={[styles.card24, styles.shadowProp, styles.bgColor2]}>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => router.navigate("/")}
              >
                <Fontisto name="line-chart" size={44} color="#fff" />
                <Text style={{ marginTop: 5, color: "#fff", fontSize: 10 }}>
                  Farm Audit
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.card24, styles.shadowProp, styles.bgColor1]}>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => router.navigate("/agent/onboardfarmer")}
              >
                <Ionicons name="people" size={54} color="#fff" />
                <Text
                  style={{ fontWeight: "bol", color: "#fff", fontSize: 10 }}
                >
                  Aggregaion
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.servicesSection]}>
            <View style={[styles.card25, styles.shadowProp]}>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => router.navigate("/")}
              >
                <SimpleLineIcons name="size-actual" size={34} color="#0a990b" />
                <Text
                  style={{ fontWeight: "bol", color: "#f0604a", fontSize: 10 }}
                >
                  Market Price
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.card25, styles.shadowProp]}>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => router.navigate("/agent")}
              >
                <FontAwesome6 name="plant-wilt" size={34} color="#0a990b" />
                <Text
                  style={{ fontWeight: "bol", color: "#f0604a", fontSize: 10 }}
                >
                  Input Dist.
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.card25, styles.shadowProp]}>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => router.navigate("/agent")}
              >
                <Ionicons name="flash" size={34} color="#0a990b" />
                <Text
                  style={{ fontWeight: "bol", color: "#f0604a", fontSize: 10 }}
                >
                  Resources
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.card27, styles.shadowProp]}>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => router.navigate("/resources")}
              >
                <Ionicons name="folder" size={34} color="#0a990b" />
                <Text
                  style={{ fontWeight: "bol", color: "#f0604a", fontSize: 10 }}
                >
                  Support
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.card27, styles.shadowProp]}>
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => router.navigate("/weather")}
              >
                <MaterialCommunityIcons
                  name="weather-pouring"
                  size={34}
                  color="#0a990b"
                />
                <Text
                  style={{ fontWeight: "bol", color: "#f0604a", fontSize: 10 }}
                >
                  Weather
                </Text>
              </TouchableOpacity>
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
    backgroundColor: "#FBF4F7",
  },

  contentWrapper: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FBF4F7",
  },

  notifications: {
    padding: 20,
    flexDirection: "row",
    //justifyContent: "center",
    marginTop: 10,
  },

  shadowProp: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 0.5,
  },

  servicesSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: "#FBF4F7",
  },

  card24: {
    width: "46%",
    padding: 20,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
  },

  card25: {
    width: "30%",
    backgroundColor: "#fff",
    padding: 20,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
  },

  card26: {
    width: "46%",
    padding: 20,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  card27: {
    width: "46%",
    backgroundColor: "#fff",
    padding: 20,
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
  },

  statsSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: "#fff",
  },

  stats: {
    width: "46%",
    backgroundColor: "#0a990b",
    padding: 20,
    margin: 5,
    borderRadius: 8,
    alignItems: "center",
  },

  statsCaption: {
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
  },

  statsValue: {
    color: "#fff",
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },

  statsIcon: {
    color: "#000",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
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

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchBar from "../../components/searchbar";
import { quickAccess } from "./data";

export default function AgentDashboard() {
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("Fatima Aliyu");
  const [profilePicture, setProfilePicture] = useState(null);
  const [assignedFarmers, setAssignedFarmers] = useState(25);
  const [task, setTask] = useState(4);
  const [auditedFarms, setAuditedFarms] = useState(18);
  const router = useRouter();

  //const { city, setUser } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const farmers = [
    {
      id: "1",
      name: "Idris Ahmed",
      community: "Kanam",
      crop: "Sorghum",
      season: "Dry Season",
    },
    {
      id: "2",
      name: "Aisha Ibrahim",
      community: "Shanono",
      crop: "Maize",
      season: "Rainfed",
    },
    {
      id: "3",
      name: "Gloria Mark",
      community: "Shika",
      crop: "Soya Beans",
      season: "Rainfed",
    },
    {
      id: "4",
      name: "Aliyu Abubakar",
      community: "Zaria",
      crop: "Cabbages",
      season: "Dry Season",
    },
    {
      id: "5",
      name: "Sadiya Umar",
      community: "Zaria",
      crop: "Tomatoes",
      season: "Dry Season",
    },
    {
      id: "6",
      name: "Musa Mai Shanu",
      community: "Gusau",
      crop: "Millet",
      season: "Rainfed",
    },
    {
      id: "7",
      name: "Yakubu Dauda",
      community: "Adamami",
      crop: "Onion",
      season: "Rainfed",
    },
    {
      id: "8",
      name: "Shamsuddeen Aliyu",
      community: "Tureta",
      crop: "Maize",
      season: "Rainfed",
    },
    {
      id: "9",
      name: "Emmanuel James",
      community: "Goronyo",
      crop: "Rice",
      season: "Dry Season",
    },
    {
      id: "10",
      name: "Esther Bayero",
      community: "Sabon birni",
      crop: "Garlic",
      season: "Rainfed",
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.rowItem}>
      <View style={styles.nameFieldWrap}>
        <Text style={styles.field}>{item.name}</Text>
        <Text style={styles.location}>Location: {item.community}</Text>
      </View>
      <View style={styles.cropFieldWrap}>
        <Text style={styles.field}>{item.crop}</Text>
        <Text
          style={[
            item.season == "Rainfed"
              ? styles.rainfedSeasonFont
              : styles.drySeasonFont,
          ]}
        >
          {item.season}
        </Text>
      </View>
      <View style={styles.btnFieldWrap}>
        <TouchableOpacity>
          <Text style={{color:"#fff"}}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.notifications}>
        <View>
          <Text style={styles.userName}>{fullName}</Text>
        </View>

        <Ionicons name="notifications-circle" size={30} color="#000" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrapper}>
          {/* <View style={{ width: "100%", color: "#0a990b" }}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </View> */}
          <View>
            <Text style={styles.sectionTitle}>Statistics</Text>
            <View style={styles.columns}>
              <TouchableOpacity
                style={[styles.stats, styles.shadowPro, styles.bgColor2]}
                onPress={() => router.navigate("/agent")}
              >
                <Text style={styles.statsValue}>{assignedFarmers}</Text>
                <Text style={styles.statsCaption}> Total Farmers </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.stats, styles.shadowPro, styles.bgColor2]}
              >
                <Text style={styles.statsValue}>{task}</Text>
                <Text style={styles.statsCaption}>Pending Task</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.stats, styles.shadowPro, styles.bgColor2]}
              >
                <Text style={styles.statsValue}>{auditedFarms}</Text>
                <Text style={styles.statsCaption}>Audited Farms</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text style={styles.sectionTitle}>Quick Access</Text>
            <View style={styles.columns}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {quickAccess.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={styles.quickAccessItem}
                      onPress={item.path}
                      key={index}
                    >
                      <View style={styles.quickAccessIcon}>{item.icon}</View>
                      <Text style={styles.quickAccessText}> {item.title} </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>

          <View style={styles.listItem}>
            <FlatList
              data={farmers}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FBF4F7" },
  contentWrapper: { flex: 1, padding: 10 },
  notifications: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  userName: { fontSize: 18, fontWeight: 500, color: "#f0604a" },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 500,
    color: "#0a990b",
    paddingHorizontal: 5,
  },
  columns: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 5,
    // backgroundColor: "#fff",
  },

  stats: {
    width: "30%",
    backgroundColor: "#fff",
    padding: 15,
    margin: 5,
    borderRadius: 8,
    alignItems: "center",
  },

  statsCaption: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    // fontWeight: "bold",
  },

  statsValue: {
    color: "#fff",
    textAlign: "center",
    fontSize: 22,
    // fontWeight: "bold",
  },

  statsIcon: {
    color: "#000",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },

  quickAccess: {},
  quickAccessItem: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  quickAccessIcon: {
    backgroundColor: "#f0604a",
    // padding: 10,
    borderRadius: 50,
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  quickAccessText: { fontSize: 14, textAlign: "center", marginTop: 5 },

  shadowProp: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 0.5,
  },
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    marginBottom: 5,
    paddingVertical: 10,
    width: "100%",
  },
  listItem: {
    marginTop: 20,
    padding: 10,
  },

  field: {
    fontSize: 16,
  },
  nameFieldWrap: {
    width: "40%",
  },
  btnFieldWrap: {
    borderRadius: 4,
    paddingHorizontal:10,
    paddingVertical:3,
    backgroundColor:"#321DF1",

    // width: "30%",
  },
  cropFieldWrap: {
    // borderWidth: 1,
    width: "30%",
  },
  drySeasonFont: {
    fontSize: 12,
    color: "#f0604a",
  },

  rainfedSeasonFont: {
    fontSize: 12,
    color: "#0a990b",
  },

  location: { fontSize: 12 },

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

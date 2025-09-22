import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../components/searchbar";

export default function Farmers() {
  const farmers = useSelector((state) => state.farmer.allFarmers);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredFarmers = farmers.filter((farmer) => {
    let searchLower = searchQuery.toLowerCase();
    return (
      farmer.fullName.toLowerCase().includes(searchLower) ||
      farmer.address.toLowerCase().includes(searchLower) ||
      farmer.cropType.toLowerCase().includes(searchLower)
    );
  });

  const renderItem = ({ item }) => (
    <View style={styles.rowItem}>
      <View style={styles.nameFieldWrap}>
        <Text style={styles.field}>{item.fullName}</Text>
        <Text style={styles.location}>Location: {item.address}</Text>
      </View>
      <View style={styles.cropFieldWrap}>
        <Text style={styles.field}>{item.cropType}</Text>
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
          <Text style={{ color: "#fff" }}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrapper}>
          <View style={styles.listItem}>
            <FlatList
              data={filteredFarmers}
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
  container: { flex: 1, backgroundColor: "#ffffff" },
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
    paddingHorizontal: 5,
  },
  columns: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 5,
    marginBottom: 10,
  },

  stats: {
    width: "30%",
    backgroundColor: "#508060",
    padding: 15,
    margin: 5,
    borderRadius: 8,
    alignItems: "center",
  },

  statsCaption: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },

  statsValue: {
    color: "#fff",
    textAlign: "center",
    fontSize: 22,
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
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "#321DF1",

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
});

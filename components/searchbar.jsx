import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <View style={styles.searchSection}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search "
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {/* <Ionicons name="search" size={24} color="black" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    padding: 8,
    margin: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
  },

  searchBar: {
    width: "100%",
    padding: 5,
    // borderWidth: 1,
  },
});

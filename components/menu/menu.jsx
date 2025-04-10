import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { Entypo } from "@expo/vector-icons";

export default function MenuComponent() {
  return (
    <MenuProvider style={styles.container}>
      <Menu>
        <MenuTrigger
          customStyles={{
            triggerWrapper: {
              top: -20,
            },
          }}
        >
          <Entypo name="menu" size={24} color="black" />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              borderRadius: 10,
              borderWidth: 1,
              // height: StyleSheet.hairlineWidth,
              // backgroundColor: "#7F8487",
            },
          }}
        >
          <MenuOption onSelect={() => alert(`Save`)} text="Save" />
          <MenuOption onSelect={() => alert(`Delete`)} text="Delete" />
        </MenuOptions>
      </Menu>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    flexDirection: "column",
  },
});
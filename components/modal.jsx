import React, { useState, useContext, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Easing,
  Dimensions,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { Link, useRouter } from "expo-router";
import {
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import Animated from "react-native-reanimated";


const { height } = Dimensions.get("window");

const SlideUpModal = ({
  modalVisible,
  setModalVisible,
  closeModal,
  animatedContainerStyle,
  animatedBackdropStyle,
}) => {
  

  return (
    <View style={styles.containe}>
      <Modal
        transparent
        visible={modalVisible}
        animationType="none"
        onRequestClose={closeModal}
      >
        <TouchableOpacity style={styles.backdrop} onPress={closeModal} />
        <Animated.View style={[styles.backdrop]} />
        <Animated.View style={[styles.modalContainer, animatedContainerStyle]}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={closeModal}>
              <Ionicons name="close-circle" size={28} color="red" />
            </TouchableOpacity>
          </View>

          <View style={styles.contentWrapper}>
            <View style={styles.investments}>
              <TouchableOpacity style={styles.button}>
                <MaterialIcons name="attach-money" size={24} color="#0a990b" />
                <Text style={styles.buttonText}>Fund Allocation</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Ionicons name="apps" size={24} color="#0a990b" />
                <Text style={styles.buttonText}>Input Distribution </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Ionicons name="mail-sharp" size={24} color="#0a990b" />
                <Text style={styles.buttonText}>Manage Investment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FBF4F7",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  modalContent: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#ff4d4d",
    padding: 15,
    borderRadius: 8,
  },

  contentWrapper: {
    flex: 1,
    // paddingTop: 20,
  },

  button: {
    marginVertical: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    borderColor: "#0a990b",
    borderWidth:1,
    flexDirection:"row",
    
  },
  buttonText: {
    // textAlign: "center",
    color: "#000",
    fontSize: 16,
    marginHorizontal:5,
  },
});

export default SlideUpModal;

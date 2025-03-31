import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableOpacity,
  AppState,
  Linking,
} from "react-native";
import React,{useState, useRef} from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

const QrCodeScanner = () => {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const [permission, requestPermission] = useCameraPermissions();
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>

        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  
  return (
    <SafeAreaView style={styles.container}>
      <CameraView style={styles.camera} facing="back" onBarcodeScanned={()=>console.log("scanning")} />
    </SafeAreaView>
  );
}

export default QrCodeScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
   message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

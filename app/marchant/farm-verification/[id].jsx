// app/farm-verification/[id].tsx
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
//import MapView, { Marker } from "react-native-maps";
import { styles } from "../../../components/constants/styles";
import { useState } from "react";

export default function FarmVerification({ route }) {
  const { id } = route.params;
  const [farmSize, setFarmSize] = useState("");
  const [coordinates, setCoordinates] = useState({
    latitude: -1.2921,
    longitude: 36.8219,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleMapPress = (e) => {
    setCoordinates({
      ...coordinates,
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Farm Verification</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Farm Location</Text>
        <View style={styles.mapContainer}>
          {/* <MapView
            style={styles.map}
            initialRegion={coordinates}
            onPress={handleMapPress}
          >
            <Marker coordinate={coordinates} />
          </MapView> */}
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Farm Size (acres)</Text>
        <TextInput
          style={styles.input}
          value={farmSize}
          onChangeText={setFarmSize}
          keyboardType="numeric"
          placeholder="Enter farm size in acres"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Ownership Proof</Text>
        <TouchableOpacity style={styles.uploadButton}>
          <Text style={styles.uploadText}>Upload Document</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.buttonText}>Submit Verification</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

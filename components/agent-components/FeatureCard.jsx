import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "./constants/colors";
import { useRouter } from "expo-router";

export default function FeatureCard({ title, icon, color, route }) {
  const router = useRouter()
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color }]}
      onPress={() => router.push(`${route}`)}
    >
      <Ionicons name={icon} size={24} color={colors.white} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  
  container: {
    width: "46%",
    padding: 15,
    margin: 5,
    borderRadius: 8,
    // alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
});

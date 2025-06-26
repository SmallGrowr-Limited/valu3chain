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
    width: "48%", // slightly increased width for better balance
    paddingVertical: 18,
    paddingHorizontal: 12,
    marginVertical: 8,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4, // subtle shadow
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
    marginTop: 8,
    textAlign: "center",
  },
});

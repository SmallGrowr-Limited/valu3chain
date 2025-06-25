import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "./constants/colors";

export default function MetricCard({ title, value, trend, icon }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={20} color={colors.primary} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.trend}>
        {trend} <Ionicons name="trending-up" size={14} color={colors.success} />
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "30%",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    elevation: 2,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.lightPrimary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.dark,
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 4,
  },
  trend: {
    fontSize: 12,
    color: colors.success,
  },
});

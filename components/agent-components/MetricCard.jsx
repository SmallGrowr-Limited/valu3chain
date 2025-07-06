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
        {/* {trend} <Ionicons name="trending-up" size={14} color={colors.success} /> */}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "32%",
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
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
    fontSize: 22,
    fontWeight: "700",
    color: colors.dark,
    marginBottom: 6,
  },
  title: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 6,
  },
  trend: {
    fontSize: 14,
    color: colors.success,
    flexDirection: "row",
    alignItems: "center",
  },
});

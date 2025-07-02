import { StyleSheet, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

export default function PerformanceCard({ title, value, trend }) {
  const { colors } = useTheme();

  const getIcon = () => {
    if (trend === "up") {
      return <Icon source="trending-up" size={24} color="#4CAF50" />;
    } else if (trend === "down") {
      return <Icon source="trending-down" size={24} color="#F44336" />;
    }
    return null;
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <Text variant="labelLarge" style={styles.title}>
        {title}
      </Text>
      <View style={styles.valueRow}>
        <Text variant="headlineMedium" style={styles.value}>
          {value}
        </Text>
        {getIcon()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    elevation: 2,
    minWidth: "30%",
  },
  title: {
    marginBottom: 8,
    color: "#666",
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    marginRight: 8,
    fontWeight: "bold",
  },
});

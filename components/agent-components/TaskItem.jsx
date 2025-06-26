import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "./constants/colors";

export default function TaskItem({ title, farmer, status, dueDate, priority }) {
  const getStatusColor = () => {
    switch (status) {
      case "Pending":
        return colors.warning;
      case "In Progress":
        return colors.info;
      case "Completed":
        return colors.success;
      default:
        return colors.gray;
    }
  };

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.leftContainer}>
        <View
          style={[
            styles.statusIndicator,
            { backgroundColor: getStatusColor() },
          ]}
        />
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.farmer}>{farmer}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.dueDate}>{dueDate}</Text>
        {priority === "High" && (
          <View style={styles.priorityBadge}>
            <Text style={styles.priorityText}>!</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  statusIndicator: {
    width: 6,
    height: 48,
    borderRadius: 3,
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.dark,
    marginBottom: 2,
  },
  farmer: {
    fontSize: 14,
    color: colors.gray,
  },
  rightContainer: {
    alignItems: "flex-end",
    marginLeft: 12,
  },
  dueDate: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 6,
  },
  priorityBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.danger,
    justifyContent: "center",
    alignItems: "center",
  },
  priorityText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 14,
  },
});

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
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIndicator: {
    width: 8,
    height: 40,
    borderRadius: 4,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark,
    marginBottom: 4,
  },
  farmer: {
    fontSize: 12,
    color: colors.gray,
  },
  rightContainer: {
    alignItems: "flex-end",
  },
  dueDate: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 4,
  },
  priorityBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.danger,
    justifyContent: "center",
    alignItems: "center",
  },
  priorityText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 12,
  },
});

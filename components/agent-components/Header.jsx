import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "./constants/colors";
import { useRouter } from "expo-router";

export default function Header({ title, rightAction }) {
  const router = useRouter()
  return (
    <View style={styles.container}>
      {rightAction}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.iconsContainer}>
        <TouchableOpacity>
          <Ionicons name="notifications" size={24} color={colors.dark} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.dark,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  profileButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.lightPrimary,
    justifyContent: "center",
    alignItems: "center",
  },
});

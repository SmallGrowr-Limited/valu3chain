import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Text, useTheme } from "react-native-paper";

export default function FarmerCard({ farmer, onPress, isSelected }) {
  const { colors } = useTheme();

  const getAvatarText = (name) => {
    const names = name.split(" ");
    return names
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <TouchableOpacity onPress={() => onPress(farmer)}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: isSelected
              ? colors.primaryContainer
              : colors.surface,
            borderColor: isSelected ? colors.primary : "#e0e0e0",
          },
        ]}
      >
        <Avatar.Text
          size={48}
          label={getAvatarText(farmer.name)}
          style={{ backgroundColor: isSelected ? colors.primary : "#ccc" }}
          color="#fff"
        />
        <View style={styles.details}>
          <Text
            variant="titleMedium"
            style={isSelected && { color: colors.primary }}
          >
            {farmer.name}
          </Text>
          <Text variant="bodySmall">ID: {farmer.id}</Text>
          <Text variant="bodySmall">
            {farmer.location} • {farmer.farmSize}
          </Text>
          <Text variant="bodySmall">Crops: {farmer.crops}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  details: {
    marginLeft: 16,
  },
});

// components/StatsCard.tsx
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { Colors } from "../constants/colors";

interface StatsCardProps {
  title: string;
  value: string;
  icon?: string;
  iconType?: "ionicons" | "material" | "fontawesome";
  trend?: "up" | "down" | "neutral";
  changePercentage?: string;
  onPress?: () => void;
}

export default function StatsCard({
  title,
  value,
  icon = "stats-chart",
  iconType = "ionicons",
  trend = "neutral",
  changePercentage,
  onPress,
}: StatsCardProps) {
  const renderIcon = () => {
    const iconSize = 24;
    const iconColor = Colors.primary;

    switch (iconType) {
      case "material":
        return (
          <MaterialCommunityIcons
            name={icon}
            size={iconSize}
            color={iconColor}
          />
        );
      case "fontawesome":
        return <FontAwesome name={icon} size={iconSize} color={iconColor} />;
      default:
        return <Ionicons name={icon} size={iconSize} color={iconColor} />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return Colors.success;
      case "down":
        return Colors.error;
      default:
        return Colors.success;
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return "trending-up";
      case "down":
        return "trending-down";
      default:
        return "remove";
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>{renderIcon()}</View>

      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.value}>{value}</Text>
      </View>

      {changePercentage && (
        <View
          style={[
            styles.trendContainer,
            { backgroundColor: getTrendColor() + "20" },
          ]}
        >
          <Ionicons
            name={getTrendIcon()}
            size={16}
            color={getTrendColor()}
            style={styles.trendIcon}
          />
          <Text style={[styles.trendText, { color: getTrendColor() }]}>
            {changePercentage}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flex: 1,
    minHeight: 100,
  },
  iconContainer: {
    backgroundColor: Colors.primaryLight,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  value: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  trendContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  trendIcon: {
    marginRight: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: "600",
  },
});

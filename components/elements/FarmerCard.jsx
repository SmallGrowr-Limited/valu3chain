// components/FarmerCard.tsx
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import { styles } from "../constants/styles";
import {Colors} from "../constants/colors";

export default function FarmerCard({ farmer }) {
  return (
    <Link href={`/farmer-onboarding/${farmer.id}`} asChild>
      <TouchableOpacity style={styles.card}>
        <Image
          source={{ uri: farmer.photo || "https://via.placeholder.com/50" }}
          style={styles.avatar}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{farmer.name}</Text>
          <Text style={styles.cardSubtitle}>{farmer.location}</Text>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusIndicator,
                { backgroundColor: farmer.verified ? "#4CAF50" : "#FFC107" },
              ]}
            />
            <Text style={styles.statusText}>
              {farmer.verified ? "Verified" : "Pending Verification"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

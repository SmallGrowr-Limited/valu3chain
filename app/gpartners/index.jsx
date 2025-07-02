import { useRouter } from "expo-router";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const features = [
    {
      title: "Investment Setup",
      screen: "gpartners/investment-setup",
      icon: "cash",
    },
    {
      title: "Fund Allocation",
      screen: "gpartners/fund-allocation",
      icon: "chart-pie",
    },
    {
      title: "Farmer Categorization",
      screen: "gpartners/farmer-categorization",
      icon: "account-group",
    },
    {
      title: "Fund Disbursement",
      screen: "gpartners/fund-disbursement",
      icon: "hand-coin",
    },
    {
      title: "ROI Tracking",
      screen: "gpartners/roi-tracking",
      icon: "trending-up",
    },
    { title: "Monitoring", screen: "gpartners/monitoring", icon: "chart-line" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text
        variant="headlineMedium"
        style={[styles.title, { color: colors.primary }]}
      >
        Agricultural Investment Portal
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Manage your agricultural investments and track returns
      </Text>

      <View style={styles.grid}>
        {features.map((feature, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(feature.screen)}
            style={styles.cardContainer}
          >
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Text variant="titleLarge" style={styles.cardText}>
                  {feature.title}
                </Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    // backgroundColor: "#f5f7fa",
  },
  title: {
    marginBottom: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    marginBottom: 24,
    textAlign: "center",
    color: "#666",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardContainer: {
    width: "48%",
    marginBottom: 16,
  },
  card: {
    height: 120,
    justifyContent: "center",
    elevation: 3,
  },
  cardContent: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  cardText: {
    textAlign: "center",
  },
});

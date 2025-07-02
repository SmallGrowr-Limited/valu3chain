import { View, ScrollView, Text, StyleSheet } from "react-native";
import FarmProgress from "../../../components/elements/FarmProgress";
import AnalyticsChart from "../../../components/elements/AnalyticsChart";
import { Colors } from "../../../components/constants/colors";
import { monitoringData } from "../../../components/constants/data"; 
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Monitoring() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.navigate("/ecosystem/home")}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}></Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.title}>Performance Monitoring</Text>

      <Text style={styles.sectionTitle}>Input Distribution Status</Text>
      <FarmProgress data={monitoringData.distribution} />

      <Text style={styles.sectionTitle}>Farm Progress Updates</Text>
      {monitoringData.updates.map((update, index) => (
        <View key={index} style={styles.updateCard}>
          <Text style={styles.updateTitle}>{update.farm}</Text>
          <Text style={styles.updateText}>{update.status}</Text>
          <Text style={styles.updateDate}>{update.date}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Market Analytics</Text>
      <AnalyticsChart
        height={250}
        type="bar"
        title="Performance by Crop Type"
        data={monitoringData.analytics.cropType}
      />
      <AnalyticsChart
        height={250}
        type="line"
        title="Performance by Location"
        data={monitoringData.analytics.location}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // ... monitoring-specific styles
});

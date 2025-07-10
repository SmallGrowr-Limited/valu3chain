import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import Header from "../../../components/agent-components/Header";
import MetricCard from "../../../components/agent-components/MetricCard";
import FeatureCard from "../../../components/agent-components/FeatureCard";
import TaskItem from "../../../components/agent-components/TaskItem";
//import { colors } from "../../../components/agent-components/constants/colors";
import {
  metrics,
  features,
  tasks,
} from "../../../components/agent-components/constants/data";

export default function Dashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header title="Dashboard" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Metrics Section */}
        <View style={styles.metricsContainer}>
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              // trend={metric.trend}
              icon={metric.icon}
            />
          ))}
        </View>

        {/* Features Section */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <FeatureCard
              title={feature.title}
              icon={feature.icon}
              color={feature.color}
              route={feature.route}
            />
          ))}
        </View>

        {/* Tasks Section */}
        <Text style={styles.sectionTitle}>Recent Tasks</Text>
        <View style={styles.tasksContainer}>
          {tasks.map((task, index) => (
            <TaskItem
              key={index}
              title={task.title}
              farmer={task.farmer}
              status={task.status}
              dueDate={task.dueDate}
              priority={task.priority}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const colors = {
  primary: "#3A7D44", // Earthy green - represents agriculture and growth
  primaryLight: "#E8F5E9",
  primaryDark: "#2B5E35",
  secondary: "#FF9E1B", // Amber for important actions
  background: "#F8FAF8", // Very light green tint
  white: "#FFFFFF",
  cardBg: "#FFFFFF",
  textPrimary: "#263238", // Dark blue-gray
  textSecondary: "#455A64",
  textTertiary: "#718096",
  border: "#E2E8F0",
  success: "#388E3C",
  warning: "#F57C00",
  error: "#D32F2F",
  info: "#0288D1",
  highlight: "#FFF9C4",
  urgent: "#E53935",
  highPriority: "#FB8C00",
  normalPriority: "#039BE5",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // Ensure this is a light neutral color for good contrast
  },
  scrollContainer: {
    padding: 20, // Slightly increased padding for better spacing
    paddingBottom: 40,
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28, // Increased margin for separation
  },
  sectionTitle: {
    fontSize: 20, // Slightly larger for better hierarchy
    fontWeight: "700",
    color: colors.dark,
    marginBottom: 16,
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  tasksContainer: {
    marginBottom: 24,
  },
});

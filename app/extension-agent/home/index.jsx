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
import { colors } from "../../../components/agent-components/constants/colors";
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
              trend={metric.trend}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.dark,
    marginBottom: 12,
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 5,
    marginBottom: 10,
    // flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "space-between",
    // marginBottom: 24,
    // borderWidth:1
  },
  tasksContainer: {
    marginBottom: 16,
  },
});

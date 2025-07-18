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

// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import { useRouter } from "expo-router";
// import {
//   MaterialCommunityIcons,
//   FontAwesome,
//   Ionicons,
//   Feather,
// } from "@expo/vector-icons";
// import Header from "../../../components/agent-components/Header";
// import MetricCard from "../../../components/agent-components/MetricCard";
// import FeatureCard from "../../../components/agent-components/FeatureCard";
// import TaskItem from "../../../components/agent-components/TaskItem";
// import {
//   metrics,
//   features,
//   tasks,
// } from "../../../components/agent-components/constants/data";

// export default function Dashboard() {
//   const router = useRouter();

//   // Updated metrics with modern icons
//   const updatedMetrics = [
//     {
//       title: "Farmers",
//       value: "245",
//       icon: <FontAwesome name="users" size={20} color={colors.primary} />,
//       trend: "up",
//     },
//     {
//       title: "Visits",
//       value: "48",
//       icon: (
//         <MaterialCommunityIcons
//           name="calendar-check"
//           size={20}
//           color={colors.info}
//         />
//       ),
//       trend: "up",
//     },
//     {
//       title: "Inputs",
//       value: "126",
//       icon: (
//         <MaterialCommunityIcons
//           name="sprout"
//           size={20}
//           color={colors.success}
//         />
//       ),
//       trend: "neutral",
//     },
//     {
//       title: "Tasks",
//       value: "7",
//       icon: (
//         <MaterialCommunityIcons
//           name="clipboard-list"
//           size={20}
//           color={colors.warning}
//         />
//       ),
//       trend: "down",
//     },
//   ];

//   // Updated features with modern icons and actions
//   const updatedFeatures = [
//     {
//       title: "New Farmer",
//       icon: <FontAwesome name="user-plus" size={24} color={colors.white} />,
//       color: colors.primary,
//       route: "/extension-agent/farmers/add",
//     },
//     {
//       title: "Schedule Visit",
//       icon: (
//         <MaterialCommunityIcons
//           name="calendar-plus"
//           size={24}
//           color={colors.white}
//         />
//       ),
//       color: colors.info,
//       route: "/extension-agent/visits/schedule",
//     },
//     {
//       title: "Input Request",
//       icon: (
//         <MaterialCommunityIcons
//           name="cart-plus"
//           size={24}
//           color={colors.white}
//         />
//       ),
//       color: colors.secondary,
//       route: "/extension-agent/inputs/request",
//     },
//     {
//       title: "Reports",
//       icon: <Feather name="bar-chart-2" size={24} color={colors.white} />,
//       color: colors.success,
//       route: "/extension-agent/reports",
//     },
//   ];

//   return (
//     <View style={styles.container}>
//       <Header
//         title="Dashboard"
//         rightAction={
//           <TouchableOpacity
//             onPress={() => router.push("/extension-agent/notifications")}
//           >
//             <Ionicons
//               name="notifications-outline"
//               size={24}
//               color={colors.textPrimary}
//             />
//             <View style={styles.notificationBadge}>
//               <Text style={styles.notificationText}>3</Text>
//             </View>
//           </TouchableOpacity>
//         }
//       />

//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Welcome Section */}
//         <View style={styles.welcomeContainer}>
//           <Text style={styles.welcomeText}>Hello, Extension Agent!</Text>
//           <Text style={styles.subWelcomeText}>Here's your daily overview</Text>
//         </View>

//         {/* Metrics Section */}
//         <View style={styles.metricsContainer}>
//           {updatedMetrics.map((metric, index) => (
//             <MetricCard
//               key={index}
//               title={metric.title}
//               value={metric.value}
//               trend={metric.trend}
//               icon={metric.icon}
//             />
//           ))}
//         </View>

//         {/* Quick Actions Section */}
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Quick Actions</Text>
//           <TouchableOpacity>
//             <Text style={styles.seeAllText}>See All</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.featuresContainer}>
//           {updatedFeatures.map((feature, index) => (
//             <FeatureCard
//               key={index}
//               title={feature.title}
//               icon={feature.icon}
//               color={feature.color}
//               route={feature.route}
//             />
//           ))}
//         </View>

//         {/* Tasks Section */}
//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Recent Tasks</Text>
//           <TouchableOpacity>
//             <Text style={styles.seeAllText}>See All</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.tasksContainer}>
//           {tasks.map((task, index) => (
//             <TaskItem
//               key={index}
//               title={task.title}
//               farmer={task.farmer}
//               status={task.status}
//               dueDate={task.dueDate}
//               priority={task.priority}
//             />
//           ))}
//         </View>

//         {/* Weather/News Section */}
//         <View style={styles.infoCard}>
//           <View style={styles.infoHeader}>
//             <MaterialCommunityIcons
//               name="weather-partly-cloudy"
//               size={24}
//               color={colors.info}
//             />
//             <Text style={styles.infoTitle}>Weather Advisory</Text>
//           </View>
//           <Text style={styles.infoText}>
//             Expect moderate rainfall in your region tomorrow. Advise farmers to
//             prepare their fields accordingly.
//           </Text>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const colors = {
//   primary: "#2E7D32", // Deep green - represents agriculture and growth
//   primaryLight: "#E8F5E9",
//   primaryDark: "#1B5E20",
//   secondary: "#FF9800", // Amber for important actions
//   background: "#F5F9F5", // Very light green tint
//   white: "#FFFFFF",
//   cardBg: "#FFFFFF",
//   textPrimary: "#263238", // Dark blue-gray
//   textSecondary: "#455A64",
//   textTertiary: "#78909C",
//   border: "#E0E0E0",
//   success: "#4CAF50",
//   warning: "#FFC107",
//   error: "#F44336",
//   info: "#2196F3",
//   highlight: "#FFF9C4",
//   urgent: "#E53935",
//   highPriority: "#FB8C00",
//   normalPriority: "#039BE5",
//   notification: "#FF5252",
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   scrollContainer: {
//     paddingHorizontal: 20,
//     paddingTop: 16,
//     paddingBottom: 40,
//   },
//   welcomeContainer: {
//     marginBottom: 24,
//   },
//   welcomeText: {
//     fontSize: 24,
//     fontWeight: "700",
//     color: colors.textPrimary,
//     marginBottom: 4,
//   },
//   subWelcomeText: {
//     fontSize: 16,
//     color: colors.textSecondary,
//     fontWeight: "500",
//   },
//   metricsContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     marginBottom: 24,
//     gap: 12,
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: colors.textPrimary,
//   },
//   seeAllText: {
//     fontSize: 14,
//     color: colors.primary,
//     fontWeight: "500",
//   },
//   featuresContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     marginBottom: 24,
//     gap: 12,
//   },
//   tasksContainer: {
//     marginBottom: 24,
//     gap: 12,
//   },
//   infoCard: {
//     backgroundColor: colors.white,
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   infoHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   infoTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: colors.textPrimary,
//     marginLeft: 8,
//   },
//   infoText: {
//     fontSize: 14,
//     color: colors.textSecondary,
//     lineHeight: 20,
//   },
//   notificationBadge: {
//     position: "absolute",
//     right: -6,
//     top: -3,
//     backgroundColor: colors.notification,
//     borderRadius: 10,
//     width: 18,
//     height: 18,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   notificationText: {
//     color: colors.white,
//     fontSize: 10,
//     fontWeight: "bold",
//   },
// });

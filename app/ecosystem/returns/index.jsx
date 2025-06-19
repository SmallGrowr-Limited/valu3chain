import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ROIWidget from "../../../components/elements/ROIWidget";
import { Colors } from "../../../components/constants/colors";
import { returnsData } from "../../../components/constants/data";

export default function Returns() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.navigate("/ecosystem/dashboard")}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Returns Managemen</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.roiSummary}>
        <Text style={styles.sectionTitle}>Portfolio ROI Summary</Text>
        <ROIWidget data={returnsData.summary} />
      </View>

      <Text style={styles.sectionTitle}>Project Returns</Text>
      {returnsData.projects.map((project, index) => (
        <View key={index} style={styles.projectCard}>
          <Text style={styles.projectName}>{project.name}</Text>
          <Text style={styles.projectRoi}>ROI: {project.roi}%</Text>
          <Text style={styles.projectAmount}>
            Amount: ₦{project.amount.toLocaleString()}
          </Text>

          <View style={styles.reinvestmentButtons}>
            <TouchableOpacity style={styles.reinvestButton}>
              <Text style={styles.buttonText}>Reinvest in New Project</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reinvestButton}>
              <Text style={styles.buttonText}>Add to Existing Project</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },
  filterButton: {
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    padding: 8,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryCard: {
    backgroundColor: Colors.primary,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primaryText,
    marginBottom: 8,
  },
  positiveValue: {
    color: Colors.success,
  },
  summarySubtext: {
    fontSize: 14,
    color: Colors.secondaryText,
  },
  chartContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primaryText,
    marginBottom: 16,
  },
  performanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  performanceCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  performanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  performanceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryText,
    marginLeft: 8,
  },
  performanceProject: {
    fontSize: 14,
    color: Colors.primaryText,
    marginBottom: 4,
  },
  performanceROI: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  projectCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  projectName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryText,
    flex: 1,
  },
  projectROI: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  positiveROI: {
    color: Colors.success,
  },
  negativeROI: {
    color: Colors.warning,
  },
  projectDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectAmount: {
    fontSize: 14,
    color: Colors.secondaryText,
  },
  projectDuration: {
    fontSize: 14,
    color: Colors.secondaryText,
  },
  projectStatus: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusCompleted: {
    backgroundColor: Colors.successLight,
  },
  statusActive: {
    backgroundColor: Colors.primaryLight,
  },
  projectStatusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  reinvestButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reinvestButtonText: {
    color: Colors.textOnSecondary,
    fontSize: 18,
    fontWeight: 'bold',
  },

});

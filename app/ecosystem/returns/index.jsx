import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ROIWidget from "../../../components/elements/ROIWidget";
import { Colors } from "../../../components/constants/colors";
import { returnsData } from "../../../components/constants/data";

export default function Returns() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Returns Management</Text>

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
  // ... returns-specific styles
});

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import Header from "../../../../components/agent-components/Header";
import { colors } from "../../../../components/agent-components/constants/colors";

// Mock data - replace with your actual data source
const auditDetails = {
  id: "1",
  farmerId: "1",
  farmerName: "Kwame Yeboah",
  farmName: "Yeboah Main Farm",
  scheduledDate: "2023-11-15",
  conductedDate: "2023-11-15",
  status: "completed",
  auditor: "John Doe (Extension Agent)",
  location: "6.7008° N, 1.6251° W",
  generalObservations:
    "The farm shows good management practices with healthy crops observed. Soil quality appears adequate but could benefit from organic matter supplementation.",
  recommendations:
    "1. Apply organic compost to improve soil structure\n2. Rotate crops to prevent soil nutrient depletion\n3. Monitor for early signs of pest infestation",
  checklist: [
    {
      category: "Soil Quality",
      items: [
        {
          question: "Soil pH level is optimal (6.0-7.0)",
          passed: true,
          notes: "pH measured at 6.5",
        },
        {
          question: "Proper soil drainage observed",
          passed: true,
          notes: "Good drainage system in place",
        },
        {
          question: "No signs of soil erosion",
          passed: false,
          notes: "Minor erosion on north slope",
        },
      ],
    },
    {
      category: "Crop Health",
      items: [
        {
          question: "No signs of pest infestation",
          passed: true,
          notes: "No visible pests",
        },
        {
          question: "No disease symptoms observed",
          passed: true,
          notes: "Plants appear healthy",
        },
        {
          question: "Proper plant spacing maintained",
          passed: true,
          notes: "Adequate spacing between plants",
        },
      ],
    },
    {
      category: "Input Usage",
      items: [
        {
          question: "Fertilizers applied correctly",
          passed: true,
          notes: "Proper application rates used",
        },
        {
          question: "Pesticides used as recommended",
          passed: true,
          notes: "Only organic pesticides used",
        },
        {
          question: "Proper storage of farm inputs",
          passed: false,
          notes: "Storage area needs better organization",
        },
      ],
    },
  ],
  attachments: [
    { id: "1", type: "photo", name: "north_field.jpg" },
    { id: "2", type: "photo", name: "soil_sample.jpg" },
    { id: "3", type: "document", name: "soil_test_results.pdf" },
  ],
};

export default function AuditDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const audit = auditDetails; // In real app, fetch by id

  const handleViewOnMap = () => {
    // In a real app, you would use the actual coordinates
    const url = `https://www.google.com/maps/search/?api=1&query=${audit.location}`;
    Linking.openURL(url).catch((err) =>
      Alert.alert("Error", "Couldn't open map")
    );
  };

  const handleViewAttachment = (attachment) => {
    // In a real app, implement attachment viewing logic
    Alert.alert(
      "View Attachment",
      `Would you like to view ${attachment.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "View", onPress: () => console.log("Viewing attachment") },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Audit Details"
        showBackButton
        rightAction={
          <TouchableOpacity
            onPress={() => router.push(`/audits/edit/${audit.id}`)}
          >
            <Ionicons name="create-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Audit Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.farmerName}>{audit.farmerName}</Text>
          <Text style={styles.farmName}>{audit.farmName}</Text>

          <View style={styles.detailRow}>
            <Ionicons name="calendar" size={16} color={colors.gray} />
            <Text style={styles.detailText}>
              Scheduled: {audit.scheduledDate}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="calendar-check" size={16} color={colors.gray} />
            <Text style={styles.detailText}>
              Conducted: {audit.conductedDate}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="person" size={16} color={colors.gray} />
            <Text style={styles.detailText}>Auditor: {audit.auditor}</Text>
          </View>

          <TouchableOpacity style={styles.mapButton} onPress={handleViewOnMap}>
            <Ionicons name="map" size={16} color={colors.primary} />
            <Text style={styles.mapButtonText}>View on Map</Text>
          </TouchableOpacity>
        </View>

        {/* Checklist Results */}
        <Text style={styles.sectionTitle}>Checklist Results</Text>
        {audit.checklist.map((category, index) => (
          <View key={index} style={styles.categoryCard}>
            <Text style={styles.categoryTitle}>{category.category}</Text>

            {category.items.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.checklistItem}>
                <View style={styles.questionRow}>
                  {item.passed ? (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={colors.success}
                    />
                  ) : (
                    <Ionicons
                      name="close-circle"
                      size={20}
                      color={colors.danger}
                    />
                  )}
                  <Text style={styles.questionText}>{item.question}</Text>
                </View>

                {item.notes && (
                  <View style={styles.notesContainer}>
                    <Text style={styles.notesText}>{item.notes}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        ))}

        {/* General Observations */}
        <Text style={styles.sectionTitle}>General Observations</Text>
        <View style={styles.observationsCard}>
          <Text style={styles.observationsText}>
            {audit.generalObservations}
          </Text>
        </View>

        {/* Recommendations */}
        <Text style={styles.sectionTitle}>Recommendations</Text>
        <View style={styles.recommendationsCard}>
          <Text style={styles.recommendationsText}>
            {audit.recommendations}
          </Text>
        </View>

        {/* Attachments */}
        <Text style={styles.sectionTitle}>Attachments</Text>
        <View style={styles.attachmentsContainer}>
          {audit.attachments.map((attachment) => (
            <TouchableOpacity
              key={attachment.id}
              style={styles.attachmentCard}
              onPress={() => handleViewAttachment(attachment)}
            >
              <View style={styles.attachmentIcon}>
                {attachment.type === "photo" ? (
                  <Ionicons name="image" size={24} color={colors.primary} />
                ) : (
                  <Ionicons
                    name="document-text"
                    size={24}
                    color={colors.primary}
                  />
                )}
              </View>
              <Text style={styles.attachmentName} numberOfLines={1}>
                {attachment.name}
              </Text>
            </TouchableOpacity>
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
  summaryCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
  },
  farmerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.dark,
    marginBottom: 4,
  },
  farmName: {
    fontSize: 16,
    color: colors.primary,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.gray,
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 4,
  },
  mapButtonText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark,
    marginTop: 8,
    marginBottom: 12,
  },
  categoryCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  checklistItem: {
    marginBottom: 12,
  },
  questionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  questionText: {
    fontSize: 14,
    color: colors.dark,
    flex: 1,
  },
  notesContainer: {
    backgroundColor: colors.lightPrimary,
    borderRadius: 8,
    padding: 8,
    marginLeft: 28,
  },
  notesText: {
    fontSize: 13,
    color: colors.dark,
    lineHeight: 18,
  },
  observationsCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
  },
  observationsText: {
    fontSize: 14,
    color: colors.dark,
    lineHeight: 22,
  },
  recommendationsCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
  },
  recommendationsText: {
    fontSize: 14,
    color: colors.dark,
    lineHeight: 22,
    whiteSpace: "pre-line",
  },
  attachmentsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  attachmentCard: {
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    elevation: 1,
    gap: 8,
  },
  attachmentIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.lightPrimary,
    justifyContent: "center",
    alignItems: "center",
  },
  attachmentName: {
    flex: 1,
    fontSize: 13,
    color: colors.dark,
  },
});

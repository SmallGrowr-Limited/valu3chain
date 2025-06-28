import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Header from "../../../../../components/agent-components/Header";
import { colors } from "../../../../../components/agent-components/constants/colors";

// Mock data - replace with your actual data source
const aggregationData = {
  id: "fert-2023-11",
  type: "Fertilizer (NPK)",
  totalRequests: 18,
  totalQuantity: "900 kg",
  status: "Pending Approval",
  dateCreated: "2023-11-20",
  createdBy: "John Doe (Extension Agent)",
  requests: [
    {
      id: "1",
      farmerId: "1",
      farmerName: "Kwame Yeboah",
      quantity: "50 kg",
      farmName: "Yeboah Main Farm",
      dateRequested: "2023-11-15",
    },
    {
      id: "2",
      farmerId: "2",
      farmerName: "Adwoa Mensah",
      quantity: "40 kg",
      farmName: "Mensah Family Farm",
      dateRequested: "2023-11-16",
    },
    {
      id: "3",
      farmerId: "3",
      farmerName: "Kofi Asante",
      quantity: "60 kg",
      farmName: "Asante Maize Fields",
      dateRequested: "2023-11-17",
    },
  ],
  notes: "Standard NPK fertilizer for maize crops",
};

export default function ApproveAggregation() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [aggregation, setAggregation] = useState(aggregationData);
  const [approvalNotes, setApprovalNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // In a real app, you would fetch aggregation data based on the id
  useEffect(() => {
    // fetchAggregation(id).then(data => setAggregation(data));
  }, [id]);

  const handleApprove = () => {
    if (!approvalNotes) {
      Alert.alert(
        "Notes Required",
        "Please add approval notes before submitting"
      );
      return;
    }

    setIsSubmitting(true);

    // In a real app, you would submit approval to your backend here
    setTimeout(() => {
      Alert.alert(
        "Approval Successful",
        `${aggregation.totalQuantity} of ${aggregation.type} approved`,
        [
          {
            text: "OK",
            onPress: () => router.push("/inputs/aggregate"),
          },
        ]
      );
      setIsSubmitting(false);
    }, 1500);
  };

  const handleReject = () => {
    Alert.alert(
      "Reject Aggregation",
      "Are you sure you want to reject this aggregation?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reject",
          style: "destructive",
          onPress: () => {
            // In a real app, you would submit rejection to your backend here
            router.push("/inputs/aggregate");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Approve Aggregation"
        rightAction={
          <TouchableOpacity
            onPress={() =>
              router.push("/extension-agent/home/inputs")
            }
          >
            <Ionicons name="add" size={24} color={colors.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Aggregation Header */}
        <View style={styles.headerCard}>
          <View style={styles.headerRow}>
            <MaterialCommunityIcons
              name="sack"
              size={32}
              color={colors.primary}
            />
            <View style={styles.headerText}>
              <Text style={styles.aggregationType}>{aggregation.type}</Text>
              <Text style={styles.aggregationQuantity}>
                {aggregation.totalQuantity}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="calendar" size={16} color={colors.gray} />
            <Text style={styles.detailText}>
              Created: {aggregation.dateCreated}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="person" size={16} color={colors.gray} />
            <Text style={styles.detailText}>By: {aggregation.createdBy}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="document-text" size={16} color={colors.gray} />
            <Text style={styles.detailText}>Notes: {aggregation.notes}</Text>
          </View>
        </View>

        {/* Requests List */}
        <Text style={styles.sectionTitle}>
          Individual Requests ({aggregation.requests.length})
        </Text>
        <FlatList
          data={aggregation.requests}
          renderItem={({ item }) => (
            <View style={styles.requestCard}>
              <View style={styles.requestInfo}>
                <Text style={styles.farmerName}>{item.farmerName}</Text>
                <Text style={styles.farmName}>{item.farmName}</Text>
                <Text style={styles.requestDate}>
                  Requested: {item.dateRequested}
                </Text>
              </View>
              <Text style={styles.quantityText}>{item.quantity}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />

        {/* Approval Notes */}
        <Text style={styles.sectionTitle}>Approval Notes *</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Add your approval notes..."
          value={approvalNotes}
          onChangeText={setApprovalNotes}
          multiline
          numberOfLines={4}
        />

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.rejectButton]}
            onPress={handleReject}
          >
            <MaterialIcons name="close" size={20} color={colors.white} />
            <Text style={styles.actionButtonText}>Reject</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.approveButton,
              !approvalNotes && styles.disabledButton,
            ]}
            onPress={handleApprove}
            disabled={!approvalNotes || isSubmitting}
          >
            {isSubmitting ? (
              <MaterialIcons
                name="hourglass-top"
                size={20}
                color={colors.white}
              />
            ) : (
              <MaterialIcons name="check" size={20} color={colors.white} />
            )}
            <Text style={styles.actionButtonText}>
              {isSubmitting ? "Approving..." : "Approve"}
            </Text>
          </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  headerCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    elevation: 2,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    marginLeft: 16,
    flex: 1,
  },
  aggregationType: {
    fontSize: 20,
    fontFamily: "Inter-SemiBold",
    color: colors.textPrimary,
  },
  aggregationQuantity: {
    fontSize: 18,
    fontFamily: "Inter-Medium",
    color: colors.primary,
    marginTop: 4,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.warningLight,
    marginTop: 8,
  },
  statusText: {
    fontSize: 13,
    fontFamily: "Inter-SemiBold",
    color: colors.warning,
    textTransform: "uppercase",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  detailIcon: {
    marginRight: 8,
  },
  detailText: {
    fontSize: 15,
    fontFamily: "Inter-Regular",
    color: colors.textSecondary,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: colors.textPrimary,
    marginBottom: 16,
    letterSpacing: -0.2,
  },
  listContainer: {
    gap: 12,
    marginBottom: 24,
  },
  requestCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    elevation: 1,
    shadowColor: colors.textPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  requestInfo: {
    flex: 1,
  },
  farmerName: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  farmName: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: colors.textSecondary,
    marginBottom: 4,
  },
  requestDate: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: colors.textTertiary,
  },
  quantityText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: colors.primary,
    marginLeft: 12,
  },
  notesInput: {
    minHeight: 120,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    textAlignVertical: "top",
    fontSize: 15,
    fontFamily: "Inter-Regular",
    color: colors.textPrimary,
    marginBottom: 24,
    elevation: 1,
  },
  notesLabel: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: colors.textSecondary,
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    elevation: 3,
  },
  approveButton: {
    backgroundColor: colors.success,
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  rejectButton: {
    backgroundColor: colors.error,
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  disabledButton: {
    opacity: 0.6,
    shadowOpacity: 0,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
  },
});
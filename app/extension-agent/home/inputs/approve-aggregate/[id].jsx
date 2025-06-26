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
      <Header title="Approve Aggregation" showBackButton />

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
    padding: 16,
    paddingBottom: 32,
  },
  headerCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  headerText: {
    marginLeft: 12,
  },
  aggregationType: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.dark,
  },
  aggregationQuantity: {
    fontSize: 16,
    color: colors.primary,
    marginTop: 4,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.gray,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark,
    marginTop: 16,
    marginBottom: 12,
  },
  listContainer: {
    marginBottom: 16,
  },
  requestCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
  },
  requestInfo: {
    flex: 1,
  },
  farmerName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark,
  },
  farmName: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 4,
  },
  requestDate: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 4,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark,
    marginLeft: 12,
  },
  notesInput: {
    minHeight: 100,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    padding: 12,
    textAlignVertical: "top",
    marginBottom: 24,
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
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  approveButton: {
    backgroundColor: colors.success,
  },
  rejectButton: {
    backgroundColor: colors.danger,
  },
  disabledButton: {
    opacity: 0.6,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});

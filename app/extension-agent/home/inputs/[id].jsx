import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
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
const inputDetails = {
  id: "1",
  farmerId: "1",
  farmerName: "Kwame Yeboah",
  farmerPhone: "+233 24 123 4567",
  farmName: "Yeboah Main Farm",
  type: "Fertilizer (NPK)",
  quantity: "50 kg",
  status: "Delivered",
  dateRequested: "2023-10-15",
  dateApproved: "2023-10-17",
  dateDelivered: "2023-10-20",
  notes: "Delivered to farm storage. Farmer confirmed receipt.",
  deliveryNotes: "Left with farm manager at 2:30pm",
  approver: "John Doe (District Officer)",
  deliveryAgent: "Michael Smith (Logistics)",
  attachments: [
    { id: "1", type: "photo", name: "delivery_confirmation.jpg" },
    { id: "2", type: "document", name: "invoice_12345.pdf" },
  ],
};

export default function InputDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const input = inputDetails; // In real app, fetch by id

  const handleCallFarmer = () => {
    Linking.openURL(`tel:${input.farmerPhone}`).catch((err) =>
      Alert.alert("Error", "Couldn't initiate call")
    );
  };

  const handleViewAttachment = (attachment) => {
    Alert.alert(
      "View Attachment",
      `Would you like to view ${attachment.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "View", onPress: () => console.log("Viewing attachment") },
      ]
    );
  };

  const getStatusColor = () => {
    switch (input.status) {
      case "Delivered":
        return colors.success;
      case "Pending":
        return colors.warning;
      case "Approved":
        return colors.primary;
      case "In Transit":
        return colors.info;
      default:
        return colors.gray;
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Input Details"
        showBackButton
        rightAction={
          <TouchableOpacity
            // onPress={() => router.push(`/inputs/edit/${input.id}`)}
          >
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Status Banner */}
        <View
          style={[styles.statusBanner, { backgroundColor: getStatusColor() }]}
        >
          <Text style={styles.statusText}>{input.status}</Text>
        </View>

        {/* Farmer and Farm Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Farmer Information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Farmer Name:</Text>
            <Text style={styles.infoValue}>{input.farmerName}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Farm Name:</Text>
            <Text style={styles.infoValue}>{input.farmName}</Text>
          </View>

          <TouchableOpacity
            style={styles.callButton}
            onPress={handleCallFarmer}
          >
            <Ionicons name="call" size={16} color={colors.primary} />
            <Text style={styles.callButtonText}>{input.farmerPhone}</Text>
          </TouchableOpacity>
        </View>

        {/* Input Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Input Details</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Type:</Text>
            <Text style={styles.infoValue}>{input.type}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Quantity:</Text>
            <Text style={styles.infoValue}>{input.quantity}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Requested On:</Text>
            <Text style={styles.infoValue}>{input.dateRequested}</Text>
          </View>

          {input.dateApproved && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Approved On:</Text>
              <Text style={styles.infoValue}>
                {input.dateApproved} by {input.approver}
              </Text>
            </View>
          )}

          {input.dateDelivered && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Delivered On:</Text>
              <Text style={styles.infoValue}>
                {input.dateDelivered} by {input.deliveryAgent}
              </Text>
            </View>
          )}
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <Text style={styles.notesText}>{input.notes}</Text>

          {input.deliveryNotes && (
            <>
              <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
                Delivery Notes
              </Text>
              <Text style={styles.notesText}>{input.deliveryNotes}</Text>
            </>
          )}
        </View>

        {/* Attachments */}
        {input.attachments.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Attachments</Text>
            <View style={styles.attachmentsContainer}>
              {input.attachments.map((attachment) => (
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
                  <Text style={styles.attachmentName}>{attachment.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Action Buttons */}
        {input.status !== "Delivered" && (
          <View style={styles.actionButtons}>
            {input.status === "Pending" && (
              <TouchableOpacity
                style={[styles.actionButton, styles.approveButton]}
                onPress={() => router.push(`/inputs/approve/${input.id}`)}
              >
                <MaterialCommunityIcons
                  name="check"
                  size={20}
                  color={colors.white}
                />
                <Text style={styles.actionButtonText}>Approve Request</Text>
              </TouchableOpacity>
            )}

            {(input.status === "Approved" || input.status === "In Transit") && (
              <TouchableOpacity
                style={[styles.actionButton, styles.deliverButton]}
                onPress={() => router.push(`/inputs/deliver/${input.id}`)}
              >
                <MaterialCommunityIcons
                  name="truck-delivery"
                  size={20}
                  color={colors.white}
                />
                <Text style={styles.actionButtonText}>
                  {input.status === "Approved"
                    ? "Mark as In Transit"
                    : "Mark as Delivered"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
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
    paddingBottom: 32,
  },
  statusBanner: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginBottom: 0,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  infoLabel: {
    width: 120,
    fontSize: 14,
    color: colors.gray,
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: colors.dark,
  },
  callButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  callButtonText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "500",
  },
  notesText: {
    fontSize: 14,
    color: colors.dark,
    lineHeight: 22,
  },
  attachmentsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  attachmentCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.lightGray,
    marginBottom: 8,
  },
  attachmentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightPrimary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  attachmentName: {
    flex: 1,
    fontSize: 14,
    color: colors.dark,
  },
  actionButtons: {
    padding: 16,
  },
  actionButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    gap: 8,
    marginBottom: 12,
  },
  approveButton: {
    backgroundColor: colors.success,
  },
  deliverButton: {
    backgroundColor: colors.primary,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});

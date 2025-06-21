// components/ServiceRequestCard.tsx
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { Colors } from "../constants/colors";
import { Link } from "expo-router";

interface ServiceRequestCardProps {
  request: {
    id: string,
    farmerName: string,
    serviceType: "input" | "inspection" | "harvest" | "soil-test" | "other",
    status: "pending" | "approved" | "completed" | "rejected",
    date: string,
    priority?: "low" | "medium" | "high",
    description?: string,
  };
  showActions?: boolean;
  onApprove?: () => void;
  onReject?: () => void;
  onComplete?: () => void;
}

export default function ServiceRequestCard({
  request,
  showActions = false,
  onApprove,
  onReject,
  onComplete,
}: ServiceRequestCardProps) {
  const getServiceIcon = () => {
    switch (request.serviceType) {
      case "input":
        return <Ionicons name="bag-outline" size={20} color={Colors.primary} />;
      case "inspection":
        return (
          <MaterialCommunityIcons
            name="magnify"
            size={20}
            color={Colors.primary}
          />
        );
      case "harvest":
        return <FontAwesome name="recycle" size={18} color={Colors.primary} />;
      case "soil-test":
        return (
          <Ionicons name="flask-outline" size={18} color={Colors.primary} />
        );
      default:
        return (
          <Ionicons
            name="help-circle-outline"
            size={20}
            color={Colors.primary}
          />
        );
    }
  };

  const getStatusColor = () => {
    switch (request.status) {
      case "pending":
        return Colors.warning;
      case "approved":
        return Colors.success;
      case "completed":
        return Colors.primary;
      case "rejected":
        return Colors.error;
      default:
        return Colors.textSecondary;
    }
  };

  const getPriorityColor = () => {
    if (!request.priority) return "transparent";
    switch (request.priority) {
      case "high":
        return Colors.error;
      case "medium":
        return Colors.warning;
      case "low":
        return Colors.success;
      default:
        return "transparent";
    }
  };

  return (
    <Link href={`/service-requests/${request.id}`} asChild>
      <TouchableOpacity style={styles.container} activeOpacity={0.9}>
        {/* Priority Indicator */}
        {request.priority && (
          <View
            style={[
              styles.priorityIndicator,
              { backgroundColor: getPriorityColor() },
            ]}
          />
        )}

        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.serviceType}>
              {getServiceIcon()}
              <Text style={styles.serviceTypeText}>
                {request.serviceType.replace("-", " ")}
              </Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor() + "20" },
              ]}
            >
              <Text style={[styles.statusText, { color: getStatusColor() }]}>
                {request.status}
              </Text>
            </View>
          </View>

          {/* Farmer Info */}
          <Text style={styles.farmerName}>{request.farmerName}</Text>

          {/* Description */}
          {request.description && (
            <Text style={styles.description} numberOfLines={2}>
              {request.description}
            </Text>
          )}

          {/* Date */}
          <View style={styles.dateContainer}>
            <Ionicons
              name="calendar-outline"
              size={14}
              color={Colors.textSecondary}
            />
            <Text style={styles.dateText}>{request.date}</Text>
          </View>

          {/* Action Buttons */}
          {showActions && request.status === "pending" && (
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={[styles.actionButton, styles.approveButton]}
                onPress={(e) => {
                  e.stopPropagation();
                  onApprove?.();
                }}
              >
                <Text style={styles.actionButtonText}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.rejectButton]}
                onPress={(e) => {
                  e.stopPropagation();
                  onReject?.();
                }}
              >
                <Text style={styles.actionButtonText}>Reject</Text>
              </TouchableOpacity>
            </View>
          )}

          {showActions && request.status === "approved" && (
            <TouchableOpacity
              style={[styles.actionButton, styles.completeButton]}
              onPress={(e) => {
                e.stopPropagation();
                onComplete?.();
              }}
            >
              <Text style={styles.actionButtonText}>Mark Complete</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
    flexDirection: "row",
  },
  priorityIndicator: {
    width: 6,
    height: "100%",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  serviceType: {
    flexDirection: "row",
    alignItems: "center",
  },
  serviceTypeText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
    textTransform: "capitalize",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  farmerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 10,
    lineHeight: 20,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  dateText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  approveButton: {
    backgroundColor: Colors.success + "20",
    borderWidth: 1,
    borderColor: Colors.success,
  },
  rejectButton: {
    backgroundColor: Colors.error + "20",
    borderWidth: 1,
    borderColor: Colors.error,
  },
  completeButton: {
    backgroundColor: Colors.primary + "20",
    borderWidth: 1,
    borderColor: Colors.primary,
    marginTop: 12,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});

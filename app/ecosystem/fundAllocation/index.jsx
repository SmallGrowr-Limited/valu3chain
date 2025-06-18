import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Colors } from "../../../components/constants/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import {useRouter} from "expo-router";

const FundAllocation = ({ route, navigation }) => {
  const investment = {
    id: 1,
    category: "Dairy",
    location: "Nakuru",
    totalAmount: 500000,
    allocatedAmount: 250000,
    remainingAmount: 250000,
  };

  const router = useRouter()

  // Allocation categories specific to agricultural investments
  const [allocations, setAllocations] = useState([
    { id: 1, name: "Seeds/Seedlings", percentage: 30, amount: 0 },
    { id: 2, name: "Fertilizers", percentage: 20, amount: 0 },
    { id: 3, name: "Equipment", percentage: 15, amount: 0 },
    { id: 4, name: "Labor", percentage: 20, amount: 0 },
    { id: 5, name: "Training", percentage: 10, amount: 0 },
    // { id: 6, name: "Miscellaneous", percentage: 5, amount: 0 },
  ]);

  const [collaborators, setCollaborators] = useState([]);
  const [newCollaborator, setNewCollaborator] = useState("");
  const [notes, setNotes] = useState("");
  const [availableAmount, setAvailableAmount] = useState(
    investment.remainingAmount
  );

  useEffect(() => {
    // Calculate amounts based on percentages
    const updatedAllocations = allocations.map((item) => ({
      ...item,
      amount: Math.floor((item.percentage / 100) * availableAmount),
    }));
    setAllocations(updatedAllocations);
  }, []);

  const handlePercentageChange = (id, value) => {
    const newAllocations = allocations.map((item) =>
      item.id === id ? { ...item, percentage: value } : item
    );

    // Ensure total doesn't exceed 100%
    const totalPercentage = newAllocations.reduce(
      (sum, item) => sum + item.percentage,
      0
    );
    if (totalPercentage <= 100) {
      const updatedAllocations = newAllocations.map((item) => ({
        ...item,
        amount: Math.floor((item.percentage / 100) * availableAmount),
      }));
      setAllocations(updatedAllocations);
    }
  };

  const handleAddCollaborator = () => {
    if (newCollaborator.trim() && collaborators.length < 5) {
      setCollaborators([
        ...collaborators,
        {
          id: Date.now(),
          name: newCollaborator,
          amount: 0,
          percentage: 0,
        },
      ]);
      setNewCollaborator("");
    }
  };

  const handleCollaboratorAllocation = (id, value) => {
    setCollaborators(
      collaborators.map((collab) =>
        collab.id === id
          ? {
              ...collab,
              percentage: value,
              amount: (value / 100) * availableAmount,
            }
          : collab
      )
    );
  };

  const handleRemoveCollaborator = (id) => {
    setCollaborators(collaborators.filter((collab) => collab.id !== id));
  };

  const calculateTotalAllocated = () => {
    return allocations.reduce((sum, item) => sum + item.amount, 0);
  };

  const handleSubmit = () => {
    const allocationPlan = {
      investmentId: investment.id,
      allocations,
      collaborators,
      totalAllocated: calculateTotalAllocated(),
      notes,
      date: new Date().toISOString(),
    };
    console.log("Fund Allocation Submitted:", allocationPlan);
    // navigation.goBack();
    // Here you would typically send the allocation to your backend
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.navigate("/ecosystem/dashboard")}>
            <Ionicons name="arrow-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Fund Allocation</Text>
          <View style={{ width: 24 }} />
        </View>

        <Text style={styles.subtitle}>
          Allocating funds for {investment.category} project in{" "}
          {investment.location}
        </Text>

        {/* Available Funds */}
        <View style={styles.fundsCard}>
          <Text style={styles.fundsLabel}>Available Funds</Text>
          <Text style={styles.fundsAmount}>
            ₦ {availableAmount.toLocaleString()}
          </Text>
          <Text style={styles.fundsNote}>
            Total project budget: ₦ {investment.totalAmount.toLocaleString()}
          </Text>
        </View>

        {/* Allocation Sections */}
        <Text style={styles.sectionTitle}>Resource Allocation</Text>
        <Text style={styles.sectionDescription}>
          Distribute funds across different agricultural needs
        </Text>

        {allocations.map((item) => (
          <View key={item.id} style={styles.allocationItem}>
            <View style={styles.allocationHeader}>
              <MaterialCommunityIcons
                name={getCategoryIcon(item.name)}
                size={20}
                color={Colors.primary}
              />
              <Text style={styles.allocationName}>{item.name}</Text>
              <Text style={styles.allocationAmount}>
                ₦ {item.amount.toLocaleString()}
              </Text>
            </View>

            <View style={styles.sliderContainer}>
              <Slider
                value={item.percentage}
                onValueChange={(value) =>
                  handlePercentageChange(item.id, value)
                }
                minimumValue={0}
                maximumValue={100}
                step={1}
                minimumTrackTintColor={Colors.primary}
                maximumTrackTintColor={Colors.lightGray}
                thumbTintColor={Colors.primary}
              />
              <Text style={styles.percentageText}>{item.percentage}%</Text>
            </View>
          </View>
        ))}

        {/* Collaborators */}
        <Text style={styles.sectionTitle}>Collaborative Funding</Text>
        <Text style={styles.sectionDescription}>
          Invite other partners to co-fund this investment
        </Text>

        {collaborators.map((collab) => (
          <View key={collab.id} style={styles.collaboratorItem}>
            <View style={styles.collaboratorHeader}>
              <Ionicons name="person" size={18} color={Colors.primary} />
              <Text style={styles.collaboratorName}>{collab.name}</Text>
              <TouchableOpacity
                onPress={() => handleRemoveCollaborator(collab.id)}
              >
                <Ionicons name="close" size={20} color={Colors.danger} />
              </TouchableOpacity>
            </View>

            <View style={styles.sliderContainer}>
              <Slider
                value={collab.percentage}
                onValueChange={(value) =>
                  handleCollaboratorAllocation(collab.id, value)
                }
                minimumValue={0}
                maximumValue={100}
                step={1}
                minimumTrackTintColor={Colors.secondary}
                maximumTrackTintColor={Colors.lightGray}
                thumbTintColor={Colors.secondary}
              />
              <View style={styles.collaboratorAllocation}>
                <Text style={styles.percentageText}>{collab.percentage}%</Text>
                <Text style={styles.collaboratorAmount}>
                  ₦ {collab.amount.toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        ))}

        {collaborators.length < 5 && (
          <View style={styles.addCollaboratorContainer}>
            <TextInput
              style={styles.collaboratorInput}
              placeholder="Add collaborator name"
              value={newCollaborator}
              onChangeText={setNewCollaborator}
              placeholderTextColor={Colors.secondaryText}
            />
            <TouchableOpacity
              style={styles.addCollaboratorButton}
              onPress={handleAddCollaborator}
            >
              <Ionicons name="add" size={20} color={Colors.textOnPrimary} />
            </TouchableOpacity>
          </View>
        )}

        {/* Notes */}
        <Text style={styles.sectionTitle}>Allocation Notes</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Add any notes about this allocation..."
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={3}
          placeholderTextColor={Colors.secondaryText}
        />

        {/* Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Allocation Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Allocated:</Text>
            <Text style={styles.summaryValue}>
              ₦ {calculateTotalAllocated().toLocaleString()}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Remaining Balance:</Text>
            <Text style={styles.summaryValue}>
              ₦ {(availableAmount - calculateTotalAllocated()).toLocaleString()}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Confirm Allocation</Text>
      </TouchableOpacity>
    </View>
  );
};

// Helper function to get icons for categories
const getCategoryIcon = (category) => {
  switch (category) {
    case "Seeds/Seedlings":
      return "seed";
    case "Fertilizers":
      return "chemical-weapon";
    case "Equipment":
      return "tools";
    case "Labor":
      return "account-hard-hat";
    case "Training":
      return "school";
    default:
      return "cash-multiple";
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primaryText,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.secondaryText,
    marginBottom: 24,
  },
  fundsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: "center",
  },
  fundsLabel: {
    fontSize: 16,
    color: Colors.secondaryText,
    marginBottom: 4,
  },
  fundsAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 4,
  },
  fundsNote: {
    fontSize: 14,
    color: Colors.secondaryText,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.primaryText,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginBottom: 16,
  },
  allocationItem: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  allocationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  allocationName: {
    flex: 1,
    fontSize: 16,
    color: Colors.primaryText,
    marginLeft: 8,
  },
  allocationAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  percentageText: {
    width: 50,
    textAlign: "right",
    fontSize: 16,
    color: Colors.primaryText,
    marginLeft: 12,
  },
  collaboratorItem: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  collaboratorHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  collaboratorName: {
    flex: 1,
    fontSize: 16,
    color: Colors.primaryText,
    marginLeft: 8,
  },
  collaboratorAllocation: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 4,
  },
  collaboratorAmount: {
    fontSize: 14,
    color: Colors.secondary,
  },
  addCollaboratorContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  collaboratorInput: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.primaryText,
    marginRight: 8,
  },
  addCollaboratorButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  notesInput: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.primaryText,
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.primaryText,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: Colors.primaryText,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
  },
  submitButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  submitButtonText: {
    color: Colors.textOnPrimary,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FundAllocation;

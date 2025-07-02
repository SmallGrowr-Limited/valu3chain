
import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { Colors } from "../../../components/constants/colors";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";

const FundAllocationScreen = () => {
  const router = useRouter();
  // State management
  const [totalAmount, setTotalAmount] = useState(1000000); // Default ₦1M
  const [allocations, setAllocations] = useState([
    { id: 1, category: "Seeds", percentage: 30, amount: 300000 },
    { id: 2, category: "Fertilizers", percentage: 25, amount: 250000 },
    { id: 3, category: "Equipment", percentage: 20, amount: 200000 },
    // { id: 4, category: "Labor", percentage: 15, amount: 150000 },
    // { id: 5, category: "Training", percentage: 10, amount: 100000 },
  ]);

  // Update allocation when slider changes
  const handleAllocationChange = (id, value) => {
    const newAllocations = allocations.map((item) =>
      item.id === id ? { ...item, percentage: value } : item
    );

    // Recalculate amounts while maintaining percentages
    const updated = newAllocations.map((item) => ({
      ...item,
      amount: Math.floor((item.percentage / 100) * totalAmount),
    }));

    setAllocations(updated);
  };

  // Add new allocation category
  const addCategory = () => {
    setAllocations([
      ...allocations,
      { id: Date.now(), category: "New Category", percentage: 0, amount: 0 },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
           {/* Header */}
         <View style={styles.header}>
           <TouchableOpacity
             onPress={() => router.navigate("/ecosystem/home")}
           >
             <Ionicons name="arrow-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Fund Allocation</Text>
          <View style={{ width: 24 }} />
       </View>
      {/* Total Investment Input */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Total Investment Amount</Text>
        <View style={styles.amountInputContainer}>
          <Text style={styles.currencySymbol}>₦</Text>
          <TextInput
            style={styles.amountInput}
            keyboardType="numeric"
            value={String(totalAmount)}
            onChangeText={(text) => {
              const amount = parseInt(text.replace(/\D/g, "")) || 0;
              setTotalAmount(amount);
            }}
          />
        </View>
      </View>

      {/* Allocation Sliders */}
      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Resource Allocation</Text>
          <TouchableOpacity onPress={addCategory} style={styles.addButton}>
            <MaterialCommunityIcons
              name="plus"
              size={20}
              color={Colors.primary}
            />
          </TouchableOpacity>
        </View>

        {allocations.map((item) => (
          <View key={item.id} style={styles.allocationItem}>
            <View style={styles.categoryHeader}>
              <MaterialCommunityIcons
                name={getCategoryIcon(item.category)}
                size={24}
                color={Colors.primary}
              />
              <Text style={styles.categoryName}>{item.category}</Text>
              <Text style={styles.amountText}>
                ₦{item.amount.toLocaleString()}
              </Text>
            </View>

            <Slider
              value={item.percentage}
              onValueChange={(value) => handleAllocationChange(item.id, value)}
              minimumValue={0}
              maximumValue={100}
              step={1}
              minimumTrackTintColor={Colors.primary}
              maximumTrackTintColor={Colors.lightGray}
              thumbTintColor={Colors.primary}
            />

            <View style={styles.percentageRow}>
              <Text style={styles.percentageText}>0%</Text>
              <Text style={styles.percentageValue}>{item.percentage}%</Text>
              <Text style={styles.percentageText}>100%</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Projected ROI */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Projected ROI</Text>
        <View style={styles.roiContainer}>
          <View style={styles.roiItem}>
            <Text style={styles.roiLabel}>Best Case</Text>
            <Text style={[styles.roiValue, styles.positive]}>+22%</Text>
            <Text style={styles.roiAmount}>
              ₦{Math.floor(totalAmount * 0.22).toLocaleString()}
            </Text>
          </View>
          <View style={styles.roiItem}>
            <Text style={styles.roiLabel}>Expected</Text>
            <Text style={styles.roiValue}>+15%</Text>
            <Text style={styles.roiAmount}>
              ₦{Math.floor(totalAmount * 0.15).toLocaleString()}
            </Text>
          </View>
          <View style={styles.roiItem}>
            <Text style={styles.roiLabel}>Worst Case</Text>
            <Text style={[styles.roiValue, styles.negative]}>-5%</Text>
            <Text style={styles.roiAmount}>
              ₦{Math.floor(totalAmount * 0.05).toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
          <Text style={styles.buttonText}>Save Draft</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.primaryButton]}>
          <Text style={styles.buttonText}>Confirm Allocation</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Helper function for category icons
const getCategoryIcon = (category) => {
  const icons = {
    Seeds: "seed",
    Fertilizers: "chemical-weapon",
    Equipment: "tools",
    Labor: "account-hard-hat",
    Training: "school",
  };
  return icons[category] || "cash-multiple";
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.primaryText,
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
  addButton: {
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    paddingVertical: 8,
    marginTop: 8,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primaryText,
  },
  allocationItem: {
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primaryText,
    marginLeft: 8,
  },
  amountText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
  },
  percentageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  percentageText: {
    fontSize: 12,
    color: Colors.secondaryText,
  },
  percentageValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.primary,
  },
  roiContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  roiItem: {
    alignItems: "center",
    flex: 1,
  },
  roiLabel: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginBottom: 4,
  },
  roiValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primaryText,
  },
  positive: {
    color: Colors.success,
  },
  negative: {
    color: Colors.danger,
  },
  roiAmount: {
    fontSize: 14,
    color: Colors.secondaryText,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  button: {
    borderRadius: 8,
    padding: 16,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 4,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.lightGray,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default FundAllocationScreen;

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
// } from "react-native";
// import { Colors } from "../../../components/constants/colors";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import Slider from "@react-native-community/slider";
// import {useRouter} from "expo-router";

// const FundAllocation = ({ route, navigation }) => {
//   const investment = {
//     id: 1,
//     category: "Rice",
//     location: "Zaria",
//     totalAmount: 5000000,
//     allocatedAmount: 4000000,
//     remainingAmount: 4000000,
//   };

//   const router = useRouter()

//   // Allocation categories specific to agricultural investments
//   const [allocations, setAllocations] = useState([
//     { id: 1, name: "Seeds/Seedlings", percentage: 33, amount: 0 },
//     { id: 2, name: "Fertilizers", percentage: 42, amount: 0 },
//     // { id: 3, name: "Equipment", percentage: 15, amount: 0 },
//     // { id: 4, name: "Labor", percentage: 20, amount: 0 },
//     { id: 5, name: "Training", percentage: 15, amount: 0 },
//     { id: 6, name: "Miscellaneous", percentage: 5, amount: 0 },
//   ]);

//   const [collaborators, setCollaborators] = useState([]);
//   const [newCollaborator, setNewCollaborator] = useState("");
//   const [notes, setNotes] = useState("");
//   const [availableAmount, setAvailableAmount] = useState(0);

//   useEffect(() => {
//     // Calculate amounts based on percentages
//     const updatedAllocations = allocations.map((item) => ({
//       ...item,
//       amount: Math.floor((item.percentage / 100) * availableAmount),
//     }));
//     setAllocations(updatedAllocations);
//   }, []);

//   const handlePercentageChange = (id, value) => {
//     const newAllocations = allocations.map((item) =>
//       item.id === id ? { ...item, percentage: value } : item
//     );

//     // Ensure total doesn't exceed 100%
//     const totalPercentage = newAllocations.reduce(
//       (sum, item) => sum + item.percentage,
//       0
//     );
//     if (totalPercentage <= 100) {
//       const updatedAllocations = newAllocations.map((item) => ({
//         ...item,
//         amount: Math.floor((item.percentage / 100) * availableAmount),
//       }));
//       setAllocations(updatedAllocations);
//     }
//   };

//   const handleAddCollaborator = () => {
//     if (newCollaborator.trim() && collaborators.length < 5) {
//       setCollaborators([
//         ...collaborators,
//         {
//           id: Date.now(),
//           name: newCollaborator,
//           amount: 0,
//           percentage: 0,
//         },
//       ]);
//       setNewCollaborator("");
//     }
//   };

//   const handleCollaboratorAllocation = (id, value) => {
//     setCollaborators(
//       collaborators.map((collab) =>
//         collab.id === id
//           ? {
//               ...collab,
//               percentage: value,
//               amount: (value / 100) * availableAmount,
//             }
//           : collab
//       )
//     );
//   };

//   const handleRemoveCollaborator = (id) => {
//     setCollaborators(collaborators.filter((collab) => collab.id !== id));
//   };

//   const calculateTotalAllocated = () => {
//     return allocations.reduce((sum, item) => sum + item.amount, 0);
//   };

//   const handleSubmit = () => {
//     const allocationPlan = {
//       investmentId: investment.id,
//       allocations,
//       collaborators,
//       totalAllocated: calculateTotalAllocated(),
//       notes,
//       date: new Date().toISOString(),
//     };
//     //console.log("Fund Allocation Submitted:", allocationPlan);
//     router.navigate("/ecosystem/dashboard");
//     // Here you would typically send the allocation to your backend
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity
//             onPress={() => router.navigate("/ecosystem/dashboard")}
//           >
//             <Ionicons name="arrow-back" size={24} color={Colors.primary} />
//           </TouchableOpacity>
//           <Text style={styles.title}>Fund Allocation</Text>
//           <View style={{ width: 24 }} />
//         </View>

//         <Text style={styles.subtitle}>
//           Allocating funds for {investment.category} project in{" "}
//           {investment.location}
//         </Text>

//         {/* Available Funds */}
//         <View style={styles.fundsCard}>
//           <Text style={styles.fundsNote}>
//             Total project budget: ₦ {investment.totalAmount.toLocaleString()}
//           </Text>

//           <TextInput
//             style={styles.fundsInput}
//             placeholder="Add fund"
//             onChangeText={(val) => setAvailableAmount(val)}
//             placeholderTextColor={Colors.secondaryText}
//           />
//           <Text style={styles.fundsLabel}>Available Funds</Text>
//           <Text style={styles.fundsAmount}>
//             ₦{availableAmount.toLocaleString()}
//           </Text>
//         </View>

//         {/* Allocation Sections */}
//         <Text style={styles.sectionTitle}>Resource Allocation</Text>
//         <Text style={styles.sectionDescription}>
//           Distribute funds across different agricultural needs
//         </Text>

//         {allocations.map((item) => (
//           <View key={item.id} style={styles.allocationItem}>
//             <View style={styles.allocationHeader}>
//               <MaterialCommunityIcons
//                 name={getCategoryIcon(item.name)}
//                 size={20}
//                 color={Colors.primary}
//               />
//               <Text style={styles.allocationName}>{item.name}</Text>
//               <Text style={styles.allocationAmount}>
//                 ₦ {item.amount.toLocaleString()}
//               </Text>
//             </View>

//             <View style={styles.sliderContainer}>
//               <Slider
//                 value={item.percentage}
//                 onValueChange={(value) =>
//                   handlePercentageChange(item.id, value)
//                 }
//                 minimumValue={0}
//                 maximumValue={100}
//                 step={1}
//                 minimumTrackTintColor={Colors.primary}
//                 maximumTrackTintColor={Colors.lightGray}
//                 thumbTintColor={Colors.primary}
//               />
//               <Text style={styles.percentageText}>{item.percentage}%</Text>
//             </View>
//           </View>
//         ))}

//         {/* Collaborators */}
//         {/* <Text style={styles.sectionTitle}>Collaborative Funding</Text>
//         <Text style={styles.sectionDescription}>
//           Invite other partners to co-fund this investment
//         </Text> */}

//         {/* {collaborators.map((collab) => (
//           <View key={collab.id} style={styles.collaboratorItem}>
//             <View style={styles.collaboratorHeader}>
//               <Ionicons name="person" size={18} color={Colors.primary} />
//               <Text style={styles.collaboratorName}>{collab.name}</Text>
//               <TouchableOpacity
//                 onPress={() => handleRemoveCollaborator(collab.id)}
//               >
//                 <Ionicons name="close" size={20} color={Colors.danger} />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.sliderContainer}>
//               <Slider
//                 value={collab.percentage}
//                 onValueChange={(value) =>
//                   handleCollaboratorAllocation(collab.id, value)
//                 }
//                 minimumValue={0}
//                 maximumValue={100}
//                 step={1}
//                 minimumTrackTintColor={Colors.secondary}
//                 maximumTrackTintColor={Colors.lightGray}
//                 thumbTintColor={Colors.secondary}
//               />
//               <View style={styles.collaboratorAllocation}>
//                 <Text style={styles.percentageText}>{collab.percentage}%</Text>
//                 <Text style={styles.collaboratorAmount}>
//                   ₦ {collab.amount.toLocaleString()}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         ))} */}

//         {/* {collaborators.length < 5 && (
//           <View style={styles.addCollaboratorContainer}>
//             <TextInput
//               style={styles.collaboratorInput}
//               placeholder="Add collaborator name"
//               value={newCollaborator}
//               onChangeText={setNewCollaborator}
//               placeholderTextColor={Colors.secondaryText}
//             />
//             <TouchableOpacity
//               style={styles.addCollaboratorButton}
//               onPress={handleAddCollaborator}
//             >
//               <Ionicons name="add" size={20} color={Colors.textOnPrimary} />
//             </TouchableOpacity>
//           </View>
//         )} */}

//         {/* Notes */}
//         <Text style={styles.sectionTitle}>Allocation Notes</Text>
//         <TextInput
//           style={styles.notesInput}
//           placeholder="Add any notes about this allocation..."
//           value={notes}
//           onChangeText={setNotes}
//           multiline
//           numberOfLines={3}
//           placeholderTextColor={Colors.secondaryText}
//         />

//         {/* Summary */}
//         <View style={styles.summaryCard}>
//           <Text style={styles.summaryTitle}>Allocation Summary</Text>
//           <View style={styles.summaryRow}>
//             <Text style={styles.summaryLabel}>Total Allocated:</Text>
//             <Text style={styles.summaryValue}>
//               ₦ {calculateTotalAllocated().toLocaleString()}
//             </Text>
//           </View>
//           <View style={styles.summaryRow}>
//             <Text style={styles.summaryLabel}>Remaining Balance:</Text>
//             <Text style={styles.summaryValue}>
//               ₦ {(availableAmount - calculateTotalAllocated()).toLocaleString()}
//             </Text>
//           </View>
//         </View>
//       </ScrollView>

//       {/* Submit Button */}
//       <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//         <Text style={styles.submitButtonText}>Confirm Allocation</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// // Helper function to get icons for categories
// const getCategoryIcon = (category) => {
//   switch (category) {
//     case "Seeds/Seedlings":
//       return "seed";
//     case "Fertilizers":
//       return "chemical-weapon";
//     case "Equipment":
//       return "tools";
//     case "Labor":
//       return "account-hard-hat";
//     case "Training":
//       return "school";
//     default:
//       return "cash-multiple";
//   }
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.background,
//   },
//   scrollContainer: {
//     padding: 20,
//     paddingBottom: 100,
//   },

//   fundsCard: {
//     backgroundColor: Colors.surface,
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 24,
//     alignItems: "center",
//   },
//   fundsInput: {
//     // flex: 1,
//     backgroundColor: Colors.surface,
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     color: Colors.primaryText,
//     marginVertical: 15,
//     borderWidth: 1,
//     borderColor: Colors.secondaryText,
//   },
//   fundsLabel: {
//     fontSize: 16,
//     color: Colors.secondaryText,
//     marginBottom: 4,
//   },
//   fundsAmount: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: Colors.primary,
//     marginBottom: 4,
//   },
//   fundsNote: {
//     fontSize: 16,
//     color: Colors.primaryText,
//     fontWeight: "600",
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: Colors.primaryText,
//     marginBottom: 8,
//   },
//   sectionDescription: {
//     fontSize: 14,
//     color: Colors.secondaryText,
//     marginBottom: 16,
//   },
//   allocationItem: {
//     backgroundColor: Colors.surface,
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 12,
//   },
//   allocationHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   allocationName: {
//     flex: 1,
//     fontSize: 16,
//     color: Colors.primaryText,
//     marginLeft: 8,
//   },
//   allocationAmount: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: Colors.primary,
//   },
//   sliderContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   percentageText: {
//     width: 50,
//     textAlign: "right",
//     fontSize: 16,
//     color: Colors.primaryText,
//     marginLeft: 12,
//   },
//   collaboratorItem: {
//     backgroundColor: Colors.surface,
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 12,
//   },
//   collaboratorHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   collaboratorName: {
//     flex: 1,
//     fontSize: 16,
//     color: Colors.primaryText,
//     marginLeft: 8,
//   },
//   collaboratorAllocation: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//     marginTop: 4,
//   },
//   collaboratorAmount: {
//     fontSize: 14,
//     color: Colors.secondary,
//   },
//   addCollaboratorContainer: {
//     flexDirection: "row",
//     marginBottom: 24,
//   },
//   collaboratorInput: {
//     flex: 1,
//     backgroundColor: Colors.surface,
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     color: Colors.primaryText,
//     marginRight: 8,
//   },
//   addCollaboratorButton: {
//     backgroundColor: Colors.secondary,
//     borderRadius: 8,
//     width: 50,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   notesInput: {
//     backgroundColor: Colors.surface,
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     color: Colors.primaryText,
//     minHeight: 100,
//     textAlignVertical: "top",
//     marginBottom: 24,
//   },
//   summaryCard: {
//     backgroundColor: Colors.surface,
//     borderRadius: 12,
//     padding: 16,
//   },
//   summaryTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: Colors.primaryText,
//     marginBottom: 12,
//   },
//   summaryRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   summaryLabel: {
//     fontSize: 16,
//     color: Colors.primaryText,
//   },
//   summaryValue: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: Colors.primary,
//   },
//   submitButton: {
//     position: "absolute",
//     bottom: 20,
//     left: 20,
//     right: 20,
//     backgroundColor: Colors.primary,
//     borderRadius: 8,
//     padding: 16,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   submitButtonText: {
//     color: Colors.textOnPrimary,
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default FundAllocation;

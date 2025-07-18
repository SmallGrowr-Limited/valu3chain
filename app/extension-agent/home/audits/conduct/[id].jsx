import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import Header from "../../../../../components/agent-components/Header";
import { colors } from "../../../../../components/agent-components/constants/colors";

// Audit type descriptions
const auditTypes = {
  "pre-planting": {
    title: "Pre-Planting Audit",
    description:
      "Conducted before planting begins to assess land preparation, soil quality, and input readiness. Focuses on soil testing, seed quality, land clearing, and input availability.",
    checklist: [
      {
        id: "1",
        category: "Land Preparation",
        items: [
          {
            id: "1.1",
            question: "Land properly cleared and leveled",
            value: null,
            notes: "",
          },
          {
            id: "1.2",
            question: "Soil testing conducted",
            value: null,
            notes: "",
          },
          {
            id: "1.3",
            question: "Soil pH level is optimal (6.0-7.0)",
            value: null,
            notes: "",
          },
        ],
      },
      {
        id: "2",
        category: "Input Readiness",
        items: [
          {
            id: "2.1",
            question: "Quality seeds available in sufficient quantity",
            value: null,
            notes: "",
          },
          {
            id: "2.2",
            question: "Fertilizers and amendments available",
            value: null,
            notes: "",
          },
          {
            id: "2.3",
            question: "Equipment prepared and functional",
            value: null,
            notes: "",
          },
        ],
      },
      {
        id: "3",
        category: "Planning",
        items: [
          {
            id: "3.1",
            question: "Planting schedule established",
            value: null,
            notes: "",
          },
          {
            id: "3.2",
            question: "Labor plan in place",
            value: null,
            notes: "",
          },
          {
            id: "3.3",
            question: "Water management plan prepared",
            value: null,
            notes: "",
          },
        ],
      },
    ],
  },
  planting: {
    title: "Planting Audit",
    description:
      "Conducted during planting to ensure proper techniques, spacing, and input application. Verifies planting depth, seed treatment, and initial irrigation.",
    checklist: [
      {
        id: "1",
        category: "Planting Process",
        items: [
          {
            id: "1.1",
            question: "Correct planting depth maintained",
            value: null,
            notes: "",
          },
          {
            id: "1.2",
            question: "Proper plant spacing followed",
            value: null,
            notes: "",
          },
          {
            id: "1.3",
            question: "Seeds treated appropriately if required",
            value: null,
            notes: "",
          },
        ],
      },
      {
        id: "2",
        category: "Input Application",
        items: [
          {
            id: "2.1",
            question: "Fertilizers applied correctly",
            value: null,
            notes: "",
          },
          {
            id: "2.2",
            question: "Pre-emergence herbicides applied properly",
            value: null,
            notes: "",
          },
          {
            id: "2.3",
            question: "Inputs applied at recommended rates",
            value: null,
            notes: "",
          },
        ],
      },
      {
        id: "3",
        category: "Initial Care",
        items: [
          {
            id: "3.1",
            question: "Initial irrigation completed",
            value: null,
            notes: "",
          },
          {
            id: "3.2",
            question: "Protection from birds/animals established",
            value: null,
            notes: "",
          },
          {
            id: "3.3",
            question: "Weather protection measures in place if needed",
            value: null,
            notes: "",
          },
        ],
      },
    ],
  },
  "post-planting": {
    title: "Post-Planting Audit",
    description:
      "Conducted after planting to monitor crop establishment, early growth, and initial pest/disease pressure. Assesses germination rates, early weed control, and irrigation effectiveness.",
    checklist: [
      {
        id: "1",
        category: "Crop Establishment",
        items: [
          {
            id: "1.1",
            question: "Germination rate meets expectations",
            value: null,
            notes: "",
          },
          {
            id: "1.2",
            question: "Uniform crop stand observed",
            value: null,
            notes: "",
          },
          {
            id: "1.3",
            question: "No signs of transplant shock (if applicable)",
            value: null,
            notes: "",
          },
        ],
      },
      {
        id: "2",
        category: "Early Growth",
        items: [
          {
            id: "2.1",
            question: "Plants showing healthy early growth",
            value: null,
            notes: "",
          },
          {
            id: "2.2",
            question: "No signs of nutrient deficiencies",
            value: null,
            notes: "",
          },
          {
            id: "2.3",
            question: "Proper plant color and vigor",
            value: null,
            notes: "",
          },
        ],
      },
      {
        id: "3",
        category: "Pest & Weed Control",
        items: [
          {
            id: "3.1",
            question: "Effective early weed control",
            value: null,
            notes: "",
          },
          {
            id: "3.2",
            question: "No signs of pest infestation",
            value: null,
            notes: "",
          },
          {
            id: "3.3",
            question: "No disease symptoms observed",
            value: null,
            notes: "",
          },
        ],
      },
    ],
  },
  harvest: {
    title: "Harvest Audit",
    description:
      "Conducted before and during harvest to assess crop maturity, harvest readiness, and quality. Verifies harvest timing, equipment, and post-harvest handling plans.",
    checklist: [
      {
        id: "1",
        category: "Harvest Readiness",
        items: [
          {
            id: "1.1",
            question: "Crop at optimal maturity for harvest",
            value: null,
            notes: "",
          },
          {
            id: "1.2",
            question: "Moisture content at appropriate level",
            value: null,
            notes: "",
          },
          {
            id: "1.3",
            question: "Weather conditions suitable for harvest",
            value: null,
            notes: "",
          },
        ],
      },
      {
        id: "2",
        category: "Harvest Process",
        items: [
          {
            id: "2.1",
            question: "Harvest equipment prepared and functional",
            value: null,
            notes: "",
          },
          {
            id: "2.2",
            question: "Proper harvest techniques being used",
            value: null,
            notes: "",
          },
          {
            id: "2.3",
            question: "Minimal harvest losses observed",
            value: null,
            notes: "",
          },
        ],
      },
      {
        id: "3",
        category: "Quality Control",
        items: [
          {
            id: "3.1",
            question: "Product meets quality standards",
            value: null,
            notes: "",
          },
          {
            id: "3.2",
            question: "Proper sorting and grading being done",
            value: null,
            notes: "",
          },
          {
            id: "3.3",
            question: "Contamination prevention measures in place",
            value: null,
            notes: "",
          },
        ],
      },
    ],
  },
  "post-harvest": {
    title: "Post-Harvest Audit",
    description:
      "Conducted after harvest to evaluate storage conditions, handling procedures, and product quality. Assesses drying, storage facilities, pest control, and record keeping.",
    checklist: [
      {
        id: "1",
        category: "Product Handling",
        items: [
          {
            id: "1.1",
            question: "Proper drying process followed",
            value: null,
            notes: "",
          },
          {
            id: "1.2",
            question: "Appropriate moisture content achieved",
            value: null,
            notes: "",
          },
          {
            id: "1.3",
            question: "Cleaning and sorting properly done",
            value: null,
            notes: "",
          },
        ],
      },
      {
        id: "2",
        category: "Storage",
        items: [
          {
            id: "2.1",
            question: "Storage facilities clean and suitable",
            value: null,
            notes: "",
          },
          {
            id: "2.2",
            question: "Proper stacking and ventilation maintained",
            value: null,
            notes: "",
          },
          {
            id: "2.3",
            question: "Pest control measures in place",
            value: null,
            notes: "",
          },
        ],
      },
      {
        id: "3",
        category: "Record Keeping",
        items: [
          {
            id: "3.1",
            question: "Harvest records properly maintained",
            value: null,
            notes: "",
          },
          {
            id: "3.2",
            question: "Quality assessment records available",
            value: null,
            notes: "",
          },
          {
            id: "3.3",
            question: "Storage monitoring system in place",
            value: null,
            notes: "",
          },
        ],
      },
    ],
  },
};

export default function ConductAudit() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [selectedAuditType, setSelectedAuditType] = useState(null);
  const [checklist, setChecklist] = useState([]);
  const [generalObservations, setGeneralObservations] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // In a real app, you would fetch the scheduled audit data based on the id
  const auditData = {
    id: id,
    farmerName: "Kwame Yeboah",
    farmName: "Yeboah Main Farm",
    scheduledDate: "2023-11-15",
  };

  const handleAuditTypeSelect = (type) => {
    setSelectedAuditType(type);
    setChecklist(auditTypes[type].checklist);
  };

  const handleChecklistChange = (categoryId, itemId, field, value) => {
    setChecklist((prev) =>
      prev.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: category.items.map((item) => {
              if (item.id === itemId) {
                return { ...item, [field]: value };
              }
              return item;
            }),
          };
        }
        return category;
      })
    );
  };

  const calculateCompletion = () => {
    if (checklist.length === 0) return 0;
    const totalItems = checklist.reduce(
      (sum, category) => sum + category.items.length,
      0
    );
    const completedItems = checklist.reduce((sum, category) => {
      return sum + category.items.filter((item) => item.value !== null).length;
    }, 0);
    return Math.round((completedItems / totalItems) * 100);
  };

  const handleSubmit = () => {
    if (calculateCompletion() < 100) {
      Alert.alert(
        "Incomplete Audit",
        "You have not completed all checklist items. Are you sure you want to submit?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Submit Anyway", onPress: submitAudit },
        ]
      );
    } else {
      submitAudit();
    }
  };

  const submitAudit = () => {
    setIsSubmitting(true);

    // In a real app, you would submit to your backend here
    setTimeout(() => {
      Alert.alert(
        "Audit Submitted",
        `${auditTypes[selectedAuditType].title} for ${auditData.farmName} has been successfully submitted`,
        [
          {
            text: "OK",
            onPress: () => router.push(`/audits/${auditData.id}`),
          },
        ]
      );
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Header title="Conduct Audit" showBackButton />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Audit Header */}
        <View style={styles.auditHeader}>
          <Text style={styles.farmerName}>{auditData.farmerName}</Text>
          <Text style={styles.farmName}>{auditData.farmName}</Text>
          <Text style={styles.auditDate}>
            Scheduled: {auditData.scheduledDate}
          </Text>

          {!selectedAuditType ? (
            <View style={styles.typeSelectionContainer}>
              <Text style={styles.sectionTitle}>Select Audit Type</Text>
              {Object.keys(auditTypes).map((type) => (
                <TouchableOpacity
                  key={type}
                  style={styles.auditTypeButton}
                  onPress={() => handleAuditTypeSelect(type)}
                >
                  <Text style={styles.auditTypeButtonText}>
                    {auditTypes[type].title}
                  </Text>
                  <Text style={styles.auditTypeDescription}>
                    {auditTypes[type].description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <>
              <View style={styles.selectedAuditType}>
                <Text style={styles.selectedAuditTypeTitle}>
                  {auditTypes[selectedAuditType].title}
                </Text>
                <Text style={styles.selectedAuditTypeDescription}>
                  {auditTypes[selectedAuditType].description}
                </Text>
                <TouchableOpacity
                  style={styles.changeTypeButton}
                  onPress={() => setSelectedAuditType(null)}
                >
                  <Text style={styles.changeTypeButtonText}>
                    Change Audit Type
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.progressContainer}>
                <Text style={styles.progressText}>
                  Completion: {calculateCompletion()}%
                </Text>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${calculateCompletion()}%` },
                    ]}
                  />
                </View>
              </View>
            </>
          )}
        </View>

        {/* Checklist Sections */}
        {selectedAuditType &&
          checklist.map((category) => (
            <View key={category.id} style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>{category.category}</Text>

              {category.items.map((item) => (
                <View key={item.id} style={styles.checklistItem}>
                  <Text style={styles.questionText}>{item.question}</Text>

                  <View style={styles.responseRow}>
                    <View style={styles.booleanOptions}>
                      <TouchableOpacity
                        style={[
                          styles.booleanButton,
                          item.value === true && styles.booleanButtonSelected,
                        ]}
                        onPress={() =>
                          handleChecklistChange(
                            category.id,
                            item.id,
                            "value",
                            true
                          )
                        }
                      >
                        <MaterialCommunityIcons
                          name="check"
                          size={20}
                          color={
                            item.value === true ? colors.white : colors.success
                          }
                        />
                        <Text
                          style={[
                            styles.booleanButtonText,
                            item.value === true &&
                              styles.booleanButtonTextSelected,
                          ]}
                        >
                          Yes
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.booleanButton,
                          item.value === false && styles.booleanButtonSelected,
                        ]}
                        onPress={() =>
                          handleChecklistChange(
                            category.id,
                            item.id,
                            "value",
                            false
                          )
                        }
                      >
                        <MaterialCommunityIcons
                          name="close"
                          size={20}
                          color={
                            item.value === false ? colors.white : colors.danger
                          }
                        />
                        <Text
                          style={[
                            styles.booleanButtonText,
                            item.value === false &&
                              styles.booleanButtonTextSelected,
                          ]}
                        >
                          No
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <TextInput
                      style={styles.notesInput}
                      placeholder="Notes..."
                      value={item.notes}
                      onChangeText={(text) =>
                        handleChecklistChange(
                          category.id,
                          item.id,
                          "notes",
                          text
                        )
                      }
                      multiline
                    />
                  </View>
                </View>
              ))}
            </View>
          ))}

        {/* General Observations */}
        {selectedAuditType && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>General Observations</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Record any general observations about the farm..."
              value={generalObservations}
              onChangeText={setGeneralObservations}
              multiline
              numberOfLines={4}
            />
          </View>
        )}

        {/* Recommendations */}
        {selectedAuditType && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommendations</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Provide recommendations for improvement..."
              value={recommendations}
              onChangeText={setRecommendations}
              multiline
              numberOfLines={4}
            />
          </View>
        )}

        {/* Submit Button */}
        {selectedAuditType && (
          <TouchableOpacity
            style={[
              styles.submitButton,
              isSubmitting && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <FontAwesome
                name="spinner"
                size={20}
                color={colors.white}
                style={styles.spinner}
              />
            ) : (
              <MaterialCommunityIcons
                name="clipboard-check"
                size={20}
                color={colors.white}
              />
            )}
            <Text style={styles.submitButtonText}>
              {isSubmitting ? "Submitting..." : "Submit Audit"}
            </Text>
          </TouchableOpacity>
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
    padding: 16,
    paddingBottom: 32,
  },
  auditHeader: {
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
  },
  farmName: {
    fontSize: 16,
    color: colors.primary,
    marginTop: 4,
  },
  auditDate: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 4,
  },
  typeSelectionContainer: {
    marginTop: 16,
  },
  auditTypeButton: {
    backgroundColor: colors.lightBackground,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  auditTypeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
  auditTypeDescription: {
    fontSize: 14,
    color: colors.dark,
    marginTop: 8,
  },
  selectedAuditType: {
    marginTop: 16,
  },
  selectedAuditTypeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
  selectedAuditTypeDescription: {
    fontSize: 14,
    color: colors.dark,
    marginTop: 8,
  },
  changeTypeButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
  changeTypeButtonText: {
    color: colors.primary,
    fontSize: 14,
    textDecorationLine: "underline",
  },
  progressContainer: {
    marginTop: 16,
  },
  progressText: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  categoryContainer: {
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
    marginBottom: 16,
  },
  questionText: {
    fontSize: 14,
    color: colors.dark,
    marginBottom: 8,
  },
  responseRow: {
    flexDirection: "row",
    gap: 12,
  },
  booleanOptions: {
    flexDirection: "row",
    gap: 8,
    width: 120,
  },
  booleanButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    gap: 4,
  },
  booleanButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  booleanButtonText: {
    fontSize: 14,
  },
  booleanButtonTextSelected: {
    color: colors.white,
  },
  notesInput: {
    flex: 1,
    minHeight: 40,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark,
    marginBottom: 12,
  },
  input: {
    fontSize: 14,
    color: colors.dark,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    padding: 12,
  },
  submitButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
    gap: 8,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  spinner: {
    transform: [{ rotate: "0deg" }],
    animationDuration: "1s",
    animationIterationCount: "infinite",
  },
});

// import { useState, useEffect } from 'react';
// import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Switch, Alert } from 'react-native';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
// import Header from "../../../../../components/agent-components/Header";
// import { colors } from "../../../../../components/agent-components/constants/colors";

// // Mock data - replace with your actual data source
// const auditChecklist = [
//   { id: '1', category: 'Soil Quality', items: [
//     { id: '1.1', question: 'Soil pH level is optimal (6.0-7.0)', value: null, notes: '' },
//     { id: '1.2', question: 'Proper soil drainage observed', value: null, notes: '' },
//     { id: '1.3', question: 'No signs of soil erosion', value: null, notes: '' },
//   ]},
//   { id: '2', category: 'Crop Health', items: [
//     { id: '2.1', question: 'No signs of pest infestation', value: null, notes: '' },
//     { id: '2.2', question: 'No disease symptoms observed', value: null, notes: '' },
//     { id: '2.3', question: 'Proper plant spacing maintained', value: null, notes: '' },
//   ]},
//   { id: '3', category: 'Irrigation', items: [
//     { id: '3.1', question: 'Irrigation system functioning properly', value: null, notes: '' },
//     { id: '3.2', question: 'No signs of over/under watering', value: null, notes: '' },
//     { id: '3.3', question: 'Water source is clean and reliable', value: null, notes: '' },
//   ]},
//   { id: '4', category: 'Input Usage', items: [
//     { id: '4.1', question: 'Fertilizers applied correctly', value: null, notes: '' },
//     { id: '4.2', question: 'Pesticides used as recommended', value: null, notes: '' },
//     { id: '4.3', question: 'Proper storage of farm inputs', value: null, notes: '' },
//   ]},
// ];

// export default function ConductAudit() {
//   const router = useRouter();
//   const { id } = useLocalSearchParams();
//   const [checklist, setChecklist] = useState(auditChecklist);
//   const [generalObservations, setGeneralObservations] = useState('');
//   const [recommendations, setRecommendations] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // In a real app, you would fetch the scheduled audit data based on the id
//   const auditData = {
//     id: id,
//     farmerName: 'Kwame Yeboah',
//     farmName: 'Yeboah Main Farm',
//     scheduledDate: '2023-11-15',
//   };

//   const handleChecklistChange = (categoryId, itemId, field, value) => {
//     setChecklist(prev => prev.map(category => {
//       if (category.id === categoryId) {
//         return {
//           ...category,
//           items: category.items.map(item => {
//             if (item.id === itemId) {
//               return { ...item, [field]: value };
//             }
//             return item;
//           })
//         };
//       }
//       return category;
//     }));
//   };

//   const calculateCompletion = () => {
//     const totalItems = checklist.reduce((sum, category) => sum + category.items.length, 0);
//     const completedItems = checklist.reduce((sum, category) => {
//       return sum + category.items.filter(item => item.value !== null).length;
//     }, 0);
//     return Math.round((completedItems / totalItems) * 100);
//   };

//   const handleSubmit = () => {
//     if (calculateCompletion() < 100) {
//       Alert.alert(
//         'Incomplete Audit',
//         'You have not completed all checklist items. Are you sure you want to submit?',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Submit Anyway', onPress: submitAudit }
//         ]
//       );
//     } else {
//       submitAudit();
//     }
//   };

//   const submitAudit = () => {
//     setIsSubmitting(true);

//     // In a real app, you would submit to your backend here
//     setTimeout(() => {
//       Alert.alert(
//         'Audit Submitted',
//         `Audit for ${auditData.farmName} has been successfully submitted`,
//         [
//           {
//             text: 'OK',
//             onPress: () => router.push(`/audits/${auditData.id}`),
//           }
//         ]
//       );
//       setIsSubmitting(false);
//     }, 1500);
//   };

//   return (
//     <View style={styles.container}>
//       <Header
//         title="Conduct Audit"
//         showBackButton
//       />

//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         {/* Audit Header */}
//         <View style={styles.auditHeader}>
//           <Text style={styles.farmerName}>{auditData.farmerName}</Text>
//           <Text style={styles.farmName}>{auditData.farmName}</Text>
//           <Text style={styles.auditDate}>Scheduled: {auditData.scheduledDate}</Text>

//           <View style={styles.progressContainer}>
//             <Text style={styles.progressText}>Completion: {calculateCompletion()}%</Text>
//             <View style={styles.progressBar}>
//               <View
//                 style={[
//                   styles.progressFill,
//                   { width: `${calculateCompletion()}%` }
//                 ]}
//               />
//             </View>
//           </View>
//         </View>

//         {/* Checklist Sections */}
//         {checklist.map((category) => (
//           <View key={category.id} style={styles.categoryContainer}>
//             <Text style={styles.categoryTitle}>{category.category}</Text>

//             {category.items.map((item) => (
//               <View key={item.id} style={styles.checklistItem}>
//                 <Text style={styles.questionText}>{item.question}</Text>

//                 <View style={styles.responseRow}>
//                   <View style={styles.booleanOptions}>
//                     <TouchableOpacity
//                       style={[
//                         styles.booleanButton,
//                         item.value === true && styles.booleanButtonSelected
//                       ]}
//                       onPress={() => handleChecklistChange(category.id, item.id, 'value', true)}
//                     >
//                       <MaterialCommunityIcons
//                         name="check"
//                         size={20}
//                         color={item.value === true ? colors.white : colors.success}
//                       />
//                       <Text style={[
//                         styles.booleanButtonText,
//                         item.value === true && styles.booleanButtonTextSelected
//                       ]}>
//                         Yes
//                       </Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity
//                       style={[
//                         styles.booleanButton,
//                         item.value === false && styles.booleanButtonSelected
//                       ]}
//                       onPress={() => handleChecklistChange(category.id, item.id, 'value', false)}
//                     >
//                       <MaterialCommunityIcons
//                         name="close"
//                         size={20}
//                         color={item.value === false ? colors.white : colors.danger}
//                       />
//                       <Text style={[
//                         styles.booleanButtonText,
//                         item.value === false && styles.booleanButtonTextSelected
//                       ]}>
//                         No
//                       </Text>
//                     </TouchableOpacity>
//                   </View>

//                   <TextInput
//                     style={styles.notesInput}
//                     placeholder="Notes..."
//                     value={item.notes}
//                     onChangeText={(text) => handleChecklistChange(category.id, item.id, 'notes', text)}
//                     multiline
//                   />
//                 </View>
//               </View>
//             ))}
//           </View>
//         ))}

//         {/* General Observations */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>General Observations</Text>
//           <TextInput
//             style={[styles.input, styles.multilineInput]}
//             placeholder="Record any general observations about the farm..."
//             value={generalObservations}
//             onChangeText={setGeneralObservations}
//             multiline
//             numberOfLines={4}
//           />
//         </View>

//         {/* Recommendations */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Recommendations</Text>
//           <TextInput
//             style={[styles.input, styles.multilineInput]}
//             placeholder="Provide recommendations for improvement..."
//             value={recommendations}
//             onChangeText={setRecommendations}
//             multiline
//             numberOfLines={4}
//           />
//         </View>

//         {/* Submit Button */}
//         <TouchableOpacity
//           style={[
//             styles.submitButton,
//             isSubmitting && styles.submitButtonDisabled
//           ]}
//           onPress={handleSubmit}
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? (
//             <FontAwesome name="spinner" size={20} color={colors.white} style={styles.spinner} />
//           ) : (
//             <MaterialCommunityIcons name="clipboard-check" size={20} color={colors.white} />
//           )}
//           <Text style={styles.submitButtonText}>
//             {isSubmitting ? 'Submitting...' : 'Submit Audit'}
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   scrollContainer: {
//     padding: 16,
//     paddingBottom: 32,
//   },
//   auditHeader: {
//     backgroundColor: colors.white,
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     elevation: 1,
//   },
//   farmerName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: colors.dark,
//   },
//   farmName: {
//     fontSize: 16,
//     color: colors.primary,
//     marginTop: 4,
//   },
//   auditDate: {
//     fontSize: 14,
//     color: colors.gray,
//     marginTop: 4,
//   },
//   progressContainer: {
//     marginTop: 16,
//   },
//   progressText: {
//     fontSize: 14,
//     color: colors.gray,
//     marginBottom: 4,
//   },
//   progressBar: {
//     height: 8,
//     backgroundColor: colors.lightGray,
//     borderRadius: 4,
//     overflow: 'hidden',
//   },
//   progressFill: {
//     height: '100%',
//     backgroundColor: colors.primary,
//     borderRadius: 4,
//   },
//   categoryContainer: {
//     backgroundColor: colors.white,
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     elevation: 1,
//   },
//   categoryTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: colors.dark,
//     marginBottom: 12,
//     paddingBottom: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.lightGray,
//   },
//   checklistItem: {
//     marginBottom: 16,
//   },
//   questionText: {
//     fontSize: 14,
//     color: colors.dark,
//     marginBottom: 8,
//   },
//   responseRow: {
//     flexDirection: 'row',
//     gap: 12,
//   },
//   booleanOptions: {
//     flexDirection: 'row',
//     gap: 8,
//     width: 120,
//   },
//   booleanButton: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 8,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: colors.lightGray,
//     gap: 4,
//   },
//   booleanButtonSelected: {
//     backgroundColor: colors.primary,
//     borderColor: colors.primary,
//   },
//   booleanButtonText: {
//     fontSize: 14,
//   },
//   booleanButtonTextSelected: {
//     color: colors.white,
//   },
//   notesInput: {
//     flex: 1,
//     minHeight: 40,
//     backgroundColor: colors.white,
//     borderWidth: 1,
//     borderColor: colors.lightGray,
//     borderRadius: 8,
//     padding: 8,
//     fontSize: 14,
//   },
//   section: {
//     backgroundColor: colors.white,
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     elevation: 1,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: colors.dark,
//     marginBottom: 12,
//   },
//   input: {
//     fontSize: 14,
//     color: colors.dark,
//   },
//   multilineInput: {
//     minHeight: 100,
//     textAlignVertical: 'top',
//     backgroundColor: colors.white,
//     borderWidth: 1,
//     borderColor: colors.lightGray,
//     borderRadius: 8,
//     padding: 12,
//   },
//   submitButton: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: colors.primary,
//     padding: 16,
//     borderRadius: 8,
//     marginTop: 8,
//     gap: 8,
//   },
//   submitButtonDisabled: {
//     opacity: 0.7,
//   },
//   submitButtonText: {
//     color: colors.white,
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   spinner: {
//     transform: [{ rotate: '0deg' }],
//     animationDuration: '1s',
//     animationIterationCount: 'infinite',
//     // animationKeyframes: [
//     //   { '0%': { transform: [{ rotate: '0deg' }] },
//     //   { '100%': { transform: [{ rotate: '360deg' }] },
//     // ],
//   },
// });

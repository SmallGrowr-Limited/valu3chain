
import { useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import {
  Button,
  DataTable,
  Divider,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { LineChart, BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import InputField from "../../../components/gpartners/InputField";
import PerformanceCard from "../../../components/gpartners/PerformanceCard";
import { Colors } from "../../../components/constants/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;

// Mock data - in a real app, this would come from your API or state management
const mockROIData = [
  {
    id: "F001",
    name: "John Doe",
    invested: 1500000,
    revenue: 2200000,
    expenses: 300000,
    repayment: 1900000,
    expectedROI: 25,
    actualROI: 26.67,
    crops: "Maize, Cassava",
    period: "2023 Q2",
  },
  {
    id: "F002",
    name: "Amina Musa",
    invested: 750000,
    revenue: 900000,
    expenses: 150000,
    repayment: 800000,
    expectedROI: 15,
    actualROI: 6.67,
    crops: "Rice, Sorghum",
    period: "2023 Q2",
  },
  {
    id: "F003",
    name: "Chukwu Emeka",
    invested: 2000000,
    revenue: 3500000,
    expenses: 500000,
    repayment: 3200000,
    expectedROI: 30,
    actualROI: 60,
    crops: "Yam, Cassava",
    period: "2023 Q2",
  },
];

const historicalData = {
  labels: ["2022 Q3", "2022 Q4", "2023 Q1", "2023 Q2"],
  datasets: [
    {
      data: [18, 22, 25, 32], // Average ROI percentages
      color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const categoryPerformance = [
  { category: "Seeds/Seedlings", roi: 28.5 },
  { category: "Fertilizers", roi: 22.1 },
  { category: "Pesticides", roi: 18.7 },
  { category: "Equipment", roi: 15.3 },
  { category: "Labor", roi: 25.8 },
];

export default function ROITracking() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [newROIEntry, setNewROIEntry] = useState({
    farmerId: "",
    revenue: "",
    expenses: "",
    repayment: "",
  });
  const router = useRouter();

  const handleInputChange = (field, value) => {
    setNewROIEntry((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddROI = () => {
    // In a real app, this would update your state/API
    console.log("Adding ROI entry:", newROIEntry);
    setNewROIEntry({
      farmerId: "",
      revenue: "",
      expenses: "",
      repayment: "",
    });
  };

  const filteredData = mockROIData
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (item) =>
        selectedFilter === "all" ||
        (selectedFilter === "positive" && item.actualROI >= item.expectedROI) ||
        (selectedFilter === "negative" && item.actualROI < item.expectedROI)
    );

  const portfolioROI =
    filteredData.reduce((sum, item) => sum + item.actualROI, 0) /
    (filteredData.length || 1);
  const totalInvested = filteredData.reduce(
    (sum, item) => sum + item.invested,
    0
  );
  const totalReturn = filteredData.reduce(
    (sum, item) => sum + item.repayment,
    0
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.navigate("/ecosystem/home")}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Portfolio Management</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text variant="headlineSmall" style={[styles.sectionTitle]}>
        Return on Investment
      </Text>

      {/* Portfolio Summary */}
      <View style={styles.summaryContainer}>
        <PerformanceCard
          title="Portfolio ROI"
          value={`${portfolioROI.toFixed(1)}%`}
          trend={portfolioROI >= 20 ? "up" : "down"}
        />
        <PerformanceCard
          title="Total Invested"
          value={`₦${(totalInvested / 1000000).toFixed(1)}M`}
        />
        <PerformanceCard
          title="Total Return"
          value={`₦${(totalReturn / 1000000).toFixed(1)}M`}
        />
      </View>

      {/* Historical Trend Chart */}
      <View style={styles.chartContainer}>
        <Text variant="titleMedium" style={styles.subsectionTitle}>
          Historical ROI Trend
        </Text>
        <LineChart
          data={historicalData}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundColor: colors.surface,
            backgroundGradientFrom: colors.surface,
            backgroundGradientTo: colors.surface,
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: colors.primary,
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>
      {/* Category Performance */}
      <View style={styles.chartContainer}>
        <Text variant="titleMedium" style={styles.subsectionTitle}>
          Performance by Category
        </Text>
        <BarChart
          data={{
            labels: categoryPerformance.map(
              (item) => item.category.split("/")[0]
            ),
            datasets: [
              {
                data: categoryPerformance.map((item) => item.roi),
              },
            ],
          }}
          width={screenWidth - 32}
          height={220}
          yAxisSuffix="%"
          chartConfig={{
            backgroundColor: Colors.background,
            backgroundGradientFrom: Colors.background,
            backgroundGradientTo: Colors.background,
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={styles.chart}
        />
      </View>
      {/* ROI Data Table */}
      <View style={styles.filterRow}>
        <InputField
          label="Search Farmers"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
          left={<TextInput.Icon icon="magnify" />}
        />
        <Button
          mode={selectedFilter === "all" ? "contained" : "outlined"}
          onPress={() => setSelectedFilter("all")}
          style={styles.filterButton}
        >
          All
        </Button>
        <Button
          mode={selectedFilter === "positive" ? "contained" : "outlined"}
          onPress={() => setSelectedFilter("positive")}
          style={styles.filterButton}
        >
          Positive
        </Button>
        <Button
          mode={selectedFilter === "negative" ? "contained" : "outlined"}
          onPress={() => setSelectedFilter("negative")}
          style={styles.filterButton}
        >
          Negative
        </Button>
      </View>

      <DataTable style={styles.dataTable}>
        <DataTable.Header>
          <DataTable.Title>Farmer</DataTable.Title>
          <DataTable.Title numeric>Invested</DataTable.Title>
          <DataTable.Title numeric>ROI</DataTable.Title>
        </DataTable.Header>

        {filteredData.map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell>
              <Text variant="bodyMedium" style={{ fontWeight: "bold" }}>
                {item.name}
              </Text>
              <Text variant="bodySmall">{item.crops}</Text>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              ₦{(item.invested / 1000).toFixed(0)}K
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Text
                style={{
                  color:
                    item.actualROI >= item.expectedROI ? "#4CAF50" : "#F44336",
                }}
              >
                {item.actualROI.toFixed(1)}%
              </Text>
              <Text variant="bodySmall">(Exp: {item.expectedROI}%)</Text>
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>

      {/* Add New ROI Entry */}
      <Divider style={styles.divider} />
      <Text variant="titleMedium" style={styles.subsectionTitle}>
        Add New ROI Data
      </Text>

      <InputField
        label="Farmer ID"
        value={newROIEntry.farmerId}
        onChangeText={(value) => handleInputChange("farmerId", value)}
      />
      <InputField
        label="Revenue Generated (NGN)"
        value={newROIEntry.revenue}
        onChangeText={(value) => handleInputChange("revenue", value)}
        keyboardType="numeric"
        left={<TextInput.Affix text="₦" />}
      />
      <InputField
        label="Farmer Expenses (NGN)"
        value={newROIEntry.expenses}
        onChangeText={(value) => handleInputChange("expenses", value)}
        keyboardType="numeric"
        left={<TextInput.Affix text="₦" />}
      />
      <InputField
        label="Repayment Amount (NGN)"
        value={newROIEntry.repayment}
        onChangeText={(value) => handleInputChange("repayment", value)}
        keyboardType="numeric"
        left={<TextInput.Affix text="₦" />}
      />

      <Button
        mode="contained"
        onPress={handleAddROI}
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        labelStyle={styles.buttonLabel}
        disabled={
          !newROIEntry.farmerId ||
          !newROIEntry.revenue ||
          !newROIEntry.repayment
        }
      >
        Add ROI Data
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: "#f5f5f5",
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
  sectionTitle: {
    marginBottom: 24,
    fontWeight: "bold",
    color: Colors.primary,
  },
  subsectionTitle: {
    marginVertical: 16,
    fontWeight: "bold",
    //color: Colors.primary,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  chartContainer:{
    backgroundColor:"#fff",
    marginBottom:15
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginVertical: 16,
  },
  searchInput: {
    flex: 1,
    minWidth: "100%",
    marginBottom: 8,
  },
  filterButton: {
    marginRight: 8,
    marginBottom: 8,
  },
  dataTable: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  divider: {
    marginVertical: 16,
  },
  addButton: {
    marginTop: 16,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
  },
});

// import {
//   View,
//   ScrollView,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import ROIWidget from "../../../components/elements/ROIWidget";
// import { Colors } from "../../../components/constants/colors";
// import { returnsData } from "../../../components/constants/data";

// // Helper function to calculate average time remaining
// const calculateAverageRemaining = (projects) => {
//   const totalMonths = projects.reduce((sum, project) => {
//     const [current, total] = project.duration.split('/').map(Number);
//     return sum + (total - current);
//   }, 0);
//   const average = totalMonths / projects.length;
//   return `${Math.round(average)} months avg`;
// };

// export default function Returns() {
//   const router = useRouter();
//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
      // <View style={styles.header}>
      //   <TouchableOpacity
      //     onPress={() => router.navigate("/ecosystem/dashboard")}
      //   >
      //     <Ionicons name="arrow-back" size={24} color={Colors.primary} />
      //   </TouchableOpacity>
      //   <Text style={styles.headerTitle}>Portfolio Management</Text>
      //   <View style={{ width: 24 }} />
      // </View>

//       <View style={styles.roiSummary}>
//         <Text style={styles.sectionTitle}>Portfolio ROI Summary</Text>
//         <ROIWidget
//           data={{
//             currentROI: returnsData.summary.averageROI,
//             targetROI: returnsData.summary.bestPerforming.roi,
//             amount: returnsData.summary.totalInvested,
//             timeRemaining: calculateAverageRemaining(returnsData.projects),
//           }}
//         />
//       </View>

//       <Text style={styles.sectionTitle}>Project Returns</Text>
//       {returnsData.projects.map((project, index) => (
//         <View key={index} style={styles.projectCard}>
//           <Text style={styles.projectName}>{project.name}</Text>
//           <Text style={styles.projectRoi}>ROI: {project.roi}%</Text>
//           <Text style={styles.projectAmount}>
//             Amount: ₦{project.amount.toLocaleString()}
//           </Text>

//           <View style={styles.reinvestmentButtons}>
//             <TouchableOpacity style={styles.reinvestButton}>
//               <Text style={styles.buttonText}>Reinvest in New Project</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.reinvestButton}>
//               <Text style={styles.buttonText}>Add to Existing Project</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       ))}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.background,
//     padding: 16,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 24,
//   },
//   headerTitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: Colors.primaryText,
//   },
//   filterButton: {
//     backgroundColor: Colors.lightGray,
//     borderRadius: 8,
//     padding: 8,
//   },
//   summaryContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   summaryCard: {
//     flex: 1,
//     backgroundColor: Colors.surface,
//     borderRadius: 12,
//     padding: 16,
//     marginHorizontal: 4,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   primaryCard: {
//     backgroundColor: Colors.primary,
//   },
//   summaryLabel: {
//     fontSize: 14,
//     color: Colors.secondaryText,
//     marginBottom: 4,
//   },
//   summaryValue: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: Colors.primaryText,
//     marginBottom: 8,
//   },
//   positiveValue: {
//     color: Colors.success,
//   },
//   summarySubtext: {
//     fontSize: 14,
//     color: Colors.secondaryText,
//   },
//   chartContainer: {
//     backgroundColor: Colors.surface,
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: Colors.primaryText,
//     marginBottom: 16,
//   },
//   performanceContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   performanceCard: {
//     flex: 1,
//     backgroundColor: Colors.surface,
//     borderRadius: 12,
//     padding: 16,
//     marginHorizontal: 4,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   performanceHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   performanceTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: Colors.primaryText,
//     marginLeft: 8,
//   },
//   performanceProject: {
//     fontSize: 14,
//     color: Colors.primaryText,
//     marginBottom: 4,
//   },
//   performanceROI: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   projectCard: {
//     backgroundColor: Colors.surface,
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   projectHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   projectName: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: Colors.primaryText,
//     flex: 1,
//   },
//   projectROI: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginLeft: 8,
//   },
//   positiveROI: {
//     color: Colors.success,
//   },
//   negativeROI: {
//     color: Colors.warning,
//   },
//   projectDetails: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   projectAmount: {
//     fontSize: 14,
//     color: Colors.secondaryText,
//   },
//   projectDuration: {
//     fontSize: 14,
//     color: Colors.secondaryText,
//   },
//   projectStatus: {
//     borderRadius: 12,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//   },
//   statusCompleted: {
//     backgroundColor: Colors.successLight,
//   },
//   statusActive: {
//     backgroundColor: Colors.primaryLight,
//   },
//   projectStatusText: {
//     fontSize: 12,
//     fontWeight: "600",
//     textTransform: "capitalize",
//   },
//   reinvestButton: {
//     backgroundColor: Colors.secondary,
//     borderRadius: 12,
//     padding: 16,
//     alignItems: "center",
//     marginTop: 16,
//     marginBottom: 32,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   reinvestButtonText: {
//     color: Colors.textOnSecondary,
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });
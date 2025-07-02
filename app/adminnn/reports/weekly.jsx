import { View, Text, ScrollView, StyleSheet } from "react-native";
import { DataTable, Card, Button, Menu, Divider } from "react-native-paper";
import { useState } from "react";
import { LineChart, BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

export default function WeeklyReports() {
  const [selectedWeek, setSelectedWeek] = useState("May 22-28, 2023");
  const [menuVisible, setMenuVisible] = useState(false);
  const screenWidth = Dimensions.get("window").width;

  const weeks = [
    "May 1-7, 2023",
    "May 8-14, 2023",
    "May 15-21, 2023",
    "May 22-28, 2023",
    "May 29-Jun 4, 2023"
  ];

  // Sample data - in a real app, this would come from an API
  const reportData = {
    keyMetrics: {
      newFarmers: 24,
      inputsDistributed: 185,
      produceCollected: 4200, // kg
      investmentsReceived: 32500, // $
    },
    farmerOnboarding: {
      daily: [5, 8, 3, 4, 2, 2, 0], // Sun-Sat
      total: 24,
      byRegion: [
        { region: "North", count: 10 },
        { region: "South", count: 8 },
        { region: "East", count: 6 },
      ],
    },
    inputDistribution: {
      types: [
        { type: "Seeds", quantity: 95 },
        { type: "Fertilizer", quantity: 65 },
        { type: "Chemicals", quantity: 25 },
      ],
      daily: [30, 25, 20, 35, 40, 25, 10], // Sun-Sat
    },
    marketTrends: {
      maize: [145, 147, 150, 148, 152, 155, 153], // Price per kg
      rice: [195, 193, 190, 195, 200, 198, 200],
    },
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Weekly Reports</Text>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button 
              mode="contained" 
              onPress={() => setMenuVisible(true)}
              style={styles.weekSelector}
            >
              {selectedWeek}
            </Button>
          }
        >
          {weeks.map(week => (
            <Menu.Item 
              key={week}
              onPress={() => {
                setSelectedWeek(week);
                setMenuVisible(false);
              }} 
              title={week} 
            />
          ))}
        </Menu>
      </View>

      {/* Key Metrics Summary */}
      <Card style={styles.card}>
        <Card.Title title="Key Metrics" />
        <Card.Content style={styles.metricsContainer}>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{reportData.keyMetrics.newFarmers}</Text>
            <Text style={styles.metricLabel}>New Farmers</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{reportData.keyMetrics.inputsDistributed}</Text>
            <Text style={styles.metricLabel}>Inputs Distributed</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{reportData.keyMetrics.produceCollected} kg</Text>
            <Text style={styles.metricLabel}>Produce Collected</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>${reportData.keyMetrics.investmentsReceived.toLocaleString()}</Text>
            <Text style={styles.metricLabel}>Investments</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Farmer Onboarding */}
      <Card style={styles.card}>
        <Card.Title title="Farmer Onboarding" />
        <Card.Content>
          <LineChart
            data={{
              labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              datasets: [{
                data: reportData.farmerOnboarding.daily,
                color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
                strokeWidth: 2
              }]
            }}
            width={screenWidth - 32}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={styles.chart}
          />

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Region</DataTable.Title>
              <DataTable.Title numeric>New Farmers</DataTable.Title>
            </DataTable.Header>

            {reportData.farmerOnboarding.byRegion.map((region, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{region.region}</DataTable.Cell>
                <DataTable.Cell numeric>{region.count}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>

      {/* Input Distribution */}
      <Card style={styles.card}>
        <Card.Title title="Input Distribution" />
        <Card.Content>
          <BarChart
            data={{
              labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              datasets: [{
                data: reportData.inputDistribution.daily
              }]
            }}
            width={screenWidth - 32}
            height={220}
            yAxisSuffix=" units"
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={styles.chart}
          />

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Input Type</DataTable.Title>
              <DataTable.Title numeric>Quantity</DataTable.Title>
            </DataTable.Header>

            {reportData.inputDistribution.types.map((input, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{input.type}</DataTable.Cell>
                <DataTable.Cell numeric>{input.quantity}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>

      {/* Market Trends */}
      <Card style={styles.card}>
        <Card.Title title="Market Price Trends" />
        <Card.Content>
          <LineChart
            data={{
              labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              datasets: [
                {
                  data: reportData.marketTrends.maize,
                  color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // orange
                  strokeWidth: 2,
                  label: "Maize"
                },
                {
                  data: reportData.marketTrends.rice,
                  color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // green
                  strokeWidth: 2,
                  label: "Rice"
                }
              ]
            }}
            width={screenWidth - 32}
            height={220}
            yAxisSuffix="/kg"
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      {/* Export Button */}
      <Button 
        mode="contained" 
        icon="file-export" 
        style={styles.exportButton}
        onPress={() => console.log("Export weekly report")}
      >
        Export Weekly Report
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  weekSelector: {
    width: 180,
  },
  card: {
    marginBottom: 16,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricItem: {
    width: '48%',
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
  },
  exportButton: {
    marginTop: 8,
    marginBottom: 24,
  },
});
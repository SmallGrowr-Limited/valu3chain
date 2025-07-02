import { View, Text, ScrollView, StyleSheet } from "react-native";
import { DataTable, Card, Button, Menu, Divider } from "react-native-paper";
import { useState } from "react";
import { BarChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

export default function MonthlyReports() {
  const [selectedMonth, setSelectedMonth] = useState("May 2023");
  const [menuVisible, setMenuVisible] = useState(false);

  const months = [
    "January 2023", "February 2023", "March 2023", 
    "April 2023", "May 2023", "June 2023"
  ];

  // Sample data - in a real app, this would come from an API
  const reportData = {
    investments: {
      total: 125000,
      byType: [
        { type: "Input Supply", amount: 60000 },
        { type: "Produce Buyback", amount: 65000 },
      ],
      partners: [
        { name: "AgroTech Ltd", amount: 50000 },
        { name: "GrainCo", amount: 40000 },
        { name: "Seed Masters", amount: 35000 },
      ],
    },
    produceSold: {
      total: 85000,
      byProduct: [
        { product: "Maize", amount: 45000, quantity: 300 },
        { product: "Rice", amount: 25000, quantity: 125 },
        { product: "Beans", amount: 15000, quantity: 60 },
      ],
    },
    inputUsage: {
      totalDistributed: 1200,
      byType: [
        { type: "Seeds", quantity: 600 },
        { type: "Fertilizer", quantity: 400 },
        { type: "Chemicals", quantity: 200 },
      ],
    },
    agentPerformance: [
      { name: "Agent 1", farmers: 45, inputs: 120, verified: 38 },
      { name: "Agent 2", farmers: 38, inputs: 95, verified: 32 },
      { name: "Agent 3", farmers: 28, inputs: 75, verified: 25 },
    ],
  };

  const screenWidth = Dimensions.get("window").width;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Monthly Reports</Text>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button 
              mode="contained" 
              onPress={() => setMenuVisible(true)}
              style={styles.monthSelector}
            >
              {selectedMonth}
            </Button>
          }
        >
          {months.map(month => (
            <Menu.Item 
              key={month}
              onPress={() => {
                setSelectedMonth(month);
                setMenuVisible(false);
              }} 
              title={month} 
            />
          ))}
        </Menu>
      </View>

      {/* Investments Report */}
      <Card style={styles.card}>
        <Card.Title title="Investments Summary" />
        <Card.Content>
          <Text style={styles.summaryText}>
            Total Investments: ${reportData.investments.total.toLocaleString()}
          </Text>
          
          <BarChart
            data={{
              labels: reportData.investments.byType.map(item => item.type),
              datasets: [{
                data: reportData.investments.byType.map(item => item.amount / 1000)
              }]
            }}
            width={screenWidth - 32}
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            style={styles.chart}
          />

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Partner</DataTable.Title>
              <DataTable.Title numeric>Amount</DataTable.Title>
            </DataTable.Header>

            {reportData.investments.partners.map((partner, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{partner.name}</DataTable.Cell>
                <DataTable.Cell numeric>${partner.amount.toLocaleString()}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>

      {/* Produce Sold Report */}
      <Card style={styles.card}>
        <Card.Title title="Produce Sold" />
        <Card.Content>
          <Text style={styles.summaryText}>
            Total Sales: ${reportData.produceSold.total.toLocaleString()}
          </Text>
          
          <PieChart
            data={reportData.produceSold.byProduct.map(product => ({
              name: product.product,
              population: product.amount,
              color: getRandomColor(),
              legendFontColor: '#7F7F7F',
              legendFontSize: 12,
            }))}
            width={screenWidth - 32}
            height={200}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            style={styles.chart}
          />

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Product</DataTable.Title>
              <DataTable.Title numeric>Quantity</DataTable.Title>
              <DataTable.Title numeric>Amount</DataTable.Title>
            </DataTable.Header>

            {reportData.produceSold.byProduct.map((product, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{product.product}</DataTable.Cell>
                <DataTable.Cell numeric>{product.quantity} kg</DataTable.Cell>
                <DataTable.Cell numeric>${product.amount.toLocaleString()}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>

      {/* Input Usage Report */}
      <Card style={styles.card}>
        <Card.Title title="Input Usage" />
        <Card.Content>
          <Text style={styles.summaryText}>
            Total Distributed: {reportData.inputUsage.totalDistributed} units
          </Text>
          
          {/* <BarChart
            data={{
              labels: reportData.inputUsage.byType.map(item => item.type),
              datasets: [{
                data: reportData.inputUsage.byType.map(item => item.quantity)
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
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})',
            }}
            style={styles.chart}
          /> */}
        </Card.Content>
      </Card>

      {/* Agent Performance Report */}
      <Card style={styles.card}>
        <Card.Title title="Agent Performance" />
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Agent</DataTable.Title>
              <DataTable.Title numeric>Farmers</DataTable.Title>
              <DataTable.Title numeric>Inputs</DataTable.Title>
              <DataTable.Title numeric>Verified</DataTable.Title>
            </DataTable.Header>

            {reportData.agentPerformance.map((agent, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{agent.name}</DataTable.Cell>
                <DataTable.Cell numeric>{agent.farmers}</DataTable.Cell>
                <DataTable.Cell numeric>{agent.inputs}</DataTable.Cell>
                <DataTable.Cell numeric>{agent.verified}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>

      {/* Export Button */}
      <Button 
        mode="contained" 
        icon="file-export" 
        style={styles.exportButton}
        onPress={() => console.log("Export report")}
      >
        Export Full Report
      </Button>
    </ScrollView>
  );
}

// Helper function to generate random colors for pie chart
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
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
  monthSelector: {
    width: 150,
  },
  card: {
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
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
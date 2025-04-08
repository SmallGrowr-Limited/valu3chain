import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react';
import { PieChart } from "react-native-chart-kit";

export default function PieChartComponent() {
    const screenWidth = Dimensions.get("window").width;
    const data = [
      {
        name: "Maize",
        population: 48000,
        color: "#9F43CC",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Beans",
        population: 100000,
        color: "#0CA85D",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },

      {
        name: "Tomatoes",
        population: 38000,
        color: "#2B87E3",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "Rice",
        population: 55000,
        color: "#EBA10F",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
    ];

    const chartConfig = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false, // optional
    };

  return (
    <View>
      <PieChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[10, 10]}
        absolute
      />
    </View>
  );
}

const styles = StyleSheet.create({})
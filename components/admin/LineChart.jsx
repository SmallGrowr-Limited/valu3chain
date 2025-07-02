import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from 'react-native-paper';
//import priceData from './data/testData';

const priceData = {
    labels: ['Jun 1', 'Jun 2', 'Jun 3', 'Jun 4', 'Jun 5', 'Jun 6', 'Jun 7'],
    datasets: [
      {
        data: [45, 46, 47, 48, 49, 50, 51],
        color: (opacity = 1) => `rgba(255, 167, 38, ${opacity})`, // Orange
        strokeWidth: 2
      }
    ],
    legend: ["Maize Prices (UGX/kg)"]
  };
  
export default function CustomLineChart({ data, width, height }) {
  const { colors } = useTheme();

  if (!data || !data.labels ) {
    return (
      <View style={{ width, height, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No chart data available</Text>
      </View>
    );
  }
  const chartConfig = {
    backgroundColor: colors.surface,
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surfaceVariant,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(${hexToRgb(colors.primary)}, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(${hexToRgb(colors.text)}, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: colors.primary
    }
  };


  return (
    <View>
      <LineChart
        data={data}
        width={width || 300}
        height={height || 220}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  );
}

// Helper function to convert hex to rgb
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? 
    `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` 
    : '0, 0, 0';
}
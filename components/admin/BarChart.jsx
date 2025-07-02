import React from 'react';
import { View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useTheme } from 'react-native-paper';
//import distributionData from './data/testData';

const distributionData = {
    labels: ['North', 'East', 'West', 'South'],
    datasets: [
      {
        data: [450, 380, 520, 410]
      }
    ],
    legend: ["Seeds Distributed (bags)"],
    barColors: ['#8BC34A', '#8BC34A', '#8BC34A', '#8BC34A'] // Light Green
  };

export default function CustomBarChart({ data, width, height }) {
  const { colors } = useTheme();

  const chartConfig = {
    backgroundColor: colors.surface,
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surfaceVariant,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(${colors.primary}, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(${colors.text}, ${opacity})`,
    style: {
      borderRadius: 16
    },
    barPercentage: 0.5
  };

  return (
    <View>
      <BarChart
        data={data}
        width={width || 300}
        height={height || 220}
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        fromZero
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  );
}

// Helper function to convert hex to rgb
// function hexToRgb(hex) {
//     const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//     return result ? 
//       `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` 
//       : '0, 0, 0';
//   }
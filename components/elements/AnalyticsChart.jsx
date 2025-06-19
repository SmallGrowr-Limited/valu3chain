import React from "react";
import { View, Text, Dimensions } from "react-native";
import { BarChart, LineChart, ProgressChart } from "react-native-chart-kit";
import { Colors } from "../constants/colors";

const AnalyticsChart = ({
  height = 250,
  type = "bar",
  title,
  data,
  labels,
}) => {
  const screenWidth = Dimensions.get("window").width - 40;

  // Default empty data if none provided
  const safeData = data || [15, 18, 22, 19, 25, 28];
  const safeLabels = labels || ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  const chartConfig = {
    backgroundColor: Colors.background,
    backgroundGradientFrom: Colors.background,
    backgroundGradientTo: Colors.background,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      stroke: Colors.waterBlue,
    },
  };

  if (type === "progress") {
    return (
      <View>
        {title && (
          <Text style={{ fontWeight: "bold", marginBottom: 8 }}>{title}</Text>
        )}
        <ProgressChart
          data={{
            labels: safeLabels,
            data: safeData,
            colors: [Colors.primary, Colors.secondary, Colors.success],
          }}
          width={screenWidth}
          height={height}
          chartConfig={chartConfig}
          hideLegend={false}
        />
      </View>
    );
  }

  if (type === "line") {
    return (
      <View>
        {title && (
          <Text style={{ fontWeight: "bold", marginBottom: 8 }}>{title}</Text>
        )}
        <LineChart
          data={{
            labels: safeLabels,
            datasets: [
              {
                data: safeData,
              },
            ],
          }}
          width={screenWidth}
          height={height}
          chartConfig={chartConfig}
          bezier
        />
      </View>
    );
  }

  // Default to bar chart
  return (
    <View>
      {title && (
        <Text style={{ fontWeight: "bold", marginBottom: 8 }}>{title}</Text>
      )}
      <BarChart
        data={{
          labels: safeLabels,
          datasets: [
            {
              data: safeData,
            },
          ],
        }}
        width={screenWidth}
        height={height}
        yAxisLabel="₦"
        chartConfig={chartConfig}
        verticalLabelRotation={30}
        fromZero
      />
    </View>
  );
};

export default AnalyticsChart;


import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function AllocationChart({ allocations }) {
  const { colors } = useTheme();

  const data = allocations.map((item) => ({
    name: item.name,
    percentage: item.allocated,
    color: getRandomColor(),
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
  }));

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <View style={styles.container}>
      <PieChart
        data={data.filter((item) => item.percentage > 0)}
        width={screenWidth - 32}
        height={200}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="percentage"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 16,
  },
});

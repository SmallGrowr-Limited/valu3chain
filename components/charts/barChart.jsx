
import React, {useState} from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { SelectList } from "react-native-dropdown-select-list";

const screenWidth = Dimensions.get("window").width;

const BarChartComponent = () => {
  const [crop, setCrop] = useState("");
  const [da, setCro] = useState("");
  
   const crops = [
     { key: "1", value: "White Maize" },
     { key: "2", value: "Rice" },
     { key: "4", value: "Beans" },
   ];
   
   const handleCropSelection = (val)=>{
    setCrop(val)
    console.log(crop)
   }

   const dd = [45000, 44000, 43000, 42000];

  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        data: dd,
      },
    ],
    
  };

  const config = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#e26a00",
    backgroundGradientTo: "#e26a00",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: { borderRadius: 12 },
    propsForBackgroundLines: { strokeDasharray: "" },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };

  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 5 }}>
        <SelectList
          setSelected={handleCropSelection}
          data={crops}
          save="value"
          defaultOption={{ key: "1", value: "White Maize" }}
        />
      </View>
      <BarChart
        data={data}
        width={screenWidth - 40}
        height={230}
        yAxisLabel="₦"
        chartConfig={config}
        style={styles.chart}
        verticalLabelRotation={2}
        //showValuesOnTopOfBars
      />
      <Text style={styles.title}>SmallGrowr Weekly Price Update</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: "#fff", borderRadius: 10 },
  title: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chart: { borderRadius: 16 },
});

export default BarChartComponent;

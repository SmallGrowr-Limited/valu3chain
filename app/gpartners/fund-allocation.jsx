import { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import CategoryCard from "../../components/gpartners/CategoryCard";
import AllocationChart from "../../components/gpartners/AllocationChart";

const categories = [
  { id: 1, name: "Seeds/Seedlings", allocated: 0, max: 30 },
  { id: 2, name: "Fertilizers", allocated: 0, max: 20 },
  { id: 3, name: "Pesticides/Herbicides", allocated: 0, max: 15 },
  { id: 4, name: "Equipment Rental", allocated: 0, max: 10 },
  { id: 5, name: "Labor", allocated: 0, max: 15 },
  { id: 6, name: "Irrigation", allocated: 0, max: 5 },
  { id: 7, name: "Transportation", allocated: 0, max: 5 },
  { id: 8, name: "Processing", allocated: 0, max: 5 },
  { id: 9, name: "Miscellaneous", allocated: 0, max: 5 },
];

export default function FundAllocation() {
  const { colors } = useTheme();
  const [allocations, setAllocations] = useState(categories);

  const handleAllocationChange = (id, value) => {
    setAllocations((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, allocated: Math.min(Number(value), item.max) }
          : item
      )
    );
  };

  const totalAllocated = allocations.reduce(
    (sum, item) => sum + item.allocated,
    0
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text
        variant="headlineSmall"
        style={[styles.sectionTitle, { color: colors.primary }]}
      >
        Fund Allocation by Category
      </Text>

      <AllocationChart allocations={allocations} />

      <View style={styles.totalContainer}>
        <Text variant="titleMedium">Total Allocated: {totalAllocated}%</Text>
        <Text
          variant="titleMedium"
          style={{
            color: totalAllocated > 100 ? colors.error : colors.primary,
          }}
        >
          Remaining: {100 - totalAllocated}%
        </Text>
      </View>

      <View style={styles.categoriesContainer}>
        {allocations.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onAllocationChange={handleAllocationChange}
          />
        ))}
      </View>

      <Button
        mode="contained"
        onPress={() => console.log(allocations)}
        style={[styles.button, { backgroundColor: colors.primary }]}
        labelStyle={styles.buttonLabel}
        disabled={totalAllocated !== 100}
      >
        Confirm Allocation
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    marginBottom: 24,
    fontWeight: "bold",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
  },
});

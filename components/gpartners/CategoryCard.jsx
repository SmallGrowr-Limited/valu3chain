import { StyleSheet, View } from "react-native";
import { ProgressBar, Text, TextInput, useTheme } from "react-native-paper";

export default function CategoryCard({ category, onAllocationChange }) {
  const { colors } = useTheme();
  const progress = category.allocated / category.max;

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <Text variant="titleMedium" style={styles.categoryName}>
        {category.name}
      </Text>
      <View style={styles.row}>
        <TextInput
          value={category.allocated.toString()}
          onChangeText={(value) => onAllocationChange(category.id, value)}
          keyboardType="numeric"
          style={styles.input}
          dense
          right={<TextInput.Affix text="%" />}
        />
        <Text style={styles.maxText}>of {category.max}%</Text>
      </View>
      <ProgressBar
        progress={progress}
        color={progress > 1 ? colors.error : colors.primary}
        style={styles.progressBar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  categoryName: {
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  input: {
    width: 80,
    height: 40,
    marginRight: 8,
    backgroundColor: "transparent",
  },
  maxText: {
    color: "#666",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
});

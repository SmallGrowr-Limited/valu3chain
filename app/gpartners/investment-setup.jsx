import { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  Button,
  Text,
  TextInput,
  useTheme,
  Title,
  Paragraph,
} from "react-native-paper";
import InputField from "../../components/gpartners/InputField";
import Header from "../../components/gpartners/Header";

export default function InvestmentSetup() {
  const { colors } = useTheme();
  const [totalAmount, setTotalAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSave = () => {
    // Save logic here
    console.log({ totalAmount, startDate, endDate });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text
        variant="headlineSmall"
        style={[styles.sectionTitle, { color: colors.primary }]}
      >
        Investment Overview
      </Text>

      <Paragraph style={styles.paragraph}>
        Define the total investment capital for the current cycle and specify
        the investment period.
      </Paragraph>

      <InputField
        label="Total Investment Amount (NGN)"
        value={totalAmount}
        onChangeText={setTotalAmount}
        keyboardType="numeric"
        left={<TextInput.Affix text="₦" />}
      />

      <View style={styles.dateRow}>
        <InputField
          label="Start Date"
          value={startDate}
          onChangeText={setStartDate}
          placeholder="DD/MM/YYYY"
          style={styles.dateInput}
        />
        <InputField
          label="End Date"
          value={endDate}
          onChangeText={setEndDate}
          placeholder="DD/MM/YYYY"
          style={styles.dateInput}
        />
      </View>

      <Button
        mode="contained"
        onPress={handleSave}
        style={[styles.button, { backgroundColor: colors.primary }]}
        labelStyle={styles.buttonLabel}
      >
        Save Investment Setup
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
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  paragraph: {
    marginBottom: 15,
    color: "#555",
    textAlign: "center",
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  dateInput: {
    width: "48%",
  },
  button: {
    marginTop: 24,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
  },
});

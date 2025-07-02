// InvestmentOverviewScreen.js
import React, { useState } from "react";
import { View, StyleSheet, Platform, ScrollView } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Card,
  Title,
  Paragraph,
  Portal,
  Dialog,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

// A simple screen for inputting the total investment amount and period.
const InvestmentOverviewScreen = () => {
  const [totalInvestment, setTotalInvestment] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [investmentStatus, setInvestmentStatus] = useState(null); // 'success' or 'error'

  // Mock values for demonstration
  const [allocatedFunds, setAllocatedFunds] = useState(0);
  const [remainingFunds, setRemainingFunds] = useState(0);

  // Handle date change for the start date picker
  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(Platform.OS === "ios"); // Keep picker open on iOS, close on Android
    setStartDate(currentDate);
  };

  // Handle date change for the end date picker
  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(Platform.OS === "ios"); // Keep picker open on iOS, close on Android
    setEndDate(currentDate);
  };

  // Function to save investment details (mock function)
  const handleSaveInvestment = () => {
    // Basic validation
    if (
      !totalInvestment ||
      isNaN(parseFloat(totalInvestment)) ||
      parseFloat(totalInvestment) <= 0
    ) {
      setInvestmentStatus("error");
      return;
    }
    if (startDate >= endDate) {
      setInvestmentStatus("error");
      return;
    }

    // In a real app, you would send this data to a backend or update global state
    console.log("Total Investment:", parseFloat(totalInvestment));
    console.log("Start Date:", startDate.toDateString());
    console.log("End Date:", endDate.toDateString());

    // Update mock allocated/remaining funds for demonstration
    const total = parseFloat(totalInvestment);
    setAllocatedFunds(total * 0.4); // Simulate 40% allocated for demo
    setRemainingFunds(total * 0.6); // Simulate 60% remaining for demo

    setInvestmentStatus("success");
  };

  // Function to dismiss the status dialog
  const dismissStatusDialog = () => {
    setInvestmentStatus(null);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Investment Amount Input Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>Investment Overview</Title>
          <Paragraph style={styles.paragraph}>
            Define the total investment capital for the current cycle and
            specify the investment period.
          </Paragraph>
          <TextInput
            label="Total Investment Amount (NGN)"
            value={totalInvestment}
            onChangeText={(text) => setTotalInvestment(text)}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
            left={<TextInput.Icon icon="cash" />}
          />

          {/* Start Date Picker */}
          <View style={styles.datePickerContainer}>
            <TextInput
              label="Start Date"
              value={startDate.toDateString()}
              mode="outlined"
              style={styles.dateInput}
              onFocus={() => setShowStartDatePicker(true)}
              showSoftInputOnFocus={false} // Prevent keyboard from showing on date input focus
              left={<TextInput.Icon icon="calendar" />}
            />
            {showStartDatePicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={onChangeStartDate}
                maximumDate={endDate} // Start date cannot be after end date
              />
            )}
          </View>

          {/* End Date Picker */}
          <View style={styles.datePickerContainer}>
            <TextInput
              label="End Date"
              value={endDate.toDateString()}
              mode="outlined"
              style={styles.dateInput}
              onFocus={() => setShowEndDatePicker(true)}
              showSoftInputOnFocus={false} // Prevent keyboard from showing on date input focus
              left={<TextInput.Icon icon="calendar-check" />}
            />
            {showEndDatePicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={onChangeEndDate}
                minimumDate={startDate} // End date cannot be before start date
              />
            )}
          </View>

          <Button
            mode="contained"
            onPress={handleSaveInvestment}
            icon="content-save"
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            Save Investment Details
          </Button>
        </Card.Content>
      </Card>

      {/* Investment Summary Card */}
      {totalInvestment && !isNaN(parseFloat(totalInvestment)) && (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Current Investment Status</Title>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Total Capital:</Text>
              <Text style={styles.statusValue}>
                NGN {parseFloat(totalInvestment).toLocaleString()}
              </Text>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Allocated Funds:</Text>
              <Text style={styles.statusValue}>
                NGN {allocatedFunds.toLocaleString()}
              </Text>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Remaining Funds:</Text>
              <Text style={styles.statusValue}>
                NGN {remainingFunds.toLocaleString()}
              </Text>
            </View>
            <Paragraph style={styles.infoText}>
              Keep track of your total budget and how much has been distributed
              to categories and farmers.
            </Paragraph>
          </Card.Content>
        </Card>
      )}

      {/* Status Dialog */}
      <Portal>
        <Dialog
          visible={investmentStatus !== null}
          onDismiss={dismissStatusDialog}
        >
          <Dialog.Icon
            icon={
              investmentStatus === "success" ? "check-circle" : "alert-circle"
            }
            size={48}
          />
          <Dialog.Title style={styles.dialogTitle}>
            {investmentStatus === "success" ? "Success!" : "Error!"}
          </Dialog.Title>
          <Dialog.Content>
            <Paragraph style={styles.dialogContentText}>
              {investmentStatus === "success"
                ? "Investment details saved successfully."
                : "Please enter a valid total investment amount and ensure the end date is after the start date."}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={dismissStatusDialog}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    padding: 16,
  },
  card: {
    marginBottom: 20,
    borderRadius: 12,
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  input: {
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  datePickerContainer: {
    marginBottom: 15,
  },
  dateInput: {
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
    paddingVertical: 4,
    backgroundColor: "#4CAF50", // Green button
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  statusValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF", // Blue for values
  },
  infoText: {
    marginTop: 15,
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    textAlign: "center",
  },
  dialogTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 10,
  },
  dialogContentText: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
  },
});

export default InvestmentOverviewScreen;

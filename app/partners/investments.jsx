import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePicker from "@react-native-community/datetimepicker";
import valu3chain from "../../assets/images/resources/valu3chain.png";

export default function Investments() {
  const router = useRouter();

  const [investmentType, setInvestmentType] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState("");

  //Date picker
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const investType = [
    { key: "1", value: "Funds (Cash)" },
    { key: "2", value: "Equipments" },
    { key: "3", value: "Farm Inputs" },
  ];

  const targetCrops = [
    { key: "1", value: "All" },
    { key: "2", value: "Grains" },
    { key: "3", value: "Vegitables" },
    { key: "4", value: "Tubers" },
    { key: "5", value: "Livestocks" },
  ];

  const minimumSize = [
    { key: "1", value: "0.5" },
    { key: "2", value: "1" },
    { key: "3", value: "Above 1" },
    { key: "4", value: "Not Applicable" },
  ];

  const location = [
    { key: "1", value: "North" },
    { key: "2", value: "East" },
    { key: "3", value: "West" },
    { key: "4", value: "South" },
    { key: "5", value: "Nation Wide" },
  ];

  const farmerType = [
    { key: "1", value: "Any" },
    { key: "2", value: "Female" },
    { key: "3", value: "Male" },
    { key: "4", value: "Farmer with Disability" },
  ];

  const onChangeEndDate = (e, selectedDate) => {
    setEndDate(selectedDate);
    setShow(false);
  };

  const onChangeStartDate = (e, selectedDate) => {
    setStartDate(selectedDate);
    setShow(false);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.brandSection}>
        <Image source={valu3chain} alt="" style={styles.image} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrapper}>
          <View style={[styles.formSection, styles.shadowProp]}>
            <View>
              <Text style={styles.title}>Investment Details</Text>
              <View style={styles.formInput}>
                <Text style={styles.formLabel}>Investment Type</Text>
                <SelectList
                  setSelected={(val) => setInvestmentType(val)}
                  data={investType}
                  save="value"
                />
              </View>
              <View style={styles.formInput}>
                <Text style={styles.formLabel}>Investment Title</Text>
                <TextInput
                  style={styles.formControl}
                  keyboardType="text"
                  placeholder="e.g., “Tractor Loan for Maize Farmers - Bauchi”"
                  placeholderTextColor="#aaa"
                  onChangeText={(val) => setInvestmentType(val)}
                />
              </View>

              <View style={styles.formInput}>
                <Text style={styles.formLabel}>Investment Description</Text>
                <TextInput
                  style={styles.formControl}
                  placeholder="Detailed info about the offer, expectations, and purpose"
                  placeholderTextColor="#aaa"
                  keyboardType="text"
                  multiline={6}
                  onChangeText={(val) => setInvestmentType(val)}
                />
              </View>
              <View style={styles.formInput}>
                <Text style={styles.formLabel}>Estimated Value</Text>
                <TextInput
                  style={styles.formControl}
                  keyboardType="numeric"
                  onChangeText={(val) => setInvestmentType(val)}
                />
              </View>
            </View>

            <View>
              <Text style={styles.title}>Eligibility Criteria</Text>
              <View style={styles.formInput}>
                <Text style={styles.formLabel}>Target Crop(s)</Text>
                <SelectList
                  setSelected={(val) => setInvestmentType(val)}
                  data={targetCrops}
                  save="value"
                />
              </View>
              <View style={styles.formInput}>
                <Text style={styles.formLabel}>Minimum Farm Size</Text>
                <SelectList
                  setSelected={(val) => setInvestmentType(val)}
                  data={minimumSize}
                  save="value"
                />
              </View>

              <View style={styles.formInput}>
                <Text style={styles.formLabel}>Location Requirement</Text>
                <SelectList
                  setSelected={(val) => setInvestmentType(val)}
                  data={location}
                  save="value"
                />
              </View>
              <View style={styles.formInput}>
                <Text style={styles.formLabel}>Type of Farmer</Text>
                <SelectList
                  setSelected={(val) => setInvestmentType(val)}
                  data={farmerType}
                  save="value"
                />
              </View>
            </View>

            <View>
              <Text style={styles.title}>Availability</Text>
              <View style={styles.formInput}>
                <Text style={styles.label}>Start Date</Text>
                {show && (
                  <DateTimePicker
                    value={startDate}
                    mode="date"
                    onChange={onChangeStartDate}
                  />
                )}

                <TouchableOpacity onPress={showDatePicker}>
                  <Text style={styles.formControl}>
                    {date.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.formInput}>
                <Text style={styles.label}>End Date</Text>
                {show && (
                  <DateTimePicker
                    value={endDate}
                    mode="date"
                    onChange={onChangeEndDate}
                  />
                )}

                <TouchableOpacity onPress={showDatePicker}>
                  <Text style={styles.formControl}>
                    {date.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.navigate("/partners")}
              >
                <Text style={styles.buttonText}>Submit Investment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8f5e4",
  },

  contentWrapper: {
    //paddingHorizontal:10,
    marginTop: 20,
  },

  formSection: {
    margin: 10,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 5,
    marginTop: 10,
  },

  brandSection: {
    justifyContent: "center",
  },
  image: {
    width: 280,
    height: 90,
    marginTop: 20,
  },
  section: {
    borderRadius: 10,
    backgroundColor: "#fff",
  },

  formLabel: {
    marginBottom: 5,
    marginTop: 5,
  },
  formControl: {
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#ffffff",
    // height: 45,
  },
  formInput: { marginBottom: 15 },
  buttonSection: {
    flex: 1,
  },
  button: {
    marginVertical: 20,
    backgroundColor: "#508060",
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 16,
  },

  shadowProp: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
});

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { farmers } from "../components/data";
import Checkbox from "expo-checkbox";

export default function FarmAudit() {
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isChecked4, setChecked4] = useState(false);
  const [isChecked5, setChecked5] = useState(false);
  const [isChecked6, setChecked6] = useState(false);
  const [isChecked7, setChecked7] = useState(false);
  const [isChecked8, setChecked8] = useState(false);
  const [isChecked9, setChecked9] = useState(false);
  const [isChecked10, setChecked10] = useState(false);
const [selectedFarmer, setSelectedFarmer] = useState("");
  //Return list of farmer names to be displayd in Select dropdown
  const farmersNameList = farmers.map((item) => {
    return item.name;
  });

  const handleSelectFarmer = (val) => setSelectedFarmer(val);

  //filter farmer details selected from the dropdown input
  let farmerDetail = farmers.filter((farmer) => farmer.name == selectedFarmer);
  
  //console.log(farmerDetail);
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.formInput}>
            <Text style={styles.formLabel}>Farmer Name</Text>
            <SelectList
              setSelected={handleSelectFarmer}
              data={farmersNameList}
              save="value"
              style={styles.formInput}
              //   defaultOption={{ key: "1", value: selectedFarmer }}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>General Information</Text>
            {farmerDetail.map((item) => {
              return (
                <>
                  <View style={styles.rowDirection}>
                    <Text>Gender: {item.gender}</Text>
                    <Text>Phone N0: {item.phoneNumber}</Text>
                  </View>
                  <View style={styles.colDirection}>
                    <Text style={styles.text}>Email Address: {item.email}</Text>
                    <Text style={styles.text}>Address: {item.address}</Text>
                    <Text style={styles.text}>
                      {item.identification}: {item.idNumber}
                    </Text>
                  </View>
                  <View style={styles.rowDirection}>
                    <Text>Nationality: {item.Nationality}</Text>
                    <Text>State: {item.stateofOrigin}</Text>
                  </View>
                </>
              );
            })}
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Land & Crop Information</Text>
            <View style={styles.colDirection}>
              <View style={styles.formInput}>
                <Text style={styles.formLabel}>Total Land Size (ha)</Text>
                <TextInput
                  style={styles.formControl}
                  placeholder=""
                  keyboardType="text"
                  onChangeText={(value) => setCropType(value)}
                />
              </View>
              <View style={styles.formInput}>
                <Text style={styles.formLabel}>Cultivated Area (ha)</Text>
                <TextInput
                  style={styles.formControl}
                  placeholder=""
                  keyboardType="text"
                  onChangeText={(value) => setCropType(value)}
                />
              </View>
              <View style={styles.formInput}>
                <Text style={styles.formLabel}>Crop(s) Grown</Text>
                <TextInput
                  style={styles.formControl}
                  placeholder=""
                  keyboardType="text"
                  onChangeText={(value) => setCropType(value)}
                />
              </View>
              <View style={styles.formInput}>
                <Text style={styles.formLabel}>Planting Date</Text>
                <TextInput
                  style={styles.formControl}
                  placeholder=""
                  keyboardType="text"
                  onChangeText={(value) => setCropType(value)}
                />
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.title}>Input Usage</Text>

              <View style={styles.rowDirection}>
                <Text>Input</Text>
                <Text>Applied?</Text>
              </View>
              <View style={styles.colDirection}>
                <View style={styles.rowDirection}>
                  <Text>Fertilizer</Text>
                  <View style={styles.checkboxSection}>
                    <View style={styles.check}>
                      <Checkbox
                        style={styles.checkbox}
                        value={isChecked1}
                        onValueChange={setChecked1}
                        color={isChecked1 ? "#4630EB" : undefined}
                      />
                      <Text style={styles.paragraph}>Yes</Text>
                    </View>
                    <View style={styles.check}>
                      <Checkbox
                        style={styles.checkbox}
                        value={isChecked2}
                        onValueChange={setChecked2}
                        color={isChecked2 ? "#4630EB" : undefined}
                      />
                      <Text style={styles.paragraph}>No</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.rowDirection}>
                  <Text>Herbicide</Text>
                  <View style={styles.checkboxSection}>
                    <View style={styles.check}>
                      <Checkbox
                        style={styles.checkbox}
                        value={isChecked3}
                        onValueChange={setChecked3}
                        color={isChecked3 ? "#4630EB" : undefined}
                      />
                      <Text style={styles.paragraph}>Yes</Text>
                    </View>
                    <View style={styles.check}>
                      <Checkbox
                        style={styles.checkbox}
                        value={isChecked4}
                        onValueChange={setChecked4}
                        color={isChecked4 ? "#4630EB" : undefined}
                      />
                      <Text style={styles.paragraph}>No</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.rowDirection}>
                  <Text>Pesticide</Text>
                  <View style={styles.checkboxSection}>
                    <View style={styles.check}>
                      <Checkbox
                        style={styles.checkbox}
                        value={isChecked5}
                        onValueChange={setChecked5}
                        color={isChecked5 ? "#4630EB" : undefined}
                      />
                      <Text style={styles.paragraph}>Yes</Text>
                    </View>
                    <View style={styles.check}>
                      <Checkbox
                        style={styles.checkbox}
                        value={isChecked6}
                        onValueChange={setChecked6}
                        color={isChecked6 ? "#4630EB" : undefined}
                      />
                      <Text style={styles.paragraph}>No</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.rowDirection}>
                  <Text>Organic Additives</Text>
                  <View style={styles.checkboxSection}>
                    <View style={styles.check}>
                      <Checkbox
                        style={styles.checkbox}
                        value={isChecked7}
                        onValueChange={setChecked7}
                        color={isChecked7 ? "#4630EB" : undefined}
                      />
                      <Text style={styles.paragraph}>Yes</Text>
                    </View>
                    <View style={styles.check}>
                      <Checkbox
                        style={styles.checkbox}
                        value={isChecked8}
                        onValueChange={setChecked8}
                        color={isChecked8 ? "#4630EB" : undefined}
                      />
                      <Text style={styles.paragraph}>No</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.rowDirection}>
                  <Text>Compost / Manure</Text>
                  <View style={styles.checkboxSection}>
                    <View style={styles.check}>
                      <Checkbox
                        style={styles.checkbox}
                        value={isChecked9}
                        onValueChange={setChecked9}
                        color={isChecked9 ? "#4630EB" : undefined}
                      />
                      <Text style={styles.paragraph}>Yes</Text>
                    </View>
                    <View style={styles.check}>
                      <Checkbox
                        style={styles.checkbox}
                        value={isChecked10}
                        onValueChange={setChecked10}
                        color={isChecked10 ? "#4630EB" : undefined}
                      />
                      <Text style={styles.paragraph}>No</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.buttonSection}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.navigate("/partners")}
              >
                <Text style={styles.buttonText}>Submit Report</Text>
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
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  formLabel: {
    marginBottom: 5,
    marginTop: 15,
    color: "#000",
  },

  formControl: {
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#ffffff",
    // height: 45,
  },

  input: {
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
    backgroundColor: "#ffffff",
    width: 120,
  },
  section: {
    marginVertical: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: 500,
    marginBottom: 5,
  },
  rowDirection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },

  colDirection: {
    marginVertical: 5,
  },
  text: {
    marginVertical: 10,
  },
  checkboxSection: {
    flexDirection: "row",
    // alignItems: "center",
    // marginTop: 10,
  },
  check: {
    flexDirection: "row",
    // marginTop: 10,
  },
  paragraph: {
    fontSize: 18,
    marginTop: 5,
  },
  checkbox: {
    margin: 8,
  },
  buttonSection: { flex: 1 },
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
});

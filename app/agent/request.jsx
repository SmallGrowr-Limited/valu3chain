import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import DemandForm from "../../components/forms/farmerDemand";
//import { farmers } from "../../components/data";
import {useSelector} from "react-redux"

export default function FarmerDemand() {
 const farmersData = useSelector((state) => state.farmer.allFarmers);
 const [farmers, setFarmers] = useState([])
  const [requestData, setRequestData] = useState({
    farmerId: "",
    farmerName: "",
    requestType: "",
    termOfDemand: "",
    equity: "",
    category: "",
    description: "",
    metric: "",
    quantity: "",
    requiredInput: "",
  });

  const [selectedFarmer, setSelectedFarmer] = useState("");
  
  const farmersNameList = farmers.map((item) => {
    return item.fullName;
  });

  const handleSelectFarmer = (value) => setSelectedFarmer(value);
  //filter farmer details selected from the dropdown input
  let farmerDetail = farmers.filter(
    (farmer) => farmer.name == selectedFarmer
  );

  const handleChange = (name, value) => {
    setRequestData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = ()=>{
    console.log(requestData);
    
  }

  const demandValue = [
    { key: "1", value: "Purchase" },
    { key: "2", value: "Investment" },
  ];

  const demandtype = [
    { key: "1", value: "Outright Purchase" },
    { key: "2", value: "Credit" },
    { key: "3", value: "Equity" },
  ];

  const itemtype = [
    // { key: "1", value: "Fund" },
    { key: "2", value: "Farm Inputs" },
    // { key: "3", value: "Equipment" },
  ];

  const input = [
    { key: "1", value: "Fertilizer" },
    { key: "2", value: "Improved Seeds" },
    { key: "3", value: "Herbicides/Pesticides" },
    { key: "4", value: "Organic Manure" },
  ];

  const termofdemand = [
    { key: "1", value: "1 year" },
    { key: "2", value: "2 years" },
    { key: "3", value: "3 years" },
  ];
  const equitydata = [
    { key: "1", value: "0.5%" },
    { key: "2", value: "1%" },
    { key: "3", value: "1.5%" },
    { key: "4", value: "2%" },
  ];

  const minimumSize = [
    { key: "1", value: "0.5" },
    { key: "2", value: "1" },
    { key: "3", value: "Above 1" },
    { key: "4", value: "Not Applicable" },
  ];

  useEffect(() => {
    
    setFarmers(farmersData);
  
  }, [farmersData]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Farmer Application Form</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formSection}>
          <View style={styles.formInput}>
            <Text style={styles.formLabel}>Farmer Name</Text>
            <SelectList
              setSelected={(val) => handleChange("farmerName", val)}
              data={farmersNameList}
              save="value"
              style={styles.formInput}
            />
          </View>
          <View style={styles.formInput}>
            <Text style={styles.formLabel}>Request Status</Text>
            <SelectList
              setSelected={(val) => handleChange("requestType", val)}
              data={demandtype}
              save="value"
              style={styles.formInput}
            />
          </View>
          {requestData.requestType === "Equity" ? (
            <View style={styles.formInput}>
              <Text style={styles.formLabel}>Equity</Text>
              <SelectList
                setSelected={(val) => handleChange("equity", val)}
                data={equitydata}
                save="value"
                style={styles.formInput}
              />
            </View>
          ) : null}

          <View style={styles.formInput}>
            <Text style={styles.formLabel}>Category</Text>
            <SelectList
              setSelected={(val) => handleChange("category", val)}
              data={itemtype}
              save="value"
              style={styles.formInput}
            />
          </View>

          {requestData.category === "Fund" ? (
            <>
              <View style={styles.formInput}>
                <Text style={styles.formLabel}>Amount</Text>
                <TextInput
                  style={styles.formControl}
                  placeholder=""
                  keyboardType="text"
                  onChangeText={(val) => handleChange("amount", val)}
                />
              </View>
              <View style={styles.formInput}>
                <Text style={styles.formLabel}>Purpose of Funds</Text>
                <TextInput
                  style={styles.formControl}
                  placeholder=""
                  keyboardType="text"
                  multiline={4}
                  onChangeText={(val) => handleChange("description", val)}
                />
              </View>
              <View style={styles.formInput}>
                <Text style={styles.formLabel}>Farm Size</Text>
                <SelectList
                  setSelected={(val) => handleChange("metric", val)}
                  data={minimumSize}
                  save="value"
                />
              </View>
            </>
          ) : requestData.category === "Farm Inputs" ? (
            <>
              <View style={styles.formInput}>
                <Text style={styles.formLabel}>Required Inputs</Text>
                <SelectList
                  setSelected={(val) => handleChange("requiredInput", val)}
                  data={input}
                  save="value"
                />
              </View>
              <View style={styles.formInput}>
                <Text style={styles.formLabel}>Quantity</Text>
                <SelectList
                  setSelected={(val) => handleChange("quantity", val)}
                  data={minimumSize}
                  save="value"
                />
              </View>
            </>
          ) : null}
        </View>
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit Request</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  header: {
    marginTop: 10,
    paddingHorizontal: 20,
  },

  headerText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 500,
  },

  formSection: {
    paddingHorizontal: 20,
    //backgroundColor: "#fff",
  },

  formLabel: {
    marginBottom: 5,
    marginTop: 15,
    color: "#333",
  },

  formControl: {
    borderColor: "#333",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#ffffff",
    // height: 45,
  },
  buttonSection: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#508060",
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
  },
});

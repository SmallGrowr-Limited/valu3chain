import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

export default function PreviewOrder() {
  const router = useRouter();
  const order = useSelector((state) => state.partner.productOrder);

  const handleSubmit = async ()=>{
    console.log(order)
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Transaction Summary</Text>
          </View>
          <View style={styles.buyerDetails}>
            <Text style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>
              Buyer Information
            </Text>
            <View style={styles.fields}>
              <View style={{ width: "48%" }}>
                <Text>Company Name</Text>
              </View>
              <View style={{ width: "48%" }}>
                <Text>OC Agro Limited</Text>
              </View>
            </View>
            <View style={styles.fields}>
              <View style={{ width: "48%" }}>
                <Text>Contact Person</Text>
              </View>
              <View style={{ width: "48%" }}>
                <Text>Aliyu Musa </Text>
              </View>
            </View>
            <View style={styles.fields}>
              <View style={{ width: "48%" }}>
                <Text>Phone Number</Text>
              </View>
              <View style={{ width: "48%" }}>
                <Text>08077445400</Text>
              </View>
            </View>
            <View style={styles.fields}>
              <View style={{ width: "48%" }}>
                <Text>Email Address</Text>
              </View>
              <View style={{ width: "48%" }}>
                <Text>am@gmail.com</Text>
              </View>
            </View>
            <View style={styles.fields}>
              <View style={{ width: "48%" }}>
                <Text>Company Address</Text>
              </View>
              <View style={{ width: "48%" }}>
                <Text>22 Jekada Street Sokoto</Text>
              </View>
            </View>
          </View>
          <View style={styles.buyerDetails}>
            <Text style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>
              Order Details
            </Text>
            <View style={styles.fields}>
              <View style={{ width: "48%" }}>
                <Text>Product Name</Text>
              </View>
              <View style={{ width: "48%" }}>
                <Text>{order.productName}</Text>
              </View>
            </View>
            <View style={styles.fields}>
              <View style={{ width: "48%" }}>
                <Text>Quantity</Text>
              </View>
              <View style={{ width: "48%" }}>
                <Text>
                  {order.quantity}
                  {order.unit}
                </Text>
              </View>
            </View>
            <View style={styles.fields}>
              <View style={{ width: "48%" }}>
                <Text>Unit Price </Text>
              </View>
              <View style={{ width: "48%" }}>
                <Text>{order.unitPrice}</Text>
              </View>
            </View> 
            <View style={styles.fields}>
              <View style={{ width: "48%" }}>
                <Text>Total Price </Text>
              </View>
              <View style={{ width: "48%" }}>
                <Text>{order.totalPrice}</Text>
              </View>
            </View>

            <View style={styles.fields}>
              <View style={{ width: "48%" }}>
                <Text>Preferred Variety </Text>
              </View>
              <View style={{ width: "48%" }}>
                <Text>{order.variety}</Text>
              </View>
            </View>

            <View style={styles.fields}>
              <View style={{ width: "48%" }}>
                <Text>Moisture Level </Text>
              </View>
              <View style={{ width: "48%" }}>
                <Text>{order.moisture}</Text>
              </View>
            </View>

            <View style={styles.fields}>
              <View style={{ width: "48%" }}>
                <Text>Type of Purchase </Text>
              </View>
              <View style={{ width: "48%" }}>
                <Text>{order.purchaseType}</Text>
              </View>
            </View>
          </View>
          <View style={styles.buyerDetails}>
            <Text style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>
              Supplier Information
            </Text>
            <View style={styles.fields}>
              <View style={{ width: "48%" }}>
                <Text>Company Name</Text>
              </View>
              <View style={{ width: "48%" }}>
                <Text>Smallgrowr Limited</Text>
              </View>
            </View>
            <View style={styles.fields}>
              <View style={{ width: "48%" }}>
                <Text>Company Address</Text>
              </View>
              <View style={{ width: "48%" }}>
                <Text>
                  N0 2 Emmanuel Baptist College Road, Tanke,Ilorin, Kwara State
                  Nigeria
                </Text>
              </View>
            </View>
            <View style={styles.fields}>
              <View style={{ width: "48%" }}>
                <Text>Phone Number </Text>
              </View>
              <View style={{ width: "48%" }}>
                <Text>+2348166012299</Text>
              </View>
            </View>
            <View style={styles.fields}>
              <View style={{ width: "48%" }}>
                <Text>Email Address </Text>
              </View>
              <View style={{ width: "48%" }}>
                <Text>support@smallgrowr.com</Text>
              </View>
            </View>
          </View>
          <View style={styles.buyerDetails}>
            <Text style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>
              Delivery & Payment
            </Text>
            <View style={styles.fields}>
              <View style={{ width: "48%" }}>
                <Text>Delivery Address</Text>
              </View>
              <View style={{ width: "48%" }}>
                <Text>22 Jekada Street Sokoto</Text>
              </View>
            </View>
            <View style={styles.fields}>
              <View style={{ width: "48%" }}>
                <Text>Payment Terms</Text>
              </View>
              <View style={{ width: "48%" }}>
                <Text>50% Advance</Text>
              </View>
            </View>
            <View style={styles.fields}>
              <View style={{ width: "48%" }}>
                <Text>Mode of Payment</Text>
              </View>
              <View style={{ width: "48%" }}>
                <Text>Bank Transfer</Text>
              </View>
            </View>
          </View>
          <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.navigate("/partners")}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e8f5e4" },
  content: { flex: 1, padding: 10 },
  header: { marginVertical: 10 },
  headerText: { fontSize: 20, fontWeight: 500, textAlign: "center" },
  buyerDetails: {
    borderRadius: 8,
    padding: 10,
    borderWidth: 0.5,
    borderColor: "#ccc",
    marginVertical: 5,
    backgroundColor: "#fff",
  },
  fields: {
    flexDirection: "row",
    marginVertical: 8,
    justifyContent: "space-between",
  },

  buttonSection: {
    marginVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#508060",
    borderRadius: 10,
    padding: 10,
    width: "48%",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
  },
});

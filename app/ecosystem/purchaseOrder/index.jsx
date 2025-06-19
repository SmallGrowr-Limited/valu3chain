import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Colors } from "../../../components/constants/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";

const PurchaseOrderModal = ({ route, navigation }) => {
  const [supplier, setSupplier] = useState("Smallgrowr Limited");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [items, setItems] = useState([
    { id: 1, name: "", quantity: "", unit: "kg", unitPrice: "" },
  ]);
  const [notes, setNotes] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("30 days after delivery");
  const router = useRouter();

  const investment = {
    id: 1,
    category: "Rice",
    location: "Zaria",
  };

  // Dropdown options (moved outside component if reused elsewhere)
  const dropdownOptions = {
    varietyType: [
      { key: "1", value: "Type 1" },
      { key: "2", value: "Type 2" },
    ],
    purchaseType: [
      { key: "1", value: "Outright" },
      { key: "2", value: "Storage" },
    ],
    units: [
      { key: "1", value: "kg" },
      { key: "2", value: "tons" },
    ],
    deliveryMethods: [
      { key: "1", value: "Company Truck" },
      { key: "2", value: "Supplier Delivery" },
      { key: "3", value: "Third-Party Logistics" },
    ],
    paymentModes: [
      { key: "1", value: "Bank Transfer" },
      { key: "2", value: "Cheque" },
      { key: "3", value: "Cash" }, // Fixed duplicate key
    ],
    paymentTerms: [
      { key: "1", value: "On Delivery" },
      { key: "2", value: "50% Advance" },
    ],
    moistureOpt: [
      { key: "1", value: "Type 1" },
      { key: "2", value: "Type 2" },
    ],
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: items.length + 1,
        name: "",
        quantity: "",
        unit: "kg",
        unitPrice: "",
      },
    ]);
  };

  const handleRemoveItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleItemChange = (id, field, value) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDeliveryDate(selectedDate);
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const quantity = parseFloat(item.quantity) || 0;
      const price = parseFloat(item.unitPrice) || 0;
      return total + quantity * price;
    }, 0);
  };

  const handleSubmit = () => {
    const order = {
      investmentId: investment.id,
      supplier,
      deliveryAddress,
      deliveryDate,
      items,
      total: calculateTotal(),
      notes,
      paymentTerms,
      deliveryMethod,
      status: "pending",
      createdAt: new Date(),
    };
    console.log("Purchase Order Submitted:", order);
    router.navigate("/ecosystem/dashboard");
    // navigation.goBack();
    // Here you would typically send the order to your backend
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.navigate("/ecosystem/dashboard")}
          >
            <Ionicons name="close" size={28} color={Colors.primaryText} />
          </TouchableOpacity>
          <Text style={styles.title}>New Purchase Order</Text>
          <View style={{ width: 28 }} /> {/* Spacer for alignment */}
        </View>

        <Text style={styles.subtitle}>
          For {investment.category} project in {investment.location}
        </Text>

        {/* Supplier Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Supplier Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Supplier Name"
            value={supplier}
            onChangeText={setSupplier}
            placeholderTextColor={Colors.secondaryText}
          />
        </View>

        {/* Delivery Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <MaterialIcons name="date-range" size={20} color={Colors.primary} />
            <Text style={styles.dateText}>
              {deliveryDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={deliveryDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Order Items</Text>
            <TouchableOpacity onPress={handleAddItem} style={styles.addButton}>
              <Ionicons name="add" size={20} color={Colors.textOnPrimary} />
              <Text style={styles.addButtonText}>Add Item</Text>
            </TouchableOpacity>
          </View>

          {items.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemRow}>
                <TextInput
                  style={[styles.input, styles.itemInput]}
                  placeholder="Item Name"
                  value={item.name}
                  onChangeText={(text) =>
                    handleItemChange(item.id, "name", text)
                  }
                  placeholderTextColor={Colors.secondaryText}
                />
                {items.length > 1 && (
                  <TouchableOpacity
                    onPress={() => handleRemoveItem(item.id)}
                    style={styles.removeButton}
                  >
                    <Ionicons name="trash" size={20} color={Colors.danger} />
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.quantityRow}>
                <View style={{ width: "50%" }}>
                  <TextInput
                    style={[styles.input, styles.quantityInput]}
                    placeholder="Quantity"
                    value={item.quantity}
                    onChangeText={(text) =>
                      handleItemChange(item.id, "quantity", text)
                    }
                    keyboardType="numeric"
                    placeholderTextColor={Colors.secondaryText}
                  />
                </View>
                <View style={{ width: "46%" }}>
                  <SelectList
                    style={[styles.input, styles.unitInput]}
                    setSelected={(text) =>
                      handleItemChange(item.id, "unit", text)
                    }
                    data={dropdownOptions.units}
                    save="value"
                    defaultOption={{ key: "1", value: "kg" }}
                  />
                </View>
              </View>
              <View style={styles.quantityRow}>
                <View style={{ width: "100%" }}>
                  <TextInput
                    style={[styles.input, styles.priceInput]}
                    placeholder="Unit Price"
                    value={item.unitPrice}
                    onChangeText={(text) =>
                      handleItemChange(item.id, "unitPrice", text)
                    }
                    keyboardType="numeric"
                    placeholderTextColor={Colors.secondaryText}
                  />
                </View>
              </View>
              {/* <View style={styles.quantityRow}>
                <View style={{ width: "100%" }}>
                  <SelectList
                    setSelected={(text) =>
                      handleItemChange(item.id, "unit", text)
                    }
                    data={dropdownOptions.varietyType}
                    save="value"
                    style={styles.input}
                    defaultOption={{ key: "1", value: "Preferred Variety" }}
                  />
                </View>
              </View> */}

              {/* <View style={styles.quantityRow}>
                <View style={{ width: "100%" }}>
                  <SelectList
                    setSelected={(text) =>
                      handleItemChange(item.id, "unit", text)
                    }
                    data={dropdownOptions.varietyType}
                    save="value"
                    style={styles.input}
                    defaultOption={{
                      key: "1",
                      value: "Acceptable moisture level",
                    }}
                  />
                </View>
              </View> */}
            </View>
          ))}
        </View>

        {/* Payment Terms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery and Payment</Text>
          <View style={{ marginBottom: 10 }}>
            <TextInput
              style={styles.input}
              placeholder="Delivery Address"
              value={deliveryAddress}
              onChangeText={(text) => setDeliveryAddress(text)}
              placeholderTextColor={Colors.secondaryText}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <SelectList
              setSelected={(text) => setDeliveryMethod(text)}
              data={dropdownOptions.deliveryMethods}
              save="value"
              style={styles.input}
              defaultOption={{ key: "1", value: "Delivery Method" }}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <SelectList
              setSelected={(text) => setPaymentTerms(text)}
              data={dropdownOptions.paymentTerms}
              save="value"
              style={styles.input}
              defaultOption={{ key: "1", value: "Payment Terms" }}
            />
          </View>
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <TextInput
            style={[styles.input, styles.notesInput]}
            placeholder="Additional notes..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
            placeholderTextColor={Colors.secondaryText}
          />
        </View>

        {/* Total */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Amount:</Text>
          <Text style={styles.totalAmount}>
            ₦{calculateTotal().toLocaleString()}
          </Text>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Purchase Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primaryText,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.secondaryText,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.primaryText,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.primaryText,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  dateText: {
    fontSize: 16,
    color: Colors.primaryText,
    marginLeft: 8,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  addButtonText: {
    color: Colors.textOnPrimary,
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "600",
  },
  itemCard: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemInput: {
    flex: 1,
    marginRight: 8,
  },
  removeButton: {
    padding: 8,
  },
  quantityRow: {
    flexDirection: "row",
    marginTop: 8,
  },
  quantityInput: {
    flex: 2,
    marginRight: 8,
  },
  unitInput: {
    flex: 1,
    marginRight: 8,
  },
  priceInput: {
    flex: 2,
  },
  notesInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 16,
    marginTop: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.primaryText,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
  },
  submitButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  submitButtonText: {
    color: Colors.textOnPrimary,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PurchaseOrderModal;

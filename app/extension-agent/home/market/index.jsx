import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Header from "../../../../components/agent-components/Header";
import { colors } from "../../../../components/agent-components/constants/colors";

// Mock data - replace with your actual data source
const crops = [
  { id: '1', name: 'Maize', unit: 'kg', currentPrice: 2.5 },
  { id: '2', name: 'Rice', unit: 'kg', currentPrice: 3.8 },
  { id: '3', name: 'Beans', unit: 'kg', currentPrice: 4.2 },
  { id: '4', name: 'Tomatoes', unit: 'kg', currentPrice: 5.0 },
  { id: '5', name: 'Onions', unit: 'kg', currentPrice: 2.3 },
  { id: '6', name: 'Cassava', unit: 'kg', currentPrice: 1.8 },
];

const priceHistory = [
  { id: '1', cropId: '1', price: 2.5, date: '2023-11-20', updatedBy: 'John Doe' },
  { id: '2', cropId: '1', price: 2.3, date: '2023-11-15', updatedBy: 'Jane Smith' },
  { id: '3', cropId: '1', price: 2.4, date: '2023-11-10', updatedBy: 'John Doe' },
];

export default function MarketPriceUpdate() {
  const router = useRouter();
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  const [priceTrend, setPriceTrend] = useState('stable');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter history for selected crop
  const cropHistory = selectedCrop 
    ? priceHistory.filter(item => item.cropId === selectedCrop.id)
    : [];

  const handlePriceUpdate = () => {
    if (!selectedCrop || !newPrice) {
      Alert.alert('Missing Information', 'Please select a crop and enter the new price');
      return;
    }

    const priceValue = parseFloat(newPrice);
    if(isNaN(priceValue)){
        Alert.alert("Invalid Price", "Please enter a valid price number");
        return;
    }

    setIsSubmitting(true);

    // In a real app, you would submit to your backend here
    setTimeout(() => {
      Alert.alert(
        'Price Updated',
        `${selectedCrop.name} price updated to ${priceValue} per ${selectedCrop.unit}`,
        [
          {
            text: 'OK',
            onPress: () => {
              setSelectedCrop(null);
              setNewPrice('');
              setNotes('');
            },
          }
        ]
      );
      setIsSubmitting(false);
    }, 1500);
  };

  const calculateTrend = (crop) => {
    const cropPrices = priceHistory
      .filter(item => item.cropId === crop.id)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (cropPrices.length < 2) return 'stable';
    
    const latest = cropPrices[0].price;
    const previous = cropPrices[1].price;
    
    if (latest > previous) return 'up';
    if (latest < previous) return 'down';
    return 'stable';
  };

  const renderCropItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.cropItem,
        selectedCrop?.id === item.id && styles.selectedCropItem
      ]}
      onPress={() => {
        setSelectedCrop(item);
        setNewPrice(item.currentPrice.toString());
        setPriceTrend(calculateTrend(item));
      }}
    >
      <View style={styles.cropInfo}>
        <Text style={styles.cropName}>{item.name}</Text>
        <Text style={styles.cropPrice}>
          Current: {item.currentPrice} / {item.unit}
        </Text>
      </View>
      <View style={styles.trendIndicator}>
        {priceTrend === 'up' && (
          <MaterialCommunityIcons name="arrow-up" size={20} color={colors.success} />
        )}
        {priceTrend === 'down' && (
          <MaterialCommunityIcons name="arrow-down" size={20} color={colors.danger} />
        )}
        {priceTrend === 'stable' && (
          <MaterialCommunityIcons name="arrow-right" size={20} color={colors.gray} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Market Prices"
        rightAction={
          <TouchableOpacity
            onPress={() => router.push("/extension-agent/home/market/history")}
          >
            <Ionicons name="time" size={24} color={colors.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Crop Selection */}
        <Text style={styles.sectionTitle}>Select Crop</Text>
        <FlatList
          data={crops}
          renderItem={renderCropItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cropList}
        />

        {selectedCrop && (
          <>
            {/* Price Update Form */}
            <Text style={styles.sectionTitle}>Update Price</Text>
            <View style={styles.formCard}>
              <View style={styles.inputRow}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Current Price</Text>
                  <Text style={styles.currentPrice}>
                    {selectedCrop.currentPrice} / {selectedCrop.unit}
                  </Text>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>New Price *</Text>
                  <View style={styles.priceInputContainer}>
                    <TextInput
                      style={styles.priceInput}
                      keyboardType="numeric"
                      value={newPrice}
                      onChangeText={setNewPrice}
                      placeholder="0.00"
                    />
                    <Text style={styles.unitText}>/ {selectedCrop.unit}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Price Trend</Text>
                <View style={styles.trendButtons}>
                  <TouchableOpacity
                    style={[
                      styles.trendButton,
                      priceTrend === "up" && styles.trendButtonSelected,
                    ]}
                    onPress={() => setPriceTrend("up")}
                  >
                    <MaterialCommunityIcons
                      name="arrow-up"
                      size={20}
                      color={
                        priceTrend === "up" ? colors.white : colors.success
                      }
                    />
                    <Text
                      style={[
                        styles.trendButtonText,
                        priceTrend === "up" && styles.trendButtonTextSelected,
                      ]}
                    >
                      Increasing
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.trendButton,
                      priceTrend === "stable" && styles.trendButtonSelected,
                    ]}
                    onPress={() => setPriceTrend("stable")}
                  >
                    <MaterialCommunityIcons
                      name="arrow-right"
                      size={20}
                      color={
                        priceTrend === "stable" ? colors.white : colors.gray
                      }
                    />
                    <Text
                      style={[
                        styles.trendButtonText,
                        priceTrend === "stable" &&
                          styles.trendButtonTextSelected,
                      ]}
                    >
                      Stable
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.trendButton,
                      priceTrend === "down" && styles.trendButtonSelected,
                    ]}
                    onPress={() => setPriceTrend("down")}
                  >
                    <MaterialCommunityIcons
                      name="arrow-down"
                      size={20}
                      color={
                        priceTrend === "down" ? colors.white : colors.danger
                      }
                    />
                    <Text
                      style={[
                        styles.trendButtonText,
                        priceTrend === "down" && styles.trendButtonTextSelected,
                      ]}
                    >
                      Decreasing
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Market Source</Text>
                <TextInput
                  style={styles.marketNameInput}
                  placeholder="Add "
                  placeholderTextColor="#aaa"
                  value={notes}
                  onChangeText={setNotes}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Notes</Text>
                <TextInput
                  style={styles.notesInput}
                  placeholder="Add any notes about this price change..."
                  placeholderTextColor="#aaa"
                  value={notes}
                  onChangeText={setNotes}
                  multiline
                  numberOfLines={3}
                />
              </View>
            </View>

            {/* Price History */}
            <Text style={styles.sectionTitle}>Price History</Text>
            {cropHistory.length > 0 ? (
              <View style={styles.historyCard}>
                {cropHistory.map((record) => (
                  <View key={record.id} style={styles.historyItem}>
                    <View style={styles.historyInfo}>
                      <Text style={styles.historyPrice}>
                        {record.price} / {selectedCrop.unit}
                      </Text>
                      <Text style={styles.historyDate}>{record.date}</Text>
                    </View>
                    <Text style={styles.historyUser}>{record.updatedBy}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.emptyHistory}>
                <Text style={styles.emptyText}>No price history available</Text>
              </View>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                (!newPrice || isSubmitting) && styles.disabledButton,
              ]}
              onPress={handlePriceUpdate}
              disabled={!newPrice || isSubmitting}
            >
              {isSubmitting ? (
                <MaterialIcons
                  name="hourglass-top"
                  size={20}
                  color={colors.white}
                />
              ) : (
                <MaterialIcons name="update" size={20} color={colors.white} />
              )}
              <Text style={styles.submitButtonText}>
                {isSubmitting ? "Updating..." : "Update Price"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark,
    marginTop: 16,
    marginBottom: 12,
  },
  cropList: {
    paddingBottom: 8,
  },
  cropItem: {
    width: 150,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginRight: 12,
    elevation: 1,
  },
  selectedCropItem: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  cropInfo: {
    marginBottom: 8,
  },
  cropName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark,
  },
  cropPrice: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 4,
  },
  trendIndicator: {
    alignItems: "flex-end",
  },
  formCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
  },
  inputRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  inputContainer: {
    flex: 1,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    // color: colors.dark,
    marginBottom: 8,
  },
  currentPrice: {
    fontSize: 16,
    color: colors.dark,
    padding: 12,
    backgroundColor: colors.lightPrimary,
    borderRadius: 8,
  },
  priceInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    paddingLeft: 12,
  },
  priceInput: {
    flex: 1,
    fontSize: 16,
    color: colors.dark,
    paddingVertical: 12,
  },
  unitText: {
    fontSize: 14,
    color: colors.gray,
    marginRight: 12,
  },
  trendButtons: {
    flexDirection: "row",
    gap: 8,
  },
  trendButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    gap: 4,
  },
  trendButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  trendButtonText: {
    fontSize: 12,
  },
  trendButtonTextSelected: {
    color: colors.white,
  },
  notesInput: {
    minHeight: 80,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    padding: 12,
    textAlignVertical: "top",
  },
  marketNameInput: {
    // minHeight: 80,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    padding: 12,
    textAlignVertical: "top",
  },
  historyCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  historyInfo: {
    flex: 1,
  },
  historyPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.dark,
  },
  historyDate: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 4,
  },
  historyUser: {
    fontSize: 12,
    color: colors.gray,
  },
  emptyHistory: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    elevation: 1,
  },
  emptyText: {
    fontSize: 14,
    color: colors.gray,
  },
  submitButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
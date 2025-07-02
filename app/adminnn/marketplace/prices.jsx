import { View, Text, ScrollView, StyleSheet } from "react-native";
import { DataTable, Searchbar, Chip, Button, TextInput } from "react-native-paper";
import { useState } from "react";

export default function MarketPrices() {
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [commodityFilter, setCommodityFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState("");

  // Sample data
  const prices = [
    { 
      id: 1, 
      commodity: "Maize", 
      region: "North", 
      price: 150, 
      unit: "kg", 
      lastUpdated: "2023-05-01 14:30" 
    },
    { 
      id: 2, 
      commodity: "Rice", 
      region: "South", 
      price: 200, 
      unit: "kg", 
      lastUpdated: "2023-05-02 10:15" 
    },
    { 
      id: 3, 
      commodity: "Wheat", 
      region: "East", 
      price: 180, 
      unit: "kg", 
      lastUpdated: "2023-05-03 09:45" 
    },
  ];

  const filteredPrices = prices.filter((price) => {
    const matchesSearch = price.commodity.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = regionFilter === "all" || price.region === regionFilter;
    const matchesCommodity = commodityFilter === "all" || price.commodity === commodityFilter;
    return matchesSearch && matchesRegion && matchesCommodity;
  });

  const regions = [...new Set(prices.map(p => p.region))];
  const commodities = [...new Set(prices.map(p => p.commodity))];

  const handleEdit = (id, currentPrice) => {
    setEditingId(id);
    setEditPrice(currentPrice.toString());
  };

  const handleSave = (id) => {
    // Save logic - would typically call an API
    console.log(`Saved new price ${editPrice} for id ${id}`);
    setEditingId(null);
    // In a real app, you would update the state or refetch data
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Market Prices</Text>
      
      <View style={styles.filterContainer}>
        <Searchbar
          placeholder="Search commodities"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.search}
        />
        
        <View style={styles.chipContainer}>
          <Chip
            selected={regionFilter === "all"}
            onPress={() => setRegionFilter("all")}
            style={styles.chip}
          >
            All Regions
          </Chip>
          {regions.map(region => (
            <Chip
              key={region}
              selected={regionFilter === region}
              onPress={() => setRegionFilter(region)}
              style={styles.chip}
            >
              {region}
            </Chip>
          ))}
        </View>
        
        <View style={styles.chipContainer}>
          <Chip
            selected={commodityFilter === "all"}
            onPress={() => setCommodityFilter("all")}
            style={styles.chip}
          >
            All Commodities
          </Chip>
          {commodities.map(commodity => (
            <Chip
              key={commodity}
              selected={commodityFilter === commodity}
              onPress={() => setCommodityFilter(commodity)}
              style={styles.chip}
            >
              {commodity}
            </Chip>
          ))}
        </View>
      </View>
      
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Commodity</DataTable.Title>
          <DataTable.Title>Region</DataTable.Title>
          <DataTable.Title>Price</DataTable.Title>
          <DataTable.Title>Unit</DataTable.Title>
          <DataTable.Title>Updated</DataTable.Title>
          <DataTable.Title>Actions</DataTable.Title>
        </DataTable.Header>
        
        {filteredPrices.map((price) => (
          <DataTable.Row key={price.id}>
            <DataTable.Cell>{price.commodity}</DataTable.Cell>
            <DataTable.Cell>{price.region}</DataTable.Cell>
            <DataTable.Cell>
              {editingId === price.id ? (
                <TextInput
                  value={editPrice}
                  onChangeText={setEditPrice}
                  keyboardType="numeric"
                  style={styles.priceInput}
                />
              ) : (
                `${price.price} /${price.unit}`
              )}
            </DataTable.Cell>
            <DataTable.Cell>{price.unit}</DataTable.Cell>
            <DataTable.Cell>{price.lastUpdated}</DataTable.Cell>
            <DataTable.Cell>
              {editingId === price.id ? (
                <Button 
                  compact 
                  mode="contained" 
                  onPress={() => handleSave(price.id)}
                >
                  Save
                </Button>
              ) : (
                <Button 
                  compact 
                  mode="outlined" 
                  onPress={() => handleEdit(price.id, price.price)}
                >
                  Edit
                </Button>
              )}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  filterContainer: {
    marginBottom: 16,
  },
  search: {
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  chip: {
    marginRight: 4,
    marginBottom: 4,
  },
  priceInput: {
    height: 30,
    width: 80,
  },
});
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { DataTable, Card, Button, Searchbar, Chip, Menu } from "react-native-paper";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function MarketplaceDashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [menuVisible, setMenuVisible] = useState(false);

  // Sample data - in a real app, this would come from an API
  const products = [
    {
      id: 1,
      name: "Maize",
      category: "Cereals",
      price: 150,
      stock: 500,
      unit: "kg",
      region: "National",
      status: "Available",
      lastUpdated: "2023-05-15",
    },
    {
      id: 2,
      name: "Rice",
      category: "Cereals",
      price: 200,
      stock: 300,
      unit: "kg",
      region: "National",
      status: "Available",
      lastUpdated: "2023-05-14",
    },
    {
      id: 3,
      name: "Beans",
      category: "Legumes",
      price: 250,
      stock: 200,
      unit: "kg",
      region: "North",
      status: "Low Stock",
      lastUpdated: "2023-05-16",
    },
    {
      id: 4,
      name: "Tomatoes",
      category: "Vegetables",
      price: 100,
      stock: 150,
      unit: "kg",
      region: "South",
      status: "Available",
      lastUpdated: "2023-05-17",
    },
  ];

  const priceUpdates = [
    {
      id: 1,
      product: "Maize",
      oldPrice: 140,
      newPrice: 150,
      date: "2023-05-15",
      updatedBy: "Admin",
    },
    {
      id: 2,
      product: "Rice",
      oldPrice: 180,
      newPrice: 200,
      date: "2023-05-10",
      updatedBy: "Admin",
    },
  ];

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Market Price</Text>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Button
          mode="contained"
          icon="plus"
          onPress={() => router.push("/adminnn/marketplace/products/new")}
          style={styles.actionButton}
        >
          Add Product
        </Button>
        <Button
          mode="outlined"
          icon="chart-line"
          onPress={() => router.push("/adminnn/marketplace/prices")}
          style={styles.actionButton}
        >
          Update Prices
        </Button>
      </View>

      {/* Products Section */}
      <Card style={styles.section}>
        <Card.Title
          title="Products"
          right={() => (
            <View style={styles.filterRow}>
              <Searchbar
                placeholder="Search products"
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={styles.search}
              />
              <Menu
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                  <Button 
                    onPress={() => setMenuVisible(true)}
                    style={styles.filterButton}
                  >
                    {categoryFilter === "all" ? "All Categories" : categoryFilter}
                  </Button>
                }
              >
                <Menu.Item
                  onPress={() => {
                    setCategoryFilter("all");
                    setMenuVisible(false);
                  }}
                  title="All Categories"
                />
                {categories.map((category) => (
                  <Menu.Item
                    key={category}
                    onPress={() => {
                      setCategoryFilter(category);
                      setMenuVisible(false);
                    }}
                    title={category}
                  />
                ))}
              </Menu>
            </View>
          )}
        />
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Product</DataTable.Title>
              <DataTable.Title>Category</DataTable.Title>
              <DataTable.Title numeric>Price</DataTable.Title>
              <DataTable.Title numeric>Stock</DataTable.Title>
              <DataTable.Title>Status</DataTable.Title>
            </DataTable.Header>

            {filteredProducts.map((product) => (
              <DataTable.Row
                key={product.id}
                onPress={() => router.push(`/adminnn/marketplace/products/${product.id}`)}
              >
                <DataTable.Cell>{product.name}</DataTable.Cell>
                <DataTable.Cell>{product.category}</DataTable.Cell>
                <DataTable.Cell numeric>
                  {product.price}/{product.unit}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  {product.stock} {product.unit}
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={{ color: getStatusColor(product.status) }}>
                    {product.status}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>

      {/* Recent Price Updates Section */}
      <Card style={styles.section}>
        <Card.Title
          title="Recent Price Updates"
          right={() => (
            <Button onPress={() => router.push("/adminnn/marketplace/prices")}>
              View All
            </Button>
          )}
        />
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Product</DataTable.Title>
              <DataTable.Title numeric>Old Price</DataTable.Title>
              <DataTable.Title numeric>New Price</DataTable.Title>
              <DataTable.Title>Updated</DataTable.Title>
            </DataTable.Header>

            {priceUpdates.map((update) => (
              <DataTable.Row key={update.id}>
                <DataTable.Cell>{update.product}</DataTable.Cell>
                <DataTable.Cell numeric>{update.oldPrice}</DataTable.Cell>
                <DataTable.Cell numeric>{update.newPrice}</DataTable.Cell>
                <DataTable.Cell>{update.date}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>

      {/* Regional Prices Summary */}
      <Card style={styles.section}>
        <Card.Title title="Regional Price Summary" />
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Product</DataTable.Title>
              <DataTable.Title numeric>North</DataTable.Title>
              <DataTable.Title numeric>South</DataTable.Title>
              <DataTable.Title numeric>East</DataTable.Title>
              <DataTable.Title numeric>West</DataTable.Title>
            </DataTable.Header>
            <DataTable.Row>
              <DataTable.Cell>Maize</DataTable.Cell>
              <DataTable.Cell numeric>145</DataTable.Cell>
              <DataTable.Cell numeric>150</DataTable.Cell>
              <DataTable.Cell numeric>155</DataTable.Cell>
              <DataTable.Cell numeric>140</DataTable.Cell>
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Rice</DataTable.Cell>
              <DataTable.Cell numeric>195</DataTable.Cell>
              <DataTable.Cell numeric>200</DataTable.Cell>
              <DataTable.Cell numeric>210</DataTable.Cell>
              <DataTable.Cell numeric>190</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

function getStatusColor(status) {
  switch (status) {
    case "Available":
      return "green";
    case "Low Stock":
      return "orange";
    case "Out of Stock":
      return "red";
    default:
      return "black";
  }
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
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  section: {
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  search: {
    flex: 1,
    marginRight: 8,
    maxWidth: 200,
  },
  filterButton: {
    width: 150,
  },
});
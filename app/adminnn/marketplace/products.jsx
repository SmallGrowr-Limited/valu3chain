import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { DataTable, Button, Searchbar, Chip, TextInput, Card, Menu, Switch } from "react-native-paper";
import { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function ProductManagement() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [menuVisible, setMenuVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    unit: "kg",
    region: "National",
    description: "",
    isActive: true,
  });

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
      description: "High quality maize grain",
      isActive: true,
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
      description: "Premium grade rice",
      isActive: true,
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
      description: "Red kidney beans",
      isActive: true,
      lastUpdated: "2023-05-16",
    },
  ];

  // Load product data if in edit mode
  useEffect(() => {
    if (id) {
      const product = products.find(p => p.id.toString() === id);
      if (product) {
        setProductData({
          name: product.name,
          category: product.category,
          price: product.price.toString(),
          stock: product.stock.toString(),
          unit: product.unit,
          region: product.region,
          description: product.description,
          isActive: product.isActive,
        });
      }
    }
  }, [id]);

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map((p) => p.category))];
  const units = ["kg", "g", "liters", "bags", "tons"];
  const regions = ["National", "North", "South", "East", "West"];

  const handleSave = () => {
    if (!productData.name || !productData.category || !productData.price || !productData.stock) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    // In a real app, this would call an API to save the product
    Alert.alert(
      "Success", 
      id ? "Product updated successfully" : "Product created successfully",
      [
        { text: "OK", onPress: () => {
          setIsEditing(false);
          if (!id) router.back();
        }}
      ]
    );
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => {
          // In a real app, this would call an API to delete the product
          Alert.alert("Success", "Product deleted successfully");
          router.back();
        }}
      ]
    );
  };

  if (id && isEditing) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Edit Product</Text>
        
        <Card style={styles.section}>
          <Card.Content>
            <TextInput
              label="Product Name"
              value={productData.name}
              onChangeText={(text) => setProductData({...productData, name: text})}
              style={styles.input}
            />
            
            <View style={styles.row}>
              <TextInput
                label="Price"
                value={productData.price}
                onChangeText={(text) => setProductData({...productData, price: text})}
                keyboardType="numeric"
                style={[styles.input, { flex: 1, marginRight: 8 }]}
              />
              <TextInput
                label="Stock"
                value={productData.stock}
                onChangeText={(text) => setProductData({...productData, stock: text})}
                keyboardType="numeric"
                style={[styles.input, { flex: 1 }]}
              />
            </View>
            
            <View style={styles.row}>
              <Menu
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                  <TextInput
                    label="Unit"
                    value={productData.unit}
                    style={[styles.input, { flex: 1, marginRight: 8 }]}
                    editable={false}
                    right={<TextInput.Icon icon="menu-down" onPress={() => setMenuVisible(true)} />}
                  />
                }
              >
                {units.map(unit => (
                  <Menu.Item 
                    key={unit}
                    onPress={() => {
                      setProductData({...productData, unit});
                      setMenuVisible(false);
                    }}
                    title={unit}
                  />
                ))}
              </Menu>
              
              <Menu
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                  <TextInput
                    label="Region"
                    value={productData.region}
                    style={[styles.input, { flex: 1 }]}
                    editable={false}
                    right={<TextInput.Icon icon="menu-down" onPress={() => setMenuVisible(true)} />}
                  />
                }
              >
                {regions.map(region => (
                  <Menu.Item 
                    key={region}
                    onPress={() => {
                      setProductData({...productData, region});
                      setMenuVisible(false);
                    }}
                    title={region}
                  />
                ))}
              </Menu>
            </View>
            
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <TextInput
                  label="Category"
                  value={productData.category}
                  style={styles.input}
                  editable={false}
                  right={<TextInput.Icon icon="menu-down" onPress={() => setMenuVisible(true)} />}
                />
              }
            >
              {categories.map(category => (
                <Menu.Item 
                  key={category}
                  onPress={() => {
                    setProductData({...productData, category});
                    setMenuVisible(false);
                  }}
                  title={category}
                />
              ))}
            </Menu>
            
            <TextInput
              label="Description"
              value={productData.description}
              onChangeText={(text) => setProductData({...productData, description: text})}
              multiline
              numberOfLines={3}
              style={styles.input}
            />
            
            <View style={[styles.row, { alignItems: 'center', justifyContent: 'space-between' }]}>
              <Text>Active in Marketplace</Text>
              <Switch 
                value={productData.isActive} 
                onValueChange={(value) => setProductData({...productData, isActive: value})}
              />
            </View>
          </Card.Content>
        </Card>
        
        <View style={styles.buttonContainer}>
          <Button 
            mode="outlined" 
            onPress={() => setIsEditing(false)}
            style={styles.button}
          >
            Cancel
          </Button>
          <Button 
            mode="contained" 
            onPress={handleSave}
            style={styles.button}
          >
            Save Product
          </Button>
        </View>
        
        {id && (
          <Button 
            mode="contained" 
            buttonColor="#d32f2f"
            onPress={handleDelete}
            style={styles.deleteButton}
          >
            Delete Product
          </Button>
        )}
      </ScrollView>
    );
  }

  if (id) {
    const product = products.find(p => p.id.toString() === id);
    if (!product) return <Text>Product not found</Text>;
    
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{product.name}</Text>
          <Chip 
            style={styles.statusChip} 
            textStyle={{ color: product.isActive ? 'green' : 'red' }}
          >
            {product.isActive ? 'Active' : 'Inactive'}
          </Chip>
        </View>
        
        <Card style={styles.section}>
          <Card.Content>
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell>Category</DataTable.Cell>
                <DataTable.Cell>{product.category}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Price</DataTable.Cell>
                <DataTable.Cell>{product.price}/{product.unit}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Current Stock</DataTable.Cell>
                <DataTable.Cell>{product.stock} {product.unit}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Region</DataTable.Cell>
                <DataTable.Cell>{product.region}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Last Updated</DataTable.Cell>
                <DataTable.Cell>{product.lastUpdated}</DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </Card.Content>
        </Card>
        
        <Card style={styles.section}>
          <Card.Title title="Description" />
          <Card.Content>
            <Text>{product.description}</Text>
          </Card.Content>
        </Card>
        
        <View style={styles.buttonContainer}>
          <Button 
            mode="contained" 
            onPress={() => setIsEditing(true)}
            style={styles.button}
          >
            Edit Product
          </Button>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Product Management</Text>
      
      <View style={styles.quickActions}>
        <Button
          mode="contained"
          icon="plus"
          onPress={() => router.push("/marketplace/products/new")}
          style={styles.actionButton}
        >
          Add Product
        </Button>
      </View>

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
                onPress={() => router.push(`/marketplace/products/${product.id}`)}
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
                  <Text style={{ color: product.isActive ? 'green' : 'red' }}>
                    {product.isActive ? 'Active' : 'Inactive'}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </Card.Content>
      </Card>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  statusChip: {
    marginLeft: 8,
  },
  quickActions: {
    marginBottom: 16,
  },
  actionButton: {
    marginBottom: 8,
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
  input: {
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  deleteButton: {
    marginTop: 16,
  },
});
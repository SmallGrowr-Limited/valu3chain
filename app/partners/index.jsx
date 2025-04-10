import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import PieChartComponent from "../../components/charts/pieChart";
import { trades } from "../../components/data";
import SlideUpModal from "../../components/modal";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

// Disable Reanimate strict mode
  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
  });
  const { height } = Dimensions.get("window");

const Index = () => {

  const router = useRouter()

  const [modalVisible, setModalVisible] = useState(false);
  // Shared values for animation
  const translateY = useSharedValue(height);
  const opacity = useSharedValue(0);

  const openModal = () => {
    setModalVisible(true);
    translateY.value = withTiming(0, { duration: 600 });
    opacity.value = withTiming(1, { duration: 300 });
  };

  const closeModal = () => {
    translateY.value = withTiming(height, { duration: 300 });
    opacity.value = withTiming(0, { duration: 300 });
    setModalVisible(false);
  };

  // Animated styles
  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const animatedBackdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.rowItem}>
      <View style={styles.nameFieldWrap}>
        <Text style={styles.field}>{item.name}</Text>
      </View>
      <View style={styles.dateFieldWrap}>
        <Text style={styles.field}>{item.date}</Text>
      </View>
      <View style={styles.statusFieldWrap}>
        <Text
          style={[
            styles.field,
            item.status == "Completed"
              ? styles.completedFont
              : item.status == "Failed"
              ? styles.failed
              : styles.inprogressFont,
          ]}
        >
          {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.notifications}>
        <View>
          <Text style={styles.userName}>Hello, Admin</Text>
        </View>
        {/* <MenuComponent /> */}
        <Ionicons name="notifications-circle" size={30} color="#000" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.chartSection}>
          <Text style={[styles.title, { padding: 10 }]}>
            Commodity Price Chart
          </Text>
          <PieChartComponent />
        </View>
        <View style={[styles.columns, { marginTop: 10 }]}>
          <TouchableOpacity
            style={[styles.actionButton, styles.shadowProp, styles.bgColor4]}
            onPress={() => router.navigate("/partners/transactions")}
          >
            <Text style={styles.buttonText}>Transactions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.shadowProp, styles.bgColor3]}
            onPress={openModal}
          >
            <Text style={styles.buttonText}>Investments</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.title}>Transaction History</Text>
          <FlatList
            data={trades}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
      <SlideUpModal
        modalVisible={modalVisible}
        closeModal={closeModal}
        animatedBackdropStyle={animatedBackdropStyle}
        animatedContainerStyle={animatedContainerStyle}
      />
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  contentWrapper: { flex: 1, padding: 10 },
  notifications: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  userName: { fontSize: 18, fontWeight: 500, color: "#0a990b" },
  title: { fontSize: 18, fontWeight: 500,  },
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    marginBottom: 5,
    paddingVertical: 10,
    width: "100%",
  },
  listItem: {
    // marginTop: 10,
    padding: 10,
  },
  field: {
    fontSize: 16,
  },
  nameFieldWrap: {
    width: "40%",
  },
  dateFieldWrap: {
    width: "30%",
  },
  statusFieldWrap: {
    width: "30%",
  },
  inprogressFont: {
    color: "#FFB715",
  },

  completedFont: {
    color: "#16B116",
  },
  failed: {
    color: "#E81D0B",
  },
  columns: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 5,
    marginBottom: 10,
    // backgroundColor: "#000",
  },
  actionButton: {
    width: "46%",
    backgroundColor: "#fff",
    padding: 15,
    margin: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { fontSize: 16, color: "#fff" },
  shadowProp: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 0.5,
  },
  bgColor1: {
    backgroundColor: "#f0604a",
  },
  bgColor2: {
    backgroundColor: "#0a990b",
  },
  bgColor3: {
    backgroundColor: "#48A6A7",
  },
  bgColor4: {
    backgroundColor: "#2973B2",
  },
  bgColor5: {
    backgroundColor: "#9DC08B",
  },
});

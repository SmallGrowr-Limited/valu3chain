
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import {
  MaterialIcons,
  FontAwesome5,
  Feather,
  Ionicons,
} from "@expo/vector-icons";
import Svg, { Circle, Rect, Path, G } from "react-native-svg";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = false; // Change to true to simulate logged in user
      setIsAuthenticated(authenticated);
      setShowAuthModal(!authenticated);
    };

    checkAuth();
  }, []);

  // Quick links data
  const quickLinks = [
    {
      id: 1,
      icon: "assessment",
      name: "Scan QR Code",
      component: "FarmReports",
    },
    { id: 2, icon: "wb-sunny", name: "Weather", component: "Weather" },
    { id: 3, icon: "agriculture", name: "Resources", component: "Equipment" },
    { id: 4, icon: "headset-mic", name: "Support", component: "Support" },
  ];

  // Analytics data with graph points
  const analyticsData = [
    {
      id: 1,
      title: "Crop Yield",
      value: "85%",
      trend: "up",
      change: "+5%",
      icon: "leaf",
      data: [30, 45, 60, 75, 85], // Yield percentages over last 5 periods
      color: "#4CAF50",
    },
    {
      id: 2,
      title: "Revenue",
      value: "₦24,580",
      trend: "up",
      change: "+12%",
      icon: "dollar-sign",
      data: [12000, 15000, 18000, 21000, 24580], // Revenue over last 5 periods
      color: "#2196F3",
    },
  ];

  // Features data
  const features = [
    { id: 1, name: "Soil Scan", icon: "flask" },
    { id: 2, name: "Market Prices", icon: "chart-line" },
    { id: 3, name: "Inventory", icon: "clipboard-list" },
    { id: 4, name: "Pest Alert", icon: "bug" },
    { id: 5, name: "Irrigation", icon: "tint" },
    { id: 6, name: "Crop Plan", icon: "calendar-alt" },
  ];

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  // Function to render a line graph
  const renderLineGraph = (data, color) => {
    const graphWidth = (width - 64) / 3 - 32; // Adjusted for padding and margins
    const graphHeight = 60;
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue;

    const points = data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * graphWidth;
        const y = graphHeight - ((value - minValue) / range) * graphHeight;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <Svg width={graphWidth} height={graphHeight}>
        <Path
          d={`M${points}`}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Add dots at each data point */}
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * graphWidth;
          const y = graphHeight - ((value - minValue) / range) * graphHeight;
          return (
            <Circle key={`point-${index}`} cx={x} cy={y} r="3" fill={color} />
          );
        })}
      </Svg>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}

        <View style={styles.heroContainer}>
          <ImageBackground
            source={require("../assets/images/tractor.jpeg")}
            style={styles.heroImage}
            resizeMode="cover"
          >
            <View style={styles.heroOverlay}>
              <Text style={styles.heroTitle}>Welcome to Valu3Chain</Text>
              <Text style={styles.heroSubtitle}>
                Smart farming solutions for modern agriculture
              </Text>
            </View>
          </ImageBackground>
        </View>

        {/* Quick Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          <View style={styles.quickLinksContainer}>
            {quickLinks.map((link) => (
              <TouchableOpacity
                key={link.id}
                style={styles.quickLink}
                onPress={() =>
                  isAuthenticated
                    ? router.push(`/${link.component}`)
                    : setShowAuthModal(true)
                }
              >
                <View style={styles.quickLinkIcon}>
                  <MaterialIcons name={link.icon} size={24} color="#4CAF50" />
                </View>
                <Text style={styles.quickLinkText}>{link.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Analytics with Graphs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Farm Analytics</Text>
          <View style={styles.analyticsContainer}>
            {analyticsData.map((item) => (
              <View
                key={item.id}
                style={[styles.analyticsCard, { borderTopColor: item.color }]}
              >
                <View style={styles.analyticsHeader}>
                  <FontAwesome5 name={item.icon} size={16} color={item.color} />
                  <Text style={[styles.analyticsTitle, { color: item.color }]}>
                    {item.title}
                  </Text>
                  {item.trend === "up" && (
                    <Feather name="trending-up" size={16} color="#4CAF50" />
                  )}
                  {item.trend === "down" && (
                    <Feather name="trending-down" size={16} color="#F44336" />
                  )}
                  {item.trend === "neutral" && (
                    <Feather name="minus" size={16} color="#FFC107" />
                  )}
                </View>
                <Text style={styles.analyticsValue}>{item.value}</Text>
                <Text
                  style={[
                    styles.analyticsChange,
                    {
                      color:
                        item.trend === "up"
                          ? "#4CAF50"
                          : item.trend === "down"
                            ? "#F44336"
                            : "#FFC107",
                    },
                  ]}
                >
                  {item.change}
                </Text>
                {/* Graph Visualization */}
                <View style={styles.graphContainer}>
                  {renderLineGraph(item.data, item.color)}
                </View>
                <View style={styles.timePeriod}>
                  <Text style={styles.timePeriodText}>Last 5 periods</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Features Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tools & Features</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature) => (
              <TouchableOpacity
                key={feature.id}
                style={styles.featureCard}
                onPress={() =>
                  isAuthenticated ? null : setShowAuthModal(true)
                }
              >
                <View style={styles.featureIcon}>
                  <FontAwesome5 name={feature.icon} size={20} color="#4CAF50" />
                </View>
                <Text style={styles.featureText}>{feature.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Auth Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAuthModal && !isAuthenticated}
        onRequestClose={() => setShowAuthModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={require("../assets/images/logo1.png")}
              style={styles.modalLogo}
              resizeMode="contain"
            />
            <Text style={styles.modalTitle}>Get Started</Text>
            <Text style={styles.modalSubtitle}>
              Please login or sign up to access all features
            </Text>

            <TouchableOpacity
              style={[styles.authButton, styles.loginButton]}
              onPress={() => {
                router.push("/login");
                handleLoginSuccess();
              }}
            >
              <Text style={styles.authButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.authButton, styles.signupButton]}
              onPress={() => {
                router.push("/register");
                handleLoginSuccess();
              }}
            >
              <Text style={[styles.authButtonText, { color: "#4CAF50" }]}>
                Sign Up
              </Text>
            </TouchableOpacity>

            {isAuthenticated ? null : (
              <TouchableOpacity
                style={styles.skipButton}
                onPress={() => setShowAuthModal(false)}
              >
                <Text style={styles.skipButtonText}>Continue as guest</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>

      {/* Floating Auth Trigger - Only show if authenticated */}
      {isAuthenticated && (
        <TouchableOpacity
          style={styles.authTrigger}
          onPress={() => {
            setIsAuthenticated(false);
            setShowAuthModal(true);
          }}
        >
          <Ionicons name="person-circle-outline" size={28} color="#4CAF50" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  //   heroImage: {
  //     height: 220,
  //     justifyContent: "flex-end",
  //   },
  //   heroOverlay: {
  //     backgroundColor: "rgba(0,0,0,0.4)",
  //     padding: 20,
  //   },
  //   heroTitle: {
  //     fontSize: 28,
  //     fontWeight: "bold",
  //     color: "white",
  //     marginBottom: 8,
  //   },
  //   heroSubtitle: {
  //     fontSize: 16,
  //     color: "white",
  //     opacity: 0.9,
  //   },
  heroContainer: {
    height: 220,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject, // This makes the overlay cover the entire image
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "white",
    opacity: 0.9,
  },
 
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  quickLinksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  quickLink: {
    alignItems: "center",
    width: "23%",
  },
  quickLinkIcon: {
    backgroundColor: "white",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickLinkText: {
    marginTop: 8,
    fontSize: 12,
    textAlign: "center",
    color: "#000",
  },
  analyticsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  analyticsCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    width: (width - 64) / 2, // Adjusted for 3 cards with padding
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderTopWidth: 4,
  },
  analyticsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  analyticsTitle: {
    fontSize: 12,
    marginLeft: 6,
    marginRight: "auto",
    fontWeight: "600",
  },
  analyticsValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 4,
  },
  analyticsChange: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
  },
  graphContainer: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  timePeriod: {
    alignItems: "center",
  },
  timePeriodText: {
    fontSize: 10,
    color: "#888",
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    backgroundColor: "white",
    width: "30%",
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureIcon: {
    backgroundColor: "#E8F5E9",
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    textAlign: "center",
    color: "#000",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    width: "80%",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    elevation: 5,
  },
  modalLogo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  authButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: "#4CAF50",
  },
  signupButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  authButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  skipButton: {
    marginTop: 8,
  },
  skipButtonText: {
    fontSize: 14,
    color: "#666",
  },
  authTrigger: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "white",
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
});

export default HomeScreen;


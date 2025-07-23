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
import { CommodityPricesSection } from "../components/agent-components/CommodityPrices";
import { InvestmentOpportunities } from "../components/agent-components/InvestmentOpportunities";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const priceData = [
    { commodity: "Yellow maize", price: "47,000", change: -2.1 },
    { commodity: "White maize", price: "45,000", change: -4.3 },
    { commodity: "White beans", price: "103,000", change: -1.9 },
    { commodity: "Brown beans", price: "105,000", change: -4.5 },
    { commodity: "Sorghum (dawa)", price: "49,000", change: -3.9 },
    { commodity: "Soyabeans", price: "83,000", change: -2.3 },
    { commodity: "Long grain rice", price: "45,000", change: 0 },
    { commodity: "Short grain rice", price: "41,000", change: 0 },
  ];

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
      icon: "qr-code",
      name: "Scan QR Code",
      component: "FarmReports",
    },
    { id: 2, icon: "wb-sunny", name: "Weather", component: "Weather" },
    { id: 3, icon: "calendar-month", name: "Planting Calendar", component: "Equipment" },
    
  ];



  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
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

        <CommodityPricesSection />
        <InvestmentOpportunities
          isAuthenticated={isAuthenticated}
          setShowAuthModal={setShowAuthModal}
        />
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
    fontSize: 16,
    color: "#000",
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

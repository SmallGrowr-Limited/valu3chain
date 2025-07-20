import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

export const InvestmentOpportunities = () => {
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Sample investment data
  const investments = [
    {
      id: 1,
      title: "Maize Farm Expansion",
      location: "Kaduna",
      yield: "15-20%",
      duration: "8 months",
      minAmount: "₦200,000",
      image: require("../../assets/images/maize.jpeg"),
      description:
        "Invest in our expanding maize farm with guaranteed buy-back agreement. Ideal for investors looking for medium-term agricultural returns.",
      riskLevel: "Medium",
      roi: "18% expected",
      manager: "GreenFields Agribusiness",
    },
    {
      id: 2,
      title: "Poultry Farm Project",
      location: "Oyo",
      yield: "22-25%",
      duration: "6 months",
      minAmount: "₦150,000",
      image: require("../../assets/images/poultry-farm.jpg"),
      description:
        "Modern poultry farming with automated systems. Includes veterinary care and guaranteed market for produce.",
      riskLevel: "Low",
      roi: "23% expected",
      manager: "Prime Poultry Ltd",
    },
    {
      id: 3,
      title: "Cassava Processing Plant",
      location: "Edo",
      yield: "18-22%",
      duration: "12 months",
      minAmount: "₦300,000",
      image: require("../../assets/images/cassava.jpg"),
      description:
        "Investment in cassava processing equipment and value-added products. Partnership with established off-takers.",
      riskLevel: "Medium",
      roi: "20% expected",
      manager: "RootValue Processing",
    },
    {
      id: 4,
      title: "Tomato Greenhouse",
      location: "Kano",
      yield: "25-30%",
      duration: "10 months",
      minAmount: "₦250,000",
      image: require("../../assets/images/tomato-greenhouse.jpg"),
      description:
        "Climate-controlled greenhouse tomato production with year-round harvest potential.",
      riskLevel: "Medium",
      roi: "28% expected",
      manager: "FreshHarvest Greenhouses",
    },
  ];

  const openInvestmentDetail = (investment) => {
    setSelectedInvestment(investment);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Investment Opportunities</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        {investments.map((investment) => (
          <TouchableOpacity
            key={investment.id}
            style={styles.card}
            onPress={() => openInvestmentDetail(investment)}
          >
            <Image source={investment.image} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{investment.title}</Text>
              <View style={styles.cardRow}>
                <MaterialIcons name="location-on" size={16} color="#666" />
                <Text style={styles.cardText}>{investment.location}</Text>
              </View>
              <View style={styles.cardDetails}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Yield</Text>
                  <Text style={[styles.detailValue, styles.yieldText]}>
                    {investment.yield}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Duration</Text>
                  <Text style={styles.detailValue}>{investment.duration}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Min Invest</Text>
                  <Text style={styles.detailValue}>{investment.minAmount}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Investment Detail Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {selectedInvestment && (
          <ScrollView style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>

            <Image
              source={selectedInvestment.image}
              style={styles.modalImage}
            />

            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedInvestment.title}</Text>

              <View style={styles.modalRow}>
                <FontAwesome name="map-marker" size={16} color="#4CAF50" />
                <Text style={styles.modalText}>
                  {selectedInvestment.location}
                </Text>
              </View>

              <Text style={styles.sectionTitle}>Investment Details</Text>
              <Text style={styles.description}>
                {selectedInvestment.description}
              </Text>

              <View style={styles.detailContainer}>
                <View style={styles.detailBox}>
                  <Text style={styles.detailBoxLabel}>Expected ROI</Text>
                  <Text style={styles.detailBoxValue}>
                    {selectedInvestment.roi}
                  </Text>
                </View>
                <View style={styles.detailBox}>
                  <Text style={styles.detailBoxLabel}>Risk Level</Text>
                  <Text style={styles.detailBoxValue}>
                    {selectedInvestment.riskLevel}
                  </Text>
                </View>
                <View style={styles.detailBox}>
                  <Text style={styles.detailBoxLabel}>Duration</Text>
                  <Text style={styles.detailBoxValue}>
                    {selectedInvestment.duration}
                  </Text>
                </View>
                <View style={styles.detailBox}>
                  <Text style={styles.detailBoxLabel}>Min Investment</Text>
                  <Text style={styles.detailBoxValue}>
                    {selectedInvestment.minAmount}
                  </Text>
                </View>
              </View>

              <Text style={styles.sectionTitle}>Managed By</Text>
              <Text style={styles.manager}>{selectedInvestment.manager}</Text>

              <TouchableOpacity style={styles.investButton}>
                <Text style={styles.investButtonText}>Invest Now</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  seeAll: {
    color: "#4CAF50",
    fontWeight: "500",
  },
  scrollContainer: {
    paddingVertical: 8,
  },
  card: {
    width: 280,
    marginRight: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: "100%",
    height: 120,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardText: {
    marginLeft: 4,
    color: "#666",
    fontSize: 14,
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailItem: {
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 12,
    color: "#666",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginTop: 4,
  },
  yieldText: {
    color: "#4CAF50",
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 20,
    padding: 8,
  },
  modalImage: {
    width: "100%",
    height: 220,
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  modalRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  modalText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 12,
    color: "#333",
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#555",
    marginBottom: 16,
  },
  detailContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  detailBox: {
    width: "48%",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  detailBoxLabel: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  detailBoxValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  manager: {
    fontSize: 16,
    color: "#555",
    marginBottom: 24,
  },
  investButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  investButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});



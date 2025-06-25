import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Header from "../../../../../components/agent-components/Header";
import { colors } from "../../../../../components/agent-components/constants/colors";

// Mock data - in a real app this would come from your data source
const farmerDetails = {
  id: "1",
  name: "Kwame Yeboah",
  location: "Kumasi, Ashanti Region",
  farms: [
    {
      id: "1",
      name: "Yeboah Main Farm",
      size: "5 acres",
      crops: ["Maize", "Cassava"],
      lastAudit: "2023-10-15",
      auditStatus: "Good",
    },
    {
      id: "2",
      name: "Yeboah Vegetable Farm",
      size: "2 acres",
      crops: ["Tomatoes", "Peppers", "Onions"],
      lastAudit: "2023-09-28",
      auditStatus: "Needs Improvement",
    },
  ],
  contact: {
    phone: "+233 24 123 4567",
    email: "kwame.yeboah@example.com",
    address: "123 Farm Road, Kumasi",
  },
  dateJoined: "2023-05-15",
  status: "Active",
  inputsRequested: [
    { id: "1", type: "Fertilizer", status: "Delivered", date: "2023-08-10" },
    { id: "2", type: "Seeds", status: "Pending", date: "2023-11-05" },
  ],
  notes:
    "Kwame has been farming for 10 years. Specializes in mixed cropping. Very responsive to new techniques.",
};

export default function FarmerDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState("overview");

  // In a real app, you would fetch farmer data based on the id
  const farmer = farmerDetails;

  const handleCall = () => {
    Linking.openURL(`tel:${farmer.contact.phone}`);
  };

  const handleMessage = () => {
    Linking.openURL(`sms:${farmer.contact.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${farmer.contact.email}`);
  };

  const renderOverview = () => (
    <View style={styles.section}>
      <View style={styles.infoRow}>
        <Ionicons name="calendar" size={20} color={colors.gray} />
        <Text style={styles.infoText}>Joined: {farmer.dateJoined}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="location" size={20} color={colors.gray} />
        <Text style={styles.infoText}>{farmer.location}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="home" size={20} color={colors.gray} />
        <Text style={styles.infoText}>{farmer.contact.address}</Text>
      </View>

      <Text style={styles.sectionTitle}>About</Text>
      <Text style={styles.paragraph}>{farmer.notes}</Text>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push(`/audits/new?farmerId=${farmer.id}`)}
        >
          <MaterialIcons name="assignment" size={24} color={colors.primary} />
          <Text style={styles.actionText}>New Audit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push(`/inputs/request?farmerId=${farmer.id}`)}
        >
          <MaterialCommunityIcons
            name="tractor"
            size={24}
            color={colors.primary}
          />
          <Text style={styles.actionText}>Request Inputs</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFarms = () => (
    <View style={styles.section}>
      {farmer.farms.map((farm) => (
        <TouchableOpacity
          key={farm.id}
          style={styles.farmCard}
          onPress={() => router.push(`/farms/${farm.id}`)}
        >
          <View style={styles.farmHeader}>
            <Text style={styles.farmName}>{farm.name}</Text>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    farm.auditStatus === "Good"
                      ? colors.successLight
                      : colors.warningLight,
                },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  {
                    color:
                      farm.auditStatus === "Good"
                        ? colors.success
                        : colors.warning,
                  },
                ]}
              >
                {farm.auditStatus}
              </Text>
            </View>
          </View>

          <View style={styles.farmDetails}>
            <Text style={styles.farmDetail}>Size: {farm.size}</Text>
            <Text style={styles.farmDetail}>
              Crops: {farm.crops.join(", ")}
            </Text>
            <Text style={styles.farmDetail}>Last Audit: {farm.lastAudit}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.addFarmButton}
        onPress={() => router.push(`/farms/add?farmerId=${farmer.id}`)}
      >
        <Ionicons name="add" size={24} color={colors.primary} />
        <Text style={styles.addFarmText}>Add New Farm</Text>
      </TouchableOpacity>
    </View>
  );

  const renderInputs = () => (
    <View style={styles.section}>
      {farmer.inputsRequested.map((input) => (
        <View key={input.id} style={styles.inputCard}>
          <View style={styles.inputHeader}>
            <Text style={styles.inputType}>{input.type}</Text>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    input.status === "Delivered"
                      ? colors.successLight
                      : colors.warningLight,
                },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  {
                    color:
                      input.status === "Delivered"
                        ? colors.success
                        : colors.warning,
                  },
                ]}
              >
                {input.status}
              </Text>
            </View>
          </View>
          <Text style={styles.inputDate}>Requested: {input.date}</Text>
        </View>
      ))}

      <TouchableOpacity
        style={styles.addInputButton}
        onPress={() => router.push(`/inputs/request?farmerId=${farmer.id}`)}
      >
        <Text style={styles.addInputText}>+ Request New Input</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Farmer Details"
        showBackButton
        rightAction={
          <TouchableOpacity
            onPress={() =>
              router.push(`extension-agent/home/farmers/edit/${farmer.id}`)
            }
          >
            <Ionicons name="create-outline" size={24} color={colors.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Farmer Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
              style={styles.avatar}
            />
            <View
              style={[
                styles.statusIndicator,
                {
                  backgroundColor:
                    farmer.status === "Active"
                      ? colors.success
                      : colors.warning,
                },
              ]}
            />
          </View>

          <Text style={styles.name}>{farmer.name}</Text>

          <View style={styles.contactButtons}>
            <TouchableOpacity style={styles.contactButton} onPress={handleCall}>
              <Ionicons name="call" size={20} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={handleMessage}
            >
              <Ionicons name="chatbubble" size={20} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={handleEmail}
            >
              <MaterialIcons name="email" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "overview" && styles.activeTab]}
            onPress={() => setActiveTab("overview")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "overview" && styles.activeTabText,
              ]}
            >
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "farms" && styles.activeTab]}
            onPress={() => setActiveTab("farms")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "farms" && styles.activeTabText,
              ]}
            >
              Farms ({farmer.farms.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "inputs" && styles.activeTab]}
            onPress={() => setActiveTab("inputs")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "inputs" && styles.activeTabText,
              ]}
            >
              Inputs ({farmer.inputsRequested.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === "overview" && renderOverview()}
        {activeTab === "farms" && renderFarms()}
        {activeTab === "inputs" && renderInputs()}
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
    paddingBottom: 32,
  },
  profileHeader: {
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.lightPrimary,
  },
  statusIndicator: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.white,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.dark,
    marginBottom: 16,
  },
  contactButtons: {
    flexDirection: "row",
    gap: 16,
  },
  contactButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: "500",
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: "600",
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark,
    marginTop: 16,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  infoText: {
    fontSize: 15,
    color: colors.dark,
  },
  paragraph: {
    fontSize: 14,
    color: colors.gray,
    lineHeight: 22,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  actionText: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 8,
    fontWeight: "500",
  },
  farmCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  farmHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  farmName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  farmDetails: {
    gap: 6,
  },
  farmDetail: {
    fontSize: 13,
    color: colors.gray,
  },
  addFarmButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    marginTop: 8,
  },
  addFarmText: {
    fontSize: 14,
    color: colors.primary,
    marginLeft: 8,
    fontWeight: "500",
  },
  inputCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  inputHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  inputType: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.dark,
  },
  inputDate: {
    fontSize: 13,
    color: colors.gray,
  },
  addInputButton: {
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    alignItems: "center",
    marginTop: 8,
  },
  addInputText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "500",
  },
  successLight: {
    backgroundColor: "#E8F5E9",
  },
  warningLight: {
    backgroundColor: "#FFF3E0",
  },
});

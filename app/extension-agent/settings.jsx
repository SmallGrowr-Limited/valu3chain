import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const toggleDarkMode = () => setDarkMode((previousState) => !previousState);
  const togglePushNotifications = () =>
    setPushNotifications((previousState) => !previousState);
  const toggleEmailNotifications = () =>
    setEmailNotifications((previousState) => !previousState);
  const toggleSmsNotifications = () =>
    setSmsNotifications((previousState) => !previousState);

  const handleLogout = () => {
    // Implement logout logic here
    console.log("User logged out");
    navigation.navigate("Login");
  };

  const openPrivacyPolicy = () => {
    Linking.openURL("https://example.com/privacy-policy");
  };

  const openTermsOfService = () => {
    Linking.openURL("https://example.com/terms-of-service");
  };

  const openHelpCenter = () => {
    Linking.openURL("https://example.com/help-center");
  };

  const SettingItem = ({
    title,
    onPress,
    isSwitch = false,
    switchValue,
    onSwitchChange,
  }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={!isSwitch ? onPress : null}
    >
      <Text style={styles.settingText}>{title}</Text>
      {isSwitch ? (
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={switchValue ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={onSwitchChange}
          value={switchValue}
        />
      ) : (
        <Text style={styles.arrow}>›</Text>
      )}
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  return (
    <ScrollView style={[styles.container, darkMode && styles.darkContainer]}>
      {/* Account & Security Section */}
      <SectionHeader title="Account & Security" />
      <SettingItem
        title="Profile Information"
        onPress={() => navigation.navigate("ProfileInformation")}
      />
      <SettingItem
        title="Change Password / Update Credentials"
        onPress={() => navigation.navigate("ChangePassword")}
      />
      <SettingItem title="Logout" onPress={handleLogout} />

      {/* App Preferences Section */}
      <SectionHeader title="App Preferences" />
      <SettingItem
        title="Language Selection"
        onPress={() =>
          navigation.navigate("LanguageSelection", {
            selectedLanguage,
            setSelectedLanguage,
          })
        }
      />
      <SettingItem
        title="Dark Mode"
        isSwitch
        switchValue={darkMode}
        onSwitchChange={toggleDarkMode}
      />
      <SettingItem
        title="Push Notifications"
        isSwitch
        switchValue={pushNotifications}
        onSwitchChange={togglePushNotifications}
      />
      <SettingItem
        title="Email Notifications"
        isSwitch
        switchValue={emailNotifications}
        onSwitchChange={toggleEmailNotifications}
      />
      <SettingItem
        title="SMS Notifications"
        isSwitch
        switchValue={smsNotifications}
        onSwitchChange={toggleSmsNotifications}
      />

      {/* Privacy & Security Section */}
      <SectionHeader title="Privacy & Security" />
      <SettingItem title="Privacy Policy" onPress={openPrivacyPolicy} />
      <SettingItem
        title="Activity Logs"
        onPress={() => navigation.navigate("ActivityLogs")}
      />
      <SettingItem title="Terms of Service" onPress={openTermsOfService} />

      {/* Help & Support Section */}
      <SectionHeader title="Help & Support" />
      <SettingItem
        title="Contact Support"
        onPress={() => navigation.navigate("ContactSupport")}
      />
      <SettingItem title="FAQ" onPress={() => navigation.navigate("FAQ")} />
      <SettingItem title="Help Center" onPress={openHelpCenter} />
    </ScrollView>
  );
};

const Colors = {
  primary: "#2E7D32", // Deep green - represents brand identity
  primaryLight: "#E8F5E9",
  primaryDark: "#1B5E20",
  secondary: "#FF8F00", // Amber - for interactive elements
  background: "#F8FAF8", // Very light green tint
  backgroundDark: "#121212",
  white: "#FFFFFF",
  cardBg: "#FFFFFF",
  cardBgDark: "#1E1E1E",
  textPrimary: "#263238", // Dark blue-gray
  textSecondary: "#455A64",
  textTertiary: "#718096",
  textOnPrimary: "#FFFFFF",
  border: "#CFD8DC",
  borderDark: "#333333",
  switchActive: "#81b0ff",
  switchInactive: "#767577",
  switchThumb: "#f5dd4b",
  sectionHeaderLight: "#E8F5E9",
  sectionHeaderDark: "#2D3748",
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: Colors.background,
  // },
  // darkContainer: {
  //   backgroundColor: Colors.backgroundDark,
  // },
  // sectionHeader: {
  //   backgroundColor: Colors.sectionHeaderLight,
  //   paddingVertical: 12,
  //   paddingHorizontal: 20,
  //   marginTop: 24,
  //   marginBottom: 8,
  // },
  // darkSectionHeader: {
  //   backgroundColor: Colors.sectionHeaderDark,
  // },
  // sectionHeaderText: {
  //   fontSize: 15,
  //   fontFamily: "Inter-SemiBold",
  //   color: Colors.primaryDark,
  //   letterSpacing: 0.5,
  //   textTransform: "uppercase",
  // },
  // darkSectionHeaderText: {
  //   color: Colors.white,
  // },
  // settingItem: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   paddingVertical: 18,
  //   paddingHorizontal: 20,
  //   backgroundColor: Colors.white,
  //   marginBottom: 1,
  // },
  // darkSettingItem: {
  //   backgroundColor: Colors.cardBgDark,
  // },
  // settingText: {
  //   fontSize: 16,
  //   fontFamily: "Inter-Medium",
  //   color: Colors.textPrimary,
  // },
  // darkSettingText: {
  //   color: Colors.white,
  // },
  // arrow: {
  //   fontSize: 24,
  //   color: Colors.textTertiary,
  // },
  // darkArrow: {
  //   color: Colors.textTertiary,
  // },
  // switchContainer: {
  //   transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  // },
  // logoutButton: {
  //   marginTop: 32,
  //   marginHorizontal: 20,
  //   paddingVertical: 16,
  //   backgroundColor: Colors.error,
  //   borderRadius: 12,
  //   alignItems: "center",
  //   elevation: 2,
  // },
  // logoutText: {
  //   color: Colors.white,
  //   fontSize: 16,
  //   fontFamily: "Inter-SemiBold",
  // },

  //kkkkkkkkkkkkkk
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  sectionHeader: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  darkSectionHeader: {
    backgroundColor: "#333",
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  darkSectionHeaderText: {
    color: "#fff",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  darkSettingItem: {
    borderBottomColor: "#333",
  },
  settingText: {
    fontSize: 16,
    color: "#333",
  },
  darkSettingText: {
    color: "#fff",
  },
  arrow: {
    fontSize: 24,
    color: "#999",
  },
  darkArrow: {
    color: "#666",
  },
});

export default SettingsScreen;

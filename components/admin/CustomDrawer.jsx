// app/components/CustomDrawer.js
import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { 
  Text, 
  IconButton, 
  List, 
  Divider, 
  useTheme,
  Avatar
} from 'react-native-paper';

const CustomDrawerContent = (props) => {
  const { colors } = useTheme();
  const [expandedModules, setExpandedModules] = useState({
    agentManagement: true,
    partnerManagement: false,
    commonModules: false
  });

  const toggleModule = (module) => {
    setExpandedModules({
      ...expandedModules,
      [module]: !expandedModules[module]
    });
  };

  const navigate = (route) => {
    props.navigation.navigate(route);
    props.navigation.closeDrawer();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      {/* Drawer Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.profileContainer}>
          <Avatar.Icon size={64} icon="account" style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Admin User</Text>
            <Text style={styles.userRole}>System Administrator</Text>
          </View>
        </View>
      </View>

      <Divider />

      {/* Dashboard Section */}
      <List.Section>
        <List.Item
          title="Dashboard"
          left={() => <List.Icon icon="view-dashboard" />}
          onPress={() => navigate('index')}
          style={styles.listItem}
          titleStyle={styles.listTitle}
        />
      </List.Section>

      <Divider />

      {/* Module 1: Extension Agent Management */}
      <List.Section>
        <List.Accordion
          title="Agent Management"
          left={() => <List.Icon icon="account-group" />}
          expanded={expandedModules.agentManagement}
          onPress={() => toggleModule('agentManagement')}
          style={styles.moduleHeader}
          titleStyle={styles.moduleTitle}
        >
          <List.Item
            title="Onboard Farmers"
            left={() => <List.Icon icon="account-plus" />}
            onPress={() => navigate('modules/agent-management/onboard-farmers')}
            style={styles.subItem}
          />
          <List.Item
            title="Request Inputs"
            left={() => <List.Icon icon="cart-arrow-down" />}
            onPress={() => navigate('modules/agent-management/request-inputs')}
            style={styles.subItem}
          />
          <List.Item
            title="Audit Farms"
            left={() => <List.Icon icon="clipboard-check" />}
            onPress={() => navigate('modules/agent-management/audit-farms')}
            style={styles.subItem}
          />
          <List.Item
            title="Market Prices"
            left={() => <List.Icon icon="chart-line" />}
            onPress={() => navigate('modules/agent-management/market-prices')}
            style={styles.subItem}
          />
          <List.Item
            title="Input Distribution"
            left={() => <List.Icon icon="truck-delivery" />}
            onPress={() => navigate('modules/agent-management/input-distribution')}
            style={styles.subItem}
          />
        </List.Accordion>
      </List.Section>

      <Divider />

      {/* Module 2: Partner Management */}
      <List.Section>
        <List.Accordion
          title="Partner Management"
          left={() => <List.Icon icon="handshake" />}
          expanded={expandedModules.partnerManagement}
          onPress={() => toggleModule('partnerManagement')}
          style={styles.moduleHeader}
          titleStyle={styles.moduleTitle}
        >
          <List.Item
            title="Investments"
            left={() => <List.Icon icon="cash-multiple" />}
            onPress={() => navigate('modules/partner-management/investments')}
            style={styles.subItem}
          />
          <List.Item
            title="Orders & Approvals"
            left={() => <List.Icon icon="clipboard-list" />}
            onPress={() => navigate('modules/partner-management/orders')}
            style={styles.subItem}
          />
          <List.Item
            title="Trade Offers"
            left={() => <List.Icon icon="shopping" />}
            onPress={() => navigate('modules/partner-management/trade-offers')}
            style={styles.subItem}
          />
        </List.Accordion>
      </List.Section>

      <Divider />

      {/* Common Modules */}
      <List.Section>
        <List.Accordion
          title="Common Modules"
          left={() => <List.Icon icon="apps" />}
          expanded={expandedModules.commonModules}
          onPress={() => toggleModule('commonModules')}
          style={styles.moduleHeader}
          titleStyle={styles.moduleTitle}
        >
          <List.Item
            title="Farmers"
            left={() => <List.Icon icon="account-tie" />}
            onPress={() => navigate('modules/common/farmers')}
            style={styles.subItem}
          />
          <List.Item
            title="Products"
            left={() => <List.Icon icon="package-variant" />}
            onPress={() => navigate('modules/common/products')}
            style={styles.subItem}
          />
          <List.Item
            title="Reports"
            left={() => <List.Icon icon="file-chart" />}
            onPress={() => navigate('modules/common/reports')}
            style={styles.subItem}
          />
        </List.Accordion>
      </List.Section>

      <Divider style={styles.bottomDivider} />

      {/* Footer */}
      <View style={styles.footer}>
        <IconButton
          icon="cog"
          size={24}
          onPress={() => console.log('Settings')}
        />
        <IconButton
          icon="logout"
          size={24}
          onPress={() => console.log('Logout')}
          style={styles.logoutButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 15,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  userRole: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  listItem: {
    paddingVertical: 8,
  },
  listTitle: {
    fontWeight: '600',
    fontSize: 16,
  },
  moduleHeader: {
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  moduleTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subItem: {
    paddingLeft: 32,
    paddingVertical: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  logoutButton: {
    marginLeft: 10,
  },
  bottomDivider: {
    marginTop: 20,
  }
});

export default CustomDrawerContent;
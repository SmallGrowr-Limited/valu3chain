// app/components/RecentActivity.js
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Text, IconButton, Divider, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const RecentActivity = ({ data = [] }) => {
  const { colors } = useTheme();
  
  // Sample data if none provided
  const activityData = data.length > 0 ? data : [
    {
      id: 1,
      type: 'farmer',
      action: 'registration',
      user: 'John Doe',
      details: 'New farmer registered',
      time: '10 mins ago',
      icon: 'account-plus',
      color: colors.primary,
    },
    {
      id: 2,
      type: 'input',
      action: 'approval',
      user: 'Agent Smith',
      details: 'Seed request approved',
      time: '25 mins ago',
      icon: 'check-circle',
      color: colors.success,
    },
    {
      id: 3,
      type: 'audit',
      action: 'submission',
      user: 'Mary Johnson',
      details: 'Farm audit completed',
      time: '1 hour ago',
      icon: 'clipboard-check',
      color: colors.info,
    },
    {
      id: 4,
      type: 'order',
      action: 'placed',
      user: 'Agro Partners Ltd',
      details: 'New produce order',
      time: '2 hours ago',
      icon: 'cart',
      color: colors.warning,
    },
    {
      id: 5,
      type: 'price',
      action: 'update',
      user: 'System',
      details: 'Maize price updated',
      time: '5 hours ago',
      icon: 'chart-line',
      color: colors.secondary,
    },
  ];

  const getActionColor = (actionType) => {
    switch(actionType) {
      case 'approval': return colors.success;
      case 'registration': return colors.primary;
      case 'submission': return colors.info;
      case 'placed': return colors.warning;
      case 'update': return colors.secondary;
      default: return colors.text;
    }
  };

  return (
    <Card style={[styles.card, { backgroundColor: colors.surface }]}>
      <Card.Content>
        <View style={styles.header}>
          <Title style={[styles.title, { color: colors.text }]}>Recent Activity</Title>
          <IconButton 
            icon="refresh" 
            size={20} 
            onPress={() => console.log('Refresh activities')} 
          />
        </View>
        
        <Divider style={[styles.divider, { backgroundColor: colors.outline }]} />
        
        <ScrollView 
          style={styles.scrollContainer} 
          showsVerticalScrollIndicator={false}
        >
          {activityData.map((activity, index) => (
            <View key={activity.id}>
              <View style={styles.activityItem}>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons 
                    name={activity.icon} 
                    size={24} 
                    color={activity.color || getActionColor(activity.action)} 
                  />
                </View>
                
                <View style={styles.activityContent}>
                  <Text style={[styles.activityText, { color: colors.text }]}>
                    <Text style={{ fontWeight: 'bold' }}>{activity.user}</Text> {activity.details}
                  </Text>
                  <Text style={[styles.timeText, { color: colors.secondary }]}>
                    {activity.time}
                  </Text>
                </View>
              </View>
              
              {index < activityData.length - 1 && (
                <Divider style={[styles.itemDivider, { backgroundColor: colors.outline }]} />
              )}
            </View>
          ))}
        </ScrollView>
        
        <View style={styles.footer}>
          <Text 
            style={[styles.viewAll, { color: colors.primary }]}
            onPress={() => console.log('View all activities')}
          >
            View All Activities
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    marginBottom: 12,
    height: 1,
  },
  scrollContainer: {
    maxHeight: 300,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    lineHeight: 20,
  },
  timeText: {
    fontSize: 12,
    marginTop: 4,
  },
  itemDivider: {
    height: 1,
    marginLeft: 56,
  },
  footer: {
    marginTop: 8,
    alignItems: 'flex-end',
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default RecentActivity;
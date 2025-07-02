import { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from 'react-native';
import { Title, Card } from 'react-native-paper';
import KpiCard from '../../components/admin/KpiCard';
import LineChart from '../../components/admin/LineChart';
import BarChart from '../../components/admin/BarChart';
import RecentActivity from '../../components/admin/RecentActivity';
import activityData from '../../components/admin/data/testData';

export default function Dashboard() { 
    
  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Admin Dashboard</Title>
      
      {/* KPI Cards */}
      <View style={styles.kpiRow}>
        <KpiCard title="Total Farmers" value="2,458" icon="account-group" />
        <KpiCard title="Active Agents" value="42" icon="account-supervisor" />
        {/* <KpiCard title="Pending Orders" value="18" icon="cart" /> */}
      </View>

      {/* Charts */}
      <Card style={styles.chartCard}>
        <Card.Title title="Market Price Trends" />
        <Card.Content>
          {/* <LineChart  /> */}
        </Card.Content>
      </Card>

      <Card style={styles.chartCard}>
        <Card.Title title="Input Distribution" />
        <Card.Content>
          {/* <BarChart /> */}
        </Card.Content>
      </Card>

      {/* Recent Activity */}
      <RecentActivity data={activityData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { marginVertical: 16, fontSize: 24 },
  kpiRow: { flexDirection: 'row', justifyContent: 'space-between' },
  chartCard: { marginVertical: 8 }
});
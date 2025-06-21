// app/(tabs)/dashboard.tsx
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import StatsCard from "../../components/elements/StatsCard";
import FarmerCard  from "../../components/elements/FarmerCard";
import { useFarmers } from "../../components/hooks/useFarmers"; 
import { Link } from "expo-router";
import { styles } from "../../components/constants/styles";

export default function Dashboard() {
  const { farmers, pendingRequests } = useFarmers();

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Welcome Section */}
        <View style={styles.section}>
          <Text style={styles.title}>Welcome, Agent!</Text>
          <Text style={styles.subtitle}>Today's Overview</Text>
        </View>

        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          <StatsCard
            title="Farmers Registered"
            value={farmers.length.toString()}
            icon="users"
          />
          <StatsCard
            title="Pending Requests"
            value={pendingRequests.toString()}
            icon="bell"
          />
          <StatsCard title="Farm Visits Today" value="3" icon="map-pin" />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsRow}>
            <Link href="/farmer-onboarding/new" asChild>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>Register Farmer</Text>
              </TouchableOpacity>
            </Link>
            <Link href="/farm-verification/new" asChild>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>Verify Farm</Text>
              </TouchableOpacity>
            </Link>
          </View>
          <View style={styles.actionsRow}>
            <Link href="/service-requests" asChild>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>Service Requests</Text>
              </TouchableOpacity>
            </Link>
            <Link href="/input-distribution" asChild>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>Input Distribution</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Recent Farmers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Farmers</Text>
            <Link href="/farmers" asChild>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </Link>
          </View>
          {farmers.slice(0, 3).map((farmer) => (
            <FarmerCard key={farmer.id} farmer={farmer} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

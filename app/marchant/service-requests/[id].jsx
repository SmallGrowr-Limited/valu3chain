// app/(tabs)/services.tsx
import { View, Text, ScrollView } from "react-native";
import { ServiceRequestCard } from "../../../components/elements/ServiceRequestCard";
import { useFarmers } from "../../../components/hooks/useFarmers";
import { styles } from "../../../components/constants/styles";

export default function ServicesScreen() {
  const { serviceRequests } = useFarmers();

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Service Requests</Text>

        {serviceRequests.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No pending service requests</Text>
          </View>
        ) : (
          serviceRequests.map((request) => (
            <ServiceRequestCard key={request.id} request={request} />
          ))
        )}
      </ScrollView>
    </View>
  );
}

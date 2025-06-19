import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

export default function InvestmentCard({ data, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.category}>{data.category}</Text>
        <Text style={styles.amount}>₦{data.amount.toLocaleString()}</Text>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Location:</Text>
          <Text style={styles.detailValue}>{data.location}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Farmers:</Text>
          <Text style={styles.detailValue}>{data.farmers}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Gender Ratio:</Text>
          <Text style={styles.detailValue}>
            {Math.round(data.genderRatio.male * 100)}% Male,{" "}
            {Math.round(data.genderRatio.female * 100)}% Female
          </Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.status}>{data.status}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primaryText,
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
  },
  cardBody: {
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  detailLabel: {
    fontWeight: "bold",
    marginRight: 8,
    color: Colors.secondaryText,
    width: 100,
  },
  detailValue: {
    flex: 1,
    color: Colors.primaryText,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  status: {
    color: Colors.success,
    fontWeight: "bold",
  },
});

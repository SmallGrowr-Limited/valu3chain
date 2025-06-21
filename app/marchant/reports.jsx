// app/(tabs)/reports.tsx
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { styles } from "../../components/constants/styles";
import { useState } from "react";

export default function ReportsScreen() {
  const [marketPrices, setMarketPrices] = useState([
    { commodity: "Maize", price: "" },
    { commodity: "Beans", price: "" },
    { commodity: "Wheat", price: "" },
  ]);

  const [report, setReport] = useState({
    securityStatus: "",
    challenges: "",
    soilTestResults: "",
  });

  const handlePriceChange = (text, index) => {
    const newPrices = [...marketPrices];
    newPrices[index].price = text;
    setMarketPrices(newPrices);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Field Reporting</Text>

      {/* Market Prices Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Market Prices</Text>
        {marketPrices.map((item, index) => (
          <View key={item.commodity} style={styles.formGroup}>
            <Text style={styles.label}>{item.commodity} (KES/kg)</Text>
            <TextInput
              style={styles.input}
              value={item.price}
              onChangeText={(text) => handlePriceChange(text, index)}
              keyboardType="numeric"
              placeholder={`Enter current ${item.commodity} price`}
            />
          </View>
        ))}
      </View>

      {/* General Updates Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General Updates</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Security Status</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={report.securityStatus}
            onChangeText={(text) =>
              setReport({ ...report, securityStatus: text })
            }
            placeholder="Describe current security situation"
            multiline
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Challenges</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={report.challenges}
            onChangeText={(text) => setReport({ ...report, challenges: text })}
            placeholder="List any challenges faced by farmers"
            multiline
          />
        </View>
      </View>

      {/* Soil Test Results */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Soil Test Results</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={report.soilTestResults}
          onChangeText={(text) =>
            setReport({ ...report, soilTestResults: text })
          }
          placeholder="Record soil test results"
          multiline
        />
      </View>

      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.buttonText}>Submit Report</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

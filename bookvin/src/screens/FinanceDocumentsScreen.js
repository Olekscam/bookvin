import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';

const FinanceDocumentsScreen = ({ navigation }) => {
  // Mock data
  const expenseSummary = {
    total: 1250.75,
    costPerKm: 0.15,
    categories: [
      { name: 'Fuel', amount: 800.50 },
      { name: 'Service', amount: 350.25 },
      { name: 'Other', amount: 100.00 },
    ],
  };

  const documents = [
    { id: '1', type: 'Technical Passport' },
    { id: '2', type: 'Insurance' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Finance & Documents</Text>

      {/* Expense Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Expense Summary</Text>
        <Text style={styles.summaryText}>Total Spent: ${expenseSummary.total.toFixed(2)}</Text>
        <Text style={styles.summaryText}>Cost per 1km: ${expenseSummary.costPerKm.toFixed(2)}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Scan Receipt" onPress={() => { /* TODO: Implement Scanning */ }} />
          <Button title="Add Manually" onPress={() => navigation.navigate('AddExpense')} />
        </View>
      </View>

      {/* Document Storage */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Document Storage</Text>
        {documents.map(doc => (
          <Text key={doc.id} style={styles.documentItem}>{doc.type}</Text>
        ))}
        <Button title="Add New Document" onPress={() => navigation.navigate('AddDocument')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  summaryText: {
    fontSize: 18,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  documentItem: {
    fontSize: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
});

export default FinanceDocumentsScreen;

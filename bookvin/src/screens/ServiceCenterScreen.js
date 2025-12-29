import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';

const ServiceCenterScreen = ({ navigation }) => {
  // Mock data
  const car = {
    name: 'Volkswagen Passat B8',
    vin: 'WVWZZZ3CZHE000001',
    mileage: 150000,
    photoUrl: 'https://via.placeholder.com/150',
    healthIndex: 85,
  };

  const recentEvents = [
    { id: '1', date: '2024-07-15', description: 'Oil Change', cost: 100 },
    { id: '2', date: '2024-06-20', description: 'Brake Pad Replacement', cost: 350 },
    { id: '3', date: '2024-05-10', description: 'Tire Rotation', cost: 50 },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.carName}>{car.name}</Text>
        <Text>VIN: {car.vin} | Mileage: {car.mileage}km</Text>
      </View>
      
      {/* Car Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusTitle}>Car Health</Text>
        <Text style={styles.statusIndex}>{car.healthIndex}%</Text>
        <Text style={styles.statusDescription}>
          This index reflects the overall condition of your car and impacts its market value.
        </Text>
      </View>

      {/* AI Diagnostics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Diagnostics</Text>
        <Text>No active recommendations.</Text>
        <Button title="Ask AI Mechanic" onPress={() => { /* TODO: Navigate to AI Chat */ }} />
      </View>

      {/* Records */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Records</Text>
        <Text>Next service: Scheduled in 5,000 km</Text>
        <Button title="View Service Schedule" onPress={() => { /* TODO: Navigate to Schedule */ }} />
      </View>

      {/* Service History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Service History</Text>
        {recentEvents.map(event => (
          <View key={event.id} style={styles.historyItem}>
            <Text>{event.date}: {event.description} - ${event.cost}</Text>
          </View>
        ))}
        <Button title="View Full History" onPress={() => { /* TODO: Navigate to Full History */ }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  carName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  statusContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statusIndex: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#007BFF',
  },
  statusDescription: {
    textAlign: 'center',
    color: 'gray',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyItem: {
    paddingVertical: 5,
  }
});

export default ServiceCenterScreen;

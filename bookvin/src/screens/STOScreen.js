import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, SafeAreaView } from 'react-native';

// Mock data for service stations
const serviceStations = [
  { id: '1', name: 'AutoCare Center', rating: 4.5, address: '123 Main St' },
  { id: '2', name: 'Speedy Auto Repair', rating: 4.8, address: '456 Oak Ave' },
  { id: '3', name: 'Trusty Mechanic', rating: 4.2, address: '789 Pine Ln' },
];

const STOScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Map Placeholder */}
      <View style={styles.mapPlaceholder}>
        <Text>Map View Here</Text>
      </View>
      
      <FlatList
        data={serviceStations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.stationItem}>
            <View>
              <Text style={styles.stationName}>{item.name}</Text>
              <Text>Rating: {item.rating} ★</Text>
              <Text>{item.address}</Text>
            </View>
            <Button title="Get Proposal" onPress={() => { /* TODO: Implement proposal logic */ }} />
          </View>
        )}
        ListHeaderComponent={<Text style={styles.title}>Service Stations</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapPlaceholder: {
    height: 300,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    padding: 20,
  },
  stationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  stationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default STOScreen;

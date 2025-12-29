import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import CarCard from '../components/CarCard';

const MyGarageScreen = ({ navigation }) => {
  // Mock data for now
  const cars = [
    { id: '1', name: 'Volkswagen Passat B8', vin: 'WVWZZZ3CZHE000001', mileage: 150000, photoUrl: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Audi A4', vin: 'WAUZZZ8K4HE000002', mileage: 95000, photoUrl: 'https://via.placeholder.com/150' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CarCard car={item} onPress={() => navigation.navigate('CarInfo', { car: item })} />}
        ListHeaderComponent={<Text style={styles.title}>My Garage</Text>}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Add a New Car"
          onPress={() => navigation.navigate('AddCar')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  buttonContainer: {
    paddingBottom: 20,
    gap: 10
  }
});

export default MyGarageScreen;

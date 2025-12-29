import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';

const CarInfoScreen = ({ route }) => {
  const { car } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={{ uri: car.photoUrl || 'https://via.placeholder.com/400' }} style={styles.carImage} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{car.name}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailItem}>VIN: {car.vin}</Text>
            <Text style={styles.detailItem}>Year: {car.year || 'N/A'}</Text>
            <Text style={styles.detailItem}>Engine Volume: {car.engineVolume || 'N/A'}</Text>
            <Text style={styles.detailItem}>Engine Type: {car.engineType || 'N/A'}</Text>
            <Text style={styles.detailItem}>Transmission: {car.transmission || 'N/A'}</Text>
            <Text style={styles.detailItem}>License Plate: {car.licensePlate || 'N/A'}</Text>
            <Text style={styles.detailItem}>Current Mileage: {car.mileage} km</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  carImage: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailsContainer: {
    marginTop: 10,
  },
  detailItem: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
});

export default CarInfoScreen;

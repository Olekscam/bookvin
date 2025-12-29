import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const CarCard = ({ car, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.detailsContainer}>
        <Text style={styles.carName}>{car.name}</Text>
        <Text>VIN: {car.vin}</Text>
        <Text>Mileage: {car.mileage} km</Text>
      </View>
      <Image source={{ uri: car.photoUrl || 'https://via.placeholder.com/100' }} style={styles.carImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  detailsContainer: {
    flex: 1,
  },
  carName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  carImage: {
    width: 100,
    height: 80,
    borderRadius: 5,
    marginLeft: 10,
  },
});

export default CarCard;

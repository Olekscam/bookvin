import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const AddCarScreen = ({ navigation }) => {
  const [carDetails, setCarDetails] = useState({
    make: '',
    model: '',
    vin: '',
    year: '',
    engineVolume: '',
    engineType: '',
    engineCode: '',
    transmission: '',
    licensePlate: '',
    mileage: '',
    lastServiceMileage: '',
    lastServiceDate: '',
    usageType: 'Mixed',
  });

  const handleInputChange = (field, value) => {
    setCarDetails({ ...carDetails, [field]: value });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Car</Text>
      
      {/* TODO: Implement Photo Upload */}
      
      <TextInput style={styles.input} placeholder="Make" onChangeText={(value) => handleInputChange('make', value)} />
      <TextInput style={styles.input} placeholder="Model" onChangeText={(value) => handleInputChange('model', value)} />
      <TextInput style={styles.input} placeholder="VIN (17 characters)" maxLength={17} onChangeText={(value) => handleInputChange('vin', value)} />
      <TextInput style={styles.input} placeholder="Year" keyboardType="numeric" onChangeText={(value) => handleInputChange('year', value)} />
      <TextInput style={styles.input} placeholder="Engine Volume (L)" keyboardType="decimal-pad" onChangeText={(value) => handleInputChange('engineVolume', value)} />
      
      {/* TODO: Implement Dropdowns for Engine Type, Transmission, Usage Type */}
      
      <TextInput style={styles.input} placeholder="Engine Type" onChangeText={(value) => handleInputChange('engineType', value)} />
      <TextInput style={styles.input} placeholder="Engine Code" onChangeText={(value) => handleInputChange('engineCode', value)} />
      <TextInput style={styles.input} placeholder="Transmission" onChangeText={(value) => handleInputChange('transmission', value)} />
      <TextInput style={styles.input} placeholder="License Plate Number" onChangeText={(value) => handleInputChange('licensePlate', value)} />
      <TextInput style={styles.input} placeholder="Current Mileage (km)" keyboardType="numeric" onChangeText={(value) => handleInputChange('mileage', value)} />
      <TextInput style={styles.input} placeholder="Mileage at last service" keyboardType="numeric" onChangeText={(value) => handleInputChange('lastServiceMileage', value)} />
      
      {/* TODO: Implement Date Picker */}
      
      <TextInput style={styles.input} placeholder="Date of last service" onChangeText={(value) => handleInputChange('lastServiceDate', value)} />

      <Button title="Add and Verify" onPress={() => { /* TODO: Add car logic */ navigation.goBack(); }} />
      <Button title="Cancel" onPress={() => navigation.goBack()} color="red" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddCarScreen;

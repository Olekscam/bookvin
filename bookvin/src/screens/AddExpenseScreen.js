import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const AddExpenseScreen = ({ navigation }) => {
  const [expenseData, setExpenseData] = useState({
    category: '',
    amount: '',
    date: '',
    mileage: '',
    description: '',
  });

  const handleInputChange = (field, value) => {
    setExpenseData({ ...expenseData, [field]: value });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Expense</Text>
      
      {/* TODO: Implement Category Picker */}
      <TextInput style={styles.input} placeholder="Category (e.g., Fuel, Service)" onChangeText={(value) => handleInputChange('category', value)} />
      
      <TextInput style={styles.input} placeholder="Amount" keyboardType="decimal-pad" onChangeText={(value) => handleInputChange('amount', value)} />
      <TextInput style={styles.input} placeholder="Date" onChangeText={(value) => handleInputChange('date', value)} />
      <TextInput style={styles.input} placeholder="Mileage" keyboardType="numeric" onChangeText={(value) => handleInputChange('mileage', value)} />
      <TextInput style={styles.input} placeholder="Description" onChangeText={(value) => handleInputChange('description', value)} multiline />
      
      {/* TODO: Implement Photo Upload for receipt */}
      
      <Button title="Save" onPress={() => { /* TODO: Implement Save Logic */ navigation.goBack(); }} />
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

export default AddExpenseScreen;

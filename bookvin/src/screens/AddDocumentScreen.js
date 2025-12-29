import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const AddDocumentScreen = ({ navigation }) => {
  const [documentData, setDocumentData] = useState({
    type: '',
    photo: '',
    number: '',
    issueDate: '',
    expiryDate: '',
    description: '',
    owner: '',
  });

  const handleInputChange = (field, value) => {
    setDocumentData({ ...documentData, [field]: value });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add Document</Text>
      
      {/* TODO: Implement Document Type Picker */}
      <TextInput style={styles.input} placeholder="Document Type" onChangeText={(value) => handleInputChange('type', value)} />
      
      {/* TODO: Implement Photo/File Upload */}
      
      <TextInput style={styles.input} placeholder="Number" onChangeText={(value) => handleInputChange('number', value)} />
      <TextInput style={styles.input} placeholder="Date of Issue" onChangeText={(value) => handleInputChange('issueDate', value)} />
      <TextInput style={styles.input} placeholder="Date of Expiry" onChangeText={(value) => handleInputChange('expiryDate', value)} />
      <TextInput style={styles.input} placeholder="Description" onChangeText={(value) => handleInputChange('description', value)} multiline />
      <TextInput style={styles.input} placeholder="Owner" onChangeText={(value) => handleInputChange('owner', value)} />

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

export default AddDocumentScreen;

import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.info}>{user.name}</Text>
        
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{user.email}</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title="My Garage"
          onPress={() => navigation.navigate('MyGarage')}
        />
        <Button
          title="Edit Profile"
          onPress={() => { /* TODO: Navigate to Edit Profile Screen */ }}
        />
        <Button
          title="Logout"
          onPress={() => navigation.navigate('Login')}
          color="red"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  infoContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    color: 'gray',
  },
  info: {
    fontSize: 22,
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10
  },
});

export default ProfileScreen;

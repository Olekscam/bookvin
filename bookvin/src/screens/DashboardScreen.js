import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>Your car has been added successfully.</Text>
      <Text style={styles.description}>
        To get personalized recommendations and a service history, 
        you need to activate the AI-Mechanic.
      </Text>
      <Button
        title="Activate AI-Mechanic"
        onPress={() => navigation.navigate('Checklist1')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
});

export default DashboardScreen;

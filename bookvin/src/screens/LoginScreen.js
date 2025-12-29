import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>bookvin</Text>
      <Text style={styles.subtitle}>Welcome! Please sign in.</Text>
      {/* Mock login buttons */}
      <Button
        title="Sign in with Google"
        onPress={() => navigation.replace('Main')} 
      />
      <Button
        title="Sign in with Apple"
        onPress={() => navigation.replace('Main')}
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
    gap: 10
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: 'gray',
  },
});

export default LoginScreen;

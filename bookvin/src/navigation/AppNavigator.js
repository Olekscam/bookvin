import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Navigators
import MainTabNavigator from './MainTabNavigator';

// Screens
import LoginScreen from '../screens/LoginScreen';
import MyGarageScreen from '../screens/MyGarageScreen';
import AddCarScreen from '../screens/AddCarScreen';
import CarInfoScreen from '../screens/CarInfoScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Checklist1Screen from '../screens/Checklist1Screen';
import Checklist2Screen from '../screens/Checklist2Screen';
import Checklist3Screen from '../screens/Checklist3Screen';
import Checklist4Screen from '../screens/Checklist4Screen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import AddDocumentScreen from '../screens/AddDocumentScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Screens outside the main tab navigator */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MyGarage" component={MyGarageScreen} />
        <Stack.Screen name="AddCar" component={AddCarScreen} />
        <Stack.Screen name="CarInfo" component={CarInfoScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Checklist1" component={Checklist1Screen} />
        <Stack.Screen name="Checklist2" component={Checklist2Screen} />
        <Stack.Screen name="Checklist3" component={Checklist3Screen} />
        <Stack.Screen name="Checklist4" component={Checklist4Screen} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
        <Stack.Screen name="AddDocument" component={AddDocumentScreen} />

        {/* Main Tab Navigator */}
        <Stack.Screen 
          name="Main" 
          component={MainTabNavigator} 
          options={{ headerShown: false }} // The tabs will have their own headers if needed
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

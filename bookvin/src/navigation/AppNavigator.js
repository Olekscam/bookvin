import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabNavigator from './MainTabNavigator';
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
  const isLoggedIn = useSelector(state => state.auth?.isLoggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="MyGarage" component={MyGarageScreen} options={{ title: 'My Garage' }} />
            <Stack.Screen name="AddCar" component={AddCarScreen} options={{ title: 'Add Car' }} />
            <Stack.Screen name="EditCar" component={AddCarScreen} options={{ title: 'Edit Car' }} />
            <Stack.Screen name="CarInfo" component={CarInfoScreen} options={{ title: 'Car Details' }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
            <Stack.Screen name="Checklist1" component={Checklist1Screen} options={{ title: 'Step 1 of 4' }} />
            <Stack.Screen name="Checklist2" component={Checklist2Screen} options={{ title: 'Step 2 of 4' }} />
            <Stack.Screen name="Checklist3" component={Checklist3Screen} options={{ title: 'Step 3 of 4' }} />
            <Stack.Screen name="Checklist4" component={Checklist4Screen} options={{ title: 'Step 4 of 4' }} />
            <Stack.Screen name="AddExpense" component={AddExpenseScreen} options={{ title: 'Add Expense' }} />
            <Stack.Screen name="AddDocument" component={AddDocumentScreen} options={{ title: 'Add Document' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

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
import AddExpenseScreen from '../screens/AddExpenseScreen';
import AddDocumentScreen from '../screens/AddDocumentScreen';

// AI Mechanic flow
import AiMechanicStep1Screen from '../screens/AiMechanicStep1Screen';
import AiMechanicLoadingScreen from '../screens/AiMechanicLoadingScreen';
import AiMechanicStep2Screen from '../screens/AiMechanicStep2Screen';
import AiMechanicPlanScreen from '../screens/AiMechanicPlanScreen';

const Stack = createNativeStackNavigator();

const DARK_HEADER = {
  headerStyle: { backgroundColor: '#0D0D1A' },
  headerTintColor: '#FFFFFF',
  headerTitleStyle: { fontWeight: '600' },
};

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
            <Stack.Screen name="AddExpense" component={AddExpenseScreen} options={{ title: 'Add Expense' }} />
            <Stack.Screen name="AddDocument" component={AddDocumentScreen} options={{ title: 'Add Document' }} />

            {/* AI Mechanic activation flow */}
            <Stack.Screen
              name="AiMechanicStep1"
              component={AiMechanicStep1Screen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AiMechanicLoading1"
              component={AiMechanicLoadingScreen}
              options={{ headerShown: false }}
              initialParams={{
                title: 'Активація AI-Механіка',
                headline: 'Попереднє ТО: AI-механік вивчає офіційний регламент обслуговування для вашого автомобіля.',
                hint: 'Це може тривати до 30 секунд.',
                nextRoute: 'AiMechanicStep2',
                delayMs: 2500,
              }}
            />
            <Stack.Screen
              name="AiMechanicStep2"
              component={AiMechanicStep2Screen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AiMechanicLoading2"
              component={AiMechanicLoadingScreen}
              options={{ headerShown: false }}
              initialParams={{
                title: 'Новий план ТО',
                headline: 'Ваш персональний план ТО формується. Він включає пропущені роботи та регламент.',
                hint: 'Будь ласка, зачекайте.',
                nextRoute: 'AiMechanicPlan',
                delayMs: 2000,
              }}
            />
            <Stack.Screen
              name="AiMechanicPlan"
              component={AiMechanicPlanScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

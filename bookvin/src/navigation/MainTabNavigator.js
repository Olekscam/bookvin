import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import ServiceCenterScreen from '../screens/ServiceCenterScreen';
import FinanceDocumentsScreen from '../screens/FinanceDocumentsScreen';
import STOScreen from '../screens/STOScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Service" component={ServiceCenterScreen} />
      <Tab.Screen name="Expenses" component={FinanceDocumentsScreen} />
      <Tab.Screen name="Map" component={STOScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;

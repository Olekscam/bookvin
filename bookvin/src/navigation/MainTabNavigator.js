import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from '../screens/DashboardScreen';
import ServiceCenterScreen from '../screens/ServiceCenterScreen';
import FinanceDocumentsScreen from '../screens/FinanceDocumentsScreen';
import STOScreen from '../screens/STOScreen';

const Tab = createBottomTabNavigator();

const ICONS = {
  Home: ['home', 'home-outline'],
  Service: ['construct', 'construct-outline'],
  Expenses: ['wallet', 'wallet-outline'],
  Map: ['map', 'map-outline'],
};

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ focused, color, size }) => {
          const [active, inactive] = ICONS[route.name] || ['ellipse', 'ellipse-outline'];
          return <Ionicons name={focused ? active : inactive} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8e8e93',
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} options={{ title: 'Dashboard' }} />
      <Tab.Screen name="Service" component={ServiceCenterScreen} options={{ title: 'Service' }} />
      <Tab.Screen name="Expenses" component={FinanceDocumentsScreen} options={{ title: 'Finance' }} />
      <Tab.Screen name="Map" component={STOScreen} options={{ title: 'Map' }} />
    </Tab.Navigator>
  );
}

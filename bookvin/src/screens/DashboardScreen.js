import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

export default function DashboardScreen({ navigation }) {
  const user = useSelector(state => state.auth.user);
  const cars = useSelector(state => state.cars.list);
  const expenses = useSelector(state => state.expenses.list);
  const aiPlan = useSelector(state => state.aiMechanic?.plan);

  const recentExpenses = expenses.slice(0, 3);
  const totalSpent = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      <Text style={styles.greeting}>Hello, {user?.name?.split(' ')[0] || 'there'} 👋</Text>
      <Text style={styles.subtitle}>Welcome to Bookvin</Text>

      {/* Quick stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNum}>{cars.length}</Text>
          <Text style={styles.statLabel}>Cars</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNum}>{expenses.length}</Text>
          <Text style={styles.statLabel}>Expenses</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNum}>${totalSpent.toFixed(0)}</Text>
          <Text style={styles.statLabel}>Spent</Text>
        </View>
      </View>

      {/* Cars */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Garage</Text>
          <TouchableOpacity onPress={() => navigation.navigate('MyGarage')}>
            <Text style={styles.seeAll}>See all ›</Text>
          </TouchableOpacity>
        </View>
        {cars.length === 0 ? (
          <TouchableOpacity style={styles.emptyCard} onPress={() => navigation.navigate('MyGarage')}>
            <Text style={styles.emptyCardIcon}>🚗</Text>
            <Text style={styles.emptyCardText}>Add your first car</Text>
          </TouchableOpacity>
        ) : (
          cars.slice(0, 2).map(car => (
            <TouchableOpacity
              key={car.id}
              style={styles.carRow}
              onPress={() => navigation.navigate('CarInfo', { carId: car.id })}
            >
              <Text style={styles.carRowIcon}>🚗</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.carRowName}>{car.name}</Text>
                <Text style={styles.carRowMileage}>{car.mileage?.toLocaleString()} km • {car.year}</Text>
              </View>
              <Text style={styles.carRowArrow}>›</Text>
            </TouchableOpacity>
          ))
        )}
      </View>

      {/* Recent expenses */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Expenses</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Expenses')}>
            <Text style={styles.seeAll}>See all ›</Text>
          </TouchableOpacity>
        </View>
        {recentExpenses.length === 0 ? (
          <TouchableOpacity style={styles.emptyCard} onPress={() => navigation.navigate('AddExpense')}>
            <Text style={styles.emptyCardIcon}>💰</Text>
            <Text style={styles.emptyCardText}>Log your first expense</Text>
          </TouchableOpacity>
        ) : (
          recentExpenses.map(exp => (
            <View key={exp.id} style={styles.expRow}>
              <Text style={styles.expCategory}>{exp.category}</Text>
              <Text style={styles.expDate}>{exp.date}</Text>
              <Text style={styles.expAmount}>${exp.amount?.toFixed(2)}</Text>
            </View>
          ))
        )}
      </View>

      {/* AI Mechanic CTA */}
      {aiPlan ? (
        <TouchableOpacity
          style={styles.aiCard}
          onPress={() => navigation.navigate('AiMechanicPlan')}
        >
          <Text style={styles.aiCardTitle}>🤖 AI-Механік</Text>
          <Text style={styles.aiCardDesc}>Ваш план ТО сформовано</Text>
          <Text style={styles.aiCardCta}>Переглянути план ТО →</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.aiCard}
          onPress={() => navigation.navigate('AiMechanicStep1')}
        >
          <Text style={styles.aiCardTitle}>🤖 AI-Механік</Text>
          <Text style={styles.aiCardDesc}>Пройдіть діагностику для отримання персонального плану ТО</Text>
          <Text style={styles.aiCardCta}>Активувати →</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  greeting: { fontSize: 28, fontWeight: 'bold', color: '#222' },
  subtitle: { fontSize: 15, color: '#888', marginBottom: 20 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  statCard: {
    flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 14, alignItems: 'center',
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4,
  },
  statNum: { fontSize: 22, fontWeight: '700', color: '#007AFF' },
  statLabel: { fontSize: 12, color: '#888', marginTop: 2 },
  section: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 14,
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4,
  },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#222' },
  seeAll: { color: '#007AFF', fontSize: 14 },
  emptyCard: { alignItems: 'center', paddingVertical: 20 },
  emptyCardIcon: { fontSize: 32, marginBottom: 8 },
  emptyCardText: { color: '#007AFF', fontSize: 15, fontWeight: '600' },
  carRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  carRowIcon: { fontSize: 22, marginRight: 10 },
  carRowName: { fontSize: 15, fontWeight: '600', color: '#222' },
  carRowMileage: { fontSize: 12, color: '#888', marginTop: 2 },
  carRowArrow: { fontSize: 22, color: '#ccc' },
  expRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f5f5f5' },
  expCategory: { flex: 1, fontSize: 14, fontWeight: '600', color: '#333' },
  expDate: { fontSize: 12, color: '#999', marginRight: 12 },
  expAmount: { fontSize: 14, fontWeight: '700', color: '#333' },
  aiCard: {
    backgroundColor: '#1a1a2e', borderRadius: 16, padding: 20,
  },
  aiCardTitle: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 6 },
  aiCardDesc: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 12 },
  aiCardCta: { color: '#7EB8FF', fontWeight: '600', fontSize: 14 },
});

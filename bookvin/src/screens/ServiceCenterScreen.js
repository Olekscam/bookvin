import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

function HealthBar({ value }) {
  const color = value >= 75 ? '#34D399' : value >= 50 ? '#FBBF24' : '#EF4444';
  return (
    <View style={styles.healthBarContainer}>
      <View style={[styles.healthBarFill, { width: `${value}%`, backgroundColor: color }]} />
    </View>
  );
}

export default function ServiceCenterScreen({ navigation }) {
  const cars = useSelector(state => state.cars.list);
  const expenses = useSelector(state => state.expenses.list);

  const serviceExpenses = expenses.filter(e => e.category === 'Service' || e.category === 'Repair');

  const selectedCar = cars.length > 0 ? cars[0] : null;

  const kmSinceService = selectedCar && selectedCar.mileage && selectedCar.lastServiceMileage
    ? selectedCar.mileage - Number(selectedCar.lastServiceMileage)
    : null;

  const healthIndex = kmSinceService !== null
    ? Math.max(0, Math.min(100, Math.round(100 - (kmSinceService / 150))))
    : 85;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      <Text style={styles.title}>Service Center</Text>

      {!selectedCar ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No cars in your garage.</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('MyGarage')}>
            <Text style={styles.addBtnText}>Go to My Garage</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Car selector */}
          <TouchableOpacity style={styles.carCard} onPress={() => navigation.navigate('MyGarage')}>
            <Text style={styles.carCardIcon}>🚗</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.carCardName}>{selectedCar.name}</Text>
              <Text style={styles.carCardMileage}>{selectedCar.mileage?.toLocaleString()} km</Text>
            </View>
            <Text style={styles.carCardArrow}>›</Text>
          </TouchableOpacity>

          {/* Health */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Car Health</Text>
            <Text style={styles.healthValue}>{healthIndex}%</Text>
            <HealthBar value={healthIndex} />
            <Text style={styles.healthDesc}>
              {healthIndex >= 75
                ? 'Your car is in good condition.'
                : healthIndex >= 50
                ? 'Consider scheduling a service soon.'
                : 'Service is overdue. Please visit a mechanic.'}
            </Text>
          </View>

          {/* Next service */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Service Status</Text>
            {kmSinceService !== null ? (
              <>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Since last service</Text>
                  <Text style={styles.statValue}>{kmSinceService.toLocaleString()} km</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Last service date</Text>
                  <Text style={styles.statValue}>{selectedCar.lastServiceDate || '—'}</Text>
                </View>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Next service at</Text>
                  <Text style={styles.statValue}>
                    {(Number(selectedCar.lastServiceMileage || 0) + 10000).toLocaleString()} km
                  </Text>
                </View>
              </>
            ) : (
              <Text style={styles.noData}>Add last service info in car details.</Text>
            )}
          </View>

          {/* Service history from expenses */}
          <View style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.sectionTitle}>Service History</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Expenses')}>
                <Text style={styles.linkText}>View all</Text>
              </TouchableOpacity>
            </View>
            {serviceExpenses.length === 0 ? (
              <Text style={styles.noData}>No service records yet.</Text>
            ) : (
              serviceExpenses.slice(0, 5).map(exp => (
                <View key={exp.id} style={styles.historyRow}>
                  <View>
                    <Text style={styles.historyDesc}>{exp.description || exp.category}</Text>
                    <Text style={styles.historyDate}>{exp.date}</Text>
                  </View>
                  <Text style={styles.historyCost}>${exp.amount?.toFixed(2)}</Text>
                </View>
              ))
            )}
            <TouchableOpacity
              style={styles.addServiceBtn}
              onPress={() => navigation.navigate('AddExpense')}
            >
              <Text style={styles.addServiceBtnText}>+ Add Service Record</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  empty: { alignItems: 'center', marginTop: 60 },
  emptyText: { fontSize: 16, color: '#666', marginBottom: 16 },
  addBtn: { backgroundColor: '#007AFF', borderRadius: 8, paddingHorizontal: 20, paddingVertical: 12 },
  addBtnText: { color: '#fff', fontWeight: '600' },
  carCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 12,
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4,
  },
  carCardIcon: { fontSize: 28, marginRight: 12 },
  carCardName: { fontSize: 16, fontWeight: '700', color: '#222' },
  carCardMileage: { fontSize: 13, color: '#888', marginTop: 2 },
  carCardArrow: { fontSize: 24, color: '#ccc' },
  card: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12,
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 12 },
  healthValue: { fontSize: 48, fontWeight: 'bold', color: '#007AFF', textAlign: 'center', marginBottom: 8 },
  healthBarContainer: { height: 12, backgroundColor: '#eee', borderRadius: 6, overflow: 'hidden', marginBottom: 8 },
  healthBarFill: { height: '100%', borderRadius: 6 },
  healthDesc: { fontSize: 14, color: '#666', textAlign: 'center', marginTop: 4 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  statLabel: { fontSize: 14, color: '#666' },
  statValue: { fontSize: 14, fontWeight: '600', color: '#222' },
  noData: { fontSize: 14, color: '#999', fontStyle: 'italic' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  linkText: { color: '#007AFF', fontSize: 14 },
  historyRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f5f5f5',
  },
  historyDesc: { fontSize: 14, fontWeight: '600', color: '#333' },
  historyDate: { fontSize: 12, color: '#999', marginTop: 2 },
  historyCost: { fontSize: 15, fontWeight: '700', color: '#333' },
  addServiceBtn: { marginTop: 12, alignItems: 'center' },
  addServiceBtnText: { color: '#007AFF', fontSize: 14, fontWeight: '600' },
});

import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import CarCard from '../components/CarCard';

export default function MyGarageScreen({ navigation }) {
  const cars = useSelector(state => state.cars.list);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cars}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CarCard car={item} onPress={() => navigation.navigate('CarInfo', { carId: item.id })} />
        )}
        ListHeaderComponent={<Text style={styles.title}>My Garage</Text>}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No cars yet.</Text>
            <Text style={styles.emptyHint}>Add your first car below.</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <View style={styles.fab}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddCar')}>
          <Text style={styles.addButtonText}>+ Add a New Car</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  title: { fontSize: 32, fontWeight: 'bold', marginVertical: 20, paddingHorizontal: 20 },
  empty: { alignItems: 'center', marginTop: 60 },
  emptyText: { fontSize: 18, color: '#555', fontWeight: '600' },
  emptyHint: { fontSize: 14, color: '#999', marginTop: 4 },
  fab: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: '#f5f5f5', borderTopWidth: 1, borderTopColor: '#eee' },
  addButton: { backgroundColor: '#007AFF', borderRadius: 8, paddingVertical: 14, alignItems: 'center' },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

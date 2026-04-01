import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCar } from '../store/slices/carsSlice';

const DetailRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value || '—'}</Text>
  </View>
);

export default function CarInfoScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const carId = route.params?.carId;
  const car = useSelector(state => state.cars.list.find(c => c.id === carId));

  if (!car) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ padding: 20, color: '#666' }}>Car not found.</Text>
      </SafeAreaView>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Car',
      `Remove ${car.name} from your garage?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', style: 'destructive',
          onPress: () => {
            dispatch(deleteCar(car.id));
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <View style={styles.header}>
          <View style={styles.carIcon}>
            <Text style={styles.carIconText}>🚗</Text>
          </View>
          <Text style={styles.title}>{car.name}</Text>
          {car.licensePlate ? <Text style={styles.plate}>{car.licensePlate}</Text> : null}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Basic Info</Text>
          <DetailRow label="Make" value={car.make} />
          <DetailRow label="Model" value={car.model} />
          <DetailRow label="Year" value={car.year} />
          <DetailRow label="VIN" value={car.vin} />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Engine & Drivetrain</Text>
          <DetailRow label="Engine Volume" value={car.engineVolume ? `${car.engineVolume} L` : null} />
          <DetailRow label="Engine Type" value={car.engineType} />
          <DetailRow label="Engine Code" value={car.engineCode} />
          <DetailRow label="Transmission" value={car.transmission} />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Service</Text>
          <DetailRow label="Current Mileage" value={car.mileage ? `${car.mileage.toLocaleString()} km` : null} />
          <DetailRow label="Last Service" value={car.lastServiceDate} />
          <DetailRow label="Mileage at Last Service" value={car.lastServiceMileage ? `${Number(car.lastServiceMileage).toLocaleString()} km` : null} />
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditCar', { carId: car.id })}
        >
          <Text style={styles.editButtonText}>Edit Car</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Delete Car</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { alignItems: 'center', marginBottom: 24 },
  carIcon: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#e8f0fe', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  carIconText: { fontSize: 36 },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center' },
  plate: {
    marginTop: 6, paddingHorizontal: 16, paddingVertical: 4,
    backgroundColor: '#333', borderRadius: 4,
    color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 2,
  },
  card: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16,
    marginBottom: 12, elevation: 1,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4,
  },
  sectionTitle: { fontSize: 13, fontWeight: '700', color: '#888', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  rowLabel: { fontSize: 15, color: '#555' },
  rowValue: { fontSize: 15, fontWeight: '600', color: '#222', maxWidth: '60%', textAlign: 'right' },
  editButton: { backgroundColor: '#007AFF', borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  editButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  deleteButton: { borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginTop: 8 },
  deleteButtonText: { color: '#e53e3e', fontSize: 16 },
});

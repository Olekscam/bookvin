import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setPriorWork } from '../store/slices/aiMechanicSlice';

const PARTS_ITEMS = [
  { id: 'oil', name: 'Моторна олива', scheduleKm: 10000 },
  { id: 'oil_filter', name: 'Фільтр моторної оливи', scheduleKm: 10000 },
  { id: 'air_filter', name: 'Повітряний фільтр', scheduleKm: 20000 },
  { id: 'fuel_filter', name: 'Паливний фільтр', scheduleKm: 30000 },
  { id: 'cabin_filter', name: 'Фільтр салону', scheduleKm: 15000 },
  { id: 'spark_plugs', name: 'Свічки запалювання', scheduleKm: 30000 },
];

const WORK_ITEMS = [
  { id: 'brake_check', name: 'Перевірка гальм', scheduleKm: 20000 },
  { id: 'tire_rotation', name: 'Ротація шин', scheduleKm: 10000 },
  { id: 'coolant', name: 'Охолоджувальна рідина', scheduleKm: 60000 },
  { id: 'transmission_fluid', name: 'Трансмісійна рідина', scheduleKm: 60000 },
  { id: 'brake_fluid', name: 'Гальмівна рідина', scheduleKm: 40000 },
  { id: 'timing_belt', name: 'Ремінь ГРМ', scheduleKm: 60000 },
];

function CheckItem({ item, selected, onToggle }) {
  return (
    <TouchableOpacity style={styles.checkItem} onPress={() => onToggle(item.id)}>
      <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
        {selected && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <View style={styles.checkItemContent}>
        <Text style={styles.checkItemName}>{item.name}</Text>
        <Text style={styles.checkItemSchedule}>Регламент: {item.scheduleKm.toLocaleString()} км</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function AiMechanicStep1Screen({ navigation }) {
  const dispatch = useDispatch();
  const cars = useSelector(state => state.cars.list);
  const car = cars[0] || null;

  const [selected, setSelected] = useState([]);

  const toggle = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    dispatch(setPriorWork(selected));
    navigation.navigate('AiMechanicLoading1');
  };

  const mileage = car?.mileage ? Number(car.mileage).toLocaleString() : '—';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <Text style={styles.carName}>{car?.name || 'Автомобіль'}</Text>
        <Text style={styles.title}>Активація AI-Механіка</Text>
        <Text style={styles.subtitle}>
          Виберіть лише ті роботи, у виконанні яких ви впевнені, що вони проводилися до поточного пробігу {mileage} км.
        </Text>

        {/* Parts section */}
        <Text style={styles.sectionTitle}>Запчастини та витратні матеріали</Text>
        <View style={styles.sectionCard}>
          {PARTS_ITEMS.map(item => (
            <CheckItem
              key={item.id}
              item={item}
              selected={selected.includes(item.id)}
              onToggle={toggle}
            />
          ))}
        </View>

        {/* Work section */}
        <Text style={styles.sectionTitle}>Роботи</Text>
        <View style={styles.sectionCard}>
          {WORK_ITEMS.map(item => (
            <CheckItem
              key={item.id}
              item={item}
              selected={selected.includes(item.id)}
              onToggle={toggle}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Далі</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D1A' },
  scroll: { padding: 20, paddingBottom: 100 },
  carName: { fontSize: 14, color: '#8E8EA0', marginBottom: 4 },
  title: { fontSize: 22, fontWeight: '700', color: '#4B8BFF', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#C0C0D0', lineHeight: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#8E8EA0', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 },
  sectionCard: { backgroundColor: '#1A1A2E', borderRadius: 12, marginBottom: 20, overflow: 'hidden' },
  checkItem: {
    flexDirection: 'row', alignItems: 'center',
    padding: 14, borderBottomWidth: 1, borderBottomColor: '#0D0D1A',
  },
  checkbox: {
    width: 22, height: 22, borderRadius: 4,
    borderWidth: 2, borderColor: '#3A3A5C',
    alignItems: 'center', justifyContent: 'center',
    marginRight: 12,
  },
  checkboxSelected: { backgroundColor: '#4B8BFF', borderColor: '#4B8BFF' },
  checkmark: { color: '#fff', fontSize: 13, fontWeight: '700' },
  checkItemContent: { flex: 1 },
  checkItemName: { fontSize: 15, color: '#FFFFFF', fontWeight: '500' },
  checkItemSchedule: { fontSize: 12, color: '#6B6B8A', marginTop: 2 },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 16, backgroundColor: '#0D0D1A',
    borderTopWidth: 1, borderTopColor: '#1A1A2E',
  },
  nextButton: {
    backgroundColor: '#4B8BFF', borderRadius: 12,
    paddingVertical: 16, alignItems: 'center',
  },
  nextButtonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
});

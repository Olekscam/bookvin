import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setProblems, setPlan } from '../store/slices/aiMechanicSlice';

const PROBLEM_ITEMS = [
  {
    id: 'adblue',
    name: 'Несправності системи AdBlue (SCR)',
    priority: 'critical',
    desc: 'Неможливість запуску двигуна після закінчення терміну, штрафи за перевищення норм викидів, дорогий ремонт усієї системи SCR.',
  },
  {
    id: 'engine_oil_leak',
    name: 'Витік моторної оливи',
    priority: 'critical',
    desc: 'Може призвести до пошкодження двигуна через недостатнє мащення. Потребує негайної діагностики.',
  },
  {
    id: 'check_engine',
    name: 'Горить індикатор Check Engine',
    priority: 'critical',
    desc: 'Сигналізує про несправність двигуна або системи управління. Потрібна діагностика OBD.',
  },
  {
    id: 'brake_squeak',
    name: 'Скрипіння або писк гальм',
    priority: 'recommended',
    desc: 'Може вказувати на знос гальмівних колодок або дисків. Рекомендується огляд найближчим часом.',
  },
  {
    id: 'suspension',
    name: 'Стукіт у підвісці',
    priority: 'recommended',
    desc: 'Ознака зносу амортизаторів, важелів або рульових тяг. Впливає на безпеку та керованість.',
  },
  {
    id: 'fuel_economy',
    name: 'Збільшення витрати пального',
    priority: 'recommended',
    desc: 'Може вказувати на проблеми з форсунками, паливним фільтром або датчиками.',
  },
  {
    id: 'ac_heater',
    name: 'Погана робота кондиціонера / печки',
    priority: 'recommended',
    desc: 'Потребує перевірки рівня фреону, компресора або системи опалення.',
  },
  {
    id: 'battery',
    name: 'Швидкий розряд акумулятора',
    priority: 'recommended',
    desc: 'Ознака зношеного акумулятора або витоку струму в електричній системі.',
  },
];

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
const ALL_ITEMS = [...PARTS_ITEMS, ...WORK_ITEMS];

function generatePlan(mileage, priorWorkIds, selectedProblemIds) {
  const km = Number(mileage) || 0;
  const missedWork = ALL_ITEMS
    .filter(item => item.scheduleKm <= km && !priorWorkIds.includes(item.id))
    .map(item => ({
      id: item.id,
      name: item.name,
      priority: item.scheduleKm <= km / 2 ? 'critical' : 'recommended',
    }));

  const schedule = ALL_ITEMS
    .filter(item => {
      const nextDue = Math.ceil(km / item.scheduleKm) * item.scheduleKm;
      return nextDue - km <= 5000;
    })
    .map(item => ({ id: item.id, name: item.name, priority: 'recommended' }));

  const problems = PROBLEM_ITEMS
    .filter(p => selectedProblemIds.includes(p.id))
    .map(p => ({ id: p.id, name: p.name, priority: p.priority }));

  return { missedWork, schedule, problems };
}

function Badge({ priority }) {
  const isCritical = priority === 'critical';
  return (
    <View style={[styles.badge, isCritical ? styles.badgeCritical : styles.badgeRecommended]}>
      <Text style={[styles.badgeText, isCritical ? styles.badgeTextCritical : styles.badgeTextRecommended]}>
        {isCritical ? 'Критично' : 'Рекомендовано'}
      </Text>
    </View>
  );
}

function ProblemItem({ item, selected, onToggle }) {
  return (
    <TouchableOpacity style={styles.problemItem} onPress={() => onToggle(item.id)}>
      <View style={styles.problemHeader}>
        <Badge priority={item.priority} />
      </View>
      <View style={styles.problemRow}>
        <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
          {selected && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <View style={styles.problemContent}>
          <Text style={styles.problemName}>{item.name}</Text>
          <Text style={styles.problemDesc}>{item.desc}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function AiMechanicStep2Screen({ navigation }) {
  const dispatch = useDispatch();
  const cars = useSelector(state => state.cars.list);
  const priorWork = useSelector(state => state.aiMechanic.selectedPriorWork);
  const car = cars[0] || null;

  const [selected, setSelected] = useState([]);

  const toggle = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    dispatch(setProblems(selected));
    const plan = generatePlan(car?.mileage, priorWork, selected);
    dispatch(setPlan({
      ...plan,
      carId: car?.id,
      mileage: car?.mileage,
      generatedAt: new Date().toISOString(),
    }));
    navigation.navigate('AiMechanicLoading2');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.carName}>{car?.name || 'Автомобіль'}</Text>
        <Text style={styles.title}>Активація AI-Механіка</Text>
        <Text style={styles.subtitle}>
          Я проаналізував вашу модель і пробіг. Відзначте проблеми, які вас турбують, і я додам їх діагностику в план ТО, щоб ви уникнули дорогого ремонту в майбутньому.
        </Text>

        {PROBLEM_ITEMS.map(item => (
          <ProblemItem
            key={item.id}
            item={item}
            selected={selected.includes(item.id)}
            onToggle={toggle}
          />
        ))}
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
  problemItem: {
    backgroundColor: '#1A1A2E', borderRadius: 12, padding: 14, marginBottom: 10,
  },
  problemHeader: { marginBottom: 10 },
  badge: { alignSelf: 'flex-start', borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3 },
  badgeCritical: { backgroundColor: '#C53030' },
  badgeRecommended: { backgroundColor: '#1A3A1A', borderWidth: 1, borderColor: '#276749' },
  badgeText: { fontSize: 11, fontWeight: '700' },
  badgeTextCritical: { color: '#FFFFFF' },
  badgeTextRecommended: { color: '#68D391' },
  problemRow: { flexDirection: 'row', alignItems: 'flex-start' },
  checkbox: {
    width: 22, height: 22, borderRadius: 4,
    borderWidth: 2, borderColor: '#3A3A5C',
    alignItems: 'center', justifyContent: 'center',
    marginRight: 12, marginTop: 2, flexShrink: 0,
  },
  checkboxSelected: { backgroundColor: '#4B8BFF', borderColor: '#4B8BFF' },
  checkmark: { color: '#fff', fontSize: 13, fontWeight: '700' },
  problemContent: { flex: 1 },
  problemName: { fontSize: 15, color: '#FFFFFF', fontWeight: '600', marginBottom: 4 },
  problemDesc: { fontSize: 13, color: '#8E8EA0', lineHeight: 18 },
  footer: {
    padding: 16, borderTopWidth: 1, borderTopColor: '#1A1A2E',
  },
  nextButton: {
    backgroundColor: '#4B8BFF', borderRadius: 12,
    paddingVertical: 16, alignItems: 'center',
  },
  nextButtonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
});

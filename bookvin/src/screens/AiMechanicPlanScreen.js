import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearPlan } from '../store/slices/aiMechanicSlice';

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

function PlanItem({ item }) {
  return (
    <View style={styles.planItem}>
      <Text style={styles.planItemName}>{item.name}</Text>
      <Badge priority={item.priority} />
    </View>
  );
}

function PlanSection({ title, items }) {
  if (!items || items.length === 0) return null;
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionCard}>
        {items.map(item => (
          <PlanItem key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}

export default function AiMechanicPlanScreen({ navigation }) {
  const dispatch = useDispatch();
  const cars = useSelector(state => state.cars.list);
  const plan = useSelector(state => state.aiMechanic.plan);

  const car = cars.find(c => c.id === plan?.carId) || cars[0] || null;
  const mileage = plan?.mileage ? Number(plan.mileage).toLocaleString() : '—';

  const handleSave = () => {
    navigation.navigate('Main', { screen: 'Service' });
  };

  const handleBookService = () => {
    navigation.navigate('Main', { screen: 'Map' });
  };

  const handleReset = () => {
    Alert.alert(
      'Скинути план?',
      'Це видалить поточний план ТО і ви зможете пройти активацію знову.',
      [
        { text: 'Скасувати', style: 'cancel' },
        { text: 'Скинути', style: 'destructive', onPress: () => { dispatch(clearPlan()); navigation.navigate('Main'); } },
      ]
    );
  };

  if (!plan) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.empty}>
          <Text style={styles.emptyText}>План ТО ще не сформовано.</Text>
          <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('AiMechanicStep1')}>
            <Text style={styles.nextButtonText}>Почати активацію</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const hasContent = (plan.missedWork?.length + plan.schedule?.length + plan.problems?.length) > 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.carName}>{car?.name || 'Автомобіль'}</Text>
        <Text style={styles.title}>ТО Поточне</Text>
        <View style={styles.headlineCard}>
          <Text style={styles.headlineText}>
            Ваш персональний план ТО сформовано. Він включає пропущені роботи та регламент для пробігу {mileage} км.
          </Text>
        </View>

        {!hasContent ? (
          <View style={styles.allGoodCard}>
            <Text style={styles.allGoodIcon}>✅</Text>
            <Text style={styles.allGoodText}>Усі роботи виконано вчасно. Ваш автомобіль в чудовому стані!</Text>
          </View>
        ) : (
          <>
            <PlanSection title="ТО Пропущені роботи" items={plan.missedWork} />
            <PlanSection title="Регламент обслуговування" items={plan.schedule} />
            <PlanSection title="Можливі проблеми" items={plan.problems} />
          </>
        )}

        <TouchableOpacity onPress={handleReset} style={styles.resetLink}>
          <Text style={styles.resetLinkText}>Пройти активацію знову</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Зберегти</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookService}>
          <Text style={styles.bookButtonText}>Записатись на ТО</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D1A' },
  scroll: { padding: 20, paddingBottom: 120 },
  carName: { fontSize: 14, color: '#8E8EA0', marginBottom: 4 },
  title: { fontSize: 24, fontWeight: '700', color: '#FFFFFF', marginBottom: 12 },
  headlineCard: { backgroundColor: '#1A1A2E', borderRadius: 12, padding: 14, marginBottom: 20 },
  headlineText: { fontSize: 14, color: '#C0C0D0', lineHeight: 20 },
  section: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 13, fontWeight: '700', color: '#8E8EA0',
    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8,
  },
  sectionCard: { backgroundColor: '#1A1A2E', borderRadius: 12, overflow: 'hidden' },
  planItem: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 14, borderBottomWidth: 1, borderBottomColor: '#0D0D1A',
  },
  planItemName: { fontSize: 15, color: '#FFFFFF', flex: 1, marginRight: 10 },
  badge: { alignSelf: 'flex-start', borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3, flexShrink: 0 },
  badgeCritical: { backgroundColor: '#C53030' },
  badgeRecommended: { backgroundColor: '#1A3A1A', borderWidth: 1, borderColor: '#276749' },
  badgeText: { fontSize: 11, fontWeight: '700' },
  badgeTextCritical: { color: '#FFFFFF' },
  badgeTextRecommended: { color: '#68D391' },
  allGoodCard: { backgroundColor: '#1A2E1A', borderRadius: 12, padding: 20, alignItems: 'center', marginBottom: 20 },
  allGoodIcon: { fontSize: 36, marginBottom: 10 },
  allGoodText: { fontSize: 15, color: '#68D391', textAlign: 'center', lineHeight: 22 },
  resetLink: { alignItems: 'center', paddingVertical: 12 },
  resetLinkText: { color: '#6B6B8A', fontSize: 14 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  emptyText: { fontSize: 16, color: '#8E8EA0', marginBottom: 20 },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 16, gap: 10, backgroundColor: '#0D0D1A',
    borderTopWidth: 1, borderTopColor: '#1A1A2E',
  },
  saveButton: {
    backgroundColor: '#1A1A2E', borderRadius: 12,
    paddingVertical: 14, alignItems: 'center',
    borderWidth: 1, borderColor: '#4B8BFF',
  },
  saveButtonText: { color: '#4B8BFF', fontSize: 16, fontWeight: '700' },
  bookButton: {
    backgroundColor: '#4B8BFF', borderRadius: 12,
    paddingVertical: 14, alignItems: 'center',
  },
  bookButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  nextButton: {
    backgroundColor: '#4B8BFF', borderRadius: 12, paddingVertical: 14, paddingHorizontal: 24, alignItems: 'center',
  },
  nextButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});

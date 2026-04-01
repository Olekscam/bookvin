import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { addExpense } from '../store/slices/expensesSlice';

const CATEGORIES = ['Fuel', 'Service', 'Insurance', 'Repair', 'Parking', 'Wash', 'Other'];

export default function AddExpenseScreen({ navigation }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    category: 'Fuel',
    amount: '',
    date: '',
    mileage: '',
    description: '',
  });
  const [errors, setErrors] = useState({});

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const validate = () => {
    const errs = {};
    if (!form.amount.trim()) errs.amount = 'Required';
    else if (isNaN(parseFloat(form.amount))) errs.amount = 'Must be a number';
    if (!form.date.trim()) errs.date = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    dispatch(addExpense({
      ...form,
      amount: parseFloat(form.amount),
      mileage: form.mileage ? parseInt(form.mileage, 10) : null,
      createdAt: new Date().toISOString(),
    }));
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      <Text style={styles.title}>Add Expense</Text>

      <Text style={styles.label}>Category</Text>
      <View style={styles.optionsRow}>
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.chip, form.category === cat && styles.chipSelected]}
            onPress={() => set('category', cat)}
          >
            <Text style={[styles.chipText, form.category === cat && styles.chipTextSelected]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Amount *</Text>
      <TextInput
        style={[styles.input, errors.amount && styles.inputError]}
        placeholder="0.00"
        value={form.amount}
        onChangeText={v => set('amount', v)}
        keyboardType="decimal-pad"
      />
      {errors.amount ? <Text style={styles.errorText}>{errors.amount}</Text> : null}

      <Text style={styles.label}>Date * (DD.MM.YYYY)</Text>
      <TextInput
        style={[styles.input, errors.date && styles.inputError]}
        placeholder="01.04.2026"
        value={form.date}
        onChangeText={v => set('date', v)}
      />
      {errors.date ? <Text style={styles.errorText}>{errors.date}</Text> : null}

      <Text style={styles.label}>Mileage (km)</Text>
      <TextInput style={styles.input} placeholder="150000" value={form.mileage} onChangeText={v => set('mileage', v)} keyboardType="numeric" />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Notes..."
        value={form.description}
        onChangeText={v => set('description', v)}
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Expense</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#444', marginBottom: 4, marginTop: 12 },
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, backgroundColor: '#fafafa',
  },
  inputError: { borderColor: '#e53e3e' },
  errorText: { color: '#e53e3e', fontSize: 12, marginTop: 2 },
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 4 },
  chip: {
    paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20,
    borderWidth: 1, borderColor: '#ddd', backgroundColor: '#f5f5f5',
  },
  chipSelected: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  chipText: { fontSize: 14, color: '#555' },
  chipTextSelected: { color: '#fff', fontWeight: '600' },
  saveButton: { backgroundColor: '#007AFF', borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginTop: 16 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  cancelButton: { borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginTop: 8 },
  cancelButtonText: { color: '#e53e3e', fontSize: 16 },
});

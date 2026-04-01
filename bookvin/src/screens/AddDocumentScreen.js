import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { addDocument } from '../store/slices/documentsSlice';

const DOC_TYPES = ['Technical Passport', 'Insurance', 'Registration', 'Service Record', 'Warranty', 'Other'];

export default function AddDocumentScreen({ navigation }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    type: 'Technical Passport',
    number: '',
    issueDate: '',
    expiryDate: '',
    description: '',
    owner: '',
  });
  const [errors, setErrors] = useState({});

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const validate = () => {
    const errs = {};
    if (!form.number.trim()) errs.number = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    dispatch(addDocument({ ...form, createdAt: new Date().toISOString() }));
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      <Text style={styles.title}>Add Document</Text>

      <Text style={styles.label}>Document Type</Text>
      <View style={styles.optionsRow}>
        {DOC_TYPES.map(t => (
          <TouchableOpacity
            key={t}
            style={[styles.chip, form.type === t && styles.chipSelected]}
            onPress={() => set('type', t)}
          >
            <Text style={[styles.chipText, form.type === t && styles.chipTextSelected]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Document Number *</Text>
      <TextInput
        style={[styles.input, errors.number && styles.inputError]}
        placeholder="АА123456"
        value={form.number}
        onChangeText={v => set('number', v)}
        autoCapitalize="characters"
      />
      {errors.number ? <Text style={styles.errorText}>{errors.number}</Text> : null}

      <Text style={styles.label}>Issue Date (DD.MM.YYYY)</Text>
      <TextInput style={styles.input} placeholder="01.01.2020" value={form.issueDate} onChangeText={v => set('issueDate', v)} />

      <Text style={styles.label}>Expiry Date (DD.MM.YYYY)</Text>
      <TextInput style={styles.input} placeholder="01.01.2025" value={form.expiryDate} onChangeText={v => set('expiryDate', v)} />

      <Text style={styles.label}>Owner</Text>
      <TextInput style={styles.input} placeholder="John Doe" value={form.owner} onChangeText={v => set('owner', v)} autoCapitalize="words" />

      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Additional notes..."
        value={form.description}
        onChangeText={v => set('description', v)}
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Document</Text>
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

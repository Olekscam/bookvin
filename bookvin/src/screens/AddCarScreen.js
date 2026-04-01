import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addCar, updateCar } from '../store/slices/carsSlice';

const ENGINE_TYPES = ['Petrol', 'Diesel', 'Hybrid', 'Electric', 'LPG'];
const TRANSMISSIONS = ['Manual', 'Automatic', 'CVT', 'DSG'];

function SelectRow({ label, options, value, onChange }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.optionsRow}>
        {options.map(opt => (
          <TouchableOpacity
            key={opt}
            style={[styles.optionChip, value === opt && styles.optionChipSelected]}
            onPress={() => onChange(opt)}
          >
            <Text style={[styles.optionChipText, value === opt && styles.optionChipTextSelected]}>
              {opt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function Field({ label, error, ...props }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={[styles.input, error && styles.inputError]} {...props} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

export default function AddCarScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const editCar = route.params?.carId
    ? useSelector(state => state.cars.list.find(c => c.id === route.params.carId))
    : null;

  const isEdit = !!editCar;

  const [form, setForm] = useState({
    make: editCar?.make || '',
    model: editCar?.model || '',
    vin: editCar?.vin || '',
    year: editCar?.year || '',
    engineVolume: editCar?.engineVolume || '',
    engineType: editCar?.engineType || 'Petrol',
    engineCode: editCar?.engineCode || '',
    transmission: editCar?.transmission || 'Manual',
    licensePlate: editCar?.licensePlate || '',
    mileage: editCar?.mileage || '',
    lastServiceMileage: editCar?.lastServiceMileage || '',
    lastServiceDate: editCar?.lastServiceDate || '',
  });
  const [errors, setErrors] = useState({});

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const validate = () => {
    const errs = {};
    if (!form.make.trim()) errs.make = 'Required';
    if (!form.model.trim()) errs.model = 'Required';
    if (!form.vin.trim()) errs.vin = 'Required';
    else if (form.vin.trim().length !== 17) errs.vin = 'VIN must be 17 characters';
    if (!form.year.trim()) errs.year = 'Required';
    else if (!/^\d{4}$/.test(form.year.trim())) errs.year = 'Enter a valid year (e.g. 2020)';
    if (!form.mileage.trim()) errs.mileage = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const data = {
      ...form,
      name: `${form.make} ${form.model}`,
      mileage: parseInt(form.mileage, 10) || 0,
      lastServiceMileage: parseInt(form.lastServiceMileage, 10) || 0,
    };
    if (isEdit) {
      dispatch(updateCar({ ...editCar, ...data }));
    } else {
      dispatch(addCar(data));
    }
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      <Text style={styles.title}>{isEdit ? 'Edit Car' : 'Add New Car'}</Text>

      <Field label="Make *" placeholder="Volkswagen" value={form.make} onChangeText={v => set('make', v)} error={errors.make} autoCapitalize="words" />
      <Field label="Model *" placeholder="Passat" value={form.model} onChangeText={v => set('model', v)} error={errors.model} autoCapitalize="words" />
      <Field label="VIN * (17 characters)" placeholder="WVWZZZ3CZHE000001" value={form.vin} onChangeText={v => set('vin', v.toUpperCase())} error={errors.vin} maxLength={17} autoCapitalize="characters" />
      <Field label="Year *" placeholder="2020" value={form.year} onChangeText={v => set('year', v)} error={errors.year} keyboardType="numeric" maxLength={4} />
      <Field label="Engine Volume (L)" placeholder="2.0" value={form.engineVolume} onChangeText={v => set('engineVolume', v)} keyboardType="decimal-pad" />

      <SelectRow label="Engine Type" options={ENGINE_TYPES} value={form.engineType} onChange={v => set('engineType', v)} />

      <Field label="Engine Code" placeholder="TFSI" value={form.engineCode} onChangeText={v => set('engineCode', v)} autoCapitalize="characters" />

      <SelectRow label="Transmission" options={TRANSMISSIONS} value={form.transmission} onChange={v => set('transmission', v)} />

      <Field label="License Plate" placeholder="AA1234BB" value={form.licensePlate} onChangeText={v => set('licensePlate', v.toUpperCase())} autoCapitalize="characters" />
      <Field label="Current Mileage (km) *" placeholder="150000" value={form.mileage} onChangeText={v => set('mileage', v)} error={errors.mileage} keyboardType="numeric" />
      <Field label="Mileage at Last Service (km)" placeholder="145000" value={form.lastServiceMileage} onChangeText={v => set('lastServiceMileage', v)} keyboardType="numeric" />
      <Field label="Last Service Date (DD.MM.YYYY)" placeholder="15.03.2024" value={form.lastServiceDate} onChangeText={v => set('lastServiceDate', v)} />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>{isEdit ? 'Save Changes' : 'Add Car'}</Text>
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
  label: { fontSize: 13, fontWeight: '600', color: '#444', marginBottom: 4 },
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, backgroundColor: '#fafafa',
  },
  inputError: { borderColor: '#e53e3e' },
  errorText: { color: '#e53e3e', fontSize: 12, marginTop: 2 },
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionChip: {
    paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20,
    borderWidth: 1, borderColor: '#ddd', backgroundColor: '#f5f5f5',
  },
  optionChipSelected: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  optionChipText: { fontSize: 14, color: '#555' },
  optionChipTextSelected: { color: '#fff', fontWeight: '600' },
  saveButton: { backgroundColor: '#007AFF', borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  cancelButton: { borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginTop: 8 },
  cancelButtonText: { color: '#e53e3e', fontSize: 16 },
});

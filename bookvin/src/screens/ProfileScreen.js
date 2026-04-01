import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, TouchableOpacity,
  TextInput, Alert, ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { logout, updateUser } from '../store/slices/authSlice';

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const cars = useSelector(state => state.cars.list);
  const expenses = useSelector(state => state.expenses.list);
  const documents = useSelector(state => state.documents.list);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSave = () => {
    if (!name.trim()) { Alert.alert('Name is required'); return; }
    dispatch(updateUser({ name: name.trim(), email: email.trim() }));
    setEditing(false);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => dispatch(logout()) },
    ]);
  };

  const totalSpent = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0)?.toUpperCase() || '?'}</Text>
          </View>
          {!editing && (
            <>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
            </>
          )}
        </View>

        {/* Edit form */}
        {editing ? (
          <View style={styles.editForm}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} autoCapitalize="words" />
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelLink} onPress={() => setEditing(false)}>
              <Text style={styles.cancelLinkText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{cars.length}</Text>
            <Text style={styles.statLabel}>Cars</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{expenses.length}</Text>
            <Text style={styles.statLabel}>Expenses</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>${totalSpent.toFixed(0)}</Text>
            <Text style={styles.statLabel}>Total Spent</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{documents.length}</Text>
            <Text style={styles.statLabel}>Docs</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('MyGarage')}>
            <Text style={styles.menuIcon}>🚗</Text>
            <Text style={styles.menuLabel}>My Garage</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          {!editing && (
            <>
              <TouchableOpacity style={styles.menuItem} onPress={() => setEditing(true)}>
                <Text style={styles.menuIcon}>✏️</Text>
                <Text style={styles.menuLabel}>Edit Profile</Text>
                <Text style={styles.menuArrow}>›</Text>
              </TouchableOpacity>
              <View style={styles.divider} />
            </>
          )}
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Text style={styles.menuIcon}>🚪</Text>
            <Text style={[styles.menuLabel, { color: '#e53e3e' }]}>Logout</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  avatarSection: { alignItems: 'center', marginBottom: 20 },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#007AFF', alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  avatarText: { color: '#fff', fontSize: 32, fontWeight: '700' },
  userName: { fontSize: 22, fontWeight: '700', color: '#222' },
  userEmail: { fontSize: 15, color: '#888', marginTop: 4 },
  editForm: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: '#444', marginBottom: 4, marginTop: 10 },
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, backgroundColor: '#fff',
  },
  saveBtn: { backgroundColor: '#007AFF', borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginTop: 14 },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  cancelLink: { alignItems: 'center', paddingVertical: 10 },
  cancelLinkText: { color: '#888', fontSize: 15 },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  statBox: {
    flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 12, alignItems: 'center',
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4,
  },
  statNum: { fontSize: 20, fontWeight: '700', color: '#007AFF' },
  statLabel: { fontSize: 11, color: '#888', marginTop: 2 },
  menuCard: {
    backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden',
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4,
  },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 },
  menuIcon: { fontSize: 20, marginRight: 12 },
  menuLabel: { flex: 1, fontSize: 16, color: '#222' },
  menuArrow: { fontSize: 22, color: '#ccc' },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginLeft: 48 },
});

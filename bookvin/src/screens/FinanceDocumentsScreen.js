import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteExpense } from '../store/slices/expensesSlice';
import { deleteDocument } from '../store/slices/documentsSlice';

const CATEGORY_ICONS = {
  Fuel: '⛽',
  Service: '🔧',
  Insurance: '🛡️',
  Repair: '🔩',
  Parking: '🅿️',
  Wash: '🚿',
  Other: '📝',
};

export default function FinanceDocumentsScreen({ navigation }) {
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expenses.list);
  const documents = useSelector(state => state.documents.list);

  const total = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  const byCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + (e.amount || 0);
    return acc;
  }, {});

  const handleDeleteExpense = (id) => {
    Alert.alert('Delete Expense', 'Remove this expense?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => dispatch(deleteExpense(id)) },
    ]);
  };

  const handleDeleteDocument = (id) => {
    Alert.alert('Delete Document', 'Remove this document?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => dispatch(deleteDocument(id)) },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      <Text style={styles.title}>Finance & Documents</Text>

      {/* Summary card */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total Expenses</Text>
        <Text style={styles.summaryAmount}>${total.toFixed(2)}</Text>
        {Object.keys(byCategory).length > 0 && (
          <View style={styles.categories}>
            {Object.entries(byCategory).map(([cat, amt]) => (
              <View key={cat} style={styles.categoryRow}>
                <Text style={styles.categoryName}>{CATEGORY_ICONS[cat] || '📝'} {cat}</Text>
                <Text style={styles.categoryAmt}>${amt.toFixed(2)}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Expenses list */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Expenses</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddExpense')}>
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {expenses.length === 0 ? (
        <Text style={styles.emptyText}>No expenses yet.</Text>
      ) : (
        expenses.map(exp => (
          <View key={exp.id} style={styles.expenseItem}>
            <View style={styles.expenseLeft}>
              <Text style={styles.expenseIcon}>{CATEGORY_ICONS[exp.category] || '📝'}</Text>
              <View>
                <Text style={styles.expenseCategory}>{exp.category}</Text>
                <Text style={styles.expenseDate}>{exp.date}</Text>
                {exp.description ? <Text style={styles.expenseDesc}>{exp.description}</Text> : null}
              </View>
            </View>
            <View style={styles.expenseRight}>
              <Text style={styles.expenseAmount}>${exp.amount?.toFixed(2)}</Text>
              <TouchableOpacity onPress={() => handleDeleteExpense(exp.id)}>
                <Text style={styles.deleteText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      {/* Documents list */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Documents</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddDocument')}>
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {documents.length === 0 ? (
        <Text style={styles.emptyText}>No documents yet.</Text>
      ) : (
        documents.map(doc => (
          <View key={doc.id} style={styles.docItem}>
            <View style={styles.docLeft}>
              <Text style={styles.docIcon}>📄</Text>
              <View>
                <Text style={styles.docType}>{doc.type}</Text>
                {doc.number ? <Text style={styles.docNumber}>#{doc.number}</Text> : null}
                {doc.expiryDate ? <Text style={styles.docExpiry}>Expires: {doc.expiryDate}</Text> : null}
              </View>
            </View>
            <TouchableOpacity onPress={() => handleDeleteDocument(doc.id)}>
              <Text style={styles.deleteText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  summaryCard: {
    backgroundColor: '#007AFF', borderRadius: 16, padding: 20, marginBottom: 20,
  },
  summaryLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginBottom: 4 },
  summaryAmount: { color: '#fff', fontSize: 36, fontWeight: 'bold', marginBottom: 12 },
  categories: { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.3)', paddingTop: 12 },
  categoryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  categoryName: { color: 'rgba(255,255,255,0.9)', fontSize: 14 },
  categoryAmt: { color: '#fff', fontSize: 14, fontWeight: '600' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, marginTop: 8 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#222' },
  addBtn: { backgroundColor: '#007AFF', borderRadius: 16, paddingHorizontal: 14, paddingVertical: 6 },
  addBtnText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  emptyText: { color: '#999', fontSize: 14, marginBottom: 16 },
  expenseItem: {
    backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 8,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
  },
  expenseLeft: { flexDirection: 'row', alignItems: 'flex-start', flex: 1 },
  expenseIcon: { fontSize: 22, marginRight: 10, marginTop: 2 },
  expenseCategory: { fontSize: 15, fontWeight: '600', color: '#222' },
  expenseDate: { fontSize: 12, color: '#888', marginTop: 2 },
  expenseDesc: { fontSize: 12, color: '#aaa', marginTop: 2 },
  expenseRight: { alignItems: 'flex-end', gap: 4 },
  expenseAmount: { fontSize: 16, fontWeight: '700', color: '#333' },
  deleteText: { color: '#ccc', fontSize: 16, padding: 4 },
  docItem: {
    backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 8,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  docLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  docIcon: { fontSize: 22, marginRight: 10 },
  docType: { fontSize: 15, fontWeight: '600', color: '#222' },
  docNumber: { fontSize: 13, color: '#555', marginTop: 2 },
  docExpiry: { fontSize: 12, color: '#e07000', marginTop: 2 },
});

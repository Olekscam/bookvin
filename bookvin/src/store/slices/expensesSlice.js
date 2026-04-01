import { createSlice } from '@reduxjs/toolkit';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    list: [],
  },
  reducers: {
    addExpense(state, action) {
      state.list.unshift({ ...action.payload, id: Date.now().toString() });
    },
    updateExpense(state, action) {
      const idx = state.list.findIndex(e => e.id === action.payload.id);
      if (idx !== -1) state.list[idx] = action.payload;
    },
    deleteExpense(state, action) {
      state.list = state.list.filter(e => e.id !== action.payload);
    },
  },
});

export const { addExpense, updateExpense, deleteExpense } = expensesSlice.actions;
export default expensesSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const documentsSlice = createSlice({
  name: 'documents',
  initialState: {
    list: [],
  },
  reducers: {
    addDocument(state, action) {
      state.list.unshift({ ...action.payload, id: Date.now().toString() });
    },
    updateDocument(state, action) {
      const idx = state.list.findIndex(d => d.id === action.payload.id);
      if (idx !== -1) state.list[idx] = action.payload;
    },
    deleteDocument(state, action) {
      state.list = state.list.filter(d => d.id !== action.payload);
    },
  },
});

export const { addDocument, updateDocument, deleteDocument } = documentsSlice.actions;
export default documentsSlice.reducer;

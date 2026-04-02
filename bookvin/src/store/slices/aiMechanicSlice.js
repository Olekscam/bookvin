import { createSlice } from '@reduxjs/toolkit';

const aiMechanicSlice = createSlice({
  name: 'aiMechanic',
  initialState: {
    selectedPriorWork: [],
    selectedProblems: [],
    plan: null,
  },
  reducers: {
    setPriorWork(state, action) {
      state.selectedPriorWork = action.payload;
    },
    setProblems(state, action) {
      state.selectedProblems = action.payload;
    },
    setPlan(state, action) {
      state.plan = action.payload;
    },
    clearPlan(state) {
      state.selectedPriorWork = [];
      state.selectedProblems = [];
      state.plan = null;
    },
  },
});

export const { setPriorWork, setProblems, setPlan, clearPlan } = aiMechanicSlice.actions;
export default aiMechanicSlice.reducer;

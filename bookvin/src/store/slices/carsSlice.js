import { createSlice } from '@reduxjs/toolkit';

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    list: [],
    selectedCarId: null,
  },
  reducers: {
    addCar(state, action) {
      state.list.push({ ...action.payload, id: Date.now().toString() });
    },
    updateCar(state, action) {
      const idx = state.list.findIndex(c => c.id === action.payload.id);
      if (idx !== -1) state.list[idx] = action.payload;
    },
    deleteCar(state, action) {
      state.list = state.list.filter(c => c.id !== action.payload);
      if (state.selectedCarId === action.payload) state.selectedCarId = null;
    },
    selectCar(state, action) {
      state.selectedCarId = action.payload;
    },
  },
});

export const { addCar, updateCar, deleteCar, selectCar } = carsSlice.actions;
export default carsSlice.reducer;

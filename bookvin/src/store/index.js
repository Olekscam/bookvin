import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import carsReducer from './slices/carsSlice';
import expensesReducer from './slices/expensesSlice';
import documentsReducer from './slices/documentsSlice';
import aiMechanicReducer from './slices/aiMechanicSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  cars: carsReducer,
  expenses: expensesReducer,
  documents: documentsReducer,
  aiMechanic: aiMechanicReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'cars', 'expenses', 'documents', 'aiMechanic'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

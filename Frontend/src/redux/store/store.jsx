
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from '../slices/authSlice';
import policiesReducer from '../slices/policiesSlice';
import transactionReducer from '../slices/transactionSlice';

// Create a persist configuration for the auth slice
const persistConfig = {
  key: 'auth', // Key for the persisted data
  storage, // Storage engine (localStorage in this case)
};

// Create a persisted reducer for the auth slice
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Configure the store
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Persisted auth slice
    transaction: transactionReducer, // Non-persisted slice
    policies: policiesReducer, // Non-persisted slice
  },
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
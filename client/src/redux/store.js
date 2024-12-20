import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import savedHomesReducer from './savedHomes/savedHomesSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Persist configuration for user and savedHomes
const userPersistConfig = {
  key: 'user',
  storage,
  version: 1,
};

// Combining reducers
const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  savedHomes: savedHomesReducer,
});

// Creating persisted reducer
const persistedReducer = rootReducer;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for non-serializable actions
    }),
});

export const persistor = persistStore(store); // Persist store
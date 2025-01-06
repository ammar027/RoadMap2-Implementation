import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import postsReducer from './postsSlice';
import userReducer from './userSlice';
import userdataReducer from './userdataSlice';
import rootSaga from './sagas'; // Import root saga

// Combine reducers
const rootReducer = combineReducers({
  posts: postsReducer,
  users: userReducer,
  userdata: userdataReducer,
});

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure store with saga middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        warnAfter: 64,
      },
    }).concat(sagaMiddleware), // Add saga middleware
});

// Run saga middleware
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;

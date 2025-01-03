import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import postsReducer from './postsSlice';
import userReducer from './userSlice';
import userdataReducer from './userdataSlice'; // Import userdata slice

// Combine reducers
const rootReducer = combineReducers({
  posts: postsReducer,
  users: userReducer,
  userdata: userdataReducer, 
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], 
      },
    }),
});

export const persistor = persistStore(store);
export default store;

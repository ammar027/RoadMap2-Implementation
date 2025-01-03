import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import postsReducer from './postsSlice';
import userReducer from './userSlice';

// Add the user reducer to the rootReducer
const rootReducer = combineReducers({
  posts: postsReducer,
  users: userReducer, // Add userSlice here
});

// Other configurations remain unchanged


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
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignore redux-persist actions
      },
    }),
});

export const persistor = persistStore(store);
export default store;

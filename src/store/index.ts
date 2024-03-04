import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice';

// Redux Persist 구성 설정
const persistConfig = {
  key: 'root',
  storage,
};

// persistReducer로 Redux Persist 적용
const persistedReducer = persistReducer(persistConfig, userReducer);

// 스토어 생성
const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Redux Persist 스토어 생성
const persistor = persistStore(store);

export { store, persistor };

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import gameReducer from './gameSlice';
import type { GameState } from './gameSlice';

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer<GameState>(persistConfig, gameReducer);

export const store = configureStore({
    reducer: {
        game: persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
            }
        })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
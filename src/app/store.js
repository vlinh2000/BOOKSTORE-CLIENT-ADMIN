import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import homeReducer from 'features/Home/homeSlice';
import authReducer from 'features/Authentication/authSlice';

const persistAuthConfig = {
    key: 'auth',
    storage,
    blacklist: ["isLoading"]
}

const rootReducter = combineReducers({
    home: homeReducer,
    auth: persistReducer(persistAuthConfig, authReducer)
});


const store = configureStore({
    reducer: rootReducter,
    //handle non-serializable value
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
});

export const persistor = persistStore(store);

export default store;


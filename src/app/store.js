import { configureStore, combineReducers } from '@reduxjs/toolkit'

import homeReducer from 'features/Home/homeSlice';
import authReducer from 'features/Authentication/authSlice';

const rootReducter = combineReducers({
    home: homeReducer,
    auth: authReducer
});

const store = configureStore({
    reducer: rootReducter
});


export default store;


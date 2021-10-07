import { createSlice } from '@reduxjs/toolkit';


const initialState = {

    products: [],
    category: [],
    bills: [],
    users: []

}

const home = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: {}
});


const { actions, reducer } = home;

export const { } = actions;
export default reducer;

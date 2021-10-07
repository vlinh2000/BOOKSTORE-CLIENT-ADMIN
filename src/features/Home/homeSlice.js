import { createSlice } from '@reduxjs/toolkit';


const initialState = {

    products: [],
    category: [],
    bills: [],
    users: [],
    isVisibleProfile: false

}

const home = createSlice({
    name: 'home',
    initialState,
    reducers: {
        switchProfile: (state, action) => {
            state.isVisibleProfile = action.payload
        }
    },
    extraReducers: {}
});


const { actions, reducer } = home;

export const { switchProfile } = actions;
export default reducer;

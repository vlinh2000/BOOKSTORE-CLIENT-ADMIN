import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: false,
    currentUser: {
        auth: {
            token: null,
            refreshtoken: null
        },
        user: {}
    }
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {}
})

const { actions, reducer } = auth;

export const { } = actions;

export default reducer;
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserApi } from 'api/UserApi'

export const getMe = createAsyncThunk("authentication/getMe", async (data, { fulfillWithValue, rejectWithValue }) => {

    try {
        const { user } = await UserApi.get();
        return fulfillWithValue(user);

    } catch (error) {
        return rejectWithValue(error.response.data);
    }

})

export const login = createAsyncThunk("authentication/login", async (data, { fulfillWithValue, rejectWithValue, dispatch }) => {

    try {
        const { token, refreshtoken } = await UserApi.post_login(data);
        return fulfillWithValue({ token, refreshtoken });

    } catch (error) {
        return rejectWithValue(error.response.data);
    }

})


const initialState = {
    isLoading: false,
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
    extraReducers: {
        //handle get infomation
        [getMe.pending]: (state) => {
            state.isLoading = true;
        },
        [getMe.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.currentUser.user = action.payload;
        },
        [getMe.rejected]: (state, action) => {
            state.isLoading = false;
        },
        //handle login
        [login.pending]: (state) => {
            state.isLoading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.currentUser.auth = action.payload;
            state.isAuth = true;
        },
        [login.rejected]: (state, action) => {
            state.isLoading = false;
        },
    }
})

const { actions, reducer } = auth;

export const { } = actions;

export default reducer;
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BillApi } from 'api/BillApi';
import { CategoryApi } from 'api/CategoryApi';
import { ProductApi } from 'api/ProductApi';
import { UserApi } from 'api/UserApi';


export const fetchProducts = createAsyncThunk("home/fetchProducts", async (data, { fulfillWithValue, rejectWithValue }) => {

    try {
        const { books } = await ProductApi.get_All();
        return fulfillWithValue(books);

    } catch (error) {
        return rejectWithValue(error.message);
    }

})

export const fetchCategories = createAsyncThunk("home/fetchCategories", async (data, { fulfillWithValue, rejectWithValue }) => {

    try {
        const { categories } = await CategoryApi.get_All();
        return fulfillWithValue(categories);

    } catch (error) {
        return rejectWithValue(error.message);
    }

})

export const fetchBills = createAsyncThunk("home/fetchBills", async (data, { fulfillWithValue, rejectWithValue }) => {

    try {
        const { bills } = await BillApi.get_All();
        return fulfillWithValue(bills);

    } catch (error) {
        return rejectWithValue(error.message);
    }

})

export const fetchUsers = createAsyncThunk("home/fetchUsers", async (data, { fulfillWithValue, rejectWithValue }) => {

    try {
        const { users } = await UserApi.get_All();
        return fulfillWithValue(users);

    } catch (error) {
        return rejectWithValue(error.message);
    }

})

const initialState = {

    products: [],
    categories: [],
    bills: [],
    users: [],
    error: '',
    isVisibleProfile: false,
    isLoading: false

}

const home = createSlice({
    name: 'home',
    initialState,
    reducers: {
        switchProfile: (state, action) => {
            state.isVisibleProfile = action.payload
        }
    },
    extraReducers: {
        //handle fetch products
        [fetchProducts.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        },
        [fetchProducts.pending]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        //handle fetch categories
        [fetchCategories.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchCategories.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.categories = action.payload;
        },
        [fetchCategories.pending]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        //handle fetch bills
        [fetchBills.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchBills.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.bills = action.payload;
        },
        [fetchBills.pending]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
        //handle fetch users
        [fetchUsers.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        },
        [fetchUsers.pending]: (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        },
    }
});


const { actions, reducer } = home;

export const { switchProfile } = actions;
export default reducer;

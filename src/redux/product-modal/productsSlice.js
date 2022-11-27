import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const PRODUCTS_URL = 'http://192.168.100.11:8080/api/products';

const initialState = {
    products: [],
    status: 'idle',
    error: null,
};

export const getProducts = createAsyncThunk('product/getProducts', async () => {
    try {
        const response = await axios.get(PRODUCTS_URL);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const productSlice = createSlice({
    name: 'Products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.products = action.payload;
        });
        builder.addCase(getProducts.rejected, (state, action) => {
            state.status = 'failed';
        });
    },
});
export default productSlice.reducer;

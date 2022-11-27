import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const PRODUCTS_URL = 'http://192.168.100.11:8080/api/products/find';

const initialState = {
    productId: null,
    products: {},
    status: 'idle',
    error: null,
};

export const getProductDetail = createAsyncThunk('product/getProductDetail', async (id) => {
    try {
        const response = await axios.get(`${PRODUCTS_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const productDetailSlice = createSlice({
    name: 'Product',
    initialState,
    reducers: {
        set: (state, action) => {
            state.productId = action.payload;
        },
        remove: (state) => {
            state.productId = null;
            state.products = {};
            state.status = 'idle';
        },
        clear: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(getProductDetail.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(getProductDetail.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.products = action.payload;
        });
        builder.addCase(getProductDetail.rejected, (state, action) => {
            state.status = 'failed';
        });
    },
});
export const { set, remove, clear } = productDetailSlice.actions;
export default productDetailSlice.reducer;

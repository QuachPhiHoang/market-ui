import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const PRODUCTS_URL = 'http://localhost:8080/api/products/find';

const initialState = {
    productId: null,
    product: {},
    error: null,
};

export const getProductDetail = createAsyncThunk('product/getProductDetail', async (id) => {
    try {
        const { data } = await axios.get(`${PRODUCTS_URL}/${id}`);
        return data;
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
            state.product = {};
        },
        clear: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(getProductDetail.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(getProductDetail.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.product = action.payload;
        });
        builder.addCase(getProductDetail.rejected, (state, action) => {
            state.status = 'failed';
        });
    },
});
export const { set, remove, clear } = productDetailSlice.actions;
export default productDetailSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '~/service/axiosInterceptor';

const initialState = {
    productId: null,
    product: {},
    error: null,
};

export const getProductDetail = createAsyncThunk('product/getProductDetail', async (id) => {
    try {
        const { data } = await axiosInstance.get(`${'products/find'}/${id}`);
        return data;
    } catch (error) {
        return error.response.data.message;
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
            state.product = action.payload.product;
        });
        builder.addCase(getProductDetail.rejected, (state, action) => {
            state.status = 'failed';
        });
    },
});
export const { set, remove, clear } = productDetailSlice.actions;
export default productDetailSlice.reducer;

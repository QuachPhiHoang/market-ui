import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products: [],
    status: 'idle',
    error: null,
};
const PRODUCTS_URL = `http://localhost:8080/api/products/search`;

export const getProductSearch = createAsyncThunk('product/getProductSearch', async (keyword) => {
    try {
        const { data } = await axios.get(`${PRODUCTS_URL}?keyword=${keyword}`);
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const productSearchSlice = createSlice({
    name: 'ProductsSearch',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProductSearch.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(getProductSearch.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.products = action.payload.products;
            state.productsCount = action.payload.productCount;
            state.resultPerPage = action.payload.resultPerPage;
            state.filteredProductsCount = action.payload.filteredProductsCount;
        });
        builder.addCase(getProductSearch.rejected, (state, action) => {
            state.status = 'failed';
        });
    },
});
export default productSearchSlice.reducer;

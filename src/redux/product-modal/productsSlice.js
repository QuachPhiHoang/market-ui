import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products: [],
    productsCount: null,
    status: 'idle',
    error: null,
};
const PRODUCTS_URL = `http://localhost:8080/api/products`;

export const getProducts = createAsyncThunk('product/getProducts', async (obj) => {
    try {
        if (Object.keys(obj).length > 0) {
            const { data } = await axios.get(
                `${PRODUCTS_URL}?keyword=${obj.keyword || ''}&page=${obj.currentPage || 1}&price[gte]=${
                    obj.price[0]
                }&price[lte]=${obj.price[1]}&ratings[gte]=${obj.ratings}`,
            );
            return data;
        }
        const { data } = await axios.get(PRODUCTS_URL);
        return data;
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
            state.products = action.payload.products;
            state.productsCount = action.payload.productCount;
            state.resultPerPage = action.payload.resultPerPage;
            state.filteredProductsCount = action.payload.filteredProductsCount;
        });
        builder.addCase(getProducts.rejected, (state, action) => {
            state.status = 'failed';
        });
    },
});
export default productSlice.reducer;

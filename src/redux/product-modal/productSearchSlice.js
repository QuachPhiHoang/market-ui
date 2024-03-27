import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '~/service/axiosInterceptor';

const initialState = {
    products: [],
    product: [],
    status: 'idle',
    error: null,
};
export const getAllProductsSearching = createAsyncThunk('product/getProducts', async (obj) => {
    try {
        const searchParams = new URLSearchParams();
        searchParams.append('page', obj.currentPage ? obj.currentPage : 1);
        if (obj.hasOwnProperty('currentPage')) {
            searchParams.append('page', obj.currentPage);
        } else {
            searchParams.append('page', 1);
        }
        if (obj.keyword) searchParams.append('keyword', obj.keyword);
        if (obj.price[0]) searchParams.append('price[gte]', obj.price[0]);
        if (obj.price[1]) searchParams.append('price[lte]', obj.price[1]);
        if (obj.ratings) searchParams.append('ratings[gte]', obj.ratings);
        if (obj.gender) searchParams.append('gender', obj.gender);
        if (obj.category) searchParams.append('category', obj.category);
        const res = await axiosInstance.get('products?' + searchParams.toString());
        return res.data;
    } catch (error) {
        return error.response.data.message;
    }
});

export const getProductSearch = createAsyncThunk('product/getProductSearch', async (keyword) => {
    try {
        const { data } = await axiosInstance.get(`${'products/search'}?keyword=${keyword}`);
        return data;
    } catch (error) {
        return error.response.data.message;
    }
});

export const productSearchSlice = createSlice({
    name: 'ProductsSearch',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProductsSearching.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(getAllProductsSearching.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.products = action.payload.products;
            state.productsCount = action.payload.productCount;
            state.resultPerPage = action.payload.resultPerPage;
            state.filteredProductsCount = action.payload.filteredProductsCount;
        });
        builder.addCase(getAllProductsSearching.rejected, (state, action) => {
            state.status = 'failed';
        });
        builder.addCase(getProductSearch.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(getProductSearch.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.product = action.payload.products;
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

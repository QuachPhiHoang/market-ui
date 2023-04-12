import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '~/service/axiosInterceptor';

const initialState = {
    products: [],
    productsCount: null,
    status: 'idle',
    error: null,
};

export const getProducts = createAsyncThunk('product/getProducts', async (obj) => {
    try {
        if (Object.keys(obj).length > 0) {
            if (obj.categories.length > 0) {
                const { data } = await axiosInstance.get(
                    `${'products'}?keyword=${obj.keyword || ''}&page=${obj.currentPage || 1}&price[gte]=${
                        obj.price[0]
                    }&price[lte]=${obj.price[1]}&ratings[gte]=${obj.ratings}&categorySlug=${obj.categories}`,
                );
                if (obj.gender.length > 0) {
                    const { data } = await axiosInstance.get(
                        `${'products'}?keyword=${obj.keyword || ''}&page=${obj.currentPage || 1}&price[gte]=${
                            obj.price[0]
                        }&price[lte]=${obj.price[1]}&ratings[gte]=${obj.ratings}&categorySlug=${
                            obj.categories
                        }&gender=${obj.gender}`,
                    );
                    return data;
                }
                return data;
            }
            if (obj.gender.length > 0) {
                const { data } = await axiosInstance.get(
                    `${'products'}?keyword=${obj.keyword || ''}&page=${obj.currentPage || 1}&price[gte]=${
                        obj.price[0]
                    }&price[lte]=${obj.price[1]}&ratings[gte]=${obj.ratings}&gender=${obj.gender}`,
                );
                if (obj.categories.length > 0) {
                    const { data } = await axiosInstance.get(
                        `${'products'}?keyword=${obj.keyword || ''}&page=${obj.currentPage || 1}&price[gte]=${
                            obj.price[0]
                        }&price[lte]=${obj.price[1]}&ratings[gte]=${obj.ratings}&categorySlug=${
                            obj.categories
                        }&gender=${obj.gender}`,
                    );
                    return data;
                }
                return data;
            }
            const { data } = await axiosInstance.get(
                `${'products'}?keyword=${obj.keyword || ''}&page=${obj.currentPage || 1}&price[gte]=${
                    obj.price[0]
                }&price[lte]=${obj.price[1]}&ratings[gte]=${obj.ratings}`,
            );
            return data;
        }
        const { data } = await axiosInstance.get('products');
        return data;
    } catch (error) {
        return error.response.data.message;
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

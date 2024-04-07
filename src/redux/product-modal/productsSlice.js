import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '~/service/axiosInterceptor';

const initialState = {
    products: [],
    productsCount: null,
    status: 'idle',
    error: null,
    product: {},
    isDeleted: false,
    isUpdated: false,
};

export const getProducts = createAsyncThunk('product/getProducts', async (obj) => {
    try {
        const { data } = await axiosInstance.get('products');
        return data;
    } catch (error) {
        return error.response.data.message;
    }
});

export const getAdminProducts = createAsyncThunk('products/getAdminProducts', async () => {
    try {
        const { data } = await axiosInstance.get('products/admin-products', { withCredentials: true });
        return data;
    } catch (error) {
        return error.response.data.message;
    }
});

export const deleteProducts = createAsyncThunk('products/deleteProducts', async (id, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.delete(`products/delete/${id}`, { withCredentials: true });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const createProduct = createAsyncThunk('products/newProduct', async (myForm, { rejectWithValue }) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    };
    try {
        const { data } = await axiosInstance.post('products/create', myForm, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (obj, { rejectWithValue }) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    };
    try {
        const { data } = await axiosInstance.patch(`products/${obj.id}`, obj.myForm, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const productSlice = createSlice({
    name: 'Products',
    initialState,
    reducers: {
        reset: (state) => {
            Object.assign(state, { isDeleted: false, isUpdated: false });
        },
    },
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
        builder.addCase(getAdminProducts.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(getAdminProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.products = action.payload.products;
        });
        builder.addCase(getAdminProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.products = null;
        });
        builder.addCase(deleteProducts.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(deleteProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.isDeleted = action.payload.success;
        });
        builder.addCase(deleteProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.isDeleted = false;
        });
        builder.addCase(createProduct.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.isSuccess = action.payload.success;
            state.product = action.payload.product;
        });
        builder.addCase(createProduct.rejected, (state, action) => {
            state.status = 'failed';
            state.product = {};
        });
        builder.addCase(updateProduct.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.isUpdated = action.payload.success;
            state.product = action.payload.product;
        });
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.status = 'failed';
            state.product = {};
        });
    },
});
export const { reset } = productSlice.actions;
export default productSlice.reducer;

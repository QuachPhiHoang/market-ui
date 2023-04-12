import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '~/service/axiosInterceptor';

const initialState = {
    myOrders: [],
    orders: {},
    error: null,
};

export const createOrder = createAsyncThunk('create/newOrder', async (order, { rejectWithValue }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    };
    try {
        const { data } = await axiosInstance.post('orders/new', order, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const myOrder = createAsyncThunk('get/myOrder', async () => {
    try {
        const { data } = await axiosInstance.get('orders/my-order', { withCredentials: true });
        return data;
    } catch (error) {
        return error.response.data.message;
    }
});

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createOrder.pending, (state, action) => {
            state.status = 'pending';
            state.error = null;
        });
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.orders = action.payload;
            state.error = null;
        });
        builder.addCase(createOrder.rejected, (state, action) => {
            state.status = 'failed';
            state.orders = null;
            state.error = action.payload;
        });
        builder.addCase(myOrder.pending, (state, action) => {
            state.status = 'pending';
            state.error = null;
        });
        builder.addCase(myOrder.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.myOrders = action.payload.orders;
            state.error = null;
        });
        builder.addCase(myOrder.rejected, (state, action) => {
            state.status = 'failed';
            state.myOrders = null;
            state.error = action.payload;
        });
    },
});

export default orderSlice.reducer;

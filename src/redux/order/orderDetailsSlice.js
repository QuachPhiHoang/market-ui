import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '~/service/axiosInterceptor';

const initialState = {
    order: {},
    error: null,
};

export const getOrderDetails = createAsyncThunk('get/OrderDetails', async (id, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get(`orders/${id}`, { withCredentials: true });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOrderDetails.pending, (state, action) => {
            state.status = 'pending';
            state.error = null;
        });
        builder.addCase(getOrderDetails.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.order = action.payload.order;
            state.error = null;
        });
        builder.addCase(getOrderDetails.rejected, (state, action) => {
            state.status = 'failed';
            state.order = null;
            state.error = action.payload;
        });
        // builder.addCase(myOrder.pending, (state, action) => {
        //     state.status = 'pending';
        //     state.error = null;
        // });
        // builder.addCase(myOrder.fulfilled, (state, action) => {
        //     state.status = 'succeeded';
        //     state.myOrders = action.payload.orders;
        //     state.error = null;
        // });
        // builder.addCase(myOrder.rejected, (state, action) => {
        //     state.status = 'failed';
        //     state.myOrders = null;
        //     state.error = action.payload;
        // });
    },
});

export default orderDetailsSlice.reducer;

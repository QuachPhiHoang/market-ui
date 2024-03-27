import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '~/service/axiosInterceptor';

const initialState = {
    success: false,
    error: null,
};

export const createReview = createAsyncThunk('put/newReview', async (obj, { rejectWithValue }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    };
    try {
        const { data } = await axiosInstance.put(`products/review/${obj.id}`, obj.myForm, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(createReview.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(createReview.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.success = action.payload.success;
        });
        builder.addCase(createReview.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
});

export const { reset } = reviewSlice.actions;
export default reviewSlice.reducer;

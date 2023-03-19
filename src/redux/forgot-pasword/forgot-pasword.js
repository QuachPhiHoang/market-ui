import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const USERFORGOTASSWORD_URL = `http://localhost:8080/api/auth/password/forgot`;
const USERRESETPASSWORD_URL = `http://localhost:8080/api/auth/password/reset/`;
const initialState = {
    error: null,
    message: null,
    success: null,
};

export const forgotPassword = createAsyncThunk('profile/forgotPassword', async (email, { rejectWithValue }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const { data } = await axios.post(USERFORGOTASSWORD_URL, email, config);
        toast.success('send email success', { draggable: true, position: toast.POSITION.BOTTOM_CENTER });
        return { data };
    } catch (error) {
        toast.error(error.response.data.message, { draggable: true, position: toast.POSITION.BOTTOM_CENTER });

        return rejectWithValue(error.response.data.message);
    }
});

export const resetPassword = createAsyncThunk('profile/resetPassword', async (obj, { rejectWithValue }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const { data } = await axios.put(`${USERRESETPASSWORD_URL}${obj.token.token}`, obj.password, config);
        toast.success('reset password success', { draggable: true, position: toast.POSITION.BOTTOM_CENTER });
        return data;
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message, { draggable: true, position: toast.POSITION.BOTTOM_CENTER });
        return rejectWithValue(error.response.data.message);
    }
});

export const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(forgotPassword.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(forgotPassword.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.message = action.payload;
        });
        builder.addCase(forgotPassword.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
        builder.addCase(resetPassword.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.success = action.payload.success;
        });
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
});

export default forgotPasswordSlice.reducer;

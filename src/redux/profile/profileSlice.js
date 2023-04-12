import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance from '~/service/axiosInterceptor';

const initialState = {
    error: null,
    isUpdate: false,
};

export const updateProfile = createAsyncThunk('profile/UpdateProfile', async (myForm, { rejectWithValue }) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    };
    try {
        const { data } = await axiosInstance.put('auth/update/profile', myForm, config);
        toast.success('update profile success', { draggable: true, position: toast.POSITION.BOTTOM_CENTER });
        return data;
    } catch (error) {
        toast.error(error.response.data.message, { draggable: true, position: toast.POSITION.BOTTOM_CENTER });
        return rejectWithValue(error.response.data.message);
    }
});

export const updatePassword = createAsyncThunk('profile/UpdatePassword', async ({ password }, { rejectWithValue }) => {
    const config = {
        withCredentials: true,
    };
    try {
        const { data } = await axiosInstance.put('auth/update/password', password, config);
        toast.success('update profile success', { draggable: true, position: toast.POSITION.BOTTOM_CENTER });
        return data;
    } catch (error) {
        toast.error(error.response.data, { draggable: true, position: toast.POSITION.BOTTOM_CENTER });
        return rejectWithValue(error.response.data);
    }
});

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        reset: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(updateProfile.pending, (state, action) => {
            state.status = 'loading';
            state.isUpdate = false;
        });
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.isUpdate = action.payload.success;
        });
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
            state.isUpdate = false;
        });
        builder.addCase(updatePassword.pending, (state, action) => {
            state.status = 'loading';
            state.isUpdate = false;
        });
        builder.addCase(updatePassword.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.isUpdate = action.payload.success;
        });
        builder.addCase(updatePassword.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
            state.isUpdate = false;
        });
    },
});
export const { reset } = profileSlice.actions;

export default profileSlice.reducer;

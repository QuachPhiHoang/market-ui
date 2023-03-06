import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const USERUPDATEPROFILE_URL = `http://localhost:8080/api/auth/update/profile`;
const LOADUSER_URL = `http://localhost:8080/api/auth/me`;
const initialState = {
    error: null,
    isUpdate: false,
    user: {},
    isAuthenticated: false,
    isLoggedIn: false,
};

export const updateProfile = createAsyncThunk('user/UpdateProfile', async (myForm, { rejectWithValue }) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    };
    try {
        const { data } = await axios.put(USERUPDATEPROFILE_URL, myForm, config);
        toast.success('update success', { draggable: true, position: toast.POSITION.BOTTOM_CENTER });
        return data;
    } catch (error) {
        toast.error(error.response.data.message, { draggable: true, position: toast.POSITION.BOTTOM_CENTER });
        return rejectWithValue(error.response.data.message);
    }
});

export const loadUser = createAsyncThunk('user/LoadUser', async () => {
    try {
        const { data } = await axios.get(LOADUSER_URL);
        return data;
    } catch (error) {
        return error;
    }
});

export const profileSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateProfile.pending, (state, action) => {
            state.status = 'loading';
            state.isUpdate = false;
        });
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.isUpdate = true;
        });
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
            state.isUpdate = false;
        });
        builder.addCase(loadUser.pending, (state, action) => {
            state.status = 'loading';
            state.user = {};
            state.isUpdate = false;
            state.isAuthenticated = false;
        });
        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isLoggedIn = true;
            state.error = null;
        });
        builder.addCase(loadUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
            state.isUpdate = false;
            state.isAuthenticated = false;
            state.isLoggedIn = false;
        });
    },
});

export default profileSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const USERLOGIN_URL = `http://localhost:8080/api/auth/login`;
const USERREGISTER_URL = `http://localhost:8080/api/auth/register`;
const USERLOGOUT_URL = `http://localhost:8080/api/auth/logout`;
const initialState = {
    user: {},
    isAuthenticated: false,
    isLoggedIn: false,
    error: null,
};

export const login = createAsyncThunk('user/LoginUser', async ({ username, password }, { rejectWithValue }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredential: true,
    };
    try {
        const response = await axios.post(USERLOGIN_URL, { username, password }, config);
        // if (Object.keys(response.data.user).length > 0) {
        //     toast.success('login success', { draggable: true, position: toast.POSITION.BOTTOM_CENTER });
        // }
        if (!response.data.error) {
            toast.success('login success', { draggable: true, position: toast.POSITION.BOTTOM_CENTER });
        }
        return response.data;
    } catch (error) {
        // if (error.response.status === 401) {
        //     toast.error(error.response.data.message, { draggable: true, position: toast.POSITION.BOTTOM_CENTER });
        // } else {
        //     toast.error(error.response.data.message, { draggable: true, position: toast.POSITION.BOTTOM_CENTER });
        // }
        toast.error(error.response.data.message, { draggable: true, position: toast.POSITION.BOTTOM_CENTER });
        return rejectWithValue(error.response.data.message);
    }
});

export const register = createAsyncThunk('user/RegisterUser', async (myForm, { rejectWithValue }) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredential: true,
    };
    try {
        const response = await axios.post(USERREGISTER_URL, myForm, config);
        // if (Object.keys(response.data.user).length > 0) {
        //     toast.success('register success', { draggable: true, position: toast.POSITION.BOTTOM_CENTER });
        // }
        if (!response.data.error) {
            toast.success('login success', { draggable: true, position: toast.POSITION.BOTTOM_CENTER });
        }
        return response.data.user;
    } catch (error) {
        toast.error(error.response.data.message, { draggable: true, position: toast.POSITION.BOTTOM_CENTER });
        return rejectWithValue(error.response.data.message);
    }
});

export const logOut = createAsyncThunk('user/Logout', async () => {
    try {
        const response = await axios.get(USERLOGOUT_URL);
        console.log(response);
        return response.data.user;
        // await axios.get(USERLOGOUT_URL);
    } catch (error) {
        return error.response.data.message;
    }
});

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.status = 'loading';
            state.isLoggedIn = false;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
            state.isLoggedIn = true;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.status = 'failed';
            state.isLoggedIn = false;
            state.user = null;
            state.error = action.payload;
        });
        builder.addCase(register.pending, (state, action) => {
            state.status = 'loading';
            state.isAuthenticated = false;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
            state.isAuthenticated = true;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.status = 'failed';
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        });
        builder.addCase(logOut.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(logOut.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = null;
            state.isAuthenticated = false;
            state.isLoggedIn = false;
        });
        builder.addCase(logOut.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
});

export default userSlice.reducer;

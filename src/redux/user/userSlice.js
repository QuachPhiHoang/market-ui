import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const USERLOGIN_URL = `http://localhost:8080/api/auth/login`;
const USERREGISTER_URL = `http://localhost:8080/api/auth/register`;
const USERLOGOUT_URL = `http://localhost:8080/api/auth/logout`;
const LOADUSER_URL = `http://localhost:8080/api/auth/me`;
const REFRESHTOKEN_URL = `http://localhost:8080/api/auth/refresh`;
const initialState = {
    user: {},
    isAuthenticated: false,
    error: null,
    isLoggedIn: false,
};

export const login = createAsyncThunk('user/LoginUser', async ({ username, password }, { rejectWithValue }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    };
    try {
        const { data } = await axios.post(USERLOGIN_URL, { username, password }, config);
        toast.success('login success', { draggable: true, position: toast.POSITION.BOTTOM_CENTER });
        return data;
    } catch (error) {
        toast.error(error.response.data.message, { draggable: true, position: toast.POSITION.BOTTOM_CENTER });
        return rejectWithValue(error.response.data.message);
    }
});

export const register = createAsyncThunk('user/RegisterUser', async (myForm, { rejectWithValue }) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    };
    try {
        const { data } = await axios.post(USERREGISTER_URL, myForm, config);
        toast.success('register success', { draggable: true, position: toast.POSITION.BOTTOM_CENTER });
        return data;
    } catch (error) {
        toast.error(error.response.data.message, { draggable: true, position: toast.POSITION.BOTTOM_CENTER });
        return rejectWithValue(error.response.data.message);
    }
});

export const logOut = createAsyncThunk('user/Logout', async () => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    };
    try {
        const { data } = await axios.get(USERLOGOUT_URL, config);
        return data;
    } catch (error) {
        return error.response.data.message;
    }
});
export const loadUser = createAsyncThunk('user/LoadUser', async () => {
    try {
        const { data } = await axios.get(LOADUSER_URL, { withCredentials: true });
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
});

export const refreshToken = createAsyncThunk('user/RefreshToken', async () => {
    try {
        const { data } = await axios.get(REFRESHTOKEN_URL, { withCredentials: true });
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
});

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.status = 'loading';
            state.isLoggedIn = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isLoggedIn = true;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
            state.user = null;
            state.isLoggedIn = false;
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
        });
        builder.addCase(logOut.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
        builder.addCase(loadUser.pending, (state, action) => {
            state.status = 'loading';
            state.isAuthenticated = false;
        });
        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        });
        builder.addCase(loadUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
            state.isAuthenticated = false;
            state.user = null;
        });
        builder.addCase(refreshToken.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user.accessToken = action.payload;
            state.isAuthenticated = true;
        });
        builder.addCase(refreshToken.pending, (state, action) => {
            state.status = 'loading';
            state.isAuthenticated = null;
        });
        builder.addCase(refreshToken.rejected, (state, action) => {
            state.status = 'failed';
            state.user.accessToken = null;
            state.isAuthenticated = false;
        });
    },
});

export default userSlice.reducer;

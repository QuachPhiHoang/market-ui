import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const USERLOGIN_URL = `http://localhost:8080/api/auth/login`;
const USERREGISTER_URL = `http://localhost:8080/api/auth/register`;
const USERLOGOUT_URL = `http://localhost:8080/api/auth/logout`;
const USERUPDATEPROFILE_URL = `http://localhost:8080/api/auth/update/profile`;
const LOADUSER_URL = `http://localhost:8080/api/auth/me`;
const initialState = {
    user: {},
    isAuthenticated: false,
    isLoggedIn: false,
    error: null,
    isUpdate: false,
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
    try {
        const { data } = await axios.get(USERLOGOUT_URL, { withCredentials: true });
        return data;
    } catch (error) {
        return error.response.data.message;
    }
});
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
            state.isAuthenticated = true;
            state.isLoggedIn = true;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
            state.user = null;
        });
        builder.addCase(register.pending, (state, action) => {
            state.status = 'loading';
            state.isAuthenticated = false;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isLoggedIn = true;
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

export default userSlice.reducer;

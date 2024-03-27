import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '~/service/axiosInterceptor';

const initialState = {
    errorMessage: null,
    status: 'idle',
    success: null,
    message: null,
    color: {},
    colors: [],
    isDeleted: false,
};

export const createColor = createAsyncThunk('color/createColor', async (myForm, { rejectWithValue }) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    };
    try {
        const { data } = await axiosInstance.post('color/create', myForm, config);
        return data;
    } catch (error) {
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
});
export const getAllColor = createAsyncThunk('colors/getAllColor', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get('color/all', { withCredentials: true });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const updateColor = createAsyncThunk('color/updateColor', async (obj, { rejectWithValue }) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    };
    try {
        const { data } = await axiosInstance.put(`color/${obj.id}`, obj.myForm, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const deleteColor = createAsyncThunk('color/delete', async (id, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.delete(`color/delete/${id}`, { withCredentials: true });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const colorSlice = createSlice({
    name: 'colors',
    initialState,
    reducers: {
        reset: (state) => {
            Object.assign(state, { isDeleted: false, success: false });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createColor.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(createColor.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.success = true;
            state.color = action.payload.newColor;
        });
        builder.addCase(createColor.rejected, (state, action) => {
            state.status = 'failed';
            state.errorMessage = action.payload;
        });
        builder.addCase(getAllColor.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(getAllColor.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.success = true;
            state.colors = action.payload.colors;
        });
        builder.addCase(getAllColor.rejected, (state, action) => {
            state.status = 'failed';
            state.errorMessage = action.payload;
        });
        builder.addCase(updateColor.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(updateColor.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.success = true;
            state.color = action.payload.updateColor;
        });
        builder.addCase(updateColor.rejected, (state, action) => {
            state.status = 'failed';
            state.errorMessage = action.payload;
        });
        builder.addCase(deleteColor.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(deleteColor.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.success = true;
            state.isDeleted = true;
        });
        builder.addCase(deleteColor.rejected, (state, action) => {
            state.status = 'failed';
            state.isDeleted = false;
            state.errorMessage = action.payload;
        });
    },
});
export const { reset } = colorSlice.actions;
export default colorSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '~/service/axiosInterceptor';

const initialState = {
    errorMessage: null,
    status: 'idle',
    success: null,
    message: null,
    size: {},
    sizes: [],
    isDeleted: false,
};

export const createSize = createAsyncThunk('size/createSize', async (myForm, { rejectWithValue }) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    };
    try {
        const { data } = await axiosInstance.post('size/create', myForm, config);
        return data;
    } catch (error) {
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);
    }
});
export const getAllSize = createAsyncThunk('sizes/getAllSize', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.get('size/all', { withCredentials: true });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const updateSize = createAsyncThunk('size/updateSize', async (obj, { rejectWithValue }) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    };
    try {
        const { data } = await axiosInstance.put(`size/${obj.id}`, obj.myForm, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const deleteSize = createAsyncThunk('size/delete', async (id, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.delete(`size/delete/${id}`, { withCredentials: true });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const sizeSlice = createSlice({
    name: 'sizes',
    initialState,
    reducers: {
        reset: (state) => {
            Object.assign(state, { isDeleted: false, success: false });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createSize.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(createSize.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.success = true;
            state.size = action.payload.newSize;
        });
        builder.addCase(createSize.rejected, (state, action) => {
            state.status = 'failed';
            state.errorMessage = action.payload;
        });
        builder.addCase(getAllSize.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(getAllSize.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.success = true;
            state.sizes = action.payload.sizes;
        });
        builder.addCase(getAllSize.rejected, (state, action) => {
            state.status = 'failed';
            state.errorMessage = action.payload;
        });
        builder.addCase(updateSize.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(updateSize.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.success = true;
            state.size = action.payload.updateSize;
        });
        builder.addCase(updateSize.rejected, (state, action) => {
            state.status = 'failed';
            state.errorMessage = action.payload;
        });
        builder.addCase(deleteSize.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(deleteSize.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.success = true;
            state.isDeleted = true;
        });
        builder.addCase(deleteSize.rejected, (state, action) => {
            state.status = 'failed';
            state.isDeleted = false;
            state.errorMessage = action.payload;
        });
    },
});
export const { reset } = sizeSlice.actions;
export default sizeSlice.reducer;

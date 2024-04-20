import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance from '~/service/axiosInterceptor';

const initialState = {
    errorMessage: null,
    success: null,
    variant: {},
    variants: [],
    isUpdate: false,
    isDeleted: false,
};
export const createVariant = createAsyncThunk('variants/createVariant', async ({ id, vars }, { rejectWithValue }) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    };
    try {
        console.log('var in slice', vars);
        const { data } = await axiosInstance.post(`variants/create/${id}`, { vars }, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const getVariant = createAsyncThunk('variants/getVariant', async (id, { rejectWithValue }) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    };
    try {
        const { data } = await axiosInstance.get(`variants/${id}`, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const updateVariant = createAsyncThunk('variants/updateVariant', async ({ id, myForm }, { rejectWithValue }) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    };
    try {
        const { data } = await axiosInstance.put(`variants/${id}`, myForm, config);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data?.message);
    }
});

export const deleteVariant = createAsyncThunk('variants/deleteVariant', async (id, { rejectWithValue }) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    };
    try {
        const { data } = await axiosInstance.delete(`variants/delete/${id}`, config);
        return data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data?.message);
    }
});

export const variantSlice = createSlice({
    name: 'variants',
    initialState,
    reducers: {
        reset: (state) => {
            Object.assign(state, { isDeleted: false, isUpdate: false });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createVariant.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(createVariant.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.success = true;
            state.variant = action.payload.newVariants;
        });
        builder.addCase(createVariant.rejected, (state, action) => {
            state.status = 'failed';
            state.errorMessage = action.payload;
        });
        builder.addCase(getVariant.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(getVariant.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.success = true;
            state.variant = action.payload.variant;
        });
        builder.addCase(getVariant.rejected, (state, action) => {
            state.status = 'failed';
            state.errorMessage = action.payload;
        });
        builder.addCase(updateVariant.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(updateVariant.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.success = true;
            state.isUpdate = true;
            state.variant = action.payload.updatedVariant;
        });
        builder.addCase(updateVariant.rejected, (state, action) => {
            state.status = 'failed';
            state.isUpdate = false;
            state.errorMessage = action.payload;
        });
        builder.addCase(deleteVariant.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(deleteVariant.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.success = true;
            state.isDeleted = true;
        });
        builder.addCase(deleteVariant.rejected, (state, action) => {
            state.status = 'failed';
            state.isDeleted = false;
            state.errorMessage = action.payload;
        });
    },
});
export const { reset } = variantSlice.actions;
export default variantSlice.reducer;

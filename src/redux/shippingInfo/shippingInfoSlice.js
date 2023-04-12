import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    shippingInfo: {},
    error: null,
};

export const saveShippingInfo = createAsyncThunk('saveInfo/Shipping', async (obj, ThunkAPI) => {
    try {
        const { data } = ThunkAPI.dispatch(saveToInfo(obj));
        localStorage.setItem('shippingInfo', JSON.stringify(ThunkAPI.getState().shipping.shippingInfo));
        return data;
    } catch (error) {
        return ThunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const shippingInfoSlice = createSlice({
    name: 'shipping',
    initialState,
    reducers: {
        saveToInfo: (state, action) => {
            return {
                ...state,
                shippingInfo: action.payload,
            };
        },
    },
});

export const { saveToInfo } = shippingInfoSlice.actions;
export default shippingInfoSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    product: [],
};

export const productCartSlice = createSlice({
    name: 'productCart',
    initialState,
    reducers: {
        set: (state, action) => {
            state.product = action.payload;
        },
        remove: (state) => {
            state.product = [];
        },
    },
});

export const { set, remove } = productCartSlice.actions;
export default productCartSlice.reducer;

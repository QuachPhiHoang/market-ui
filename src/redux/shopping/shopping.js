import { createSlice } from '@reduxjs/toolkit';

const items = localStorage.getItem('cartItem') !== null ? JSON.parse(localStorage.getItem('cartItem')) : [];

const initialState = { value: items };

export const cartItemSlice = createSlice({
    name: 'CartItem',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItems = action.payload;

            const duplicate = findItems(state.value, newItems);

            if (duplicate.length > 0) {
                state.value = delItems(state.value, newItems);

                state.value = [
                    ...state.value,
                    {
                        ...newItems,
                        id: duplicate[0].id,
                        quantity: newItems.quantity + duplicate[0].quantity,
                    },
                ];
            } else {
                state.value = [
                    ...state.value,
                    {
                        ...newItems,
                        id: state.value.length > 0 ? state.value[state.value.length - 1].id + 1 : 1,
                    },
                ];
            }

            localStorage.setItem('cartItem', JSON.stringify(sortItems(state.value)));
        },
        updateItem: (state, action) => {
            const itemsUpdate = action.payload;

            const item = findItems(state.value, itemsUpdate);

            if (item.length > 0) {
                state.value = delItems(state.value, itemsUpdate);
                state.value = [
                    ...state.value,
                    {
                        ...itemsUpdate,
                        id: item[0].id,
                    },
                ];
                localStorage.setItem('cartItem', JSON.stringify(sortItems(state.value)));
            }
        },
        removeItem: (state, action) => {
            const delItem = action.payload;
            state.value = delItems(state.value, delItem);
            localStorage.setItem('cartItem', JSON.stringify(sortItems(state.value)));
        },
    },
});

const findItems = (arr, item) =>
    arr.filter(
        (e) => e.slug === item.slug && e.color === item.color && e.size === item.size && e.gender === item.gender,
    );
const delItems = (arr, item) =>
    arr.filter(
        (e) => e.slug !== item.slug || e.color !== item.color || e.size !== item.size || e.gender !== item.gender,
    );

const sortItems = (arr) => arr.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
export const { addItem, updateItem, removeItem } = cartItemSlice.actions;
export default cartItemSlice.reducer;

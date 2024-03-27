import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '~/service/axiosInterceptor';

const initialState = {
    cartItems: [],
    isLoading: false,
    error: null,
};

export const addItemsToCart = createAsyncThunk('addItem/Cart', async (obj, ThunkAPI) => {
    try {
        const { data } = await axiosInstance.get(`${'products/find/'}${obj.id}`);
        const cart = ThunkAPI.dispatch(
            addToCart({
                product: data._id,
                name: data.name,
                price: data.price,
                image: data.img,
                stock: data.stock,
                size: obj.size,
                color: obj.color,
                quantity: obj.quantity,
            }),
        );
        localStorage.setItem('cartItems', JSON.stringify(ThunkAPI.getState().cart.cartItems));
        return cart;
    } catch (error) {
        return ThunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const removeItemsFromCart = createAsyncThunk('removeItem/Cart', async (id, ThunkAPI) => {
    try {
        const { data } = ThunkAPI.dispatch(removeFromCart(id));
        localStorage.setItem('cartItems', JSON.stringify(ThunkAPI.getState().cart.cartItems));
        return data;
    } catch (error) {
        return ThunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const updateItemsFromCart = createAsyncThunk('updateItem/Cart', async (obj, ThunkAPI) => {
    try {
        const { data } = ThunkAPI.dispatch(updateFromCart({ obj }));
        localStorage.setItem('cartItems', JSON.stringify(ThunkAPI.getState().cart.cartItems));
        return data;
    } catch (error) {
        return ThunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const items = action.payload;
            const isItemExits = state.cartItems.find(
                (i) => i.product === items.product && i.size === items.size && i.color === items.color,
            );
            if (isItemExits) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i.product === isItemExits.product ? { ...items, quantity: isItemExits.quantity + 1 } : i,
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, items],
                };
            }
        },
        removeFromCart: (state, action) => {
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (i) =>
                        i.product !== action.payload.product ||
                        i.size !== action.payload.size ||
                        i.color !== action.payload.color,
                ),
            };
        },
        updateFromCart: (state, action) => {
            const itemUpdate = action.payload.obj.products;
            const check = state.cartItems.find(
                (i) => i.product === itemUpdate.product && i.size === itemUpdate.size && i.color === itemUpdate.color,
            );
            if (check) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((items) =>
                        items.product === check.product && items.size === check.size && items.color === check.color
                            ? {
                                  ...itemUpdate,
                                  quantity: action.payload.obj.newQuantity,
                              }
                            : items,
                    ),
                };
            }
        },
    },
});
export const { addToCart, removeFromCart, updateFromCart } = cartSlice.actions;
export default cartSlice.reducer;

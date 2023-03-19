import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const GETPRODUCT_URL = 'http://localhost:8080/api/products/find/';

const initialState = {
    cartItems: [],
    isLoading: false,
    error: null,
};

export const addItemsToCart = createAsyncThunk('addItem/Cart', async (obj, ThunkAPI) => {
    try {
        const { data } = await axios.get(`${GETPRODUCT_URL}${obj.id}`);
        const cart = ThunkAPI.dispatch(
            addToCart({
                product: data._id,
                name: data.name,
                price: data.price,
                // image: data?.product?.images[0]?.url,
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
        console.log(error.response.data.message);
        return ThunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const removeItemsFromCart = createAsyncThunk('removeItem/Cart', async (id, ThunkAPI) => {
    try {
        const { data } = ThunkAPI.dispatch(removeFromCart(id));
        localStorage.setItem('cartItems', JSON.stringify(ThunkAPI.getState().cart.cartItems));
        return data;
    } catch (error) {
        console.log(error.response.data.message);
        return ThunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const items = action.payload;
            const isItemExits = state.cartItems.find((i) => i.product === items.product && i.size && i.color);
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
                cartItems: state.cartItems.filter((i) => i.product !== action.payload),
            };
        },
    },
    extraReducers: (builder) => {},
});
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

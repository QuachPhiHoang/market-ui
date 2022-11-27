import { configureStore } from '@reduxjs/toolkit';

import productDetailSlice from './product-modal/productDetailSlice';
import productSlice from './product-modal/productsSlice';

import cartItemSlice from './shopping/shopping';

export const store = configureStore({
    reducer: {
        productDetailSlice: productDetailSlice,
        product: productSlice,
        cartItems: cartItemSlice,
    },
});

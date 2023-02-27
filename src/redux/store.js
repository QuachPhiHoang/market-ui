import { configureStore } from '@reduxjs/toolkit';

import productDetailSlice from './product-modal/productDetailSlice';
import productSearchSlice from './product-modal/productSearchSlice';
import productSlice from './product-modal/productsSlice';
import userSlice from './user/userSlice';

import cartItemSlice from './shopping/shopping';

export const store = configureStore({
    reducer: {
        productDetailSlice: productDetailSlice,
        productSearch: productSearchSlice,
        products: productSlice,
        cartItems: cartItemSlice,
        user: userSlice,
    },
});

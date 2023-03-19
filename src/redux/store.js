import { configureStore } from '@reduxjs/toolkit';

import productDetailSlice from './product-modal/productDetailSlice';
import productSearchSlice from './product-modal/productSearchSlice';
import productSlice from './product-modal/productsSlice';
import userSlice from './user/userSlice';
import profileSlice from './profile/profileSlice';

// import cartItemSlice from './shopping/shopping';
import forgotPasswordSlice from './forgot-pasword/forgot-pasword';
import cartSlice from './cart/cartSlice';

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        //   shippingInfo: localStorage.getItem("shippingInfo")
        //     ? JSON.parse(localStorage.getItem("shippingInfo"))
        //     : {},
    },
};

export const store = configureStore({
    reducer: {
        productDetailSlice: productDetailSlice,
        productSearch: productSearchSlice,
        products: productSlice,
        user: userSlice,
        profile: profileSlice,
        forgotPassword: forgotPasswordSlice,
        cart: cartSlice,
    },
    initialState,
});

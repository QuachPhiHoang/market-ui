import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

import productDetailSlice from './product-modal/productDetailSlice';
import productSearchSlice from './product-modal/productSearchSlice';
import productSlice from './product-modal/productsSlice';
import userSlice from './user/userSlice';
import profileSlice from './profile/profileSlice';

import forgotPasswordSlice from './forgot-pasword/forgot-pasword';
import cartSlice from './cart/cartSlice';
import shippingInfoSlice from './shippingInfo/shippingInfoSlice';
import orderSlice from './order/orderSlice';
import orderDetailsSlice from './order/orderDetailsSlice';
import reviewsSlice from './reviews/reviewsSlice';
import colorSlice from './color/colorSlice';
import sizeSlice from './size/sizeSlice';
import variantSlice from './variant/variantSlice';

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    whitelist: ['user', 'cart'],
};

const reducer = combineReducers({
    productDetailSlice: productDetailSlice,
    productSearch: productSearchSlice,
    products: productSlice,
    user: userSlice,
    profile: profileSlice,
    forgotPassword: forgotPasswordSlice,
    cart: cartSlice,
    shipping: shippingInfoSlice,
    order: orderSlice,
    orderDetails: orderDetailsSlice,
    reviews: reviewsSlice,
    colors: colorSlice,
    sizes: sizeSlice,
    variants: variantSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

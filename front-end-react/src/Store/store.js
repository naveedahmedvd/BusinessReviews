import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './apiSlice';
import authReducer from './AuthSlice';
import applicationReducer from './ApplicationSlice';
import restaurantReducer from './RestaurantsSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        application: applicationReducer,
        restaurant: restaurantReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})
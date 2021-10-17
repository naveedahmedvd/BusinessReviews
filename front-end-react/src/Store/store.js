import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './apiSlice';
import authReducer from './AuthSlice';
import applicationReducer from './ApplicationSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        application: applicationReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})
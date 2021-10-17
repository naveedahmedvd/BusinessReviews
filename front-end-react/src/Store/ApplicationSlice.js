import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    application: null
}

export const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        setApplication: (state, action) => {
            state.application = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setApplication } = applicationSlice.actions

export default applicationSlice.reducer
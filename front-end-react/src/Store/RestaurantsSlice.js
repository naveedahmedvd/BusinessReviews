import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedPlaceFromAutocomplete: null
}

export const restaurantsSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        setSelectedPlaceFromAutocomplete: (state, action) => {
            state.selectedPlaceFromAutocomplete = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setSelectedPlaceFromAutocomplete } = restaurantsSlice.actions

export default restaurantsSlice.reducer
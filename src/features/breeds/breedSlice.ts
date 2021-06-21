import {  createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BreedState {
    breedSelected: string;
    subBreedSelected: string;
}

const initialState: BreedState = {
    breedSelected: "",
    subBreedSelected: "",
}

export const breedSlice = createSlice({
    name: 'breed',
    initialState,
    reducers: {
        setBreed : (state, action: PayloadAction<string>) => {
            state.breedSelected = action.payload;
        },
        setSubBreed : (state, action: PayloadAction<string>) => {
            state.subBreedSelected = action.payload;
        },
    },
  })

export const { setBreed, setSubBreed } = breedSlice.actions;

export default breedSlice.reducer
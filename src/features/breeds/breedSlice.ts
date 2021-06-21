import {  createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BreedState {
    breedSelected: string;
    subBreedSelected: string;
    favorites: string[];
}

function getInitialState():BreedState {
    const favoritesRaw: string | null = window.localStorage.getItem("favorites");
    const favorites: string[] = favoritesRaw ? JSON.parse(favoritesRaw) : [];
    return  {
        breedSelected: "",
        subBreedSelected: "",
        favorites
    }
}

const initialState = getInitialState();

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
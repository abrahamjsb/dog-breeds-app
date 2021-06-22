import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useFetchBreedsQuery } from "../services/api";
import { getDefaultBreed } from '../utils/utils';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useBreeds() {
    const { data, isLoading } = useFetchBreedsQuery("");
    const { breedSelected, subBreedSelected, favorites } = useAppSelector(
      (store) => store.breed
    );
    const breeds = data ? Object.keys(data.message) : [];
    const defaultBreed = getDefaultBreed(favorites, breeds);
    const currentBreed = breedSelected || defaultBreed;
    const subBreedList = getSubBreedList(currentBreed, data);
    useEffect(() => {
        window.addEventListener('beforeunload', () => {
            window.localStorage.setItem("favorites", JSON.stringify(favorites));
        })
        return () => {
            window.removeEventListener('beforeunload', () => {
                window.localStorage.setItem("favorites", JSON.stringify(favorites));
            })
        } 
    } ,[favorites.toString()])
    return { isLoading, breedSelected: currentBreed, subBreedSelected, breeds, subBreedList: subBreedList, favorites };
}

function getSubBreedList(breedSelected: string, data: any) {
    return breedSelected && data ? data.message[breedSelected] : []
}
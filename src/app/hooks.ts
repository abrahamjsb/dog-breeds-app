import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useFetchBreedsQuery } from "../services/api";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useBreeds() {
    const { data, isLoading } = useFetchBreedsQuery("");
    const { breedSelected, subBreedSelected } = useAppSelector(
      (store) => store.breed
    );
    const breeds = data ? Object.keys(data.message) : [];
    const subBreedList = breedSelected && data ? data.message[breedSelected] : [];
  
    return { isLoading, breedSelected, subBreedSelected, breeds, subBreedList };
}
import { API_URL } from "../utils/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Response } from "../utils/types";

export const breedsDogApi = createApi({
  reducerPath: "breedsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    fetchBreeds: builder.query({
      query: () => `/breeds/list/all`,
    }),
    fetchBreedImages: builder.query<Response, string>({
      query: (breed) => `/breed/${breed}/images`
    }),
    fetchSubBreedImages: builder.query<Response, {breed:string; subBreed:string}>({
      query: ({breed, subBreed}) => `/breed/${breed}/${subBreed}/images`
    })
  }),
});

export const { useFetchBreedsQuery, useFetchBreedImagesQuery, useFetchSubBreedImagesQuery } = breedsDogApi;
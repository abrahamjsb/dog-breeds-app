import { API_URL } from "../utils/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const breedsDogApi = createApi({
  reducerPath: "breedsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    fetchBreeds: builder.query({
      query: () => `/breeds/list/all`,
    }),
  }),
});

export const { useFetchBreedsQuery } = breedsDogApi;
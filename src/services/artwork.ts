import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Artwork = {
  api_model: string;
  is_boosted: boolean;
  api_link: string;
  id: number;
  title: string;
};

type ListArtworksResponse = {
  data: Artwork[];
};

type GetArtworkResponse = {
  data: Artwork;
};

export const artworkApi = createApi({
  reducerPath: 'artworkApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://corsproxy.io/?https://api.artic.edu/api/v1' }),
  endpoints: builder => ({
    listArtworks: builder.query<ListArtworksResponse, string>({
      query: () => `/artworks?limit=20`,
    }),
    getArtwork: builder.query<GetArtworkResponse, string>({
      query: id => `/artworks/${id}`,
    }),
  }),
});

export const { useListArtworksQuery, useGetArtworkQuery } = artworkApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Artwork = {
  id: number;
  title: string;
  image_id: string;
};

type ListArtworksResponse = {
  data: Artwork[];
  config: {
    iiif_url: string;
  };
};

type GetArtworkResponse = {
  data: Artwork;
};

export const artworkApi = createApi({
  reducerPath: 'artworkApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://corsproxy.io/?https://api.artic.edu/api/v1' }),
  endpoints: builder => ({
    listArtworks: builder.query<ListArtworksResponse, string>({
      query: () => `/artworks?limit=10`,
    }),
    getArtwork: builder.query<GetArtworkResponse, string>({
      query: id => `/artworks/${id}`,
    }),
  }),
});

export const { useListArtworksQuery, useGetArtworkQuery } = artworkApi;

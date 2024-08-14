import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type ArtworkData = {
  id: number;
  title: string;
  image_id: string;
};

type ArtworkConfig = {
  iiif_url: string;
};

type ListArtworksResponse = {
  data: ArtworkData[];
  config: ArtworkConfig;
};

type GetArtworkResponse = {
  data: ArtworkData;
  config: ArtworkConfig;
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

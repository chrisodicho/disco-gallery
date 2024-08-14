import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ArtworkConfig, ArtworkData } from '../types';

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
      query: () => `/artworks?limit=12&fields=id,title,image_id`,
    }),
    getArtwork: builder.query<GetArtworkResponse, string>({
      query: id => `/artworks/${id}?fields=id,title,image_id,credit_line`,
    }),
  }),
});

export const { useListArtworksQuery, useGetArtworkQuery } = artworkApi;

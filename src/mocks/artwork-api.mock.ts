import { http, HttpResponse } from 'msw';

const handlers = [
  http.get('http://localhost/artworks', () => {
    const mockApiResponse = {
      data: [],
      config: {
        iiif_url: 'http://fake-iiif-url.com',
      },
    };

    return HttpResponse.json(mockApiResponse);
  }),
];

export { handlers };

import { http, HttpResponse } from 'msw';

const handlers = [
  http.get('http://localhost/artworks', () =>
    HttpResponse.json({
      data: [],
      config: {
        iiif_url: 'http://fake-iiif-url.com',
      },
    }),
  ),
  http.get('http://localhost/artworks/FAKE_ID', () =>
    HttpResponse.json({
      data: null,
      config: {
        iiif_url: 'http://fake-iiif-url.com',
      },
    }),
  ),
];

export { handlers };

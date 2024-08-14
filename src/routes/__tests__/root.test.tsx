import { render, screen } from '../../test-utils';
import { Root } from '../root';

import { server } from '../../mocks/server';
import { http, HttpResponse } from 'msw';
import { store } from '../../store';
import { artworkApi } from '../../services/artwork';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  store.dispatch(artworkApi.util.resetApiState());
});

describe('Root route', () => {
  test('renders initial loading state', () => {
    render(<Root />);
    const linkElement = screen.getByText(/Loading.../i);
    expect(linkElement).toBeInTheDocument();
  });

  describe('when data is empty', () => {
    test('renders an empty state', async () => {
      render(<Root />);

      const linkElement = await screen.findByText('No artworks found');

      expect(linkElement).toBeInTheDocument();
    });
  });

  describe('when data is available', () => {
    beforeEach(() => {
      server.use(
        http.get('http://localhost/artworks', () =>
          HttpResponse.json({
            data: [
              {
                id: 123,
                title: 'FAKE_TITLE',
                image_id: 'FAKE_IMAGE_ID',
              },
            ],
            config: {
              iiif_url: 'http://fake-iiif-url.com',
            },
          }),
        ),
      );
    });

    test('renders a title', async () => {
      render(<Root />);

      const titleElement = await screen.findByText('Art Institute of Chicago');

      expect(titleElement).toBeInTheDocument();
    });

    test('renders a gallery of images', async () => {
      render(<Root />);

      const galleryImage = await screen.findByAltText('FAKE_TITLE');

      expect(galleryImage).toBeInTheDocument();
    });
  });
});

import { render, screen } from '../../test-utils';

import { server } from '../../mocks/server';
import { http, HttpResponse } from 'msw';
import { store } from '../../store';
import { artworkApi } from '../../services/artwork';
import { Artwork } from '../artwork';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  store.dispatch(artworkApi.util.resetApiState());
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: 'FAKE_ID' }),
}));

describe('Artwork route', () => {
  test('renders initial loading state', () => {
    render(<Artwork />);
    const linkElement = screen.getByText(/Loading.../i);
    expect(linkElement).toBeInTheDocument();
  });

  describe('when data is empty', () => {
    test('renders an empty state', async () => {
      render(<Artwork />);

      const linkElement = await screen.findByText('No artwork found');

      expect(linkElement).toBeInTheDocument();
    });
  });

  describe('when data is available', () => {
    beforeEach(() => {
      server.use(
        http.get('http://localhost/artworks/FAKE_ID', () =>
          HttpResponse.json({
            data: {
              id: 123,
              title: 'FAKE_TITLE',
              image_id: 'FAKE_IMAGE_ID',
              credit_line: 'FAKE_CREDIT_LINE',
            },
            config: {
              iiif_url: 'http://fake-iiif-url.com',
            },
          }),
        ),
      );
    });

    test('renders a title', async () => {
      render(<Artwork />);

      const titleElement = await screen.findByText('FAKE_TITLE');

      expect(titleElement).toBeInTheDocument();
    });

    test('renders a back link', async () => {
      render(<Artwork />);

      const backLink = await screen.findByText('Back to gallery');

      expect(backLink).toBeInTheDocument();
    });

    test('renders an image', async () => {
      render(<Artwork />);

      const galleryImage = await screen.findByAltText('FAKE_TITLE');

      expect(galleryImage).toBeInTheDocument();
    });

    test('renders a credit line', async () => {
      render(<Artwork />);

      const creditLine = await screen.findByText('Credit: FAKE_CREDIT_LINE');

      expect(creditLine).toBeInTheDocument();
    });
  });
});

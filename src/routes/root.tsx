import { Link } from 'react-router-dom';
import { useListArtworksQuery } from '../services/artwork';
import { ArtworkImage } from '../components/artwork-image';

export function Root() {
  const { data, isFetching } = useListArtworksQuery('');

  if (isFetching && !data) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No artworks found</div>;
  }

  const { data: artworks, config } = data;

  return (
    <div>
      {artworks.map(artwork => (
        <div key={artwork.id}>
          <Link to={`/artwork/${artwork.id}`}>
            <ArtworkImage artwork={artwork} config={config} />
          </Link>
        </div>
      ))}
    </div>
  );
}

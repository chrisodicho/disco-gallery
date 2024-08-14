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
    <div className="p-12">
      <div className="columns-2 md:columns-4 gap-4 space-y-4">
        {artworks.map(artwork => (
          <Link key={artwork.id} to={`/artwork/${artwork.id}`} title={artwork.title} className="block">
            <ArtworkImage artwork={artwork} config={config} />
          </Link>
        ))}
      </div>
    </div>
  );
}

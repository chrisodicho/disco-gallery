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
      <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Art Institute of Chicago</h2>
        </div>
      </div>
      <div className="columns-2 md:columns-4 gap-4 space-y-4">
        {artworks.map(artwork => (
          <Link
            key={artwork.id}
            to={`/artwork/${artwork.id}`}
            title={artwork.title}
            className="block break-inside-avoid"
          >
            <ArtworkImage artwork={artwork} config={config} hasTitle />
          </Link>
        ))}
      </div>
    </div>
  );
}

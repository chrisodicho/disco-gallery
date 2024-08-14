import { Link } from 'react-router-dom';
import { useListArtworksQuery } from '../services/artwork';
import { ArtworkImage } from '../components/artwork-image';
import { LoadingSpinner } from '../components/loading-spinner';

export function Root() {
  const { data, isFetching } = useListArtworksQuery('');

  if (isFetching && !data?.data?.length) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!data?.data?.length) {
    return (
      <div className="p-12 flex flex-col h-screen max-h-screen">
        <div className="flex flex-col justify-center text-center space-y-2 py-6">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">No artworks found</h2>
        </div>
      </div>
    );
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
            className="block break-inside-avoid hover:outline hover:outline-blue-500 hover:shadow-lg"
          >
            <ArtworkImage artwork={artwork} config={config} hasTitle />
          </Link>
        ))}
      </div>
    </div>
  );
}

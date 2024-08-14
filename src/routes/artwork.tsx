import { Link, useParams } from 'react-router-dom';
import { useGetArtworkQuery } from '../services/artwork';
import { ArtworkImage } from '../components/artwork-image';

export function Artwork() {
  let { id } = useParams();
  const { data, isFetching } = useGetArtworkQuery(id ?? '', {
    skip: !id,
  });

  if (isFetching && !data) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No artwork found</div>;
  }

  const { data: artwork, config } = data;

  return (
    <div className="p-12 flex flex-col h-screen max-h-screen">
      <div className="flex flex-col justify-center text-center space-y-2 py-6">
        <p>
          <Link to="/" className="underline">
            Back to gallery
          </Link>
        </p>
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{artwork.title}</h2>
      </div>
      <div className="flex justify-center">
        <ArtworkImage artwork={artwork} config={config} />
      </div>

      <div className="flex flex-col justify-center text-center space-y-2 py-6 text-gray-400 text-sm">
        Credit: {artwork.credit_line}
      </div>
    </div>
  );
}

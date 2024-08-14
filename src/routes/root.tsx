import { Link } from 'react-router-dom';
import { useListArtworksQuery } from '../services/artwork';

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
            <img src={buildImageUrl(config.iiif_url, artwork.image_id)} alt={artwork.title} width={100} />
          </Link>
        </div>
      ))}
    </div>
  );
}

function buildImageUrl(iiif_url: string, image_id: string) {
  return `${iiif_url}/${image_id}/full/843,/0/default.jpg`;
}

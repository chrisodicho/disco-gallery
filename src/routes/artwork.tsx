import { useParams } from 'react-router-dom';
import { useGetArtworkQuery } from '../services/artwork';

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
    <div>
      <div>{artwork.title}</div>
      <img src={buildImageUrl(config.iiif_url, artwork.image_id)} alt={artwork.title} width={100} />
    </div>
  );
}

function buildImageUrl(iiif_url: string, image_id: string) {
  return `${iiif_url}/${image_id}/full/843,/0/default.jpg`;
}

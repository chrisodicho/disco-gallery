import { useParams } from 'react-router-dom';
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
    <div>
      <div>{artwork.title}</div>
      <ArtworkImage artwork={artwork} config={config} />
    </div>
  );
}

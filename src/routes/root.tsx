import { useListArtworksQuery } from '../services/artwork';

export function Root() {
  const { data, isFetching } = useListArtworksQuery('');

  if (isFetching && !data) {
    return <div>Loading...</div>;
  }

  if (!data && !isFetching) {
    return <div>No artworks found</div>;
  }

  return (
    <div>
      {data?.data.map(artwork => (
        <div key={artwork.id}>
          <img src={buildImageUrl(data.config.iiif_url, artwork.image_id)} alt={artwork.title} width={100} />
        </div>
      ))}
    </div>
  );
}

function buildImageUrl(iiif_url: string, image_id: string) {
  return `${iiif_url}/${image_id}/full/843,/0/default.jpg`;
}

import { ArtworkConfig, ArtworkData } from '../types';

export function ArtworkImage({ artwork, config }: { artwork: ArtworkData; config: ArtworkConfig }) {
  return <img src={buildImageUrl(config.iiif_url, artwork.image_id)} alt={artwork.title} width={100} />;
}

function buildImageUrl(iiif_url: string, image_id: string) {
  return `${iiif_url}/${image_id}/full/843,/0/default.jpg`;
}

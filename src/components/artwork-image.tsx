import { ArtworkConfig, ArtworkData } from '../types';

export function ArtworkImage({
  artwork,
  config,
  hasTitle = false,
}: {
  artwork: ArtworkData;
  config: ArtworkConfig;
  hasTitle?: boolean;
}) {
  return (
    <div className="relative overflow-hidden">
      <img
        className="h-auto max-w-full max-h-full"
        src={buildImageUrl(config.iiif_url, artwork.image_id)}
        alt={artwork.title}
      />
      {hasTitle && (
        <div className="text-white absolute bottom-0 left-0 right-0 w-full p-2 bg-black/75">{artwork.title}</div>
      )}
    </div>
  );
}

function buildImageUrl(iiif_url: string, image_id: string) {
  return `${iiif_url}/${image_id}/full/843,/0/default.jpg`;
}

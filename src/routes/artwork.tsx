export async function loader({
  params,
}: {
  params: {
    id?: string;
  };
}) {
  if (params.id) {
    // fetch data and return artwork
  }

  return { artwork: null };
}

export function Artwork() {
  return <div>{'Artwork route'}</div>;
}

import { useParams } from 'react-router-dom';

export function Artwork() {
  let { id } = useParams();
  return <div>{'Artwork route'}</div>;
}

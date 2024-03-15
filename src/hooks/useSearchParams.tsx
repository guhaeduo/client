import { useLocation } from 'react-router-dom';

export default function useSearchParams() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const getParams = (key: string) => searchParams.get(key);
  return getParams;
}

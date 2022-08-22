import { useSelector } from 'react-redux';

import { RootState } from '../store';

export function useFilmsState() {
  const { isLoading, error, data } = useSelector((s: RootState) => s.films.films);

  return { isLoading, error, data };
}

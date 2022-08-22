import { useSelector } from 'react-redux';

import { RootState } from '../store';

export function useCharacterListState() {
  const { isLoading, error, data } = useSelector((s: RootState) => s.character.characterList);

  return { isLoading, error, data };
}

export function useCharacterByIdState() {
  const { isLoading, error, data } = useSelector((s: RootState) => s.character.characterById);

  return { isLoading, error, data };
}

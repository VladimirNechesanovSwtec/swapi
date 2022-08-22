import { CharacterList, Character } from '@src/models/api';
import { executeRequest, Response } from '../utils';

export const getAllCharacterRequest = (): Promise<Response<CharacterList>> =>
  executeRequest<never, CharacterList>({
    path: '/api/people',
    method: 'get',
  });

export const getCharacterByIdRequest = (id: string): Promise<Response<Character>> =>
  executeRequest<never, Character>({
    path: `/api/people/${id}`,
    method: 'get',
  });

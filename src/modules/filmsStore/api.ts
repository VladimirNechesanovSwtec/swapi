import { Film } from '@src/models/api';
import { executeRequest, Response } from '../utils';

export const getFilmByIdRequest = (id: string): Promise<Response<Film>> =>
  executeRequest<never, Film>({
    path: `/api/films/${id}`,
    method: 'get',
  });

/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Film } from '@src/models/api';
import { getId } from '@src/utils';
import { loadingFailed, LoadingState, loadingSuccess, startLoading } from '../loadingStatus';
import { AppThunk } from '../store';
import { getFilmByIdRequest } from './api';

type CharacterState = {
  films: {
    data: Film[];
  } & LoadingState;
};

const initialState: CharacterState = {
  films: {
    data: [],
    isLoading: false,
    error: null,
  },
};

const films = createSlice({
  name: 'films',
  initialState,
  reducers: {
    requestFilmByIdStart: (state) => startLoading(state.films),
    requestFilmByIdSuccess: (state, { payload }: PayloadAction<Film[]>) => {
      loadingSuccess(state.films);
      state.films.data = payload;
    },
    requestFilmByIdFailed: (state, action) => loadingFailed(state.films, action),

    resetFilmStore: (state) => {
      state.films = initialState.films;
    },
  },
});

export const { requestFilmByIdStart, requestFilmByIdSuccess, requestFilmByIdFailed, resetFilmStore } = films.actions;

export default films.reducer;

export const getFilmsList = (urls: string[]): AppThunk => async (dispatch) => {
  try {
    dispatch(requestFilmByIdStart());

    const response: Film[] = [];

    for await (const id of urls) {
      const result = await getFilmByIdRequest(getId(id));

      if (!result.error && result.data) {
        response.push(result.data);
      }
    }

    dispatch(requestFilmByIdSuccess(response));
  } catch (err) {
    dispatch(requestFilmByIdFailed(`${err}`));
  }
};

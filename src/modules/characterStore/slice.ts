/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Character, CharacterList } from '@src/models/api';
import { loadingFailed, LoadingState, loadingSuccess, startLoading } from '../loadingStatus';
import { AppThunk } from '../store';
import { getAllCharacterRequest, getCharacterByIdRequest } from './api';

type CharacterState = {
  characterList: {
    data: CharacterList | null;
  } & LoadingState;
  characterById: {
    data: Character | null;
  } & LoadingState;
};

const initialState: CharacterState = {
  characterList: {
    data: null,
    isLoading: false,
    error: null,
  },
  characterById: {
    data: null,
    isLoading: false,
    error: null,
  },
};

const character = createSlice({
  name: 'character',
  initialState,
  reducers: {
    requestCharacterListStart: (state) => startLoading(state.characterList),
    requestCharacterListSuccess: (state, { payload }: PayloadAction<CharacterList>) => {
      loadingSuccess(state.characterList);
      state.characterList.data = payload;
    },
    requestCharacterListFailed: (state, action) => loadingFailed(state.characterList, action),

    requestCharacterByIdStart: (state) => startLoading(state.characterById),
    requestCharacterByIdSuccess: (state, { payload }: PayloadAction<Character>) => {
      loadingSuccess(state.characterById);
      state.characterById.data = payload;
    },
    requestCharacterByIdFailed: (state, action) => loadingFailed(state.characterById, action),

    resetCharacter: (state) => {
      state.characterById = initialState.characterById;
    },
  },
});

export const {
  requestCharacterListStart,
  requestCharacterListSuccess,
  requestCharacterListFailed,
  requestCharacterByIdStart,
  requestCharacterByIdSuccess,
  requestCharacterByIdFailed,
  resetCharacter,
} = character.actions;

export default character.reducer;

export const getAllCharacterList = (): AppThunk => async (dispatch) => {
  try {
    dispatch(requestCharacterListStart());

    const result = await getAllCharacterRequest();

    if (!result.error && result.data) {
      dispatch(requestCharacterListSuccess(result.data));
    }
  } catch (err) {
    dispatch(requestCharacterListFailed(`${err}`));
  }
};

export const getCharacterById = (id: string): AppThunk => async (dispatch) => {
  try {
    dispatch(requestCharacterByIdStart());

    const result = await getCharacterByIdRequest(id);

    if (!result.error && result.data) {
      dispatch(requestCharacterByIdSuccess(result.data));
    }
  } catch (err) {
    dispatch(requestCharacterByIdFailed(`${err}`));
  }
};

/* eslint-disable import/no-cycle */
import { Action, ThunkAction, configureStore, combineReducers } from '@reduxjs/toolkit';

import characterReducer from './characterStore/slice';

const reducer = combineReducers({
  character: characterReducer,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof reducer>;

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;

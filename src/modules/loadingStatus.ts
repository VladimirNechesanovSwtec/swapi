/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';

export type LoadingState = {
  isLoading: boolean;
  error: string | null;
};

export function startLoading<T extends LoadingState>(state: T) {
  state.isLoading = true;
  state.error = null;
}

export function loadingFailed<T extends LoadingState>(state: T, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

export function loadingSuccess<T extends LoadingState>(state: T) {
  state.isLoading = false;
  state.error = null;
}

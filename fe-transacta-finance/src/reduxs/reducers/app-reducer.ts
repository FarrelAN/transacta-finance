import type {UsableLocale} from '@faker-js/faker';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from './rootReducer';

export enum ThemeMode {
  DARK = 'dark',
  LIGHT = 'light',
}

export interface IAppState {
  appLoading: boolean;
  theme: ThemeMode;
  alert: {
    type: 'notification' | 'success' | 'error';
    title: string;
    message: string;
  } | null;
}

export const initialState: IAppState = {
  appLoading: false,
  alert: null,
  theme: ThemeMode.LIGHT,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppLoading: (state: IAppState, {payload}: PayloadAction<boolean>) => {
      state.appLoading = payload;
    },
    switchTheme: (state: IAppState, {payload}: PayloadAction<ThemeMode>) => {
      state.theme = payload;
    },
    setAppAlert: (
      state,
      action: PayloadAction<{
        type: 'notification' | 'success' | 'error';
        message: string;
        title: string;
      } | null>,
    ) => {
      state.alert = action.payload;
    },
    clearAlert: state => {
      state.alert = null;
    },
  },
});

export const {setAppLoading, setAppAlert, clearAlert, switchTheme} =
  appSlice.actions;

export const appSelector = (state: RootState) => state.app;

export default appSlice.reducer;

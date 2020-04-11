import { combineReducers } from 'redux';

import { ErrorState } from './error/types';
import { UserState } from './user/types';

import { errorReducer } from './error/reducer';
import { userReducer } from './user/reducer';

export interface AppState {
  error: ErrorState,
  user: UserState
}

export const createAppReducer = () => combineReducers<AppState>({
  error: errorReducer,
  user: userReducer
});
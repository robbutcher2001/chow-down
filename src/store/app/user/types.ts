import { Action } from 'redux';

export enum UserActionTypes {
  SET_USER_IS_SELECTING_DAY = '@@common/SET_USER_IS_SELECTING_DAY',
  CLEAR_USER_IS_SELECTING_DAY = '@@common/CLEAR_USER_IS_SELECTING_DAY'
}

export interface UserState {
  readonly selectedDay: string
}

export interface UserAction extends Action {
  type: UserActionTypes,
  day: string
}
import { UserActionTypes, UserAction } from './types';

export const setUserIsSelectingDay = (day: string): UserAction => ({
  type: UserActionTypes.SET_USER_IS_SELECTING_DAY,
  day
});

export const clearUserIsSelectingDay = (): UserAction => ({
  type: UserActionTypes.CLEAR_USER_IS_SELECTING_DAY,
  day: null
});
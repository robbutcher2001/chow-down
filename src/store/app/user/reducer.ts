import { Reducer } from 'redux';

import { UserState, UserActionTypes, UserAction } from './types';

const initialState: UserState = {
  selectedDay: null
}

export const userReducer: Reducer<UserState, UserAction> = (state = initialState, action: UserAction) => {
  switch (action.type) {

    case UserActionTypes.SET_USER_IS_SELECTING_DAY:
    case UserActionTypes.CLEAR_USER_IS_SELECTING_DAY:
      const selectedDay: string = action.day;
      return {
        selectedDay
      };

    default:
      return state;
  }
};
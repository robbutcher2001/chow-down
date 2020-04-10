import { Reducer } from 'redux';

import { DaysUiState, DayActionTypes, DaysUiChange } from './types';

const initialState: DaysUiState = {
    getPending: false,
    postPending: false
}

export const daysUiReducer: Reducer<DaysUiState, DaysUiChange> = (state = initialState, action: DaysUiChange) => {
    switch (action.type) {

        case DayActionTypes.GET_DAYS_PENDING:
            return {
                ...state,
                getPending: true
            };

        case DayActionTypes.POST_DAYS_PENDING:
            return {
                ...state,
                postPending: true
            };

        case DayActionTypes.CLEAR_GET_DAYS_PENDING:
            return {
                ...state,
                getPending: false
            };

        case DayActionTypes.CLEAR_POST_DAYS_PENDING:
            return {
                ...state,
                postPending: false
            };

        default:
            return state;
    }
};
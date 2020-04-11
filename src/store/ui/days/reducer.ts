import { Reducer } from 'redux';

import { DaysUiState, DayActionTypes, DaysUiChange } from './types';

const initialState: DaysUiState = {
    getPending: false,
    putPending: false
}

export const daysUiReducer: Reducer<DaysUiState, DaysUiChange> = (state = initialState, action: DaysUiChange) => {
    switch (action.type) {

        case DayActionTypes.GET_DAYS_PENDING:
            return {
                ...state,
                getPending: true
            };

        case DayActionTypes.PUT_DAYS_PENDING:
            return {
                ...state,
                putPending: true
            };

        case DayActionTypes.CLEAR_GET_DAYS_PENDING:
            return {
                ...state,
                getPending: false
            };

        case DayActionTypes.CLEAR_PUT_DAYS_PENDING:
            return {
                ...state,
                putPending: false
            };

        default:
            return state;
    }
};
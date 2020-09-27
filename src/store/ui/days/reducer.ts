import { Reducer } from 'redux';

import { DaysUiState, DayActionTypes, DaysUiChange } from './types';

const initialState: DaysUiState = {
    getPending: [],
    putPending: []
}

export const daysUiReducer: Reducer<DaysUiState, DaysUiChange> = (state = initialState, action: DaysUiChange) => {
    switch (action.type) {

        case DayActionTypes.GET_DAY_PENDING:
            return {
                ...state,
                getPending: !state.getPending.includes(action.date) ? state.getPending.concat(action.date) : state.getPending
            };

        case DayActionTypes.PUT_DAY_PENDING:
            return {
                ...state,
                putPending: !state.putPending.includes(action.date) ? state.putPending.concat(action.date) : state.putPending
              };

        case DayActionTypes.CLEAR_GET_DAY_PENDING:
            return {
                ...state,
                getPending: state.getPending.filter(pendingDate => pendingDate != action.date)
            };

        case DayActionTypes.CLEAR_PUT_DAY_PENDING:
            return {
                ...state,
                putPending: state.putPending.filter(pendingDate => pendingDate != action.date)
              };

        default:
            return state;
    }
};
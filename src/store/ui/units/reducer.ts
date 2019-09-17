import { Reducer } from 'redux';

import { UnitsUiState, UnitActionTypes, UnitsUiChange } from './types';

const initialState: UnitsUiState = {
    getPending: false,
    postPending: false
}

export const unitsUiReducer: Reducer<UnitsUiState, UnitsUiChange> = (state = initialState, action: UnitsUiChange) => {
    switch (action.type) {

        case UnitActionTypes.GET_UNITS_PENDING:
            return {
                ...state,
                getPending: true
            };

        case UnitActionTypes.POST_UNITS_PENDING:
            return {
                ...state,
                postPending: true
            };

        case UnitActionTypes.CLEAR_GET_UNITS_PENDING:
            return {
                ...state,
                getPending: false
            };

        case UnitActionTypes.CLEAR_POST_UNITS_PENDING:
            return {
                ...state,
                postPending: false
            };

        default:
            return state;
    }
};
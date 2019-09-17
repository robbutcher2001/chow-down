import { UnitActionTypes, UnitsUiChange } from './types';

export const pendingGetUnits = (): UnitsUiChange => ({
    type: UnitActionTypes.GET_UNITS_PENDING
});

export const clearPendingGetUnits = (): UnitsUiChange => ({
    type: UnitActionTypes.CLEAR_GET_UNITS_PENDING
});

export const pendingPostUnits = (): UnitsUiChange => ({
    type: UnitActionTypes.POST_UNITS_PENDING
});

export const clearPendingPostUnits = (): UnitsUiChange => ({
    type: UnitActionTypes.CLEAR_POST_UNITS_PENDING
});
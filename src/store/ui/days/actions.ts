import { DayActionTypes, DaysUiChange } from './types';

export const pendingGetDays = (): DaysUiChange => ({
    type: DayActionTypes.GET_DAYS_PENDING
});

export const clearPendingGetDays = (): DaysUiChange => ({
    type: DayActionTypes.CLEAR_GET_DAYS_PENDING
});

export const pendingPutDays = (): DaysUiChange => ({
    type: DayActionTypes.PUT_DAYS_PENDING
});

export const clearPendingPutDays = (): DaysUiChange => ({
    type: DayActionTypes.CLEAR_PUT_DAYS_PENDING
});
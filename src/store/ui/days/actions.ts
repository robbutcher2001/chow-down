import { DayActionTypes, DaysUiChange } from './types';

export const pendingGetDay = (date: string): DaysUiChange => ({
    type: DayActionTypes.GET_DAY_PENDING,
    date
});

export const clearPendingGetDay = (date: string): DaysUiChange => ({
    type: DayActionTypes.CLEAR_GET_DAY_PENDING,
    date
});

export const pendingPutDay = (date: string): DaysUiChange => ({
    type: DayActionTypes.PUT_DAY_PENDING,
    date
});

export const clearPendingPutDay = (date: string): DaysUiChange => ({
    type: DayActionTypes.CLEAR_PUT_DAY_PENDING,
    date
});
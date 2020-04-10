import { DayActionTypes, DaysUiChange } from './types';

export const pendingGetDays = (): DaysUiChange => ({
    type: DayActionTypes.GET_DAYS_PENDING
});

export const clearPendingGetDays = (): DaysUiChange => ({
    type: DayActionTypes.CLEAR_GET_DAYS_PENDING
});

export const pendingPostDays = (): DaysUiChange => ({
    type: DayActionTypes.POST_DAYS_PENDING
});

export const clearPendingPostDays = (): DaysUiChange => ({
    type: DayActionTypes.CLEAR_POST_DAYS_PENDING
});
import { Reducer } from 'redux';

import { CountState, CountActionTypes, CountApiResponse, CountSuccessApiResponse } from './types';

const initialState: CountState = {
    value: 0
}

interface CountResponse {
    status: string,
    data: {
        counter: number
    }
}

//TODO: should we type-cast here?
export const countReducer: Reducer<CountState, CountApiResponse> = (state = initialState, action: CountApiResponse) => {
    switch (action.type) {

        case CountActionTypes.INCREMENT_SUCCESS:
        case CountActionTypes.DECREMENT_SUCCESS:
            const successResponse = action as CountSuccessApiResponse;
            const json = successResponse.json as CountResponse;
            return {
                value: json.data.counter
            };

        default:
            return state;
    }
};
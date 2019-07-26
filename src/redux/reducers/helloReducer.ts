'use strict';

import {
    HelloState,
    SayHelloTypes,
    SAY_HELLO
} from './types';

const initialState: HelloState = {
    hello_messages: []
}

export default (state = initialState, action: SayHelloTypes): HelloState => {
    switch (action.type) {
        case SAY_HELLO:
            return {
                hello_messages: [...state.hello_messages, action.rob_payload]
            };
        default:
            return state;
    }
};
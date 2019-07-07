'use strict';

import { call, put as putSideEffect } from 'redux-saga/effects';

import { Method, Headers } from '../../globals/constants';

const callBody = (method, url, payload) => fetch(url, {
    method,
    headers: {
        'Accept': Headers.ACCEPT,
        'Content-Type': Headers.CONTENT_TYPE
    },
    body: JSON.stringify({
        ...payload
    })
});

const callNoBody = (method, url) => fetch(url, {
    method,
    headers: {
        'Accept': Headers.ACCEPT
    }
});

// export function* post(url, payload) {
//     // const response = ;

//     console.log('handling initial');

//     yield* handleResponse(yield call(() => callBody(
//         Method.POST,
//         url,
//         payload
//     )));
// };

//TODO: logic check
export function* post(url, payload) {
    console.log('handling');
    try {
        const response = yield call(() => callBody(
            Method.POST,
            url,
            payload
        ));

        if (response.status >= 200 && response.status < 500) {
            const json = yield response.json();

            if (response.status < 300) {
                yield putSideEffect({
                    type: 'POST_INGREDIENT_SUCCESS',
                    payload: json
                });
                yield putSideEffect({ type: 'GET_INGREDIENTS_REQUEST' });
            }
            else if (response.status >= 400) {
                yield putSideEffect({
                    type: 'POST_INGREDIENT_FAILED',
                    payload: json
                });
            }
            else {
                throw response;
            }
        }
        else {
            throw response;
        }
        console.log('HEHRHEHEr');
    } catch (err) {
        console.log('GIT ERROE');
        if (err.status >= 500) {
            console.log('got a 500 ' + err.statusText);
            yield putSideEffect({
                type: 'UNEXPECTED_SERVER_ERROR',
                payload: err.statusText
            });

            return;
        }

        let errorMessage = err.statusText;
        console.log(err);
        if (err.toString().includes('Failed to fetch') ||
            err.toString().includes('Could not connect to the server')) {
            errorMessage = 'remote server is unreachable';
        }

        yield putSideEffect({
            type: 'UNEXPECTED_RESPONSE',
            payload: 'An error has occurred with message: ' +
                (errorMessage ? errorMessage.toLowerCase() : '<argh, no message at all>') + '.'
        });
    }
};

// export const post = (url, payload) => callBody(Method.POST, url, payload);

export const get = url => callNoBody(Method.GET, url);

export const put = () => 'no impl';

export const del = () => 'no impl';
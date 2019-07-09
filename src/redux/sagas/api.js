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

function* callBodyTest(method, url, payload, callback) {
    console.log('here');
    try {
        // const response = yield call(post, postParam1, postParam2);
        // yield* handleResponse(yield call(fetch, url, {
        //     method,
        //     headers: {
        //         'Accept': Headers.ACCEPT,
        //         'Content-Type': Headers.CONTENT_TYPE
        //     },
        //     body: JSON.stringify({
        //         ...payload
        //     })
        // }));

        yield* handleResponse(yield call(() => fetch(url, {
            method,
            headers: {
                'Accept': Headers.ACCEPT,
                'Content-Type': Headers.CONTENT_TYPE
            },
            body: JSON.stringify({
                ...payload
            })
        })), callback);
    } catch (err) {
        yield* handleResponse(err);
    }
};

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
function* handleResponse(response, callback) {
    console.log('handling');
    try {
        if (response.status >= 200 && response.status < 500) {
            const json = yield response.json();

            if (response.status < 300) {
                yield putSideEffect({
                    type: 'POST_INGREDIENT_SUCCESS',
                    payload: json
                });
                console.log('time to callback');
                yield* callback();
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

export const post = (url, payload, callback) => callBodyTest(Method.POST, url, payload, callback);

export const get = url => callNoBody(Method.GET, url);

export const put = () => 'no impl';

export const del = () => 'no impl';
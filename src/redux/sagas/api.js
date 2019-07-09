'use strict';

import { call, put as putSideEffect } from 'redux-saga/effects';

import { Method, Headers } from '../../globals/constants';

//TODO: logic check
function* handleResponse(response, success, failure) {
    try {
        if (response.status >= 200 && response.status < 500) {
            const json = yield response.json();

            if (response.status < 300) {
                yield* success(json);
            }
            else if (response.status >= 400) {
                yield* failure(json);
            }
            else {
                throw response;
            }
        }
        else {
            throw response;
        }
    } catch (err) {
        if (err.status >= 500) {
            yield putSideEffect({
                type: 'UNEXPECTED_SERVER_ERROR',
                payload: err.statusText
            });

            return;
        }

        let errorMessage = err.statusText;
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

function* callNoBody(method, url, success, failure) {
    try {
        yield* handleResponse(
            yield call(fetch, url, {
                method,
                headers: {
                    'Accept': Headers.ACCEPT
                }
            }),
            success,
            failure
        );
    } catch (err) {
        yield* handleResponse(
            err,
            success,
            failure
        );
    }
};

function* callBody(method, url, payload, success, failure) {
    try {
        yield* handleResponse(
            yield call(fetch, url, {
                method,
                headers: {
                    'Accept': Headers.ACCEPT,
                    'Content-Type': Headers.CONTENT_TYPE
                },
                body: JSON.stringify({
                    ...payload
                })
            }),
            success,
            failure
        );
    } catch (err) {
        yield* handleResponse(
            err,
            success,
            failure
        );
    }
}

export const post = (url, payload, successCallback, failCallback) =>
    callBody(Method.POST, url, payload, successCallback, failCallback);

export const get = (url, successCallback, failCallback) =>
    callNoBody(Method.GET, url, successCallback, failCallback);

export const put = () => 'no impl';

export const del = () => 'no impl';
'use strict';

import { call, put as putSideEffect } from 'redux-saga/effects';

import { Method, Headers } from '../../globals/constants';

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
        }
        else {
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
    }
};

function* doFetch(method, url, payload, success, failure) {
    const init = {
        method,
        headers: { 'Accept': Headers.ACCEPT }
    };

    if (payload) {
        init.body = JSON.stringify({ ...payload });
        init.headers['Content-Type'] = Headers.CONTENT_TYPE;
    }

    try {
        yield* handleResponse(
            yield call(fetch, url, init),
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
    doFetch(Method.POST, url, payload, successCallback, failCallback);

export const get = (url, successCallback, failCallback) =>
    doFetch(Method.GET, url, null, successCallback, failCallback);

export const put = (url, payload, successCallback, failCallback) =>
    doFetch(Method.PUT, url, payload, successCallback, failCallback);

export const del = (url, successCallback, failCallback) =>
    doFetch(Method.DELETE, url, null, successCallback, failCallback);
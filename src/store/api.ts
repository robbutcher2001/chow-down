import { call, put as putSideEffect, delay } from 'redux-saga/effects';

import { unexpectedServerError, unexpectedResponse, clearError } from './app/actions';

const clearErrorDelayMilli: number = 6000;

enum Method {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE'
};

enum Headers {
    ACCEPT = 'application/json',
    CONTENT_TYPE = 'application/json; charset=utf-8'
};

interface RequestHeaders {
    [s: string]: string
};

//TODO: need to type the return of the callbacks, any is not good
export interface SuccessCallback {
    (json: object): any
};

export interface FailCallback {
    (reason: string): any
};

//TODO: need to type the response from fetch, any is not good
function* handleResponse(response: any, success: SuccessCallback, failure: FailCallback) {
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
            yield putSideEffect(unexpectedServerError(err.statusText));
        }
        else {
            let errorMessage = err.statusText;
            if (err.toString().includes('Failed to fetch') ||
                err.toString().includes('Could not connect to the server')) {
                errorMessage = 'remote server is unreachable';
            }

            yield putSideEffect(unexpectedResponse('An error has occurred with message: ' +
                (errorMessage ? errorMessage.toLowerCase() : '<argh, no message at all>') + '.'));
        }

        yield delay(clearErrorDelayMilli);
        yield putSideEffect(clearError());
    }
};

function* doFetch(method: Method, url: string, success: SuccessCallback, failure: FailCallback, payload?: object) {
    const headers: RequestHeaders = {
        'Accept': Headers.ACCEPT
    };

    const init: RequestInit = {
        method,
        headers
    };

    if (payload) {
        init.body = JSON.stringify({ ...payload });
        headers['Content-Type'] = Headers.CONTENT_TYPE;
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
};

export const post = (
    url: string,
    successCallback: SuccessCallback,
    failCallback: FailCallback,
    payload: object
) =>
    doFetch(Method.POST, url, successCallback, failCallback, payload);

export const get = (
    url: string,
    successCallback: SuccessCallback,
    failCallback: FailCallback
) =>
    doFetch(Method.GET, url, successCallback, failCallback);

export const put = (
    url: string,
    successCallback: SuccessCallback,
    failCallback: FailCallback,
    payload: object
) =>
    doFetch(Method.PUT, url, successCallback, failCallback, payload);

export const del = (
    url: string,
    successCallback: SuccessCallback,
    failCallback: FailCallback
) =>
    doFetch(Method.DELETE, url, successCallback, failCallback);